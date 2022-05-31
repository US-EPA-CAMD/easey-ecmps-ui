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
    item.name = document.getElementById(input.id).attributes[
      "epadataname"
    ].value;
    item.value = document.getElementById(input.id).value;
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
        console.log('typeof item.value === "string"',typeof item.value,item.value)
      }
    }
  }

  payloadArray.forEach((item) => {

    if (item.value !== undefined) {
      if (typeof item.value === "string" && isNaN(item.value)) {
        payload[item.name] =
          item.value.trim() === "" ? null : item.value.trim();
      }
      // is a number
      if (typeof item.value === "string" && !isNaN(item.value)) {
        if (payload[item.name] === "string") {
          payload[item.name] =
            item.value.trim() === "" ? null : item.value.trim();
        }
        // not a decimal
        else if (item.value.indexOf(".") === -1) {
          payload[item.name] = parseInt(item.value);
          console.log('item.name not a decimal',item.name )
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
    console.log('  payload[item.name]',  payload[item.name],item.name)
  });
  console.log('  payload',payload)
  return payload;
};
