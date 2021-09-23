import axios from "axios";
import { handleResponse, handleError } from "./apiUtils";
import config from "../../config";

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
    .get(`${config.services.mdm.uri}/max-rate-source-code`)
    .then(handleResponse)
    .catch(handleError);
};

export const getAllUnitsOfMeasureCodes = async () => {
  return axios
    .get(`${config.services.mdm.uri}/units-of-measure`)
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
