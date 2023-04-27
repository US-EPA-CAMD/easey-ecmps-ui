import axios from "axios";
import config from "../../config";
import { refreshClientToken } from "./easeyAuthApi";

export const clientTokenAxios = async (options) => {
  if (localStorage.getItem("client_token")) {
    if (
      Date.now() > new Date(localStorage.getItem("client_token_expiration"))
    ) {
      await refreshClientToken();
    }
  } else {
    await refreshClientToken();
  }

  options.headers = {
    authorization: `Bearer ${localStorage.getItem("client_token")}`,
    "x-api-key": config.app.apiKey,
    "x-client-id": config.app.clientId,
  };

  return axios(options);
};
