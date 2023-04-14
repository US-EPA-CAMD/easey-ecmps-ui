import React from "react";
import { render, screen, waitForElement } from "@testing-library/react";
import { DataTableRectangularDucts, mapStateToProps, } from "./DataTableRectangularDucts";
import * as mpApi from "../../../utils/api/monitoringPlansApi";
import { extractUserInput } from "../../../additional-functions/extract-user-input";
// import { handleResponse, handleError } from "../../../utils/api/apiUtils";
// import { secureAxios } from "../../../utils/api/easeyAuthApi";

import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import config from "../../../config";
import userEvent from "@testing-library/user-event";

const mock = new MockAdapter(axios);

const idRegex = '[\\w\\-]+'
const locationSelectValue = 6;
const getMonitoringRectangularDuctsUrl = new RegExp(`${config.services.monitorPlans.uri}/locations/${idRegex}/duct-wafs`)
const mdmCodes = new RegExp(`${config.services.mdm.uri}/${idRegex}`)

mock.onGet(mdmCodes).reply(200, [])

const selectedDucts = [{}];
const returnedDucts = {};


const payload = {
  locationId: locationSelectValue,
  id: 1111,
  userId: "string",
  addDate: "2021-10-18T07:24:08.777Z",
  updateDate: "2021-10-18T07:24:08.777Z",
  wafDeterminationDate: "2021-10-18",
  wafBeginDate: "2021-10-18",
  wafBeginHour: 0,
  wafMethodCode: "string",
  wafValue: 0,
  numberOfTestRuns: 0,
  numberOfTraversePointsWaf: 0,
  numberOfTestPorts: 0,
  numberOfTraversePointsRef: 0,
  ductWidth: 0,
  ductDepth: 0,
  wafEndDate: "2021-10-18",
  wafEndHour: 0,
};

mock.onGet(getMonitoringRectangularDuctsUrl).reply(200, payload)

const userInput = extractUserInput(payload, ".modalUserInput");

//testing redux connected component to mimic props passed as argument
const componentRenderer = (location, showModal) => {
  const props = {
    locationSelectValue: location,
    user: { firstName: "test" },
    checkout: true,
    inactive: true,
    settingInactiveCheckBox: jest.fn(),
    setRevertedState: jest.fn(),
    currentTabIndex: 0,
    tabs: [{ inactive: [{}] }]
  };
  return render(<DataTableRectangularDucts {...props} />);
};

function componentRendererNoData(args) {
  const defualtProps = {
    locationSelectValue: "0",
    matsTableHandler: jest.fn(),
    showActiveOnly: true,
    user: { username: "test" },
    checkout: true,
    setRevertedState: jest.fn(),
  };

  const props = { ...defualtProps, ...args };
  return render(<DataTableRectangularDucts {...props} />);
}

test('renders DataTableRectangularDucts', async () => {
  componentRenderer(locationSelectValue)

  const createBtn = await screen.findByRole('button', { name: /Create Rectangular Duct WAF/i })

  expect(createBtn).toBeInTheDocument()
})

test('DataTableRectangularDucts create', async () => {
  await waitForElement(() => componentRenderer(locationSelectValue))
  const createBtn = screen.getAllByRole('button', { name: /Create Rectangular Duct WAF/i })

  expect(createBtn[0]).toBeInTheDocument()
  userEvent.click(createBtn[0])

  const saveBtn = screen.getAllByRole('button', { name: /Create Rectangular Duct WAF/i })
  expect(saveBtn[0]).toBeInTheDocument()
  userEvent.click(saveBtn[0])
})

test("mapStateToProps calls the appropriate state", async () => {
  // mock the 'dispatch' object
  const dispatch = jest.fn();
  const state = { openedFacilityTabs: { monitoringPlans: [] } };
  const stateProps = mapStateToProps(state, true);
});
