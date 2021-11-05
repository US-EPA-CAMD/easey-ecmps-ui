import * as fs from "./monitoringPlanUnitCapacity";

describe("testing unit controls data selectors", () => {
  let selectedUnitCapacities;
  let unitCapacitiesTableRecords;
  beforeAll(() => {
    selectedUnitCapacities = [
      {
        unitId: 1,
        maximumHourlyHeatInputCapacity: "0",
        beginDate: "2006-05-01",
        endDate: undefined,
        id: "CAMD-9FC097418E8D4A7D8841478FDFA6C46A",
      },
      {
        unitId: 1,
        maximumHourlyHeatInputCapacity: "0",
        beginDate: "2006-05-01",
        endDate: undefined,
        id: "CAMD-9FC097418E8D4A7D8841478FDFA6C46B",
      },
    ];

    unitCapacitiesTableRecords = [
      {
        col1: "",
        col2: "",
        col3: "",
        col4: "",
        col5: "",
        col6: "0",
        col7: "05/01/2006 ",
        col8: " ",
        col9: "CAMD-9FC097418E8D4A7D8841478FDFA6C46A",
      },
      {
        col1: "",
        col2: "",
        col3: "",
        col4: "",
        col5: "",
        col6: "0",
        col7: "05/01/2006 ",
        col8: " ",
        col9: "CAMD-9FC097418E8D4A7D8841478FDFA6C46B",
      },
    ];
  });

  test("should generate data table records for unit capacities", () => {
    expect(
      fs.getMonitoringPlansUnitCapacityRecords(selectedUnitCapacities)
    ).toEqual(unitCapacitiesTableRecords);
  });
});
