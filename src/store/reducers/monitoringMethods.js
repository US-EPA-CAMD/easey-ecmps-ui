import { TabPane } from "react-bootstrap";
import { Switch } from "react-router";
import * as types from "../actions/actionTypes";
import initialState from "./initialState";

const reducer = (state = initialState.monitoringMethods, action) => {
  switch (action.type) {
    case types.LOAD_MONITORING_METHODS_SUCCESS:
      return Object.assign({}, state, { methods: action.monitoringMethods});
    case types.LOAD_MONITORING_MATSMETHODS_SUCCESS:
      return Object.assign({}, state, { matsMethods: action.monitoringMatsMethods});
    default:
      return state;
  }
};

export default reducer;
