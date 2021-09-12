import * as types from "../actions/actionTypes";
import initialState from "./initialState";

const reducer = (state, action) => {
  const currentState = state ? state : initialState.openedFacilityTabs;
  let returnObject;

  switch (action.type) {
    case types.ADD_FACILITY_TAB:
      returnObject = [...currentState, action.facility]; //...currentState
      break;
    case types.REMOVE_FACILITY_TAB:
      returnObject = currentState.filter(
        (facility) => currentState.indexOf(facility) !== action.facility - 1
      );
      break;
    case types.SET_LOCATION_SELECTION_STATE:
      returnObject = currentState.map((x) =>
        x.name === action.title
          ? {
              ...x,
              location: action.location,
            }
          : x
      );
      break;
    case types.SET_SECTION_SELECTION_STATE:
      returnObject = currentState.map((x) =>
        x.name === action.title
          ? {
              ...x,
              section: action.section,
            }
          : x
      );

      break;
    case types.SET_CHECKOUT_STATE:
      console.log("CURRENT STATE: " + currentState);
      console.log("CURRENT LENGTH: " + currentState.length);
      if (currentState && currentState.length > 0) {
        returnObject = currentState.map((x) =>
          x.selectedConfig.id === action.configID
            ? {
                ...x,
                checkout: action.checkout,
              }
            : x
        );
      } else {
        returnObject = currentState;
      }
      break;
    case types.SET_INACTIVE_STATE:
      if (currentState && currentState.length > 0) {
        returnObject = currentState.map((x) =>
          x.name === action.title
            ? {
                ...x,
                inactive: action.inactive,
              }
            : x
        );
      }
      break;

    default:
      returnObject = currentState;
      break;
  }
  return returnObject;
};

export default reducer;
