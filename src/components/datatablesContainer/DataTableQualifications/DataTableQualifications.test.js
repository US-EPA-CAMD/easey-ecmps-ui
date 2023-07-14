import { Provider } from "react-redux";
import { act, render, screen } from "@testing-library/react";

import * as monitorPlanApi from "../../../utils/api/monitoringPlansApi";

import configureStore from "../../../store/configureStore.dev";
import { getMockDataTableQualMdmData, getMockDataTableQualProps, getMockQualifications } from "./mocks";
import initialState from "../../../store/reducers/initialState";
import DataTableQualifications from "./DataTableQualifications";
import { QUALIFICATIONS_STORE_NAME } from "../../../additional-functions/data-table-section-and-store-names";

const mockInitialState = JSON.parse(JSON.stringify(initialState))
mockInitialState.openedFacilityTabs.monitoringPlans = [{ inactive: [{}] }]
// mdmData prop
mockInitialState.dropdowns[QUALIFICATIONS_STORE_NAME] = getMockDataTableQualMdmData()

const store = configureStore(mockInitialState);

describe("- DataTableQualifications -", () => {
  beforeEach(() => {
    jest.spyOn(monitorPlanApi, "getQualifications").mockResolvedValue({
      data: getMockQualifications(),
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders DataTableQualifications", async () => {
    const props = getMockDataTableQualProps()
    await act(async () => {
      render(
        <Provider store={store}>
          <DataTableQualifications {...props} />
        </Provider>
      );
    })
  });

  test("DataTableQualifications create", async () => {
    await act(async () => {
      const props = getMockDataTableQualProps()
      render(
        <Provider store={store}>
          <DataTableQualifications {...props} />
        </Provider>
      );
    })

    const addBtn = screen.getByTestId("addBtn")
    await act(() => addBtn.click())

    expect(addBtn).toBeDefined()
  });

  test("DataTableQualifications edit", async () => {
    await act(async () => {
      const props = getMockDataTableQualProps()
      render(
        <Provider store={store}>
          <DataTableQualifications {...props} />
        </Provider>
      );
    })

    const addBtn = screen.getByTestId("viewEditBtn-0")
    await act(() => addBtn.click())

    expect(addBtn).toBeDefined()
  });
})