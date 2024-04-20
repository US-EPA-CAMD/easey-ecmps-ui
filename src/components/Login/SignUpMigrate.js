import {
  Fieldset
} from "@trussworks/react-uswds";

import { useLocation } from "react-router-dom";
import signUpMigrateProps from './signUpMigrateProps';
import config from "../../config";

const SignUpMigrate = ({ viewProps, policyResponse, pageState }) => {

  viewProps = viewProps ? viewProps : signUpMigrateProps['_DEFAULT'];

  const urlWithState = addStateToUrl(policyResponse.url, pageState);

  return (
    <div className="">
      <div className="padding-1">
          <Fieldset legend={viewProps.title} legendStyle="large">
          <p> {viewProps.verbiage} </p>
          <a id="signupMigrate"
             name="Button"
             className="usa-button margin-bottom-2"
             data-testid="component-signup-migrate-button"
             href={urlWithState}>{viewProps.buttonLabel}</a>
        </Fieldset>
      </div>
    </div>
  );
};

export default SignUpMigrate;

function generateNonce(length = 32) {
    const validChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let array = new Uint8Array(length);
    window.crypto.getRandomValues(array);
    return Array.from(array).map(b => validChars[b % validChars.length]).join('');
}

// Function to append state to URL
const addStateToUrl = (baseUrl, state) => {
    // Ensure the base URL and state are not null
    if (!baseUrl || !state) return baseUrl; // Return the base URL if no state to append
    const delimiter = baseUrl.includes('?') ? '&' : '?';
    return `${baseUrl}${delimiter}state=${encodeURIComponent(state)}`;
};