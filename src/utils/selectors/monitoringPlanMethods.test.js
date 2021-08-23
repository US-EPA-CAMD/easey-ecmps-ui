import * as fs from "./monitoringPlanMethods";

describe("testing monitoring plan data selectors", () => {
  let selectedMonitoringMethod;
  let monitoringMethdsTableRecods;
  let selectedMonitoringMatsMethod;
  let monitoringMatsMethdsTableRecods;

  beforeAll(() => {
    selectedMonitoringMethod = [
      {
        beginDate: "2019-07-01",
        beginHour: "0",
        bypassApproachCode: null,
        endDate: null,
        endHour: null,
        id: "TWCORNEL5-E87023808E5C43F18BD84AC8A9DCF332",
        monitoringMethodCode: "AD",
        parameterCode: "HI",
        substituteDataCode: "SPTS",
      },
      {
        beginDate: null,
        beginHour: null,
        bypassApproachCode: null,
        endDate: "2019-07-01",
        endHour: "0",
        id: "TWCORNEL5-E87023808E5C43F18BD84AC8A9DCF332",
        monitoringMethodCode: "AD",
        parameterCode: "HI",
        substituteDataCode: "SPTS",
      },
    ];

    monitoringMethdsTableRecods = [
      {
        col1: "HI",
        col2: "AD",
        col3: "SPTS",
        col4: null,
        col5: "07/01/2019 0",
        col6: " ",
        col7: "TWCORNEL5-E87023808E5C43F18BD84AC8A9DCF332",
      },
      {
        col1: "HI",
        col2: "AD",
        col3: "SPTS",
        col4: null,
        col5: " ",
        col6: "07/01/2019 0",
        col7: "TWCORNEL5-E87023808E5C43F18BD84AC8A9DCF332",
      },
    ];

    selectedMonitoringMatsMethod = [
      {
        id: "TAG182357-8F800321D1384A86BA068C39281AF76F",
        supplementalMATSParameterCode: "HCL",
        supplementalMATSMonitoringMethodCode: "QST",
        beginDate: "2016-04-16",
        beginHour: "0",
        endDate: null,
        endHour: null,
      },
      {
        id: "TAG182357-8F800321D1384A86BA068C39281AF76F",
        supplementalMATSParameterCode: "HCL",
        supplementalMATSMonitoringMethodCode: "QST",
        beginDate: null,
        beginHour: null,
        endDate: "2016-04-16",
        endHour: "0",
      },
    ];

    monitoringMatsMethdsTableRecods = [
      {
        col1: "HCL",
        col2: "QST",
        col3: "04/16/2016 0",
        col4: " ",
        col5: "TAG182357-8F800321D1384A86BA068C39281AF76F",
      },
      {
        col1: "HCL",
        col2: "QST",
        col3: " ",
        col4: "04/16/2016 0",
        col5: "TAG182357-8F800321D1384A86BA068C39281AF76F",
      },
    ];
  });
  test("should generate data table records for monitoring methods", () => {
    expect(
      fs.getMonitoringPlansMethodsTableRecords(selectedMonitoringMethod)
    ).toEqual(monitoringMethdsTableRecods);
  });

  test("should generate data table records for monitoring mats methods ", () => {
    expect(
      fs.getMonitoringPlansMatsMethodsTableRecords(selectedMonitoringMatsMethod)
    ).toEqual(monitoringMatsMethdsTableRecods);
  });
});
