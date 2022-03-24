import React from "react";
import { render, waitForElement, fireEvent } from "@testing-library/react";
import * as mpApi from "../../../utils/api/monitoringPlansApi";
import * as axios from "axios";
import {
  DataTableQualifications,
  mapDispatchToProps,
  mapStateToProps,
} from "./DataTableQualifications";
jest.mock("axios");

const selectedQualifications = [
  {
    id: "MIKE",
    locationId: "129",
    qualificationTypeCode: "LEE",
    beginDate: "2-07-15",
    endDate: null,
    active: true,
    leeQualifications: [],
    lmeQualifications: [],
    pctQualifications: [],
  },
];

const locationSelectValue = 60;

//testing redux connected component to mimic props passed as argument
const componentRenderer = (
  checkout,
  secondLevel,
  addComponentFlag,
  openComponentViewTest,
  openAddComponentTest,
  mdmData
) => {
  let currentData = [];

  if (mdmData) {
    currentData = mdmData;
  }

  const props = {
    mdmData: currentData,
    loadDropdownsData: jest.fn(),
    locationSelectValue: "60",
    user: "testUser",
    checkout: false,
    inactive: [false],
    settingInactiveCheckBox: jest.fn(),
    revertedState: false,
    setRevertedState: jest.fn(),

    selectedLocation: "50",
  };
  return render(<DataTableQualifications {...props} />);
};

test("tests getMonitoringQualifications", async () => {
  axios.get.mockImplementation(() =>
    Promise.resolve({
      status: 200,
      data: selectedQualifications,
    })
  );
  const title = await mpApi.getQualifications(locationSelectValue);
  expect(title.data).toEqual(selectedQualifications);

  let { container } = await waitForElement(() =>
    componentRenderer(false, false, false, true, false, { test: "" })
  );

  expect(container).toBeDefined();
});

test("tests getMonitoringQualifications WITHOUT mdmdata", async () => {
  axios.get.mockImplementation(() =>
    Promise.resolve({ status: 200, data: selectedQualifications })
  );
  const title = await mpApi.getQualifications(locationSelectValue);
  expect(title.data).toEqual(selectedQualifications);

  let { container } = await waitForElement(() =>
    componentRenderer(false, false, false, true, false, false)
  );
  expect(container).toBeDefined();
});

test("test create/save Load functions", async () => {
  let { container } = await waitForElement(() =>
    componentRenderer(false, false, false, true, false, { test: "" })
  );

  fireEvent.click(container.querySelector("#testingBtn2"));
  fireEvent.click(container.querySelector("#testingBtn"));
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
