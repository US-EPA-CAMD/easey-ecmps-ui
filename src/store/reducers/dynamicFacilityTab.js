import * as types from "../actions/actionTypes";
import initialState from "./initialState";

const reducer = (state = initialState.openedFacilityTabs, action) => {
  let returnObject;

  switch (action.type) {
    case types.ADD_FACILITY_TAB:
      returnObject = [...state, action.facility];
      break;
    case types.REMOVE_FACILITY_TAB:
      returnObject = state.filter(
        (facility) => state.indexOf(facility) !== action.facility - 1
      );
      break;
    case types.SET_LOCATION_SELECTION_STATE:
      returnObject = state.map((x, i) =>
        x.name === action.title
          ? {
              ...x,
              location: action.location,
            }
          : x
      );

      break;
    case types.SET_LOCATIONS_STATE:
      if (state && state.length > 0) {
        returnObject = state.map((x, i) =>
          x.orisCode === action.orisCode
            ? {
                ...x,
                locations: action.locations,
              }
            : x
        );
      }
      break;
    case types.SET_SECTION_SELECTION_STATE:
      returnObject = state.map((x, i) =>
        x.name === action.title
          ? {
              ...x,
              section: action.section,
            }
          : x
      );

      break;
    case types.SET_CHECKOUT_STATE:
      if (state && state.length > 0) {
        returnObject = state.map((x, i) =>
          x.name === action.title
            ? {
                ...x,
                checkout: action.checkout,
              }
            : x
        );
      }
      break;
    case types.SET_INACTIVE_STATE:
      if (state && state.length > 0) {
        returnObject = state.map((x, i) =>
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
      returnObject = state;
      break;
  }
  return returnObject;
};

export default reducer;
