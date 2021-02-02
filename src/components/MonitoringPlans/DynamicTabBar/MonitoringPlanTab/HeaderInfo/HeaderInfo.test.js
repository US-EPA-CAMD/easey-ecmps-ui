
import React from "react";
import { render, screen } from "@testing-library/react";
import HeaderInfo from "./HeaderInfo";

describe("testing drop down boxes appearing with monitoring plans being sent in ", () => {
  test("renders  drop downs", () => {
    const monitoringPlans = [
      {
        id: "6",
        name: "1",
        locations: [
          { id: "x", name: "location1" },
          { id: "y", name: "location2" },
        ],
      },
      { id: "7", name: "2" },
      { id: "8", name: "3" },
    ];

    const sections = [
      {
        id: "6",
        name: "section 11",
      },
      { id: "7", name: "section 2" },
    ];

    const methodLocationHandler = jest.fn();
    const { container } = render(
      <HeaderInfo
        facility={{ name: "Test Facility" }}
        sections={sections}
        monitoringPlans={monitoringPlans}
        methodLocationHandler={methodLocationHandler}
      />
    );
    expect(screen.getByDisplayValue("1")).toBeInTheDocument();
  });

  test("renders 0 drop down", () => {
    const monitoringPlans =[];

    const sections = [
      {
        id: "6",
        name: "section 11",
      },
      { id: "7", name: "section 2" },
    ];

    const methodLocationHandler = jest.fn();
    const { container } = render(
      <HeaderInfo
        facility={{ name: "Test Facility" }}
        sections={sections}
        monitoringPlans={monitoringPlans}
        methodLocationHandler={methodLocationHandler}
      />
    );
    expect(screen.getByText("Submit")).toBeInTheDocument();
  });
});