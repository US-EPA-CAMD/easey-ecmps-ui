import * as types from "../actions/actionTypes";
import initialState from "./initialState";

const reducer = (state, action) => {
  const currentState = state ? state : initialState.facilities;
  if (action.type === types.LOAD_FACILITIES_SUCCESS) {
    return action.facilities;
  } else {
    return currentState;
  }
};

export default reducer;
