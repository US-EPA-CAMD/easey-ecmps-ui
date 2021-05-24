import * as types from "./actionTypes";

export function setActiveTab(orisCode, value) {
  return {
    type: types.SET_ACTIVE_TAB,
    orisCode,
    value,
  };
}
