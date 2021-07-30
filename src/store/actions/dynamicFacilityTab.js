import * as types from "./actionTypes";

export const addFacilityTab = (facility) => {
  return {
    type: types.ADD_FACILITY_TAB,
    facility,
  };
};
export const removeFacilityTab = (facility) => {
  return {
    type: types.REMOVE_FACILITY_TAB,
    facility,
  };
};

export const setLocationSelectionState = (location, title) => {
  return {
    type: types.SET_LOCATION_SELECTION_STATE,
    location,
    title,
  };
};
export const setSectionSelectionState = (section, title) => {
  return {
    type: types.SET_SECTION_SELECTION_STATE,
    section,
    title,
  };
};

export const setCheckoutState = (checkout, title) => {
  return {
    type: types.SET_CHECKOUT_STATE,
    title,
    checkout,
  };
};

export const setInactiveState = (inactive, title) => {
  return {
    type: types.SET_INACTIVE_STATE,
    title,
    inactive,
  };
};
