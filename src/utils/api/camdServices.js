import config from "../../config";
import { secureAxios } from "./easeyAuthApi";
import { formatReportUrl } from "../functions";
import { handleResponse, handleError, handleImportError } from "./apiUtils";
import { clientTokenAxios } from "./clientTokenAxios";

export async function getReport(params) {
  const url = `${config.services.camd.uri}${formatReportUrl(
    params,
    "reports"
  )}`;
  return secureAxios({
    method: "GET",
    url,
  });
}

export async function downloadReport(params) {
  const url = `${config.services.camd.uri}${formatReportUrl(
    params,
    "copy-of-record"
  )}`;


  return secureAxios({
    method: "GET",
    url,
    headers: {
      Accept: "application/html",
    },
    responseType: "blob",
  });
}

export async function submitData(payload) {
  return secureAxios({
    method: "POST",
    url: `${config.services.camd.uri}/submission/queue`,
    data: payload,
  })
    .then(handleResponse)
    .catch((error) => {
      // Re-throw the error so that we can display a user-friendly message to the user.
      throw error;
    });
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

export const matsFileUpload = async (
  monitorPlanId,
  payload,
  fileListPayload
) => {
  const url = `${config.services.camd.uri}/mats-file-upload/${monitorPlanId}/${payload.location}/${payload.testTypeGroup}/${payload.testNumber}/import`;

  const formData = new FormData();

  for (const file of fileListPayload) {
    formData.append("file", file);
  }

  return secureAxios({
    method: "POST",
    url,
    data: formData,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  })
    .then(handleResponse)
    .catch(handleImportError);
};
