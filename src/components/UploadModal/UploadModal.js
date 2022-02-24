import React, { createContext, useEffect, useState, createRef } from "react";
import ReactDom from "react-dom";

import { Button } from "@trussworks/react-uswds";

import { ClearSharp } from "@material-ui/icons";

import "./Modal.scss";

import { focusTrap } from "../../additional-functions/focus-trap";

const modalContext = createContext(null, null);

export const UploadModal = ({
  show,
  close,
  port,
  children,
  showCancel,
  width = "50%",
  left = "25%",
  title,
  exitBTN,
  disablePortBtn,
  timer,
  setFinishedLoading,
  setShowImportModal,
  preloader,
}) => {
  const [isLoading, setLoading] = useState(true);

  const onLoadEffect = () => {
    if (timer) {
      setTimeout(() => {
        setLoading(false);
        setFinishedLoading(true);
        setShowImportModal(true);
      }, 2000);
    }
  };

  useEffect(onLoadEffect, []);
  const modalRef = createRef();
  const styles = {
    loadingWrapper: {
      position: "fixed",
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      width: "100%",
      height: "100%",
      margin: 0,
      padding: 0,
      zIndex: 815,
    },
    innerWrapper: {
      position: "fixed",
      top: "40%",
      transform: "translateY(-50%)",
      left: 0,
      right: 0,
      width: "80%",
      height: "400px",
      margin: "0 auto",
      padding: 0,
      zIndex: 17,
    },
    modalTintScreen: {
      position: "absolute",
      top: 0,
      bottom: 0,
      width: "100%",
      height: "100%",
      opacity: "0.9",
      zIndex: "0",
      textIndent: "-9999px",
      backgroundColor: "gray",
    },
  };

  const [disableBtn, setDisableBtn] = useState(false);

  useEffect(() => {
    setDisableBtn(true);
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

  const modalClassName = "modal-wrapper radius-md";

  return ReactDom.createPortal(
    <div role="dialog" aria-modal="true">
      <div
        data-test="component-loading"
        className="loading-modal"
        style={styles.loadingWrapper}
      >
        <div style={styles.innerWrapper}>
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
                  {" "}
                  {!preloader ? (
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
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                  <div className="modal-body padding-top-0 modal-color maxh-tablet overflow-y-auto">
                    {children}
                  </div>
                  {!preloader ? (
                    <div className="modal-footer ">
                      <Button
                        type="button"
                        onClick={port}
                        title="Click to import"
                        epa-testid="importBtn"
                        id="importBtn"
                        data-testid="importBtn"
                        className="margin-right-2"
                        disabled={disablePortBtn}
                      >
                        {"Import"}
                      </Button>

                      {showCancel ? (
                        <Button
                          type="button"
                          onClick={close}
                          title="Click to cancel"
                          epa-testid="cancelBtn"
                          outline={true}
                          unstyled={"true"}
                        >
                          {"Cancel"}
                        </Button>
                      ) : null}
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </modalContext.Provider>
          </div>
        </div>{" "}
      </div>
      <div style={styles.modalTintScreen} />
    </div>,
    modalRoot
  );
};
export default UploadModal;
