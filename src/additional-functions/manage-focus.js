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

    console.log("stored:");

    console.log(window["lastFocusedArray"]);
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
    const lastFocus =
      window["lastFocusedArray"][window["lastFocusedArray"].length - 1];

    console.log("found: ", lastFocus);
    let counter = 0;
    if (lastFocus && lastFocus.id) {
      const selectedFocus = document.querySelector(`#${lastFocus.id}`);
      console.log("set", selectedFocus);

      // counter is trivial number, can be 1.
      while (document.activeElement !== selectedFocus && counter < 5) {
        selectedFocus
          ? console.log("selectedFocus.focus()", selectedFocus.focus())
          : // might need to check for an edge case when the array is empty
            console.log(
              "did not find lastfocus id element",
              window["lastFocusedArray"][0].focus()
            );
        counter++;
      }
    }
  }
};

export const returnFocusToCommentButton = () => {
  if (!_.isNil(window["lastFocusedArray"])) {
    const lastFocus =
      window["lastFocusedArray"][window["lastFocusedArray"].length - 1];

    console.log("found: ", lastFocus);
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
          console.log("element", element);
          window["lastModalButton"] = [];
        } else {
        }
      }
    }
  }
};
