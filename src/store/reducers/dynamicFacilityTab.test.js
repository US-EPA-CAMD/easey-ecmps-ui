import dynamicFacilityTabReducer from "./dynamicFacilityTab";
import * as actions from "../actions/dynamicFacilityTab";
let initialState = {};
beforeAll(() => {
  initialState = {
    openedFacilityTabs: [
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
              links: [
                {
                  rel: "self",
                  href:
                    "https://easey-dev.app.cloud.gov/api/monitor-plan-mgmt/locations/6",
                },
                {
                  rel: "methods",
                  href:
                    "https://easey-dev.app.cloud.gov/api/monitor-plan-mgmt/locations/6/methods",
                },
                {
                  rel: "systems",
                  href:
                    "https://easey-dev.app.cloud.gov/api/monitor-plan-mgmt/locations/6/systems",
                },
                {
                  rel: "spans",
                  href:
                    "https://easey-dev.app.cloud.gov/api/monitor-plan-mgmt/locations/6/spans",
                },
              ],
            },
            {
              id: "7",
              name: "2",
              type: "Unit",
              active: true,
              retireDate: null,
              links: [
                {
                  rel: "self",
                  href:
                    "https://easey-dev.app.cloud.gov/api/monitor-plan-mgmt/locations/7",
                },
                {
                  rel: "methods",
                  href:
                    "https://easey-dev.app.cloud.gov/api/monitor-plan-mgmt/locations/7/methods",
                },
                {
                  rel: "systems",
                  href:
                    "https://easey-dev.app.cloud.gov/api/monitor-plan-mgmt/locations/7/systems",
                },
                {
                  rel: "spans",
                  href:
                    "https://easey-dev.app.cloud.gov/api/monitor-plan-mgmt/locations/7/spans",
                },
              ],
            },
            {
              id: "5",
              name: "CS0AAN",
              type: "Stack",
              active: true,
              retireDate: null,
              links: [
                {
                  rel: "self",
                  href:
                    "https://easey-dev.app.cloud.gov/api/monitor-plan-mgmt/locations/5",
                },
                {
                  rel: "methods",
                  href:
                    "https://easey-dev.app.cloud.gov/api/monitor-plan-mgmt/locations/5/methods",
                },
                {
                  rel: "systems",
                  href:
                    "https://easey-dev.app.cloud.gov/api/monitor-plan-mgmt/locations/5/systems",
                },
                {
                  rel: "spans",
                  href:
                    "https://easey-dev.app.cloud.gov/api/monitor-plan-mgmt/locations/5/spans",
                },
              ],
            },
          ],
          endReportPeriodId: null,
          active: true,
          links: [
            {
              rel: "self",
              href:
                "https://easey-dev.app.cloud.gov/api/monitor-plan-mgmt/monitor-plans/TWCORNEL5-C0E3879920A14159BAA98E03F1980A7A",
            },
          ],
        },
        inactive: [false, false],
      },
    ],
  };
});
describe("dynamicFacilityTab Reducer State Update", () => {
  it("should update state related to dynamicFacilityTab when passed addFacilityTab and removeFacilityTab", () => {
    const selectedFacility = "Berry";
    const selectedFacilityTabIndex = 1;


    let action = actions.addFacilityTab(selectedFacility);
    const newState = dynamicFacilityTabReducer(initialState.openedFacilityTabs, action);
    expect(newState.length).toBe(2);

    action = actions.removeFacilityTab(selectedFacilityTabIndex);
    const updatedState = dynamicFacilityTabReducer(newState, action);
    expect(updatedState.length).toBe(1);
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
      "Barry (1, 2, CS0AAN) "
    );
    const newLoc = dynamicFacilityTabReducer(
      initialState.openedFacilityTabs,
      setLocationSelectionState
    );
    expect(newLoc[0].location).toBeDefined();

    const setSectionSelectionState = actions.setSectionSelectionState(
      3,
      "Barry (1, 2, CS0AAN) "
    );
    const newSec = dynamicFacilityTabReducer(newLoc, setSectionSelectionState);
    expect(newSec[0].section).toBeDefined();

    const emptyLocs = dynamicFacilityTabReducer(
      initialState.openedFacilityTabs,
      { type: "empty" }
    );
    expect(emptyLocs).toBe(initialState.openedFacilityTabs);

     const setInactiveState = actions.setInactiveState(
    [false,false],
    "Barry (1, 2, CS0AAN) "
  );
  const newInactive = dynamicFacilityTabReducer(emptyLocs, setInactiveState);
  expect(newInactive[0].inactive).toBeDefined();

  const setCheckoutState = actions.setCheckoutState(
    true,
    "Barry (1, 2, CS0AAN) "
  );
  const newcheckout = dynamicFacilityTabReducer(newInactive, setCheckoutState);
  expect(newcheckout[0].checkout).toBeDefined();



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
      "Barry (1, 2, CS0A) "
    );
    const newLoc = dynamicFacilityTabReducer(
      initialState.openedFacilityTabs,
      setLocationSelectionState
    );
    expect(newLoc[0].location).toBeDefined();

    const setSectionSelectionState = actions.setSectionSelectionState(
      3,
      "Barry (1, 2, CS0N) "
    );
    const newSec = dynamicFacilityTabReducer(newLoc, setSectionSelectionState);
    expect(newSec[0].section).toBeDefined();

    const emptyLocs = dynamicFacilityTabReducer(
      initialState.openedFacilityTabs,
      { type: "empty" }
    );
    expect(emptyLocs).toBe(initialState.openedFacilityTabs);

     const setInactiveState = actions.setInactiveState(
    [false,false],
    "Barry (1, 2, CSAN) "
  );
  const newInactive = dynamicFacilityTabReducer(emptyLocs, setInactiveState);
  expect(newInactive[0].inactive).toBeDefined();

  const setCheckoutState = actions.setCheckoutState(
    true,
    "Barry (1, 2, CS0N) "
  );
  const newcheckout = dynamicFacilityTabReducer(newInactive, setCheckoutState);
  expect(newcheckout[0].checkout).toBeDefined();



  });
  it("empty state", () => {
    const setInactiveState = actions.setInactiveState(
      [false,false],
      "Barry (1, 2, CSAN) "
    );
    const newInactive = dynamicFacilityTabReducer({}, setInactiveState);
    expect(newInactive).not.toBeDefined();
  
    const setCheckoutState = actions.setCheckoutState(
      true,
      "Barry (1, 2, CS0N) "
    );
    const newcheckout = dynamicFacilityTabReducer({}, setCheckoutState);
    expect(newcheckout).not.toBeDefined();
  
    const emptyState = dynamicFacilityTabReducer(null, setCheckoutState);
    expect(emptyState).not.toBeDefined();
  
  });

});
