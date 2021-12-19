import React from "react";
import { render } from "@testing-library/react";
import Router from "react-router-dom";
import EvaluationReport from "./EvaluationReport";
import MonitoringPlanEvaluationReport from "../MonitoringPlanEvaluationReport/MonitoringPlanEvaluationReport";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: jest.fn(),
}));

const createWrapper = () => {
  return render(<EvaluationReport />);
};

describe("Evaluation Report Page", () => {
  jest
    .spyOn(Router, "useParams")
    .mockReturnValue({ id: "MDC-DD01BAF18A9F4F6CA4AF0D22E406EFC4" });

  it("should render", () => {
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

  it("should load the plan and facility info from the database", () => {});
});
