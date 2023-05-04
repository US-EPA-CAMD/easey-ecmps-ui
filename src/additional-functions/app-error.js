export const needEndDate = "Must enter in both End Date and End Time";
export const displayAppError = (error) => {
  const formattedError = Array.isArray(error) ? error.join('\n') : error
  const appearAnimation = "flip-in-x-reverse";

  if (document.querySelector("#appErrorMessageText")) {
    document.querySelector("#appErrorMessageText").innerHTML = formattedError;

    const errorMsg = document.querySelector("#appErrorMessage")

    errorMsg.classList.remove("display-none");
    errorMsg.classList.remove(appearAnimation);
    errorMsg.classList.add(appearAnimation);
    document
      .querySelectorAll("svg path")
      .forEach((element) => (element.tabIndex = -1));

    errorMsg.addEventListener("click", hideAppError);

    const svgElements = document.querySelectorAll('#appErrorMessage .MuiSvgIcon-root');
    const xButtonSvg = svgElements[1];
    xButtonSvg.setAttribute('aria-label', 'Close error message');
  }
};

export const hideAppError = () => {
  if (document.querySelector("#appErrorMessageText")) {
    document.querySelector("#appErrorMessageText").innerHTML = "";
    document.querySelector("#appErrorMessage").classList.add("display-none");
    window.removeEventListener("click", hideAppError);
  }
};
