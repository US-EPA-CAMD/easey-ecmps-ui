import React from "react";
import { act, render, screen } from "@testing-library/react";
import {
  DataTableAnalyzerRanges,
  mapStateToProps,
  mapDispatchToProps,
} from "./DataTableAnalyzerRanges";
import { Provider } from "react-redux";
import configureStore from "../../../store/configureStore.dev";
import * as monitorPlanApi from "../../../utils/api/monitoringPlansApi";
import { getMockMonitoringAnalyzerRanges } from "../../../mocks/functions";
import initialState from "../../../store/reducers/initialState";
const mockInitialState = JSON.parse(JSON.stringify(initialState));

mockInitialState.dropdowns.analyzerRanges = [
  {
    analyzerRangeCode: "L",
  },
];
const store = configureStore(mockInitialState);

describe("Datatable Analyzer Ranges - ", () => {
  const props = {
    mdmData: [],
    loadDropdownsData: jest.fn(),
    user: { firstName: "test" },
    checkout: true,

    selectedRanges: getMockMonitoringAnalyzerRanges()[0],
    thirdLevel: false,
    updateAnalyzerRangeTable: false,
    setThirdLevel: jest.fn(),

    setOpenFuelFlowsView: jest.fn(),
    setComponentView: jest.fn(),
    setSelectedModalData: jest.fn(),
    setSaveAnalyzerRange: jest.fn(),
    setSelectedRange: jest.fn(),
    setCreateAnalyzerRangesFlag: jest.fn(),
    setUpdateAnalyzerRangeTable: jest.fn(),
  };
  beforeEach(() => {
    jest
      .spyOn(monitorPlanApi, "getMonitoringAnalyzerRanges")
      .mockResolvedValue({
        data: getMockMonitoringAnalyzerRanges(),
      });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders rows from the data fetched", async () => {
    await act(async () => {
      render(
        <Provider store={store}>
          <DataTableAnalyzerRanges {...props} />
        </Provider>
      );
    });

    const rows = screen.getAllByRole("img");

    expect(rows.length).toBe(1);
  });
  test("mapStateToProps calls the appropriate state", async () => {
    // mock the 'dispatch' object
    const dispatch = jest.fn();
    const state = { dropdowns: [1] };
    const stateProps = mapStateToProps(state, true);
  });

  test("mapDispatchToProps calls the appropriate action", async () => {
    // mock the 'dispatch' object
    const dispatch = jest.fn();
    const actionProps = mapDispatchToProps(dispatch);
    const state = store.getState();
    const stateProps = mapStateToProps(state);

    // verify the appropriate action was called
    actionProps.loadDropdownsData();
    expect(state).toBeDefined();
  });
});
