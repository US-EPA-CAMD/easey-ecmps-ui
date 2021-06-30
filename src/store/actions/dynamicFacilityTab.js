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

export function setLocationSelectionState(location, title) {
  return {
    type: types.SET_LOCATION_SELECTION_STATE,
    location,
    title,
  };
}
export function setSectionSelectionState(section, title) {
  return {
    type: types.SET_SECTION_SELECTION_STATE,
    section,
    title,
  };
}

export function setCheckoutState(checkout, title) {
  return {
    type: types.SET_CHECKOUT_STATE,
    title,
    checkout,
  };
}

export function setInactiveState(inactive, title) {
  return {
    type: types.SET_INACTIVE_STATE,
    title,
    inactive,
  };
}
