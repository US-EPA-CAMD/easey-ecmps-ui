import axios from "axios";
import config from "../../config";
import {checkoutAPI} from "../../additional-functions/checkout";
import {getCheckedOutLocations} from "./monitoringPlansApi";
import {displayAppError} from "../../additional-functions/app-error";
import {currentDateTime} from "../functions";

const inactiveDuration = config.app.inactivityDuration / 1000;

axios.defaults.headers.common = {
  "x-api-key": config.app.apiKey,
};

export const secureAxios = async (options) => {
  try {
    const ecmpsUser = localStorage.getItem("ecmps_user");
    if (ecmpsUser) {
      const token = await refreshToken();

      if (options["headers"]) {
        options.headers = {
          ...options.headers,
          authorization: `Bearer ${token}`,
          "x-api-key": config.app.apiKey,
        };
      } else {
        options.headers = {
          authorization: `Bearer ${token}`,
          "x-api-key": config.app.apiKey,
        };
      }
    } else {
      if (options["headers"]) {
        options.headers = {
          ...options.headers,
          "x-api-key": config.app.apiKey,
        };
      } else {
        options.headers = {
          "x-api-key": config.app.apiKey,
        };
      }
    }
  } catch (e) {
    displayAppError(e);
  }

  return axios(options);
};

export const refreshClientToken = async () => {
  try {
    const url = `${config.services.authApi.uri}/tokens/client`;

    if (!config.app.clientId || !config.app.clientSecret) {
      displayAppError(
        "Application client id/secret is required and was not configured"
      );
      return;
    }

    const response = await axios.post(
      url,
      { clientId: config.app.clientId, clientSecret: config.app.clientSecret },
      { headers: { "x-api-key": config.app.apiKey } }
    );

    localStorage.setItem("client_token", response.data.token);
    localStorage.setItem("client_token_expiration", response.data.expiration);
  } catch (err) {
    displayAppError(err);
  }
};

export const refreshLastActivity = async () => {
  try {
    await secureAxios({
      method: "POST",
      url: `${config.services.authApi.uri}/authentication/update-last-activity`,
    });
  } catch (err) {
    displayAppError(err);
  }
};

export const determinePolicy = async (payload) => {
    try {
      return await axios.post(`${config.services.authApi.uri}/authentication/determinePolicy`, payload);
    } catch (e) {
      throw e;
    }
};

export const validateAuthRedirect = async (payload) => {
  return axios({
    method: "POST",
    url: `${config.services.authApi.uri}/authentication/sign-in`,
    data: payload,
  })
      .then((response) => {
        storeUser(response);
      })
      .catch((e) => {
        throw e;
      });
};

export const authenticate = async (payload) => {
  return axios({
    method: "POST",
    url: `${config.services.authApi.uri}/authentication/sign-in`,
    data: payload,
  })
    .then((response) => {
      storeUser(response);
    })
    .catch((e) => {
      throw e;
    });
};

function storeUser(response) {
  localStorage.setItem("ecmps_user", JSON.stringify(response.data));

  const currDate = currentDateTime();
  currDate.setSeconds(currDate.getSeconds() + inactiveDuration);
  localStorage.setItem(
      "ecmps_session_expiration",
      currDate.toLocaleString()
  );

  if (
      window.location.pathname.includes("/workspace") ||
      window.location.pathname.endsWith("/home") ||
      window.location.pathname.endsWith("/")
  ) {
    window.location.reload();
  } else {
    window.location.assign(`/workspace${window.location.pathname}`);
  }
}

const handleSignOut = () => {
  localStorage.removeItem("ecmps_user");
  localStorage.setItem("ecmps_signing_out", "false");
  window.location = config.app.path;
};

export const logOut = async () => {
  try {
    const signingOut = localStorage.getItem("ecmps_signing_out");
    if (signingOut && signingOut !== "true") {
      localStorage.setItem("ecmps_signing_out", "true");
      const user = JSON.parse(localStorage.getItem("ecmps_user"));
      const checkedOutLocationResult = await getCheckedOutLocations();

      if (checkedOutLocationResult.data.length > 0) {
        for (const location of checkedOutLocationResult.data) {
          if (location.checkedOutBy === user.userId) {
            await checkoutAPI(false, location.facId, location.monPlanId);
          }
        }
      }

      await secureAxios({
        method: "DELETE",
        url: `${config.services.authApi.uri}/authentication/sign-out`,
        data: {
          userId: user.userId,
        },
      });
    }

    handleSignOut();
  } catch (e) {
    handleSignOut();
  }
};

export const refreshToken = async () => {
  try {
    if (!localStorage.getItem("ecmps_refreshing_token")) {
      //Initialize token refresh variable responsbile for halting refresh if other calls are outgoing
      localStorage.setItem("ecmps_refreshing_token", "false");
    }

    let waitDuration = 0; //Keep track of how long the current call is occuring for, force it through after a certain amount of seconds
    while (
      localStorage.getItem("ecmps_refreshing_token") === "true" &&
      waitDuration < config.app.tokenRefreshThresholdSeconds
    ) {
      await new Promise((resolve) => setTimeout(resolve, 100));
      waitDuration += 100;
    }
    localStorage.setItem("ecmps_refreshing_token", "false");

    const user = JSON.parse(localStorage.getItem("ecmps_user"));

    const currDate = currentDateTime();
    const tokenExp = new Date(user.tokenExpiration);
    // set tokenExp back 60 seconds to ensure that we refresh token before expiring
    tokenExp.setSeconds(tokenExp.getSeconds() - 60);

    if (currDate > tokenExp) {
      localStorage.setItem("ecmps_refreshing_token", "true");
      const result = await axios({
        method: "POST",
        url: `${config.services.authApi.uri}/tokens`,
        headers: {
          authorization: `Bearer ${user.token}`,
          "x-api-key": config.app.apiKey,
        },
        data: {
          userId: user.userId,
        },
      });

      user.token = result.data.token;
      user.tokenExpiration = result.data.expiration;
      localStorage.setItem("ecmps_user", JSON.stringify(user));
      localStorage.setItem("ecmps_refreshing_token", "false");
    }
    return user.token;
  } catch (e) {
    displayAppError(e);
  }
};

export const credentialsAuth = async (payload) => {
  return secureAxios({
    method: "POST",
    url: `${config.services.authApi.uri}/sign/authenticate`,
    data: payload,
  });
};

export const sendPin = async (payload) => {
  return secureAxios({
    method: "POST",
    url: `${config.services.authApi.uri}/sign/send-mobile-code`,
    data: payload,
  });
};

export const verifyChallenge = async (payload) => {
  return secureAxios({
    method: "POST",
    url: `${config.services.authApi.uri}/sign/validate`,
    data: payload,
  });
};

export const getCredentials = async (monitorPlans) => {
  return secureAxios({
    method: "GET",
    url: `${
      config.services.authApi.uri
    }/certifications/statements?monitorPlanIds=${monitorPlans.join("|")}`,
  });
};
