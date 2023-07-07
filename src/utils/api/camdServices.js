import config from "../../config";
import { secureAxios } from "./easeyAuthApi";
import { formatReportUrl } from "../functions";
import { handleResponse, handleError } from "./apiUtils";
import { clientTokenAxios } from "./clientTokenAxios";

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

const getMaintenanceRecords = async (orisCode, unitStack, endpoint) => {
  let url = `${config.services.camd.uri}/admin/qa-maintenance/${endpoint}`;
  if (orisCode !== null && orisCode !== undefined) {
    url = `${url}?orisCode=${orisCode}`
  }
  if (unitStack !== null && unitStack !== undefined) {
    url = `${url}?orisCode=${orisCode}`
  }
  return secureAxios({ url: url, method: "GET" })
    .then(handleResponse)
    .catch(handleError);
}

export const getQaTestMaintenanceRecords = async (orisCode, unitStack) => {
  return getMaintenanceRecords(orisCode, unitStack, `test-summary`)
};

export const getQaCertEventMaintenanceRecords = async (orisCode, unitStack) => {
  return getMaintenanceRecords(orisCode, unitStack, 'cert-events')
};

export const getQaExtensionExemptionMaintenanceRecords = async (orisCode, unitStack) => {
  return getMaintenanceRecords(orisCode, unitStack, 'extension-exemptions')
};
