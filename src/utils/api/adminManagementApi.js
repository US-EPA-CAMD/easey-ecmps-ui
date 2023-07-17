import config from "../../config";
import { handleError, handleResponse } from "./apiUtils";
import { secureAxios } from "./easeyAuthApi";

const url = `${config.services.camd.uri}/admin/em-submission-access`;
const TEST_SUMMARY_ENDPOINT = 'test-summary'
const CERT_EVENT_ENDPOINT = 'cert-events'
const EXT_EXEMP_ENDPOINT = 'extension-exemptions'

export const getEmSubmissionRecords = async (
  orisCode,
  monitorPlanId,
  year,
  quarter,
  status
) => {
  // At least some kind of filtering is required
  if (!orisCode && !monitorPlanId && !year && !quarter && !status) return [];

  return secureAxios({
    url: url,
    params: {
      orisCode,
      monitorPlanId,
      year,
      quarter,
      status,
    },
  })
    .then(handleResponse)
    .catch(handleError);
};

export const openEmSubmissionRecord = async (payload) => {
  return secureAxios({
    method: "POST",
    url: url,
    data: payload,
  })
    .then(handleResponse)
    .catch(handleError);
};

export const updateEmSubmissionRecord = async (payload, id) => {
  return secureAxios({
    method: "PUT",
    url: `${url}/${id}`,
    data: payload,
  })
    .then(handleResponse)
    .catch(handleError);
};

const getMaintenanceRecords = async (orisCode, unitStack, endpoint) => {
  let url = `${config.services.camd.uri}/admin/qa-maintenance/${endpoint}`;
  if (orisCode !== null && orisCode !== undefined) {
    url = `${url}?orisCode=${orisCode}`;
  }
  if (unitStack !== null && unitStack !== undefined) {
    url = `${url}&unitStack=${unitStack}`;
  }
  return secureAxios({ url: url, method: "GET" })
    .then(handleResponse)
    .catch(handleError);
};

export const getQaTestMaintenanceRecords = async (orisCode, unitStack) => {
  return getMaintenanceRecords(orisCode, unitStack, TEST_SUMMARY_ENDPOINT)
};

export const getQaCertEventMaintenanceRecords = async (orisCode, unitStack) => {
  return getMaintenanceRecords(orisCode, unitStack, CERT_EVENT_ENDPOINT)
};

export const getQaExtensionExemptionMaintenanceRecords = async (orisCode, unitStack) => {
  return getMaintenanceRecords(orisCode, unitStack, EXT_EXEMP_ENDPOINT)
};

const updateQaMaintenanceRecord = (payload, id, endpoint) => {
  const url = `${config.services.camd.uri}/admin/qa-maintenance/${endpoint}/${id}`;
  return secureAxios({
    method: "PUT",
    url,
    data: payload,
  })
    .then(handleResponse)
    .catch(handleError);
}

export const updateQaTestMaintenanceRecords = async (payload, id) => {
  return updateQaMaintenanceRecord(payload, id, TEST_SUMMARY_ENDPOINT)
};

export const updateQaCertEventMaintenanceRecords = async (payload, id) => {
  return updateQaMaintenanceRecord(payload, id, CERT_EVENT_ENDPOINT)
};

export const updateQaExtensionExemptionMaintenanceRecords = async (payload, id) => {
  return updateQaMaintenanceRecord(payload, id, EXT_EXEMP_ENDPOINT)
};

const deleteQaMaintenanceRecord = (id, endpoint) => {
  const url = `${config.services.camd.uri}/admin/qa-maintenance/${endpoint}/${id}`;
  return secureAxios({
    method: "DELETE",
    url,
  })
    .then(handleResponse)
    .catch(handleError);
}

export const deleteQaTestMaintenanceRecords = async (id)=>{
  return deleteQaMaintenanceRecord(id, TEST_SUMMARY_ENDPOINT)
}

export const deleteQaCertEventMaintenanceRecords = async (id)=>{
  return deleteQaMaintenanceRecord(id, CERT_EVENT_ENDPOINT)
}

export const deleteQaExtensionExemptionMaintenanceRecords = async (id)=>{
  return deleteQaMaintenanceRecord(id, EXT_EXEMP_ENDPOINT)
}

