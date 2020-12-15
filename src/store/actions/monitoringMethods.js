import * as mpApi from "../../utils/api/monitoringPlansApi";
import { beginMonitoringMethodsApiCall, beginMonitoringMatsMethodsApiCall } from "./apiStatusActions";
import * as types from "./actionTypes";
import log from "loglevel";

export function loadMonitoringMetodsSuccess(monitoringMethods) {
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
            // dispatch(loadMonitoringMetodsSuccess(res.data));
            dispatch(loadMonitoringMetodsSuccess(monitoringMethodsRes.data));
        })
        .catch((err) => {
            log(err);
        });
    };
}

export function loadMonitoringMatsMetodsSuccess(monitoringMatsMethods) {
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
            // dispatch(loadMonitoringMetodsSuccess(res.data));
            dispatch(loadMonitoringMatsMetodsSuccess(monitoringMatsMethodsRes.data));
        })
        .catch((err) => {
            log(err);
        });
    };
}

const monitoringMethodsRes = 
{
    data: [
        {
        id: "CAMD-F4C326C9D8044324B83603C2FC0154B2",
        parameter: "co2",
        methodology: "ad",
        subsitituteDataApproach: "spts",
        byPassApproach: "null",
        beginDate: "1995-01-01 00",
        endTime: "1995-01-01 00",
        },
        {
        id: "CAMD-F4C326C9D8044324B83603C2FC0154B2",
        parameter: "co2",
        methodology: "ad",
        subsitituteDataApproach: "spts",
        byPassApproach: "null",
        beginDate: "1995-01-01 00",
        endTime: "1995-01-01 00",
        },
        {
        id: "CAMD-F4C326C9D8044324B83603C2FC0154B2",
        parameter: "co2",
        methodology: "ad",
        subsitituteDataApproach: "spts",
        byPassApproach: "null",
        beginDate: "1995-01-01 00",
        endTime: "1995-01-01 00",
        }
    ]
}

const monitoringMatsMethodsRes = 
{
    data: [
        {
        id: "CAMD-F4C326C9D8044324B83603C2FC0154B2",
        parameter: "co2",
        methodology: "ad",
        beginDate: "1995-01-01 00",
        endTime: "1995-01-01 00",
        },
        {
        id: "CAMD-F4C326C9D8044324B83603C2FC0154B2",
        parameter: "co2",
        methodology: "ad",
        beginDate: "1995-01-01 00",
        endTime: "1995-01-01 00",
        },
        {
        id: "CAMD-F4C326C9D8044324B83603C2FC0154B2",
        parameter: "co2",
        methodology: "ad",
        subsitituteDataApproach: "spts",
        byPassApproach: "null",
        beginDate: "1995-01-01 00",
        endTime: "1995-01-01 00",
    }
    ]
}