import React, { createContext, useEffect, createRef } from "react";
import ReactDom from "react-dom";
import { Alert, Button } from "@trussworks/react-uswds";
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
  title,
  exitBTN,
  breadCrumbBar,
  extraBtn,
  extraBtnText,
  disableExitBtn,
  errorMsgs = [],
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

    setTimeout(() => {
      if (document.querySelector("#closeModalBtn")) {
        document.querySelector("#closeModalBtn").focus();
      }
    }, 1000);

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

  const modalClassName = "modal-wrapper radius-md";

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
              width: `${!width ? "50%" : width}`,
              left: `${!left ? "25%" : left}`,
            }}
          >
            <div className="modal-content modal-color padding-y-3">
              <div className="modal-header modal-color border-bottom-1px border-base-lighter">
                <ClearSharp
                  className="position-absolute right-1 top-1 cursor-pointer text-bold"
                  onClick={close}
                  onKeyPress={(event) => {
                    if (event.key === "Enter") {
                      close();
                    }
                  }}
                  id="closeModalBtn"
                  data-testid="closeModalBtn"
                  title="Close Modal"
                  epa-testid="closeXBtn"
                  role="button"
                  tabIndex="0"
                  aria-hidden={false}
                />
                <div className="left-2 bottom-0 padding-2">
                  <h2 className="text-bold">{title}</h2>

                  {breadCrumbBar ? breadCrumbBar : ""}

                  {errorMsgs.map(error => (
                    <Alert
                      type="error"
                      slim
                      noIcon
                      key={error}
                      role="alert"
                    >
                      {error}
                    </Alert>
                  ))}
                </div>
              </div>

              <div className="modal-body padding-top-0 modal-color maxh-tablet overflow-y-auto">
                {children}
              </div>
              <span className="break-line" />
              <div className="modal-footer  ">
                {showSave ? (
                  <div>
                    <Button
                      type="button"
                      onClick={save}
                      title="Click to save"
                      epa-testid="saveBtn"
                      id="saveBtn"
                      data-testid="saveBtn"
                      className="margin-right-2"
                      disabled={disableExitBtn}
                    >
                      {exitBTN ? exitBTN : "Save and Go Back"}
                    </Button>

                    {extraBtn ? (
                      <Button
                        type="button"
                        outline={true}
                        onClick={extraBtn}
                        epa-testid="saveExtraBtn"
                        id="saveExtraBtn"
                        data-testid="saveExtraBtn"
                        className="margin-right-2 btn-black-text-and-outline"
                      >
                        {extraBtnText}
                      </Button>
                    ) : (
                      ""
                    )}
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
