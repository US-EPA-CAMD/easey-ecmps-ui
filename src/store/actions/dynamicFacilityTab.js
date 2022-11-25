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

export const setLocationSelectionState = (
  location,
  title,
  workspaceSection
) => {
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
    workspaceSection,
  };
};

export const setCheckoutState = (checkout, configID, workspaceSection) => {
  return {
    type: types.SET_CHECKOUT_STATE,
    configID,
    checkout,
    workspaceSection,
  };
};

export const setInactiveState = (inactive, title, workspaceSection) => {
  return {
    type: types.SET_INACTIVE_STATE,
    title,
    inactive,
    workspaceSection,
  };
};

export const setActiveTab = (active, title, workspaceSection) => {
  return {
    type: types.SET_ACTIVE_TAB,
    title,
    active,
    workspaceSection,
  };
};

export const setExportState = (configId, exportState, workspaceSection) => {
  return {
    type: types.SET_EXPORT_STATE,
    configId,
    exportState,
    workspaceSection,
  };
};

export const setReportingPeriods = (reportingPeriods, title, workspaceSection) =>{
  return {
    type: types.SET_REPORTING_PERIODS,
    title,
    workspaceSection,
    reportingPeriods,
  }
}

export const setIsViewDataLoaded = (isViewDataLoaded, title, workspaceSection) => {
  return {
    type: types.IS_VIEW_DATA_LOADED,
    title,
    workspaceSection,
    isViewDataLoaded,
  };
};

export const setViewData = (viewData, title, workspaceSection) => {
  return {
    type: types.SET_VIEW_DATA,
    title,
    workspaceSection,
    viewData,
  };
};

export const setViewDataColumns = (viewColumns, title, workspaceSection) => {
  return {
    type: types.SET_VIEW_DATA_COLUMNS,
    title,
    workspaceSection,
    viewColumns,
  };
};

export const setViewTemplateSelectionAction = (viewTemplateSelect, title, workspaceSection) => {
  return {
    type: types.SET_VIEW_TEMPLATE_SELECTION,
    title,
    workspaceSection,
    viewTemplateSelect,
  };
};


