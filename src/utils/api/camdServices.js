import config from "../../config";
import { secureAxios } from "./easeyAuthApi";
import { formatReportUrl } from "../functions";
import { handleResponse, handleError, handleImportError } from "./apiUtils";
import { clientTokenAxios } from "./clientTokenAxios";

export async function getReport(params) {
  const url = `${config.services.camd.uri}${formatReportUrl(params)}`;
  return secureAxios({
    method: "GET",
    url,
  });
}

export async function submitData(payload) {
  return secureAxios({
    method: "POST",
    url: `${config.services.camd.uri}/submission/queue`,
    data: payload,
  })
    .then(handleResponse)
    .catch(handleError);
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

export const sendSupportEmail = async (payload) => {
  const url = `${config.services.camd.uri}/support/email`;

  payload["toEmail"] = config.app.email;

  try {
    return await clientTokenAxios({
      method: "POST",
      url: url,
      data: payload,
    });
  } catch (error) {
    handleError(error);
    throw new Error(error);
  }
};

export const matsFileUpload = async (monitorPlanId, testNumber, fileListPayload) => {
  const url = `${config.services.camd.uri}/mats-file-upload/${monitorPlanId}/${testNumber}/import`;

  const formData = new FormData()

  for (const file of fileListPayload) {
    formData.append('file', file)
  }

  return secureAxios({
    method: "POST",
    url,
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
    .then(handleResponse)
    .catch(handleImportError);
}
