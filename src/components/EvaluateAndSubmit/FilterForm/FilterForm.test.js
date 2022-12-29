import React from "react";
import { render, act, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import FilterForm from "./FilterForm";

jest.mock("../../../utils/api/monitoringPlansApi", () => ({
  getMonitoringPlans: jest.fn().mockResolvedValue({
    data: [
      { id: "MOCK-1", active: true, facilityName: "Barry", name: "1" },
      { id: "MOCK-2", active: true, facilityName: "Barry", name: "2" },
      { id: "MOCK-3", active: true, facilityName: "Barry", name: "3" },
    ],
  }),
}));

jest.mock("../../../utils/api/mdmApi", () => ({
  getReportingPeriods: jest.fn().mockResolvedValue({
    data: [
      { periodAbbreviation: "2022 Q3" },
      { periodAbbreviation: "2022 Q4" },
    ],
  }),
}));

const mockFacilities = [
  {
    id: 3,
    facilityName: "Barry",
    permissions: ["DSMP", "DSQA", "DSEM"],
  },
  {
    id: 7,
    facilityName: "Gadsden",
    permissions: [],
  },
  {
    id: 10,
    facilityName: "Greene County",
    permissions: ["MPDS", "QADS", "EMDS"],
  },
];

describe("Review and submit form", () => {
  afterAll(() => {
    jest.clearAllMocks();
  });

  test("Render Review and Submit Form with no errors", async () => {
    let container;

    await act(async () => {
      container = render(
        <FilterForm
          facilities={mockFacilities}
          queryCallback={jest.fn()}
          showModal={jest.fn()}
          setExcludeErrors={jest.fn()}
          filesSelected={1}
        />
      );
    });

    expect(container).toBeDefined();
  });

  test("Render Review and Submit Form with no errors", async () => {
    const mockErrorCall = jest.fn();
    await act(async () => {
      render(
        <FilterForm
          facilities={mockFacilities}
          queryCallback={jest.fn()}
          showModal={jest.fn()}
          setExcludeErrors={mockErrorCall}
          filesSelected={1}
        />
      );
    });

    await act(async () => {
      screen.getByTestId("radio-exclude").click();
      screen.getByTestId("radio-include").click();
    });

    expect(mockErrorCall).toHaveBeenCalled();
  });

  test("Render drop box of facilities and click a facility to load a configuration", async () => {
    let byText;

    await act(async () => {
      const { getByText } = render(
        <FilterForm
          facilities={mockFacilities}
          queryCallback={jest.fn()}
          showModal={jest.fn()}
          setExcludeErrors={jest.fn()}
          filesSelected={1}
        />
      );

      byText = getByText;
    });

    await act(async () => {
      const facilityInput = screen.getByTestId("Facilities-input-search");
      await userEvent.click(facilityInput);
      await byText("Barry (3)").click();
    });

    await act(async () => {
      const configurationInput = screen.getByTestId(
        "Configurations-input-search"
      );
      await userEvent.click(configurationInput);
    });

    expect(byText("Barry - 1")).toBeInTheDocument();
  });

  test("Click a configuration from returned configurations", async () => {
    let orisTable;
    let monPlanTable;
    const mockCallback = jest.fn((oris, monPlan) => {
      orisTable = oris;
      monPlanTable = monPlan;
    });

    let byText;

    await act(async () => {
      const { getByText } = render(
        <FilterForm
          facilities={mockFacilities}
          queryCallback={mockCallback}
          showModal={jest.fn()}
          setExcludeErrors={jest.fn()}
          filesSelected={1}
        />
      );
      byText = getByText;
    });

    await act(async () => {
      const facilityInput = screen.getByTestId("Facilities-input-search");
      await userEvent.click(facilityInput);
      await byText("Barry (3)").click();
    });

    await act(async () => {
      const configurationInput = screen.getByTestId(
        "Configurations-input-search"
      );
      await userEvent.click(configurationInput);
    });

    await act(async () => {
      byText("Barry - 1").click();
      byText("Apply Filter(s)").click();
    });

    expect(orisTable).toEqual(["3"]);
    expect(monPlanTable).toEqual(["MOCK-1"]);
  });

  test("Default reporting period loaded", async () => {
    let byText;

    await act(async () => {
      const { getByText } = render(
        <FilterForm
          facilities={mockFacilities}
          queryCallback={jest.fn()}
          showModal={jest.fn()}
          setExcludeErrors={jest.fn()}
          filesSelected={1}
        />
      );
      byText = getByText;
    });

    expect(byText("2022 Q4")).toBeInTheDocument();
  });

  test("Click a reporting period", async () => {
    let reportingPeriods;
    const mockCallback = jest.fn((oris, monPlan, rps) => {
      reportingPeriods = rps;
    });

    let byText;
    await act(async () => {
      const { getByText } = render(
        <FilterForm
          facilities={mockFacilities}
          queryCallback={mockCallback}
          showModal={jest.fn()}
          setExcludeErrors={jest.fn()}
          filesSelected={1}
        />
      );
      byText = getByText;
    });

    await act(async () => {
      const reportInput = screen.getByTestId("Reporting-Periods-input-search");
      await userEvent.click(reportInput);
      byText("2022 Q3").click();
    });

    await act(async () => {
      const facilityInput = screen.getByTestId("Facilities-input-search");
      await userEvent.click(facilityInput);
      await byText("Barry (3)").click();
    });

    await act(async () => {
      const configurationInput = screen.getByTestId(
        "Configurations-input-search"
      );
      await userEvent.click(configurationInput);
    });

    await act(async () => {
      byText("Barry - 1").click();
      byText("Apply Filter(s)").click();
    });

    expect(reportingPeriods).toEqual(["2022 Q4", "2022 Q3"]);
  });
});
