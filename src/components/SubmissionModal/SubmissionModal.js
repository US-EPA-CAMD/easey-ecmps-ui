import "./SubmissionModal.scss";
import React, { useEffect, createRef, useState, useCallback } from "react";
import ReactDom from "react-dom";
import {
  Button,
  Alert,
  Checkbox,
} from "@trussworks/react-uswds";
import { ClearSharp } from "@material-ui/icons";

import LoadingModal from "../LoadingModal/LoadingModal";
import { SelectableAccordion } from "../SelectableAccordion/SelectableAccordion.js";
import {createActivity, getCredentials} from "../../utils/api/easeyAuthApi";

export const SubmissionModal = ({
  show,
  close,
  width = "50%",
  left = "25%",
  submissionCallback,
  monitorPlanIds,
  activityId,
  setActivityId,
}) => {
  const modalRef = createRef();
  const [submissionActionLog, setSubmissionActionLog] = useState({});
  const [canCheck, setCanCheck] = useState(false);
  const [checked, setChecked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showError, setShowError] = useState(false);
  const [formErrorMessage, setFormErrorMessage] = useState("");
  const [statements, setStatements] = useState([]);

  let modalRoot = document.getElementById("portal");
  if (!modalRoot) {
    modalRoot = document.createElement("div");
    modalRoot.setAttribute("id", "portal");
    document.body.appendChild(modalRoot);
  }

  const modalClassName = "modal-wrapper radius-md";

  const handleUserKeyPress = useCallback((event) => {
    const { key } = event;
    if (key === "Enter") {
      event.preventDefault();
      document.getElementById("saveBtn").focus();
      document.getElementById("saveBtn").click();
    }
  }, []);

  useEffect(() => {
    async function fetchCredentials() {
      setLoading(true);  // Set loading to true before fetching data
      try {
        const result = await getCredentials(monitorPlanIds);
        const list = result.data.map((el) => ({
          title: "Certification Statement",
          content: el.statementText,
          expanded: false,
          hasExpanded: false,
          facData: el.facData,
        }));
        setStatements(list);
      } catch (err) {
        setShowError(true);
        setFormErrorMessage(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);  // Set loading to false after fetching data
      }
    }

    fetchCredentials();
  }, [monitorPlanIds]);


  useEffect(() => {
    window.addEventListener("keydown", handleUserKeyPress);
    return () => {
      window.removeEventListener("keydown", handleUserKeyPress);
    };
  }, [handleUserKeyPress]);

  const verifyClicked = async (event) => {

    try {
      //Create the CROMERR activity here
      const user = JSON.parse(localStorage.getItem("ecmps_user"));

      const result = await createActivity({
        userId: user.userId,
        firstName: user.firstName,
        lastName: user.lastName,
        middleInitial: '',
        activityDescription: `ECMPS Submission for ${user.userId}`,
      });

      if (result?.message) {
        setShowError(true);
        setFormErrorMessage(result.message);
        return;
      }

      setActivityId(result.data.activityId);

      //Go back to the EvaluateAndSubmit
      setSubmissionActionLog({
        ...submissionActionLog,
        verified: new Date(),
      });
      submissionCallback(submissionActionLog);
    } catch (err) {
      setShowError(true);
      setFormErrorMessage(err.response?.data?.message || err.message);
    }
  };

  useEffect(() => {
    // *** 508 remediation; scroll to top on modal open
    setTimeout(() => {
      window.scrollTo(0, 0);
    });

    setTimeout(() => {
      if (document.querySelector("#closeModalBtn")) {
        document.querySelector("#closeModalBtn").focus();
      }
    }, 1000);
  }, []);

  //Ensure scrolling is only within the modal window
  useEffect(() => {
    const body = document.body;
    if (show) {
      body.style.overflow = "hidden";
    } else {
      body.style.overflow = "auto";
    }
    return () => {
      body.style.overflow = "auto";
    };
  }, [show]);

  return ReactDom.createPortal(
    <div role="dialog" aria-modal="true">
      <div ref={modalRef}>
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
                id="closeModalBtn"
                data-testid="closeModalBtn"
                title="Close Modal"
                epa-testid="closeXBtn"
                role="button"
                tabIndex="0"
                aria-hidden={false}
                onClick={close}
                onKeyPress={(event) => {
                  if (event.key === "Enter") {
                    close();
                  }
                }}
              />
            </div>

            <div className="modal-body margin-x-2 padding-top-0 modal-color maxh-tablet overflow-y-auto">
              {showError && (
                <Alert
                  type="error"
                  heading="Certification Error"
                  headingLevel="h4"
                  role="alert"
                >
                  {formErrorMessage}
                </Alert>
              )}
                <div>
                  <h2>Certification Statement(s)</h2>
                  {statements.length > 0 && (
                    <SelectableAccordion
                      setCanCheck={setCanCheck}
                      items={statements}
                      submissionActionLog={submissionActionLog}
                      setSubmissionActionLog={setSubmissionActionLog}
                    />
                  )}

                </div>
            </div>
            <div className="modal-footer">
              <div>
                <Checkbox
                  className="display-inline-block margin-right-2"
                  id="checkbox"
                  name="checkbox"
                  data-testid="component-checkbox"
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSubmissionActionLog({
                        ...submissionActionLog,
                        agreeAll: new Date(),
                      });
                    }

                    setChecked(e.target.checked);
                  }}
                  disabled={!canCheck}
                  label="I agree to all certification statements"
                />

                <Button
                  type="button"
                  title="Click to save"
                  epa-testid="saveBtn"
                  id="saveBtn"
                  data-testid="saveBtn"
                  disabled={!checked}
                  className="margin-right-2 display-inline-block"
                  onClick={verifyClicked}
                >
                  Certify
                </Button>

                <Button
                  type="button"
                  title="Click to cancel"
                  epa-testid="cancelBtn"
                  outline={true}
                  unstyled={"true"}
                  className="display-inline-block"
                  onClick={close}
                >
                  Close
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <LoadingModal type="Loading" loading={loading} />
    </div>,
    modalRoot
  );
};
export default SubmissionModal;
