import { loadMonitoringSystems } from "./monitoringSystems";
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
const monitoringSystems = [
  {
    id: "CAMD-7903CC3112AF47F797D1F0E58EDB486E",
    monLocId: "5",
    systemType: "SO2",
    systemDesignationCode: "P",
    systemIdentifier: "AA1",
    fuelCode: "NFS",
    beginDate: "1993-10-01",
    endDate: "2019-06-30",
    beginHour: "0",
    endHour: "23",
  },
  {
    id: "CAMD-F0470799B81840DB81B5BBD810F9EE15",
    monLocId: "5",
    systemType: "NOX",
    systemDesignationCode: "P",
    systemIdentifier: "AA2",
    fuelCode: "NFS",
    beginDate: "1993-10-01",
    endDate: null,
    beginHour: "0",
    endHour: null,
  },
  {
    id: "CAMD-F5E1F18322AB4688982A8E4633001B12",
    monLocId: "5",
    systemType: "CO2",
    systemDesignationCode: "P",
    systemIdentifier: "AA3",
    fuelCode: "NFS",
    beginDate: "1993-10-01",
    endDate: "2019-06-30",
    beginHour: "0",
    endHour: "23",
  },
  {
    id: "CAMD-51F3958C85DE4A0BB7DA47F2D1EDE131",
    monLocId: "5",
    systemType: "FLOW",
    systemDesignationCode: "P",
    systemIdentifier: "AA4",
    fuelCode: "NFS",
    beginDate: "1993-10-01",
    endDate: "2019-06-30",
    beginHour: "0",
    endHour: "23",
  },
  {
    id: "CAMD-DDD452F9F99344048EFB96C42432C0ED",
    monLocId: "5",
    systemType: "OP",
    systemDesignationCode: "P",
    systemIdentifier: "AA5",
    fuelCode: "NFS",
    beginDate: "1993-10-01",
    endDate: "2018-10-02",
    beginHour: "0",
    endHour: "23",
  },
];

describe("Async Actions", () => {
  const mock = new MockAdapter(axios);
  // beforeEach(() => {
  //   mock.restore();
  // });
  const locationId = "5";

  describe("Load monitoring-systems Thunk", () => {
    test("should create BEGIN_MONITORING_SYSTEMS_API_CALL and LOAD_MONITORING_SYSTEMS_SUCCESS when loading monitoring systems", () => {
      mock
        .onGet(
          `${config.services.monitorPlans.uri}/monitor-locations/${locationId}/systems`
        )
        .reply(200, monitoringSystems);
      const expectedActions = [
        { type: types.BEGIN_MONITORING_SYSTEMS_API_CALL },
        { type: types.LOAD_MONITORING_SYSTEMS_SUCCESS, monitoringSystems },
      ];

      const store = mockStore({ monitoringSystems: [] });
      return store.dispatch(loadMonitoringSystems(locationId)).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });
  });
});
