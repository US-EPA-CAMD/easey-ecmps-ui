import React from "react";
import { act, render, screen, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "../../../store/configureStore.dev";
import DataTableLEEQualifications from "./DataTableCPMSQualifications";

import * as monitorPlanApi from "../../../utils/api/monitoringPlansApi";
import * as dataManagementApi from "../../../utils/api/dataManagementApi";

import { getMockLEEQualifications } from "./mocks";
import initialState from "../../../store/reducers/initialState";

const mockInitialState = JSON.parse(JSON.stringify(initialState))

mockInitialState.dropdowns.leeQualifications = [
  {
    parameterCode: "HG",
    unitsOfStandard: "LBTBTU",
    qualificationTestType: "INITIAL"
  },
]

const store = configureStore(mockInitialState);

describe("- DataTable LEE Qualifications - ", () => {
  beforeEach(() => {
    jest.spyOn(monitorPlanApi, "getLEEQualifications").mockResolvedValue({
      data: getMockLEEQualifications(),
    });
    jest.spyOn(dataManagementApi, "prefilteredLEEQualifications").mockResolvedValue({
      data: getMockLEEQualifications(),
    });
  })

  afterEach(() => {
    jest.clearAllMocks();
  })

  const props = {
    mdmData: [{}, {}],
    user: 'user',
    loadDropdownsData: jest.fn(),
    locationSelectValue: "60",
    checkout: false,
    inactive: [false],
    settingInactiveCheckBox: false,
    revertedState: false,
    setRevertedState: jest.fn(),
    setOpenLEE: jest.fn(),
    openLEE: false,
    setUpdateLEE: jest.fn(),
    updateLEE: true,
    setCreatingChild: jest.fn(),
  }

  it('renders rows from data fetched', async () => {
    await waitFor(async () => {
      render(
        <Provider store={store}>
          <DataTableLEEQualifications {...props} />
        </Provider>
      );
    });

    await waitFor(() => {
      const rows = screen.getAllByTestId('datatableContainer');
      const numRows = 1
      expect(rows.length).toBe(numRows);
    })
  })
})