export const attachChangeEventListeners = (inputSelector) => {
  document.querySelectorAll(inputSelector).forEach((element) => {
    element.addEventListener("change", markDataAsChanged);
  });

  // *** initialize variable that will inform whether or not any changes occurred
  resetIsDataChanged();
};

export const removeChangeEventListeners = (inputSelector) => {
  document.querySelectorAll(inputSelector).forEach((element) => {
    element.removeEventListener("change", markDataAsChanged);
  });

  // *** reset status quo
  resetIsDataChanged();
};

export const markDataAsChanged = () => {
  window.isDataChanged = true;
};

export const resetIsDataChanged = () => {
  window.isDataChanged = false;
};
