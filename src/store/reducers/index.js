import { combineReducers } from "redux";
import facilitiesReducer from "./facilities";
import monitoringPlansReducer from "./monitoringPlans";
import apiStatusReducer from "./apiStatusReducer";
import dynamicFacilityTabReducer from "./dynamicFacilityTab";
import activeTabReducer from "./activeTab";
import dropdownsReducer from "./dropdowns";
const rootReducer = combineReducers({
  facilities: facilitiesReducer,
  apiCallsInProgress: apiStatusReducer,
  monitoringPlans: monitoringPlansReducer,
  openedFacilityTabs: dynamicFacilityTabReducer,
  activeTab: activeTabReducer,
  dropdowns: dropdownsReducer,
});

export default rootReducer;
