import * as types from "../actions/actionTypes";
import initialState from "./initialState";

const reducer = (state = initialState.monitoringMethods, action) => {
  if (action.type === types.LOAD_MONITORING_METHODS_SUCCESS) {
    return Object.assign({}, state, { methods: action.monitoringMethods });
  } else if (action.type === types.LOAD_MONITORING_MATSMETHODS_SUCCESS) {
    return Object.assign({}, state, {
      matsMethods: action.monitoringMatsMethods,
    });
  } else {
    return state;
  }
};

export default reducer;
