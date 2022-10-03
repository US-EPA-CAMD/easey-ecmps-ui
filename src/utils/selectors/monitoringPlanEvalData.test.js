import * as fs from "./monitoringPlanEvalData";
import React from "react";

describe("testing monitoring plan evaluation data selector", () => {
  let selectedMonitoringEvalData;
  let monitoringEvalDataTableRecods;

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
  });
  test("should generate table records for monitoring plan eval data", () => {
    expect(fs.getMonitoringPlansEvalData(selectedMonitoringEvalData)).toEqual(
      monitoringEvalDataTableRecods
    );
  });
});
