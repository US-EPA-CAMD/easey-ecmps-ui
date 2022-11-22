import React from "react";
import { render, waitForElement, fireEvent } from "@testing-library/react";
import { DataTableRectangularDucts,mapStateToProps, } from "./DataTableRectangularDucts";
import * as mpApi from "../../../utils/api/monitoringPlansApi";
import { extractUserInput } from "../../../additional-functions/extract-user-input";
// import { handleResponse, handleError } from "../../../utils/api/apiUtils";
// import { secureAxios } from "../../../utils/api/easeyAuthApi";
import * as axios from "axios";
jest.mock("axios");


const selectedDucts = [{}];
const returnedDucts = {};

const locationSelectValue = 6;

const payload = {
  locationId: locationSelectValue,
  id: 1111,

  userId: "string",
  addDate: "2021-10-18T07:24:08.777Z",
  updateDate: "2021-10-18T07:24:08.777Z",
  wafDeterminationDate: "2021-10-18T07:24:08.777Z",
  wafBeginDate: "2021-10-18T07:24:08.777Z",
  wafBeginHour: 0,
  wafMethodCode: "string",
  wafValue: 0,
  numberOfTestRuns: 0,
  numberOfTraversePointsWaf: 0,
  numberOfTestPorts: 0,
  numberOfTraversePointsRef: 0,
  ductWidth: 0,
  ductDepth: 0,
  wafEndDate: "2021-10-18T07:24:08.777Z",
  wafEndHour: 0,
};

const userInput = extractUserInput(payload, ".modalUserInput");

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
    inactive: true,
    settingInactiveCheckBox: jest.fn(),
    revertedState: false,
    setRevertedState: jest.fn(),

    currentTabIndex:0,
    tabs:[]
  };
  return render(<DataTableRectangularDucts {...props} />);
};

test("tests getMonitoringRectangularDucts", async () => {
  axios.get.mockImplementation(() =>
    Promise.resolve({ status: 200, data: payload })
  );
  const title = await mpApi.getMonitoringRectangularDucts(checkout,
    secondLevel,
    addComponentFlag,
    openComponentViewTest,
    openAddComponentTest);
  expect(title.data).toEqual(payload);

  let { container } = await waitForElement(() =>
    componentRenderer(  checkout,
      secondLevel,
      addComponentFlag,
      openComponentViewTest,
      openAddComponentTest)
  );
  expect(container).toBeDefined();
});


