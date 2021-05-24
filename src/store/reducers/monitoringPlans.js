import * as types from "../actions/actionTypes";
import initialState from "./initialState";

const reducer = (state = initialState.monitoringPlans, action) => {
  if (action.type === types.LOAD_MONITORING_PLANS_SUCCESS) {
    return action.monitoringPlans;
  }else if(action.type === types.EMPTY_MONITORING_PLANS){
    return action.value
  } else {
    return state;
  }
};

export default reducer;
