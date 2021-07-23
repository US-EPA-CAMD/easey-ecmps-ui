import { combineReducers } from "redux";
import facilitiesReducer from "./facilities";
import monitoringPlansReducer from "./monitoringPlans";
import apiStatusReducer from "./apiStatusReducer";
import dynamicFacilityTabReducer from "./dynamicFacilityTab";
import activeTabReducer from "./activeTab";
const rootReducer = combineReducers({
  facilities: facilitiesReducer,
  apiCallsInProgress: apiStatusReducer,
  monitoringPlans: monitoringPlansReducer,
  openedFacilityTabs:dynamicFacilityTabReducer,
  activeTab: activeTabReducer,
});

export default rootReducer;
