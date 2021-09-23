import React from "react";
import { render, waitForElement, fireEvent } from "@testing-library/react";
import { DataTableLoads } from "./DataTableLoads";
import * as mpApi from "../../../utils/api/monitoringPlansApi";
const axios = require("axios");

jest.mock("axios");

const selectedLoads = [{}];

//testing redux connected component to mimic props passed as argument
const componentRenderer = (
  checkout,
  secondLevel,
  addComponentFlag,
  openComponentViewTest,
  openAddComponentTest
) => {
  const props = {
    locationSelectValue: "1111",
    user: "testuser",
    checkout: false,
    inactive: [false],
    settingInactiveCheckBox: jest.fn(),
    revertedState: false,
    setRevertedState: jest.fn(),
  };
  return render(<DataTableLoads {...props} />);
};

test("tests getMonitoringLoads", async () => {
  axios.get.mockImplementation(() =>
    Promise.resolve({ status: 200, data: selectedLoads })
  );
  const title = await mpApi.getMonitoringLoads(6);
  expect(title.data).toEqual(selectedLoads);
  let { container } = await waitForElement(() =>
    componentRenderer(false, false, false, true, false)
  );
  // componentRenderer(6);
  expect(container).toBeDefined();
});
