import axios from "axios";
import { handleResponse, handleError } from "./apiUtils";
import config from "../../config";

axios.defaults.headers.common = {
  "x-api-key": config.app.apiKey,
};

export const sendNotificationEmail = async (payload) => {
  let url = `${config.services.quartz.uri}`;
  url = `${url}/triggers/notifications/emails`;

  payload["toEmail"] = config.app.email;
  payload["purpose"] = "Contact ECMPS Support";

  return axios
    .post(url, payload)
    .then(handleResponse)
    .catch((error) => {
      handleError(error);
    });
};
