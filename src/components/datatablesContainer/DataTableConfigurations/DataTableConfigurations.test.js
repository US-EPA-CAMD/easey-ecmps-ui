import React from "react";
import { act, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";

import * as monitorPlanApi from "../../../utils/api/monitoringPlansApi";

import { DataTableConfigurations } from "./DataTableConfigurations";
import configureStore from "../../../store/configureStore.dev";
import { getMockMonitorPlanConfigurations } from "../../../mocks/functions";

const store = configureStore();

describe("- DataTable Configurations -", () => {
  beforeEach(() => {
    jest.spyOn(monitorPlanApi, "getMonitoringPlans").mockResolvedValue({
      data: getMockMonitorPlanConfigurations(),
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  const mockData = {
    col1: "facilityName",
    col2: "3",
    col3: "stateCode",
    col4: "orisCode",
    facId: "facilityRecordId",
  };

  const props = {
    data: mockData,
    selectedRowHandler: jest.fn(),
    checkedOutLocations: [],
  };

  test("renders DataTableConfigurations", async () => {
    await act(async () => {
      render(
        <Provider store={store}>
          <DataTableConfigurations data={mockData} />
        </Provider>
      );
    });
    const title = screen.getByText("Configurations");
    expect(title).toBeDefined();
  });

  it("opens the configuration", async () => {
    await act(async () => {
      render(
        <Provider store={store}>
          <DataTableConfigurations {...props} />
        </Provider>
      );
    });

    const openBtns = screen.getAllByTestId("btnOpenPublicRecord");
    const firstOpenBtn = openBtns[0];

    await act(() => firstOpenBtn.click());

    screen.debug(undefined, 30000);

    const title = screen.getByText("Configurations");
    expect(title).toBeDefined();
  });
});
