import {
  Fieldset
} from "@trussworks/react-uswds";

import userAccountStatusProps from './userAccountStatusProps';
import config from "../../config";

const UserAccountStatus = ({ viewProps, policyResponse }) => {

  viewProps = viewProps ? viewProps : userAccountStatusProps['_DEFAULT'];

  let authUrl = "";
  if (policyResponse.policy.endsWith("_SIGNUP") || policyResponse.policy.endsWith("_MIGRATE")) {
    authUrl = `${config.app.cdxUserAccountStatusAuthEndpoint}`;
  } else {
    authUrl = `${config.app.oidcAuthEndpoint}`.replace('%s', policyResponse.policy);
    authUrl = buildUrl(authUrl, policyResponse);
  }

  return (
    <div className="">
      <div className="padding-1">
          <Fieldset legend={viewProps.title} legendStyle="large">
          <p> {viewProps.verbiage} </p>
          <a id="userAccountStatus"
             name="Button"
             className="usa-button margin-bottom-2"
             data-testid="component-signup-migrate-button"
             href={authUrl}>{viewProps.buttonLabel}</a>
        </Fieldset>
      </div>
    </div>
  );
};

export default UserAccountStatus;

async function buildUrl(authUrl, policyResponse) {

  const responseType = `${config.app.oidcAuthResponseType}`
  const responseMode = `${config.app.oidcAuthResponseMode}`
  const clientId = `${config.app.oidcClientId}`;
  const redirectUri = `${config.app.oidcAuthRedirectUri}`;
  const p = policyResponse.policy;
  const acrValues = policyResponse.policy;
  const scope = `${config.app.oidcAuthScopes}`;

  const {nonce, state} = await generateNonceAndState();

  return authUrl + `?` +
    `response_type=${encodeURIComponent(responseType)}&` +
    `response_mode=${encodeURIComponent(responseMode)}&` +
    `client_id=${encodeURIComponent(clientId)}&` +
    `redirect_uri=${encodeURIComponent(redirectUri)}&` +
    `nonce=${encodeURIComponent(nonce)}&` +
    `state=${encodeURIComponent(state)}&` +
    `p=${encodeURIComponent(p)}&` +
    `acr_values=${encodeURIComponent(acrValues)}&` +
    `scope=${encodeURIComponent(scope)}` +
    `${policyResponse.userRoleId ? `&userRoleId=${encodeURIComponent(policyResponse.userRoleId.toString())}` : ''}`; //add userRoleId if available
}

/*
Since we are not using session to store the nonce and state values (to compare later after user is redirected back
to us), we are going to include the nonce value in the state (since we are encrypting the state value) and send it off
on the auth flow. Upon redirect, we can decrypt the state value and make sure it is intact by checking its signature.
Then extract the nonce value and then compare that against the nonce value included in the id token.
 */
async function generateNonceAndState() {
  // Generate a random nonce
  const nonce = generateNonce(32);
  // Create a timestamp
  const timestamp = Date.now().toString();

  // Sign the nonce and timestamp together to create the state
  const state = await createState(nonce, timestamp);
  return { nonce, state };
}


/*
 We generate a nonce to prevent replay attacks. The nonce value will be included in the ID token returned by the OIDC
 provider. This allows us to verify that the token we receive is indeed directly in response our own recent
 request and not a replay of a previous request.
 */
function generateNonce(length = 32) {
  const array = new Uint8Array(length);
  window.crypto.getRandomValues(array);
  return Array.from(array).map(b => b.toString(36)).join('').substring(0, length);
}

/*
We generate a random state value to protect against Cross-Site Request Forgery (CSRF) attacks.
We do this by maintaining a link between a user's initial auth request and the callback from the
 authorization server. Since we are not maintaining a session at this point, we are encrypting a nonce value
 and sending it with the auth request, and we will validate it again when the redirect bring the user back to
 our page. See useAuthRedirect.js
 */
async function createState(nonce, timestamp) {
  const dataToSign = `${nonce}|${timestamp}`;
  const encoder = new TextEncoder();
  const secretKey = encoder.encode(config.app.oidcAuthStateHmacSecretKey);

  const cryptoKey = await window.crypto.subtle.importKey(
    "raw",
    secretKey,
    { name: "HMAC", hash: { name: "SHA-256" } },
    false,
    ["sign"]
  );

  const signatureArrayBuffer = await window.crypto.subtle.sign(
    "HMAC",
    cryptoKey,
    encoder.encode(dataToSign)
  );

  const signature = Array.from(new Uint8Array(signatureArrayBuffer), byte => byte.toString(16).padStart(2, '0')).join('');
  return `${nonce}.${timestamp}.${signature}`;
}
