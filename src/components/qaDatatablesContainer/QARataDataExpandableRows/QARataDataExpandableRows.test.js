import React from "react";
import { render, waitForElement, screen, fireEvent } from "@testing-library/react";
import { Provider } from 'react-redux';

import configureStore from "../../../store/configureStore.dev";
import initialState from "../../../store/reducers/initialState";
import QARataDataExpandableRows from "./QARataDataExpandableRows"
import userEvent from "@testing-library/user-event";
import config from "../../../config";

const axios = require("axios");
const MockAdapter = require("axios-mock-adapter")
const mock = new MockAdapter(axios)

// matches alphanumeric strings including hyphens (-)
const idRegex = '[\\w\\-]+'

const url = new RegExp(`${config.services.qaCertification.uri}/locations/${idRegex}/test-summary/${idRegex}/rata`)
const deleteUrl = new RegExp(`${config.services.qaCertification.uri}/workspace/locations/${idRegex}/test-summary/${idRegex}/rata/${idRegex}`)
const protocolGasUrl = new RegExp(`${config.services.qaCertification.uri}/locations/${idRegex}/test-summary/${idRegex}/protocol-gases`)
const gasLevelCodesUrl = 'https://api-easey-dev.app.cloud.gov/master-data-mgmt/gas-level-codes'
const gasTypeCodesUrl = 'https://api-easey-dev.app.cloud.gov/master-data-mgmt/gas-type-codes'

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
    "numberOfLoadLevels": null,
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
    "numberOfLoadLevels": 3,
    "calculatedNumberLoadLevel": null,
    "userId": "testUser",
    "addDate": "8/18/2022, 2:21:23 PM",
    "updateDate": "8/18/2022, 2:21:23 PM"
  }
];

mock.onGet(url).reply(200, rataDataApiResponse)
mock.onDelete(deleteUrl).reply(200, 'deleted')
mock.onGet(protocolGasUrl).reply(200, [])
mock.onGet(gasLevelCodesUrl).reply(200, [])
mock.onGet(gasTypeCodesUrl).reply(200, [])

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
    user: user,
    loadDropdownsData: jest.fn(),
    data: {
      locationId: locId,
      id: testSummaryId
    }
  }
  return render(
    <Provider store={store}>
      <QARataDataExpandableRows {...props} />
    </Provider>
  );
};

test('renders QARataDataExpandableRows properly', async () => {
  // Arrange
  let { container } = await waitForElement(() => componentRenderer("1873", "4f2d07c0-55f9-49b0-8946-ea80c1febb15", "test_user"));

  // Assert
  expect(container).toBeDefined()
});

test('given a user then user can add new data', async () => {
  // Assert
  await waitForElement(() => componentRenderer("1873", "4f2d07c0-55f9-49b0-8946-ea80c1febb15", "test_user"))

  const addBtn = screen.getAllByRole('button', { name: /Add/i })

  // Act
  userEvent.click(addBtn[0])

  // Assert
  expect(addBtn).toBeDefined()
})

test('given a user when "Delete" button is clicked then a row is deleted', async () => {
  // Arrange
  let { getAllByRole } = await waitForElement(() => componentRenderer("1873", "4f2d07c0-55f9-49b0-8946-ea80c1febb15", "test_user"));

  const deleteBtns = getAllByRole('button', { name: /Remove/i })
  const firstDeleteBtn = deleteBtns[0]

  // Act
  userEvent.click(firstDeleteBtn)

  const confirmBtns = screen.getAllByRole('button', { name: /Yes/i })
  const firstConfirmBtn = confirmBtns[0]
  userEvent.click(firstConfirmBtn)

  // Assert
  expect(mock.history.delete.length).toBe(1)
})