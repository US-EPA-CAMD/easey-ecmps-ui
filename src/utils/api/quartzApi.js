import axios from "axios";
import { handleResponse, handleError } from "./apiUtils";
import config from "../../config";

axios.defaults.headers.common = {
  "x-api-key": config.app.apiKey,
};

export const sendNotificationEmail = async (payload) => {
  const url = `${config.services.quartz.uri}/triggers/notifications/emails`;

  return axios.post(url, payload).then(handleResponse).catch(handleError);
};
