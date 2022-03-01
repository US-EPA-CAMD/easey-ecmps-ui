import * as mpApi from "../api/monitoringPlansApi";

// Selectors that normalize api data to fit the columns in UI datatable
import * as loadSelector from "./monitoringPlanLoads";
import * as wafSelector from "./monitoringPlanRectangularDucts";
import * as spanSelector from "./monitoringPlanSpans";
import * as formulaSelector from "./monitoringPlanFormulas";
import * as defaultSelector from "./monitoringPlanDefaults";
import * as unitFuelSelector from "./monitoringPlanFuelData";
import * as unitControlSelector from "./monitoringPlanUnitControls";
import * as unitCapacitySelector from "./monitoringPlanUnitCapacity";
import * as locationRelationshipsSelector from "./monitoringPlanLocationAttributes";

// Table Names
const load = "Load";
const span = "Span";
const def = "Default";
const form = "Formula";
const rectDuctWaf = "Rectangular Duct WAF";
const unitCon = "Unit Control";
const unitCap = "Unit Capacity";
const unitFuel = "Unit Fuel";
const locationAttribute = "Location Attribute";
const relationshipData = "Relationship Data";
// Getting records from API
export const getDataTableApis = async (name, location, selectedLocation) => {
  console.log('NAME',name)
  switch (name) {
    case load:
      return mpApi.getMonitoringLoads(location);
    case rectDuctWaf:
      return mpApi.getMonitoringRectangularDucts(location);
    case span:
      return mpApi.getMonitoringSpans(location);
    case form:
      return mpApi.getMonitoringFormulas(location);
    case def:
      return mpApi.getMonitoringDefaults(location);
    case unitFuel:
      return mpApi.getMonitoringPlansFuelDataRecords(
        selectedLocation ? selectedLocation : location
      );
    case unitCon:
      return mpApi.getMonitoringPlansUnitControlRecords(
        selectedLocation ? selectedLocation : location
      );
    case unitCap:
      return mpApi.getUnitCapacity(
        selectedLocation ? selectedLocation : location
      );

    case locationAttribute:
      return mpApi.getLocationAttributes(location);
      // error is here
    // case relationshipData:
    //   console.log('testing relationship')
    //   return mpApi.getRelationshipData(location);

    default:
      break;
  }
  return { data: [] };
};

// Selectors
export const getDataTableRecords = (dataIn, name) => {
  switch (name) {
    case load:
      return loadSelector.getMonitoringPlansLoadsTableRecords(dataIn);
    case rectDuctWaf:
      return wafSelector.getMonitoringPlansRectangularDuctsTableRecords(dataIn);
    case span:
      return spanSelector.getMonitoringPlansSpansTableRecords(dataIn);
    case form:
      return formulaSelector.getMonitoringPlansFormulasTableRecords(dataIn);
    case def:
      return defaultSelector.getMonitoringPlansDefaultsTableRecords(dataIn);
    case unitFuel:
      return unitFuelSelector.getMonitoringPlansFuelDataRecords(dataIn);
    case unitCon:
      return unitControlSelector.getMonitoringPlansUnitControlRecords(dataIn);
    case unitCap:
      return unitCapacitySelector.getMonitoringPlansUnitCapacityRecords(dataIn);

    case locationAttribute:
      return locationRelationshipsSelector.getMonitoringPlansLocationAttributeRecords(
        dataIn
      );

    case relationshipData:
      return locationRelationshipsSelector.getMonitoringPlansRelationshipsDataRecords(
        dataIn
      );
    default:
      break;
  }
  return [];
};
// Save (PUT) endpoints for API
export const saveDataSwitch = (
  userInput,
  dataTableName,
  locationSelectValue,
  urlParameters = null
) => {
  switch (dataTableName) {
    case load:
      return mpApi.saveMonitoringLoads(userInput, locationSelectValue);
    case rectDuctWaf:
      return mpApi.saveMonitoringDuct(userInput);
    case span:
      return mpApi.saveMonitoringSpans(userInput);
    case form:
      return mpApi.saveMonitoringFormulas(userInput, locationSelectValue);
    case def:
      return mpApi.saveMonitoringDefaults(userInput, locationSelectValue);
    case unitFuel:
      return mpApi.saveMonitoringPlansFuelData(userInput);
    case unitCon:
      return mpApi.saveUnitControl(
        userInput,
        urlParameters ? urlParameters : null
      );
    case unitCap:
      return mpApi.saveUnitCapacity(
        userInput,
        urlParameters ? urlParameters : null
      );

    case locationAttribute:
      return mpApi.saveLocationAttribute(userInput, locationSelectValue);
    default:
      break;
  }
  return [];
};

// Create (POST) endpoints for API
export const createDataSwitch = (
  userInput,
  dataTableName,
  locationSelectValue,
  urlParameters = null
) => {
  switch (dataTableName) {
    case load:
      return mpApi.createMonitoringLoads(userInput, locationSelectValue);
    case rectDuctWaf:
      return mpApi.createMonitoringDuct(userInput);
    case span:
      return mpApi.createMonitoringSpans(userInput);
    case form:
      return mpApi.createMonitoringFormulas(userInput, locationSelectValue);
    case def:
      return mpApi.createMonitoringDefaults(userInput, locationSelectValue);
    case unitFuel:
      return mpApi.createFuelData(userInput, locationSelectValue);
    case unitCon:
      return mpApi.createUnitControl(
        userInput,
        urlParameters ? urlParameters : null
      );
    case unitCap:
      return mpApi.createUnitCapacity(
        userInput,
        urlParameters ? urlParameters : null
      );
    case locationAttribute:
      return mpApi.createLocationAttribute(userInput, locationSelectValue);
    default:
      break;
  }
  return [];
};
