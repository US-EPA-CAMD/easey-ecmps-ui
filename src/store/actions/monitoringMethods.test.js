import {
    loadMonitoringMethods,
    loadMonitoringMatsMethods,
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
const monitoringMatsMethods = [
  {
	  "id": "CAMD-F4C326C9D8044324B83603C2FC0154B2",
    "parameter": "co2",
    "methodology": "ad",
    "beginDate": "1995-01-01 00",
    "endTime": "1995-01-01 00",
  }
	,
	{
	  "id": "TWCORNEL5-409EB09291144C14B2327FC63B413AAA",
    "parameter": "co2",
    "methodology": "ad",
    "beginDate": "1995-01-01 00",
    "endTime": "1995-01-01 00",
  }
];

  describe("Async Actions", () => {
    const mock = new MockAdapter(axios);
    // beforeEach(() => {
    //   mock.restore();
    // });
    const locationId = "8";

    describe("Load monitoring-methods Thunk", () => {
      test("should create BEGIN_MONITORING_METHODS_API_CALL and LOAD_MONITORING_METHODS_SUCCESS when loading monitoring methods", () => {
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
      test("should create BEGIN_MONITORING_MATSMETHODS_API_CALL and LOAD_MONITORING_MATSMETHODS_SUCCESS when loading monitoring supplemental mats methods", () => {
        mock
          .onGet(`${config.services.monitorPlans.uri}/monitor-locations/${locationId}/Supplemental-methods`)
          .reply(200, monitoringMatsMethods);
        const expectedActions = [
          { type: types.BEGIN_MONITORING_MATSMETHODS_API_CALL },
          { type: types.LOAD_MONITORING_MATSMETHODS_SUCCESS, monitoringMatsMethods },
        ];

        const store = mockStore({ monitoringMatsMethods: [] });
        return store.dispatch(loadMonitoringMatsMethods(locationId)).then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
      });
    });
  });

