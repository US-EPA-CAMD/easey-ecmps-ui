import * as types from "../actions/actionTypes";
import initialState from "./initialState";

const reducer = (state, action) => {
  const currentState = state ? state : initialState.dropdowns;
  let returnObject;

  const dropdowns = {};
  dropdowns[`${action.section}`] = action.dropdowns;

  if (action.type === types.LOAD_DROPDOWNS_SUCCESS) {
    returnObject = {
      ...state,
      ...dropdowns,
    };
  } else {
    return currentState;
  }
  return returnObject;
};

export default reducer;
