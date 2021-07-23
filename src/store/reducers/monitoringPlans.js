import * as types from "../actions/actionTypes";
import initialState from "./initialState";

const reducer = (state, action) => {
  const currentState = state ? state : initialState.monitoringPlans;
  if (action.type === types.LOAD_MONITORING_PLANS_SUCCESS) {
    return action.monitoringPlans;
  } else if (action.type === types.LOAD_MONITORING_PLANS_ARRAY_SUCCESS) {
    return [...currentState, [action.orisCode, action.monitoringPlans]];
  } else {
    return currentState;
  }
};

export default reducer;
