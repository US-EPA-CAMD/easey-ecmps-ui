import { combineReducers } from "redux";
import facilitiesReducer from "./facilities";
import monitoringPlansReducer from "./monitoringPlans";
import monitoringMethodsReducer from "./monitoringMethods";
import apiStatusReducer from "./apiStatusReducer";
import dynamicFacilityTabReducer from "./dynamicFacilityTab";

const rootReducer = combineReducers({
  facilities: facilitiesReducer,
  apiCallsInProgress: apiStatusReducer,
  monitoringPlans: monitoringPlansReducer,
  monitoringMethods: monitoringMethodsReducer,
  openedFacilityTabs:dynamicFacilityTabReducer
});

export default rootReducer;
