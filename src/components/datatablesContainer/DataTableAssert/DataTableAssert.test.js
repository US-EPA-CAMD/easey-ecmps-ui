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
      data: getMockMonitoringSpans(),
    });
    jest.spyOn(monitorPlanApi, "getMonitoringPlansUnitControlRecords").mockResolvedValue({
      data: getMockMonitoringPlansUnitControlRecords(),
    });
    jest.spyOn(monitorPlanApi, "getMonitoringPlansFuelDataRecords").mockResolvedValue({
      data: getMockMonitoringPlansFuelDataRecords(),
    });
    jest.spyOn(monitorPlanApi, "getUnitCapacity").mockResolvedValue({
      data: getMockUnitCapacity(),
    });
    jest.spyOn(monitorPlanApi, "getLocationAttributes").mockResolvedValue({
      data: getMockLocationAttributes(),
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
      data: getMockBothActiveAndInactiveRecords(),
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
      data: getMockOnlyInactiveRecords(),
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

  // test('save data', async () => {
  //   const mockSaveMonitoringSpans = jest.fn().mockResolvedValue({ status: 200 });
  //   jest
  //     .spyOn(monitorPlanApi, "saveMonitoringSpans")
  //     .mockImplementation(mockSaveMonitoringSpans); //Our final evaluation call that needs to be processed

  //   const props = getDataTableAssertProps();
  //   props.checkout = true
  //   await act(() => {
  //     render(
  //       <Provider store={store}>
  //         <DataTableAssert {...props} />
  //       </Provider>
  //     )
  //   })

  //   const firstViewEditBtn = screen.getByTestId("viewEditBtn-0")
  //   await act(() => {
  //     firstViewEditBtn.click();
  //   });

  //   const saveAndCloseBtn = screen.getByTestId("saveBtn")

  //   await act(() => saveAndCloseBtn.click());

  //   expect(mockSaveMonitoringSpans).toHaveBeenCalled();
  // }, 10000)

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
