import _ from "lodash";

const elementAmountToKeep = 10;

export const storeInFocusedArray = (event) => {
  // *** store item
  window["lastFocusedArray"].push(event.target);

  console.log(window["lastFocusedArray"]);

  // *** make sure no extra elements are kept
  if (window["lastFocusedArray"].length + 1 >= elementAmountToKeep) {
    window["lastFocusedArray"].shift();
  }
};

export const assignFocusEventListeners = () => {
  // *** make sure super global object where we will be keeping the elements is defined
  if (_.isNil(window["lastFocusedArray"])) {
    window["lastFocusedArray"] = [];
  }

  // *** find all focusable items on the page
  const focusableElements = [
    ...document.querySelectorAll(
      'a[href], button, input, textarea, select, details, [tabindex]:not([tabindex="-1"])'
    ),
  ].filter(
    (el) => !el.hasAttribute("disabled") && !el.getAttribute("aria-hidden")
  );

  // *** traverse all found items
  focusableElements.forEach((element) => {
    element.removeEventListener("focus", storeInFocusedArray);
    element.addEventListener("focus", storeInFocusedArray);
  });
};

export const cleanupFocusEventListeners = () => {
  // *** make sure super global object where we will be keeping the elements is defined
  if (_.isNil(window["lastFocusedArray"])) {
    window["lastFocusedArray"] = [];
  }

  // *** find all focusable items on the page
  const focusableElements = [
    ...document.querySelectorAll(
      'a[href], button, input, textarea, select, details, [tabindex]:not([tabindex="-1"])'
    ),
  ].filter(
    (el) => !el.hasAttribute("disabled") && !el.getAttribute("aria-hidden")
  );

  // *** traverse all found items
  focusableElements.forEach((element) => {
    element.removeEventListener("focus", storeInFocusedArray);
  });

  delete window["lastFocusedArray"];
};

export const returnFocusToLast = () => {
  if (!_.isNil(window["lastFocusedArray"])) {
    window["lastFocusedArray"].focus();
  }
};
