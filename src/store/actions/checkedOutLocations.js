import * as types from "./actionTypes";

export function setCheckedOutLocations(checkedOutLocations) {
    return {
      type: types.SET_CHECKED_OUT_LOCATIONS,
      checkedOutLocations,
    }
  }