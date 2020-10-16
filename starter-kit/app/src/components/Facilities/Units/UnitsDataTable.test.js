import React from "react";
import UnitsDataTable from "./UnitsDataTable";
import { render, fireEvent, screen } from "@testing-library/react";

const mockFacilityData = {
  name: "Barry",
  orisCode: 3,
  units: [
    {
      unitId: 2,
      commOpDate: "2000-02-22T00:00:00",
      status: "OPR",
    },
    {
      unitId: 5,
      commOpDate: "2000-05-22T00:00:00",
      status: "RTD",
    },
    {
      unitId: 22,
      commOpDate: "2019-02-11T00:00:00",
      status: "OPR",
    },
  ],
};

describe("testing Units data table component", () => {
  const headerRow = 1;
  test("by default renders filtered records based on status as operating only", () => {
    const { getAllByRole } = render(
      <UnitsDataTable facility={mockFacilityData} />
    );
    const tableRows = getAllByRole("row");
    expect(tableRows.length - headerRow).toEqual(2);
  });
  test("renders all table records when checkbox is unchecked ", () => {
    const { getAllByRole } = render(
      <UnitsDataTable facility={mockFacilityData} />
    );
    fireEvent.click(screen.getByLabelText("Show operating units only"));
    const tableRows = getAllByRole("row");
    expect(tableRows.length - headerRow).toEqual(mockFacilityData.units.length);
  });
});
