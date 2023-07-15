import { Provider } from "react-redux";
import { act, render, screen } from "@testing-library/react";

import * as monitorPlanApi from "../../../utils/api/monitoringPlansApi";

import configureStore from "../../../store/configureStore.dev";
import { getMockDataTablePCTQualMdmData, getMockDataTablePCTQualificationsProps, getMockPCTQualifications } from "./mocks";
import initialState from "../../../store/reducers/initialState";
import { PCT_QUALIFICATIONS_STORE_NAME } from "../../../additional-functions/data-table-section-and-store-names";
import DataTablePCTQualifications from "./DataTablePCTQualifications";

const mockInitialState = JSON.parse(JSON.stringify(initialState))
mockInitialState.openedFacilityTabs.monitoringPlans = [{ inactive: [{}] }]
// mdmData prop
mockInitialState.dropdowns[PCT_QUALIFICATIONS_STORE_NAME] = getMockDataTablePCTQualMdmData()

const store = configureStore(mockInitialState);

describe("- DataTablePCTQualifications -", () => {
  beforeEach(() => {
    jest.spyOn(monitorPlanApi, "getPCTQualifications").mockResolvedValue({
      data: getMockPCTQualifications(),
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders DataTablePCTQualifications", async () => {
    const props = getMockDataTablePCTQualificationsProps()
    await act(async () => {
      render(
        <Provider store={store}>
          <DataTablePCTQualifications {...props} />
        </Provider>
      );
    })
  });

  test("open DataTablePCTQualifications modal", async () => {
    await act(async () => {
      const props = getMockDataTablePCTQualificationsProps()
      render(
        <Provider store={store}>
          <DataTablePCTQualifications {...props} />
        </Provider>
      );
    })

    const addBtn = screen.getByTestId("addBtn")
    await act(() => addBtn.click())

    expect(addBtn).toBeDefined();

  });

  test("DataTablePCTQualifications edit", async () => {
    await act(async () => {
      const props = getMockDataTablePCTQualificationsProps()
      render(
        <Provider store={store}>
          <DataTablePCTQualifications {...props} />
        </Provider>
      );
    })

    const addBtn = screen.getByTestId("viewEditBtn-0")
    await act(() => addBtn.click())

    expect(addBtn).toBeDefined()
  });
})