import * as types from "./actionTypes";

export const addFacilityTab = (facility, workspaceSection) => {
  return {
    type: types.ADD_FACILITY_TAB,
    facility,
    workspaceSection,
  };
};
export const removeFacilityTab = (facility, workspaceSection) => {
  return {
    type: types.REMOVE_FACILITY_TAB,
    facility,
    workspaceSection,
  };
};

export const setLocationSelectionState = (location, title, workspaceSection) => {
  return {
    type: types.SET_LOCATION_SELECTION_STATE,
    location,
    title,
    workspaceSection,
  };
};
export const setSectionSelectionState = (section, title, workspaceSection) => {
  return {
    type: types.SET_SECTION_SELECTION_STATE,
    section,
    title,
    workspaceSection
  };
};

export const setCheckoutState = (checkout, configID,workspaceSection) => {
  return {
    type: types.SET_CHECKOUT_STATE,
    configID,
    checkout,
    workspaceSection
  };
};

export const setInactiveState = (inactive, title,workspaceSection) => {
  return {
    type: types.SET_INACTIVE_STATE,
    title,
    inactive,
    workspaceSection
  };
};
