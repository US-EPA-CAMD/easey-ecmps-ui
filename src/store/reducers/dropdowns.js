import * as types from "../actions/actionTypes";
import initialState from "./initialState";

const reducer = (state, action) => {
  const currentState = state ? state : initialState.dropdowns;
  let returnObject;

  const dropdowns = {};
  dropdowns[`${action.section}`] = action.dropdowns;
  console.log('action',action,state)
  // to begin, set the current section property
  if (action.type === types.BEGIN_MDM_API_CALL) {
    return { ...currentState, currentSection: action.section };
  }
  // then, append newly loaded dropdowns into a copy of the current dropdowns object
  else if (action.type === types.LOAD_DROPDOWNS_SUCCESS) {
    returnObject = {
      ...currentState,
      ...dropdowns,
    };
  } else if (action.type === types.UPDATE_DROPDOWN_SUCCESS) {
    returnObject = {
      ...currentState,
      [`${action.workspaceSection}`]: currentState[
        `${action.workspaceSection}`
      ].map((x) =>
        x.name === action.title
          ? {
              ...x,
              inactive: action.inactive,
            }
          : x
      ),
    };
  }

  // otherwise, just keep old state
  else {
    returnObject = currentState;
  }
  return returnObject;
};

export default reducer;
