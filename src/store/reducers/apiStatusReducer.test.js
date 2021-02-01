import apiStatusReducer from "./apiStatusReducer";
import * as actions from "../actions/apiStatusActions";
import {loadFacilitiesSuccess} from "../actions/facilities"; 
import {loadMonitoringPlansSuccess} from "../actions/monitoringPlans";
import {loadMonitoringMethodsSuccess, loadMonitoringMatsMethodsSuccess} from "../actions/monitoringMethods";

describe("apiStatus Reducer State Update", () => {
    let initialState;
    beforeAll(() => {
        initialState = {
            apiCallsInProgress: {
                facilities: false,
                monitoringPlans: false,
                monitoringMethods: false,
                monitoringMatsMethods: false
              },
        };
    });

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
    it("should update state related to apiStatus when passed loadMonitoringMethodsSuccess", () => {
        const action = loadMonitoringMethodsSuccess([]);
        const newState = apiStatusReducer(initialState.apiCallsInProgress, action);
        expect(newState.monitoringMethods).toBe(false);
    });
    it("should update state related to apiStatus when passed loadMonitoringMatsMethodsSuccess", () => {
        const action = loadMonitoringMatsMethodsSuccess([]);
        const newState = apiStatusReducer(initialState.apiCallsInProgress, action);
        expect(newState.monitoringMatsMethods).toBe(false);
    });
});
