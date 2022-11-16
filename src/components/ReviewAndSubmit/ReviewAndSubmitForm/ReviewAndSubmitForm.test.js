import React from "react";
import { render, act, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ReviewAndSubmitForm from "./ReviewAndSubmitForm";

jest.mock("../../../utils/api/monitoringPlansApi", () => ({
  getMonitoringPlans: jest.fn().mockResolvedValue({
    data: [
      { id: "MOCK-1", active: true, facilityName: "Barry", name: "1" },
      { id: "MOCK-2", active: true, facilityName: "Barry", name: "2" },
      { id: "MOCK-3", active: true, facilityName: "Barry", name: "3" },
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

  test("Render Review and Submit Form with no errors", () => {
    const { container } = render(
      <ReviewAndSubmitForm
        facilities={mockFacilities}
        queryCallback={jest.fn()}
        showModal={jest.fn()}
        setExcludeErrors={jest.fn()}
      />
    );

    expect(container).toBeDefined();
  });

  test("Render Review and Submit Form with no errors", async () => {
    const mockErrorCall = jest.fn();

    render(
      <ReviewAndSubmitForm
        facilities={mockFacilities}
        queryCallback={jest.fn()}
        showModal={jest.fn()}
        setExcludeErrors={mockErrorCall}
      />
    );

    await act(async () => {
      screen.getByTestId("radio-exclude").click();
      screen.getByTestId("radio-include").click();
    });

    expect(mockErrorCall).toHaveBeenCalled();
  });

  test("Render drop box of facilities and click a facility to load a configuration", async () => {
    const { getByText } = render(
      <ReviewAndSubmitForm
        facilities={mockFacilities}
        queryCallback={jest.fn()}
        showModal={jest.fn()}
        setExcludeErrors={jest.fn()}
      />
    );

    await act(async () => {
      const facilityInput = screen.getByTestId("Facilities-input-search");
      await userEvent.click(facilityInput);
      await getByText("Barry (3)").click();
    });

    await act(async () => {
      const configurationInput = screen.getByTestId(
        "Configurations-input-search"
      );
      await userEvent.click(configurationInput);
    });

    expect(getByText("Barry - 1")).toBeInTheDocument();
  });

  test("Click a configuration from returned configurations", async () => {
    let orisTable;
    let monPlanTable;
    const mockCallback = jest.fn((oris, monPlan) => {
      orisTable = oris;
      monPlanTable = monPlan;
    });

    const { getByText } = render(
      <ReviewAndSubmitForm
        facilities={mockFacilities}
        queryCallback={mockCallback}
        showModal={jest.fn()}
        setExcludeErrors={jest.fn()}
      />
    );

    await act(async () => {
      const facilityInput = screen.getByTestId("Facilities-input-search");
      await userEvent.click(facilityInput);
      await getByText("Barry (3)").click();
    });

    await act(async () => {
      const configurationInput = screen.getByTestId(
        "Configurations-input-search"
      );
      await userEvent.click(configurationInput);
    });

    await act(async () => {
      getByText("Barry - 1").click();
      getByText("Apply Filter(s)").click();
    });

    expect(orisTable).toEqual(["3"]);
    expect(monPlanTable).toEqual(["MOCK-1"]);
  });
});
