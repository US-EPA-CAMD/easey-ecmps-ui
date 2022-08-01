import * as fs from "./monitoringPlanLoads";

describe("testing monitoring plan data selectors", () => {
  let selectedMonitoringLoads;
  let monitoringLoadsTableRecods;

  beforeAll(() => {
    selectedMonitoringLoads = [
      {
        id: "CAMD-F636C6512A7B4C82AAD4E9250FB1C614",
        locationId: "6",
        loadAnalysisDate: null,
        beginDate: "1995-01-01",
        beginHour: "0",
        endDate: null,
        endHour: null,
        maximumLoadValue: "180",
        secondNormalIndicator: null,
        upperOperationBoundary: null,
        lowerOperationBoundary: null,
        normalLevelCode: null,
        secondLevelCode: null,
        userId: "PQA09Q1",
        addDate: "2009-02-20",
        updateDate: null,
        maximumLoadUnitsOfMeasureCode: "MW",
        active: true,
      },

      {
        id: "TWCORNEL5-AD2B0B892412401B8E30A44AAAE04D57",
        locationId: "5",
        loadAnalysisDate: "2019-04-01",
        beginDate: "2019-04-01",
        beginHour: "0",
        endDate: null,
        endHour: null,
        maximumLoadValue: "170",
        secondNormalIndicator: 0,
        upperOperationBoundary: "125",
        lowerOperationBoundary: "50",
        normalLevelCode: "L",
        secondLevelCode: "H",
        userId: "zma",
        addDate: "2019-07-10",
        updateDate: null,
        maximumLoadUnitsOfMeasureCode: "MW",
        active: true,
      },

      {
        id: "TWCORNEL5-AD2B0B892412401B8E30A44AAAE04D57",
        locationId: "5",
        loadAnalysisDate: "2019-04-01",
        beginDate: null,
        beginHour: null,
        endDate: "2019-04-01",
        endHour: "0",
        maximumLoadValue: "170",
        secondNormalIndicator: 1,
        upperOperationBoundary: "125",
        lowerOperationBoundary: "50",
        normalLevelCode: "select",
        secondLevelCode: "select",
        userId: "zma",
        addDate: "2019-07-10",
        updateDate: null,
        maximumLoadUnitsOfMeasureCode: "select",
        active: true,
      },
    ];

    monitoringLoadsTableRecods = [
      {
        col1: "180",
        col2: "MW",
        col3: null,
        col4: null,
        col5: null,
        col6: null,
        col7: "",
        col8: "",
        col9: "01/01/1995 0",
        col10: " ",
        col11: "CAMD-F636C6512A7B4C82AAD4E9250FB1C614",
      },
      {
        col1: "170",
        col2: "MW",
        col3: "50",
        col4: "125",
        col5: "L",
        col6: "H",
        col7: "No",
        col8: "04/01/2019",
        col9: "04/01/2019 0",
        col10: " ",
        col11: "TWCORNEL5-AD2B0B892412401B8E30A44AAAE04D57",
      },
      {
        col1: "170",
        col2: null,
        col3: "50",
        col4: "125",
        col5: null,
        col6: null,
        col7: "Yes",
        col8: "04/01/2019",
        col9: " ",
        col10: "04/01/2019 0",
        col11: "TWCORNEL5-AD2B0B892412401B8E30A44AAAE04D57",
      },
    ];
  });
  test("should generate data table records for monitoring loads", () => {
    expect(
      fs.getMonitoringPlansLoadsTableRecords(selectedMonitoringLoads)
    ).toEqual(monitoringLoadsTableRecods);
  });
});
