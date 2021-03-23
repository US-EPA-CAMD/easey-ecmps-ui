import * as mpApi from "../../utils/api/monitoringPlansApi";
import { beginMonitoringSystemsApiCall } from "./apiStatusActions";
import * as types from "./actionTypes";
import log from "loglevel";

export function loadMonitoringSystemsSuccess(monitoringSystems) {
  return {
    type: types.LOAD_MONITORING_SYSTEMS_SUCCESS,
    monitoringSystems,
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
