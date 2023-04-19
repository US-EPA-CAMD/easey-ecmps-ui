export const extractUserInput = (payload, inputSelector, radios) => {
  // *** construct payload
  const payloadInputs = document.querySelectorAll(inputSelector);
  const datepickerPayloads = document.querySelectorAll(
    ".usa-date-picker__internal-input"
  );
  let radioPayload = null;
  const payloadArray = [];

  // payload is not recognizing the correct ID, probably taking in previous modaldataID
  payloadInputs.forEach((input) => {
    if (
      input.id === undefined ||
      input.id === null ||
      input.id === "" ||
      (radios && radios.includes(input.id))
    ) {
      return;
    }
    const item = { name: "", value: "" };
    item.name = input.getAttribute("epadataname");
    item.value = input.value;
    if (!item.value) {
      item.value = input.getAttribute("value");
    }
    payloadArray.push(item);
  });

  datepickerPayloads.forEach((input) => {
    const item = { name: "", value: "" };
    item.name = input.attributes["epadataname"].value;
    item.value = input.value;
    payloadArray.push(item);
  });

  if (radios) {
    radioPayload = document.querySelectorAll(".usa-radio");
    let counter = 0;

    for (const button of radioPayload) {
      if (button.firstElementChild.checked) {
        const item = { name: "", value: "" };
        item.name = radios[counter];
        item.value = button.firstElementChild.defaultValue === "Yes" ? 1 : 0;
        payloadArray.push(item);
        counter++;
      }
    }
  }

  for (const item of payloadArray) {
    if (item.value === null || item.value === "") {
      payload[item.name] = null;
      continue;
    }
    if (item.value !== undefined) {
      if (
        typeof item.value === "string" &&
        (isNaN(item.value) ||
          (item.value.length > 1 &&
            item.value.charAt(0) === "0" &&
            item.value.charAt(1) !== "."))
      ) {
        payload[item.name] =
          item.value.trim() === "" ? null : item.value.trim();
      }
      // is a number
      else if (typeof item.value === "string" && !isNaN(item.value)) {
        if (payload[item.name] === "string" || (typeof payload[item.name]) === "string") {
          payload[item.name] =
            item.value.trim() === "" ? null : item.value.trim();
        }
        // not a decimal
        else if (item.value.indexOf(".") === -1) {
          payload[item.name] = parseInt(item.value);
        } else {
          payload[item.name] = parseFloat(item.value);
        }
      }
      if (typeof item.value === "number") {
        if (payload[item.name] === "string") {
          payload[item.name] = item.value.toString();
        } else {
          payload[item.name] = item.value;
        }
      }
    }
  }

  return payload;
};

export const validateUserInput = (userInput, dataTableName) => {
  const errors = [];

  checkFormulaBeginDateAndHour(userInput, dataTableName, errors);
  checkEndDateAndHour(userInput, dataTableName, errors);

  return errors;
};

/**
 * Checks if either end date or hour exists
 */
const checkEndDateAndHour = (userInput, dataTableName, errors) => {
  const needsEndDateTimeMsg = "Must enter in both End Date/Time";
  // cases where userInput.endDate/Hour isn't an input option and thus don't exist in userInput evaluate to undefined
  const hasOnlyEitherEndDateOrHour = (userInput.endDate === null) !== (userInput.endHour === null);

  // skips these tables b/c only have end date, no end hour
  const skipTables = ["Location Attribute", "Relationship Data"]
  if (skipTables.includes(dataTableName)) return;

  // edge case for WAFs Rectangular Duct b/c properties are named wafEndDate/Hour
  const wafOnlyEitherEndDateOrHour = (userInput.wafEndHour === null) !== (userInput.wafEndDate === null);
  if (dataTableName === "Rectangular Duct WAF" && wafOnlyEitherEndDateOrHour) {
    errors.push(needsEndDateTimeMsg);
    return;
  }

  if (hasOnlyEitherEndDateOrHour) {
    errors.push(needsEndDateTimeMsg);
  }
}

/**
 * Checks if begin date and hour exist as options in user input and are nonempty
 * for Formula table in MP
 */
const checkFormulaBeginDateAndHour = (userInput, dataTableName, errors) => {
  const [beginDate, beginHour] = ["beginDate", "beginHour"];
  const needsBeginDateTime = "Must enter in both Begin Date/Time";

  // skip validation if not Formula table
  if (dataTableName !== "Formula") return;

  if (userInput[beginDate] === null || userInput[beginHour] === null) {
    errors.push(needsBeginDateTime);
  }
};
