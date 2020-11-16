import * as types from "../actions/actionTypes";
import initialState from "./initialState";

const reducer = (state = initialState.apiCallsInProgress, action) => {
  switch (action.type) {
    case types.BEGIN_FACILITIES_API_CALL:
      return Object.assign({}, state, { facilities: true });
    case types.LOAD_FACILITIES_SUCCESS:
      return Object.assign({}, state, { facilities: false });
    default:
      return state;
  }
};

export default reducer;
