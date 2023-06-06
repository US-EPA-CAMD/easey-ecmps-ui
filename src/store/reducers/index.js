import { combineReducers } from "redux";
import facilitiesReducer from "./facilities";
import monitoringPlansReducer from "./monitoringPlans";
import apiStatusReducer from "./apiStatusReducer";
import dynamicFacilityTabReducer from "./dynamicFacilityTab";
import dropdownsReducer from "./dropdowns";
import checkedOutLocationsReducer from "./checkedOutLocations";
import currentTabIndexReducer from "./currentTabIndex";
import workspaceReducer from "./workspace";
const rootReducer = combineReducers({
  facilities: facilitiesReducer,
  apiCallsInProgress: apiStatusReducer,
  monitoringPlans: monitoringPlansReducer,
  openedFacilityTabs: dynamicFacilityTabReducer,
  dropdowns: dropdownsReducer,
  checkedOutLocations: checkedOutLocationsReducer,
  currentTabIndex: currentTabIndexReducer,
  workspaceState: workspaceReducer,
});

export default rootReducer;
