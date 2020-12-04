import React from "react";
import MonitoringPlanDataTable from "./MonitoringPlanDataTable";
import { render, fireEvent, screen } from "@testing-library/react";

const mockFacilityData = {
  name: "Barry",
  orisCode: 3,
  monitoringPlans: [
    {
      monitoringLocations: [1, 2, 3],
      status: "Active",
      beginYearQuarter: 2003,
      endYearQuarter: 2052,
    },
    {
      monitoringLocations: [1, 2, 3],
      status: "Inactive",
      beginYearQuarter: 2002,
      endYearQuarter: 2007,
    },
    {
      monitoringLocations: [1, 2, 3],
      status: "Active",
      beginYearQuarter: 2001,
      endYearQuarter: 2020,
    },
  ],
};

describe("testing monitoring plan data table component", () => {
  const headerRow = 1;
  test("by default renders filtered records based on status as active only", () => {
    const { getAllByRole } = render(
      <MonitoringPlanDataTable facility={mockFacilityData} />
    );
    const tableRows = getAllByRole("row");
    expect(tableRows.length - headerRow).toEqual(2);
  });
  test("renders all table records when checkbox is unchecked ", () => {
    const { getAllByRole } = render(
      <MonitoringPlanDataTable facility={mockFacilityData} />
    );
    fireEvent.click(screen.getByLabelText("Show active plans only"));
    const tableRows = getAllByRole("row");
    expect(tableRows.length - headerRow).toEqual(mockFacilityData.monitoringPlans.length);
  });
});
