import { handleResponse, handleError, handleImportError } from "./apiUtils";
import config from "../../config";
import { secureAxios } from "./easeyAuthApi";
import { getFacilityById } from "./facilityApi";
import download from "downloadjs";
import axios from "axios";

export const getApiUrl = (path, workspaceOnly = false) => {
  let url = config.services.monitorPlans.uri;

  if (workspaceOnly === true || window.location.href.includes("/workspace")) {
    url = `${url}/workspace`;
  }

  return `${url}${path}`;
};

export const getMonitoringPlanById = async (id) => {
  const url = getApiUrl(`/plans/export?planId=${id}&reportedValuesOnly=true`);

  return secureAxios({
    method: "GET",
    url: url,
  })
    .then(handleResponse)
    .catch(handleError);
};

// *** obtain monitoring plans
export const getMonitoringPlans = async (
  orisCodes,
  monPlanIds = [],
  forWorkspace = false,
  submissionPeriods = [] //Added for polymorphism across data fetch calls
) => {
  let queryString = "";

  if (typeof orisCodes === "number") {
    queryString = "orisCodes=" + orisCodes;
  } else if (Array.isArray(orisCodes) && orisCodes.length > 0) {
    queryString = `orisCodes=${orisCodes.join("|")}`;
  }

  if (typeof monPlanIds === "string") {
    queryString = queryString + `&monPlanIds=${monPlanIds}`;
  } else if (Array.isArray(monPlanIds) && monPlanIds.length > 0) {
    queryString = queryString + `&monPlanIds=${monPlanIds.join("|")}`;
  }

  const url = getApiUrl(`/configurations?${queryString}`, forWorkspace);
  return secureAxios({
    method: "GET",
    url: url,
  })
    .then(handleResponse)
    .catch(handleError);
};

// *** obtain monitoring methods
export const getMonitoringMethods = async (locationId) => {
  const url = getApiUrl(`/locations/${locationId}/methods`);
  return secureAxios({
    method: "GET",
    url: url,
  })
    .then(handleResponse)
    .catch(handleError);
};

export const getMonitoringMatsMethods = async (locationId) => {
  const url = getApiUrl(`/locations/${locationId}/mats-methods`);
  return secureAxios({
    method: "GET",
    url: url,
  })
    .then(handleResponse)
    .catch(handleError);
};

export const getMonitoringSystems = async (locationId) => {
  const url = getApiUrl(`/locations/${locationId}/systems`);
  return secureAxios({
    method: "GET",
    url: url,
  })
    .then(handleResponse)
    .catch(handleError);
};

export const getMonitoringSystemsFuelFlows = async (locationId, systemId) => {
  const url = getApiUrl(
    `/locations/${locationId}/systems/${systemId}/fuel-flows`
  );
  return secureAxios({
    method: "GET",
    url: url,
  })
    .then(handleResponse)
    .catch(handleError);
};

export const getMonitoringSystemsComponents = async (locId, systemId) => {
  const url = getApiUrl(`/locations/${locId}/systems/${systemId}/components`);
  return secureAxios({
    method: "GET",
    url: url,
  })
    .then(handleResponse)
    .catch(handleError);
};

export const getMonitoringComponents = async (locId) => {
  const url = getApiUrl(`/locations/${locId}/components`);
  return secureAxios({
    method: "GET",
    url: url,
  })
    .then(handleResponse)
    .catch(handleError);
};

export const getMonitoringAnalyzerRanges = async (locId, componentRecordId) => {
  const url = getApiUrl(
    `/locations/${locId}/components/${componentRecordId}/analyzer-ranges`
  );
  return secureAxios({
    method: "GET",
    url: url,
  })
    .then(handleResponse)
    .catch(handleError);
};

export const postCheckoutMonitoringPlanConfiguration = async (
  id,
  shouldHandleError = true
) => {
  const url = getApiUrl(`/check-outs/plans/${id}`, true);
  try {
    return (
      await secureAxios({
        method: "POST",
        url: url,
      })
    ).data;
  } catch (error) {
    if (!shouldHandleError) throw error;
    return handleError(error);
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
    return handleError(error);
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
    return handleImportError(error);
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
    return handleImportError(error);
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
    return handleError(error);
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
    return handleImportError(error);
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
    return handleImportError(error);
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
    return handleError(error);
  }
};

// *** obtain a list of all checked out locations (by all users)
export const getCheckedOutLocations = async () => {
  // NOTE:XXX: Why do we need the current user to find all facilities?
  if (!localStorage.getItem("ecmps_user")) {
    return { data: [] };
  }
  const url = getApiUrl(`/check-outs/plans`, true);

  return secureAxios({
    method: "GET",
    url: url,
  })
    .then((res) => {
      return handleResponse(res);
    })
    .catch(handleError);
};

export const getRefreshInfo = async (planId) => {
  const url = getApiUrl(`/plans/${planId}`);
  return secureAxios({
    method: "GET",
    url: url,
  })
    .then(handleResponse)
    .catch(handleError);
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
    return handleImportError(error);
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
    return handleImportError(error);
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
    return handleImportError(error);
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
    return handleImportError(error);
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
    return handleImportError(error);
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
    return handleImportError(error);
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
    return handleImportError(error);
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
    return handleImportError(error);
  }
};

export const createComponents = async (payload, locId) => {
  const url = getApiUrl(`/locations/${locId}/components`);

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

export const getMonitoringSpans = async (locationId) => {
  const url = getApiUrl(`/locations/${locationId}/spans`);
  return secureAxios({
    method: "GET",
    url: url,
  })
    .then(handleResponse)
    .catch(handleError);
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
    return handleImportError(error);
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
    return handleImportError(error);
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
    return handleImportError(error);
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
    return handleImportError(error);
  }
};

export const getMonitoringLoads = async (locationId) => {
  const url = getApiUrl(`/locations/${locationId}/loads`);
  return secureAxios({
    method: "GET",
    url: url,
  })
    .then(handleResponse)
    .catch(handleError);
};

export const getMonitoringDefaults = async (locationId) => {
  const url = getApiUrl(`/locations/${locationId}/defaults`);
  return secureAxios({
    method: "GET",
    url: url,
  })
    .then(handleResponse)
    .catch(handleError);
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
    return handleImportError(error);
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
    return handleImportError(error);
  }
};

export const getMonitoringFormulas = async (locationId) => {
  const url = getApiUrl(`/locations/${locationId}/formulas`);
  return secureAxios({
    method: "GET",
    url: url,
  })
    .then(handleResponse)
    .catch(handleError);
};

export const getMonitoringRectangularDucts = async (locationId) => {
  const url = getApiUrl(`/locations/${locationId}/duct-wafs`);
  return secureAxios({
    method: "GET",
    url: url,
  })
    .then(handleResponse)
    .catch(handleError);
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
    return handleImportError(error);
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
    return handleImportError(error);
  }
};

export const getMonitoringPlansFuelDataRecords = async (selectedLocation) => {
  const url = getApiUrl(
    `/locations/${selectedLocation["id"]}/units/${selectedLocation["unitRecordId"]}/unit-fuels`
  );
  return secureAxios({
    method: "GET",
    url: url,
  })
    .then(handleResponse)
    .catch(handleError);
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
    return handleImportError(error);
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
    return handleImportError(error);
  }
};

export const getMonitoringPlansUnitControlRecords = async (
  selectedLocation
) => {
  const url = getApiUrl(
    `/locations/${selectedLocation["id"]}/units/${selectedLocation["unitRecordId"]}/unit-controls`
  );
  return secureAxios({
    method: "GET",
    url: url,
  })
    .then(handleResponse)
    .catch(handleError);
};

export const saveUnitControl = async (payload, urlParameters) => {
  // These two radio fields must be converted to
  // STRING values of "1" (Yes) or "0" (No)
  payload.originalCode = payload.originalCode?.toString();
  payload.seasonalControlsIndicator =
    payload.seasonalControlsIndicator?.toString();

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
    return handleImportError(error);
  }
};

export const createUnitControl = async (payload, urlParameters) => {
  const url = getApiUrl(
    `/locations/${urlParameters["locId"]}/units/${urlParameters["unitRecordId"]}/unit-controls`
  );

  // *** remove attributes not needed by the API
  delete payload["id"];

  // These two radio fields must be converted to
  // STRING values of "1" (Yes) or "0" (No)
  payload.originalCode = payload.originalCode?.toString();
  payload.seasonalControlsIndicator =
    payload.seasonalControlsIndicator?.toString();

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
    return handleImportError(error);
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
    return handleImportError(error);
  }
};

export const getUnitCapacity = async (selectedLocation) => {
  const url = getApiUrl(
    `/locations/${selectedLocation["id"]}/units/${selectedLocation["unitRecordId"]}/unit-capacities`
  );
  return secureAxios({
    method: "GET",
    url: url,
  })
    .then(handleResponse)
    .catch(handleError);
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
    return handleImportError(error);
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
    return handleImportError(error);
  }
};

export const getMonitoringPlansUnit = async (selectedLocation) => {
  const url = getApiUrl(
    `/locations/${selectedLocation["id"]}/units/${selectedLocation["unitRecordId"]}`
  );
  return secureAxios({
    method: "GET",
    url: url,
  })
    .then(handleResponse)
    .catch(handleError);
};

export const saveMonitoringPlansUnit = async (payload, urlParameters) => {
  const url = getApiUrl(
    `/locations/${urlParameters["locId"]}/units/${urlParameters["unitRecordId"]}`
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
    return handleImportError(error);
  }
};

export const getUnitProgram = async (selectedLocation) => {
  const url = getApiUrl(
    `/locations/${selectedLocation["id"]}/units/${selectedLocation["unitRecordId"]}/unit-programs`
  );
  return secureAxios({
    method: "GET",
    url: url,
  })
    .then(handleResponse)
    .catch(handleError);
};

export const getReportingFrequency = async (selectedLocation) => {
  const url = getApiUrl(
    `/locations/${selectedLocation["id"]}/units/${selectedLocation["unitRecordId"]}/reporting-frequencies`
  );
  return secureAxios({
    method: "GET",
    url: url,
  })
    .then(handleResponse)
    .catch(handleError);
};

export const getPCTQualifications = async (locationId, qualId) => {
  const url = getApiUrl(
    `/locations/${locationId}/qualifications/${qualId}/pct-qualifications`
  );
  return secureAxios({
    method: "GET",
    url: url,
  })
    .then(handleResponse)
    .catch(handleError);
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
    return handleImportError(error);
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
    return handleImportError(error);
  }
};

export const getQualifications = async (locationId) => {
  const url = getApiUrl(`/locations/${locationId}/qualifications`);
  return secureAxios({
    method: "GET",
    url: url,
  })
    .then(handleResponse)
    .catch(handleError);
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
    return handleImportError(error);
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
    return handleImportError(error);
  }
};

export const getLEEQualifications = async (locationId, qualId) => {
  const url = getApiUrl(
    `/locations/${locationId}/qualifications/${qualId}/lee-qualifications`
  );
  return secureAxios({
    method: "GET",
    url: url,
  })
    .then(handleResponse)
    .catch(handleError);
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
    return handleImportError(error);
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
    return handleImportError(error);
  }
};

export const getLMEQualifications = async (locationId, qualId) => {
  const url = getApiUrl(
    `/locations/${locationId}/qualifications/${qualId}/lme-qualifications`
  );
  return secureAxios({
    method: "GET",
    url: url,
  })
    .then(handleResponse)
    .catch(handleError);
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
    return handleImportError(error);
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
    return handleImportError(error);
  }
};

export const getLocationAttributes = async (locationId) => {
  const url = getApiUrl(`/locations/${locationId}/attributes`);
  return secureAxios({
    method: "GET",
    url: url,
  })
    .then(handleResponse)
    .catch(handleError);
};

export const getRelationshipData = async (locationId) => {
  const url = getApiUrl(`/locations/${locationId}/relationships`);
  return secureAxios({
    method: "GET",
    url: url,
  })
    .then(handleResponse)
    .catch(handleError);
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
    return handleImportError(error);
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
    return handleImportError(error);
  }
};

export const getMonitoringPlansEvaluationReportData = async (
  facilityId,
  monPlanId
) => {
  const url = getApiUrl(
    `/reports?reportCode=MP_EVAL&facilityId=${facilityId}&monitorPlanId${monPlanId}`
  );
  return secureAxios({
    method: "GET",
    url: url,
  })
    .then(handleResponse)
    .catch(handleError);
};

export const getMonitoringPlanComments = async (monPlanId) => {
  const url = getApiUrl(`/plans/${monPlanId}/comments`);
  return secureAxios({
    method: "GET",
    url: url,
  })
    .then(handleResponse)
    .catch(handleError);
};

export const importMP = async (payload, draft) => {
  let url = getApiUrl(`/plans/import`);
  if (draft) {
    url = url + "?draft=true";
  }
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

export const createSingleUnitMP = async (payload, draft) => {
  let url = getApiUrl(`/plans/single-unit`);
  if (draft) {
    url = url + "?draft=true";
  }
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

export const importStackPipe = async (payload, draft) => {
  let url = getApiUrl(`/stack-pipes/import`, true);
  if (draft) {
    url = url + "?draft=true";
  }
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
  return axios({
    method: "GET",
    url: url,
  })
    .then(handleResponse)
    .catch(handleError);
};

export const exportMonitoringPlanDownload = async (configID) => {
  try {
    const mpRes = await getMonitoringPlanById(configID);
    const orisCode = mpRes.data["orisCode"];
    const mpName = mpRes.data["name"];
    const date = new Date();
    const year = date.getUTCFullYear();
    const month = date.getUTCMonth() + 1;
    const day = date.getUTCDate();
    const fullDateString = `${month}-${day}-${year}`;
    const facRes = await getFacilityById(orisCode);
    const facName = facRes.data["facilityName"];
    const exportFileName = `MP Export - ${facName}, ${mpName} (${fullDateString}).json`;
    download(JSON.stringify(mpRes.data, null, "\t"), exportFileName);
  } catch (error) {
    console.log(error);
  }
};
