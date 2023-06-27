import * as types from "./actionTypes";


export const setWorkspaceState = ( workspaceSection) => {
    return {
      type: types.SET_WORKSPACE,
      workspaceSection,
    };
  };
  