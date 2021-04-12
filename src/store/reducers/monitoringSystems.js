import * as types from "../actions/actionTypes";
import initialState from "./initialState";

const reducer = (state = initialState.monitoringSystems, action) => {
  if (action.type === types.LOAD_MONITORING_SYSTEMS_SUCCESS) {
    return Object.assign({}, state, { systems: action.monitoringSystems });
  } else if (action.type === types.LOAD_MONITORING_SYSTEMS_COMPONENTS_SUCCESS) {
    return Object.assign({}, state, {
      components: action.monitoringSystemsComponents,
    });
  } else {
    return state;
  }
};

export default reducer;
