import React from "react";
import { render } from "@testing-library/react";
import Router from "react-router-dom";
import EvaluationReport from "./EvaluationReport";
import MonitoringPlanEvaluationReport from "../MonitoringPlanEvaluationReport/MonitoringPlanEvaluationReport";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: jest.fn(),
}));

jest.mock("../../utils/api/monitoringPlansApi", () => ({
  ...jest.requireActual("../../utils/api/monitoringPlansApi"),
  getRefreshInfo: jest.fn(() => Promise.resolve({ data: { facId: 59 } })),
  getMonitoringPlans: jest.fn(() =>
    Promise.resolve({
      data: [
        {
          id: "MDC-DD01BAF18A9F4F6CA4AF0D22E406EFC4",
          facId: "59",
          orisCode: "331",
          name: "3",
        },
      ],
    })
  ),
}));

jest.mock("../../utils/api/facilityApi", () => ({
  ...jest.requireActual("../../utils/api/facilityApi"),
  getFacilityById: jest.fn(() =>
    Promise.resolve({ data: { facilityId: 331 } })
  ),
}));

describe("Evaluation Report Page", () => {
  it("should read the id parameter from react router", () => {
    jest
      .spyOn(Router, "useParams")
      .mockReturnValue({ id: "MDC-DD01BAF18A9F4F6CA4AF0D22E406EFC4" });
  });

  it("should render", () => {
    const createWrapper = () => {
      return render(<EvaluationReport />);
    };
    const report = createWrapper();
    expect(report).toBeTruthy();
  });

  it("should render the child Monitoring Plan Evaluation Report Component", () => {
    const childReport = render(
      <MonitoringPlanEvaluationReport
        facility="Etiwanda Generating Station (3)"
        monitorPlanId="MDC-DD01BAF18A9F4F6CA4AF0D22E406EFC4"
      />
    );
    expect(childReport).toBeTruthy();
  });
});
