
import * as types from "./actionTypes";

export function addFacilityTab(facility) {
  return {
    type: types.ADD_FACILITY_TAB,
    facility,
  };
}
export function removeFacilityTab(facility) {
  return {
    type: types.REMOVE_FACILITY_TAB,
    facility,
  };
}
