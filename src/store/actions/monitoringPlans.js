import * as mpApi from "../../utils/api/monitoringPlansApi";
import { beginMonitoringPlansApiCall } from "./apiStatusActions";
import * as types from "./actionTypes";
import log from "loglevel";

export function loadMonitoringPlansSuccess(monitoringPlans) {
  return {
    type: types.LOAD_MONITORING_PLANS_SUCCESS,
    monitoringPlans,
  };
}

export function loadMonitoringPlansArraySuccess(monitoringPlans,orisCode) {
  return {
    type: types.LOAD_MONITORING_PLANS_ARRAY_SUCCESS,
    monitoringPlans,
    orisCode
  };
}
export function loadMonitoringPlans(orisCode) {
  return (dispatch) => {
    dispatch(beginMonitoringPlansApiCall());
    return mpApi
      .getMonitoringPlans(orisCode)
      .then((res) => {
        dispatch(loadMonitoringPlansSuccess(res.data));
      })
      .catch((err) => {
        log(err);
      });
  };
}

export function loadMonitoringPlansArray(orisCode) {
  return (dispatch) => {
    dispatch(beginMonitoringPlansApiCall());
    return mpApi
      .getMonitoringPlans(orisCode)
      .then((res) => {
        dispatch(loadMonitoringPlansArraySuccess(res.data,orisCode));
      })
      .catch((err) => {
        log(err);
      });
  };
}
export function emptyMonitoringPlans() {
  return {
    type: types.EMPTY_MONITORING_PLANS,
    value: [],
  };
}
