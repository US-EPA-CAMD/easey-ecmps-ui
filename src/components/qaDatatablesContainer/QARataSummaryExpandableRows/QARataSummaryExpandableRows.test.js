import React from "react";
import { render, waitForElement, screen } from "@testing-library/react";
import { Provider } from 'react-redux';
import userEvent from "@testing-library/user-event";

import configureStore from "../../../store/configureStore.dev";
import initialState from "../../../store/reducers/initialState";
import * as qaApi from "../../../utils/api/qaCertificationsAPI";
import QARataSummaryExpandableRows from "./QARataSummaryExpandableRows";

const axios = require("axios");
jest.mock("axios");

const rataSummaryApiResponse = [
  {
    "id": "EPA-56FCDFE610D245BC9AB440F83E98D226",
    "rataId": "EPA-CC367C89032A4719A7794B951EDCC4EB",
    "operatingLevelCode": "M",
    "averageGrossUnitLoad": 33,
    "calculatedAverageGrossUnitLoad": null,
    "referenceMethodCode": "3A",
    "meanCEMValue": 11.056,
    "calculatedMeanCEMValue": null,
    "meanRATAReferenceValue": 11.278,
    "calculatedMeanRATAReferenceValue": null,
    "meanDifference": 0.222,
    "calculatedMeanDifference": 0.222,
    "standardDeviationDifference": 0.172,
    "calculatedStandardDeviationDifference": null,
    "confidenceCoefficient": 0.132,
    "calculatedConfidenceCoefficient": null,
    "tValue": 2.306,
    "calculatedTValue": null,
    "apsIndicator": 0,
    "calculatedApsIndicator": 0,
    "apsCode": null,
    "relativeAccuracy": 3.14,
    "calculatedRelativeAccuracy": 3.14,
    "biasAdjustmentFactor": 1,
    "calculatedBiasAdjustmentFactor": 1,
    "co2OrO2ReferenceMethodCode": null,
    "stackDiameter": null,
    "stackArea": null,
    "calculatedStackArea": null,
    "numberOfTraversePoints": null,
    "calculatedWAF": null,
    "calculatedCalculatedWAF": null,
    "defaultWAF": null,
    "userId": "PQA09Q1",
    "addDate": "2/21/2009, 7:35:37 PM",
    "updateDate": null,
    "rataRunData": []
  },
  {
    "id": "EPA-id2",
    "rataId": "EPA-rataId2",
    "operatingLevelCode": "M",
    "averageGrossUnitLoad": 33,
    "calculatedAverageGrossUnitLoad": null,
    "referenceMethodCode": "3A",
    "meanCEMValue": 11.056,
    "calculatedMeanCEMValue": null,
    "meanRATAReferenceValue": 11.278,
    "calculatedMeanRATAReferenceValue": null,
    "meanDifference": 0.222,
    "calculatedMeanDifference": 0.222,
    "standardDeviationDifference": 0.172,
    "calculatedStandardDeviationDifference": null,
    "confidenceCoefficient": 0.132,
    "calculatedConfidenceCoefficient": null,
    "tValue": 2.306,
    "calculatedTValue": null,
    "apsIndicator": 0,
    "calculatedApsIndicator": 0,
    "apsCode": null,
    "relativeAccuracy": 3.14,
    "calculatedRelativeAccuracy": 3.14,
    "biasAdjustmentFactor": 1,
    "calculatedBiasAdjustmentFactor": 1,
    "co2OrO2ReferenceMethodCode": null,
    "stackDiameter": null,
    "stackArea": null,
    "calculatedStackArea": null,
    "numberOfTraversePoints": null,
    "calculatedWAF": null,
    "calculatedCalculatedWAF": null,
    "defaultWAF": null,
    "userId": "PQA09Q1",
    "addDate": "2/21/2009, 7:35:37 PM",
    "updateDate": null,
    "rataRunData": []
  }
];

initialState.dropdowns.rataSummary = {
  operatingLevelCode: [
    {
      code: '',
      name: '-- Select a value --'
    },
    {
      code: 'H',
      name: 'High'
    },
    {
      code: 'L',
      name: 'Low'
    },
    {
      code: 'M',
      name: 'Mid'
    },
    {
      code: 'N',
      name: 'Normal'
    },
    {
      code: 'T',
      name: 'Typical Unit Load'
    }
  ],
  referenceMethodCode: [
    {
      code: '',
      name: '-- Select a value --'
    },
  ],
  apsCode: [
    {
      code: '',
      name: '-- Select a value --'
    },
    {
      code: 'PS15',
      name: 'Performance Spec 15'
    },
  ]
}

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
      <QARataSummaryExpandableRows {...props} />
    </Provider>
  );
};

test('renders QARataSummaryExpandableRows', async () => {
  // Arrange
  axios.get.mockImplementation(() =>
    Promise.resolve({ status: 200, data: rataSummaryApiResponse })
  );
  const res = await qaApi.getRataSummary("1873", "4f2d07c0-55f9-49b0-8946-ea80c1febb15", "rataId");
  expect(res.data).toEqual(rataSummaryApiResponse);
  let { container } = await waitForElement(() => componentRenderer("1873", "4f2d07c0-55f9-49b0-8946-ea80c1febb15", "test_user"));

  // Assert
  expect(container).toBeDefined();
});

test('renders a "View" button for each row', async () => {
  // Arrange
  axios.get.mockImplementation(() =>
    Promise.resolve({ status: 200, data: rataSummaryApiResponse })
  );
  const props = {
    loadDropdownsData: jest.fn(),
    data: {
      locationId: 'locId',
      id: 'testSummaryId'
    }
  }
  waitForElement(() => render(
    <Provider store={store}>
      <QARataSummaryExpandableRows {...props} />
    </Provider>
  ))

  const viewBtns = await screen.findAllByRole('button', { name: 'View' })
  expect(viewBtns).toHaveLength(rataSummaryApiResponse.length)
})

test('given no user when "View" button is clicked then data is displayed in a modal', async () => {
  // Arrange
  axios.get.mockImplementation(() =>
    Promise.resolve({ status: 200, data: rataSummaryApiResponse })
  );
  const props = {
    loadDropdownsData: jest.fn(),
    data: {
      locationId: 'locId',
      id: 'testSummaryId'
    }
  }
  waitForElement(() => render(
    <Provider store={store}>
      <QARataSummaryExpandableRows {...props} />
    </Provider>
  ))

  const viewBtns = await screen.findAllByRole('button', { name: /View/i })
  const firstViewBtn = viewBtns[0]

  // Act
  userEvent.click(firstViewBtn)

  // Assert
  const rataSummaryTitles = screen.getAllByText(/RATA Summary/i)
  expect(rataSummaryTitles).toHaveLength(rataSummaryApiResponse.length + 1)
})

test('given a user when "Delete" button is clicked then a row is deleted', async () => {
  // Arrange
  axios.get.mockImplementation(() =>
    Promise.resolve({ status: 200, data: rataSummaryApiResponse })
  );
  let { getAllByRole } = await waitForElement(() => componentRenderer("1873", "4f2d07c0-55f9-49b0-8946-ea80c1febb15", "test_user"));

  axios.mockResolvedValue({ status: 200, data: 'deleted successfully' })
  const deleteBtns = getAllByRole('button', { name: /Remove/i })
  const firstDeleteBtn = deleteBtns[0]

  // Act
  userEvent.click(firstDeleteBtn)

  const confirmBtns = screen.getAllByRole('button', { name: /Yes/i })
  const firstConfirmBtn = confirmBtns[0]
  userEvent.click(firstConfirmBtn)

  // Assert
  expect(axios).toHaveBeenCalled()
})