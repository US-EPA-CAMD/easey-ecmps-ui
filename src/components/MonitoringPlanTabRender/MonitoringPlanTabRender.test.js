import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect"; // For additional matchers like toBeInTheDocument

import MonitoringPlanTabRender from "./MonitoringPlanTabRender";

// Mock any dependencies or child components used in the test
jest.mock("../HeaderInfo/HeaderInfo", () => () => <div data-testid="mocked-headerinfo" />);
jest.mock("../datatablesContainer/DataTableMethod/DataTableMethod", () => () => (
  <div data-testid="mocked-datatablemethod" />
));
jest.mock("../datatablesContainer/DataTableMats/DataTableMats", () => () => (
  <div data-testid="mocked-datatablemats" />
));
// ... Mock other child components as needed

describe("MonitoringPlanTabRender", () => {
  it("renders without crashing", () => {
    render(<MonitoringPlanTabRender />);
    expect(screen.getByTestId("monitoring-plan-tab-render")).toBeInTheDocument();
  });

  it("renders the correct number of CustomAccordion components", () => {
    render(<MonitoringPlanTabRender />);
    // Assuming you have defined the number of sections as `sectionCount`
    const sectionCount = 5; // Adjust this value according to your actual data
    const accordionComponents = screen.getAllByTestId("custom-accordion");
    expect(accordionComponents).toHaveLength(sectionCount);
  });

  it("should call settingInactiveCheckBox when setting inactive checkbox", () => {
    const settingInactiveCheckBox = jest.fn();
    render(<MonitoringPlanTabRender settingInactiveCheckBox={settingInactiveCheckBox} />);
    
    // Trigger the settingInactiveCheckBox function
    // For example, if there's a button that sets the inactive checkbox
    fireEvent.click(screen.getByText("Set Inactive"));

    // Expect that settingInactiveCheckBox has been called
    expect(settingInactiveCheckBox).toHaveBeenCalled();
  });

  // Add more test cases to thoroughly test the component's behavior
});
