import axios from "axios";
import { handleResponse, handleError, handleImportError } from "./apiUtils";
import config from "../../config";
import { secureAxios } from "./easeyAuthApi";

axios.defaults.headers.common = {
  "x-api-key": config.app.apiKey,
};

export const getMonitoringPlanById = async (id) => {
  let url = `${config.services.monitorPlans.uri}/workspace`;

  url = `${url}/plans/${id}`;

  return axios.get(url).then(handleResponse).catch(handleError);
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
  try {
    return (
      await secureAxios({
        method: "POST",
        url: `${config.services.monitorPlans.uri}/workspace/check-outs/plans/${id}`,
        data: userName,
      })
    ).data;
  } catch (error) {
    handleError(error);
  }
};

export const revertOfficialRecord = async (id) => {
  try {
    return (
      await secureAxios({
        method: "DELETE",
        url: `${config.services.monitorPlans.uri}/workspace/plans/${id}/revert`,
      })
    ).data;
  } catch (error) {
    handleError(error);
  }
};

export const createMethods = async (payload) => {
  const url = `${config.services.monitorPlans.uri}/workspace/locations/${payload["locationId"]}/methods`;

  // *** remove attributes not needed by the API
  delete payload["locationId"];
  delete payload["id"];

  try {
    return handleResponse(
      await secureAxios({ method: "POST", url: url, data: payload })
    );
  } catch (error) {
    handleError(error);
  }
};
export const createMats = async (payload) => {
  const url = `${config.services.monitorPlans.uri}/workspace/locations/${payload["locationId"]}/mats-methods`;

  // *** remove attributes not needed by the API
  delete payload["locationId"];
  delete payload["id"];

  try {
    return handleResponse(
      await secureAxios({ method: "POST", url: url, data: payload })
    );
  } catch (error) {
    handleError(error);
  }
};

export const putLockTimerUpdateConfiguration = async (id) => {
  try {
    return handleResponse(
      await secureAxios({
        method: "PUT",
        url: `${config.services.monitorPlans.uri}/workspace/check-outs/plans/${id}`,
      })
    );
  } catch (error) {
    handleError(error);
  }
};

export const saveMonitoringMethods = async (payload) => {
  const url = `${config.services.monitorPlans.uri}/workspace/locations/${payload["locationId"]}/methods/${payload["id"]}`;

  // *** remove attributes not needed by the API
  delete payload["locationId"];
  delete payload["id"];
  try {
    return handleResponse(
      await secureAxios({
        method: "PUT",
        url: url,
        data: payload,
      })
    );
  } catch (error) {
    handleError(error);
  }
};

export const saveMonitoringMats = async (payload) => {
  const url = `${config.services.monitorPlans.uri}/workspace/locations/${payload["locationId"]}/mats-methods/${payload["id"]}`;
  // *** remove attributes not needed by the API
  delete payload["locationId"];
  delete payload["id"];

  try {
    return handleResponse(
      await secureAxios({
        method: "PUT",
        url: url,
        data: payload,
      })
    );
  } catch (error) {
    handleError(error);
  }
};

export const deleteCheckInMonitoringPlanConfiguration = async (id) => {
  try {
    return (
      await secureAxios({
        method: "DELETE",
        url: `${config.services.monitorPlans.uri}/workspace/check-outs/plans/${id}`,
      })
    ).data;
  } catch (error) {
    handleError(error);
  }
};
// not secure
// *** obtain a list of all checked out locations (by all users)
export const getCheckedOutLocations = async () => {
  return axios
    .get(`${config.services.monitorPlans.uri}/workspace/check-outs/plans`)
    .then(handleResponse)
    .catch(handleError);
};

export const getRefreshInfo = async (planId) => {
  return axios
    .get(
      `${config.services.monitorPlans.uri}/workspace/plans/${planId}/refresh`
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
  try {
    return handleResponse(
      await secureAxios({
        method: "PUT",
        url: url,
        data: payload,
      })
    );
  } catch (error) {
    handleError(error);
  }
};
export const createAnalyzerRanges = async (payload) => {
  const url = `${config.services.monitorPlans.uri}/workspace/locations/${payload["locId"]}/components/${payload["compId"]}/analyzer-ranges/`;
  // *** remove attributes not needed by the API
  delete payload["locId"];
  delete payload["compId"];

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

export const saveSystemsFuelFlows = async (payload, locId, sysId) => {
  const url = `${config.services.monitorPlans.uri}/workspace/locations/${locId}/systems/${sysId}/fuel-flows/${payload["id"]}`;
  // *** remove attributes not needed by the API
  delete payload["id"];

  try {
    return handleResponse(
      await secureAxios({
        method: "PUT",
        url: url,
        data: payload,
      })
    );
  } catch (error) {
    handleError(error);
  }
};

export const createSystemsFuelFlows = async (payload, locId, sysId) => {
  const url = `${config.services.monitorPlans.uri}/workspace/locations/${locId}/systems/${sysId}/fuel-flows/`;
  // *** remove attributes not needed by the API
  delete payload["id"];

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

export const saveSystems = async (payload, locId, sysId) => {
  const url = `${config.services.monitorPlans.uri}/workspace/locations/${locId}/systems/${sysId}`;
  // *** remove attributes not needed by the API
  delete payload["id"];

  try {
    return handleResponse(
      await secureAxios({
        method: "PUT",
        url: url,
        data: payload,
      })
    );
  } catch (error) {
    handleError(error);
  }
};

export const createSystems = async (payload, locId, sysId) => {
  const url = `${config.services.monitorPlans.uri}/workspace/locations/${locId}/systems/`;
  // *** remove attributes not needed by the API
  delete payload["id"];

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

export const saveSystemsComponents = async (payload, locId, sysId, compId) => {
  const url = `${config.services.monitorPlans.uri}/workspace/locations/${locId}/systems/${sysId}/components/${compId}`;
  // *** remove attributes not needed by the API
  delete payload["id"];
  try {
    return handleResponse(
      await secureAxios({
        method: "PUT",
        url: url,
        data: payload,
      })
    );
  } catch (error) {
    handleError(error);
  }
};

export const createSystemsComponents = async (payload, locId, sysId) => {
  const url = `${config.services.monitorPlans.uri}/workspace/locations/${locId}/systems/${sysId}/components/`;
  // *** remove attributes not needed by the API
  delete payload["id"];

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

  try {
    return handleResponse(
      await secureAxios({
        method: "PUT",
        url: url,
        data: payload,
      })
    );
  } catch (error) {
    handleError(error);
  }
};

export const createMonitoringSpans = async (payload) => {
  const url = `${config.services.monitorPlans.uri}/workspace/locations/${payload["locationId"]}/spans/`;

  // *** remove attributes not needed by the API
  delete payload["id"];
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

export const saveMonitoringLoads = async (payload, locationId) => {
  const url = `${config.services.monitorPlans.uri}/workspace/locations/${locationId}/loads/${payload["id"]}`;
  // *** remove attributes not needed by the API
  try {
    return handleResponse(
      await secureAxios({
        method: "PUT",
        url: url,
        data: payload,
      })
    );
  } catch (error) {
    handleError(error);
  }
};

export const createMonitoringLoads = async (payload, locationId) => {
  const url = `${config.services.monitorPlans.uri}/workspace/locations/${locationId}/loads/`;

  // *** remove attributes not needed by the API
  delete payload["id"];
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
  try {
    return handleResponse(
      await secureAxios({
        method: "PUT",
        url: url,
        data: payload,
      })
    );
  } catch (error) {
    handleError(error);
  }
};

export const createMonitoringDefaults = async (payload, locID) => {
  const url = `${config.services.monitorPlans.uri}/workspace/locations/${locID}/defaults/`;

  // *** remove attributes not needed by the API
  delete payload["id"];
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
  try {
    return handleResponse(
      await secureAxios({
        method: "PUT",
        url: url,
        data: payload,
      })
    );
  } catch (error) {
    handleError(error);
  }
};

export const createMonitoringDuct = async (payload) => {
  const url = `${config.services.monitorPlans.uri}/workspace/locations/${payload["locationId"]}/duct-wafs/`;

  // *** remove attributes not needed by the API
  delete payload["id"];
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
  try {
    return handleResponse(
      await secureAxios({
        method: "PUT",
        url: url,
        data: payload,
      })
    );
  } catch (error) {
    handleError(error);
  }
};

export const createFuelData = async (payload) => {
  const url = `${config.services.monitorPlans.uri}/workspace/locations/${payload["locationId"]}/units/${payload["unitRecordId"]}/unit-fuels`;

  // *** remove attributes not needed by the API
  delete payload["id"];
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
  const url = `${config.services.monitorPlans.uri}/workspace/locations/${urlParameters["locId"]}/units/${urlParameters["unitRecordId"]}/unit-controls/${payload["id"]}`;
  // *** remove attributes not needed by the API
  try {
    return handleResponse(
      await secureAxios({
        method: "PUT",
        url: url,
        data: payload,
      })
    );
  } catch (error) {
    handleError(error);
  }
};

export const createUnitControl = async (payload, urlParameters) => {
  const url = `${config.services.monitorPlans.uri}/workspace/locations/${urlParameters["locId"]}/units/${urlParameters["unitRecordId"]}/unit-controls`;

  // *** remove attributes not needed by the API
  delete payload["id"];
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

export const saveMonitoringFormulas = async (payload, locID) => {
  const url = `${config.services.monitorPlans.uri}/workspace/locations/${locID}/formulas/${payload["id"]}`;
  // *** remove attributes not needed by the API
  try {
    return handleResponse(
      await secureAxios({
        method: "PUT",
        url: url,
        data: payload,
      })
    );
  } catch (error) {
    handleError(error);
  }
};

export const createMonitoringFormulas = async (payload, locID) => {
  const url = `${config.services.monitorPlans.uri}/workspace/locations/${locID}/formulas/`;

  // *** remove attributes not needed by the API
  delete payload["id"];
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
  try {
    return handleResponse(
      await secureAxios({
        method: "PUT",
        url: url,
        data: payload,
      })
    );
  } catch (error) {
    handleError(error);
  }
};

export const createUnitCapacity = async (payload, urlParameters) => {
  const url = `${config.services.monitorPlans.uri}/workspace/locations/${urlParameters["locId"]}/units/${urlParameters["unitRecordId"]}/unit-capacities/`;
  // *** remove attributes not needed by the API
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
  // ***  remove attributes not needed by the API
  try {
    return handleResponse(
      await secureAxios({
        method: "PUT",
        url: url,
        data: payload,
      })
    );
  } catch (error) {
    handleError(error);
  }
};

export const createPCTQualificationData = async (payload) => {
  const url = `${config.services.monitorPlans.uri}/workspace/locations/${payload["locationId"]}/qualifications/${payload["qualId"]}/pct-qualifications/`;

  // *** remove attributes not needed by the API
  delete payload["id"];
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
  try {
    return handleResponse(
      await secureAxios({
        method: "PUT",
        url: url,
        data: payload,
      })
    );
  } catch (error) {
    handleError(error);
  }
};

export const createQualificationData = async (payload) => {
  const url = `${config.services.monitorPlans.uri}/workspace/locations/${payload["locationId"]}/qualifications/`;

  // *** remove attributes not needed by the API
  delete payload["id"];
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
  try {
    return handleResponse(
      await secureAxios({
        method: "PUT",
        url: url,
        data: payload,
      })
    );
  } catch (error) {
    handleError(error);
  }
};

export const createLEEQualificationData = async (payload) => {
  const url = `${config.services.monitorPlans.uri}/workspace/locations/${payload["locationId"]}/qualifications/${payload["qualId"]}/lee-qualifications/`;

  // *** remove attributes not needed by the API
  delete payload["id"];
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
  try {
    return handleResponse(
      await secureAxios({
        method: "PUT",
        url: url,
        data: payload,
      })
    );
  } catch (error) {
    handleError(error);
  }
};

export const createLMEQualificationData = async (payload) => {
  const url = `${config.services.monitorPlans.uri}/workspace/locations/${payload["locationId"]}/qualifications/${payload["qualId"]}/lme-qualifications/`;

  // *** remove attributes not needed by the API
  delete payload["id"];
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

  // the non workspace api get endpoint is wrongly labeled in swagger, only the workspace is working but it is uneditable
  // *** workspace section url (authenticated)
  // if (window.location.href.indexOf("workspace") > -1) {
  url = `${url}/workspace`;
  // }

  url = `${url}/locations/${locationId}/relationships`;
  return axios.get(url).then(handleResponse).catch(handleError);
};

export const saveLocationAttribute = async (payload, locationId) => {
  const url = `${config.services.monitorPlans.uri}/workspace/locations/${locationId}/attributes/${payload["id"]}`;
  try {
    return handleResponse(
      await secureAxios({
        method: "PUT",
        url: url,
        data: payload,
      })
    );
  } catch (error) {
    handleError(error);
  }
};
export const createLocationAttribute = async (payload, locationSelectValue) => {
  const url = `${config.services.monitorPlans.uri}/workspace/locations/${locationSelectValue}/attributes/`;

  // *** remove attributes not needed by the API
  delete payload["id"];
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

export const getMonitoringPlansEvaluationReportData = async (monPlanId) => {
  let url = `${config.services.monitorPlans.uri}`;

  // *** workspace section url (authenticated)
  if (window.location.href.indexOf("workspace") > -1) {
    url = `${url}/workspace`;
  }
  url = `${url}/plans/${monPlanId}/evaluation-report`;

  return axios.get(url).then(handleResponse).catch(handleError);
};

export const getMonitoringPlanComments = async (monPlanId) => {
  let url = `${config.services.monitorPlans.uri}`;

  // *** workspace section url (authenticated)
  if (window.location.href.indexOf("workspace") > -1) {
    url = `${url}/workspace`;
  }
  url = `${url}/plans/${monPlanId}/comments`;

  return axios.get(url).then(handleResponse).catch(handleError);
};

export const importMP = async (payload) => {
  const url = `${config.services.monitorPlans.uri}/workspace/plans/import/`;
  try {
    return handleResponse(
      await secureAxios({
        method: "POST",
        url: url,
        data: payload,
      })
    );
  } catch (error) {
    return handleImportError(error);
  }
};

export const getMPSchema = async () => {
  const url = `${config.services.content.uri}/ecmps/reporting-instructions/monitor-plan.schema.json`;

  return axios.get(url).then(handleResponse).catch(handleError);
};
