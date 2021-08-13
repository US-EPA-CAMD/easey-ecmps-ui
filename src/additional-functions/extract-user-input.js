export const extractUserInput = (payload, inputSelector) => {
  // *** construct payload
  const payloadInputs = document.querySelectorAll(inputSelector);
  const datepickerPayloads = document.querySelectorAll(
    ".usa-date-picker__internal-input"
  );
  console.log('THIS IS before',payload)
  const payloadArray = [];

  payloadInputs.forEach((input) => {
    if (input.id === undefined || input.id === null || input.id === "") {
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

  payloadArray.forEach((item) => {
    payload[item.name] = item.value.trim() === "" ? null : item.value.trim();
  });

  console.log('THIS IS PAAYLOADafter',payload)
  return payload;
};
