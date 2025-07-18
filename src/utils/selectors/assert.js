import log from "loglevel";

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
import * as unitSelector from "./monitoringPlanUnitData";
import * as unitProgSelector from "./monitoringPlanUnitProgramData";
import * as reportingFreqSelector from "./monitoringPlanUnitReportingFreqData";


// Table Names
const load = "Load";
const span = "Span";
const def = "Default";
const form = "Formula";
const rectDuctWaf = "Rectangular Duct WAF";
const unitCon = "Unit Control";
const unitCap = "Unit Capacity";
const unitFuel = "Unit Fuel";
const unit = "Unit";
const unitProg = "Unit Program";
const reportingFreq = "Reporting Frequency";
const locationAttribute = "Location Attribute";
const relationshipData = "Relationship Data";
// Getting records from API
export const getDataTableApis = async (name, locationId, selectedLocation, planId) => {
  switch (name) {
    case load:
      return mpApi.getMonitoringLoads(locationId)
        .catch(error => log.log('getMonitoringLoads failed', error));
    case rectDuctWaf:
      return mpApi.getMonitoringRectangularDucts(locationId)
        .catch(error => log.log('getMonitoringRectangularDucts failed', error));
    case span:
      return mpApi.getMonitoringSpans(locationId)
        .catch(error => log.log('getMonitoringSpans failed', error));
    case form:
      return mpApi.getMonitoringFormulas(locationId)
        .catch(error => log.log('getMonitoringFormulas failed', error));
    case def:
      return mpApi.getMonitoringDefaults(locationId)
        .catch(error => log.log('getMonitoringDefaults failed', error));
    case unitFuel:
      return mpApi.getMonitoringPlansFuelDataRecords(selectedLocation)
        .catch(error => log.log('getMonitoringPlansFuelDataRecords failed', error));
    case unitCon:
      return mpApi.getMonitoringPlansUnitControlRecords(selectedLocation)
        .catch(error => log.log('getMonitoringPlansUnitControlRecords failed', error));
    case unitCap:
      return mpApi.getUnitCapacity(selectedLocation)
        .catch(error => log.log('getUnitCapacity failed', error));
    case unit:
      return mpApi.getMonitoringPlansUnit(selectedLocation)
        .catch(error => log.log('getMonitoringPlansUnit failed', error));
    case unitProg:
      return mpApi.getUnitProgram(selectedLocation)
        .catch(error => log.log('getUnitProgram failed', error));
    case reportingFreq:
      return mpApi.getReportingFrequency(planId)
        .catch(error => log.log('getReportingFrequency failed', error));

    case locationAttribute:
      return mpApi.getLocationAttributes(locationId)
        .catch(error => log.log('getLocationAttributes failed', error));
    case relationshipData:
      return mpApi.getRelationshipData(locationId)
        .catch(error => log.log('getRelationshipData failed', error));

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

    case unit:
      return unitSelector.getMonitoringPlansUnitDataRecords(dataIn)

    case unitProg:
      return unitProgSelector.getMonitoringPlansUnitProgramDataRecords(dataIn)

    case reportingFreq:
      return reportingFreqSelector.getMonitoringPlanUnitReportingFreqData(dataIn)

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
        .catch(error => log.log('saveMonitoringLoads failed', error));
    case rectDuctWaf:
      return mpApi.saveMonitoringDuct(userInput)
        .catch(error => log.log('saveMonitoringDuct failed', error));
    case span:
      return mpApi.saveMonitoringSpans(userInput)
        .catch(error => log.log('saveMonitoringSpans failed', error));
    case form:
      return mpApi.saveMonitoringFormulas(userInput, locationSelectValue)
        .catch(error => log.log('saveMonitoringFormulas failed', error));
    case def:
      return mpApi.saveMonitoringDefaults(userInput, locationSelectValue)
        .catch(error => log.log('saveMonitoringDefaults failed', error));
    case unitFuel:
      return mpApi.saveMonitoringPlansFuelData(userInput)
        .catch(error => log.log('saveMonitoringPlansFuelData failed', error));
    case unitCon:
      return mpApi.saveUnitControl(
        userInput,
        urlParameters ? urlParameters : null
      )
        .catch(error => log.log('saveUnitControl failed', error));
    case unitCap:
      return mpApi.saveUnitCapacity(
        userInput,
        urlParameters ? urlParameters : null
      )
        .catch(error => log.log('saveUnitCapacity failed', error));

    case unit:
      return mpApi.saveMonitoringPlansUnit(userInput,
        urlParameters ? urlParameters : null)
        .catch(error => log.log('saveMonitoringPlansUnit failed', error));
    case unitProg:
      // Save Functionality not required. Do nothing.
      break;
    case reportingFreq:
      // Save Functionality not required. Do nothing.
      break;

    case locationAttribute:
      return mpApi.saveLocationAttribute(userInput, locationSelectValue)
        .catch(error => log.log('saveLocationAttribute failed', error));
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
        .catch(error => log.log('createMonitoringLoads failed', error));
    case rectDuctWaf:
      return mpApi.createMonitoringDuct(userInput)
        .catch(error => log.log('createMonitoringDuct failed', error));
    case span:
      return mpApi.createMonitoringSpans(userInput)
        .catch(error => log.log('createMonitoringSpans failed', error));
    case form:
      return mpApi.createMonitoringFormulas(userInput, locationSelectValue)
        .catch(error => log.log('createMonitoringFormulas failed', error));
    case def:
      return mpApi.createMonitoringDefaults(userInput, locationSelectValue)
        .catch(error => log.log('createMonitoringDefaults failed', error));
    case unitFuel:
      return mpApi.createFuelData(userInput, locationSelectValue)
        .catch(error => log.log('createFuelData failed', error));
    case unitCon:
      return mpApi.createUnitControl(
        userInput,
        urlParameters ? urlParameters : null
      )
        .catch(error => log.log('createUnitControl failed', error));
    case unitCap:
      return mpApi.createUnitCapacity(
        userInput,
        urlParameters ? urlParameters : null
      )
        .catch(error => log.log('createUnitCapacity failed', error));

    case unit:
      // Create Functionality not required. Do nothing.
      break;
    case unitProg:
      // Create Functionality not required. Do nothing.
      break;
    case reportingFreq:
      // Create Functionality not required. Do nothing.
      break;

    case locationAttribute:
      return mpApi.createLocationAttribute(userInput, locationSelectValue)
        .catch(error => log.log('createLocationAttribute failed', error));
    default:
      break;
  }
  return [];
};
