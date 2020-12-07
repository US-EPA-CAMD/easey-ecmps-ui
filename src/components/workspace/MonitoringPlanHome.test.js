import React from "react";
import { render } from "@testing-library/react";
import MonitoringPlanHome from "./MonitoringPlanHome";

describe("testing montoring plans viewer Home component", () => {
  test("renders entire page", () => {
    const { container } = render(<MonitoringPlanHome />);
    const numOfTabBar = container.querySelectorAll("tabsBar");
    expect(numOfTabBar.length).toBe(1);
  });
});
