import config from "../../config";
import { secureAxios } from "./easeyAuthApi";
import { formatReportUrl } from "../functions";
import { handleResponse, handleError } from "./apiUtils";

export async function getReport(params) {
  const url = `${config.services.camd.uri}${formatReportUrl(params)}`;
  return secureAxios({
    method: "GET",
    url,
  })
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
