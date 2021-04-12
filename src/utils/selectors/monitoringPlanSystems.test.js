import * as fs from "./monitoringPlanSystems";

describe("testing monitoring plan data selectors", () => {
  let selectedMonitoringSystems;
  let monitoringSystemsTableRecods;
  let selectedMonitoringSystemsComponents;
  let monitoringSystemsComponentsTableRecods;
  beforeAll(() => {
    selectedMonitoringSystems = [
      {
        id: "CAMD-9FC097418E8D4A7D8841478FDFA6C46A",
        monLocId: "3",
        systemType: "SO2",
        systemDesignationCode: "P",
        systemIdentifier: "ABF",
        fuelCode: "NFS",
        beginDate: "1993-10-01",
        endDate: "1993-10-01",
        beginHour: "0",
        endHour: "0",
      },
      {
        id: "CAMD-9FC097418E8D4A7D8841478FDFA6C46A",
        monLocId: "3",
        systemType: "SO2",
        systemDesignationCode: "P",
        systemIdentifier: "ABF",
        fuelCode: "NFS",
        beginDate: null,
        endDate: null,
        beginHour: null,
        endHour: null,
      },
    ];

    selectedMonitoringSystemsComponents = [
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
        endDate: "2019-07-02",
        endHour: "0",
        Active: true,
      }
    ];
    monitoringSystemsComponentsTableRecods = [
      {
        col1: "AFF",
        col2: "TEMP",
        col3: "07/01/2019: 0 → Present",
      },
      {
        col1: "AFG",
        col2: "TEMP",
        col3: "07/01/2019: 0 → 07/02/2019: 0",
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
      },
      {
        col1: "ABF",
        col2: "SO2",
        col3: "P",
        col4: "NFS",
        col5: " ",
        col6: " ",
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
      fs.getMonitoringPlansSystemsComponentsTableRecords(selectedMonitoringSystemsComponents)
    ).toEqual(monitoringSystemsComponentsTableRecods);
  });
});
