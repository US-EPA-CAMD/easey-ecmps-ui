import * as types from "./actionTypes";

export function setCurrentTabIndex(currentTabIndex) {
  return {
    type: types.SET_CURRENT_TAB_INDEX,
    currentTabIndex,
  }
}