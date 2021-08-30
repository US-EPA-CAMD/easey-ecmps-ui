import axios from "axios";
import { handleResponse, handleError } from "./apiUtils";
import config from "../../config";

// *** obtain monitoring plans
export const getMonitoringPlans = async (orisCode) => {
  let url = `${config.services.monitorPlans.uri}`;

  // *** workspace section url (authenticated)
  if (window.location.href.indexOf("workspace") > -1) {
    url = `${url}/workspace`;
  }

  // *** attach the rest of the url
  url = `${url}/plans/${orisCode}/configurations`;

  return axios.get(url).then(handleResponse).catch(handleError);
};

// *** obtain monitoring methods
export const getMonitoringMethods = async (locationId) => {
  let url = `${config.services.monitorPlans.uri}`;

  // *** workspace section url (authenticated)
  if (window.location.href.indexOf("workspace") > -1) {
    url = `${url}/workspace`;
  }

  // *** attach the rest of the url
  url = `${url}/locations/${locationId}/methods`;

  return axios.get(url).then(handleResponse).catch(handleError);
};

export const getMonitoringMatsMethods = async (locationId) => {
  let url = `${config.services.monitorPlans.uri}`;

  // *** workspace section url (authenticated)
  if (window.location.href.indexOf("workspace") > -1) {
    url = `${url}/workspace`;
  }
  url = `${url}/locations/${locationId}/mats-methods`;

  return axios.get(url).then(handleResponse).catch(handleError);
};

export const getMonitoringSystems = async (locationId) => {
  console.log('locationidsystems',locationId)
  return axios
    .get(`${config.services.monitorPlans.uri}/locations/${locationId}/systems`)
    .then(handleResponse)
    .catch(handleError);
};

export const getMonitoringSystemsFuelFlows = async (locationId, systemId) => {
  return axios
    .get(
      `${config.services.monitorPlans.uri}/locations/${locationId}/systems/${systemId}/fuel-flows`
    )
    .then(handleResponse)
    .catch(handleError);
};

export const getMonitoringSystemsComponents = async (locId,
  systemId
) => {
  console.log("  systemId,componentRecordId", locId, systemId);
  return axios
    .get(
      `${config.services.monitorPlans.uri}/locations/${locId}/systems/${systemId}/components`
    )
    .then(handleResponse)
    .catch(handleError);
};

export const getMonitoringAnalyzerRanges = async (locId, componentRecordId) => {

  console.log('locid in api',locId, componentRecordId)
  let url = `${config.services.monitorPlans.uri}`;
  // *** workspace section url (authenticated)
  if (window.location.href.indexOf("workspace") > -1) {
    url = `${url}/workspace`;
  }
  url = `${url}/locations/${locId}​/components/${componentRecordId}/analyzer-ranges`;

  return axios.get(url).then(handleResponse).catch(handleError);
};

export const postCheckoutMonitoringPlanConfiguration = async (id, user) => {
  const userName = { username: user };
  return axios
    .post(
      `${config.services.monitorPlans.uri}/workspace/plans/${id}/check-outs`,
      userName
    )
    .then((response) => response.data)
    .catch(handleError);
};

export const revertOfficialRecord = async (id) => {
  return axios
    .delete(`${config.services.monitorPlans.uri}/workspace/plans/${id}/revert`)
    .then((response) => response.data)
    .catch(handleError);
};

export const createMethods = async (payload) => {
  const url = `${config.services.monitorPlans.uri}/workspace/locations/${payload["locationId"]}/methods`;

  // *** remove attributes not needed by the API
  delete payload["locationId"];
  delete payload["id"];

  return axios.post(url, payload).then(handleResponse).catch(handleError);
};
export const createMats = async (payload) => {
  const url = `${config.services.monitorPlans.uri}/workspace/locations/${payload["locationId"]}/mats-methods`;

  // *** remove attributes not needed by the API
  delete payload["locationId"];
  delete payload["id"];

  return axios.post(url, payload).then(handleResponse).catch(handleError);
};

export const putLockTimerUpdateConfiguration = async (id) => {
  return axios
    .put(`${config.services.monitorPlans.uri}/workspace/plans/${id}/check-outs`)
    .then(handleResponse)
    .catch(handleError);
};

export const saveMonitoringMethods = async (payload) => {
  const url = `${config.services.monitorPlans.uri}/workspace/locations/${payload["locationId"]}/methods/${payload["id"]}`;

  // *** remove attributes not needed by the API
  delete payload["locationId"];
  delete payload["id"];

  return axios.put(url, payload).then(handleResponse).catch(handleError);
};

export const saveMonitoringMats = async (payload) => {
  const url = `${config.services.monitorPlans.uri}/workspace/locations/${payload["locationId"]}/mats-methods/${payload["id"]}`;
  // *** remove attributes not needed by the API
  delete payload["locationId"];
  delete payload["id"];

  return axios.put(url, payload).then(handleResponse).catch(handleError);
};

export const deleteCheckInMonitoringPlanConfiguration = async (id) => {
  return axios
    .delete(
      `${config.services.monitorPlans.uri}/workspace/plans/${id}/check-outs`
    )
    .then((response) => response.data)
    .catch(handleError);
};

// *** obtain a list of all checked out locations (by all users)
export const getCheckedOutLocations = async () => {
  return axios
    .get(`${config.services.monitorPlans.uri}/workspace/plans/check-outs`)
    .then(handleResponse)
    .catch(handleError);
};

export const saveAnalyzerRanges = async (payload) => {
  const url = `${config.services.monitorPlans.uri}/workspace/locations/${payload["locId"]}/components/${payload["compId"]}/analyzer-ranges/${payload["id"]}`;
  // *** remove attributes not needed by the API
  delete payload["locId"];
  delete payload["id"];
  delete payload["compId"];

  return axios.put(url, payload).then(handleResponse).catch(handleError);
};

export const saveSystemsFuelFlows = async (payload,locId,sysId) => {

  console.log('testing api ;,',payload,locId,sysId )
  const url = `${config.services.monitorPlans.uri}/workspace/locations/${locId}/systems/${sysId}/fuel-flows/${payload["id"]}`;
  // *** remove attributes not needed by the API
  delete payload["id"];

  return axios.put(url, payload).then(handleResponse).catch(handleError);
};