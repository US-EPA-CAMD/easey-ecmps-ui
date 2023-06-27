import React from "react";
import {
  render,
  screen,
  fireEvent,
  act,
  waitFor,
} from "@testing-library/react";
import FilterFormAdmin from "./FilterFormAdmin";
import { getReportingPeriods } from "../../../../utils/api/mdmApi";
import { getMonitoringPlans } from "../../../../utils/api/monitoringPlansApi";
import axios from "axios";
import "@testing-library/jest-dom/extend-expect";
import MockAdapter from "axios-mock-adapter";

import { fetchReportingPeriods } from "./FilterFormAdmin";

jest.mock("../../../../utils/api/mdmApi");
describe("FilterFormAdmin", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });
  it("should fetch reporting periods and update available reporting periods state", async () => {
    const reportingPeriodList = [
      { periodAbbreviation: "Period 1" },
      { periodAbbreviation: "Period 2" },
      { periodAbbreviation: "Period 3" },
    ];

    getReportingPeriods.mockResolvedValue({ data: reportingPeriodList });

    render(<FilterFormAdmin facilities={[]} />);

    await waitFor(() => {
      const period1Element = screen.getByText("Period 1");
      expect(period1Element).toBeInTheDocument();
    });

    expect(getReportingPeriods).toHaveBeenCalled();
  });
});
