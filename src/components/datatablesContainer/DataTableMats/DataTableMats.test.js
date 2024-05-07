import { Provider } from "react-redux";
import DataTableMats from "./DataTableMats";
import { act, render, screen } from "@testing-library/react";

import * as monitorPlanApi from "../../../utils/api/monitoringPlansApi";
import * as extractUserInput from "../../../additional-functions/extract-user-input";

import configureStore from "../../../store/configureStore.dev";
import { getMockDataTableMatsMdmData, getMockDataTableMatsProps, getMockMonitoringMatsMethods, getMockMonitoringMethods } from "./mocks";
import initialState from "../../../store/reducers/initialState";

const mockInitialState = JSON.parse(JSON.stringify(initialState))
mockInitialState.openedFacilityTabs.monitoringPlans = [{ inactive: [{}] }]
// mdmData prop
mockInitialState.dropdowns.matsMethods = getMockDataTableMatsMdmData()

const store = configureStore(mockInitialState);

describe("- DataTableMats -", () => {
  beforeEach(() => {
    jest.spyOn(monitorPlanApi, "getMonitoringMatsMethods").mockResolvedValue({
      data: getMockMonitoringMatsMethods(),
    });

    jest.spyOn(monitorPlanApi, "getMonitoringMethods").mockResolvedValue({
      data: getMockMonitoringMethods(),
    });

    // bypass user input validation for saving/editing
    jest.spyOn(extractUserInput, "validateUserInput").mockReturnValue([])
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders DataTableMats", async () => {
    const props = getMockDataTableMatsProps()
    await act(async () => {
      render(
        <Provider store={store}>
          <DataTableMats {...props} />
        </Provider>
      );
    })
  });

  test("DataTableMats create", async () => {
    const createMats = jest.fn().mockResolvedValue({ status: 201 });

    jest
      .spyOn(monitorPlanApi, "createMats")
      .mockImplementation(createMats);

    await act(async () => {
      const props = getMockDataTableMatsProps()
      render(
        <Provider store={store}>
          <DataTableMats {...props} />
        </Provider>
      );
    })

    const addBtn = screen.getByTestId("addBtn")
    await act(() => addBtn.click())

    const saveBtn = screen.getByTestId("saveBtn")
    await act(() => saveBtn.click())

    expect(createMats).toHaveBeenCalled();

  }, 20000);

  test("DataTableMats edit", async () => {
    const saveMonitoringMats = jest.fn().mockResolvedValue({ status: 200 });

    jest
      .spyOn(monitorPlanApi, "saveMonitoringMats")
      .mockImplementation(saveMonitoringMats);

    await act(async () => {
      const props = getMockDataTableMatsProps()
      render(
        <Provider store={store}>
          <DataTableMats {...props} />
        </Provider>
      );
    })

    const addBtn = screen.getByTestId("viewEditBtn-0")
    await act(() => addBtn.click())

    const saveBtn = screen.getByTestId("saveBtn")
    await act(() => saveBtn.click())

    expect(saveMonitoringMats).toHaveBeenCalled();
  }, 20000);
})