import axios from "axios";
import log from "loglevel";
import config from "../../config";
import { debugLog } from "../functions";
import { checkoutAPI } from "../../additional-functions/checkout";
import { getCheckedOutLocations } from "./monitoringPlansApi";
import { displayAppError } from "../../additional-functions/app-error";

const inactiveDuration = config.app.inactivityDuration / 1000;

axios.defaults.headers.common = {
  "x-api-key": config.app.apiKey,
};

export const secureAxios = async (options) => {
  try {
    if (localStorage.getItem("ecmps_user")) {
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

export const authenticate = async (payload) => {
  return axios({
    method: "POST",
    url: `${config.services.authApi.uri}/authentication/sign-in`,
    data: payload,
  })
    .then((response) => {
      localStorage.setItem("ecmps_user", JSON.stringify(response.data));
      const newExpiration = new Date();
      newExpiration.setSeconds(
        newExpiration.getSeconds() + inactiveDuration + 1
      );
      localStorage.setItem("ecmps_session_expiration", newExpiration);

      if (
        window.location.pathname.includes("/workspace") ||
        window.location.pathname.endsWith("/home") ||
        window.location.pathname.endsWith("/")
      ) {
        window.location.reload();
      } else {
        window.location.assign(`/workspace${window.location.pathname}`);
      }
    })
    .catch((e) => {
      throw e;
    });
};

export const logOut = async () => {
  if (
    localStorage.getItem("signing_out") &&
    localStorage.getItem("signing_out") !== "true"
  ) {
    localStorage.setItem("signing_out", "true");
    console.log("Signing Out");
    const user = JSON.parse(localStorage.getItem("ecmps_user"));
    console.log(user);
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
    })
      .then(() => {
        localStorage.removeItem("ecmps_user");
        localStorage.setItem("signing_out", "false");
        window.location = config.app.path;
      })
      .catch((e) => {
        log.error({ error: e.message });
      });
  }
};

export const refreshToken = async () => {
  try {
    let refreshToken = false;
    const user = JSON.parse(localStorage.getItem("ecmps_user"));
    let tokenExp = new Date(user.tokenExpiration);
    debugLog("token expiration: ", tokenExp);

    if (new Date() > tokenExp) {
      refreshToken = true;
      debugLog("User security token has expired");
    } else {
      tokenExp.setSeconds(tokenExp.getSeconds() - 30);
      debugLog("token expiration (-30 seconds): ", tokenExp);

      if (new Date() > tokenExp) {
        refreshToken = true;
        debugLog("User security token expires in 30 seconds or less");
      }
    }

    if (refreshToken) {
      debugLog("Refreshing user security token");
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

      debugLog("Refreshed token: ", result.data);

      user.token = result.data.token;
      user.tokenExpiration = result.data.expiration;
      localStorage.setItem("ecmps_user", JSON.stringify(user));
    }

    return user.token;
  } catch (e) {
    displayAppError(e);
  }
};

export const credentialsAuth = async (payload) => {
  return axios({
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
