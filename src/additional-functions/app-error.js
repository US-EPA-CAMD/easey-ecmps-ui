import DOMPurify from 'dompurify';

export const needEndDate = "Must enter in both End Date and End Time";

const displayAppMessage = (messages, type, hideFunc) => {
  const formattedError = Array.isArray(messages) ? messages.join('\n') : messages
  const appearAnimation = "flip-in-x-reverse";

  const containerId = `#app${type}Message`;
  const textMessageContainerId = `#app${type}MessageText`

  if (typeof document !== 'undefined' && document.querySelector(textMessageContainerId)) {
    document.querySelector(textMessageContainerId).innerHTML = DOMPurify.sanitize(formattedError);

    const errorMsg = document.querySelector(containerId)

    errorMsg.classList.remove("display-none");
    errorMsg.classList.remove(appearAnimation);
    errorMsg.classList.add(appearAnimation);
    document
      .querySelectorAll("svg path")
      .forEach((element) => (element.tabIndex = -1));


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
  displayAppMessage(error, "Error", hideAppError)
}


export const hideAppWarning = () =>{
  hideAppMessage("Warning", hideAppWarning)
}

export const displayAppWarning = (warnings) =>{
  displayAppMessage(warnings, "Warning", hideAppWarning)
}



