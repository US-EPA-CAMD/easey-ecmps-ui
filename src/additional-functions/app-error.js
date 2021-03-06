export const needEndDate = "Must enter in both End Date and End Time";
export const displayAppError = (error) => {
  const appearAnimation = "flip-in-x-reverse";

  if (document.querySelector("#appErrorMessageText")) {
    document.querySelector("#appErrorMessageText").innerHTML = error;
    document.querySelector("#appErrorMessage").classList.remove("display-none");
    document
      .querySelector("#appErrorMessage")
      .classList.remove(appearAnimation);
    document.querySelector("#appErrorMessage").classList.add(appearAnimation);
    document
      .querySelectorAll("svg path")
      .forEach((element) => (element.tabIndex = -1));
  }
};

export const hideAppError = () => {
  if (document.querySelector("#appErrorMessageText")) {
    document.querySelector("#appErrorMessageText").innerHTML = "";
    document.querySelector("#appErrorMessage").classList.add("display-none");
  }
};
