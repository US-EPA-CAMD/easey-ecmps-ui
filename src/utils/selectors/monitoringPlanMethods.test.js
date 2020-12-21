import * as fs from "./monitoringPlanMethods";

describe("testing fetch wrapper monitoring plan data selectors", () => {
  let selectedMonitoringPlan;
  let viewMonitoringPlan;

  beforeAll(() => {
    selectedMonitoringPlan = [
      {
        beginDate: "2019-07-01",
        beginHour: "0",
        bypassApproachCode: null,
        endDate: null,
        endHour: null,
        id: "TWCORNEL5-E87023808E5C43F18BD84AC8A9DCF332",
        methodCode: "AD",
        parameterCode: "HI",
        subDataCode: "SPTS",
      },
    ];

    viewMonitoringPlan = [
      {
        col1: "HI",
        col2: "AD",
        col3: "SPTS",
        col4: null,
        col5: "07/01/2019 0",
        col6: " ",
      },
    ];
  });
  test("selected monitoring plan data table ", () => {
    expect(
      fs.getMonitoringPlansMethodsTableRecords(selectedMonitoringPlan)
    ).toEqual(viewMonitoringPlan);
  });
});
