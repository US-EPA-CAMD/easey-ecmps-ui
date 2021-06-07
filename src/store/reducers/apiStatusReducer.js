import * as types from "../actions/actionTypes";
import initialState from "./initialState";

const reducer = (state = initialState.apiCallsInProgress, action) => {
  let returnObject;

  switch (action.type) {
    case types.BEGIN_FACILITIES_API_CALL:
      returnObject = Object.assign({}, state, { facilities: true });
      break;
    case types.LOAD_FACILITIES_SUCCESS:
      returnObject = Object.assign({}, state, { facilities: false });
      break;
    case types.BEGIN_MONITORING_PLANS_API_CALL:
      returnObject = Object.assign({}, state, { monitoringPlans: true });
      break;
    case types.LOAD_MONITORING_PLANS_SUCCESS:
      returnObject = Object.assign({}, state, { monitoringPlans: false });
      break;
    case types.BEGIN_MONITORING_METHODS_API_CALL:
      returnObject = Object.assign({}, state, { monitoringMethods: true });
      break;
    case types.LOAD_MONITORING_METHODS_SUCCESS:
      returnObject = Object.assign({}, state, { monitoringMethods: false });
      break;
    case types.BEGIN_MONITORING_MATSMETHODS_API_CALL:
      returnObject = Object.assign({}, state, { monitoringMatsMethods: true });
      break;
    case types.LOAD_MONITORING_MATSMETHODS_SUCCESS:
      returnObject = Object.assign({}, state, { monitoringMatsMethods: false });
      break;
    case types.BEGIN_MONITORING_SYSTEMS_API_CALL:
      returnObject = Object.assign({}, state, { monitoringSystems: true });
      break;
    case types.LOAD_MONITORING_SYSTEMS_SUCCESS:
      returnObject = Object.assign({}, state, { monitoringSystems: false });
      break;
    case types.BEGIN_MONITORING_SYSTEMS_COMPONENTS_API_CALL:
      returnObject = Object.assign({}, state, {
        monitoringSystemsComponents: true,
      });
      break;
    case types.LOAD_MONITORING_SYSTEMS_COMPONENTS_SUCCESS:
      returnObject = Object.assign({}, state, {
        monitoringSystemsComponents: false,
      });
      break;
    default:
      returnObject = state;
      break;
  }

  return returnObject;
};

export default reducer;
