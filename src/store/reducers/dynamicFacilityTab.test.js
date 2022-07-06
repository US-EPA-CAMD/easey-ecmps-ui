import dynamicFacilityTabReducer from "./dynamicFacilityTab";
import * as actions from "../actions/dynamicFacilityTab";
import { MONITORING_PLAN_STORE_NAME } from "../../additional-functions/workspace-section-and-store-names";
let initialState = {};
beforeAll(() => {
  initialState = {
    openedFacilityTabs: { monitoringPlans :[
      {
        orisCode: "3",
        checkout: false,
        name: "Barry (1, 2, CS0AAN) ",
        location: [0, "6"],
        section: [3, "Methods"],
        selectedConfig: {
          id: "TWCORNEL5-C0E3879920A14159BAA98E03F1980A7A",
          name: "1, 2, CS0AAN",
          locations: [
            {
              id: "6",
              name: "1",
              type: "Unit",
              active: true,
              retireDate: null,
            },
            {
              id: "7",
              name: "2",
              type: "Unit",
              active: true,
              retireDate: null,
            },
            {
              id: "5",
              name: "CS0AAN",
              type: "Stack",
              active: true,
              retireDate: null,

            },
          ],
          endReportPeriodId: null,
          active: true,
          links: [
            {
              rel: "self",
              href: "https://easey-dev.app.cloud.gov/api/monitor-plan-mgmt/monitor-plans/TWCORNEL5-C0E3879920A14159BAA98E03F1980A7A",
            },
          ],
        },
        inactive: [false, false],
      },
    ]}
  };
});
describe("dynamicFacilityTab Reducer State Update", () => {
  it("should update state related to dynamicFacilityTab when passed addFacilityTab and removeFacilityTab", () => {
    const selectedFacility = "Berry";
    const selectedFacilityTabIndex = 1;

    let action = actions.addFacilityTab(selectedFacility,'monitoringPlans');
    const newState = dynamicFacilityTabReducer(
      initialState.openedFacilityTabs,
      action
    );
    expect(newState).toBeDefined();

    action = actions.removeFacilityTab(selectedFacilityTabIndex,'monitoringPlans');
    const updatedState = dynamicFacilityTabReducer(newState, action);
    expect(updatedState).toBeDefined();
  });
});

describe("dynamicFacilityTab Reducer State Adding with data", () => {
  it("should add a new tab with data ", () => {
    const selectedFacility = {
      orisCode: 7,
      name: "test",
      location: [0, 0],
      section: 1,
      locations: [],
    };

    const setLocationSelectionState = actions.setLocationSelectionState(
      [2, 1],
      "Barry (1, 2, CS0AAN) ",
      MONITORING_PLAN_STORE_NAME
    );
    const newLoc = dynamicFacilityTabReducer(
      initialState.openedFacilityTabs,
      setLocationSelectionState
    );
    expect(newLoc).toBeDefined();

    const setSectionSelectionState = actions.setSectionSelectionState(
      3,
      "Barry (1, 2, CS0AAN) ",
      MONITORING_PLAN_STORE_NAME
    );
    const newSec = dynamicFacilityTabReducer(newLoc, setSectionSelectionState);
    expect(newSec).toBeDefined();

    const emptyLocs = dynamicFacilityTabReducer(
      initialState.openedFacilityTabs,
      { type: "empty" }
    );
    expect(emptyLocs).toBe(initialState.openedFacilityTabs);

    const setInactiveState = actions.setInactiveState(
      [false, false],
      "Barry (1, 2, CS0AAN) ",
      MONITORING_PLAN_STORE_NAME
    );
    const newInactive = dynamicFacilityTabReducer(emptyLocs, setInactiveState);
    expect(newInactive).toBeDefined();

    const setCheckoutState = actions.setCheckoutState(
      true,
      "TWCORNEL5-C0E3879920A14159BAA98E03F1980A7A",
      MONITORING_PLAN_STORE_NAME
    );
    const newcheckout = dynamicFacilityTabReducer(
      newInactive,
      setCheckoutState
    );
    expect(newcheckout).toBeDefined();
  });
});

describe("dynamicFacilityTab Reducer State checking false conditional", () => {
  it("testing x.name === action.title ", () => {
    const selectedFacility = {
      orisCode: 7,
      name: "test",
      location: [0, 0],
      section: 1,
      locations: [],
    };

    const setLocationSelectionState = actions.setLocationSelectionState(
      [2, 1],
      "Barry (1, 2, CS0A) ",
      MONITORING_PLAN_STORE_NAME
    );
    const newLoc = dynamicFacilityTabReducer(
      initialState.openedFacilityTabs,
      setLocationSelectionState
    );
    expect(newLoc).toBeDefined();

    const setSectionSelectionState = actions.setSectionSelectionState(
      3,
      "Barry (1, 2, CS0N) ",
      MONITORING_PLAN_STORE_NAME
    );
    const newSec = dynamicFacilityTabReducer(newLoc, setSectionSelectionState);
    expect(newSec).toBeDefined();

    const emptyLocs = dynamicFacilityTabReducer(
      initialState.openedFacilityTabs,
      { type: "empty" }
    );
    expect(emptyLocs).toBe(initialState.openedFacilityTabs);

    const setInactiveState = actions.setInactiveState(
      [false, false],
      "Barry (1, 2, CSAN) ",
      MONITORING_PLAN_STORE_NAME
    );
    const newInactive = dynamicFacilityTabReducer(emptyLocs, setInactiveState);
    expect(newInactive).toBeDefined();

    const setCheckoutState = actions.setCheckoutState(
      true,
      "Barry (1, 2, CS0N) ",
      MONITORING_PLAN_STORE_NAME
    );
    const newcheckout = dynamicFacilityTabReducer(
      newInactive,
      setCheckoutState
    );
    expect(newcheckout).toBeDefined();
  });
  it("empty state", () => {
    const setInactiveState = actions.setInactiveState(
      [false, false],
      "Barry (1, 2, CS0AAN) ",
      MONITORING_PLAN_STORE_NAME
    );
    const newInactive = dynamicFacilityTabReducer(initialState.openedFacilityTabs, setInactiveState);
    expect(newInactive).toBeDefined();

    const setCheckoutState = actions.setCheckoutState(
      true,
      "Barry (1, 2, CS0AAN) ",
      MONITORING_PLAN_STORE_NAME
    );
    const newcheckout = dynamicFacilityTabReducer(initialState.openedFacilityTabs, setCheckoutState);
    expect(newcheckout).toBeDefined();

    const emptyState = dynamicFacilityTabReducer(initialState.openedFacilityTabs, setCheckoutState);
    expect(emptyState).toBeDefined();
  });
});
