import {
  loadMonitoringPlans,
  loadMonitoringPlansArray,
} from "./monitoringPlans";
import * as types from "./actionTypes";
import axios from "axios";
import thunk from "redux-thunk";
import MockAdapter from "axios-mock-adapter";
import configureMockStore from "redux-mock-store";
import { cleanup } from '@testing-library/react';

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

describe("Async Actions", () => {
  const mock = new MockAdapter(axios);
  afterEach(cleanup);
  
  test("should create BEGIN_MONITORING_PLANS_API_CALL and LOAD_MONITORING_PLANS_SUCCESS when loading monitoring plans", async () => {
    const orisCode = 3;
    mock
      .onGet(`https://api.epa.gov/easey/dev/monitor-plan-mgmt/configurations?orisCodes=${orisCode}`)
      .reply(200, monitoringPlans);
    const expectedActions = [
      { type: types.BEGIN_MONITORING_PLANS_API_CALL },
      { type: types.LOAD_MONITORING_PLANS_SUCCESS, monitoringPlans },
    ];
    const store = mockStore({ monitoringPlans: [] });
    return store.dispatch(loadMonitoringPlans(orisCode)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });

  });

  test("should create BEGIN_MONITORING_PLANS_array_API_CALL and LOAD_MONITORING_PLANS_array_SUCCESS when loading monitoring plans", async () => {
    const orisCode = [3,5];
    mock
      .onGet(`https://api.epa.gov/easey/dev/monitor-plan-mgmt/configurations?orisCodes=${orisCode.join("|")}`)
      .reply(200, monitoringPlans);
    const expectedActions = [
      { type: types.BEGIN_MONITORING_PLANS_API_CALL },
      {
        type: types.LOAD_MONITORING_PLANS_ARRAY_SUCCESS,
        monitoringPlans,
        orisCode,
      },
    ];
    const store = mockStore({ monitoringPlans: [] });
    return store.dispatch(loadMonitoringPlansArray(orisCode)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
 
});

