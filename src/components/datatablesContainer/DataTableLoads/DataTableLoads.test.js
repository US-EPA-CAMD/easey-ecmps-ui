import React from "react";
import { render, waitForElement, fireEvent } from "@testing-library/react";
import { DataTableLoads } from "./DataTableLoads";
import * as mpApi from "../../../utils/api/monitoringPlansApi";
import { extractUserInput } from "../../../additional-functions/extract-user-input";
import { handleResponse, handleError } from "../../../utils/api/apiUtils";
import { secureAxios } from "../../../utils/api/easeyAuthApi";
import * as axios from "axios";
jest.mock("axios");

// jest.mock("axios", () => ({
//   post: jest.fn((_url, _body) => {
//     return new Promise((resolve) => {
//       url = _url;
//       body = _body;
//       resolve(true);
//     });
//   }),

//   get: jest.fn().mockResolvedValue({ data: {} }),
// }));

const selectedLoads = [{}];
const returnedLoad = {};

const locationSelectValue = 6;

const payload = {
  locationId: locationSelectValue,
  id: 1111,
  maximumLoadValue: 0,
  maximumLoadUnitsOfMeasureCode: "string",
  lowerOperationBoundary: 0,
  upperOperationBoundary: 0,
  normalLevelCode: "string",
  secondLevelCode: "string",
  secondNormalIndicator: 0,
  loadAnalysisDate: "2021-09-16T20:55:48.806Z",
  beginDate: "2021-09-16T20:55:48.806Z",
  beginHour: 0,
  endDate: "2021-09-16T20:55:48.806Z",
  endHour: 0,
};

const radioName = "secondNormalIndicator";
const userInput = extractUserInput(payload, ".modalUserInput", radioName);

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

test("test create/save Load functions", async () => {
  let { container } = await waitForElement(() =>
    componentRenderer(false, false, false, true, false)
  );

  fireEvent.click(container.querySelector("#testingBtn"));
  fireEvent.click(container.querySelector("#testingBtn2"));
  fireEvent.click(container.querySelector("#testingBtn3"));
});
