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
  switch (name) {
    case load:
      return mpApi.getMonitoringLoads(location)
        .catch(error => console.log('getMonitoringLoads failed', error));
    case rectDuctWaf:
      return mpApi.getMonitoringRectangularDucts(location)
        .catch(error => console.log('getMonitoringRectangularDucts failed', error));
    case span:
      return mpApi.getMonitoringSpans(location)
        .catch(error => console.log('getMonitoringSpans failed', error));
    case form:
      return mpApi.getMonitoringFormulas(location)
        .catch(error => console.log('getMonitoringFormulas failed', error));
    case def:
      return mpApi.getMonitoringDefaults(location)
        .catch(error => console.log('getMonitoringDefaults failed', error));
    case unitFuel:
      return mpApi.getMonitoringPlansFuelDataRecords(
        selectedLocation ? selectedLocation : location
      )
        .catch(error => console.log('getMonitoringPlansFuelDataRecords failed', error));
    case unitCon:
      return mpApi.getMonitoringPlansUnitControlRecords(
        selectedLocation ? selectedLocation : location
      )
        .catch(error => console.log('getMonitoringPlansUnitControlRecords failed', error));
    case unitCap:
      return mpApi.getUnitCapacity(
        selectedLocation ? selectedLocation : location
      )
        .catch(error => console.log('getUnitCapacity failed', error));

    case locationAttribute:
      return mpApi.getLocationAttributes(location)
        .catch(error => console.log('getLocationAttributes failed', error));
    case relationshipData:
      return mpApi.getRelationshipData(location)
        .catch(error => console.log('getRelationshipData failed', error));

    default:
      break;
  }

  return { data: [] };
};

// Selectors for UI 
export const getDataTableRecords = (dataIn, name) => {
  switch (name) {
    case load:
      return loadSelector.getMonitoringPlansLoadsTableRecords(dataIn);
    case rectDuctWaf:
      return wafSelector.getMonitoringPlansRectangularDuctsTableRecords(dataIn)
       
    case span:
      return spanSelector.getMonitoringPlansSpansTableRecords(dataIn)
        
    case form:
      return formulaSelector.getMonitoringPlansFormulasTableRecords(dataIn)
       
    case def:
      return defaultSelector.getMonitoringPlansDefaultsTableRecords(dataIn)
      
    case unitFuel:
      return unitFuelSelector.getMonitoringPlansFuelDataRecords(dataIn)
      
    case unitCon:
      return unitControlSelector.getMonitoringPlansUnitControlRecords(dataIn)
        
    case unitCap:
      return unitCapacitySelector.getMonitoringPlansUnitCapacityRecords(dataIn)
      
    case locationAttribute:
      return locationRelationshipsSelector.getMonitoringPlansLocationAttributeRecords(
        dataIn
      )
      

    case relationshipData:
      return locationRelationshipsSelector.getMonitoringPlansRelationshipsDataRecords(
        dataIn
      )

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
      return mpApi.saveMonitoringLoads(userInput, locationSelectValue)
        .catch(error => console.log('saveMonitoringLoads failed', error));
    case rectDuctWaf:
      return mpApi.saveMonitoringDuct(userInput)
        .catch(error => console.log('saveMonitoringDuct failed', error));
    case span:
      return mpApi.saveMonitoringSpans(userInput)
        .catch(error => console.log('saveMonitoringSpans failed', error));
    case form:
      return mpApi.saveMonitoringFormulas(userInput, locationSelectValue)
        .catch(error => console.log('saveMonitoringFormulas failed', error));
    case def:
      return mpApi.saveMonitoringDefaults(userInput, locationSelectValue)
        .catch(error => console.log('saveMonitoringDefaults failed', error));
    case unitFuel:
      return mpApi.saveMonitoringPlansFuelData(userInput)
        .catch(error => console.log('saveMonitoringPlansFuelData failed', error));
    case unitCon:
      return mpApi.saveUnitControl(
        userInput,
        urlParameters ? urlParameters : null
      )
        .catch(error => console.log('saveUnitControl failed', error));
    case unitCap:
      return mpApi.saveUnitCapacity(
        userInput,
        urlParameters ? urlParameters : null
      )
        .catch(error => console.log('saveUnitCapacity failed', error));

    case locationAttribute:
      return mpApi.saveLocationAttribute(userInput, locationSelectValue)
        .catch(error => console.log('saveLocationAttribute failed', error));
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
      return mpApi.createMonitoringLoads(userInput, locationSelectValue)
        .catch(error => console.log('createMonitoringLoads failed', error));
    case rectDuctWaf:
      return mpApi.createMonitoringDuct(userInput)
        .catch(error => console.log('createMonitoringDuct failed', error));
    case span:
      return mpApi.createMonitoringSpans(userInput)
        .catch(error => console.log('createMonitoringSpans failed', error));
    case form:
      return mpApi.createMonitoringFormulas(userInput, locationSelectValue)
        .catch(error => console.log('createMonitoringFormulas failed', error));
    case def:
      return mpApi.createMonitoringDefaults(userInput, locationSelectValue)
        .catch(error => console.log('createMonitoringDefaults failed', error));
    case unitFuel:
      return mpApi.createFuelData(userInput, locationSelectValue)
        .catch(error => console.log('createFuelData failed', error));
    case unitCon:
      return mpApi.createUnitControl(
        userInput,
        urlParameters ? urlParameters : null
      )
        .catch(error => console.log('createUnitControl failed', error));
    case unitCap:
      return mpApi.createUnitCapacity(
        userInput,
        urlParameters ? urlParameters : null
      )
        .catch(error => console.log('createUnitCapacity failed', error));
    case locationAttribute:
      return mpApi.createLocationAttribute(userInput, locationSelectValue)
        .catch(error => console.log('createLocationAttribute failed', error));
    default:
      break;
  }
  return [];
};
