import axios from "axios";
import config from "../../config";
import { refreshClientToken } from "./easeyAuthApi";

export const clientTokenAxios = async (options) => {
  if (sessionStorage.getItem("client_token")) {
    if (
      Date.now() > new Date(sessionStorage.getItem("client_token_expiration"))
    ) {
      await refreshClientToken();
      console.log('sessionStorage.getItem("client_token_expiration")',sessionStorage.getItem("client_token_expiration"),Date.now())
    }
  } else {
    await refreshClientToken();
  }

  options.headers = {
    authorization: `Bearer ${sessionStorage.getItem("client_token")}`,
    "x-api-key": config.app.apiKey,
    "x-client-id": config.app.clientId,
  };

  return axios(options);
};
