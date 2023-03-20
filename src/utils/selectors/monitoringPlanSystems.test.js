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
        id: "TWCORNEL5-5BCFD5B414474E1083A77A6B33A2F13D",
        locationId: "6",
        monitoringSystemId: "AF1",
        systemTypeCode: "GAS",
        systemDesignationCode: "P",
        fuelCode: "PNG",
        beginDate: "2019-07-01",
        endDate: "2019-07-01",
        beginHour: "0",
        endHour: "0",
        userId: "bvick",
        addDate: "2019-10-07",
        updateDate: null,
        active: true,
        components: null,
        fuelFlows: null,
      },
      {
        id: "TWCORNEL5-10B54DDC6DBF4DF3B309251288E83E12",
        locationId: "6",
        monitoringSystemId: "AF2",
        systemTypeCode: "GAS",
        systemDesignationCode: "P",
        fuelCode: "PNG",
        beginDate: null,
        endDate: null,
        beginHour: null,
        endHour: null,
        userId: "bvick",
        addDate: "2019-10-07",
        updateDate: null,
        active: true,
        components: null,
        fuelFlows: null,
      },
    ];

    selectedMonitoringSystemsComponents = [
      {
        id: "TWCORNEL5-902F83FCDE244546ABB2E2F46EC873E3",
        locationId: "6",
        monitoringSystemRecordId: "TWCORNEL5-5BCFD5B414474E1083A77A6B33A2F13D",
        componentRecordId: "TWCORNEL5-4EA39F9E01AB411EB84E313A212084C1",
        componentId: "AFA",
        componentTypeCode: "GFFM",

        beginDate: "2019-07-01",
        beginHour: "0",
        endDate: "2019-07-01",
        endHour: "0",
      },
      {
        id: "TWCORNEL5-902F83FCDE244546ABB2E2F46EC873E3",
        locationId: "6",
        monitoringSystemRecordId: "TWCORNEL5-5BCFD5B414474E1083A77A6B33A2F13D",
        componentRecordId: "TWCORNEL5-4EA39F9E01AB411EB84E313A212084C1",
        componentId: "AFA",
        componentTypeCode: "GFFM",

        beginDate: null,
        beginHour: null,
        endDate: null,
        endHour: null,
      },
    ];

    selectedMonitoringSystemsFuelFlow = [
      {
        id: "TWCORNEL5-346B541485484501A5C748F8CAAABC22",
        monitoringSystemRecordId: "TWCORNEL5-5BCFD5B414474E1083A77A6B33A2F13D",
        fuelCode: "PNG",
        systemTypeCode: "GAS",
        maximumFuelFlowRate: "10000.0",
        systemFuelFlowUOMCode: "HSCF",
        maximumFuelFlowRateSourceCode: "URV",
        beginDate: "2019-07-01",
        endDate: "2019-07-01",
        beginHour: "0",
        endHour: "0",
        userId: "bvick",
        addDate: "2019-10-07",
        updateDate: null,
        active: true,
      },
      {
        id: "TWCORNEL5-346B541485484501A5C748F8CAAABC22",
        monitoringSystemRecordId: "TWCORNEL5-5BCFD5B414474E1083A77A6B33A2F13D",
        fuelCode: "PNG",
        systemTypeCode: "GAS",
        maximumFuelFlowRate: "10000.0",
        systemFuelFlowUOMCode: "HSCF",
        maximumFuelFlowRateSourceCode: "URV",
        beginDate: null,
        endDate: null,
        beginHour: null,
        endHour: null,
        userId: "bvick",
        addDate: "2019-10-07",
        updateDate: null,
        active: true,
      },
    ];
    monitoringSystemsFuelFlowsTableRecods = [
      {
        col1: "PNG",
        col2: "GAS",
        col3: "2019/07/01: 0 ➜ 2019/07/01: 0",
        col4: "TWCORNEL5-346B541485484501A5C748F8CAAABC22",
      },
      {
        col1: "PNG",
        col2: "GAS",
        col3: ":  ➜ Present",
        col4: "TWCORNEL5-346B541485484501A5C748F8CAAABC22",
      },
    ];
    monitoringSystemsComponentsTableRecods = [
      {
        col1: "AFA",
        col2: "GFFM",
        col3: "2019/07/01: 0 ➜ 2019/07/01: 0",
        col4: "TWCORNEL5-902F83FCDE244546ABB2E2F46EC873E3",
      },
      {
        col1: "AFA",
        col2: "GFFM",
        col3: ":  ➜ Present",
        col4: "TWCORNEL5-902F83FCDE244546ABB2E2F46EC873E3",
      },
    ];
    monitoringSystemsTableRecods = [
      {
        col1: "AF1",
        col2: "GAS",
        col3: "P",
        col4: "PNG",
        col5: "2019/07/01 0",
        col6: "2019/07/01 0",
        col7: "TWCORNEL5-5BCFD5B414474E1083A77A6B33A2F13D",
      },
      {
        col1: "AF2",
        col2: "GAS",
        col3: "P",
        col4: "PNG",
        col5: "",
        col6: "",
        col7: "TWCORNEL5-10B54DDC6DBF4DF3B309251288E83E12",
      },
    ];
  });

  let selectedMonitoringSystemsRanges = [
    {
      id: "a2fe117e-bfa9-411e-9187-d16fcc09dfdd",
      componentRecordId: "TWCORNEL5-FADC4E3E593A4AB3B006F6F1B7C9F7DA",
      analyzerRangeCode: "A",
      beginDate: "2021-12-04",
      endDate: "2021-12-18",
      beginHour: "1",
      endHour: "1",
    },
    {
      id: "db7f92f9-e79b-4a23-af83-8492a8d920cb",
      componentRecordId: "TWCORNEL5-FADC4E3E593A4AB3B006F6F1B7C9F7DA",
      analyzerRangeCode: "A",

      beginDate: null,
      endDate: null,
      beginHour: null,
      endHour: null,
    },
  ];

  let monitoringSystemsRangesTableRecods = [
    {
      col1: "A",
      col2: "2021/12/04: 1 ➜ 2021/12/18: 1",
      col3: "a2fe117e-bfa9-411e-9187-d16fcc09dfdd",
    },
    {
      col1: "A",
      col2: ":  ➜ Present",
      col3: "db7f92f9-e79b-4a23-af83-8492a8d920cb",
    },
  ];

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

  test("should generate data table records for monitoring systems analyze ranges", () => {
    expect(
      fs.getMonitoringPlansSystemsAnalyzerRangesTableRecords(
        selectedMonitoringSystemsRanges
      )
    ).toEqual(monitoringSystemsRangesTableRecods);
  });
});
