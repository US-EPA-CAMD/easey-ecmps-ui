import * as fs from "./monitoringPlanFuelData";

describe("testing monitoring plan fuel data selectors", () => {
  let selectedMonitoringFuelData;
  let monitoringFuelDataTableRecods;

  beforeAll(() => {
    selectedMonitoringFuelData = [
      {
        id: "8",
        unitId: "3",
        fuelCode: "DSL",
        indicatorCode: "S",
        ozoneSeasonIndicator: null,
        demGCV: null,
        demSO2: null,
        beginDate: "1995-01-01",
        endDate: "2015-08-24",
        actualOrProjectCode: "A",
        sulfurContent: null,
        userId: "bvick",
        addDate: "2009-02-20",
        updateDate: "2015-10-22",
        active: false,
      },
      {
        id: "9",
        unitId: "3",
        fuelCode: "PNG",
        indicatorCode: "S",
        ozoneSeasonIndicator: 1,
        demGCV: null,
        demSO2: null,
        beginDate: null,
        endDate: "2015-08-24",
        actualOrProjectCode: "A",
        sulfurContent: null,
        userId: "bvick",
        addDate: "2009-02-20",
        updateDate: "2015-10-22",
        active: false,
      },
      {
        id: "7",
        unitId: "3",
        fuelCode: "C",
        indicatorCode: "P",
        ozoneSeasonIndicator: 0,
        demGCV: null,
        demSO2: null,
        beginDate: "1995-01-01",
        endDate: null,
        actualOrProjectCode: "A",
        sulfurContent: null,
        userId: "bvick",
        addDate: "2009-02-20",
        updateDate: "2015-10-22",
        active: false,
      },
    ];

    monitoringFuelDataTableRecods = [
      {
        col1: "DSL",
        col2: "S",
        col3: "No",
        col4: null,
        col5: null,
        col6: "1995-01-01",
        col7: "2015-08-24",
        col8: "8",
      },
      {
        col1: "PNG",
        col2: "S",
        col3: "Yes",
        col4: null,
        col5: null,
        col6: "",
        col7: "2015-08-24",
        col8: "9",
      },
      {
        col1: "C",
        col2: "P",
        col3: "No",
        col4: null,
        col5: null,
        col6: "1995-01-01",
        col7: "",
        col8: "7",
      },
    ];
  });
  test("should generate table records for monitoring fuel data", () => {
    expect(
      fs.getMonitoringPlansFuelDataRecords(selectedMonitoringFuelData)
    ).toEqual(monitoringFuelDataTableRecods);
  });
});
