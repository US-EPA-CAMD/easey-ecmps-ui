import React from "react";
import { render, waitForElement, fireEvent } from "@testing-library/react";
import { DataTableDefaults } from "./DataTableDefaults";
import * as mpApi from "../../../utils/api/monitoringPlansApi";
import * as axios from "axios";
jest.mock("axios");



const selectedDefaults = [{}];



//testing redux connected component to mimic props passed as argument
const componentRenderer = (
  checkout
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
  return render(<DataTableDefaults {...props} />);
};

test("tests getMonitoringLoads", async () => {
  axios.get.mockImplementation(() =>
    Promise.resolve({ status: 200, data: selectedDefaults })
  );
  const title = await mpApi.getMonitoringDefaults(6);
  expect(title.data).toEqual(selectedDefaults);

  let { container } = await waitForElement(() =>
    componentRenderer(false)
  );
  expect(container).toBeDefined();
});

test("test create/save Defaults functions", async () => {
  let { container } = await waitForElement(() =>
    componentRenderer(false)
  );

  fireEvent.click(container.querySelector("#testingBtn"));
  fireEvent.click(container.querySelector("#testingBtn2"));
});
