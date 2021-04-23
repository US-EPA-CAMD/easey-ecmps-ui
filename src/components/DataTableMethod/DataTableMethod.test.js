import React from "react";
import { render, screen } from "@testing-library/react";
import { DataTableMethod } from "./DataTableMethod";

//testing redux connected component to mimic props passed as argument
function componentRenderer(showActiveOnly) {
  const props = {
    monitoringMethods: [
      {
        id: "CAMD-F4C326C9D8044324B83603C2FC0154B2",
        parameter: "co2",
        methodology: "ad",
        subsitituteDataApproach: "spts",
        byPassApproach: "null",
        beginDate: "1995-01-01 00",
        endTime: "1995-01-01 00",
        active: false
      },
      {
        id: "CAMD-F4C326C9D8044324B83603C2FC0154B2",
        parameter: "co2",
        methodology: "ad",
        subsitituteDataApproach: "spts",
        byPassApproach: "null",
        beginDate: "1995-01-01 00",
        endTime: "",
        active: true
      },
      {
        id: "CAMD-F4C326C9D8044324B83603C2FC0154B2",
        parameter: "co2",
        methodology: "ad",
        subsitituteDataApproach: "spts",
        byPassApproach: "null",
        beginDate: "1995-01-01 00",
        endTime: "1995-01-01 00",
        active: false
      },
    ],
    loadMonitoringMethodsData: jest.fn(),
    loadMonitoringMatsMethodsData: jest.fn(),
    loading: false,
    showActiveOnly: showActiveOnly
  };
  return render(<DataTableMethod {...props} />);
}
function componentRendererNoData(args) {
  const defualtProps = {
    monitoringMethods: [],
    loadMonitoringMethodsData: jest.fn(),
    loadMonitoringMatsMethodsData: jest.fn(),
    loading: true,
    showActiveOnly: true
  };

  const props = { ...defualtProps, ...args };
  return render(<DataTableMethod {...props} />);
}

test("should render only active monitoring methods by default", () => {
  const { container } = componentRenderer(true);
  const records = container.querySelectorAll("tbody tr");
  expect(records.length).toEqual(1);
});

test("should render both active and inactive monitoring methods when showActive only property is false", () => {
  const { container } = componentRenderer(false);
  const records = container.querySelectorAll("tbody tr");
  expect(records.length).toEqual(3);
});

test("testing redux connected data-table component renders no records", () => {
  const { container } = componentRendererNoData();
  expect(screen.getByText("Loading list of Methods")).toBeInTheDocument();
});