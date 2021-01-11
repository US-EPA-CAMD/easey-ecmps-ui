
import * as types from "./actionTypes";

export function addDynamicTabs(facility) {
  return {
    type: types.ADD_DYNAMIC_TAB,
    facility,
  };
}
export function removeDynamicTabs(facility) {
  return {
    type: types.REMOVE_DYNAMIC_TAB,
    facility,
  };
}

}
