import React, { useState } from "react";
import {
  Button,
  Label,
  TextInput,
  Form,
  Alert,
  Fieldset,
} from "@trussworks/react-uswds";

import {determinePolicy} from "../../utils/api/easeyAuthApi";

import LoadingModal from "../LoadingModal/LoadingModal";
import userAccountStatusProps from './userAccountStatusProps'; // Adjust the import path as necessary
import config from "../../config";

// *** validation
import * as yup from "yup";
import UserAccountStatus from "./UserAccountStatus";

const Login = ({ isModal, closeModalHandler }) => {
  const standardFormErrorMessage = "Please enter your username";
  const [showError, setShowError] = useState(false);
  const [formErrorMessage, setFormErrorMessage] = useState("");
  const [username, setUsername] = useState("");
  const [viewProps, setViewProps] = useState(null); // State to hold the props for UserAccountStatus
  const [policyResponse, setPolicyResponse] = useState(null);

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

          //Extract the policy match
          const policyMatch = response.data.policy.match(/_(SIGNUP|MIGRATE|SIGNIN)/);
          const policySuffix = policyMatch ? policyMatch[0] : "_DEFAULT";

          //Disable the loading overlay
          setLoading(false);
          setViewProps( userAccountStatusProps[policySuffix] );
          setPolicyResponse(response.data);

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
      return (
          <UserAccountStatus
              viewProps={viewProps}
              policyResponse={policyResponse}
          />
      );
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
                            heading="Error"
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
                        Forgot User ID?
                    </a>
                </p>

                <p>
                    <a
                        href={`${config.app.cdxHowToGetAccessPath}`}
                        rel="noopener noreferrer"
                        target="_blank"
                    >
                        How do I obtain access?
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
