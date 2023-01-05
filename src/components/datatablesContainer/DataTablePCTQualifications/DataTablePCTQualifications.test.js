import React from "react";
import { render, waitForElement, fireEvent } from "@testing-library/react";
import * as mpApi from "../../../utils/api/monitoringPlansApi";
import * as axios from "axios";
import {
  DataTablePCTQualifications,
  mapDispatchToProps,
  mapStateToProps,
} from "./DataTablePCTQualifications";
jest.mock("axios");

const selectedQualifications = [{}];

const locationSelectValue = 60;

//testing redux connected component to mimic props passed as argument
const componentRenderer = (
  checkout,
  secondLevel,
  addComponentFlag,
  openComponentViewTest,
  openAddComponentTest,
  mdmDataPCT
) => {
  let currentData = [];

  if (mdmDataPCT) {
    currentData = mdmDataPCT;
  }

  const props = {
    mdmDataPCT: currentData,
    loadDropdownsData: jest.fn(),
    locationSelectValue: "60",
    qualSelectValue: "60",
    user: "testUser",
    checkout: false,
    inactive: [false],
    settingInactiveCheckBox: jest.fn(),
    revertedState: false,
    setRevertedState: jest.fn(),
    setOpenPCT: jest.fn(),
    openPCT: false,
    setUpdatePCT: jest.fn(),
    updatePCT: false,
    setCreatingChild: jest.fn(),
  };
  return render(<DataTablePCTQualifications {...props} />);
};

test("tests getMonitoringQualifications", async () => {
  axios.get.mockImplementation(() =>
    Promise.resolve({ status: 200, data: selectedQualifications })
  );
  const title = await mpApi.getQualifications(locationSelectValue);
  expect(title.data).toEqual(selectedQualifications);

  let { container } = await waitForElement(() =>
    componentRenderer(false, false, false, true, false, { test: "" })
  );

  let backBtns = container.querySelectorAll("#testBtn");

  for (var x of backBtns) {
    fireEvent.click(x);
  }
  expect(container).toBeDefined();
});

test("tests getMonitoringQualifications", async () => {
  axios.get.mockImplementation(() =>
    Promise.resolve({ status: 200, data: selectedQualifications })
  );
  const title = await mpApi.getQualifications(locationSelectValue);
  expect(title.data).toEqual(selectedQualifications);

  let { container } = await waitForElement(() =>
    componentRenderer(false, false, false, true, false, undefined)
  );

  let backBtns = container.querySelectorAll("#testBtn");

  for (var x of backBtns) {
    fireEvent.click(x);
  }
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
  const formData = [];
  // verify the appropriate action was called
  actionProps.loadDropdownsData();
});
