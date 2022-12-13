import * as types from "../actions/actionTypes";
import initialState from "./initialState";

const checkedOutLocationsReducer = (state, action) => {
  const currentState = state ? state : initialState.checkedOutLocations;
  if (action.type === types.SET_CHECKED_OUT_LOCATIONS) {
    return action.checkedOutLocations;
  } else {
    return currentState;
  }
};

export default checkedOutLocationsReducer;
