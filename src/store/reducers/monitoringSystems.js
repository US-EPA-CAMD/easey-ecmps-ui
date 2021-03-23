import * as types from "../actions/actionTypes";
import initialState from "./initialState";

const reducer = (state = initialState.monitoringSystems, action) => {
  if (action.type === types.LOAD_MONITORING_SYSTEMS_SUCCESS) {
    return Object.assign({}, state, { systems: action.monitoringSystems });
  }
  return state;
};

export default reducer;
