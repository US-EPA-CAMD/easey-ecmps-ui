import * as types from "../actions/actionTypes";
import initialState from "./initialState";

const reducer = (state, action) => {
  
  let currentState = state ? state : initialState.apiCallsInProgress;
  let returnObject;

  switch (action.type) {
    case types.BEGIN_FACILITIES_API_CALL:
      returnObject = Object.assign({}, currentState, { facilities: true });
      break;
    case types.LOAD_FACILITIES_SUCCESS:
      returnObject = Object.assign({}, currentState, { facilities: false });
      break;
    case types.BEGIN_MONITORING_PLANS_API_CALL:
      returnObject = Object.assign({}, currentState, { monitoringPlans: true });
      break;
    case types.LOAD_MONITORING_PLANS_SUCCESS:
      returnObject = Object.assign({}, currentState, { monitoringPlans: false });
      break;
    case types.BEGIN_MONITORING_METHODS_API_CALL:
      returnObject = Object.assign({}, currentState, { monitoringMethods: true });
      break;
    case types.LOAD_MONITORING_METHODS_SUCCESS:
      returnObject = Object.assign({}, currentState, { monitoringMethods: false });
      break;
    case types.BEGIN_MONITORING_MATSMETHODS_API_CALL:
      returnObject = Object.assign({}, currentState, { monitoringMatsMethods: true });
      break;
    case types.LOAD_MONITORING_MATSMETHODS_SUCCESS:
      returnObject = Object.assign({}, currentState, { monitoringMatsMethods: false });
      break;
    case types.BEGIN_MONITORING_SYSTEMS_API_CALL:
      returnObject = Object.assign({}, currentState, { monitoringSystems: true });
      break;
    case types.LOAD_MONITORING_SYSTEMS_SUCCESS:
      returnObject = Object.assign({}, currentState, { monitoringSystems: false });
      break;
    case types.BEGIN_MONITORING_SYSTEMS_COMPONENTS_API_CALL:
      returnObject = Object.assign({}, currentState, {
        monitoringSystemsComponents: true,
      });
      break;
    case types.LOAD_MONITORING_SYSTEMS_COMPONENTS_SUCCESS:
      returnObject = Object.assign({}, currentState, {
        monitoringSystemsComponents: false,
      });
      break;
    default:
      returnObject = currentState;
      break;
  }

  return returnObject;
};

export default reducer;
