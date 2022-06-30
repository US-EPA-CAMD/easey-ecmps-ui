import axios from "axios";
import { handleResponse, handleError } from "./apiUtils";
import config from "../../config";

axios.defaults.headers.common = {
  "x-api-key": config.app.apiKey,
};

export const getQATestSummary = async (locID) => {
  let url = `${config.services.qaCertification.uri}`;

  // *** workspace section url (authenticated)
  if (window.location.href.indexOf("workspace") > -1) {
    url = `${url}/workspace`;
  }

  // *** attach the rest of the url
  url = `${url}/locations/${locID}/test-summary`;

  return axios.get(url).then(handleResponse).catch(handleError);
};

export const getQATestSummaryByID = async (locID, id) => {
  let url = `${config.services.qaCertification.uri}/`;

  // *** workspace section url (authenticated)
  if (window.location.href.indexOf("workspace") > -1) {
    url = `${url}/workspace`;
  }

  // *** attach the rest of the url
  url = `${url}/locations/${locID}/test-summary/${id}`;

  return axios.get(url).then(handleResponse).catch(handleError);
};
export const getQASchema = async () => {
  const url = `${config.services.content.uri}/ecmps/reporting-instructions/qa-certification.schema.json`;

  return axios.get(url).then(handleResponse).catch(handleError);
};

export const getReportingPeriod = async () =>{
  const url = `${config.services.mdm.uri}/reporting-periods`;
  return axios.get(url).then(handleResponse).catch(handleError);
};

export const getQATestSummaryByReportingPeriod = async (locId, beginDate, endDate) =>{
  const url = `${config.services.qaCertification.uri}/locations/${locId}/test-summary?beginDate=${beginDate}&endDate=${endDate}`;
  console.log("url", url);
  return axios.get(url).then(handleResponse).catch(handleError);
};
