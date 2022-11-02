import "./SubmissionModal.scss";
import React, { useEffect, createRef, useState } from "react";
import ReactDom from "react-dom";
import {
  Button,
  StepIndicator,
  StepIndicatorStep,
  Label,
  TextInput,
  Alert,
  Checkbox,
} from "@trussworks/react-uswds";
import { ClearSharp } from "@material-ui/icons";
import * as yup from "yup";

import LoadingModal from "../LoadingModal/LoadingModal";
import { SelectableAccordion } from "../SelectableAccordion/SelectableAccordion.js";

export const SubmissionModal = ({
  show,
  close,
  width = "50%",
  left = "25%",
  submissionCallback,
}) => {
  const modalRef = createRef();

  const [canCheck, setCanCheck] = useState(false);
  const [checked, setChecked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [answer, setAnswer] = useState("");
  const [showAnswer, setShowAnswer] = useState(false);
  const [question, setQuestion] = useState(
    "What is the city you were born in?"
  );
  const [showError, setShowError] = useState(false);
  const [formErrorMessage, setFormErrorMessage] = useState("");

  // Navigation state variables
  const [stage, setStage] = useState(1); // 1 is Auth, 2 is Challenge question, 3 is Cert Statements

  const authFormSchema = yup.object().shape({
    username: yup.string().required("Username is required"),
    password: yup.string().required("Password is required"),
  });

  const answerFormSchema = yup.object().shape({
    answer: yup.string().required("Answer is required"),
  });

  let modalRoot = document.getElementById("portal");
  if (!modalRoot) {
    modalRoot = document.createElement("div");
    modalRoot.setAttribute("id", "portal");
    document.body.appendChild(modalRoot);
  }

  const modalClassName = "modal-wrapper radius-md";

  const usernameText = "username";
  const passwordText = "password";
  const answerText = "answer";

  const verifyClicked = (event) => {
    if (stage === 1) {
      submitAuth(event);
    } else if (stage === 2) {
      submitAnswer(event);
    } else if (stage === 3) {
      submissionCallback();
    }
  };

  const submitAuth = async (event) => {
    event.preventDefault();

    const isFormValid = await authFormSchema.isValid(
      { username, password },
      {
        abortEarly: false,
      }
    );

    // *** display clientside errors
    if (!isFormValid) {
      setShowError(true);
      setFormErrorMessage("Please enter your username and password");
    } else {
      console.log("Submitting Login Request");
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setStage(2);
        setShowError(false);
      }, 1000);
    }
  };

  const submitAnswer = async (event) => {
    event.preventDefault();

    const isFormValid = await answerFormSchema.isValid(
      { answer },
      {
        abortEarly: false,
      }
    );

    // *** display clientside errors
    if (!isFormValid) {
      setShowError(true);
      setFormErrorMessage("Please enter your answer to the challenge question");
    } else {
      console.log("Submitting Answer Request");
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setStage(3);
        setShowError(false);
      }, 1000);
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

              <StepIndicator
                className="padding-2 margin-2"
                counters="default"
                headingLevel="h5"
              >
                <StepIndicatorStep
                  label="Verify Credentials"
                  status={stage === 1 ? "current" : "complete"}
                />
                <StepIndicatorStep
                  label="Challenge Question"
                  status={
                    stage === 2
                      ? "current"
                      : stage < 2
                      ? "incomplete"
                      : "complete"
                  }
                />
                <StepIndicatorStep
                  label="Submission & Certification Statements"
                  status={stage === 3 ? "current" : "incomplete"}
                />
              </StepIndicator>
            </div>

            <div className="modal-body margin-x-2 padding-top-0 modal-color maxh-tablet overflow-y-auto">
              {showError && (
                <Alert
                  type="error"
                  heading="Authentication Errors"
                  role="alert"
                >
                  {formErrorMessage}
                </Alert>
              )}
              <h2>User Credentials</h2>
              <div aria-live="polite"></div>
              <div className="grid-row">
                <div className="desktop:grid-col-5 grid-col-12">
                  <Label htmlFor={usernameText}>Username</Label>
                  <TextInput
                    data-test="component-login-username"
                    id={usernameText}
                    name={usernameText}
                    type={username ? "text" : "password"}
                    value={username}
                    onChange={(event) => setUsername(event.target.value)}
                  />
                </div>

                <div className="grid-col-2 " />

                <div className="desktop:grid-col-5 grid-col-12">
                  <Label className="margin-left-auto" htmlFor={passwordText}>
                    Password
                  </Label>
                  <TextInput
                    data-test="component-login-password"
                    className="margin-left-auto"
                    id={passwordText}
                    name={passwordText}
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                  />
                  <p className="usa-form__note">
                    <Button
                      type="button"
                      unstyled="true"
                      title="Show password"
                      href=""
                      className="usa-show-password"
                      aria-controls={passwordText}
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? "Hide password" : "Show password"}
                    </Button>
                  </p>
                </div>
              </div>
              {stage >= 2 && (
                <div>
                  <h2>Challenge Question</h2>
                  <div className="grid-row">
                    <div className="desktop:grid-col-5 grid-col-12">
                      <p className="challenge-question"> {question} </p>
                    </div>

                    <div className="grid-col-2 " />

                    <div className="desktop:grid-col-5 grid-col-12">
                      <Label className="margin-left-auto" htmlFor={answerText}>
                        Answer
                      </Label>
                      <TextInput
                        className="margin-left-auto"
                        data-test="component-answer"
                        id={answerText}
                        name={answerText}
                        type={showAnswer ? "text" : "password"}
                        value={answer}
                        onChange={(event) => setAnswer(event.target.value)}
                      />
                      <p className="usa-form__note">
                        <Button
                          type="button"
                          unstyled="true"
                          title="Show answer"
                          href=""
                          className="usa-show-password"
                          aria-controls={answerText}
                          onClick={() => setShowAnswer(!showAnswer)}
                        >
                          {showAnswer ? "Hide answer" : "Show answer"}
                        </Button>
                      </p>
                    </div>
                  </div>
                </div>
              )}
              {stage >= 3 && (
                <div>
                  <h2>Certification Statement(s)</h2>
                  <SelectableAccordion
                    setCanCheck={setCanCheck}
                    items={[
                      {
                        title: "Statement",
                        content: "Content",
                        expanded: false,
                        hasExpanded: false,
                      },
                      {
                        title: "Statement",
                        content: "Content",
                        expanded: false,
                        hasExpanded: false,
                      },
                    ]}
                  />
                </div>
              )}
            </div>
            <div className="modal-footer">
              <div>
                {stage === 3 && (
                  <Checkbox
                    className="display-inline-block margin-right-2"
                    id="checkbox"
                    name="checkbox"
                    onChange={(e) => setChecked(e.target.checked)}
                    disabled={!canCheck}
                    label="I agree to all certification statements"
                  />
                )}

                <Button
                  type="button"
                  title="Click to save"
                  epa-testid="saveBtn"
                  id="saveBtn"
                  data-testid="saveBtn"
                  disabled={stage !== 3 ? false : checked ? false : true}
                  className="margin-right-2 display-inline-block"
                  onClick={verifyClicked}
                >
                  Verify
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
      <LoadingModal loading={loading} />
    </div>,
    modalRoot
  );
};
export default SubmissionModal;
