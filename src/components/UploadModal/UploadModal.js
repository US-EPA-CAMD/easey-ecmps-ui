import React, { createContext, useEffect, createRef } from "react";
import ReactDom from "react-dom";

import { Button, Alert, Label } from "@trussworks/react-uswds";

import { ClearSharp } from "@material-ui/icons";

import "./UploadModal.scss";

import { focusTrap } from "../../additional-functions/focus-trap";
const modalContext = createContext(null, null);

export const UploadModal = ({
  show,
  close,
  port,
  children,
  showCancel,
  width,
  left,
  title,
  disablePortBtn,
  preloader,
  complete,
  hasFormatError,
  hasInvalidJsonError,
  mainBTN,
  importedFileErrorMsgs,
  notUploadVersion,
  setUpdateRelatedTables,
  successMsg,
  showTintedBg = true,
  showImport = true,
  showSeparators = false,
  label = null,
}) => {
  const hasErrors = importedFileErrorMsgs && importedFileErrorMsgs.length > 0;

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
  };

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
      const importBtn = document.getElementById("importBtn");
      if (importBtn) {
        importBtn.focus();
      }
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
    <div role="dialog" aria-modal="true" className="upload-modal-container">
      {showTintedBg && <div className="usa-overlay is-visible"></div>}
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
                style={
                  hasErrors
                    ? {
                        width: "70%",
                        left: "15%",
                      }
                    : {
                        width: `${!width ? "34%" : width}`,
                        left: `${!left ? "33%" : left}`,
                      }
                }
              >
                <div
                  className={`modal-content ${!complete ? "padding-y-3" : ""}`}
                >
                  <ClearSharp
                    className="position-absolute right-1 top-1 cursor-pointer text-bold"
                    onClick={close}
                    onKeyPress={(event) => {
                      if (event.key === "Enter") {
                        close();
                        setUpdateRelatedTables(true);
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
                  {notUploadVersion ? (
                    ""
                  ) : !preloader ? (
                    <div className="">
                      {!complete ? (
                        <div>
                          {hasFormatError || hasInvalidJsonError ? (
                            <div className="left-2 padding-x-5 padding-top-2 padding-bottom-1">
                              <Alert
                                type="error"
                                heading="Import Monitoring Plan error"
                                headingLevel="h4"
                                slim
                                noIcon
                                role="alert"
                              >
                                {hasFormatError
                                  ? "Only JSON files may be submitted"
                                  : "Selected JSON file is invalid"}
                              </Alert>
                            </div>
                          ) : (
                            <div className="left-2 bottom-0 padding-x-5 padding-top-2">
                              <h2 className="text-bold">{title}</h2>
                              {label ?? (
                                <Label htmlFor="file-input-single">
                                  {label}
                                </Label>
                              )}
                              {showSeparators && <hr />}
                            </div>
                          )}
                        </div>
                      ) : (
                        <div>
                          {hasErrors ? (
                            <div className="padding-x-8 padding-top-3">
                              <h3 id="importErrorsHeading">
                                File Import Error(s)
                              </h3>
                              {Array.isArray(importedFileErrorMsgs) ? (
                                <p id="importErrorSubText">
                                  {`The file selected for import has ${importedFileErrorMsgs.length} error(s).`}
                                </p>
                              ) : (
                                <p id="importErrorSubText">
                                  {`The file selected for import has 1 error.`}
                                </p>
                              )}
                            </div>
                          ) : (
                            <div className="left-2 padding-x-5 padding-top-5 padding-bottom-1">
                              <Alert
                                type="success"
                                heading="Success"
                                headingLevel="h4"
                                role="success"
                              >
                                {successMsg}
                              </Alert>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  ) : (
                    ""
                  )}
                  <div
                    className={`modal-body padding-top-1 padding-bottom-1 overflow-y-auto ${
                      hasErrors ? "error-modal-body" : ""
                    } `}
                  >
                    {children}
                    {showSeparators && <hr />}
                  </div>
                  {complete && hasErrors ? (
                    <div className="padding-x-8">
                      <p className="text-right">
                        Please import revised file, once errors have been fixed.
                      </p>
                    </div>
                  ) : (
                    ""
                  )}

                  {notUploadVersion ? (
                    ""
                  ) : !preloader ? (
                    <div
                      className={`${
                        !complete
                          ? "upload-modal-footer padding-x-5"
                          : "upload-modal-footer--complete"
                      }`}
                    >
                      {complete ? (
                        <Button
                          type="button"
                          onClick={() => {
                            close();
                            setUpdateRelatedTables(true);
                          }}
                          title="Click to close import modal"
                          epa-testid="okBtn"
                          id="okBtn"
                          data-testid="okBtn"
                          className={
                            hasErrors ? "margin-right-5" : "margin-right-2"
                          }
                        >
                          Ok
                        </Button>
                      ) : (
                        <Button
                          type="button"
                          onClick={port}
                          title="Click to import"
                          epa-testid="importBtn"
                          id="importBtn"
                          data-testid="importBtn"
                          className={`margin-right-2 ${
                            !showImport && "visibility-hidden"
                          }`}
                          disabled={disablePortBtn}
                        >
                          {mainBTN ? mainBTN : "Import"}
                        </Button>
                      )}

                      {showCancel ? (
                        <Button
                          type="button"
                          onClick={close}
                          title="Click to cancel"
                          epa-testid="cancelBtn"
                          id="cancelBtn"
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
        </div>
      </div>
    </div>,
    modalRoot
  );
};
export default UploadModal;
