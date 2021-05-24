
import * as types from "./actionTypes";

export function addFacilityTab(facility) {
  return {
    type: types.ADD_FACILITY_TAB,
    facility,
  };
}
export function removeFacilityTab(facility) {
  return {
    type: types.REMOVE_FACILITY_TAB,
    facility,
  };
}
export function setConfigurationSelectionState(configuration,orisCode) {
  return {
    type: types.SET_CONFIGURATION_SELECTION_STATE,
    configuration,
    orisCode
  };
}
export function setLocationSelectionState(location,orisCode) {
  return {
    type: types.SET_LOCATION_SELECTION_STATE,
    location,
    orisCode
  };
}
export function setSectionSelectionState(section,orisCode) {
  return {
    type: types.SET_SECTION_SELECTION_STATE,
    section,
    orisCode
  };
}
export function setInactiveToggle(orisCode,value) {
  return {
    type: types.SET_INACTIVE_TOGGLE,
    orisCode,
    value
  };
}

export function setLocationsState(locations,orisCode) {
  return {
    type: types.SET_LOCATIONS_STATE,
    orisCode,
    locations
  };
}

export function setMonitoringPlan(mp,orisCode) {
  return {
    type: types.SET_MONITORING_PLAN,
    orisCode,
    mp
  };
}

