import React from "react";
import { screen } from "@testing-library/react";

import render from "../../mocks/render";
import * as mdmApi from "../../utils/api/mdmApi";
import { getMockReportingPeriods } from "../../mocks/functions";
import ReportingPeriodSelector from "./ReportingPeriodSelector";

describe("ReportingPeriodSelector", () => {
  beforeEach(() => {
    jest.spyOn(mdmApi, "getReportingPeriods").mockResolvedValue({
      data: { items: getMockReportingPeriods() },
      status: 200,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("includes the current quarter for QA export flows", async () => {
    await render(
      <ReportingPeriodSelector
        isExport={true}
        includeCurrentQuarter={true}
        dataTypes={[]}
        exportState={null}
        reportingPeriodSelectionHandler={jest.fn()}
      />,
    );

    expect(await screen.findByText("Reporting Periods")).toBeInTheDocument();
    expect(mdmApi.getReportingPeriods).toHaveBeenCalledWith({
      excludeCurrentQuarter: false,
    });
  });

  test("excludes the current quarter for emissions export flows", async () => {
    await render(
      <ReportingPeriodSelector
        isExport={true}
        includeCurrentQuarter={false}
        dataTypes={[]}
        exportState={null}
        reportingPeriodSelectionHandler={jest.fn()}
      />,
    );

    expect(await screen.findByText("Reporting Periods")).toBeInTheDocument();
    expect(mdmApi.getReportingPeriods).toHaveBeenCalledWith({
      excludeCurrentQuarter: true,
    });
  });

  test("supports current-quarter-inclusive flows that are not export screens", async () => {
    await render(
      <ReportingPeriodSelector
        isExport={false}
        includeCurrentQuarter={true}
        dataTypes={[]}
        exportState={null}
        reportingPeriodSelectionHandler={jest.fn()}
      />,
    );

    expect(await screen.findByText("Reporting Periods")).toBeInTheDocument();
    expect(mdmApi.getReportingPeriods).toHaveBeenCalledWith({
      excludeCurrentQuarter: false,
    });
  });
});
