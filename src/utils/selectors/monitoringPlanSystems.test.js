import * as fs from "./monitoringPlanSystems";

describe("testing monitoring plan data selectors", () => {
  let selectedMonitoringSystems;
  let monitoringSystemsTableRecods;
  let selectedMonitoringSystemsComponents;
  let monitoringSystemsComponentsTableRecods;
  let monitoringSystemsFuelFlowsTableRecods;
  let selectedMonitoringSystemsFuelFlow;
  beforeAll(() => {
    selectedMonitoringSystems = [
      {
        id: "CAMD-9FC097418E8D4A7D8841478FDFA6C46A",
        locationId: "3",
        maximumFuelFlowRateSourceCode: "SO2",
        systemDesignationCode: "P",
        monitoringSystemId: "ABF",
        systemFuelFlowUOMCode: "NFS",
        beginDate: "1993-10-01",
        endDate: "1993-10-01",
        beginHour: "0",
        endHour: "0",
      },
      {
        id: "CAMD-9FC097418E8D4A7D8841478FDFA6C46A",
        locationId: "3",
        maximumFuelFlowRateSourceCode: "SO2",
        systemDesignationCode: "P",
        monitoringSystemId: "ABF",
        systemFuelFlowUOMCode: "NFS",
        beginDate: null,
        endDate: null,
        beginHour: null,
        endHour: null,
      },
    ];

    selectedMonitoringSystemsComponents = [
      {
        id: "TWCORNEL5-1346D0289EF44F7A87B4ABF92CE501DC",
        locationId: "6",
        componentTypeCode: "TEMP",
        basisCode: null,
        modelVersion: "RTT1SS-T1SA1-EN",
        manufacturer: "SCHNEIDER",
        serialNumber: "17301602",
        hgConverterIndicator: null,
        sampleAcquisitionMethodCode: "ORF",
        //  locationId: "AFF",
        beginDate: null,
        beginHour: null,
        endDate: null,
        endHour: null,
        Active: true,
      },
      {
        id: "TWCORNEL5-15BBE0B7C475434887739E964E45EDD3",
        locationId: "6",
        componentTypeCode: "TEMP",
        basisCode: null,
        modelVersion: "RTT1SS-T1SA1-EN",
        manufacturer: "SCHNEIDER",
        serialNumber: "17301603",
        hgConverterIndicator: null,
        sampleAcquisitionMethodCode: "ORF",
        //  locationId: "AFG",
        beginDate: "2019-07-01",
        beginHour: "0",
        endDate: "2019-07-02",
        endHour: "0",
        Active: true,
      },
    ];

    selectedMonitoringSystemsFuelFlow = [
      {
        id: "TWCORNEL5-1346D0289EF44F7A87B4ABF92CE501DC",
        systemFuelFlowUOMCode: "ORF",
        maximumFuelFlowRateSourceCode: "AFF",
        beginDate: null,
        beginHour: null,
        endDate: null,
        endHour: null,
        Active: true,
      },
      {
        id: "TWCORNEL5-15BBE0B7C475434887739E964E45EDD3",
        systemFuelFlowUOMCode: "ORF",
        maximumFuelFlowRateSourceCode: "AFG",
        beginDate: "2019-07-01",
        beginHour: "0",
        endDate: "2019-07-02",
        endHour: "0",
        Active: true,
      },
    ];
    monitoringSystemsFuelFlowsTableRecods = [
      {
        col1: "ORF",
        col2: "AFF",
        col3: ":  ➜ Present",
        col4: "TWCORNEL5-1346D0289EF44F7A87B4ABF92CE501DC",
      },
      {
        col1: "ORF",
        col2: "AFG",
        col3: "07/01/2019: 0 ➜ 07/02/2019: 0",
        col4: "TWCORNEL5-15BBE0B7C475434887739E964E45EDD3",
      },
    ];
    monitoringSystemsComponentsTableRecods = [
      {
        col1: "AFF",
        col2: "TEMP",
        col3: ":  ➜ Present",
        col4: "TWCORNEL5-1346D0289EF44F7A87B4ABF92CE501DC",
      },
      {
        col1: "AFG",
        col2: "TEMP",
        col3: "07/01/2019: 0 ➜ 07/02/2019: 0",

        col4: "TWCORNEL5-15BBE0B7C475434887739E964E45EDD3",
      },
    ];
    monitoringSystemsTableRecods = [
      {
        col1: "ABF",
        col2: "SO2",
        col3: "P",
        col4: "NFS",
        col5: "10/01/1993 0",
        col6: "10/01/1993 0",
        col7: "CAMD-9FC097418E8D4A7D8841478FDFA6C46A",
      },
      {
        col1: "ABF",
        col2: "SO2",
        col3: "P",
        col4: "NFS",
        col5: " ",
        col6: " ",
        col7: "CAMD-9FC097418E8D4A7D8841478FDFA6C46A",
      },
    ];
  });
  test("should generate data table records for monitoring systems", () => {
    expect(
      fs.getMonitoringPlansSystemsTableRecords(selectedMonitoringSystems)
    ).toEqual(monitoringSystemsTableRecods);
  });

  test("should generate data table records for monitoring systems components", () => {
    expect(
      fs.getMonitoringPlansSystemsComponentsTableRecords(
        selectedMonitoringSystemsComponents
      )
    ).toEqual(monitoringSystemsComponentsTableRecods);
  });

  test("should generate data table records for monitoring systems fuel flow", () => {
    expect(
      fs.getMonitoringPlansSystemsFuelFlowsComponentsTableRecords(
        selectedMonitoringSystemsFuelFlow
      )
    ).toEqual(monitoringSystemsFuelFlowsTableRecods);
  });
});
