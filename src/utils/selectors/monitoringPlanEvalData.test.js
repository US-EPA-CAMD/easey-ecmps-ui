import * as fs from "./monitoringPlanEvalData";
import React from "react";

describe("testing monitoring plan evaluation data selector", () => {
  let selectedMonitoringEvalData;
  let monitoringEvalDataTableRecods;
  let selectedQAEvalData;
  let qaEvalDataTableRecods;

  beforeAll(() => {
    selectedMonitoringEvalData = [
      {
        unitStackInformation: "Sample U/S 1",
        severityCode: "Severity 1",
        categoryDescription: "   category 1",
        checkCode: "Check Code 1",
        resultMessage:
          "Lorem ipsum urna, auctor a tincidunt ut, rutrum et ante.",
      },
      {
        unitStackInformation: "Sample U/S 2",
        severityCode: "Severity 2",
        categoryDescription: "----- category 2",
        checkCode: "Check Code 2",
        resultMessage: "Dolor sit amet, consectetur adipiscing elit.",
      },
      {
        unitStackInformation: "Sample U/S 3",
        severityCode: "Severity 3",
        categoryDescription: "---category 3",
        checkCode: "Check Code 3",
        resultMessage:
          "Dolor sit amePhasellus tempus velit at dui convallis, eu egestas neque ultricest, consectetur adipiscing elit.",
      },
    ];

    monitoringEvalDataTableRecods = [
      {
        col1: "Sample U/S 1",
        col2: "Severity 1",
        col3: "category 1",
        col4: (
          <span className="text-informational">
            <u>Check Code 1</u>
          </span>
        ),
        col5: "Lorem ipsum urna, auctor a tincidunt ut, rutrum et ante.",
      },
      {
        col1: "Sample U/S 2",
        col2: "Severity 2",
        col3: "category 2",
        col4: (
          <span className="text-informational">
            <u>Check Code 2</u>
          </span>
        ),
        col5: "Dolor sit amet, consectetur adipiscing elit.",
      },
      {
        col1: "Sample U/S 3",
        col2: "Severity 3",
        col3: "category 3",
        col4: (
          <span className="text-informational">
            <u>Check Code 3</u>
          </span>
        ),
        col5: "Dolor sit amePhasellus tempus velit at dui convallis, eu egestas neque ultricest, consectetur adipiscing elit.",
      },
    ];

    selectedQAEvalData = [
      {
        unitStackInformation: "Sample U/S 1",
        testTypeCode: "LINE",
        testNumber: "Test 1",
        beginPeriod: "2023-04-01",
        endPeriod: '2023-06-30',
        componentId: "componentId 1",
        systemId: "systemId 1",
        severityCode: "severityCode 1",
        categoryCodeDescription: "  category 1",
        checkCode: "Check Code 1",
        resultMessage:
          "Lorem ipsum urna, auctor a tincidunt ut, rutrum et ante.",
      },
      {
        unitStackInformation: "Sample U/S 2",
        testTypeCode: "LINE",
        testNumber: "Test 2",
        beginPeriod: "2023-04-01",
        endPeriod: '2023-06-30',
        componentId: "componentId 2",
        systemId: "systemId 2",
        severityCode: "severityCode 2",
        categoryCodeDescription: "--- category 2",
        checkCode: "Check Code 2",
        resultMessage:
          "Lorem ipsum urna, auctor a tincidunt ut, rutrum et ante.",
      },
      {
        unitStackInformation: "Sample U/S 3",
        testTypeCode: "LINE",
        testNumber: "Test 3",
        beginPeriod: "2023-04-01",
        endPeriod: '2023-06-30',
        componentId: "componentId 3",
        systemId: "systemId 3",
        severityCode: "severityCode 3",
        categoryCodeDescription: "---- category 3",
        checkCode: "Check Code 3",
        resultMessage:
          "Lorem ipsum urna, auctor a tincidunt ut, rutrum et ante.",
      },
    ];

    qaEvalDataTableRecods = [
      {
        col1: "Sample U/S 1",
        col2: "LINE",
        col3: "Test 1",
        col4: "2023-04-01",
        col5: "2023-06-30",
        col6: "componentId 1",
        col7: "systemId 1",
        col8: "severityCode 1",
        col9: "category 1",
        col10: (
          <span className="text-informational">
            <u>Check Code 1</u>
          </span>
        ),
        col11: "Lorem ipsum urna, auctor a tincidunt ut, rutrum et ante.",
      },
      {
        col1: "Sample U/S 2",
        col2: "LINE",
        col3: "Test 2",
        col4: "2023-04-01",
        col5: "2023-06-30",
        col6: "componentId 2",
        col7: "systemId 2",
        col8: "severityCode 2",
        col9: "category 2",
        col10: (
          <span className="text-informational">
            <u>Check Code 2</u>
          </span>
        ),
        col11: "Lorem ipsum urna, auctor a tincidunt ut, rutrum et ante.",
      },
      {
        col1: "Sample U/S 3",
        col2: "LINE",
        col3: "Test 3",
        col4: "2023-04-01",
        col5: "2023-06-30",
        col6: "componentId 3",
        col7: "systemId 3",
        col8: "severityCode 3",
        col9: "category 3",
        col10: (
          <span className="text-informational">
            <u>Check Code 3</u>
          </span>
        ),
        col11: "Lorem ipsum urna, auctor a tincidunt ut, rutrum et ante.",
      },

    ];
  });

  test("should generate table records for monitoring plan eval data", () => {
    expect(fs.getMonitoringPlansEvalData(selectedMonitoringEvalData)).toEqual(
      monitoringEvalDataTableRecods
    );
  });

  test("should generate table records for QA eval data", () => {
    expect(fs.getQAEvalData(selectedQAEvalData)).toEqual(
      qaEvalDataTableRecods
    );
  });
});
