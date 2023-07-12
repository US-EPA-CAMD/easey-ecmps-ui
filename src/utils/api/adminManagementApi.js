import config from "../../config";
import { handleError, handleResponse } from "./apiUtils";
import { secureAxios } from "./easeyAuthApi";

const url = `${config.services.camd.uri}/admin/em-submission-access`;

export const getEmSubmissionRecords = async (orisCode, monitorPlanId, year, quarter, status) => {

  // At least some kind of filtering is required
  if (!orisCode && !monitorPlanId && !year && !quarter && !status)
    return []

  return secureAxios({
    url: url,
    params: {
      facilityId: orisCode,
      monitorPlanId,
      year,
      quarter,
      status,
    },
  })
    .then(handleResponse)
    .catch(handleError);
}

export const openEmSubmissionRecord = async (payload) => {

  return secureAxios({
    method: "POST",
    url: url,
    data: payload,
})
    .then(handleResponse)
    .catch(handleError);
}

export const updateEmSubmissionRecord = async (payload, id) => {

  return secureAxios({
    method: "PUT",
    url: `${url}/${id}`,
    data: payload,
  })
    .then(handleResponse)
    .catch(handleError);
}

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
