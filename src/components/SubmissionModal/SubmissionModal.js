import "./SubmissionModal.scss";
import React, { useEffect, createRef, useState, useCallback } from "react";
import ReactDom from "react-dom";
import {
  Button,
  StepIndicator,
  StepIndicatorStep,
  Label,
  TextInput,
  Alert,
  Checkbox,
  Fieldset,
  Radio,
  ComboBox,
} from "@trussworks/react-uswds";
import { ClearSharp } from "@material-ui/icons";
import * as yup from "yup";

import LoadingModal from "../LoadingModal/LoadingModal";
import { SelectableAccordion } from "../SelectableAccordion/SelectableAccordion.js";
import {
  credentialsAuth,
  getCredentials,
  sendPin,
  verifyChallenge,
} from "../../utils/api/easeyAuthApi";
import { useRef } from "react";

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
  const selectedNumber = useRef(null);

  const [submissionActionLog, setSubmissionActionLog] = useState({});

  const [verifyMethod, setVerifyMethod] = useState("Question");
  const [numbers, setNumbers] = useState([]);
  const [pinVisible, setPinVisible] = useState(false);

  const [questionId, setQuestionId] = useState(false);
  const [canCheck, setCanCheck] = useState(false);
  const [checked, setChecked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [answer, setAnswer] = useState("");
  const [pin, setPin] = useState("");
  const [showAnswer, setShowAnswer] = useState(false);
  const [question, setQuestion] = useState(
    "What is the city you were born in?"
  );
  const [showError, setShowError] = useState(false);
  const [formErrorMessage, setFormErrorMessage] = useState("");
  const [statements, setStatements] = useState([]);

  // Navigation state variables
  const [stage, setStage] = useState(1); // 1 is Auth, 2 is Challenge question, 3 is Cert Statements

  const authFormSchema = yup.object().shape({
    username: yup.string().required("Username is required"),
    password: yup.string().required("Password is required"),
  });

  const answerFormSchema = yup.object().shape({
    answer: yup.string().required("Answer is required"),
  });

  const pinFormSchema = yup.object().shape({
    pin: yup.string().required("Pin is required"),
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
  const pinText = "pin";
  const numberText = "number";

  const handleUserKeyPress = useCallback((event) => {
    const { key } = event;
    if (key === "Enter") {
      event.preventDefault();
      document.getElementById("saveBtn").focus();
      document.getElementById("saveBtn").click();
    }
  }, []);

  useEffect(() => {
    window.addEventListener("keydown", handleUserKeyPress);
    return () => {
      window.removeEventListener("keydown", handleUserKeyPress);
    };
  }, [handleUserKeyPress]);

  const sendPinToNumber = async () => {
    if (
      selectedNumber.current !== null &&
      selectedNumber.current !== undefined
    ) {
      const numberFull = numbers.find(
        (n) => n.value === selectedNumber.current
      ).actual;
      setPinVisible(true);
      await sendPin({
        activityId: activityId,
        userId: username,
        number: numberFull,
      });
    }
  };

  const verifyClicked = (event) => {
    if (stage === 1) {
      submitAuth(event);
    } else if (stage === 2) {
      submitAnswer(event);
    } else if (stage === 3) {
      setSubmissionActionLog({
        ...submissionActionLog,
        verified: new Date(),
      });
      submissionCallback(submissionActionLog);
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
      setLoading(true);

      try {
        const user = JSON.parse(sessionStorage.getItem("cdx_user"));

        const result = await credentialsAuth({
          userId: username,
          password: password,
          firstName: user.firstName,
          lastName: user.lastName,
        });

        setActivityId(result.data.activityId);
        setQuestionId(result.data.questionId);
        setQuestion(result.data.question);

        setNumbers(
          result.data.mobileNumbers.map((n, idx) => {
            return {
              value: idx.toString(),
              label: `(***)***-${n.substr(n.length - 4)}`,
              actual: n,
            };
          })
        );

        setStage(2);
        setShowError(false);
      } catch (e) {
        setShowError(true);
        setFormErrorMessage(e.message);
      }
      setLoading(false);
    }
  };

  const submitAnswer = async (event) => {
    event.preventDefault();

    let payload = {
      userId: username,
      questionId: questionId,
      answer: answer,
      activityId: activityId,
    };

    let isFormValid;
    if (verifyMethod === "Question") {
      isFormValid = await answerFormSchema.isValid(
        { answer },
        {
          abortEarly: false,
        }
      );
    } else {
      isFormValid = await pinFormSchema.isValid(
        { pin },
        {
          abortEarly: false,
        }
      );
      payload = { ...payload, pin: pin };
    }

    // *** display clientside errors
    if (!isFormValid) {
      setShowError(true);
      setFormErrorMessage(
        "Please enter an answer to the challenge / pin verification"
      );
    } else {
      setLoading(true);

      try {
        await verifyChallenge(payload);

        const result = await getCredentials(monitorPlanIds);

        const list = result.data.map((el) => {
          return {
            title: "Certification Statement",
            content: el.statementText,
            expanded: false,
            hasExpanded: false,
            facData: el.facData,
          };
        });

        setStatements(list);

        setStage(3);
        setShowError(false);
      } catch (e) {
        setShowError(true);
        setFormErrorMessage("Error Authenticating Answer");
      }
      setLoading(false);
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
              <div className="grid-row">
                <div className="desktop:grid-col-4 grid-col-12">
                  <Label htmlFor={usernameText}>Username</Label>
                  <TextInput
                    data-testid="component-login-username"
                    id={usernameText}
                    name={usernameText}
                    type={"text"}
                    value={username}
                    onChange={(event) => setUsername(event.target.value)}
                  />
                </div>

                <div className="desktop:grid-col-4 desktop:grid-offset-4 grid-col-12 ">
                  <Label className="" htmlFor={passwordText}>
                    Password
                  </Label>
                  <form>
                    <TextInput
                      data-testid="component-login-password"
                      id={passwordText}
                      name={passwordText}
                      autoComplete="on"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      className=""
                      onChange={(event) => setPassword(event.target.value)}
                    />
                  </form>
                  <p className="usa-form__note">
                    <Button
                      type="button"
                      unstyled="true"
                      title="Show password"
                      href=""
                      className="usa-show-password maxw-full"
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
                  <h2>Verification</h2>
                  <div className="grid-row">
                    <div className="grid-col-4">
                      <Fieldset id="unique" className="grid-row margin-top-1">
                        <Radio
                          className="grid-col-12 margin-bottom-1"
                          id={`verify-radio-button`}
                          defaultChecked
                          name="verify-method"
                          label={"Verification/Challenge Question"}
                          key={2}
                          data-testid="radio-question"
                          onClick={() => {
                            setPinVisible(false);
                            setVerifyMethod("Question");
                          }}
                        />
                        {false && (
                          <Radio
                            className="grid-col-12 margin-bottom-1"
                            id={`text-radio-button`}
                            name="verify-method"
                            label={"Send Text Message"}
                            key={3}
                            data-testid="radio-text"
                            onClick={() => {
                              setVerifyMethod("Text");
                            }}
                          />
                        )}
                      </Fieldset>
                    </div>

                    <div className="grid-col-4"></div>

                    <div className="grid-col-4">
                      {verifyMethod === "Question" && (
                        <div>
                          <Label className="" htmlFor={answerText}>
                            <h3 className="challenge-question margin-top-0">
                              {question}
                            </h3>
                            Answer
                          </Label>
                          <form>
                            <TextInput
                              data-testid="component-answer"
                              id={answerText}
                              autoComplete="on"
                              name={answerText}
                              type={showAnswer ? "text" : "password"}
                              value={answer}
                              className=""
                              onChange={(event) =>
                                setAnswer(event.target.value)
                              }
                            />
                          </form>
                          <p className="usa-form__note">
                            <Button
                              type="button"
                              unstyled="true"
                              title="Show answer"
                              href=""
                              className="usa-show-password margin-right-auto"
                              aria-controls={answerText}
                              onClick={() => setShowAnswer(!showAnswer)}
                            >
                              {showAnswer ? "Hide answer" : "Show answer"}
                            </Button>
                          </p>
                        </div>
                      )}

                      {verifyMethod === "Text" && (
                        <div>
                          <Label className="" htmlFor={numberText}>
                            <h3 className="challenge-question margin-top-0 margin-bottom-0">
                              Text message will be sent to:
                            </h3>
                          </Label>
                          <div className="grid-row">
                            <ComboBox
                              data-testid="number-dropwdown"
                              id={numberText}
                              name={numberText}
                              className=" margin-right-2 grid-col-8"
                              defaultValue={"0"}
                              options={numbers}
                              onChange={(value) => {
                                selectedNumber.current = value;
                              }}
                            />
                            <Button
                              onClick={sendPinToNumber}
                              className="grid-col-3"
                              data-testid="phone-send"
                            >
                              {!pinVisible ? "Send" : "Resend"}
                            </Button>
                          </div>
                          <p className="margin-top-0 text-italic">
                            Text or data rates may apply
                          </p>
                          {pinVisible && (
                            <div>
                              <Label className="" htmlFor={pinText}>
                                <h3 className="challenge-question margin-top-2 margin-bottom-0">
                                  Enter Pin:
                                </h3>
                              </Label>
                              <div className="grid-row">
                                <TextInput
                                  data-testid="pin-answer"
                                  id={pinText}
                                  name={pinText}
                                  value={pin}
                                  className="grid-col-8"
                                  onChange={(event) =>
                                    setPin(event.target.value)
                                  }
                                />
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
              {stage >= 3 && (
                <div>
                  <h2>Certification Statement(s)</h2>
                  <SelectableAccordion
                    setCanCheck={setCanCheck}
                    items={statements}
                    submissionActionLog={submissionActionLog}
                    setSubmissionActionLog={setSubmissionActionLog}
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
                )}

                {stage === 3 && (
                  <Button
                    type="button"
                    title="Click to save"
                    epa-testid="saveBtn"
                    id="saveBtn"
                    data-testid="saveBtn"
                    disabled={checked ? false : true}
                    className="margin-right-2 display-inline-block"
                    onClick={verifyClicked}
                  >
                    Certify
                  </Button>
                )}
                {stage !== 3 && (
                  <Button
                    type="button"
                    title="Click to save"
                    epa-testid="saveBtn"
                    id="saveBtn"
                    data-testid="saveBtn"
                    className="margin-right-2 display-inline-block"
                    onClick={verifyClicked}
                  >
                    {stage === 1 ? "Authenticate" : "Verify"}
                  </Button>
                )}

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
      <LoadingModal type="Auth" loading={loading} />
    </div>,
    modalRoot
  );
};
export default SubmissionModal;
