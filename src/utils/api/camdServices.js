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

export async function getTestTypeCode() {
  const url = `${config.services.camd.uri}/test-type-code`
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

export async function submitData(payload, shouldHandleError = true) {
  return secureAxios({
    method: "POST",
    url: `${config.services.camd.uri}/submission/queue`,
    data: payload,
  })
    .then(handleResponse)
    .catch((error) => {
      if (!shouldHandleError) throw error; // Re-throw the error so that we can display a user-friendly message to the user
      return handleError(error);
    });
}

export const triggerBulkEvaluation = async (
  payload,
  shouldHandleError = true
) => {
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
    if (!shouldHandleError) throw error;
    return handleError(error);
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

export async function getEvaluationQueueOrder(orisCodes) {
  const queryString = `orisCodes=${orisCodes.join("|")}`;
  const url = `${config.services.camd.uri}/evaluate/queueOrder?${queryString}`;

  return secureAxios({ url: url, method: "GET" })
    .then(handleResponse)
    .catch(handleError);
}

export async function getSubmissionQueueOrder(orisCodes) {
  const queryString = `orisCodes=${orisCodes.join("|")}`;
  const url = `${config.services.camd.uri}/submission/queueOrder?${queryString}`;

  return secureAxios({ url: url, method: "GET" })
    .then(handleResponse)
    .catch(handleError);
}

export async function matsSubmissionProcess(payload, shouldHandleError = true) {
  return secureAxios({
    method: "POST",
    url: `${config.services.camd.uri}/mats-file-upload/process`,
    data: payload,
  })
    .then(handleResponse)
    .catch((error) => {
      if (!shouldHandleError) throw error;
      return handleError(error);
    });
}

/* ---------- Bulk Import ---------- */

export async function stageImportFiles(
  importSetId,
  files,
  shouldHandleError = true
) {
  const formData = new FormData();
  for (const file of files) {
    formData.append("files", file, file.name);
  }
  return secureAxios({
    method: "POST",
    url: `${config.services.camd.uri}/bulk-import/set/${importSetId}/stage`,
    data: formData,
    headers: { "Content-Type": "multipart/form-data" },
  })
    .then(handleResponse)
    .catch((error) => {
      if (!shouldHandleError) throw error;
      return handleImportError(error);
    });
}

// Removes specific staged files (pass s3Paths) or, with no s3Paths, clears all
// staged files for the set.
export async function deleteImportFiles(importSetId, s3Paths) {
  return secureAxios({
    method: "DELETE",
    url: `${config.services.camd.uri}/bulk-import/set/${importSetId}/files`,
    data: s3Paths ? { s3Paths } : undefined,
  })
    .then(handleResponse)
    .catch(handleError);
}

export async function submitImport(
  importSetId,
  items,
  userEmail,
  shouldHandleError = true
) {
  return secureAxios({
    method: "POST",
    url: `${config.services.camd.uri}/bulk-import/set/${importSetId}/submit`,
    data: { userEmail, items },
  })
    .then(handleResponse)
    .catch((error) => {
      if (!shouldHandleError) throw error;
      return handleError(error);
    });
}

export async function getLatestImport() {
  return secureAxios({
    method: "GET",
    url: `${config.services.camd.uri}/bulk-import/latest`,
  })
    .then(handleResponse)
    .catch(handleError);
}

export async function getImportSet(importSetId) {
  return secureAxios({
    method: "GET",
    url: `${config.services.camd.uri}/bulk-import/set/${importSetId}`,
  })
    .then(handleResponse)
    .catch(handleError);
}
