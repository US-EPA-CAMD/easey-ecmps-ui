import axios from "axios";
import config from "../../config";
import { checkoutAPI } from "../../additional-functions/checkout";
import { getCheckedOutLocations } from "./monitoringPlansApi";
import { displayAppError } from "../../additional-functions/app-error";
import { currentDateTime } from "../functions";
import { handleResponse, handleError } from "./apiUtils";

const inactiveDuration = config.app.inactivityDuration / 1000;

// Shared promise for token refresh - prevents concurrent refreshes
let activeRefreshPromise = null;

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
          "x-app-identifier": config.app.appIdentifier,
        };
      } else {
        options.headers = {
          authorization: `Bearer ${token}`,
          "x-api-key": config.app.apiKey,
          "x-app-identifier": config.app.appIdentifier,
        };
      }
    } else {
      if (options["headers"]) {
        options.headers = {
          ...options.headers,
          "x-api-key": config.app.apiKey,
          "x-app-identifier": config.app.appIdentifier,
        };
      } else {
        options.headers = {
          "x-api-key": config.app.apiKey,
          "x-app-identifier": config.app.appIdentifier,
        };
      }
    }
  } catch (e) {
    displayAppError(e);
  }

  return axios(options);
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
  return secureAxios({
    method: "POST",
    url: `${config.services.authApi.uri}/authentication/determinePolicy`,
    data: payload,
  }).then(handleResponse)
    .catch((error)=>{
      handleError(error);
      throw error
    });
};

export const authenticate = async (payload) => {
  return secureAxios({
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

  // Reset token refresh flag to prevent stuck states from previous sessions
  localStorage.setItem("ecmps_refreshing_token", "false");

  const currDate = currentDateTime();
  currDate.setSeconds(currDate.getSeconds() + inactiveDuration);
  localStorage.setItem(
    "ecmps_session_expiration",
    currDate.toLocaleString()
  );

  // Remove the sessionID and other extraneous from the URL if we just logged in
  const url = new URL(window.location.href);
  const params = new URLSearchParams(url.search);
  if (params.has('sessionId')) {
    url.search = "";
    // Replace the current URL in the history without reloading the page
    window.history.replaceState({}, '', url.toString());
  }

  const basePath = config.app.path.replace(/\/$/, '');
  const pathWithoutBase = globalThis.location.pathname.replace(basePath, '') || '/';

  if (
    pathWithoutBase.includes("/workspace") ||
    pathWithoutBase.endsWith("/home") ||
    pathWithoutBase.endsWith("/")
  ) {
    window.location.reload();
  } else {
    globalThis.location.assign(`${basePath}/workspace${pathWithoutBase}`);
  }
}

export const getLoginState = async () => {
  return secureAxios({
    method: "GET",
    url: `${config.services.authApi.uri}/authentication/login-state`,
  });
};

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

      if (checkedOutLocationResult.data?.items?.length > 0) {
        for (const location of checkedOutLocationResult.data?.items ?? []) {
          if (location.checkedOutBy === user.userId) {
            await checkoutAPI(false, location.monPlanId);
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
    // Read user to check token expiration
    const user = JSON.parse(localStorage.getItem("ecmps_user"));

    // Early return if no user in localStorage (happens in test environments or logged-out state)
    if (!user) {
      return null;
    }

    const currDate = currentDateTime();
    const tokenExp = new Date(user.tokenExpiration);
    // set tokenExp back 60 seconds to ensure that we refresh token before expiring
    tokenExp.setSeconds(tokenExp.getSeconds() - 60);

    if (currDate > tokenExp) {
      // If a refresh is already in progress, return the existing promise
      // This ensures all concurrent requests wait for the same refresh operation
      if (activeRefreshPromise) {
        return activeRefreshPromise;
      }

      // Create and store a new refresh promise
      activeRefreshPromise = (async () => {
        try {
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

          // Update the user object with new token and expiration
          user.token = result.data.token;
          user.tokenExpiration = result.data.expiration;
          localStorage.setItem("ecmps_user", JSON.stringify(user));

          return user.token;
        } catch (error) {
          // On error, display error and return current token from localStorage
          displayAppError(error);
          // Re-read localStorage in case another concurrent request succeeded
          const currentUser = JSON.parse(localStorage.getItem("ecmps_user"));
          return currentUser?.token;
        } finally {
          // Always clean up the promise reference when done
          activeRefreshPromise = null;
        }
      })();

      return activeRefreshPromise;
    }

    return user.token;
  } catch (e) {
    displayAppError(e);

    // Self-healing: Re-read localStorage in case another concurrent request succeeded
    const currentUser = JSON.parse(localStorage.getItem("ecmps_user"));
    return currentUser?.token;
  }
};

export const getPermissions = async (userId) => {
  try {
    return await secureAxios({
      method: "GET",
      url: `${config.services.authApi.uri}/permissions?userId=${userId}`,
    });
  } catch (err) {
    displayAppError(err.response?.data?.message || err?.message || err);
  }
};

export const validate = async (payload) => {
  try {
    return await secureAxios({
      method: "POST",
      url: `${config.services.authApi.uri}/sign/validate`,
      data: payload,
    });
  } catch (err) {
    displayAppError(err.response?.data?.message || err?.message || err);
  }
  
};

export const createActivity = async (payload) => {
  try {
    return await secureAxios({
      method: "POST",
      url: `${config.services.authApi.uri}/sign/create-activity`,
      /*headers: { "Id-Token": "test" },*/
      data: payload,
    });
  } catch (err) {
    displayAppError(err.response?.data?.message || err?.message || err);
  }
};

export const getCredentials = async (
  monitorPlans,
  { shouldHandleError = true } = {},
) => {
  try {
    return await secureAxios({
      method: "GET",
      url: `${
        config.services.authApi.uri
      }/certifications/statements?monitorPlanIds=${monitorPlans.join("|")}`,
    });
  } catch (err) {
    if (!shouldHandleError) throw err;
    displayAppError(err.response?.data?.message || err?.message || err);
  }
  
};

export const validUser = () => {
  const expDate = localStorage.getItem("ecmps_session_expiration");
  return (
    JSON.parse(localStorage.getItem("ecmps_user")) &&
    expDate &&
    new Date(expDate) > currentDateTime()
  );
};
