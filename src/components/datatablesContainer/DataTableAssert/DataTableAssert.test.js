import React from "react";
import { act, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "../../../store/configureStore.dev";
import DataTableAssert from "./DataTableAssert";

import * as monitorPlanApi from "../../../utils/api/monitoringPlansApi";
import { getMockMonitoringSpans } from "../../../mocks/functions";
import initialState from "../../../store/reducers/initialState";
import { getDataTableAssertProps, getMockBothActiveAndInactiveRecords, getMockLocationAttributes, getMockMonitoringPlansFuelDataRecords, getMockMonitoringPlansUnitControlRecords, getMockOnlyInactiveRecords, getMockUnitCapacity } from "./mocks";

initialState.openedFacilityTabs.monitoringPlans = [
  {
    openedFacilityTabs: [],
    inactive: [true],
  },
]

const store = configureStore(initialState)

const props = getDataTableAssertProps()

describe("- DataTableAssert - ", () => {
  beforeEach(() => {
    jest.spyOn(monitorPlanApi, "getMonitoringSpans").mockResolvedValue({
      data: { items: getMockMonitoringSpans() },
    });
    jest.spyOn(monitorPlanApi, "getMonitoringPlansUnitControlRecords").mockResolvedValue({
      data: { items: getMockMonitoringPlansUnitControlRecords() },
    });
    jest.spyOn(monitorPlanApi, "getMonitoringPlansFuelDataRecords").mockResolvedValue({
      data: { items: getMockMonitoringPlansFuelDataRecords() },
    });
    jest.spyOn(monitorPlanApi, "getUnitCapacity").mockResolvedValue({
      data: { items: getMockUnitCapacity() },
    });
    jest.spyOn(monitorPlanApi, "getLocationAttributes").mockResolvedValue({
      data: { items: getMockLocationAttributes() },
    });

    // init modal button
    const modalBtn = document.createElement('button');
    modalBtn.id = 'my-modal-button';
    document.body.appendChild(modalBtn);

    window.openModalBtn = modalBtn;

    // mock window.scrollTo
    window.scrollTo = jest.fn()
  })

  afterEach(() => {
    jest.clearAllMocks();

    document.body.innerHTML = ''; // This will clear the DOM
    delete window.openModalBtn
  })

  test('renders with active and inactive data', async () => {
    jest.spyOn(monitorPlanApi, "getMonitoringSpans").mockResolvedValue({
      data: { items : getMockBothActiveAndInactiveRecords() },
    });

    await act(() => {
      render(
        <Provider store={store}>
          <DataTableAssert {...props} />
        </Provider>
      )
    })

    const table = screen.getByRole('table');
    expect(table).toBeDefined()
  })

  test('renders with only inactive data', async () => {
    jest.spyOn(monitorPlanApi, "getMonitoringSpans").mockResolvedValue({
      data: { items : getMockOnlyInactiveRecords() },
    });

    await act(() => {
      render(
        <Provider store={store}>
          <DataTableAssert {...props} />
        </Provider>
      )
    })

    const table = screen.getByRole('table');
    expect(table).toBeDefined()
  })

  test('renders unit info tables', async () => {
    const props = getDataTableAssertProps()
    props.dataTableName = 'Unit Control'

    await act(() => {
      render(
        <Provider store={store}>
          <DataTableAssert {...props} />
        </Provider>
      )
    })

    const table = screen.getByRole('table');
    expect(table).toBeDefined()
  })

  test('create data', async () => {
    const mockCreateMonitoringSpans = jest.fn().mockResolvedValue({ status: 201 });
    jest
      .spyOn(monitorPlanApi, "createMonitoringSpans")
      .mockImplementation(mockCreateMonitoringSpans);

    const props = getDataTableAssertProps();
    props.checkout = true
    await act(() => {
      render(
        <Provider store={store}>
          <DataTableAssert {...props} />
        </Provider>
      )
    })

    const addBtn = screen.getByTestId("addBtn")
    await act(() => {
      addBtn.click();
    });

    const saveAndCloseBtn = screen.getByTestId("saveBtn")

    await act(() => saveAndCloseBtn.click());

    expect(mockCreateMonitoringSpans).toHaveBeenCalled();
  }, 10000)
})
