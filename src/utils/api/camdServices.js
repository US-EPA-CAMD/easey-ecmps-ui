import { handleResponse, handleError } from "./apiUtils";
import config from "../../config";
import { secureAxios } from "./easeyAuthApi";
import { formatReportUrl } from "../functions";

export async function getReport(
  reportCode,
  facilityId,
  monPlanId = null,
  testId = null,
  qceId = null,
  teeId = null
) {
  const url = `${config.services.camd.uri}${formatReportUrl(
    reportCode,
    facilityId,
    monPlanId,
    testId,
    qceId,
    teeId
  )}`;

  return secureAxios({
    method: "GET",
    url,
  })
    .then(handleResponse)
    .catch(handleError);
}

export async function submitData(payload) {
  /*
  return secureAxios({
    method: "POST",
    url: `${config.services.camd.uri}/submit`,
    data: payload,
  })
    .then(handleResponse)
    .catch(handleError);
    */
  return true;
}

export const triggerBulkEvaluation = async (payload) => {
  let url = `${config.services.camd.uri}`;
  url = `${url}/evaluate`;

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
