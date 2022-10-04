import React from "react";
import {
  render,
  waitForElement,
  fireEvent,
  screen,
} from "@testing-library/react";
import { act } from "react-dom/test-utils";
import MonitoringPlanEvaluationReport from "./MonitoringPlanEvaluationReport";

test("tests Loading Eval Report", () => {
  const { container } = render(
    <MonitoringPlanEvaluationReport
      monitorPlanId={"TWCORNEL5-C0E3879920A14159BAA98E03F1980A7A"}
      facility={"Barry(1, 2, CS0AAN)"}
    />
  );

  jest.mock("../../utils/api/monitoringPlansApi", () => {
    const mockReportResults = [
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
    return {
      getMonitoringPlansEvalData: jest.fn(() =>
        Promise.resolve(mockReportResults)
      ),
    };
  });

  //   const prntBTN = container.querySelector("#printBTN")
  //   fireEvent.click(prntBTN);
  expect(container).toBeDefined();
});

test("tests Loading Eval Report with showtitle", async () => {
  const mockEvalData = {
    facilityId: "Sample U/S 1",
    state: "Severity 1",
    countyName: "   category 1",
    mpReportResults: [],
  };
  const { container, unmount } = await waitForElement(() =>
    render(
      <MonitoringPlanEvaluationReport
        monitorPlanId={"TWCORNEL5-C0E3879920A14159BAA98E03F1980A7A"}
        facility={"Barry(1, 2, CS0AAN)"}
        showTitle={true}
        dataLoadedState={true}
        reportDataState={mockEvalData}
      />
    )
  );

  const btns = container.querySelectorAll("#printBTN");
  btns.forEach((element) => {
    fireEvent.click(element);
  });
  unmount();
  expect(container).toBeDefined();
});
