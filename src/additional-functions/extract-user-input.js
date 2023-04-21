export const extractUserInput = (payload, inputSelector, radios) => {
  const userInputPayload = {...payload};

  for (let userInputValue in userInputPayload) {
    if (userInputPayload.hasOwnProperty(userInputValue)) {
      if(userInputPayload[userInputValue] === "string" || userInputPayload[userInputValue] === 0){
        userInputPayload[userInputValue] = null;
      }
    }
  }

  // *** construct payload
  const payloadInputs = document.querySelectorAll(`${inputSelector},.modalLockedInput`);
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
      userInputPayload[item.name] = null;
      continue;
    }
    if (item.value !== undefined) {
      if(payload[item.name] === 0) {
        if(typeof item.value === "string"){
          if (item.value.indexOf(".") === -1) {
            userInputPayload[item.name] = parseInt(item.value);
          } else {
            userInputPayload[item.name] = parseFloat(item.value);
          }
        } else {
          userInputPayload[item.name] = item.value
        }
      }
      else {
        if(typeof item.value === "string"){
          userInputPayload[item.name] = item.value.trim() === "" ? null : item.value.trim();
        }
      }
    }
  }

  return userInputPayload;
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
  // currently doesn't do anything due to missing option evaluating to undefined
  // and thus having hasOnlyEitherEndDateOrHour eval to false
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
