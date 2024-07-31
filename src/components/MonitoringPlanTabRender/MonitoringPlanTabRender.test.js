import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect"; // For additional matchers like toBeInTheDocument

import MonitoringPlanTabRender from "./MonitoringPlanTabRender";

// Mock any dependencies or child components used in the test
jest.mock("../HeaderInfo/HeaderInfo", () => () => (
  <div data-testid="mocked-headerinfo" />
));
jest.mock(
  "../datatablesContainer/DataTableMethod/DataTableMethod",
  () => () => <div data-testid="mocked-datatablemethod" />
);
jest.mock("../datatablesContainer/DataTableMats/DataTableMats", () => () => (
  <div data-testid="mocked-datatablemats" />
));

const props = {
  resetTime: jest.fn(),
  setExpired: jest.fn(),
  resetTimerFlag: jest.fn(),
  callApiFlag: jest.fn(),
  title: "test",
  user: { firstName: "" },
  locations: [{ id: "6" }],
  selectedConfig: [],
  setSectionSelect: jest.fn(),
  setLocationSelect: jest.fn(),
  sectionSelect: [4, "Methods"],
  locationSelect: [0, "6"],
  orisCode: 3,
  configID: 3,
  checkout: false,
  setCheckout: jest.fn(),
  setInactive: jest.fn(),
  inactive: [false, false],
  checkedOutLocations: [],
  currentTabIndex: 0,

  workspaceSection: "MonitoringPlan",
};
describe("MonitoringPlanTabRender", () => {
  it("renders without crashing", () => {
    render(<MonitoringPlanTabRender {...props} />);
    expect(screen.getAllByTestId("collapseBTN")[0]).toBeInTheDocument();
  });

  it("renders the correct number of CustomAccordion components", () => {
    render(<MonitoringPlanTabRender {...props} />);
    const sectionCount = 2; // methods and mats methods
    const accordionComponents = screen.getAllByTestId("collapseBTN");
    expect(accordionComponents).toHaveLength(sectionCount);
  });
});
