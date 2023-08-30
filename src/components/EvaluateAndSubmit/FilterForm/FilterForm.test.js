import React from "react";
import { render, act, screen, fireEvent } from "@testing-library/react";
import FilterForm from "./FilterForm";
import * as monitoringPlansApi from "../../../utils/api/monitoringPlansApi";
import * as mdmApi from "../../../utils/api/mdmApi";

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
  beforeEach(() => {
    jest.spyOn(mdmApi, "getReportingPeriods").mockResolvedValueOnce({
      data: [
        { periodAbbreviation: "2022 Q3" },
        { periodAbbreviation: "2022 Q4" },
      ]
    });
    jest.spyOn(monitoringPlansApi, "getMonitoringPlans").mockResolvedValueOnce({
      data: [
        { id: "MOCK-1", active: true, facilityName: "Barry", name: "1" },
        { id: "MOCK-2", active: true, facilityName: "Barry", name: "2" },
        { id: "MOCK-3", active: true, facilityName: "Barry", name: "3" },
      ]
    });
  })

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
          componentType="Submission"
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
          componentType="Submission"
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
    await act(async () => {
      render(
        <FilterForm
          facilities={mockFacilities}
          queryCallback={jest.fn()}
          showModal={jest.fn()}
          setExcludeErrors={jest.fn()}
          filesSelected={1}
          componentType="Submission"
        />
      );

    });

    const facilityInput = screen.getByTestId("facilities-input-search");
    await act(async () => {
      fireEvent.click(facilityInput);
    });
    await act(async () => {
      screen.getByText("Barry (3)").click();
    });

    const configurationInput = screen.getByTestId("configurations-input-search");
    await act(async () => {
      fireEvent.click(configurationInput);
    });

    expect(screen.getByText("Barry - 1")).toBeInTheDocument();
  });

  test("Removes selections properly", async () => {
    await act(async () => {
      render(
        <FilterForm
          facilities={mockFacilities}
          queryCallback={jest.fn()}
          showModal={jest.fn()}
          setExcludeErrors={jest.fn()}
          filesSelected={1}
          componentType="Submission"
        />
      );
    });

    const facilityInput = screen.getByTestId("facilities-input-search");
    await act(async () => {
      fireEvent.click(facilityInput);
    });
    await act(async () => {
      screen.getByText("Barry (3)").click();
    });

    const configurationInput = screen.getByTestId("configurations-input-search");
    await act(async () => {
      fireEvent.click(configurationInput);
    });

    await act(async () => {
      const facilityRemoveButton = screen.getByTestId('3-remove');
      await fireEvent.click(facilityRemoveButton);
    });

    await act(async () => {
      const reportingPeriodRemoveButton = screen.getByTestId('2022 Q4-remove');
      await fireEvent.click(reportingPeriodRemoveButton);
    });

    expect(screen.queryByText("Barry - 1")).not.toBeInTheDocument();
  });

  test("Click a configuration from returned configurations", async () => {
    let orisTable;
    let monPlanTable;
    const mockCallback = jest.fn((oris, monPlan) => {
      orisTable = oris;
      monPlanTable = monPlan;
    });

    await act(async () => {
      render(
        <FilterForm
          facilities={mockFacilities}
          queryCallback={mockCallback}
          showModal={jest.fn()}
          setExcludeErrors={jest.fn()}
          filesSelected={1}
          componentType="Submission"
        />
      );
    });

    const facilityInput = screen.getByTestId("facilities-input-search");
    await act(async () => {
      fireEvent.click(facilityInput);
    });
    await act(async () => {
      screen.getByText("Barry (3)").click();
    });

    const configurationInput = screen.getByTestId("configurations-input-search");
    await act(async () => {
      fireEvent.click(configurationInput);
    });

    await act(async () => {
      screen.getByText("Barry - 1").click();
      screen.getByText("Apply Filter(s)").click();
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
          componentType="Submission"
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

    await act(async () => {
      render(
        <FilterForm
          facilities={mockFacilities}
          queryCallback={mockCallback}
          showModal={jest.fn()}
          setExcludeErrors={jest.fn()}
          filesSelected={1}
          componentType="Submission"
        />
      );
    });

    const reportInput = screen.getByTestId("reporting-periods-input-search");
    await act(async () => {
      fireEvent.click(reportInput);
    });
    await act(async () => {
      screen.getByText("2022 Q3").click();
    });

    const facilityInput = screen.getByTestId("facilities-input-search");
    await act(async () => {
      fireEvent.click(facilityInput);
    });
    await act(async () => {
      screen.getByText("Barry (3)").click();
    });

    const configurationInput = screen.getByTestId("configurations-input-search");
    await act(async () => {
      fireEvent.click(configurationInput);
    });

    await act(async () => {
      screen.getByText("Barry - 1").click();
      screen.getByText("Apply Filter(s)").click();
    });

    expect(reportingPeriods).toEqual(["2022 Q4", "2022 Q3"]);
  });
});
