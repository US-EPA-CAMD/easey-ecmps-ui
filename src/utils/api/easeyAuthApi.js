import config from "../../config";
import axios from "axios";
import { checkoutAPI } from "../../additional-functions/checkout";
import { getCheckedOutLocations } from "./monitoringPlansApi";

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
  for (const p in checkedOutLocationResult.data) {
    if (checkedOutLocationResult.data[p].checkedOutBy === user.userId) {
      await checkoutAPI(
        false,
        checkedOutLocationResult.data[p].facId,
        checkedOutLocationResult.data[p].monPlanId,
        undefined
      );
    }
  }

  return secureAxios({
    method: "DELETE",
    url: `${config.services.authApi.uri}/authentication/sign-out`,
  })
    .then(async () => {
      sessionStorage.removeItem("refreshTokenTimer");
      sessionStorage.removeItem("cdx_user");
      window.location = config.app.path;
    })
    .catch((e) => {
      throw e;
    });
};

export const refreshToken = () => {
  try {
    const userId = JSON.parse(sessionStorage.getItem("cdx_user")).userId;
    return secureAxios({
      method: "POST",
      url: `${config.services.authApi.uri}/tokens`,
      data: { userId },
    })
      .then((data_response) => {
        const userData = JSON.parse(sessionStorage.getItem("cdx_user"));
        userData.token = data_response.data;
        sessionStorage.setItem("cdx_user", JSON.stringify(userData));
      })
      .catch((e) => {
        throw e;
      });
  } catch (e) {
    throw e;
  }
};

/*
export async function validateToken() {
  try {
    const token = JSON.parse(sessionStorage.getItem("cdx_user")).token;
    return secureAxios({
      method: "POST",
      url: `${config.services.authApi.uri}/tokens/validate`,
      data: { token },
    })
      .then((data_response) => {
        return data_response.data;
      })
      .catch((e) => {
        throw e;
      });
  } catch (e) {
    throw e;
  }
}
*/
