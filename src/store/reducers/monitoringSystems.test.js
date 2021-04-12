import monitoringSystemsReducer from "./monitoringSystems";
import * as actions from "../actions/monitoringSystems";

describe("Monitoring Methods Reducer State Update", () => {
  it("should update state with list of monitoring systems when passed LOAD_MONITORING_SYSTEMS_SUCCESS", () => {
    const initialState = {
      monitoringSystems: {
        systems: [],
        components: [],
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
  it("should update state with list of monitoring systems  components when passed LOAD_MONITORING_SYSTEMS_SUCCESS", () => {
    const initialState = {
      monitoringSystems: {
        systems: [],
        components: [],
      },
    };
    const monitoringSystemsComponents = [
      {
        id: "TWCORNEL5-1346D0289EF44F7A87B4ABF92CE501DC",
        monLocId: "6",
        componentTypeCode: "TEMP",
        basisCode: null,
        modelVersion: "RTT1SS-T1SA1-EN",
        manufacturer: "SCHNEIDER",
        serialNumber: "17301602",
        hgConverterInd: null,
        acquisitionMethodCode: "ORF",
        componentIdentifier: "AFF",
        beginDate: "2019-07-01",
        beginHour: "0",
        endDate: null,
        endHour: null,
        Active: true,
      },
      {
        id: "TWCORNEL5-15BBE0B7C475434887739E964E45EDD3",
        monLocId: "6",
        componentTypeCode: "TEMP",
        basisCode: null,
        modelVersion: "RTT1SS-T1SA1-EN",
        manufacturer: "SCHNEIDER",
        serialNumber: "17301603",
        hgConverterInd: null,
        acquisitionMethodCode: "ORF",
        componentIdentifier: "AFG",
        beginDate: "2019-07-01",
        beginHour: "0",
        endDate: null,
        endHour: null,
        Active: true,
      }
    ];
    const action = actions.loadMonitoringSystemsComponentsSuccess(monitoringSystemsComponents);
    const newState = monitoringSystemsReducer(
      initialState.monitoringSystemsComponents,
      action
    );
    expect(newState.components.length).toEqual(2);
  });
});
