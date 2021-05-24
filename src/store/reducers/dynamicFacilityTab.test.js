import dynamicFacilityTabReducer from "./dynamicFacilityTab";
import * as actions from "../actions/dynamicFacilityTab";


describe("dynamicFacilityTab Reducer State Update", () => {
  it("should update state related to dynamicFacilityTab when passed addFacilityTab and removeFacilityTab", () => {
    const selectedFacility= "Berry";
    const selectedFacilityTabIndex = 1;
    const initialState = {
        openedFacilityTabs:["test"]
    };

    const action = actions.addFacilityTab(selectedFacility);
    const newState = dynamicFacilityTabReducer(initialState, action);
    expect(newState.length).toBe(2);

    const action = actions.removeFacilityTab(selectedFacilityTabIndex);
    const updatedState = dynamicFacilityTabReducer(newState, action);
    expect(updatedState.length).toBe(1);
  });
});

describe("dynamicFacilityTab Reducer State Adding with data", () => {
  it("should add a new tab with data ", () => {
    const selectedFacility=  {orisCode:7, name: 'test',configuration:0,location:[0,0],section:1,locations:[],monitoringPlans:[],inactive:false};
    const initialState = {
        openedFacilityTabs:[]
    };

    const setConfigurationSelectionState = actions.setConfigurationSelectionState(1,7);
    const newCong = dynamicFacilityTabReducer(initialState, setConfigurationSelectionState);
    console.log('THIS IS NEW CONG',newCong)
    expect(newCong[0].configuration).toBe(1);

    const setLocationSelectionState = actions.setLocationSelectionState([2,1],7);
    const newLoc = dynamicFacilityTabReducer(newCong, setLocationSelectionState);
    expect(newLoc[0].location).toBe([2,1]);

    const setSectionSelectionState = actions.setSectionSelectionState(3,7);
    const newSec = dynamicFacilityTabReducer(newLoc, setSectionSelectionState);
    expect(newSec[0].section).toBe(3);

    const setInactiveToggle = actions.setInactiveToggle(7,true);
    const newTog = dynamicFacilityTabReducer(newSec, setInactiveToggle);
    expect(newSec[0].inactive).toBe(true);


    const setLocationsState = actions.setLocationsState([1],7);
    const newLocs = dynamicFacilityTabReducer(newTog, setLocationsState);
    expect(newSec[0].locations).toBe([1]);

    const setMonitoringPlan = actions.setMonitoringPlan([5],true);
    const newMP = dynamicFacilityTabReducer(newLocs, setMonitoringPlan);
    expect(newMP[0].location).toBe([5]);

  });
});
