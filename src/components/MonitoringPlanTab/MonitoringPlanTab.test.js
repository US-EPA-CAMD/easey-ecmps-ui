import React from "react";
import {
  MonitoringPlanTab,
  mapStateToProps,
  mapDispatchToProps,
} from "./MonitoringPlanTab";
import { render } from "@testing-library/react";
import { MONITORING_PLAN_STORE_NAME } from "../../additional-functions/workspace-section-and-store-names";
jest.mock("../../store/actions/dynamicFacilityTab");
import * as actions from "../../store/actions/dynamicFacilityTab";

// jest.mock("../../store/actions/activeTab");
// import * as activeTabCall from "../../store/actions/activeTab";
//testing redux connected component to mimic props passed as argument
import { Provider } from "react-redux";
import configureStore from "../../store/configureStore.dev";
const store = configureStore();
const axios = require("axios");
jest.mock("axios");

test("should render without throwing an error", async () => {
  const facilities = [
    { orisCode: 3, name: "Barry", state: "Alabama" },
    { orisCode: 8, name: "Gorgas", state: "Alabama" },
    { orisCode: 9, name: "Copper Station", state: "Washington" },
  ];
  const monitoringPlans = [
    {
      id: "6",
      name: "1",
      locations: [
        { id: "x", name: "location1" },
        { id: "y", name: "location2" },
      ],
    },
    { id: "7", name: "2" },
    { id: "8", name: "3" },
  ];

  const defaultProps = {
    orisCode: 5,
    selectedConfig: {
      id: "MDC-7C15B3D1B20542C3B54DD57F03A516E5",
      name: "110",
      locations: [
        {
          id: "65",
          name: "110",
          type: "Unit",
          active: false,
          retireDate: null,
        },
      ],
      endReportPeriodId: "24",
      active: false,
      unitStackConfigurations: [
        {
          id: "CAMD-18DD175CE7EF4256B78469865D84F576",
          unitId: "1",
          stackPipeId: "CS0AAN",
          unitRecordId: 1,
          stackPipeRecordId: "MDC-CCB8D6D0D4E34D24A99C01DCD14078DF",
          beginDate: "1995-01-01",
          endDate: null,
          userId: "PQA09Q1",
          addDate: "2009-02-20T14:57:04.000Z",
          updateDate: null,
          active: true,
        },
        {
          id: "CAMD-BCB0E6D124C947418397A19FD7B4FB77",
          unitId: "2",
          stackPipeId: "CS0AAN",
          unitRecordId: 2,
          stackPipeRecordId: "MDC-CCB8D6D0D4E34D24A99C01DCD14078DF",
          beginDate: "1995-01-01",
          endDate: null,
          userId: "PQA09Q1",
          addDate: "2009-02-20T14:57:04.000Z",
          updateDate: null,
          active: true,
        },
      ],
    },
    
    title: "( test ) ",
    locations: [],
    user: { firstName: "test" },
    checkout: false,

    tabs: [
      {
        orisCode: 1,
        name: "test",
        checkout: false,
        inactive: [false, true],

        section: [3, "Methods"],
        location: [0, "65"],
        selectedConfig: {
          id: "MDC-7C15B3D1B20542C3B54DD57F03A516E5",
          name: "110",
          locations: [
            {
              id: "65",
              name: "110",
              type: "Unit",
              active: false,
              retireDate: null,
            },
          ],
          active: false,
        },
      },
    ],
    resetTimer: jest.fn(),
    setExpired: jest.fn(),
    resetTimerFlag: jest.fn(),
    callApiFlag: jest.fn(),

    setActiveTab: jest.fn(),
    activeTab: [0],
    setSection: jest.fn(),
    setCheckout: jest.fn(),
    setLocation: jest.fn(),
    setInactive: jest.fn(),
    setMostRecentlyCheckedInMonitorPlanId: jest.fn(),
    setMostRecentlyCheckedInMonitorPlanIdForTab: jest.fn(),
    mostRecentlyCheckedInMonitorPlanIdForTab: [0],
    workspaceSection: MONITORING_PLAN_STORE_NAME,
  };
  axios.get.mockImplementation(() =>
    Promise.resolve({ status: 200, data: [] })
  );
  axios.get.mockImplementation(() =>
    Promise.resolve({ status: 200, data: [] })
  );
  const { container } = render(
    <Provider store={store}>
      <MonitoringPlanTab {...defaultProps} />
    </Provider>
  );
  expect(container).not.toBeUndefined();
});

test("mapDispatchToProps calls the appropriate action", async () => {
  // mock the 'dispatch' object
  const dispatch = jest.fn();
  const actionProps = mapDispatchToProps(dispatch);
  const state = store.getState();
  const stateProps = mapStateToProps(state);

  actionProps.setLocation();
  expect(actions.setLocationSelectionState).toHaveBeenCalled();
  actionProps.setSection();
  expect(actions.setSectionSelectionState).toHaveBeenCalled();
  // actionProps.setActiveTab();
  // expect(activeTabCall.setActiveTab).toHaveBeenCalled();
  actionProps.setInactive();
  expect(actions.setInactiveState).toHaveBeenCalled();
  actionProps.setCheckout();
  expect(actions.setCheckoutState).toHaveBeenCalled();
});
