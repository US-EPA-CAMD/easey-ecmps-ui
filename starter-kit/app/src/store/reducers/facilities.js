import * as types from "../actions/actionTypes";
import initialState from "./initialState";

const reducer = (state = initialState.facilities, action) => {
  switch (action.type) {
    case types.LOAD_FACILITIES_SUCCESS:
      return action.facilities;
    default:
      return state;
  }
};

export default reducer;
