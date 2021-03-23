import monitoringSystemsReducer from "./monitoringSystems";
import * as actions from "../actions/monitoringSystems";

describe("Monitoring Methods Reducer State Update", () => {
  it("should update state with list of monitoring methods when passed LOAD_MONITORING_SYSTEMS_SUCCESS", () => {
    const initialState = {
      monitoringSystems: {
        systems: [],
      },
    };
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
    ];
    const action = actions.loadMonitoringSystemsSuccess(monitoringSystems);
    const newState = monitoringSystemsReducer(
      initialState.monitoringSystems,
      action
    );
    expect(newState.systems.length).toEqual(3);
  });
});
