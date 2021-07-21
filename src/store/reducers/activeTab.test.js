import activeTabReducer from "../reducers/activeTab";
import * as actionsTypes from "../actions/activeTab";


describe("setting active tab ", () => {
  it("should update state to be 1 ", () => {


    const setActiveTab = actionsTypes.setActiveTab(1,1);
    const active = activeTabReducer( [0],setActiveTab);
    expect(active[0]).toBe(1);
  });

  it("testing no state passed in ", () => {


    const setActiveTab = actionsTypes.setActiveTab(1,1);
    const active = activeTabReducer( null,setActiveTab);
    expect(active[1]).not.toBeDefined();
  });

  it("testing not active_tab type passed in  ", () => {


    const setActiveTab = actionsTypes.setActiveTab(1,1);
    const active = activeTabReducer( null,{type:''});
    expect(active[1]).not.toBeDefined();
  });
});
