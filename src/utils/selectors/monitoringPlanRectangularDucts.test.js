import * as fs from "./monitoringPlanRectangularDucts";

describe("testing unit controls data selectors", () => {
  let selectedRectDucts;
  let rectDuctTableRecords;
  beforeAll(() => {
    selectedRectDucts = [
      {
        id: "CAMD-7B78524FB52042EC80564E58D67D7E99",
        wafDeterminationDate: "2004-01-01",
        wafBeginDate: "2004-01-01",
        wafBeginHour: "0",
        wafMethodCode: "FT",
        wafValue: "0.9675",
        numberOfTestRuns: "3",
        numberOfTraversePointsWaf: "24",
        numberOfTestPorts: "4",
        numberOfTraversePointsRef: "24",
        ductWidth: "20.0",
        ductDepth: "14.0",
        wafEndDate: "2008-12-31",
        wafEndHour: "23",
      },
      {
        id: "CAMD-7B78524FB52042EC80564E58D67D7E91",
        wafDeterminationDate: "2004-01-01",
        wafBeginDate: "2004-01-01",
        wafBeginHour: "0",
        wafMethodCode: "select",
        wafValue: "0.9675",
        numberOfTestRuns: "3",
        numberOfTraversePointsWaf: "24",
        numberOfTestPorts: "4",
        numberOfTraversePointsRef: "24",
        ductWidth: "20.0",
        ductDepth: "14.0",
        wafEndDate: "2008-12-31",
        wafEndHour: "23",
      },
    ];

    rectDuctTableRecords = [
      {
        col1: "01/01/2004",
        col2: "FT",
        col3: "01/01/2004 0",
        col4: "12/31/2008 23",
        col5: "CAMD-7B78524FB52042EC80564E58D67D7E99",
      },
      {
        col1: "01/01/2004",
        col2: null,
        col3: "01/01/2004 0",
        col4: "12/31/2008 23",
        col5: "CAMD-7B78524FB52042EC80564E58D67D7E91",
      },
    ];
  });

  test("should generate data table records for unit capacities", () => {
    expect(
      fs.getMonitoringPlansRectangularDuctsTableRecords(selectedRectDucts)
    ).toEqual(rectDuctTableRecords);
  });
});
