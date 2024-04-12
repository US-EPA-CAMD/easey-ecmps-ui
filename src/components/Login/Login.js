import React, { useState } from "react";
import {
  Button,
  Label,
  TextInput,
  Form,
  Alert,
  Fieldset,
} from "@trussworks/react-uswds";

import { useNavigate } from "react-router-dom";
import {authenticate, determinePolicy} from "../../utils/api/easeyAuthApi";

import LoadingModal from "../LoadingModal/LoadingModal";
import config from "../../config";

// *** validation
import * as yup from "yup";
import SignUpMigrate from "./SignUpMigrate";

const Login = ({ isModal, closeModalHandler }) => {
  const standardFormErrorMessage = "Please enter your username";
  const [showError, setShowError] = useState(false);
  const [formErrorMessage, setFormErrorMessage] = useState("");
  const [username, setUsername] = useState("");
  // We render login content vs SignUpMigrate content based on wether viewProps has a value or not
  const [viewProps, setViewProps] = useState(null);

  const [loading, setLoading] = useState(false);

  const usernameText = isModal ? "modal-username" : "username";

  // *** VALIDATION
  // * describe form object (NOTE: does not have to be an html form.
  // * however, data passed to it for validation must be in the same exact format)
  const formSchema = yup.object().shape({
    username: yup.string().required("Username is required"),
  });

  const submitForm = async (event) => {
    event.preventDefault();

    // *** trigger yup validation
    const isFormValid = await formSchema.isValid(
      { username },
      {
        abortEarly: false, // *** prevent aborting validation after first error
      }
    );

    // *** display clientside errors
    if (!isFormValid) {
      await formSchema
        .validate({ username }, { abortEarly: false })
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

      await determinePolicy({ userId: username })
        .then((response) => {
          if (response && response.error) {
            throw response.error;
          }

          // Handle case where response includes an error code
          if ('code' in response.data) {
            const error = new Error(response.data.message);
            error.response = { data: response.data }; // Mimic Axios error structure for consistency
            throw error;
          }

          // Proceed with handling a valid policy response
          const policy = response.data.policy;

          let viewProps = {};

          if (policy.endsWith("_SIGNUP")) {
            viewProps = {
              title: "Leaving CDX (_SIGNUP new user)",
              url: `${config.app.cdxIcamSignupPath}`,
              verbiage: "You are being redirected to EPA Gateway (EIAM) to initialize authentication and authorization. Once completed successfully, you will return to CDX as a logged-in user.",
              buttonLabel: "Register with CDX"
            };
          } else if (policy.endsWith("_MIGRATE")) {
            viewProps = {
              title: "Your account must be migrated (_MIGRATE user to be migrated)",
              url: `${config.app.cdxIcamMigratePath}`,
              verbiage: "Agency-wide mandates require your CDX account to be migrated to a new login method. Select the Login with Login.gov button below to migrate your account to Login.gov. Once migrated, you will no longer need your CDX password to login and will instead use your Login.gov credentials for authentication.",
              buttonLabel: "Login with Login.gov"
            };
          } else {
            viewProps = {
              title: "Leaving CDX (_SIGNIN existing migrated user)",
              url: `${config.app.cdxIcamSigninPath}`,
              verbiage: "You are being redirected to EPA Gateway (EIAM) to initialize authentication and authorization. Once completed successfully, you will return to CDX as a logged-in user.",
              buttonLabel: "Sign In"
            };
          }

          //Disable the loading overlay
          setLoading(false);
          setViewProps(viewProps);
        })
        // *** display serverside errors
        .catch((err) => {
          setLoading(false);
          setShowError(true);
          setFormErrorMessage(err.response?.data?.message || err.message);
        });
    }
  };

  if (viewProps) {
    return <SignUpMigrate {...viewProps} />;
  }

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

            <div aria-live="polite">
              {showError && (
                  <Alert
                      type="error"
                      heading="Log In Errors"
                      headingLevel="h4"
                      role="alert"
                  >
                    {formErrorMessage}
                  </Alert>
              )}
            </div>

            <Label htmlFor={usernameText}>CDX User ID</Label>
            <TextInput
                data-testid="component-login-username"
                id={usernameText}
                name={usernameText}
                type="text"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
            />

            <Button
                data-testid="component-login-submit-button"
                className="margin-bottom-2"
                type="submit"
            >
              Log In
            </Button>

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
      <LoadingModal type="Auth" loading={loading}/>
    </div>
  );
};

export default Login;
