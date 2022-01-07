import * as mpApi from "../../utils/api/monitoringPlansApi";
import { beginMonitoringPlansApiCall } from "./apiStatusActions";
import * as types from "./actionTypes";

export function loadMonitoringPlansSuccess(monitoringPlans) {
  return {
    type: types.LOAD_MONITORING_PLANS_SUCCESS,
    monitoringPlans,
  };
}

export function loadMonitoringPlansArraySuccess(
  monitoringPlans,
  orisCode,
  resolve
) {
  resolve();
  return {
    type: types.LOAD_MONITORING_PLANS_ARRAY_SUCCESS,
    monitoringPlans,
    orisCode,
  };
}
export function loadMonitoringPlans(orisCode) {
  return (dispatch) => {
    dispatch(beginMonitoringPlansApiCall());
    return mpApi.getMonitoringPlans(orisCode).then((res) => {
      if (res) {
        dispatch(loadMonitoringPlansSuccess(res.data));
      }
    });
  };
}

export function loadMonitoringPlansArray(orisCode, resolve) {
  return (dispatch) => {
    dispatch(beginMonitoringPlansApiCall());
    return mpApi.getMonitoringPlans(orisCode).then((res) => {
      if (res) {
        dispatch(loadMonitoringPlansArraySuccess(res.data, orisCode));
      }
    });
  };
}
