import * as types from "./actionTypes";

export function beginFacilitiesApiCall() {
  return { type: types.BEGIN_FACILITIES_API_CALL };
}
export function beginMonitoringPlansApiCall() {
  return { type: types.BEGIN_MONITORING_PLANS_API_CALL };
}
