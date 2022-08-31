import React from "react";
import { render, waitForElement, screen } from "@testing-library/react";
import { Provider } from 'react-redux';
import MockAdapter from "axios-mock-adapter";
import axios from "axios";

import configureStore from "../../../store/configureStore.dev";
import initialState from "../../../store/reducers/initialState";
import QARataDataExpandableRows from "./QARataDataExpandableRows"
import userEvent from "@testing-library/user-event";
import config from "../../../config";

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

const locId= "1873";
const testSummaryId= "4f2d07c0-55f9-49b0-8946-ea80c1febb15";

initialState.dropdowns.rataData = {
  numberOfLoadLevels: [
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
const componentRenderer = () => {
  const props = {
    user: "test_user",
    loadDropdownsData: jest.fn(),
    data: {
      locationId: locId,
      id: testSummaryId
    },
    showProtocolGas: false
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

describe("Testing QARataDataExpandableRows", () => {
  const getUrl = `${config.services.qaCertification.uri}/locations/${locId}/test-summary/${testSummaryId}/rata`;
  const deleteUrl = `${config.services.qaCertification.uri}/workspace/locations/${locId}/test-summary/${testSummaryId}/rata/${rataDataApiResponse[0].id}`;
  const postUrl = `${config.services.qaCertification.uri}/workspace/locations/${locId}/test-summary/${testSummaryId}/rata`;
  const putUrl = `${config.services.qaCertification.uri}/workspace/locations/${locId}/test-summary/${testSummaryId}/rata/${rataDataApiResponse[1].id}`;

  const mock = new MockAdapter(axios);
  mock
    .onDelete(deleteUrl)  
    .reply(200, "success");
  mock
    .onGet(getUrl)
    .reply(200, rataDataApiResponse);
  mock
    .onPost(postUrl, 
      {
        "testSumId": "4f2d07c0-55f9-49b0-8946-ea80c1febb15",
        "rataFrequencyCode": "8QTRS",
        "relativeAccuracy": 3,
        "overallBiasAdjustmentFactor": 3.3,
        "numberOfLoadLevels": 3,
        "userId": "testUser",
      }
    ).reply(200, 'success');
  mock
    .onPut(putUrl, 
      {
        "testSumId": "4f2d07c0-55f9-49b0-8946-ea80c1febb15",
        "rataFrequencyCode": "8QT4YU",
        "relativeAccuracy": 4,
        "overallBiasAdjustmentFactor": 4.3,
        "numberOfLoadLevels": 4,
        "userId": "testUser",
      }
    ).reply(200, 'success');

  test('testing component renders properly and functionlity for add/edit/remove', async () => {
    //render
    const utils = await waitForElement(() => componentRenderer());
    expect(utils.container).toBeDefined();
    expect(mock.history.get[0].url).toEqual(getUrl);
    const table = utils.getAllByRole("table");
    expect(table.length).toBe(1);
    const rowGroup = utils.getAllByRole("rowgroup");
    expect(rowGroup.length).toBe(2);
    const row = utils.getAllByRole("row");
    expect(row.length).toBe(3);
    //remove record
    const remBtns = utils.getAllByRole("button", { name: "Remove" });
    expect(remBtns.length).toBe(2);
    userEvent.click(remBtns[0]);
    expect(utils.getByRole("dialog",{name:"Confirmation"})).toBeInTheDocument();
    const confirmBtn = utils.getAllByRole("button", { name: "Yes" });
    userEvent.click(confirmBtn[0]);
    expect(mock.history.delete[0].url).toEqual(deleteUrl);
    //add record
    const addBtn = utils.getByRole("button", { name: "Add" }); 
    expect(addBtn).toBeDefined();
    userEvent.click(addBtn);
    expect(utils.getByText("Add RATA Data")).toBeInTheDocument();
    const input = utils.getByLabelText('Relative Accuracy');
    userEvent.change(input, {target: {value: '23'}});
    userEvent.change(utils.getAllByTestId('dropdown')[0], { target: { value: 2 } })
    const saveBtn = utils.getByRole("button", { name: "Click to save" });
    expect(saveBtn).toBeDefined();
    userEvent.click(saveBtn);
    expect(mock.history.post[0].url).toEqual(postUrl);
    //edit record
    const editBtns = utils.getAllByRole("button", { name: "Edit" }); 
    expect(editBtns.length).toBe(2);
    userEvent.click(editBtns[1]);
    expect(utils.getByText("Edit RATA Data")).toBeInTheDocument();
    userEvent.change(utils.getAllByTestId('dropdown')[0], { target: { value: 1 } })
    const updateBtn = utils.getByRole("button", { name: "Click to save" });
    expect(updateBtn).toBeDefined();
    userEvent.click(updateBtn);
    expect(mock.history.put[0].url).toEqual(putUrl);
  });
  
});
