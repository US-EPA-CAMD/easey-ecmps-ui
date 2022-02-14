import config from "../../config";
import axios from "axios";
import { checkoutAPI } from "../../additional-functions/checkout";
import { getCheckedOutLocations } from "./monitoringPlansApi";
import { displayAppError } from "../../additional-functions/app-error";
import log from "loglevel";

axios.defaults.headers.common = {
  "x-api-key": config.app.apiKey,
};

export const secureAxios = (options) => {
  if (
    sessionStorage.getItem("cdx_user") &&
    JSON.parse(sessionStorage.getItem("cdx_user")).token
  ) {
    options.headers = {
      authorization: `Bearer ${
        JSON.parse(sessionStorage.getItem("cdx_user")).token
      }`,
      "x-api-key": config.app.apiKey,
    };
  }

  return axios(options);
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

  secureAxios({
    method: "DELETE",
    url: `${config.services.authApi.uri}/authentication/sign-out`,
    withCredentials: true,
  })
    .then(() => {
      sessionStorage.removeItem("refreshTokenTimer");
      sessionStorage.removeItem("cdx_user");
      window.location = config.app.path;
    })
    .catch((e) => {
      log.error({ error: e.message });
    });
};

export const refreshToken = () => {
  const userId = JSON.parse(sessionStorage.getItem("cdx_user")).userId;

  secureAxios({
    method: "POST",
    url: `${config.services.authApi.uri}/tokens`,
    data: { userId },
    withCredentials: true,
  })
    .then((response) => {
      const user = JSON.parse(sessionStorage.getItem("cdx_user"));
      user.token = response.data;
      sessionStorage.setItem("cdx_user", JSON.stringify(user));
    })
    .catch((e) => {
      displayAppError(e);
    });
};
