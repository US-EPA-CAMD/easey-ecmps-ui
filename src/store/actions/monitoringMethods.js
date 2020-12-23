import * as mpApi from "../../utils/api/monitoringPlansApi";
import { beginMonitoringMethodsApiCall, beginMonitoringMatsMethodsApiCall } from "./apiStatusActions";
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

export function loadMonitoringMatsMethodsSuccess(monitoringMatsMethods) {
  return {
    type: types.LOAD_MONITORING_MATSMETHODS_SUCCESS,
    monitoringMatsMethods,
  };
}

export function loadMonitoringMatsMethods(locationId) {
  return (dispatch) => {
    dispatch(beginMonitoringMatsMethodsApiCall());
    return mpApi
      .getMonitoringMatsMethods(locationId)
      .then((res) => {
        dispatch(loadMonitoringMatsMethodsSuccess(res.data));
      })
      .catch((err) => {
        log(err);
      });
  };
}
