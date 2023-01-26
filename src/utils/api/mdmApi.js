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

export const getCheckCatalogResults = () => {

  const url = `${config.services.mdm.uri}/es-check-catalog-results`;
  return axios.get(url).then(handleResponse).catch(handleError);
}

export const getReasonCodes = () => {
  const url = `${config.services.mdm.uri}/es-reason-codes`;
  return axios.get(url).then(handleResponse).catch(handleError);
}

export const getSeverityCodes = () => {
  const url = `${config.services.mdm.uri}/es-severity-codes`;
  return axios.get(url).then(handleResponse).catch(handleError);
}