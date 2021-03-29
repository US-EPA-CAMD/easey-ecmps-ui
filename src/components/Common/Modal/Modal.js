import React, { createContext, useEffect, createRef } from "react";
import ReactDom from "react-dom";
import "./Modal.css";

const modalContext = createContext();

const Modal = ({ show, close, children }) => {
  useEffect(() => {
    function keyListener(e) {
      if (e != null) {
        const listener = keyListenersMap.get(e.keyCode);
        return listener && listener(e);
      }
    }
    document.addEventListener("keydown", keyListener);
    return () => document.removeEventListener("keydown", keyListener);
  });

  const modalRef = createRef();
  const [tabs, setTabs] = React.useState(0);
  const handleTabKey = (e) => {
    const focusableModalElements = modalRef.current.querySelectorAll(
      'a[href],span,button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select'
    );
    let currentElement;
    if (!e.shiftKey && document.activeElement !== currentElement) {
      if (tabs < focusableModalElements.length - 1) {
        setTabs(tabs + 1);
      } else {
        setTabs(0);
      }
      currentElement = focusableModalElements[tabs];
      currentElement.focus();
      return e.preventDefault();
    }

    if (e.shiftKey && document.activeElement !== currentElement) {
      if (tabs > 0) {
        setTabs(tabs - 1);
      } else {
        setTabs(focusableModalElements.length - 1);
      }
      currentElement = focusableModalElements[tabs];
      currentElement.focus();
      return e.preventDefault();
    }
  };

  const keyListenersMap = new Map([
    [27, close],
    [9, handleTabKey],
  ]);
  let modalRoot = document.getElementById("portal");
  if (!modalRoot) {
    modalRoot = document.createElement("div");
    modalRoot.setAttribute("id", "portal");
    document.body.appendChild(modalRoot);
  }

  return ReactDom.createPortal(
    <div className="" role="dialog" aria-modal="true">
      <div className="" ref={modalRef}>
        <modalContext.Provider value={{ close }}>
          <div
            className="modal-wrapper modal-color"
            style={{
              transform: show ? "translateY(0vh)" : "translateY(-100vh)",
              opacity: show ? "1" : "0",
            }}
          >
            <div className="modal-header modal-color">
              <span
                tabIndex="0"
                onClick={close}
                id={"close"}
                title={"close"}
                className="close-modal-btn"
                aria-haspopup="true"
                aria-labelledby={"close"}
              >
                <i className="fa fa-times fa-sm" alt="close"></i>
              </span>
            </div>
            <div className="modal-content modal-color">
              <div className="modal-body modal-color"></div>

              <div className="modal-footer modal-color">
                <button onClick={close} className="cancelBTN modal-color">
                  Cancel
                </button>
                <button onClick={close} className="saveCloseBTN">
                  Save and Close
                </button>
              </div>
            </div>
          </div>
        </modalContext.Provider>
      </div>
    </div>,
    modalRoot
  );
};
export default Modal;
