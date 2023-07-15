import { Provider } from "react-redux";
import { act, render, screen } from "@testing-library/react";

import * as monitorPlanApi from "../../../utils/api/monitoringPlansApi";
import * as extractUserInput from "../../../additional-functions/extract-user-input";

import configureStore from "../../../store/configureStore.dev";
import initialState from "../../../store/reducers/initialState";
import { getMockDataTableMethodsMdmData, getMockDataTableMethodsProps, getMockMonitoringMatsMethods, getMockMonitoringMethods } from "./mocks";
import DataTableMethod from "./DataTableMethod";

const mockInitialState = JSON.parse(JSON.stringify(initialState))
mockInitialState.openedFacilityTabs.monitoringPlans = [{ inactive: [{}] }]
// mdmData prop
mockInitialState.dropdowns.methods = getMockDataTableMethodsMdmData()

const store = configureStore(mockInitialState);

describe("- DataTableMethods -", () => {
  beforeEach(() => {
    jest.spyOn(monitorPlanApi, "getMonitoringMethods").mockResolvedValue({
      data: getMockMonitoringMethods(),
    });

    jest.spyOn(monitorPlanApi, "getMonitoringMatsMethods").mockResolvedValue({
      data: getMockMonitoringMatsMethods(),
    });

    // bypass user input validation for saving/editing
    jest.spyOn(extractUserInput, "validateUserInput").mockReturnValue([])
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders DataTableMats", async () => {
    const props = getMockDataTableMethodsProps()
    await act(async () => {
      render(
        <Provider store={store}>
          <DataTableMethod {...props} />
        </Provider>
      );
    })
  });

  test("DataTableMethods create", async () => {
    const createMethods = jest.fn().mockResolvedValue({ status: 201 });

    jest
      .spyOn(monitorPlanApi, "createMethods")
      .mockImplementation(createMethods);

    await act(async () => {
      const props = getMockDataTableMethodsProps()
      render(
        <Provider store={store}>
          <DataTableMethod {...props} />
        </Provider>
      );
    })

    const addBtn = screen.getByTestId("addBtn")
    await act(() => addBtn.click())

    const saveBtn = screen.getByTestId("saveBtn")
    await act(() => saveBtn.click())

    expect(createMethods).toHaveBeenCalled();

  });

  test("DataTableMethods edit", async () => {
    const saveMonitoringMethods = jest.fn().mockResolvedValue({ status: 200 });

    jest
      .spyOn(monitorPlanApi, "saveMonitoringMethods")
      .mockImplementation(saveMonitoringMethods);

    await act(async () => {
      const props = getMockDataTableMethodsProps()
      render(
        <Provider store={store}>
          <DataTableMethod {...props} />
        </Provider>
      );
    })

    const addBtn = screen.getByTestId("viewEditBtn-0")
    await act(() => addBtn.click())

    const saveBtn = screen.getByTestId("saveBtn")
    await act(() => saveBtn.click())

    expect(saveMonitoringMethods).toHaveBeenCalled();
  });
})