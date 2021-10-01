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

const cdx_user = sessionStorage.getItem("cdx_user")
  ? JSON.parse(sessionStorage.getItem("cdx_user"))
  : false;

const Login = ({ isModal }) => {
  const standardFormErrorMessage = "Please enter your username and password";
  const [showError, setShowError] = useState(false);
  const [formErrorMessage, setFormErrorMessage] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const checkLoggedIn = () => {
    if (cdx_user) {
      window.location = "/ecmps/monitoring-plans";
    }
  };

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

      try {
        return await authenticate({ userId: username, password })
          .then((response) => {
            // *** commenting out the line below makes it so that the login modal doesn't come back into view
            // *** after the loading graphic has been displayed
            // setLoading(false);
            if (response && response.error) {
              throw response.error;
            }
          })
          .catch((catchErr) => {
            setLoading(false);

            throw catchErr;
          });
      } catch (err) {
        setLoading(false);
        setShowError(true);
        setFormErrorMessage(err.message);
      }
    }

    return true;
  };

  useEffect(() => {
    checkLoggedIn();
  }, []);

  return (
    <div className="" data-test="component-login">
      <div style={{ padding: "1rem" }}>
        <Form onSubmit={submitForm} large>
          <Fieldset legend="Log In" legendStyle="large">
            <span>
              or{" "}
              <a
                href="https://dev.epacdx.net/Registration/Terms"
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

            <Label htmlFor="username">Username</Label>
            <TextInput
              data-test="component-login-username"
              id={isModal ? "modal-username" : "username"}
              name={isModal ? "modal-username" : "username"}
              type={username ? "text" : "password"}
              value={username}
              onChange={(event) => setUsername(event.target.value)}
            />

            <Label htmlFor="password">Password</Label>
            <TextInput
              data-test="component-login-password"
              id={isModal ? "modal-password" : "password"}
              name={isModal ? "modal-password" : "password"}
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
                aria-controls={isModal ? "modal-password" : "password"}
                onClick={() => showPasswordHandler()}
              >
                {showPassword ? "Hide password" : "Show password"}
              </Button>
            </p>
            <p>
              <a
                href="https://dev.epacdx.net/AccountRecovery/ForgotUserId"
                rel="noopener noreferrer"
                target="_blank"
              >
                Forgot username?
              </a>
            </p>
            <p>
              <a
                href="https://dev.epacdx.net/PasswordReset/GetResetCode"
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
