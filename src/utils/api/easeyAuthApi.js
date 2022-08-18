import config from "../../config";
import axios from "axios";
import { checkoutAPI } from "../../additional-functions/checkout";
import { getCheckedOutLocations } from "./monitoringPlansApi";
import { displayAppError } from "../../additional-functions/app-error";
import log from "loglevel";

axios.defaults.headers.common = {
  "x-api-key": config.app.apiKey,
};

export const secureAxios = async (options) => {
  try {
    const user = JSON.parse(sessionStorage.getItem("cdx_user"));

    if (new Date() > new Date(user.tokenExpiration)) {
      await refreshToken();
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
  const url = `${config.services.authApi.uri}/tokens/client`;

  try {
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
    withCredentials: true,
  })
    .then((response) => {
      sessionStorage.setItem("cdx_user", JSON.stringify(response.data));

      //Paths to UI locations in global view
      const globalOnly = [
        "/ecmps/monitoring-plans",
        "/ecmps/qa_certifications",
        "/ecmps/emission",
      ];

      // if they're in a global view (exclusive) page
      if (globalOnly.includes(window.location.pathname)) {
        // move them to the workspace version of that page (after finding '/ecmps')
        const newPathname = window.location.pathname.replace(
          "/ecmps",
          "/ecmps/workspace"
        );
        window.location.assign(newPathname);
      }
      // otherwise return them to their current page
      else {
        window.location.reload();
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
        checkoutAPI(false, location.facId, location.monPlanId).then();
      }
    }
  }

  const payload = {
    userId: user.userId,
    token: user.token,
  };

  axios({
    method: "DELETE",
    url: `${config.services.authApi.uri}/authentication/sign-out`,
    withCredentials: true,
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

  console.log("Refreshing Token");

  try {
    const result = await axios({
      method: "POST",
      url: `${config.services.authApi.uri}/tokens`,
      data: payload,
      withCredentials: true,
    });

    user.token = result.data.token;
    user.tokenExpiration = result.data.tokenExpiration;
    await sessionStorage.setItem("cdx_user", JSON.stringify(user));
  } catch (e) {
    displayAppError(e);
  }
};
