import * as fs from "./monitoringPlanUnitCapacity";

describe("testing unit controls data selectors", () => {
  let selectedUnitCapacities;
  let unitCapacitiesTableRecords;
  beforeAll(() => {
    selectedUnitCapacities = [
      {
        id: "30334",
        unitId: "1",
        commercialOperationDate: "1954-02-12",
        operationDate: "1954-02-11",
        boilerTurbineType: "T",
        boilerTurbineBeginDate: "1954-02-11",
        boilerTurbineEndDate: "1954-02-11",
        maximumHourlyHeatInputCapacity: "2322.0",
        beginDate: "2002-10-31",
        endDate: "2002-10-31",
      },
      {
        id: "30334",
        unitId: "1",
        commercialOperationDate: null,
        operationDate: null,
        boilerTurbineType: "T",
        boilerTurbineBeginDate: null,
        boilerTurbineEndDate: null,
        maximumHourlyHeatInputCapacity: "2322.0",
        beginDate: null,
        endDate: null,
      },
    ];

    unitCapacitiesTableRecords = [
      {
        col1: "1954-02-12",
        col2: "1954-02-11",
        col3: "T",
        col4: "1954-02-11",
        col5: "1954-02-11",
        col6: "2322.0",
        col7: "2002-10-31",
        col8: "2002-10-31",
        col9: "30334",
      },

      {
        col1: "",
        col2: "",
        col3: "T",
        col4: "",
        col5: "",
        col6: "2322.0",
        col7: "",
        col8: "",
        col9: "30334",
      },
    ];
  });

  test("should generate data table records for unit capacities", () => {
    expect(
      fs.getMonitoringPlansUnitCapacityRecords(selectedUnitCapacities)
    ).toEqual(unitCapacitiesTableRecords);
  });
});
