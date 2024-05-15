import {
  Fieldset
} from "@trussworks/react-uswds";

import React, { useEffect, useState } from 'react';
import userAccountStatusProps from './userAccountStatusProps';
import config from "../../config";

const UserAccountStatus = ({ viewProps, policyResponse }) => {

  viewProps = viewProps ? viewProps : userAccountStatusProps['_DEFAULT'];

  const [authUrl, setAuthUrl] = useState('');

  useEffect(() => {
    const generateUrl = async () => {
      let url = "";

      // Handle redirection for policies ending with "_BYPASS"
      if (policyResponse.policy.endsWith("_BYPASS")) {
        const url = `${window.location.origin}/?sessionId=${encodeURIComponent(policyResponse.userId)}`;
        window.location.href = url;
        return; // Stop further execution since we're redirecting
      }

      if (policyResponse.policy.endsWith("_SIGNUP") || policyResponse.policy.endsWith("_MIGRATE")) {
        url = `${config.app.cdxUserSignupMigrateUrl}`;
      } else {
        url = `${config.app.oidcAuthEndpoint}`.replace('%s', policyResponse.policy);
        url = await buildUrl(url, policyResponse);
      }
      setAuthUrl(url);
    };

    generateUrl();
  }, [policyResponse]);

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
  const redirectUri = policyResponse.redirectUri;
  const p = policyResponse.policy;
  const acrValues = policyResponse.policy;
  const nonce = policyResponse.nonce;
  const state = policyResponse.state;
  const scope = `${config.app.oidcAuthScopes} ${clientId}`; //Append client ID here to receive id and access tokens

  return authUrl + `?` +
    `response_type=${encodeURIComponent(responseType)}&` +
    `response_mode=${encodeURIComponent(responseMode)}&` +
    `client_id=${encodeURIComponent(clientId)}&` +
    `redirect_uri=${encodeURIComponent(redirectUri)}&` +
    `nonce=${encodeURIComponent(nonce)}&` +
    `state=${encodeURIComponent(state)}&` +
    `p=${encodeURIComponent(p)}&` +
    `acr_values=${encodeURIComponent(acrValues)}&` +
    `scope=${encodeURIComponent(scope)}&` +
    `userId=${encodeURIComponent(policyResponse.userId)}&` +
    `userRoleId=${encodeURIComponent(policyResponse.userRoleId)}`;
}
