import * as fs from "./monitoringPlanSystems";

describe("testing monitoring plan data selectors", () => {
  let selectedMonitoringSystems;
  let monitoringSystemsTableRecods;

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
  test("should generate data table records for monitoring methods", () => {
    expect(
      fs.getMonitoringPlansSystemsTableRecords(selectedMonitoringSystems)
    ).toEqual(monitoringSystemsTableRecods);
  });
});
