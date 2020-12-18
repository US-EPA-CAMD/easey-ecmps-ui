import {
    loadMonitoringMethods,
    loadMonitoringMethodsSuccess,
  } from "./monitoringMethods";
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
  const monitoringMethods = [
    {
    id: "CAMD-F4C326C9D8044324B83603C2FC0154B2",
    parameter: "co2",
    methodology: "ad",
    subsitituteDataApproach: "spts",
    byPassApproach: "null",
    beginDate: "1995-01-01 00",
    endTime: "1995-01-01 00",
    },
    {
    id: "CAMD-F4C326C9D8044324B83603C2FC0154B2",
    parameter: "co2",
    methodology: "ad",
    subsitituteDataApproach: "spts",
    byPassApproach: "null",
    beginDate: "1995-01-01 00",
    endTime: "1995-01-01 00",
    },
    {
    id: "CAMD-F4C326C9D8044324B83603C2FC0154B2",
    parameter: "co2",
    methodology: "ad",
    subsitituteDataApproach: "spts",
    byPassApproach: "null",
    beginDate: "1995-01-01 00",
    endTime: "1995-01-01 00",
    }
];

  describe("Async Actions", () => {
    const mock = new MockAdapter(axios);
    afterEach(() => {
      mock.restore();
    });
    const locationId = "5887";

    describe("Load monitoring-methods Thunk", () => {
      it("should create BEGIN_MONITORING_METHODS_API_CALL and LOAD_MONITORING_METHODS_SUCCESS when loading monitoring methods", () => {
        mock
          .onGet(`${config.services.monitorPlans.uri}/monitor-locations/${locationId}/methods`)
          .reply(200, monitoringMethods);
        const expectedActions = [
          { type: types.BEGIN_MONITORING_METHODS_API_CALL },
          { type: types.LOAD_MONITORING_METHODS_SUCCESS, monitoringMethods },
        ];

        const store = mockStore({ monitoringMethods: [] });
        return store.dispatch(loadMonitoringMethods(locationId)).then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
      });
    });
  });

