import {
  loadMonitoringPlans,
  loadMonitoringPlansSuccess,
} from "./monitoringPlans";
import * as types from "./actionTypes";
import axios from "axios";
import thunk from "redux-thunk";
import MockAdapter from "axios-mock-adapter";
import configureMockStore from "redux-mock-store";
import config from "../../config";

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

// describe("Async Actions", () => {
//   const mock = new MockAdapter(axios);
//   afterEach(() => {
//     mock.restore();
//   });
//   const orisCode = "3";

//   describe("Load monitoring-plans Thunk", () => {
//     it("should create BEGIN_MONITORING_PLANS_API_CALL and LOAD_MONITORING_PLANS_SUCCESS when loading monitoring plans", () => {
//       mock
//         .onGet(config.services.monitorPlans.uri + "?orisCode=" + orisCode)
//         .reply(200, monitoringPlans);
//       const expectedActions = [
//         { type: types.BEGIN_MONITORING_PLANS_API_CALL },
//         { type: types.LOAD_MONITORING_PLANS_SUCCESS, monitoringPlans },
//       ];

//       const store = mockStore({ monitoringPlans: [] });
//       return store.dispatch(loadMonitoringPlans(orisCode)).then(() => {
//         expect(store.getActions()).toEqual(expectedActions);
//       });
//     });
//   });
// });

describe("load monitoring plans success", () => {
  it("should create a LOAD_MONITORING_PLANS_SUCCESS action", () => {
    const expectedAction = {
      type: types.LOAD_MONITORING_PLANS_SUCCESS,
      monitoringPlans,
    };

    const action = loadMonitoringPlansSuccess(monitoringPlans);

    expect(action).toEqual(expectedAction);
  });
});
