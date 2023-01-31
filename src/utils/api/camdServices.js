import axios from "axios";
import { handleResponse, handleError } from "./apiUtils";
import config from "../../config";
import { secureAxios } from "./easeyAuthApi";
import { formatReportUrl } from "../functions";

axios.defaults.headers.common = {
  "x-api-key": config.app.apiKey,
};

export async function getReport(
  reportCode,
  facilityId,
  monPlanId = null,
  testId = null,
  qceId = null,
  teeId = null,
) {
  const url = `${config.services.camd.uri}${formatReportUrl(
    reportCode, facilityId, monPlanId, testId, qceId, teeId
  )}`

  if (window.location.href.includes("workspace")) {
    return secureAxios({
      method: "GET",
      url,
    })
    .then(handleResponse)
    .catch(handleError);
  }

  return axios
    .get(url)
    .then(handleResponse)
    .catch(handleError);
}

export async function submitData(payload) {
  return secureAxios({
    method: "POST",
    url: `${config.services.camd.uri}/submit`,
    data: payload,
  })
  .then(handleResponse)
  .catch(handleError);
}
