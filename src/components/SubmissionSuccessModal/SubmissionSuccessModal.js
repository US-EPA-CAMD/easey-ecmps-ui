import "../SubmissionModal/SubmissionModal.scss";
import React, { useEffect, createRef } from "react";
import ReactDom from "react-dom";
import { Button } from "@trussworks/react-uswds";
import { ClearSharp } from "@material-ui/icons";

const modalClassName = "modal-wrapper radius-md";

let modalRoot = document.getElementById("portal");
if (!modalRoot) {
  modalRoot = document.createElement("div");
  modalRoot.setAttribute("id", "portal");
  document.body.appendChild(modalRoot);
}

export const SubmissionSuccessModal = ({
  width = "20%",
  left = "40%",
  callback,
}) => {
  const modalRef = createRef();

  useEffect(() => {
    // *** 508 remediation; scroll to top on modal open
    setTimeout(() => {
      window.scrollTo(0, 0);
    });

    setTimeout(() => {
      if (document.querySelector("#closeButton")) {
        document.querySelector("#closeButton").focus();
      }
    }, 1000);
  }, []);

  return ReactDom.createPortal(
    <div role="dialog" aria-modal="true">
      <div ref={modalRef}>
        <div
          className={`${modalClassName} react-transition flip-in-x`}
          style={{
            width: `${!width ? "50%" : width}`,
            left: `${!left ? "25%" : left}`,
          }}
        >
          <div className="modal-content modal-color padding-y-3">
            <div className="modal-header modal-color padding-y-1 border-bottom-1px border-base-lighter">
              <ClearSharp
                className="position-absolute right-1 top-1 cursor-pointer text-bold"
                id="closeModalBtn"
                data-testid="closeModalBtn"
                title="Close Modal"
                epa-testid="closeXBtn"
                role="button"
                tabIndex="0"
                aria-hidden={false}
                onClick={callback}
                onKeyPress={(event) => {
                  if (event.key === "Enter") {
                    callback();
                  }
                }}
              />
            </div>

            <div className="modal-body margin-x-2 padding-top-0 modal-color maxh-tablet overflow-y-auto">
              <div className="display-flex flex-column flex-align-center">
                <h2 className="margin-y-1">Submission Success!</h2>
                <center className="padding-y-2">
                  The records you submitted have been queued for submission.
                </center>
                <Button
                  data-testid="submissionSuccessButton"
                  id="closeButton"
                  onClick={callback}
                >
                  Close
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>,
    modalRoot
  );
};
export default SubmissionSuccessModal;
