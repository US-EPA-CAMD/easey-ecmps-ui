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
    });
};

export const triggerEvaluation = async (payload) => {
  let url = `${config.services.quartz.uri}`;
  url = `${url}/triggers/evaluations/monitor-plans`;
  try {
    return handleResponse(
      await secureAxios({
        method: "POST",
        url: url,
        data: payload,
      })
    );
  } catch (error) {
    handleError(error);
  }
};

export const triggerBulkEvaluation = async (payload) => {
  let url = `${config.services.quartz.uri}`;
  url = `${url}/triggers/evaluations`;
  try {
    return handleResponse(
      await secureAxios({
        method: "POST",
        url: url,
        data: payload,
      })
    );
  } catch (error) {
    handleError(error);
  }
};
