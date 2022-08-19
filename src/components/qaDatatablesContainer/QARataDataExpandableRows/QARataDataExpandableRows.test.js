import React from "react";
import { render, waitForElement, screen, fireEvent } from "@testing-library/react";
import { Provider } from 'react-redux';
import configureStore from "../../../store/configureStore.dev";
import initialState from "../../../store/reducers/initialState";
import * as qaApi from "../../../utils/api/qaCertificationsAPI";
import QARataDataExpandableRows from "./QARataDataExpandableRows"

const axios = require("axios");
jest.mock("axios");

const rataDataApiResponse = [
  {
    "id": "a9d95061-1b15-4a40-bb9c-c830f4734de1",
    "testSumId": "4f2d07c0-55f9-49b0-8946-ea80c1febb15",
    "rataFrequencyCode": "8QTRS",
    "calculatedRataFrequencyCode": null,
    "relativeAccuracy": 2,
    "calculatedRelativeAccuracy": null,
    "overallBiasAdjustmentFactor": 2.2,
    "calculatedOverallBiasAdjustmentFactor": null,
    "numberLoadLevel": null,
    "calculatedNumberLoadLevel": null,
    "userId": "testUser",
    "addDate": "8/18/2022, 1:55:28 PM",
    "updateDate": "8/18/2022, 1:55:28 PM"
  },
  {
    "id": "fc8bada3-1e36-4218-87d2-26701965b951",
    "testSumId": "4f2d07c0-55f9-49b0-8946-ea80c1febb15",
    "rataFrequencyCode": "8QTRS",
    "calculatedRataFrequencyCode": null,
    "relativeAccuracy": 3,
    "calculatedRelativeAccuracy": null,
    "overallBiasAdjustmentFactor": 3.3,
    "calculatedOverallBiasAdjustmentFactor": null,
    "numberLoadLevel": 3,
    "calculatedNumberLoadLevel": null,
    "userId": "testUser",
    "addDate": "8/18/2022, 2:21:23 PM",
    "updateDate": "8/18/2022, 2:21:23 PM"
  }
];
initialState.dropdowns.rataData = {
  numberLoadLevel: [
    {
      code: '',
      name: '-- Select a value --'
    },
    {
      code: '1',
      name: '1'
    },
    {
      code: '2',
      name: '2'
    },
    {
      code: '3',
      name: '3'
    }
  ],
  rataFrequencyCode: [
    {
      "rataFrequencyCode": "2QTRS",
      "rataFrequencyCodeDescription": "Two Quarters"
    },
    {
      "rataFrequencyCode": "4QTRS",
      "rataFrequencyCodeDescription": "Four Quarters"
    },
    {
      "rataFrequencyCode": "8QTRS",
      "rataFrequencyCodeDescription": "Eight Quarters"
    },
    {
      "rataFrequencyCode": "ALTSL",
      "rataFrequencyCodeDescription": "Alt Single-Load Flow"
    },
    {
      "rataFrequencyCode": "OS",
      "rataFrequencyCodeDescription": "Ozone Season"
    }
  ]
};
let store = configureStore(initialState);
const componentRenderer = (locId, testSummaryId, user) => {
  const props = {
    user : user,
    loadDropdownsData : jest.fn(),
    data: {
      locationId: locId,
      id:testSummaryId
    }
  }
  return render(
    <Provider store={store}>
      <QARataDataExpandableRows {...props} />
    </Provider>
  );
};
test('renders QARataDataExpandableRows properly',async () => {
  // Arrange
  axios.get.mockImplementation(() =>
    Promise.resolve({ status: 200, data: rataDataApiResponse })
  );
  const res = await qaApi.getRataData("1873", "4f2d07c0-55f9-49b0-8946-ea80c1febb15");
  expect(res.data).toEqual(rataDataApiResponse);
  let { container, findByRole } = await waitForElement(() => componentRenderer("1873", "4f2d07c0-55f9-49b0-8946-ea80c1febb15","test_user"));
  // Assert
  expect(container).toBeDefined();
  expect(findByRole).toBeDefined();
  const addButton = await findByRole ("button", {name: "Add"});
  expect(addButton).toBeDefined();
  fireEvent.click(addButton);
  expect(screen.getByText("Add RATA Data")).toBeInTheDocument();

  const saveButton = screen.getByRole("button", {name: "Click to save"});
  expect(saveButton).toBeDefined();
  //screen.debug();
  // expect(screen.getAllByText("Gas Level Code").length).toBe(1);
  // expect(screen.getAllByText("Gas Type Code").length).toBe(2);
  // expect(screen.getAllByText("Vendor ID").length).toBe(2);
  // expect(screen.getAllByText("Cylinder ID").length).toBe(2);
  // expect(screen.getAllByText("Expiration Date").length).toBe(2);
  // fireEvent.click(saveButton);
  // const rowGroups = screen.getByRole ("rowGroup");
  // expect(rowGroups).toBeDefined();
  // expect(rowGroups.length).toBe(protocolGasApiResponse.length + 1);
});