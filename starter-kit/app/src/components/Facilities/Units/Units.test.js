import React from "react";
import Units from "./Units";
import { render, fireEvent, screen } from "@testing-library/react";

const mockFacilityData = {
  name: "Barry",
  orisCode: 3,
  units: [
    {
      commOpDate: "2000-02-22T00:00:00",
      controls: [
        {
          parameterCode: "NOX",
          parameterDesc: null,
          controlCode: "DLNB",
          controlDesc: "Dry Low NOx Burners",
        },
        {
          parameterCode: "NOX",
          parameterDesc: null,
          controlCode: "SCR",
          controlDesc: "Selective Catalytic Reduction",
        },
      ],
      fuels: [
        {
          indicatorDescription: "Primary",
          fuelDesc: "Pipeline Natural Gas",
          fuelCode: "PNG",
          indCode: "P",
        },
      ],
      generators: [
        { generatorId: "A1CT2", nameplateCapacity: 170.1 },
        { generatorId: "A1ST", nameplateCapacity: 191.8 },
      ],
      hi: 3000,
      isUnit: null,
      name: null,
      programs: [
        { code: "ARP", description: "Acid Rain Program" },
        {
          code: "CSNOX",
          description: "Cross-State Air Pollution Rule NOx Annual Program",
        },
        {
          code: "CSOSG2",
          description:
            "Cross-State Air Pollution Rule NOx Ozone Season Program Group 2",
        },
        {
          code: "CSSO2G2",
          description:
            "Cross-State Air Pollution Rule SO2 Annual Program Group 2",
        },
      ],
      status: "OPR",
      statusDate: "2000-02-22T00:00:00",
      unitId: "6B",
    },
    {
      commOpDate: "2000-02-22T00:00:00",
      controls: [
        {
          parameterCode: "NOX",
          parameterDesc: null,
          controlCode: "DLNB",
          controlDesc: "Dry Low NOx Burners",
        },
        {
          parameterCode: "NOX",
          parameterDesc: null,
          controlCode: "SCR",
          controlDesc: "Selective Catalytic Reduction",
        },
      ],
      fuels: [
        {
          indicatorDescription: "Primary",
          fuelDesc: "Pipeline Natural Gas",
          fuelCode: "PNG",
          indCode: "P",
        },
      ],
      generators: [
        { generatorId: "A1CT2", nameplateCapacity: 170.1 },
        { generatorId: "A1ST", nameplateCapacity: 191.8 },
      ],
      hi: 3000,
      isUnit: null,
      name: null,
      programs: [
        { code: "ARP", description: "Acid Rain Program" },
        {
          code: "CSNOX",
          description: "Cross-State Air Pollution Rule NOx Annual Program",
        },
        {
          code: "CSOSG2",
          description:
            "Cross-State Air Pollution Rule NOx Ozone Season Program Group 2",
        },
        {
          code: "CSSO2G2",
          description:
            "Cross-State Air Pollution Rule SO2 Annual Program Group 2",
        },
      ],
      status: "OPR",
      statusDate: "2000-02-22T00:00:00",
      unitId: "4",
    },
  ],
};

describe("testing Units data table component", () => {
  const headerRow = 1;
  test("by default renders filtered records based on status as operating only", () => {
    const { getAllByRole } = render(<Units facility={mockFacilityData} />);
    const tableRows = getAllByRole("row");
    expect(tableRows.length - headerRow).toEqual(2);
  });
  test("renders all table records when checkbox is unchecked ", () => {
    const { getAllByRole } = render(<Units facility={mockFacilityData} />);
    fireEvent.click(screen.getByLabelText("Show operating units only"));
    const tableRows = getAllByRole("row");
    expect(tableRows.length - headerRow).toEqual(mockFacilityData.units.length);
  });
  test("renders unit detail if units table is populated ", () => {
    render(<Units facility={mockFacilityData} />);
    const unitDetailRenderer = screen.getByTestId("unit-detail-renderer");
    expect(unitDetailRenderer).toBeTruthy();
  });
});
