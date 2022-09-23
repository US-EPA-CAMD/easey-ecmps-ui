import axios from "axios";
import log from "loglevel";
import config from "../../config";
import { checkoutAPI } from "../../additional-functions/checkout";
import { getCheckedOutLocations } from "./monitoringPlansApi";
import { displayAppError } from "../../additional-functions/app-error";

axios.defaults.headers.common = {
  "x-api-key": config.app.apiKey,
};

export const secureAxios = async (options) => {
  try {
    const user = JSON.parse(sessionStorage.getItem("cdx_user"));

    if (new Date() > new Date(user.tokenExpiration)) {
      console.log('Security Token expired...refreshing');
      await refreshToken();
      console.log('Security Token has been refreshed');
    }

    options.headers = {
      authorization: `Bearer ${user.token}`,
      "x-api-key": config.app.apiKey,
    };
  } catch (e) {
    displayAppError(e);
  }

  return axios(options);
};

export const refreshClientToken = async () => {
  try {
    const url = `${config.services.authApi.uri}/tokens/client`;

    if (!config.app.clientId || !config.app.clientSecret) {
      displayAppError('Application client id/secret is required and was not configured');
      return;
    }

    const response = await axios.post(
      url,
      { clientId: config.app.clientId, clientSecret: config.app.clientSecret },
      { headers: { "x-api-key": config.app.apiKey } }
    );

    sessionStorage.setItem("client_token", response.data.token);
    sessionStorage.setItem("client_token_expiration", response.data.expiration);
  } catch (err) {
    displayAppError(err);
  }
};

export const authenticate = async (payload) => {
  return axios({
    method: "POST",
    url: `${config.services.authApi.uri}/authentication/sign-in`,
    data: payload,
  })
    .then((response) => {
      const officialOnlyPath = ["/", "/home"];
      sessionStorage.setItem("cdx_user", JSON.stringify(response.data));

      if (officialOnlyPath.includes(window.location.pathname)) {
        window.location.reload();
      }
      else {
        window.location.assign(`/workspace${window.location.pathname}`);
      }
    })
    .catch((e) => {
      throw e;
    });
};

export const logOut = async () => {
  const user = JSON.parse(sessionStorage.getItem("cdx_user"));

  const checkedOutLocationResult = await getCheckedOutLocations();

  if (checkedOutLocationResult.data.length > 0) {
    for (const location of checkedOutLocationResult.data) {
      if (location.checkedOutBy === user.userId) {
        await checkoutAPI(false, location.facId, location.monPlanId).then();
      }
    }
  }

  const payload = {
    userId: user.userId,
    token: user.token,
  };

  secureAxios({
    method: "DELETE",
    url: `${config.services.authApi.uri}/authentication/sign-out`,
    data: payload,
  })
    .then(() => {
      sessionStorage.removeItem("cdx_user");
      window.location = config.app.path;
    })
    .catch((e) => {
      log.error({ error: e.message });
    });
};

export const refreshToken = async () => {
  const user = JSON.parse(sessionStorage.getItem("cdx_user"));
  const payload = {
    userId: user.userId,
    token: user.token,
  };

  try {
    const result = await axios({
      method: "POST",
      url: `${config.services.authApi.uri}/tokens`,
      data: payload,
    });

    user.token = result.data.token;
    user.tokenExpiration = result.data.tokenExpiration;
    sessionStorage.setItem("cdx_user", JSON.stringify(user));
  } catch (e) {
    displayAppError(e);
  }
};
