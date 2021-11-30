import React from "react";
import { render, waitForElement, fireEvent, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import MonitoringPlanEvaluationReport from "./MonitoringPlanEvaluationReport";

test("tests Loading Eval Report", () => {

    const container = render(<MonitoringPlanEvaluationReport />);

    expect(container).toBeDefined();
});