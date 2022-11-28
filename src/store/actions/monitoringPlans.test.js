import {
  loadMonitoringPlans,
  loadMonitoringPlansSuccess,
  loadMonitoringPlansArraySuccess,
  loadMonitoringPlansArray,
} from "./monitoringPlans";
import * as types from "./actionTypes";
import axios from "axios";
import thunk from "redux-thunk";
import MockAdapter from "axios-mock-adapter";
import configureMockStore from "redux-mock-store";
import config from "../../config";
import { beginMonitoringPlansApiCall } from "./apiStatusActions";

// Test an async action
const middleware = [thunk];
const mockStore = configureMockStore(middleware);

// Mocked facilities returned data
const monitoringPlans = [
  {
    id: "MDC-DSF87364AD9879A8FDS7G",
    name: "1, 2, CS0AAN",
    locations: [
      {
        id: "BZ5461",
        name: "1",
        type: "Unit",
      },
      {
        id: "CZ5461",
        name: "2",
        type: "Unit",
      },
      {
        id: "DA5461",
        name: "CS0AAN",
        type: "StackPipe",
      },
    ],
  },
];




describe("LOAD_MONITORING_PLANS_SUCCESS ", () => {
   it("should create a LOAD_MONITORING_PLANS_SUCCESS action", () => {
    const expectedAction = {
      type: types.LOAD_MONITORING_PLANS_SUCCESS,
      monitoringPlans,
    };

    const action = loadMonitoringPlansSuccess(monitoringPlans);

    expect(action).toEqual(expectedAction);
  });
  });

  describe("LOAD_MONITORING_PLANS_array_SUCCESS", () => {
    let orisCode = 3;
  it("should create BEGIN_MONITORING_PLANS_array_API_CALL and LOAD_MONITORING_PLANS_array_SUCCESS when loading monitoring plans", () => {
    const expectedActions = [
      { type: types.BEGIN_MONITORING_PLANS_API_CALL },
      {
        type: types.LOAD_MONITORING_PLANS_ARRAY_SUCCESS,
        monitoringPlans,
        orisCode,
      },
    ];

    const action = [beginMonitoringPlansApiCall(), loadMonitoringPlansArraySuccess(monitoringPlans, orisCode)]

    expect(action).toEqual(expectedActions)
  });
  });


test("test file", () => {
  const val = 1;
  expect(val === 1);
});
