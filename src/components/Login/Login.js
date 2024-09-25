import React, {useEffect, useState} from "react";
import {
  Button,
  Label,
  TextInput,
  Form,
  Alert,
  Fieldset,
} from "@trussworks/react-uswds";

import {determinePolicy, getLoginState, getPermissions} from "../../utils/api/easeyAuthApi";

import LoadingModal from "../LoadingModal/LoadingModal";
import userAccountStatusProps from './userAccountStatusProps'; // Adjust the import path as necessary
import config from "../../config";

// *** validation
import * as yup from "yup";
import UserAccountStatus from "./UserAccountStatus";

const Login = ({ isModal, closeModalHandler, isLoginDisabled = false, showSystemNotification = true }) => {
  const standardFormErrorMessage = "Please enter your username";
  const [showError, setShowError] = useState(false);
  const [formErrorMessage, setFormErrorMessage] = useState("");
  const [username, setUsername] = useState("");
  const [viewProps, setViewProps] = useState(null); // State to hold the props for UserAccountStatus
  const [policyResponse, setPolicyResponse] = useState(null);

  const [loading, setLoading] = useState(false);

  const [displaySystemUseNotification, setDisplaySystemUseNotification] = useState(showSystemNotification);

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

  
  if (isLoginDisabled) {
      return (
          <div className="padding-1">
              <p> ECMPS 2.0 Login is disabled due to Maintenance. Please contact Information for further assistance. </p>
          </div>
      );
  }

  if (displaySystemUseNotification) {
    return (
      <div className="" data-test="component-login">
        <div className="padding-1">
          <p>
            In proceeding and accessing U.S. Government information and information systems, you acknowledge that you fully understand and consent to all of the following: 1) You are accessing U.S. Government information and information systems that are provided for official U.S. Government purposes only; 2) Unauthorized access to or unauthorized use of U.S. Government information or information systems is subject to criminal, civil, administrative, or other lawful action; 3) The term U.S. Government information system includes systems operated on behalf of the U.S. Government; 4) You have no reasonable expectation of privacy regarding any communications or information used, transmitted, or stored on U.S. Government information systems; 5) At any time, the U.S. Government may for any lawful government purpose, without notice, monitor, intercept, search, and seize any authorized or unauthorized communication to or from U.S. Government information systems or information used or stored on U.S. Government information systems; 6) At any time, the U.S. Government may for any lawful government purpose, search and seize any authorized or unauthorized device, to include non-U.S. Government owned devices, that stores U.S. Government information; 7) Any communications or information used, transmitted, or stored on U.S. Government information systems may be used or disclosed for any lawful government purpose, including but not limited to, administrative purposes, penetration testing, communication security monitoring, personnel misconduct measures, law enforcement, and counterintelligence inquiries; and 8) You may not process or store classified national security information on this computer system.
          </p>
          <Button
            data-testid="component-login-continue-button"
            className="margin-bottom-2"
            type="submit"
            onClick={() => setDisplaySystemUseNotification(false)}
          >
            Continue
          </Button>

          <Button
            data-testid="component-login-cancel-button"
            className="margin-bottom-2"
            type="submit"
            onClick={closeModalHandler}
          >
            Cancel
          </Button>
        </div>
      </div>
    );
  }

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
