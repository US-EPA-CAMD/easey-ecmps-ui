import config from "../../config";
import axios from "axios";
import { checkoutAPI } from "../../additional-functions/checkout";
import { getCheckedOutLocations } from "./monitoringPlansApi";
import { displayAppError } from "../../additional-functions/app-error";

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

export const authenticate = async (data_payload) => {
  return axios({
    method: "POST",
    url: `${config.services.authApi.uri}/authentication/sign-in`,
    data: data_payload,
    withCredentials: true,
  })
    .then((data_response) => {
      const { data } = data_response;
      sessionStorage.setItem("cdx_user", JSON.stringify(data));
      window.location.reload();
    })
    .catch((e) => {
      throw e;
    });
};

export const logOut = async (event = "default") => {
  if (event !== "default" && event) {
    event.preventDefault();
  }

  const user = JSON.parse(sessionStorage.getItem("cdx_user"));
  const checkedOutLocationResult = await getCheckedOutLocations();

  if (checkedOutLocationResult.data.length > 0) {
    for (const location of checkedOutLocationResult.data) {
      if (location.checkedOutBy === user.userId) {
        await checkoutAPI(false, location.facId, location.monPlanId, undefined);
      }
    }
  }

  return secureAxios({
    method: "DELETE",
    url: `${config.services.authApi.uri}/authentication/sign-out`,
    withCredentials: true,
  })
    .then(async () => {
      sessionStorage.removeItem("refreshTokenTimer");
      sessionStorage.removeItem("cdx_user");
      window.location = config.app.path;
    })
    .catch((e) => {
      displayAppError(e);
    });
};

export const refreshToken = () => {
  try {
    const userId = JSON.parse(sessionStorage.getItem("cdx_user")).userId;
    return secureAxios({
      method: "POST",
      url: `${config.services.authApi.uri}/tokens`,
      data: { userId },
      withCredentials: true,
    })
      .then((data_response) => {
        const userData = JSON.parse(sessionStorage.getItem("cdx_user"));
        userData.token = data_response.data;
        sessionStorage.setItem("cdx_user", JSON.stringify(userData));
      })
      .catch((e) => {
        displayAppError(e);
      });
  } catch (e) {
    displayAppError(e);
  }
};
