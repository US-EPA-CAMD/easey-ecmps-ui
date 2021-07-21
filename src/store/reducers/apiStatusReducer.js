import * as types from "../actions/actionTypes";
import initialState from "./initialState";

const reducer = (state, action) => {
  const currentState = state ? state : initialState.apiCallsInProgress;
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
      returnObject = Object.assign({}, currentState, {
        monitoringPlans: false,
      });
      break;
    default:
      returnObject = currentState;
      break;
  }

  return returnObject;
};

export default reducer;
