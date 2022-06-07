import * as fs from "./TestSummary";

describe("testing QA TestSummary Selectors", () => {
  let selected;
  let modified;

  beforeAll(() => {
    selected = [
      {
        id: "TWCORNEL5",
        stackPipeId: null,
        unitId: "5",
        testTypeCode: "FFAC",
        monitoringSystemId: null,
        componentId: "AFA",
        spanScaleCode: null,
        testNumber: "2020AFA",
        testReasonCode: "QA",
        testDescription: null,
        testResultCode: "PAED",
        calculatedTestResultCode: "PAeD",
        beginDate: null,
        beginHour: null,
        beginMinute: null,
        endDate: "2020-02-26",
        endHour: 20,
        endMinute: 3,
        gracePeriodIndicator: null,
        calculatedGracePeriodIndicator: null,
        year: null,
        quarter: null,
        testComment: null,
        injectionProtocolCode: null,
        calculatedSpanValue: null,
        evalStatusCode: null,
        userId: "b",
        addDate: "2020-04-23",
        updateDate: null,
        reportPeriodId: null,
      },
    ];

    modified = [
      {
        col1: "5",
        col2: "FFAC",
        col3: null,
        col4: "AFA",
        col5: null,
        col6: "2020AFA",
        col7: "QA",
        col8: null,
        col9: "PAED",
        col10: "",
        col11: "",
        col12: "",
        col13: "02/26/2020",
        col14: "20",
        col15: "3",
        col16: null,
        col17: null,
        col18: null,
        col19: null,
        col20: null,
        col21: "TWCORNEL5",
      },
    ];
  });
  test("should generate data table records for qa test summary", () => {
    expect(fs.getTestSummary(selected)).toEqual(
        modified
    );
  });
});
