import axios from "axios";
import { handleResponse, handleError } from "./apiUtils";
import config from "../../config";
import { secureAxios } from "./easeyAuthApi";

axios.defaults.headers.common = {
  "x-api-key": config.app.apiKey,
};

export const sendNotificationEmail = async () => {
  let url = `${config.services.quartz.uri}`;
  url = `${url}/triggers/notifications/emails`;
  console.log("email:", config.app.email);

  const payload = {};
  payload["toEmail"] = "dionolympia@cvpcorp.com";
  payload["fromEmail"] = "dionolympia@cvpcorp.com";
  payload["subject"] = "test subject";
  payload["message"] = "test message";
  payload["purpose"] = "Contact ECMPS Support";

  console.log(payload);

  return axios.post(url, payload).then(handleResponse).catch(handleError);
};
