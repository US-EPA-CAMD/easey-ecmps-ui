import axios from "axios";
import { handleResponse, handleError } from "./apiUtils";
import config from "../../config";
import { secureAxios } from "./easeyAuthApi";

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
      throw new Error(error);
    });
};

export const triggerEvaluation = async (payload) => {
  let url = `${config.services.quartz.uri}`;
  url = `${url}/triggers/evaluations/monitor-plans`;
  return secureAxios({
    method: "POST",
    url: url,
    data: payload,
  })
    .then(handleResponse)
    .catch((error) => {
      handleError(error);
      console.log(error);
      throw new Error(error);
    });
};
