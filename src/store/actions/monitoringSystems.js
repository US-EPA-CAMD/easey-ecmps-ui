import * as mpApi from "../../utils/api/monitoringPlansApi";
import {
  beginMonitoringSystemsApiCall,
  beginMonitoringSystemsComponentsApiCall,
} from "./apiStatusActions";
import * as types from "./actionTypes";
import log from "loglevel";

export function loadMonitoringSystemsSuccess(monitoringSystems) {
  return {
    type: types.LOAD_MONITORING_SYSTEMS_SUCCESS,
    monitoringSystems,
  };
}

export function loadMonitoringSystemsFuelFlowsSuccess(
  monitoringSystemsFuelFlows
) {
  return {
    type: types.LOAD_MONITORING_SYSTEMS_FUEL_FLOWS_SUCCESS,
    monitoringSystemsFuelFlows,
  };
}

export function loadMonitoringSystems(locationId) {
  return (dispatch) => {
    dispatch(beginMonitoringSystemsApiCall());
    return mpApi
      .getMonitoringSystems(locationId)
      .then((res) => {
        dispatch(loadMonitoringSystemsSuccess(res.data));
      })
      .catch((err) => {
        log(err);
      });
  };
}
export function loadMonitoringSystemsFuelFlows(locationId, systemId) {
  return (dispatch) => {
    dispatch(beginMonitoringSystemsApiCall());
    return mpApi
      .getMonitoringSystemsFuelFlows(locationId, systemId)
      .then((res) => {
        dispatch(loadMonitoringSystemsFuelFlowsSuccess(res.data));
      })
      .catch((err) => {
        log(err);
      });
  };
}

export function loadMonitoringSystemsComponentsSuccess(
  monitoringSystemsComponents
) {
  return {
    type: types.LOAD_MONITORING_SYSTEMS_COMPONENTS_SUCCESS,
    monitoringSystemsComponents,
  };
}

export function loadMonitoringSystemsComponents(systemId, componentId) {
  return (dispatch) => {
    dispatch(beginMonitoringSystemsComponentsApiCall());
    return mpApi
      .getMonitoringSystemsComponents(systemId, componentId)
      .then((res) => {
        dispatch(loadMonitoringSystemsComponentsSuccess(res.data));
      })
      .catch((err) => {
        log(err);
      });
  };
}
