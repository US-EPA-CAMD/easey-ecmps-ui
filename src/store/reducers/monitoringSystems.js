import * as types from "../actions/actionTypes";
import initialState from "./initialState";

const reducer = (state = initialState.monitoringSystems, action) => {
  let returnState;

  switch (action.type) {
    case types.LOAD_MONITORING_SYSTEMS_SUCCESS:
      returnState = Object.assign({}, state, {
        systems: action.monitoringSystems,
      });
      break;

    case types.LOAD_MONITORING_SYSTEMS_FUEL_FLOWS_SUCCESS:
      returnState = Object.assign({}, state, {
        fuelFlows: action.monitoringSystemsFuelFlows,
      });
      break;

    case types.LOAD_MONITORING_SYSTEMS_COMPONENTS_SUCCESS:
      returnState = Object.assign({}, state, {
        components: action.monitoringSystemsComponents,
      });
      break;

    default:
      returnState = state;
      break;
  }

  return returnState;
};

export default reducer;
