// *** the purpose of this function is to add epa-active-element class to currently active element

const epaActiveElemnt = "epa-active-element";
export const addActiveClass = (event) => {
  // *** remove any existing elements first
  removeActiveClass(event);
  setTimeout(() => {
    event.target.classList.add(epaActiveElemnt);

    event.target.parentElement && event.target.parentElement.classList
      ? event.target.parentElement.classList.add(epaActiveElemnt)
      : void 0;
  });
  return 1;
};
export const removeActiveClass = (event) => {
  return event.target.classList !== undefined
    ? event.target.classList.remove(epaActiveElemnt)
    : null;
};

export const handleActiveElementFocus = () => {
  document.querySelectorAll("*").forEach((element) => {
    element.addEventListener(
      "keydown",
      (event) => {
        // *** disregard anything except "Enter" presses
        event.key === "Enter" ? addActiveClass(event) : void 0;
      },
      true
    );

    element.addEventListener("click", (event) => {
      addActiveClass(event);
    });

    element.addEventListener(
      "blur",
      (event) => {
        removeActiveClass(event);
      },
      true
    );
  });
  return 1;
};
