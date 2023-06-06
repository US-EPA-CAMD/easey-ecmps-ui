import * as types from "../actions/actionTypes";
import initialState from "./initialState";

const workspaceReducer = (state, action) => {
  const currentState = state ? state : initialState.workspaceState;
  if (action.type === types.SET_WORKSPACE) {
    return action.workspaceSection;
  } else {
    return currentState;
  }
};

export default workspaceReducer;
