import * as types from "../actions/actionTypes";
import initialState from "./initialState";

const reducer = (state, action) => {
  const currentState = state ? state : initialState.activeTab;
  if (action.type === types.SET_ACTIVE_TAB) {
    return {
      ...currentState,
      [`${action.workspaceSection}`]: [action.value],
    };
  } else {
    return currentState;
  }
};

export default reducer;
