export const needEndDate = "Must enter in both End Date and End Time";

// export const displayAppError = (error) => {
//   const formattedError = Array.isArray(error) ? error.join('\n') : error
//   const appearAnimation = "flip-in-x-reverse";

//   if (typeof document !== 'undefined' && document.querySelector("#appErrorMessageText")) {
//     document.querySelector("#appErrorMessageText").innerHTML = formattedError;

//     const errorMsg = document.querySelector("#appErrorMessage")

//     errorMsg.classList.remove("display-none");
//     errorMsg.classList.remove(appearAnimation);
//     errorMsg.classList.add(appearAnimation);
//     document
//       .querySelectorAll("svg path")
//       .forEach((element) => (element.tabIndex = -1));

//     errorMsg.addEventListener("click", hideAppError);

//     const svgElements = document.querySelectorAll('#appErrorMessage .MuiSvgIcon-root');
//     const xButtonSvg = svgElements[1];
//     if (xButtonSvg) {
//       xButtonSvg.setAttribute('aria-label', 'Close error message');
//        }
//   }
// };

// export const hideAppError = () => {
//   if (typeof document !== 'undefined' && document.querySelector("#appErrorMessageText")) {
//     document.querySelector("#appErrorMessageText").innerHTML = "";
//     document.querySelector("#appErrorMessage").classList.add("display-none");
//     window.removeEventListener("click", hideAppError);
//   }
// };


const displayAppMessage = (messages, type, hideFunc) => {
  const formattedError = Array.isArray(messages) ? messages.join('\n') : messages
  const appearAnimation = "flip-in-x-reverse";

  const containerId = `#app${type}Message`;
  const textMessageContainerId = `#app${type}MessageText`

  console.log(containerId)
  console.log(textMessageContainerId)

  if (typeof document !== 'undefined' && document.querySelector(textMessageContainerId)) {
    document.querySelector(textMessageContainerId).innerHTML = formattedError;

    const errorMsg = document.querySelector(containerId)

    errorMsg.classList.remove("display-none");
    errorMsg.classList.remove(appearAnimation);
    errorMsg.classList.add(appearAnimation);
    document
      .querySelectorAll("svg path")
      .forEach((element) => (element.tabIndex = -1));

    errorMsg.addEventListener("click", hideFunc);

    const svgElements = document.querySelectorAll(`${containerId} .MuiSvgIcon-root`);
    const xButtonSvg = svgElements[1];
    if (xButtonSvg) {
      xButtonSvg.setAttribute('aria-label', `Close ${type} message`);
       }
  }
};

const hideAppMessage = (type, hideFunc) => {
  const containerId = `#app${type}Message`;
  const textMessageContainerId = `#app${type}MessageText`

  if (typeof document !== 'undefined' && document.querySelector(textMessageContainerId)) {
    document.querySelector(textMessageContainerId).innerHTML = "";
    document.querySelector(containerId).classList.add("display-none");
    window.removeEventListener("click", hideFunc);
  }
};

export const hideAppError = () =>{
  hideAppMessage("Error", hideAppError)
}

export const displayAppError = (error) =>{
  console.log("was here")
  displayAppMessage(error, "Error", hideAppError)
}


export const hideAppWarning = () =>{
  hideAppMessage("Warning", hideAppWarning)
}

export const displayAppWarning = (warnings) =>{
  displayAppMessage(warnings, "Warning", hideAppWarning)
}



