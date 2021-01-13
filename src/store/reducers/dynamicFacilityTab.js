import * as types from "../actions/actionTypes";
import initialState from "./initialState";

const reducer = (state = initialState.openedFacilityTabs, action) => {
  if (action.type === types.ADD_FACILITY_TAB) {
    return (state = [...state, action.facility]);
  }
  
  else if (action.type === types.REMOVE_FACILITY_TAB) {
    return state.filter(
      (facility) => state.indexOf(facility) !== action.facility - 1
    );
  } 

  else {
    return state;
  }
};

export default reducer;
