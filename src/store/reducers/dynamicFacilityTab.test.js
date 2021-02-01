import dynamicFacilityTabReducer from "./dynamicFacilityTab";
import * as actions from "../actions/dynamicFacilityTab";


describe("dynamicFacilityTab Reducer State Update", () => {
  it("should update state related to dynamicFacilityTab when passed addFacilityTab and removeFacilityTab", () => {
    const selectedFacility= "Berry";
    const selectedFacilityTabIndex = 1;
    const initialState = {
        openedFacilityTabs:[]
    };

    const addFacilityTabAction = actions.addFacilityTab(selectedFacility);
    const newState = dynamicFacilityTabReducer(initialState.openedFacilityTabs, addFacilityTabAction);
    expect(newState.length).toBe(1);

    const removeFacilityTabAction = actions.removeFacilityTab(selectedFacilityTabIndex);
    const updatedState = dynamicFacilityTabReducer(newState, removeFacilityTabAction);
    expect(updatedState.length).toBe(0);
  });
});
