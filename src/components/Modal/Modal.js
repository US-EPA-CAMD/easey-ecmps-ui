import React, { createContext, useEffect, createRef } from "react";
import ReactDom from "react-dom";

import { Button } from "@trussworks/react-uswds";

import { ClearSharp } from "@material-ui/icons";

import "./Modal.scss";

import { focusTrap } from "../../additional-functions/focus-trap";

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

  useEffect(() => {
    const { handleKeyPress } = focusTrap(".modal-content", close);

    // *** FOCUS TRAP
    document.addEventListener("keydown", handleKeyPress);

    // *** 508 remediation; scroll to top on modal open
    setTimeout(() => {
      window.scrollTo(0, 0);
    });

    // * clean up
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [close]);

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
                className="position-absolute right-1 top-1 cursor-pointer text-bold"
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
              <div className="modal-body modal-color maxh-tablet overflow-y-scroll margin-top-2">
                {children}
              </div>

              <div className="modal-footer  ">
                {showSave ? (
                  <div>
                    <Button
                      type="button"
                      onClick={save ? save : close}
                      title="Click to save"
                      epa-testid="saveBtn"
                      className='margin-right-2'
                    >
                      {saveButtonText}
                    </Button>
                    <Button
                      type="button"
                      onClick={close}
                      title="Click to cancel"
                      epa-testid="cancelBtn"
                      outline={true}
                      unstyled={"true"}
                    >
                      {cancelButtonText}
                    </Button>
                  </div>
                ) : null}
                {showCancel ? (
                  <Button
                    type="button"
                    onClick={close}
                    title="Click to close"
                    epa-testid="closeBtn"
                    className="float-left"
                  >
                    {"Close"}
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
