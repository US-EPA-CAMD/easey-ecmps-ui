import * as types from "../actions/actionTypes";
import initialState from "./initialState";

const reducer = (state = initialState.facilities, action) => {
  if (action.type === types.LOAD_FACILITIES_SUCCESS) {
    return action.facilities;
  } else {
    return state;
  }
};

export default reducer;
