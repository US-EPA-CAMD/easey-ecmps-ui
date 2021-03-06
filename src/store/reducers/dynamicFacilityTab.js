import * as types from "../actions/actionTypes";
import initialState from "./initialState";

const reducer = (state, action) => {
  const currentState = state ? state : initialState.openedFacilityTabs;
  let returnObject;

  const fac = {};
  fac[`${action.workspaceSection}`] = action.facility;

  switch (action.type) {
    case types.ADD_FACILITY_TAB:
      // returnObject = [...currentState,action.facility]; //...currentState; //...currentState
      returnObject = {
        ...currentState,
        [`${action.workspaceSection}`]: [
          ...currentState[`${action.workspaceSection}`],
          action.facility,
        ],
      };
      break;
    case types.REMOVE_FACILITY_TAB:
      returnObject = {
        ...currentState,
        [`${action.workspaceSection}`]: currentState[
          `${action.workspaceSection}`
        ].filter(
          (facility) =>
            currentState[`${action.workspaceSection}`].indexOf(facility) !==
            action.facility - 1
        ),
      };
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
      console.log(action.workspaceSection)
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
      if (currentState[`${action.workspaceSection}`]) {
        returnObject = {
          ...currentState,
          [`${action.workspaceSection}`]: currentState[
            `${action.workspaceSection}`
          ].map((x) =>
            x.selectedConfig.id === action.configID
              ? {
                  ...x,
                  checkout: action.checkout,
                }
              : x
          ),
        };
      } else {
        returnObject = currentState;
      }

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
    default:
      returnObject = currentState;
      break;
  }
  return returnObject;
};

export default reducer;
