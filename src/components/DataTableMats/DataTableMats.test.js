import React from "react";
import { render, screen } from "@testing-library/react";
import { DataTableMats } from "./DataTableMats";

//testing redux connected component to mimic props passed as argument
function componentRenderer(args) {
  const defualtProps = {
    monitoringMatsMethods: [
      {
        id: "CAMD-F4C326C9D8044324B83603C2FC0154B2",
        parameter: "co2",
        methodology: "ad",
        subsitituteDataApproach: "spts",
        byPassApproach: "null",
        beginDate: "1995-01-01 00",
        endTime: "1995-01-01 00",
      },
      {
        id: "CAMD-F4C326C9D8044324B83603C2FC0154B2",
        parameter: "co2",
        methodology: "ad",
        subsitituteDataApproach: "spts",
        byPassApproach: "null",
        beginDate: "1995-01-01 00",
        endTime: "1995-01-01 00",
      },
      {
        id: "CAMD-F4C326C9D8044324B83603C2FC0154B2",
        parameter: "co2",
        methodology: "ad",
        subsitituteDataApproach: "spts",
        byPassApproach: "null",
        beginDate: "1995-01-01 00",
        endTime: "1995-01-01 00",
      },
    ],
    loadMonitoringMatsMethodsData: jest.fn(),
    loading: false,
  };

  const props = { ...defualtProps, ...args };
  return render(<DataTableMats {...props} />);
}
function componentRendererNoData(args) {
  const defualtProps = {
    monitoringMatsMethods: [],
    loadMonitoringMatsMethodsData: jest.fn(),
    loading: true,
  };

  const props = { ...defualtProps, ...args };
  return render(<DataTableMats {...props} />);
}

test("testing redux connected data-table component renders all records", () => {
  const { container } = componentRenderer();
  const headerColumns = container.querySelectorAll("tbody tr");
  expect(headerColumns.length).toEqual(3);
});

test("testing redux connected data-table component renders no records", () => {
  const { container } = componentRendererNoData();
  expect(
    screen.getByText("Loading list of Supplemental Methods")
  ).toBeInTheDocument();
});
