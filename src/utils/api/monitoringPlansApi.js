import axios from "axios";
import { handleResponse, handleError } from "./apiUtils";
import config from "../../config";
import { secureAxios } from "./easeyAuthApi";

axios.defaults.headers.common = {
  "x-api-key": config.app.apiKey,
};

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
  let url = `${config.services.monitorPlans.uri}`;
  // *** workspace section url (authenticated)
  if (window.location.href.indexOf("workspace") > -1) {
    url = `${url}/workspace`;
  }
  url = `${url}/locations/${locationId}/systems`;

  return axios.get(url).then(handleResponse).catch(handleError);
};

export const getMonitoringSystemsFuelFlows = async (locationId, systemId) => {
  let url = `${config.services.monitorPlans.uri}`;
  // *** workspace section url (authenticated)
  if (window.location.href.indexOf("workspace") > -1) {
    url = `${url}/workspace`;
  }
  url = `${url}/locations/${locationId}/systems/${systemId}/fuel-flows`;

  return axios.get(url).then(handleResponse).catch(handleError);
};

export const getMonitoringSystemsComponents = async (locId, systemId) => {
  let url = `${config.services.monitorPlans.uri}`;
  // *** workspace section url (authenticated)
  if (window.location.href.indexOf("workspace") > -1) {
    url = `${url}/workspace`;
  }
  url = `${url}/locations/${locId}/systems/${systemId}/components`;

  return axios.get(url).then(handleResponse).catch(handleError);
};

export const getMonitoringComponents = async (locId) => {
  let url = `${config.services.monitorPlans.uri}`;
  // *** workspace section url (authenticated)
  if (window.location.href.indexOf("workspace") > -1) {
    url = `${url}/workspace`;
  }
  url = `${url}/locations/${locId}/components/`;

  return axios.get(url).then(handleResponse).catch(handleError);
};

export const getMonitoringAnalyzerRanges = async (locId, componentRecordId) => {
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
  return secureAxios({
    method: "POST",
    url: `${config.services.monitorPlans.uri}/workspace/plans/${id}/check-outs`,
    data: userName,
  })
    .then((response) => response.data)
    .catch(handleError);
};

export const revertOfficialRecord = async (id) => {
  return secureAxios({
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

  return secureAxios({ method: "POST", url: url, data: payload })
    .then(handleResponse)
    .catch(handleError);
};
export const createMats = async (payload) => {
  const url = `${config.services.monitorPlans.uri}/workspace/locations/${payload["locationId"]}/mats-methods`;

  // *** remove attributes not needed by the API
  delete payload["locationId"];
  delete payload["id"];

  return secureAxios({ method: "POST", url: url, data: payload })
    .then(handleResponse)
    .catch(handleError);
};

export const putLockTimerUpdateConfiguration = async (id) => {
  return secureAxios({
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

  return secureAxios({
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

  return secureAxios({
    method: "PUT",
    url: url,
    data: payload,
  })
    .then(handleResponse)
    .catch(handleError);
};

export const deleteCheckInMonitoringPlanConfiguration = async (id) => {
  return secureAxios({
    method: "DELETE",
    url: `${config.services.monitorPlans.uri}/workspace/plans/${id}/check-outs`,
  })
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

export const getConfigInfo = async (planId) => {
  return axios
    .get(
      `${config.services.monitorPlans.uri}/workspace/plans/information/${planId}`
    )
    .then(handleResponse)
    .catch(handleError);
};

export const saveAnalyzerRanges = async (payload) => {
  const url = `${config.services.monitorPlans.uri}/workspace/locations/${payload["locId"]}/components/${payload["compId"]}/analyzer-ranges/${payload["id"]}`;
  // *** remove attributes not needed by the API
  delete payload["locId"];
  delete payload["id"];
  delete payload["compId"];
  return secureAxios({
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

  return secureAxios({
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

  return secureAxios({
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

  return secureAxios({
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

  return secureAxios({
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

  return secureAxios({
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
  return secureAxios({
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
  delete payload["id"];

  return secureAxios({
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

  return axios.get(url).then(handleResponse).catch(handleError);
};

export const saveMonitoringSpans = async (payload) => {
  const url = `${config.services.monitorPlans.uri}/workspace/locations/${payload["locationId"]}/spans/${payload["id"]}`;
  // *** remove attributes not needed by the API

  return secureAxios({
    method: "PUT",
    url: url,
    data: payload,
  })
    .then(handleResponse)
    .catch(handleError);
};

export const createMonitoringSpans = async (payload) => {
  const url = `${config.services.monitorPlans.uri}/workspace/locations/${payload["locationId"]}/spans/`;

  // *** remove attributes not needed by the API
  delete payload["id"];

  return secureAxios({
    method: "POST",
    url: url,
    data: payload,
  })
    .then(handleResponse)
    .catch(handleError);
};

export const saveMonitoringLoads = async (payload) => {
  const url = `${config.services.monitorPlans.uri}/workspace/locations/${payload["locationId"]}/loads/${payload["id"]}`;
  // *** remove attributes not needed by the API

  return secureAxios({
    method: "PUT",
    url: url,
    data: payload,
  })
    .then(handleResponse)
    .catch(handleError);
};

export const createMonitoringLoads = async (payload) => {
  const url = `${config.services.monitorPlans.uri}/workspace/locations/${payload["locationId"]}/loads/`;

  // *** remove attributes not needed by the API
  delete payload["id"];

  return secureAxios({
    method: "POST",
    url: url,
    data: payload,
  })
    .then(handleResponse)
    .catch(handleError);
};

export const getMonitoringLoads = async (locationId) => {
  let url = `${config.services.monitorPlans.uri}`;

  // *** workspace section url (authenticated)
  if (window.location.href.indexOf("workspace") > -1) {
    url = `${url}/workspace`;
  }

  // *** attach the rest of the url
  url = `${url}/locations/${locationId}/loads`;

  return axios.get(url).then(handleResponse).catch(handleError);
};

export const getMonitoringDefaults = async (locationId) => {
  // defaults
  let url = `${config.services.monitorPlans.uri}`;

  // *** workspace section url (authenticated)
  if (window.location.href.indexOf("workspace") > -1) {
    url = `${url}/workspace`;
  }

  url = `${url}/locations/${locationId}/defaults`;

  return axios.get(url).then(handleResponse).catch(handleError);
};

export const saveMonitoringDefaults = async (payload, locID) => {
  const url = `${config.services.monitorPlans.uri}/workspace/locations/${locID}/defaults/${payload["id"]}`;
  // *** remove attributes not needed by the API

  return secureAxios({
    method: "PUT",
    url: url,
    data: payload,
  })
    .then(handleResponse)
    .catch(handleError);
};

export const createMonitoringDefaults = async (payload, locID) => {
  const url = `${config.services.monitorPlans.uri}/workspace/locations/${locID}/defaults/`;

  // *** remove attributes not needed by the API
  delete payload["id"];

  return secureAxios({
    method: "POST",
    url: url,
    data: payload,
  })
    .then(handleResponse)
    .catch(handleError);
};

export const getMonitoringFormulas = async (locationId) => {
  let url = `${config.services.monitorPlans.uri}`;

  // *** workspace section url (authenticated)
  if (window.location.href.indexOf("workspace") > -1) {
    url = `${url}/workspace`;
  }

  // *** attach the rest of the url
  url = `${url}/locations/${locationId}/formulas`;

  return axios.get(url).then(handleResponse).catch(handleError);
};

export const getMonitoringRectangularDucts = async (locationId) => {
  let url = `${config.services.monitorPlans.uri}`;

  // *** workspace section url (authenticated)
  if (window.location.href.indexOf("workspace") > -1) {
    url = `${url}/workspace`;
  }

  // *** attach the rest of the url
  url = `${url}/locations/${locationId}/duct-wafs`;

  return axios.get(url).then(handleResponse).catch(handleError);
};

export const saveMonitoringDuct = async (payload) => {
  const url = `${config.services.monitorPlans.uri}/workspace/locations/${payload["locationId"]}/duct-wafs/${payload["id"]}`;
  // *** remove attributes not needed by the API
  return secureAxios({
    method: "PUT",
    url: url,
    data: payload,
  })
    .then(handleResponse)
    .catch(handleError);
};

export const createMonitoringDuct = async (payload) => {
  const url = `${config.services.monitorPlans.uri}/workspace/locations/${payload["locationId"]}/duct-wafs/`;

  // *** remove attributes not needed by the API
  delete payload["id"];

  return secureAxios({
    method: "POST",
    url: url,
    data: payload,
  })
    .then(handleResponse)
    .catch(handleError);
};

export const getMonitoringPlansFuelDataRecords = async (selectedLocation) => {
  let url = `${config.services.monitorPlans.uri}`;
  // *** workspace section url (authenticated)
  if (window.location.href.indexOf("workspace") > -1) {
    url = `${url}/workspace`;
  }

  url = `${url}/locations/${selectedLocation["id"]}/units/${selectedLocation["unitRecordId"]}/unit-fuels`;

  return axios.get(url).then(handleResponse).catch(handleError);
};

export const saveMonitoringPlansFuelData = async (payload) => {
  const url = `${config.services.monitorPlans.uri}/workspace/locations/${payload["locationId"]}/units/${payload["unitRecordId"]}/unit-fuels/${payload["id"]}`;
  // *** remove attributes not needed by the API

  return secureAxios({
    method: "PUT",
    url: url,
    data: payload,
  })
    .then(handleResponse)
    .catch(handleError);
};

export const createFuelData = async (payload) => {
  const url = `${config.services.monitorPlans.uri}/workspace/locations/${payload["locationId"]}/units/${payload["unitRecordId"]}/unit-fuels`;

  // *** remove attributes not needed by the API
  delete payload["id"];

  return secureAxios({
    method: "POST",
    url: url,
    data: payload,
  })
    .then(handleResponse)
    .catch(handleError);
};

export const getMonitoringPlansUnitControlRecords = async (
  selectedLocation
) => {
  let url = `${config.services.monitorPlans.uri}`;
  // *** workspace section url (authenticated)
  if (window.location.href.indexOf("workspace") > -1) {
    url = `${url}/workspace`;
  }

  url = `${url}/locations/${selectedLocation["id"]}/units/${selectedLocation["unitRecordId"]}/unit-controls`;

  return axios.get(url).then(handleResponse).catch(handleError);
};

export const saveUnitControl = async (payload, urlParameters) => {
  const url = `${config.services.monitorPlans.uri}/workspace/locations/${urlParameters["locId"]}/units/${urlParameters["unitRecordId"]}/unit-controls/${urlParameters["unitControlId"]}`;
  // *** remove attributes not needed by the API
  return secureAxios({
    method: "PUT",
    url: url,
    data: payload,
  })
    .then(handleResponse)
    .catch(handleError);
};

export const createUnitControl = async (payload, urlParameters) => {
  const url = `${config.services.monitorPlans.uri}/workspace/locations/${urlParameters["locId"]}/units/${urlParameters["unitRecordId"]}/unit-controls`;

  // *** remove attributes not needed by the API
  delete payload["id"];

  return secureAxios({
    method: "POST",
    url: url,
    data: payload,
  })
    .then(handleResponse)
    .catch(handleError);
};

export const saveMonitoringFormulas = async (payload, locID) => {
  const url = `${config.services.monitorPlans.uri}/workspace/locations/${locID}/formulas/${payload["id"]}`;
  // *** remove attributes not needed by the API
  return secureAxios({
    method: "PUT",
    url: url,
    data: payload,
  })
    .then(handleResponse)
    .catch(handleError);
};

export const createMonitoringFormulas = async (payload, locID) => {
  const url = `${config.services.monitorPlans.uri}/workspace/locations/${locID}/formulas/`;

  // *** remove attributes not needed by the API
  delete payload["id"];

  return secureAxios({
    method: "POST",
    url: url,
    data: payload,
  })
    .then(handleResponse)
    .catch(handleError);
};

export const getUnitCapacity = async (selectedLocation) => {
  let url = `${config.services.monitorPlans.uri}`;
  // *** workspace section url (authenticated)
  if (window.location.href.indexOf("workspace") > -1) {
    url = `${url}/workspace`;
  }

  url = `${url}/locations/${selectedLocation["id"]}/units/${selectedLocation["unitRecordId"]}/unit-capacities`;

  return axios.get(url).then(handleResponse).catch(handleError);
};

export const saveUnitCapacity = async (payload, urlParameters) => {
  const url = `${config.services.monitorPlans.uri}/workspace/locations/${urlParameters["locId"]}/units/${urlParameters["unitRecordId"]}/unit-capacities/${payload["id"]}`;
  // *** remove attributes not needed by the API

  return secureAxios({
    method: "PUT",
    url: url,
    data: payload,
  })
    .then(handleResponse)
    .catch(handleError);
};

export const createUnitCapacity = async (payload, urlParameters) => {
  const url = `${config.services.monitorPlans.uri}/workspace/locations/${urlParameters["locId"]}/units/${urlParameters["unitRecordId"]}/unit-capacities/`;
  // *** remove attributes not needed by the API

  return secureAxios({
    method: "POST",
    url: url,
    data: payload,
  })
    .then(handleResponse)
    .catch(handleError);
};

export const getPCTQualifications = async (locationId, qualId) => {
  let url = `${config.services.monitorPlans.uri}`;
  // *** workspace section url (authenticated)
  if (window.location.href.indexOf("workspace") > -1) {
    url = `${url}/workspace`;
  }

  url = `${url}/locations/${locationId}/qualifications/${qualId}/pct-qualifications`;

  return axios.get(url).then(handleResponse).catch(handleError);
};

export const savePCTQualificationData = async (payload) => {
  const url = `${config.services.monitorPlans.uri}/workspace/locations/${payload["locationId"]}/qualifications/${payload["qualId"]}/pct-qualifications/${payload["id"]}`;
  // *** remove attributes not needed by the API

  return secureAxios({
    method: "PUT",
    url: url,
    data: payload,
  })
    .then(handleResponse)
    .catch(handleError);
};

export const createPCTQualificationData = async (payload) => {
  const url = `${config.services.monitorPlans.uri}/workspace/locations/${payload["locationId"]}/qualifications/${payload["qualId"]}/pct-qualifications/`;

  // *** remove attributes not needed by the API
  delete payload["id"];

  return secureAxios({
    method: "POST",
    url: url,
    data: payload,
  })
    .then(handleResponse)
    .catch(handleError);
};

export const getQualifications = async (locationId) => {
  let url = `${config.services.monitorPlans.uri}`;
  // *** workspace section url (authenticated)
  if (window.location.href.indexOf("workspace") > -1) {
    url = `${url}/workspace`;
  }

  url = `${url}/locations/${locationId}/qualifications`;

  return axios.get(url).then(handleResponse).catch(handleError);
};

export const saveQualificationData = async (payload) => {
  const url = `${config.services.monitorPlans.uri}/workspace/locations/${payload["locationId"]}/qualifications/${payload["id"]}`;
  // *** remove attributes not needed by the API

  return secureAxios({
    method: "PUT",
    url: url,
    data: payload,
  })
    .then(handleResponse)
    .catch(handleError);
};

export const createQualificationData = async (payload) => {
  const url = `${config.services.monitorPlans.uri}/workspace/locations/${payload["locationId"]}/qualifications/`;

  // *** remove attributes not needed by the API
  delete payload["id"];

  return secureAxios({
    method: "POST",
    url: url,
    data: payload,
  })
    .then(handleResponse)
    .catch(handleError);
};

export const getLEEQualifications = async (locationId, qualId) => {
  let url = `${config.services.monitorPlans.uri}`;
  // *** workspace section url (authenticated)
  if (window.location.href.indexOf("workspace") > -1) {
    url = `${url}/workspace`;
  }

  url = `${url}/locations/${locationId}/qualifications/${qualId}/lee-qualifications`;

  return axios.get(url).then(handleResponse).catch(handleError);
};

export const saveLEEQualificationData = async (payload) => {
  const url = `${config.services.monitorPlans.uri}/workspace/locations/${payload["locationId"]}/qualifications/${payload["qualId"]}/lee-qualifications/${payload["id"]}`;
  // *** remove attributes not needed by the API

  return secureAxios({
    method: "PUT",
    url: url,
    data: payload,
  })
    .then(handleResponse)
    .catch(handleError);
};

export const createLEEQualificationData = async (payload) => {
  const url = `${config.services.monitorPlans.uri}/workspace/locations/${payload["locationId"]}/qualifications/${payload["qualId"]}/lee-qualifications/`;

  // *** remove attributes not needed by the API
  delete payload["id"];

  return secureAxios({
    method: "POST",
    url: url,
    data: payload,
  })
    .then(handleResponse)
    .catch(handleError);
};

export const getLMEQualifications = async (locationId, qualId) => {
  let url = `${config.services.monitorPlans.uri}`;
  // *** workspace section url (authenticated)
  if (window.location.href.indexOf("workspace") > -1) {
    url = `${url}/workspace`;
  }

  url = `${url}/locations/${locationId}/qualifications/${qualId}/lme-qualifications`;

  return axios.get(url).then(handleResponse).catch(handleError);
};

export const saveLMEQualificationData = async (payload) => {
  const url = `${config.services.monitorPlans.uri}/workspace/locations/${payload["locationId"]}/qualifications/${payload["qualId"]}/lme-qualifications/${payload["id"]}`;
  // *** remove attributes not needed by the API

  return secureAxios({
    method: "PUT",
    url: url,
    data: payload,
  })
    .then(handleResponse)
    .catch(handleError);
};

export const createLMEQualificationData = async (payload) => {
  const url = `${config.services.monitorPlans.uri}/workspace/locations/${payload["locationId"]}/qualifications/${payload["qualId"]}/lme-qualifications/`;

  // *** remove attributes not needed by the API
  delete payload["id"];

  return secureAxios({
    method: "POST",
    url: url,
    data: payload,
  })
    .then(handleResponse)
    .catch(handleError);
};

export const getLocationAttributes = async (locationId) => {
  let url = `${config.services.monitorPlans.uri}`;
  // *** workspace section url (authenticated)
  if (window.location.href.indexOf("workspace") > -1) {
    url = `${url}/workspace`;
  }

  url = `${url}/locations/${locationId}/attributes`;

  return axios.get(url).then(handleResponse).catch(handleError);
};

export const getRelationshipData = async (locationId) => {
  let url = `${config.services.monitorPlans.uri}`;
  // *** workspace section url (authenticated)
  if (window.location.href.indexOf("workspace") > -1) {
    url = `${url}/workspace`;
  }

  url = `${url}/locations/${locationId}/relationships`;
  return axios.get(url).then(handleResponse).catch(handleError);
};

export const saveLocationAttribute = async (payload, locationId) => {
  const url = `${config.services.monitorPlans.uri}/workspace/locations/${locationId}/attributes/${payload["id"]}`;

  return secureAxios({
    method: "PUT",
    url: url,
    data: payload,
  })
    .then(handleResponse)
    .catch(handleError);
};
export const createLocationAttribute = async (payload, locationSelectValue) => {
  const url = `${config.services.monitorPlans.uri}/workspace/locations/${locationSelectValue}/attributes/`;

  // *** remove attributes not needed by the API
  delete payload["id"];

  return secureAxios({
    method: "POST",
    url: url,
    data: payload,
  })
    .then(handleResponse)
    .catch(handleError);
};
