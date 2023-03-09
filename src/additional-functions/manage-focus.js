import _ from "lodash";

const elementAmountToKeep = 10;

export const storeInFocusedArray = (event) => {
  if (event.target.innerHTML !== "Close") {
    /*if (
      window["lastModalButton"].length === 0 &&
      event.target.innerHTML === "View"
    ) {
      window["lastModalButton"].push(event.target);
    } else {*/
    // *** store item
    window["lastFocusedArray"].push(event.target);

    // *** make sure no extra elements are kept
    if (window["lastFocusedArray"].length > elementAmountToKeep) {
      window["lastFocusedArray"].shift();
    }
    // }
  }
};

export const assignFocusEventListeners = () => {
  // *** make sure super global object where we will be keeping the elements is defined
  if (_.isNil(window["lastFocusedArray"])) {
    window["lastFocusedArray"] = [];
  }

  if (_.isNil(window["lastModalButton"])) {
    window["lastModalButton"] = [];
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

  // delete window["lastFocusedArray"];
};

export const returnFocusToLast = () => {
  if (!_.isNil(window["lastFocusedArray"])) {
    removeStopSpinnerButtonFromLastFocusedArray();
    const lastFocus =
      window["lastFocusedArray"][window["lastFocusedArray"].length - 1];
    let counter = 0;
    if (lastFocus && lastFocus.id) {
      //using the last focus element instead of re-selecting it because there are sometimes multiple tab buttons with the same id
      const selectedFocus = lastFocus.id === 'tabBtn'? lastFocus :  document.querySelector(`#${lastFocus.id}`);

      // counter is trivial number, can be 1.
      while (document.activeElement !== selectedFocus && counter < 5) {
        if(selectedFocus){
          selectedFocus.focus();
        } else {// might need to check for an edge case when the array is empty
          window["lastFocusedArray"][0].focus()
        }
        counter++;
      }
    }
  }
};

export const returnFocusToCommentButton = () => {
  if (!_.isNil(window["lastFocusedArray"])) {
    const lastFocus = window["lastFocusedArray"]
        .filter(o => o.innerHTML === 'View Comments')[0];
    if (lastFocus) {
      lastFocus.focus();
    }
  }
};
export const returnFocusToModalButton = () => {
  if (!_.isNil(window["lastModalButton"])) {
    if (window["lastModalButton"].length > 0) {
      const button =
        window["lastModalButton"][window["lastModalButton"].length - 1];
      if (button && button.id) {
        const element = document.querySelector(`#${button.id}`);
        if (element) {
          element.focus();
          window["lastModalButton"] = [];
        } else {
        }
      }
    }
  }
};

export const addElementToLastFocusedArray = (querySelector) => {
  const element = document.querySelector(querySelector), { lastFocusedArray } = window;
  if (lastFocusedArray && element &&!lastFocusedArray.find((el) => el === element)) {
    lastFocusedArray.push(element);
  }
};
export const removeLastElementFromLastFocusedArray = (id) => {
  const {lastFocusedArray} = window;
  //keeps last element if it's the only element in array
  if (lastFocusedArray && lastFocusedArray.length > 1){
    const lastElementInArray = lastFocusedArray[lastFocusedArray.length - 1];
    if (lastElementInArray.id === id){
      lastFocusedArray.pop();
    }
  }
};

export const removeStopSpinnerButtonFromLastFocusedArray = () => removeLastElementFromLastFocusedArray('btnStopAnimation');