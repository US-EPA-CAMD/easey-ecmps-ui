import axios from "axios";
import config from "../../config";
import { handleResponse, handleError } from "./apiUtils";

axios.defaults.headers.common = {
  "x-api-key": config.app.apiKey,
};

export const getReportingPeriods = async () => {
  const url = `${config.services.mdm.uri}/reporting-periods`;
  return axios.get(url).then(handleResponse).catch(handleError);
};
