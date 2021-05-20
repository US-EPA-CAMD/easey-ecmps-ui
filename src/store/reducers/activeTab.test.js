import activeTabReducer from "../actions/actionTypes";
import * as actionsTypes from "../actions/actionTypes";
import dynamicFacilityTabReducer from "../actions/dynamicFacilityTab";
import * as actions from "../actions/dynamicFacilityTab";


describe("setting active tab ", () => {
  it("should update state to be 1 ", () => {
    const selectedFacility=  {orisCode:7, name: 'test',configuration:0,location:[0,0],section:1,locations:[],monitoringPlans:[],inactive:false};
  
    const initialState = {
        openedFacilityTabs:[{orisCode:1, name: 'test',configuration:0,location:[0,0],section:1,locations:[],monitoringPlans:[],inactive:false}]
    };

    const addFacilityTabAction = actions.addFacilityTab(selectedFacility);
    let newState = dynamicFacilityTabReducer(initialState, addFacilityTabAction);


    const setActiveTab = actionsTypes.setActiveTab(1,1);
    const active = activeTabReducer(newState, setActiveTab);
    expect(active[1]).toBe(1);
  });
});
