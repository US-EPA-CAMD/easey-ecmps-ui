import axios from "axios";
import { handleResponse, handleError } from "./apiUtils";
import config from "../../config";

axios.defaults.headers.common = {
  "x-api-key": config.app.apiKey,
};

export const getAllControlTechnologies = async () => {
  return axios
    .get(`${config.services.mdm.uri}/control-technologies`)
    .then(handleResponse)
    .catch(handleError);
};

export const getAllFuelTypes = async () => {
  return axios
    .get(`${config.services.mdm.uri}/fuel-types`)
    .then(handleResponse)
    .catch(handleError);
};

export const getAllUnitTypes = async () => {
  return axios
    .get(`${config.services.mdm.uri}/unit-types`)
    .then(handleResponse)
    .catch(handleError);
};

export const getAllPrograms = async () => {
  return axios
    .get(`${config.services.mdm.uri}/programs`)
    .then(handleResponse)
    .catch(handleError);
};

export const getAllAccountTypes = async () => {
  return axios
    .get(`${config.services.mdm.uri}/account-types`)
    .then(handleResponse)
    .catch(handleError);
};

export const getAllStates = async () => {
  return axios
    .get(`${config.services.mdm.uri}/states`)
    .then(handleResponse)
    .catch(handleError);
};

export const getAllBypassApproachCodes = async () => {
  return axios
    .get(`${config.services.mdm.uri}/bypass-approach-codes`)
    .then(handleResponse)
    .catch(handleError);
};

export const getAllSubstituteDataCodes = async () => {
  return axios
    .get(`${config.services.mdm.uri}/sub-data-codes`)
    .then(handleResponse)
    .catch(handleError);
};

export const getAllParameterCodes = async () => {
  return axios
    .get(`${config.services.mdm.uri}/parameter-codes`)
    .then(handleResponse)
    .catch(handleError);
};

export const getAllMethodCodes = async () => {
  return axios
    .get(`${config.services.mdm.uri}/method-codes`)
    .then(handleResponse)
    .catch(handleError);
};

export const getAllMatsParameterCodes = async () => {
  return axios
    .get(`${config.services.mdm.uri}/mats-method-parameter-codes`)
    .then(handleResponse)
    .catch(handleError);
};

export const getAllMatsMethodCodes = async () => {
  return axios
    .get(`${config.services.mdm.uri}/mats-method-codes`)
    .then(handleResponse)
    .catch(handleError);
};

// System Fuel Flows
export const getAllMaxRateSourceCodes = async () => {
  return axios
    .get(`${config.services.mdm.uri}/max-rate-source-codes`)
    .then(handleResponse)
    .catch(handleError);
};

export const getAllUnitsOfMeasureCodes = async () => {
  return axios
    .get(`${config.services.mdm.uri}/units-of-measure-codes`)
    .then(handleResponse)
    .catch(handleError);
};
//

// System Analyzer Ranges
export const getAllRangeCodes = async () => {
  return axios
    .get(`${config.services.mdm.uri}/analyzer-range-codes`)
    .then(handleResponse)
    .catch(handleError);
};

//

// System
export const getAllSystemTypeCodes = async () => {
  return axios
    .get(`${config.services.mdm.uri}/system-type-codes`)
    .then(handleResponse)
    .catch(handleError);
};

export const getAllSystemDesignationCodes = async () => {
  return axios
    .get(`${config.services.mdm.uri}/system-designation-codes`)
    .then(handleResponse)
    .catch(handleError);
};

// system components
export const getAllAcquisitionMethodCodes = async () => {
  return axios
    .get(`${config.services.mdm.uri}/acquisiton-method-codes`)
    .then(handleResponse)
    .catch(handleError);
};

export const getAllComponentTypeCodes = async () => {
  return axios
    .get(`${config.services.mdm.uri}/component-type-codes`)
    .then(handleResponse)
    .catch(handleError);
};

export const getAllBasisCodes = async () => {
  return axios
    .get(`${config.services.mdm.uri}/basis-codes`)
    .then(handleResponse)
    .catch(handleError);
};

// Spans

export const getAllSpanMethodCodes = async () => {
  return axios
    .get(`${config.services.mdm.uri}/span-method-codes`)
    .then(handleResponse)
    .catch(handleError);
};

export const getAllSpanScaleCodes = async () => {
  return axios
    .get(`${config.services.mdm.uri}/span-scale-codes`)
    .then(handleResponse)
    .catch(handleError);
};

export const getAllOperatingLevelCodes = async () => {
  return axios
    .get(`${config.services.mdm.uri}/operating-level-codes`)
    .then(handleResponse)
    .catch(handleError);
};
// defaults

export const getAllOperatingConditionCodes = async () => {
  return axios
    .get(`${config.services.mdm.uri}/operating-condition-codes`)
    .then(handleResponse)
    .catch(handleError);
};

export const getAllDefaultSourceCodes = async () => {
  return axios
    .get(`${config.services.mdm.uri}/default-source-codes`)
    .then(handleResponse)
    .catch(handleError);
};

export const getAllDefaultPurposeCodes = async () => {
  return axios
    .get(`${config.services.mdm.uri}/default-purpose-codes`)
    .then(handleResponse)
    .catch(handleError);
};

export const getAllFuelCodes = async () => {
  return axios
    .get(`${config.services.mdm.uri}/fuel-codes`)
    .then(handleResponse)
    .catch(handleError);
};

export const getAllFuelIndicatorCodes = async () => {
  return axios
    .get(`${config.services.mdm.uri}/fuel-indicator-codes`)
    .then(handleResponse)
    .catch(handleError);
};

export const getAllDemonstrationMethodCodes = async () => {
  return axios
    .get(`${config.services.mdm.uri}/dem-method-codes`)
    .then(handleResponse)
    .catch(handleError);
};

export const getAllFormulaCodes = async () => {
  return axios
    .get(`${config.services.mdm.uri}/equation-codes`)
    .then(handleResponse)
    .catch(handleError);
};

export const getAllRectangularDuctsCodes = async () => {
  return axios
    .get(`${config.services.mdm.uri}/waf-method-codes`)
    .then(handleResponse)
    .catch(handleError);
};

export const getAllControlEquipmentParameterCodes = async () => {
  return axios
    .get(`${config.services.mdm.uri}/control-equip-param-codes`)
    .then(handleResponse)
    .catch(handleError);
};

export const getAllQualificationTypeCodes = async () => {
  return axios
    .get(`${config.services.mdm.uri}/qual-type-codes`)
    .then(handleResponse)
    .catch(handleError);
};

export const getAllQualificationDataTypeCodes = async () => {
  return axios
    .get(`${config.services.mdm.uri}/qual-data-type-codes`)
    .then(handleResponse)
    .catch(handleError);
};
export const getAllQualificationLEETestTypeCodes = async () => {
  return axios
    .get(`${config.services.mdm.uri}/qual-lee-test-type-codes`)
    .then(handleResponse)
    .catch(handleError);
};

export const getAllMaterialCodes = async () => {
  return axios
    .get(`${config.services.mdm.uri}/material-codes`)
    .then(handleResponse)
    .catch(handleError);
};

export const getAllShapeCodes = async () => {
  return axios
    .get(`${config.services.mdm.uri}/shape-codes`)
    .then(handleResponse)
    .catch(handleError);
};

export const getPrefilteredFormulas = async () => {
  return axios
    .get(`${config.services.mdm.uri}/relationships/formulas`)
    .then(handleResponse)
    .catch(handleError);
};

export const getPrefilteredMethods = async () => {
  return axios
    .get(`${config.services.mdm.uri}/relationships/methods`)
    .then(handleResponse)
    .catch(handleError);
};

export const getPrefilteredMatsMethods = async () => {
  return axios
    .get(`${config.services.mdm.uri}/relationships/mats-methods`)
    .then(handleResponse)
    .catch(handleError);
};

export const getPrefilteredSpans = async () => {
  return axios
    .get(`${config.services.mdm.uri}/relationships/spans`)
    .then(handleResponse)
    .catch(handleError);
};

export const getPrefilteredDefaults = async () => {
  return axios
    .get(`${config.services.mdm.uri}/relationships/defaults`)
    .then(handleResponse)
    .catch(handleError);
};

export const getPrefilteredLoads = async () => {
  return axios
    .get(`${config.services.mdm.uri}/relationships/loads`)
    .then(handleResponse)
    .catch(handleError);
};

export const prefilteredLEEQualifications = async () => {
  return axios
    .get(`${config.services.mdm.uri}/relationships/lee-qualifications`)
    .then(handleResponse)
    .catch(handleError);
};

export const getPrefilteredUnitFuels = async () => {
  return axios
    .get(`${config.services.mdm.uri}/relationships/unit-fuels`)
    .then(handleResponse)
    .catch(handleError);
};

export const getPrefilteredUnitControls = async () => {
  return axios
    .get(`${config.services.mdm.uri}/relationships/unit-controls`)
    .then(handleResponse)
    .catch(handleError);
};

export const getPrefilteredSystemFuelFlows = async () => {
  return axios
    .get(`${config.services.mdm.uri}/relationships/system-fuels`)
    .then(handleResponse)
    .catch(handleError);
};
export const getPrefilteredSystemComponents = async () => {
  return axios
    .get(`${config.services.mdm.uri}/relationships/system-components`)
    .then(handleResponse)
    .catch(handleError);
};

// * QA & CERT

export const getAllTestTypeCodes = async () => {
  return axios
    .get(`${config.services.mdm.uri}/test-type-codes`)
    .then(handleResponse)
    .catch(handleError);
};

export const getAllTestResultCodes = async () => {
  return axios
    .get(`${config.services.mdm.uri}/test-result-codes`)
    .then(handleResponse)
    .catch(handleError);
};

export const getAllTestReasonCodes = async () => {
  return axios
    .get(`${config.services.mdm.uri}/test-reason-codes`)
    .then(handleResponse)
    .catch(handleError);
};
export const getAllGasLevelCodes = async () => {
  return axios
    .get(`${config.services.mdm.uri}/gas-level-codes`)
    .then(handleResponse)
    .catch(handleError);
};

export const getAllGasTypeCodes = async () => {
  return axios
    .get(`${config.services.mdm.uri}/gas-type-codes`)
    .then(handleResponse)
    .catch(handleError);
};

export const getAllTestTypeGroupCodes = async () => {
  return axios
    .get(`${config.services.mdm.uri}/test-type-group-codes`)
    .then(handleResponse)
    .catch(handleError);
};
export const getPrefilteredTestSummaries = async () => {
  return axios
    .get(`${config.services.mdm.uri}/relationships/test-summaries`)
    .then(handleResponse)
    .catch(handleError);
};

export const getAllRataFreqCodes = async () => {
  return axios
    .get(`${config.services.mdm.uri}/rata-frequency-codes`)
    .then(handleResponse)
    .catch(handleError);
};

export const getAllApsCodes = async () => {
  return axios
    .get(`${config.services.mdm.uri}/aps-codes`)
    .then(handleResponse)
    .catch(handleError);
};

export const getAllReferenceMethodCodes = async () => {
  return axios
    .get(`${config.services.mdm.uri}/reference-method-codes`)
    .then(handleResponse)
    .catch(handleError);
};

export const getAllRunStatusCodes = async () => {
  return axios
    .get(`${config.services.mdm.uri}/run-status-codes`)
    .then(handleResponse)
    .catch(handleError);
};
