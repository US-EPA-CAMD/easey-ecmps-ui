import config from "../../config";
import axios from "axios";

export const secureAxios = (options) => {
  options.headers = {
    authorization: `Bearer ${
      JSON.parse(sessionStorage.getItem("cdx_user")).token
    }`,
  };

  return axios(options);
};

export async function authenticate(data_payload) {
  try {
    return axios({
      method: "POST",
      url: `${config.services.authApi.uri}/authentication/sign-in`,
      data: data_payload,
    })
      .then((data_response) => {
        console.log(data_response);
        const { data } = data_response;
        sessionStorage.setItem("cdx_user", JSON.stringify(data));
        window.location.reload();
      })
      .catch((e) => {
        throw e;
      });
  } catch (e) {
    return {
      success: false,
      message: e.response.data.message,
      statusCode: e.response.data.statusCode,
      error: e.response.data,
    };
  }
}

export async function logOut(event) {
  if (event !== undefined) event.preventDefault();
  try {
    return secureAxios({
      method: "DELETE",
      url: `${config.services.authApi.uri}/authentication/sign-out`,
    })
      .then(() => {
        sessionStorage.removeItem("refreshTokenTimer");
        sessionStorage.removeItem("cdx_user");
        window.location = config.app.path;
      })
      .catch((e) => {
        throw e;
      });
  } catch (e) {
    throw e;
  }
}

export async function refreshToken() {
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
}

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
