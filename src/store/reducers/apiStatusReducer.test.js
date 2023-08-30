import apiStatusReducer from "./apiStatusReducer";
import * as actions from "../actions/apiStatusActions";
import { loadFacilitiesSuccess } from "../actions/facilities";
import { loadMonitoringPlansSuccess } from "../actions/monitoringPlans";
import initialState from "./initialState";

describe("apiStatus Reducer State Update", () => {
  // begin
  it("should update state related to apiStatus when passed beginFacilitiesApiCall", () => {
    const action = actions.beginFacilitiesApiCall();
    const newState = apiStatusReducer(initialState.apiCallsInProgress, action);
    expect(newState.facilities).toBe(true);
  });
  it("should update state related to apiStatus when passed beginMonitoringPlansApiCall", () => {
    const action = actions.beginMonitoringPlansApiCall();
    const newState = apiStatusReducer(initialState.apiCallsInProgress, action);
    expect(newState.monitoringPlans).toBe(true);
  });

  ///load
  it("should update state related to apiStatus when passed loadFacilitiesSuccess", () => {
    const action = loadFacilitiesSuccess([]);
    const newState = apiStatusReducer(initialState.apiCallsInProgress, action);
    expect(newState.facilities).toBe(false);
  });
  it("should update state related to apiStatus when passed loadMonitoringPlansSuccess", () => {
    const action = loadMonitoringPlansSuccess([]);
    const newState = apiStatusReducer(initialState.apiCallsInProgress, action);
    expect(newState.monitoringPlans).toBe(false);
  });

  it("passing in no action type and state for default case", () => {
    const newState = apiStatusReducer(null, {
      type: "",
    });
    expect(newState).toBe(initialState.apiCallsInProgress);
  });
});
