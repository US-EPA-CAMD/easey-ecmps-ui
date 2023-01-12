import * as types from '../actions/actionTypes';
import initialState from './initialState';

const reducer = (state, action) => {
  const currentState = state ? state : initialState.openedFacilityTabs;
  let returnObject;
  const workspaceSections = [
    'monitoringPlans',
    'qaCertTestSummary',
    'qaCertEvent',
    'export',
    'emissions',
  ];
  const fac = {};
  fac[`${action.workspaceSection}`] = action.facility;

  switch (action.type) {
    case types.ADD_FACILITY_TAB:
      // returnObject = [...currentState,action.facility]; //...currentState; //...currentState
      returnObject = {
        ...currentState,
      };
      workspaceSections.forEach(
        (section) =>
          (returnObject[`${section}`] = [
            ...currentState[`${section}`],
            action.facility,
          ])
      );
      break;
    case types.REMOVE_FACILITY_TAB:
      returnObject = {
        ...currentState,
      };
      workspaceSections.forEach(
        (section) =>
          (returnObject[`${section}`] = currentState[section].filter(
            (facility) =>
              currentState[section].indexOf(facility) !== action.facility - 1
          ))
      );
      break;
    case types.SET_LOCATION_SELECTION_STATE:
      returnObject = {
        ...currentState,
        [`${action.workspaceSection}`]: currentState[
          `${action.workspaceSection}`
        ].map((x) =>
          x.name === action.title
            ? {
                ...x,
                location: action.location,
              }
            : x
        ),
      };

      break;
    case types.SET_SECTION_SELECTION_STATE:
      returnObject = {
        ...currentState,
        [`${action.workspaceSection}`]: currentState[
          `${action.workspaceSection}`
        ].map((x) =>
          x.name === action.title
            ? {
                ...x,
                section: action.section,
              }
            : x
        ),
      };

      break;
    case types.SET_EXPORT_STATE:
      returnObject = {
        ...currentState,
        [`${action.workspaceSection}`]: currentState[
          `${action.workspaceSection}`
        ].map((x) =>
          x.selectedConfig.id === action.configId
            ? {
                ...x,
                exportState: action.exportState,
              }
            : x
        ),
      };

      break;
    case types.SET_CHECKOUT_STATE:
      returnObject = {
        ...currentState,
      };
      workspaceSections
        .filter((s) => s !== 'export')
        .forEach(
          (section) =>
            (returnObject[section] = currentState[section].map((x) =>
              x.selectedConfig.id === action.configID
                ? {
                    ...x,
                    checkout: action.checkout,
                  }
                : x
            ))
        );
      break;
    case types.SET_INACTIVE_STATE:
      returnObject = {
        ...currentState,
        [`${action.workspaceSection}`]: currentState[
          `${action.workspaceSection}`
        ].map((x) =>
          x.name === action.title
            ? {
                ...x,
                inactive: action.inactive,
              }
            : x
        ),
      };
      break;
    case types.IS_VIEW_DATA_LOADED:
      returnObject = {
        ...currentState,
        [`${action.workspaceSection}`]: currentState[
          `${action.workspaceSection}`
        ].map((x) =>
          x.name === action.title
            ? {
                ...x,
                isViewDataLoaded: action.isViewDataLoaded,
              }
            : x
        ),
      };
      break;
    case types.SET_VIEW_DATA_COLUMNS:
      returnObject = {
        ...currentState,
        [`${action.workspaceSection}`]: currentState[
          `${action.workspaceSection}`
        ].map((x) =>
          x.name === action.title
            ? {
                ...x,
                viewColumns: action.viewColumns,
              }
            : x
        ),
      };
      break;
    case types.SET_VIEW_DATA:
      returnObject = {
        ...currentState,
        [`${action.workspaceSection}`]: currentState[
          `${action.workspaceSection}`
        ].map((x) =>
          x.name === action.title
            ? {
                ...x,
                viewData: action.viewData,
              }
            : x
        ),
      };
      break;
    case types.SET_REPORTING_PERIODS:
      returnObject = {
        ...currentState,
        [`${action.workspaceSection}`]: currentState[
          `${action.workspaceSection}`
        ].map((x) =>
          x.name === action.title
            ? {
                ...x,
                reportingPeriods: action.reportingPeriods,
              }
            : x
        ),
      };
      break;
    case types.SET_VIEW_TEMPLATE_SELECTION:
      returnObject = {
        ...currentState,
        [`${action.workspaceSection}`]: currentState[
          `${action.workspaceSection}`
        ].map((x) =>
          x.name === action.title
            ? {
                ...x,
                viewTemplateSelect: action.viewTemplateSelect,
              }
            : x
        ),
      };
      break;
    default:
      returnObject = currentState;
      break;
  }
  return returnObject;
};

export default reducer;
