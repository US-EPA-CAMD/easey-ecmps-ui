import axios from "axios";
import config from "../../config";

export const clientTokenAxios = async (options) => {
  options.headers = {
    "x-api-key": config.app.apiKey,
  };

  return axios(options);
};
