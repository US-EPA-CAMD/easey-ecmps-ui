import { combineReducers } from "redux";
import facilitiesReducer from "./facilities";
import apiStatusReducer from "./apiStatusReducer";

const rootReducer = combineReducers({
  facilities: facilitiesReducer,
  apiCallsInProgress: apiStatusReducer,
});

export default rootReducer;
