import * as types from "../actions/actionTypes";
import initialState from "./initialState";

const reducer = (state, action) => {
  const currentState = state ?? initialState.monitoringPlans;
  if (action.type === types.LOAD_MONITORING_PLANS_SUCCESS) {
    return {
      ...currentState,
      [action.orisCode]: action.monitoringPlans,
    };
  } else if (action.type === types.LOAD_SINGLE_MONITORING_PLAN_SUCCESS) {
    return {
      ...currentState,
      [action.orisCode]: (currentState[action.orisCode] ?? []).filter((mp) => mp.id !== action.monitoringPlan.id).concat(action.monitoringPlan),
    };
  } else {
    return currentState;
  }
};

export default reducer;
