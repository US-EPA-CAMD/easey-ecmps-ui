import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";

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

// *** validation
import * as yup from "yup";

const logged_in = Cookies.get("cdxToken");

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

  // *** VALIDATION
  // * describe form object (NOTE: does not have to be an html form.
  // * however, data passed to it for validation must be in the same exact format)
  const formSchema = yup.object().shape({
    username: yup.string().required("Username is required"),
    password: yup.string().required("Password is required"),
  });

  const showPasswordHandler = () => {
    if (showPassword) {
      setShowPassword(false);
    } else {
      setShowPassword(true);
    }
  };

  const submitForm = async (event) => {
    event.preventDefault();

    // *** trigger yup validation
    const isFormValid = await formSchema.isValid(
      { username, password },
      {
        abortEarly: false, // *** prevent aborting validation after first error
      }
    );

    // *** display clientside errors
    if (!isFormValid) {
      await formSchema
        .validate({ username, password }, { abortEarly: false })
        .catch((jsonErrors) => {
          // *** NOTE: we are NOT displaying actual individual messages that go with each field,
          // ***       instead displaying a general message for both fields.  Individual messages are available
          // ***       in commented out object below
          // console.log(jsonErrors.errors);
          setShowError(true);
          setFormErrorMessage(standardFormErrorMessage);
        });
    } else {
      setFormErrorMessage("");
      setLoading(true);
      setShowError(false);

      await authenticate({ userId: username, password })
        .then((response) => {
          if (response && response.error) {
            throw response.error;
          }
        })
        // *** display serverside errors
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
  };

  useEffect(() => {
    const checkLoggedIn = () => {
      if (logged_in !== undefined) {
        setShowError(true);
        setFormErrorMessage(
          "Session already exists in another tab. Close browser to start a new session."
        );
      }
    };
    checkLoggedIn();
  }, [source]);

  return (
    <div className="" data-test="component-login">
      <div className="padding-1">
        <Form onSubmit={async (event) => await submitForm(event)} large>
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

            {!logged_in ? (
              <Button
                data-test="component-login-submit-button"
                className="margin-bottom-2"
                type="submit"
              >
                Log In
              </Button>
            ) : null}

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
