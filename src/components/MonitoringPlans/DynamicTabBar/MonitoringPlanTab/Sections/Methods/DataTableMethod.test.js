import React from "react";
import { render, screen } from "@testing-library/react";
import { DataTableMethod } from "./DataTableMethod";

//testing redux connected component to mimic props passed as argument
function componentRenderer(args) {
  const defualtProps = {
    monitoringMethods: [
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
    loadMonitoringMethodsData: jest.fn(),
    loadMonitoringMatsMethodsData: jest.fn(),
    loading: false,
  };

  const props = { ...defualtProps, ...args };
  return render(<DataTableMethod {...props} />);
}
function componentRendererNoData(args) {
  const defualtProps = {
    monitoringMethods: [],
    loadMonitoringMethodsData: jest.fn(),
    loadMonitoringMatsMethodsData: jest.fn(),
    loading: true,
  };

  const props = { ...defualtProps, ...args };
  return render(<DataTableMethod {...props} />);
}

test("testing redux connected data-table component renders all records", () => {
  const { container } = componentRenderer();
  const headerColumns = container.querySelectorAll("tbody tr");
  expect(headerColumns.length).toEqual(3);
});

test("testing redux connected data-table component renders no records", () => {
  const { container } = componentRendererNoData();
  expect(screen.getByText("Loading list of Methods")).toBeInTheDocument();
});