import axios from "axios";
import { handleResponse, handleError, handleImportError } from "./apiUtils";
import config from "../../config";
import { secureAxios } from "./easeyAuthApi";
import { getFacilityById } from "./facilityApi";
import download from "downloadjs";

axios.defaults.headers.common = {
  "x-api-key": config.app.apiKey,
};

export const getApiUrl = (path, workspaceOnly = false) => {
  let url = config.services.monitorPlans.uri;

  if (workspaceOnly || window.location.href.includes("/workspace")) {
    url = `${url}/workspace`;
  }

  return `${url}${path}`;
};

export const getMonitoringPlanById = async (id) => {
  const url = getApiUrl(`/plans/export?planId=${id}`);
  return axios.get(url).then(handleResponse).catch(handleError);
};

// *** obtain monitoring plans
export const getMonitoringPlans = async (orisCodes, monPlanIds = []) => {
  let queryString;
  if (typeof orisCodes == "number") {
    queryString = "orisCodes=" + orisCodes;
  } else {
    queryString = `orisCodes=${orisCodes.join("|")}`;
  }

  if (monPlanIds.length > 0) {
    queryString = queryString + `&monPlanIds=${monPlanIds.join("|")}`;
  }

  const url = getApiUrl(`/configurations?${queryString}`);
  return axios.get(url).then(handleResponse).catch(handleError);
};

// *** obtain monitoring methods
export const getMonitoringMethods = async (locationId) => {
  const url = getApiUrl(`/locations/${locationId}/methods`);
  return axios.get(url).then(handleResponse).catch(handleError);
};

export const getMonitoringMatsMethods = async (locationId) => {
  const url = getApiUrl(`/locations/${locationId}/mats-methods`);
  return axios.get(url).then(handleResponse).catch(handleError);
};

export const getMonitoringSystems = async (locationId) => {
  const url = getApiUrl(`/locations/${locationId}/systems`);
  return axios.get(url).then(handleResponse).catch(handleError);
};

export const getMonitoringSystemsFuelFlows = async (locationId, systemId) => {
  const url = getApiUrl(
    `/locations/${locationId}/systems/${systemId}/fuel-flows`
  );
  return axios.get(url).then(handleResponse).catch(handleError);
};

export const getMonitoringSystemsComponents = async (locId, systemId) => {
  const url = getApiUrl(`/locations/${locId}/systems/${systemId}/components`);
  return axios.get(url).then(handleResponse).catch(handleError);
};

export const getMonitoringComponents = async (locId) => {
  const url = getApiUrl(`/locations/${locId}/components`);
  return axios.get(url).then(handleResponse).catch(handleError);
};

export const getMonitoringAnalyzerRanges = async (locId, componentRecordId) => {
  const url = getApiUrl(
    `/locations/${locId}​/components/${componentRecordId}/analyzer-ranges`
  );
  return axios.get(url).then(handleResponse).catch(handleError);
};

export const postCheckoutMonitoringPlanConfiguration = async (id) => {
  const url = getApiUrl(`/check-outs/plans/${id}`, true);
  try {
    return (
      await secureAxios({
        method: "POST",
        url: url,
      })
    ).data;
  } catch (error) {
    handleError(error);
  }
};

export const revertOfficialRecord = async (id) => {
  const url = getApiUrl(`/plans/${id}/revert`, true);
  try {
    return (
      await secureAxios({
        method: "DELETE",
        url: url,
      })
    ).data;
  } catch (error) {
    handleError(error);
  }
};

export const createMethods = async (payload) => {
  const url = getApiUrl(`/locations/${payload["locationId"]}/methods`);

  // *** remove attributes not needed by the API
  delete payload["locationId"];
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

export const createMats = async (payload) => {
  const url = getApiUrl(`/locations/${payload["locationId"]}/mats-methods`);

  // *** remove attributes not needed by the API
  delete payload["locationId"];
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

export const putLockTimerUpdateConfiguration = async (id) => {
  const url = getApiUrl(`/check-outs/plans/${id}`, true);
  try {
    return handleResponse(
      await secureAxios({
        method: "PUT",
        url: url,
      })
    );
  } catch (error) {
    handleError(error);
  }
};

export const saveMonitoringMethods = async (payload) => {
  const url = getApiUrl(
    `/locations/${payload["locationId"]}/methods/${payload["id"]}`
  );

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
  const url = getApiUrl(
    `/locations/${payload["locationId"]}/mats-methods/${payload["id"]}`
  );

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
  const url = getApiUrl(`/check-outs/plans/${id}`, true);
  try {
    return (
      await secureAxios({
        method: "DELETE",
        url: url,
      })
    ).data;
  } catch (error) {
    handleError(error);
  }
};

// *** obtain a list of all checked out locations (by all users)
export const getCheckedOutLocations = async () => {
  const url = getApiUrl(`/check-outs/plans`, true);
  return axios.get(url).then(handleResponse).catch(handleError);
};

export const getRefreshInfo = async (planId) => {
  const url = getApiUrl(`/plans/${planId}`, true);
  return axios.get(url).then(handleResponse).catch(handleError);
};

export const saveAnalyzerRanges = async (payload) => {
  const url = getApiUrl(
    `/locations/${payload["locId"]}/components/${payload["compId"]}/analyzer-ranges/${payload["id"]}`
  );

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
  const url = getApiUrl(
    `/locations/${payload["locId"]}/components/${payload["compId"]}/analyzer-ranges`
  );

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
  const url = getApiUrl(
    `/locations/${locId}/systems/${sysId}/fuel-flows/${payload["id"]}`
  );

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
  const url = getApiUrl(`/locations/${locId}/systems/${sysId}/fuel-flows`);

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
  const url = getApiUrl(`/locations/${locId}/systems/${sysId}`);

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
  const url = getApiUrl(`/locations/${locId}/systems`);

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
  const url = getApiUrl(
    `/locations/${locId}/systems/${sysId}/components/${compId}`
  );

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
  const url = getApiUrl(`/locations/${locId}/systems/${sysId}/components`);

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
  const url = getApiUrl(`/locations/${locationId}/spans`);
  return axios.get(url).then(handleResponse).catch(handleError);
};

export const saveMonitoringSpans = async (payload) => {
  const url = getApiUrl(
    `/locations/${payload["locationId"]}/spans/${payload["id"]}`
  );
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
  const url = getApiUrl(`/locations/${payload["locationId"]}/spans`);

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
  const url = getApiUrl(`/locations/${locationId}/loads/${payload["id"]}`);
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
  const url = getApiUrl(`/locations/${locationId}/loads`);

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
  const url = getApiUrl(`/locations/${locationId}/loads`);
  return axios.get(url).then(handleResponse).catch(handleError);
};

export const getMonitoringDefaults = async (locationId) => {
  const url = getApiUrl(`/locations/${locationId}/defaults`);
  return axios.get(url).then(handleResponse).catch(handleError);
};

export const saveMonitoringDefaults = async (payload, locID) => {
  const url = getApiUrl(`/locations/${locID}/defaults/${payload["id"]}`);
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
  const url = getApiUrl(`/locations/${locID}/defaults`);

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
  const url = getApiUrl(`/locations/${locationId}/formulas`);
  return axios.get(url).then(handleResponse).catch(handleError);
};

export const getMonitoringRectangularDucts = async (locationId) => {
  const url = getApiUrl(`/locations/${locationId}/duct-wafs`);
  return axios.get(url).then(handleResponse).catch(handleError);
};

export const saveMonitoringDuct = async (payload) => {
  const url = getApiUrl(
    `/locations/${payload["locationId"]}/duct-wafs/${payload["id"]}`
  );
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
  const url = getApiUrl(`/locations/${payload["locationId"]}/duct-wafs`);

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
  const url = getApiUrl(
    `/locations/${selectedLocation["id"]}/units/${selectedLocation["unitRecordId"]}/unit-fuels`
  );
  return axios.get(url).then(handleResponse).catch(handleError);
};

export const saveMonitoringPlansFuelData = async (payload) => {
  const url = getApiUrl(
    `/locations/${payload["locationId"]}/units/${payload["unitRecordId"]}/unit-fuels/${payload["id"]}`
  );
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
  const url = getApiUrl(
    `/locations/${payload["locationId"]}/units/${payload["unitRecordId"]}/unit-fuels`
  );

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
  const url = getApiUrl(
    `/locations/${selectedLocation["id"]}/units/${selectedLocation["unitRecordId"]}/unit-controls`
  );
  return axios.get(url).then(handleResponse).catch(handleError);
};

export const saveUnitControl = async (payload, urlParameters) => {
  const url = getApiUrl(
    `/locations/${urlParameters["locId"]}/units/${urlParameters["unitRecordId"]}/unit-controls/${payload["id"]}`
  );
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
  const url = getApiUrl(
    `/locations/${urlParameters["locId"]}/units/${urlParameters["unitRecordId"]}/unit-controls`
  );

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
  const url = getApiUrl(`/locations/${locID}/formulas/${payload["id"]}`);
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
  const url = getApiUrl(`/locations/${locID}/formulas`);

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
  const url = getApiUrl(
    `/locations/${selectedLocation["id"]}/units/${selectedLocation["unitRecordId"]}/unit-capacities`
  );
  return axios.get(url).then(handleResponse).catch(handleError);
};

export const saveUnitCapacity = async (payload, urlParameters) => {
  const url = getApiUrl(
    `/locations/${urlParameters["locId"]}/units/${urlParameters["unitRecordId"]}/unit-capacities/${payload["id"]}`
  );
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
  const url = getApiUrl(
    `/locations/${urlParameters["locId"]}/units/${urlParameters["unitRecordId"]}/unit-capacities`
  );
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
  const url = getApiUrl(
    `/locations/${locationId}/qualifications/${qualId}/pct-qualifications`
  );
  return axios.get(url).then(handleResponse).catch(handleError);
};

export const savePCTQualificationData = async (payload) => {
  const url = getApiUrl(
    `/locations/${payload["locationId"]}/qualifications/${payload["qualId"]}/pct-qualifications/${payload["id"]}`
  );
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
  const url = getApiUrl(
    `/locations/${payload["locationId"]}/qualifications/${payload["qualId"]}/pct-qualifications`
  );

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
  const url = getApiUrl(`/locations/${locationId}/qualifications`);
  return axios.get(url).then(handleResponse).catch(handleError);
};

export const saveQualificationData = async (payload) => {
  const url = getApiUrl(
    `/locations/${payload["locationId"]}/qualifications/${payload["id"]}`
  );
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
  const url = getApiUrl(`/locations/${payload["locationId"]}/qualifications`);

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
  const url = getApiUrl(
    `/locations/${locationId}/qualifications/${qualId}/lee-qualifications`
  );
  return axios.get(url).then(handleResponse).catch(handleError);
};

export const saveLEEQualificationData = async (payload) => {
  const url = getApiUrl(
    `/locations/${payload["locationId"]}/qualifications/${payload["qualId"]}/lee-qualifications/${payload["id"]}`
  );
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
  const url = getApiUrl(
    `/locations/${payload["locationId"]}/qualifications/${payload["qualId"]}/lee-qualifications`
  );

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
  const url = getApiUrl(
    `/locations/${locationId}/qualifications/${qualId}/lme-qualifications`
  );
  return axios.get(url).then(handleResponse).catch(handleError);
};

export const saveLMEQualificationData = async (payload) => {
  const url = getApiUrl(
    `/locations/${payload["locationId"]}/qualifications/${payload["qualId"]}/lme-qualifications/${payload["id"]}`
  );
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
  const url = getApiUrl(
    `/locations/${payload["locationId"]}/qualifications/${payload["qualId"]}/lme-qualifications`
  );

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
  const url = getApiUrl(`/locations/${locationId}/attributes`);
  return axios.get(url).then(handleResponse).catch(handleError);
};

export const getRelationshipData = async (locationId) => {
  // the non workspace api get endpoint is wrongly labeled in swagger, only the workspace is working but it is uneditable
  const url = getApiUrl(`/locations/${locationId}/relationships`, true);
  return axios.get(url).then(handleResponse).catch(handleError);
};

export const saveLocationAttribute = async (payload, locationId) => {
  const url = getApiUrl(`/locations/${locationId}/attributes/${payload["id"]}`);
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
  const url = getApiUrl(`/locations/${locationSelectValue}/attributes`);

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
  const url = getApiUrl(
    `/reports?reportCode=MP_EVAL&monitorPlanId${monPlanId}`
  );
  return axios.get(url).then(handleResponse).catch(handleError);
};

export const getMonitoringPlanComments = async (monPlanId) => {
  const url = getApiUrl(`/plans/${monPlanId}/comments`);
  return axios.get(url).then(handleResponse).catch(handleError);
};

export const importMP = async (payload) => {
  const url = getApiUrl(`/plans/import`);
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

export const exportMonitoringPlanDownload = async (configID) => {
  try {
    const mpRes = await getMonitoringPlanById(configID);
    const facId = mpRes.data["facId"];
    const mpName = mpRes.data["name"];
    const date = new Date();
    const year = date.getUTCFullYear();
    const month = date.getUTCMonth() + 1;
    const day = date.getUTCDate();
    const fullDateString = `${month}-${day}-${year}`;
    const facRes = await getFacilityById(facId);
    const facName = facRes.data["facilityName"];
    const exportFileName = `MP Export - ${facName}, ${mpName} (${fullDateString}).json`;
    download(JSON.stringify(mpRes.data, null, "\t"), exportFileName);
  } catch (error) {
    console.log(error);
  }
};
