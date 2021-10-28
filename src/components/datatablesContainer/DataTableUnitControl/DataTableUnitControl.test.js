import React from "react";
import { render, waitForElement, fireEvent } from "@testing-library/react";
import { DataTableUnitControl } from "./DataTableUnitControl";
import * as mpApi from "../../../utils/api/monitoringPlansApi";
import { extractUserInput } from "../../../additional-functions/extract-user-input";
import { handleResponse, handleError } from "../../../utils/api/apiUtils";
import { secureAxios } from "../../../utils/api/easeyAuthApi";
import * as axios from "axios";
jest.mock("axios");

const selectedUnitControls = [{}];
const returnedUnitControl = {};

const selectedLocation = { id: "6", unitRecordId: 1 };

const payload = {
  locationId: "6",
  id: null,
  parameterCode: "string",
  controlCode: "string",
  originalCode: "",
  seasonalControlsIndicator: "",
  installDate: null,
  optimizationDate: null,
  retireDate: null,
};

const radios = ["originalCode", "seasonalControlsIndicator"];
const userInput = extractUserInput(payload, ".modalUserInput", radios);

//testing redux connected component to mimic props passed as argument
const componentRenderer = (
  checkout,
  secondLevel,
  addComponentFlag,
  openComponentViewTest,
  openAddComponentTest
) => {
  const props = {
    locationSelectValue: "6",
    user: "testuser",
    checkout: false,
    inactive: [false],
    settingInactiveCheckBox: jest.fn(),
    revertedState: false,
    setRevertedState: jest.fn(),
    selectedLocation: selectedLocation,
  };
  return render(<DataTableUnitControl {...props} />);
};

test("tests getMonitoringPlansUnitControlRecords", async () => {
  axios.get.mockImplementation(() =>
    Promise.resolve({ status: 200, data: selectedUnitControls })
  );
  const title = await mpApi
    .getMonitoringPlansUnitControlRecords(selectedLocation)
    .catch((error) => {
      console.log(error);
    });
  expect(title.data).toEqual(selectedUnitControls);

  let { container } = await waitForElement(() =>
    componentRenderer(false, false, false, true, false)
  );
  // componentRenderer(6);
  expect(container).toBeDefined();
});

test("test create/save Load functions", async () => {
  let { container } = await waitForElement(() =>
    componentRenderer(false, false, false, true, false)
  );

  fireEvent.click(container.querySelector("#testingBtn"));
  fireEvent.click(container.querySelector("#testingBtn2"));
  fireEvent.click(container.querySelector("#testingBtn3"));
});
