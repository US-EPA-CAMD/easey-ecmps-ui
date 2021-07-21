import apiStatusReducer from "./apiStatusReducer";
import * as actions from "../actions/apiStatusActions";
import { loadFacilitiesSuccess } from "../actions/facilities";
import { loadMonitoringPlansSuccess } from "../actions/monitoringPlans";

describe("apiStatus Reducer State Update", () => {
  let initialState;
  beforeAll(() => {
    initialState = {
      apiCallsInProgress: {
        facilities: false,
        monitoringPlans: false,
        monitoringSystemsComponents: false,
      },
    };
  });
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
  it("should update state related to apiStatus when passed beginMonitoringMethodsApiCall", () => {
    const action = actions.beginMonitoringMethodsApiCall();
    const newState = apiStatusReducer(initialState.apiCallsInProgress, action);
    expect(newState.monitoringMethods).toBe(true);
  });
  it("should update state related to apiStatus when passed beginMonitoringMatsMethodsApiCall", () => {
    const action = actions.beginMonitoringMatsMethodsApiCall();
    const newState = apiStatusReducer(initialState.apiCallsInProgress, action);
    expect(newState.monitoringMatsMethods).toBe(true);
  });
  it("should update state related to apiStatus when passed beginMonitoringSystemsApiCall", () => {
    const action = actions.beginMonitoringSystemsApiCall();
    const newState = apiStatusReducer(initialState.apiCallsInProgress, action);
    expect(newState.monitoringSystems).toBe(true);
  });
  it("should update state related to apiStatus when passed beginMonitoringSystemsComponentsApiCall", () => {
    const action = actions.beginMonitoringSystemsComponentsApiCall();
    const newState = apiStatusReducer(initialState.apiCallsInProgress, action);
    expect(newState.monitoringSystemsComponents).toBe(true);
  });
  ///load
  it("should update state related to apiStatus when passed loadFacilitiesSuccess", () => {
    const action = loadFacilitiesSuccess([]);
    const newState = apiStatusReducer(initialState.apiCallsInProgress, action);
    expect(newState.facilities).toBe(false);
  });t
  it("should update state related to apiStatus when passed loadMonitoringPlansSuccess", () => {
    const action = loadMonitoringPlansSuccess([]);
    const newState = apiStatusReducer(initialState.apiCallsInProgress, action);
    expect(newState.monitoringPlans).toBe(false);
  });
  

  it("passing in no action.type for default case", () => {
    const newState = apiStatusReducer(initialState.apiCallsInProgress, {
      type: "",
    });
    expect(newState.monitoringSystemsComponents).toBe(false);
  });

  it("passing in no state", () => {
    const newState = apiStatusReducer(null, {
      type: "",
    });
    expect(newState.monitoringSystemsComponents).toBe(false);
  });
});
