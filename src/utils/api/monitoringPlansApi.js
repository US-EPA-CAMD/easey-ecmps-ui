import { handleResponse, handleError } from "./apiUtils";
import config from "../../config";
import { secureAxios as axios } from "./easeyAuthApi";

// *** obtain monitoring plans
export const getMonitoringPlans = async (orisCode) => {
  let url = `${config.services.monitorPlans.uri}`;

  // *** workspace section url (authenticated)
  if (window.location.href.indexOf("workspace") > -1) {
    url = `${url}/workspace`;
  }

  // *** attach the rest of the url
  url = `${url}/plans/${orisCode}/configurations`;

  return axios({ url: url }).then(handleResponse).catch(handleError);
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

  return axios({ url: url }).then(handleResponse).catch(handleError);
};

export const getMonitoringMatsMethods = async (locationId) => {
  let url = `${config.services.monitorPlans.uri}`;

  // *** workspace section url (authenticated)
  if (window.location.href.indexOf("workspace") > -1) {
    url = `${url}/workspace`;
  }
  url = `${url}/locations/${locationId}/mats-methods`;

  return axios({ url: url }).then(handleResponse).catch(handleError);
};

export const getMonitoringSystems = async (locationId) => {
  let url = `${config.services.monitorPlans.uri}`;
  // *** workspace section url (authenticated)
  if (window.location.href.indexOf("workspace") > -1) {
    url = `${url}/workspace`;
  }
  url = `${url}/locations/${locationId}/systems`;

  return axios({ url: url }).then(handleResponse).catch(handleError);
};

export const getMonitoringSystemsFuelFlows = async (locationId, systemId) => {
  let url = `${config.services.monitorPlans.uri}`;
  // *** workspace section url (authenticated)
  if (window.location.href.indexOf("workspace") > -1) {
    url = `${url}/workspace`;
  }
  url = `${url}/locations/${locationId}/systems/${systemId}/fuel-flows`;

  return axios({ url: url }).then(handleResponse).catch(handleError);
};

export const getMonitoringSystemsComponents = async (locId, systemId) => {
  console.log("locId, systemId", locId, systemId);
  let url = `${config.services.monitorPlans.uri}`;
  // *** workspace section url (authenticated)
  if (window.location.href.indexOf("workspace") > -1) {
    url = `${url}/workspace`;
  }
  url = `${url}/locations/${locId}/systems/${systemId}/components`;

  return axios({ url: url }).then(handleResponse).catch(handleError);
};

export const getMonitoringComponents = async (locId) => {
  let url = `${config.services.monitorPlans.uri}`;
  // *** workspace section url (authenticated)
  if (window.location.href.indexOf("workspace") > -1) {
    url = `${url}/workspace`;
  }
  url = `${url}/locations/${locId}/components/`;

  console.log("URL", url, locId);
  return axios({ url: url }).then(handleResponse).catch(handleError);
};

export const getMonitoringAnalyzerRanges = async (locId, componentRecordId) => {
  let url = `${config.services.monitorPlans.uri}`;
  // *** workspace section url (authenticated)
  if (window.location.href.indexOf("workspace") > -1) {
    url = `${url}/workspace`;
  }
  url = `${url}/locations/${locId}​/components/${componentRecordId}/analyzer-ranges`;

  return axios({ url: url }).then(handleResponse).catch(handleError);
};

export const postCheckoutMonitoringPlanConfiguration = async (id, user) => {
  const userName = { username: user };
  return axios({
    method: "POST",
    url: `${config.services.monitorPlans.uri}/workspace/plans/${id}/check-outs`,
    data: userName,
  })
    .then((response) => response.data)
    .catch(handleError);
};

export const revertOfficialRecord = async (id) => {
  return axios({
    method: "DELETE",
    url: `${config.services.monitorPlans.uri}/workspace/plans/${id}/revert`,
  })
    .then((response) => response.data)
    .catch(handleError);
};

export const createMethods = async (payload) => {
  const url = `${config.services.monitorPlans.uri}/workspace/locations/${payload["locationId"]}/methods`;

  // *** remove attributes not needed by the API
  delete payload["locationId"];
  delete payload["id"];

  return axios({ method: "POST", url: url, data: payload })
    .then(handleResponse)
    .catch(handleError);
};
export const createMats = async (payload) => {
  const url = `${config.services.monitorPlans.uri}/workspace/locations/${payload["locationId"]}/mats-methods`;

  // *** remove attributes not needed by the API
  delete payload["locationId"];
  delete payload["id"];

  return axios({ method: "POST", url: url, data: payload })
    .then(handleResponse)
    .catch(handleError);
};

export const putLockTimerUpdateConfiguration = async (id) => {
  return axios({
    method: "PUT",
    url: `${config.services.monitorPlans.uri}/workspace/plans/${id}/check-outs`,
  })
    .then(handleResponse)
    .catch(handleError);
};

export const saveMonitoringMethods = async (payload) => {
  const url = `${config.services.monitorPlans.uri}/workspace/locations/${payload["locationId"]}/methods/${payload["id"]}`;

  // *** remove attributes not needed by the API
  delete payload["locationId"];
  delete payload["id"];

  return axios({
    method: "PUT",
    url: url,
    data: payload,
  })
    .then(handleResponse)
    .catch(handleError);
};

export const saveMonitoringMats = async (payload) => {
  const url = `${config.services.monitorPlans.uri}/workspace/locations/${payload["locationId"]}/mats-methods/${payload["id"]}`;
  // *** remove attributes not needed by the API
  delete payload["locationId"];
  delete payload["id"];

  return axios({
    method: "PUT",
    url: url,
    data: payload,
  })
    .then(handleResponse)
    .catch(handleError);
};

export const deleteCheckInMonitoringPlanConfiguration = async (id) => {
  return axios({
    method: "DELETE",
    url: `${config.services.monitorPlans.uri}/workspace/plans/${id}/check-outs`,
  })
    .then((response) => response.data)
    .catch(handleError);
};

// *** obtain a list of all checked out locations (by all users)
export const getCheckedOutLocations = async () => {
  const url = `${config.services.monitorPlans.uri}/workspace/plans/check-outs`;

  return axios({ url: url }).then(handleResponse).catch(handleError);
};

export const saveAnalyzerRanges = async (payload) => {
  const url = `${config.services.monitorPlans.uri}/workspace/locations/${payload["locId"]}/components/${payload["compId"]}/analyzer-ranges/${payload["id"]}`;
  // *** remove attributes not needed by the API
  delete payload["locId"];
  delete payload["id"];
  delete payload["compId"];
  return axios({
    method: "PUT",
    url: url,
    data: payload,
  })
    .then(handleResponse)
    .catch(handleError);
};
export const createAnalyzerRanges = async (payload) => {
  const url = `${config.services.monitorPlans.uri}/workspace/locations/${payload["locId"]}/components/${payload["compId"]}/analyzer-ranges/`;
  // *** remove attributes not needed by the API
  delete payload["locId"];
  delete payload["compId"];

  return axios({
    method: "POST",
    url: url,
    data: payload,
  })
    .then(handleResponse)
    .catch(handleError);
};

export const saveSystemsFuelFlows = async (payload, locId, sysId) => {
  const url = `${config.services.monitorPlans.uri}/workspace/locations/${locId}/systems/${sysId}/fuel-flows/${payload["id"]}`;
  // *** remove attributes not needed by the API
  delete payload["id"];

  return axios({
    method: "PUT",
    url: url,
    data: payload,
  })
    .then(handleResponse)
    .catch(handleError);
};

export const createSystemsFuelFlows = async (payload, locId, sysId) => {
  const url = `${config.services.monitorPlans.uri}/workspace/locations/${locId}/systems/${sysId}/fuel-flows/`;
  // *** remove attributes not needed by the API
  delete payload["id"];

  return axios({
    method: "POST",
    url: url,
    data: payload,
  })
    .then(handleResponse)
    .catch(handleError);
};

export const saveSystems = async (payload, locId, sysId) => {
  const url = `${config.services.monitorPlans.uri}/workspace/locations/${locId}/systems/${sysId}`;
  // *** remove attributes not needed by the API
  delete payload["id"];

  return axios({
    method: "PUT",
    url: url,
    data: payload,
  })
    .then(handleResponse)
    .catch(handleError);
};

export const createSystems = async (payload, locId, sysId) => {
  const url = `${config.services.monitorPlans.uri}/workspace/locations/${locId}/systems/`;
  // *** remove attributes not needed by the API
  delete payload["id"];

  return axios({
    method: "POST",
    url: url,
    data: payload,
  })
    .then(handleResponse)
    .catch(handleError);
};

export const saveSystemsComponents = async (payload, locId, sysId, compId) => {
  const url = `${config.services.monitorPlans.uri}/workspace/locations/${locId}/systems/${sysId}/components/${compId}`;
  // *** remove attributes not needed by the API
  delete payload["id"];
  return axios({
    method: "PUT",
    url: url,
    data: payload,
  })
    .then(handleResponse)
    .catch(handleError);
};

export const createSystemsComponents = async (payload, locId, sysId) => {
  const url = `${config.services.monitorPlans.uri}/workspace/locations/${locId}/systems/${sysId}/components/`;
  // *** remove attributes not needed by the API
  console.log("payload, locId, sysId,", payload, locId, sysId);
  delete payload["id"];

  return axios({
    method: "POST",
    url: url,
    data: payload,
  })
    .then(handleResponse)
    .catch(handleError);
};

export const getMonitoringSpans = async (locationId) => {
  let url = `${config.services.monitorPlans.uri}`;

  // *** workspace section url (authenticated)
  if (window.location.href.indexOf("workspace") > -1) {
    url = `${url}/workspace`;
  }

  // *** attach the rest of the url
  url = `${url}/locations/${locationId}/spans`;

  return axios({ url: url }).then(handleResponse).catch(handleError);
};
