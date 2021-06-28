import React, { createContext, useEffect, useState, createRef } from "react";
import ReactDom from "react-dom";

import { Button } from "@trussworks/react-uswds";

import { ClearSharp } from "@material-ui/icons";

import "./Modal.scss";

const modalContext = createContext(null, null);

export const Modal = ({
  show,
  close,
  save,
  children,
  showCancel,
  showSave,
  width = "50%",
  left = "25%",
  cancelButtonText = "Cancel",
  saveButtonText = "Save and Close",
  secondLevel,
}) => {
  const modalRef = createRef();
  const [tabs, setTabs] = useState(0);

  useEffect(() => {
    // *** identify focusable modal elements
    const modalFocusableElements =
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

    // *** isolate modal and its focusable content
    const modal = document.querySelector(".modal-content");
    const focusableModalContent = modal.querySelectorAll(
      modalFocusableElements
    );

    // *** isolate first element to be focused inside modal
    const firstModalFocusableElement = modal.querySelectorAll(
      modalFocusableElements
    )[0];
    // *** isolate last element to be focused inside modal
    const lastModalFocusableElement =
      focusableModalContent[focusableModalContent.length - 1];

    // *** this function will be used to deal with key presses while the modal is open
    const handleKeyPress = (event) => {
      if (event.key === "Escape") {
        close();
      }

      // *** disregard anything other than tab (which leads to change of focus)
      if (event.key === "Tab") {
        // *** handle shift + tab
        if (event.shiftKey) {
          // *** if focused on first focusable element, cycle back to last on next tab press
          if (document.activeElement === firstModalFocusableElement) {
            lastModalFocusableElement.focus();
            event.preventDefault();
          }
        }
        // *** handle tab
        else {
          // *** if focused on last focusable element, cycle back to first on next tab press
          if (document.activeElement === lastModalFocusableElement) {
            firstModalFocusableElement.focus();
            event.preventDefault();
          }
        }
      }
    };

    // *** FOCUS TRAP
    document.addEventListener("keydown", (event) => {
      handleKeyPress(event);
    });

    // *** focus on the first element as soon as modal pops open and the first focusable
    // *** element is in scope
    setTimeout(() => {
      firstModalFocusableElement.focus();
    });

    // * clean up
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  let modalRoot = document.getElementById("portal");
  if (!modalRoot) {
    modalRoot = document.createElement("div");
    modalRoot.setAttribute("id", "portal");
    document.body.appendChild(modalRoot);
  }

  const modalClassName = "modal-wrapper bg-base-lightest radius-md";

  return ReactDom.createPortal(
    <div role="dialog" aria-modal="true">
      <div ref={modalRef}>
        <modalContext.Provider value={{ close }}>
          <div
            className={
              show
                ? `${modalClassName} react-transition flip-in-x`
                : `${modalClassName}`
            }
            style={{
              width: width,
              left: left,
            }}
          >
            <div className="modal-content modal-color padding-y-3">
              <ClearSharp
                className="position-absolute right-1 top-1 cursor-pointer"
                onClick={close}
                onKeyPress={(event) => {
                  if (event.key === "Enter") {
                    close();
                  }
                }}
                title="Click to save"
                epa-testid="closeXBtn"
                role="button"
                tabIndex="0"
              />
              <div className="modal-body modal-color">{children}</div>

              <div className="modal-footer">
                {showCancel ? (
                  <Button
                    onClick={close}
                    title="Click to save"
                    epa-testid="cancelBtn"
                    outline={true}
                  >
                    {cancelButtonText}
                  </Button>
                ) : null}
                {showSave ? (
                  <Button
                    onClick={save ? save : close}
                    title="Click to save"
                    epa-testid="saveBtn"
                  >
                    {saveButtonText}
                  </Button>
                ) : null}
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
