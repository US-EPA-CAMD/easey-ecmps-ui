import * as types from "../actions/actionTypes";
import initialState from "./initialState";

const currentTabIndexReducer = (state, action) => {
  const currentState = state ? state : initialState.currentTabIndex;
  if (action.type === types.SET_CURRENT_TAB_INDEX) {
    return action.currentTabIndex;
  } else {
    return currentState;
  }
};

export default currentTabIndexReducer;
