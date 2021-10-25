export const extractUserInput = (payload, inputSelector, radios) => {
  // *** construct payload
  const payloadInputs = document.querySelectorAll(inputSelector);
  const datepickerPayloads = document.querySelectorAll(
    ".usa-date-picker__internal-input"
  );
  let radioPayload = null;
  const payloadArray = [];

  // play load is not recognizing the correct ID, probably taking in previous modaldataID
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

  if (radios) {
    radioPayload = document.querySelectorAll(".usa-radio");
    let counter = 0;

    for (let button of radioPayload) {
      if (button.firstElementChild.checked) {
        const item = { name: "", value: "" };
        item.name = radios[counter];
        item.value = button.firstElementChild.defaultValue == "Yes" ? "1" : "0";
        payloadArray.push(item);
        counter++;
      }
    }

    // const item = { name: "", value: "" };
    // item.name = radio;
    // if (radioPayload[0]) {
    //   if (radioPayload[0].firstElementChild.checked) {
    //     item.value = "1";
    //   }
    // }
    // if (radioPayload[1]) {
    //   if (radioPayload[1].firstElementChild.checked) {
    //     item.value = "0";
    //   }
    // }
    // payloadArray.push(item);
  }

  payloadArray.forEach((item) => {
    payload[item.name] = item.value.trim() === "" ? null : item.value.trim();
  });

  console.log(payload);

  return payload;
};
