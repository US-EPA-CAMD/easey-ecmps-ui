import React, { useState, useEffect } from "react";

import {
  Button,
  Label,
  TextInput,
  Form,
  Alert,
  Fieldset,
} from "@trussworks/react-uswds";

import { authenticate } from "../../utils/api/easeyAuthApi";
import LoadingModal from "../LoadingModal/LoadingModal";
import config from "../../config";

const cdx_user = sessionStorage.getItem("cdx_user")
  ? JSON.parse(sessionStorage.getItem("cdx_user"))
  : false;

const Login = ({ isModal, source }) => {
  const standardFormErrorMessage = "Please enter your username and password";
  const [showError, setShowError] = useState(false);
  const [formErrorMessage, setFormErrorMessage] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const usernameText = isModal ? "modal-username" : "username";
  const passwordText = isModal ? "modal-password" : "password";

  const showPasswordHandler = () => {
    if (showPassword) {
      setShowPassword(false);
    } else {
      setShowPassword(true);
    }
  };

  const submitForm = async (e) => {
    e.preventDefault();
    setFormErrorMessage("");
    const formReady = !(username !== "" || password !== "");

    // issue here
    if (!formReady) {
      setFormErrorMessage(standardFormErrorMessage);
    }

    if (username !== "" && password !== "") {
      setLoading(true);
      setShowError(false);

      return await authenticate({ userId: username, password })
        .then((response) => {
          // *** commenting out the line below makes it so that the login modal doesn't come back into view
          // *** after the loading graphic has been displayed
          // setLoading(false);
          if (response && response.error) {
            throw response.error;
          }
        })
        .catch((err) => {
          setLoading(false);
          setShowError(true);
          if (err.response) {
            setFormErrorMessage(err.response.data.message);
          } else {
            setFormErrorMessage(err.message);
          }
        });
    }

    return true;
  };

  useEffect(() => {
    const checkLoggedIn = () => {
      if (cdx_user && source !== "ReportGenerator") {
        window.location = "/ecmps/monitoring-plans";
      }
    };
    checkLoggedIn();
  }, [source]);

  return (
    <div className="" data-test="component-login">
      <div className="padding-1">
        <Form onSubmit={submitForm} large>
          <Fieldset legend="Log In" legendStyle="large">
            <span>
              or{" "}
              <a
                href={`${config.app.cdxBaseUrl}${config.app.cdxRegisterPath}`}
                rel="noopener noreferrer"
                target="_blank"
              >
                create an account
              </a>
            </span>

            {showError && (
              <Alert type="error" heading="Log In Errors">
                {formErrorMessage}
              </Alert>
            )}

            <Label htmlFor={usernameText}>Username</Label>
            <TextInput
              data-test="component-login-username"
              id={usernameText}
              name={usernameText}
              type={username ? "text" : "password"}
              value={username}
              onChange={(event) => setUsername(event.target.value)}
            />

            <Label htmlFor={passwordText}>Password</Label>
            <TextInput
              data-test="component-login-password"
              id={passwordText}
              name={passwordText}
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />

            <Button
              data-test="component-login-submit-button"
              className="margin-bottom-2"
              type="submit"
            >
              Log In
            </Button>
            <p className="usa-form__note">
              <Button
                type="button"
                unstyled="true"
                title="Show password"
                href=""
                className="usa-show-password"
                aria-controls={passwordText}
                onClick={() => showPasswordHandler()}
              >
                {showPassword ? "Hide password" : "Show password"}
              </Button>
            </p>
            <p>
              <a
                href={`${config.app.cdxBaseUrl}${config.app.cdxForgotUserIdPath}`}
                rel="noopener noreferrer"
                target="_blank"
              >
                Forgot username?
              </a>
            </p>
            <p>
              <a
                href={`${config.app.cdxBaseUrl}${config.app.cdxForgotPasswordPath}`}
                rel="noopener noreferrer"
                target="_blank"
              >
                Forgot password?
              </a>
            </p>
          </Fieldset>
        </Form>
      </div>
      <LoadingModal loading={loading} />
    </div>
  );
};

export default Login;
