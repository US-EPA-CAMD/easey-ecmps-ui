import * as types from "../actions/actionTypes";
import initialState from "./initialState";

const reducer = (state = initialState.apiCallsInProgress, action) => {
  switch (action.type) {
    case types.BEGIN_FACILITIES_API_CALL:
      return Object.assign({}, state, { facilities: true });
    case types.LOAD_FACILITIES_SUCCESS:
      return Object.assign({}, state, { facilities: false });
    case types.BEGIN_MONITORING_PLANS_API_CALL:
      return Object.assign({}, state, { monitoringPlans: true });
    case types.LOAD_MONITORING_PLANS_SUCCESS:
      return Object.assign({}, state, { monitoringPlans: false });
    case types.BEGIN_MONITORING_METHODS_API_CALL:
      return Object.assign({}, state, { monitoringMethods: true });
    case types.LOAD_MONITORING_METHODS_SUCCESS:
      return Object.assign({}, state, { monitoringMethods: false });
    default:
      return state;
  }
};

export default reducer;
