import * as mpApi from "../../utils/api/monitoringPlansApi";
import { beginMonitoringMethodsApiCall } from "./apiStatusActions";
import * as types from "./actionTypes";
import log from "loglevel";

export function loadMonitoringMethodsSuccess(monitoringMethods) {
  return {
    type: types.LOAD_MONITORING_METHODS_SUCCESS,
    monitoringMethods,
  };
}

export function loadMonitoringMethods(locationId) {
  return (dispatch) => {
    dispatch(beginMonitoringMethodsApiCall());
    return mpApi
      .getMonitoringMethods(locationId)
      .then((res) => {
        dispatch(loadMonitoringMethodsSuccess(res.data));
      })
      .catch((err) => {
        log(err);
      });
  };
}
