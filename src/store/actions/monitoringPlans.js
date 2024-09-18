import * as mpApi from "../../utils/api/monitoringPlansApi";
import { beginMonitoringPlansApiCall } from "./apiStatusActions";
import * as types from "./actionTypes";

export function loadSingleMonitoringPlanSuccess(orisCode, monitoringPlan) {
  return {
    type: types.LOAD_SINGLE_MONITORING_PLAN_SUCCESS,
    orisCode,
    monitoringPlan,
  };
}

export function loadMonitoringPlansSuccess(orisCode, monitoringPlans) {
  return {
    type: types.LOAD_MONITORING_PLANS_SUCCESS,
    orisCode,
    monitoringPlans,
  };
}

export function loadMonitoringPlans(orisCode) {
  return (dispatch) => {
    dispatch(beginMonitoringPlansApiCall());
    return mpApi
      .getMonitoringPlans(orisCode)
      .then((res) => {
        if (res) {
          dispatch(loadMonitoringPlansSuccess(orisCode, res.data));
        }
      })
      .catch((error) => console.log("getMonitoringPlans failed", error));
  };
}
