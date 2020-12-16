import { combineReducers } from "redux";
import facilitiesReducer from "./facilities";
import monitoringPlansReducer from "./monitoringPlans";
import monitoringMethodsReducer from "./monitoringMethods";
import apiStatusReducer from "./apiStatusReducer";

const rootReducer = combineReducers({
  facilities: facilitiesReducer,
  apiCallsInProgress: apiStatusReducer,
  monitoringPlans: monitoringPlansReducer,
  monitoringMethods: monitoringMethodsReducer
});

export default rootReducer;
