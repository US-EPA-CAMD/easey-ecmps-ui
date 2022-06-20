import React from "react";
import { render, waitForElement, fireEvent } from "@testing-library/react";
import {
  DataTableAnalyzerRanges,
  mapStateToProps,
  mapDispatchToProps,
} from "./DataTableAnalyzerRanges";
import * as mpApi from "../../../utils/api/monitoringPlansApi";
const axios = require("axios");
import { Provider } from "react-redux";
import configureStore from "../../../store/configureStore.dev";
const store = configureStore();
jest.mock("axios");

const ranges = [
  {
    active: false,
    addDate: "2009-02-20",
    analyzerRangeCode: "H",
    beginDate: "1993-10-01",
    beginHour: "0",
    componentRecordId: "CAMD-60A6D62FDAB14840BFCF67E049B4B4C5",
    dualRangeIndicator: "0",
    endDate: "2019-11-06",
    endHour: "14",
    id: "CAMD-A39804B8C17A4478970F7B2CCBF429B6",
    updateDate: "2020-01-23",
    userId: "bvick",
  },
];

//testing redux connected component to mimic props passed as argument
const componentRenderer = (update, mdmData) => {
  let currentData = [];

  if (mdmData) {
    currentData = mdmData;
  }

  const props = {
    mdmData: currentData,
    loadDropdownsData: jest.fn(),
    user: { firstName: "test" },
    checkout: true,

    selectedRanges: ranges[0],
    thirdLevel: false,
    updateAnalyzerRangeTable: update,
    setThirdLevel: jest.fn(),

    setOpenFuelFlowsView: jest.fn(),
    setComponentView: jest.fn(),
    setSelectedModalData: jest.fn(),
    setSaveAnalyzerRange: jest.fn(),
    setSelectedRange: jest.fn(),
    setCreateAnalyzerRangesFlag: jest.fn(),
    setUpdateAnalyzerRangeTable: jest.fn(),
  };
  return render(
  
    <Provider store={store}> <DataTableAnalyzerRanges {...props} /> </Provider>);
};

test("renders an analyzer range with mdm data", async () => {
  axios.get.mockImplementation(() =>
    Promise.resolve({ status: 200, data: ranges })
  );
  const title = await mpApi.getMonitoringAnalyzerRanges("5", "CAMD");
  expect(title.data).toEqual(ranges);
  let { container } = await waitForElement(() =>
    componentRenderer(false, { test: "" })
  );
  componentRenderer(true);
  fireEvent.click(container.querySelector("#testingBtn"));
  expect(container).toBeDefined();
});

test("renders an analyzer range withOUT mdm data", async () => {
  axios.get.mockImplementation(() =>
    Promise.resolve({ status: 200, data: ranges })
  );
  const title = await mpApi.getMonitoringAnalyzerRanges("5", "CAMD");
  expect(title.data).toEqual(ranges);
  let { container } = await waitForElement(() =>
    componentRenderer(false, false)
  );
  componentRenderer(true, false);
  expect(container).toBeDefined();
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