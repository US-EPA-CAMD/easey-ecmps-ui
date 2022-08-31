import React from "react";
import { render, waitForElement, screen } from "@testing-library/react";
import { Provider } from 'react-redux';
import userEvent from "@testing-library/user-event";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";

import configureStore from "../../../store/configureStore.dev";
import initialState from "../../../store/reducers/initialState";
import QAProtocolGasExpandableRows from "./QAProtocolGasExpandableRows"
import config from "../../../config";

const mock = new MockAdapter(axios)

// matches alphanumeric strings including hyphens (-)
const idRegex = '[\\w\\-]+'

const url = new RegExp(`${config.services.qaCertification.uri}/locations/${idRegex}/test-summary/${idRegex}/protocol-gases`)
const deleteUrl = new RegExp(`${config.services.qaCertification.uri}/workspace/locations/${idRegex}/test-summary/${idRegex}/protocol-gases/${idRegex}`)

const protocolGasApiResponse = [
  {
    "id": "a5e00beb-2040-4e8f-9be4-2dd54d3bdb6f",
    "testSumId": "4f2d07c0-55f9-49b0-8946-ea80c1febb15",
    "gasLevelCode": "HIGH",
    "gasTypeCode": "AIR",
    "vendorID": null,
    "cylinderID": null,
    "expirationDate": "2022-09-21",
    "userId": "testUser",
    "addDate": "2022-08-10T00:00:00.000Z",
    "updateDate": "2022-08-10T14:26:13.000Z"
  },
  {
    "id": "b697e41c-ffce-43da-9a68-9dd67961c8e6",
    "testSumId": "4f2d07c0-55f9-49b0-8946-ea80c1febb15",
    "gasLevelCode": "MID",
    "gasTypeCode": "GMIS",
    "vendorID": null,
    "cylinderID": null,
    "expirationDate": "2024-10-12",
    "userId": "testUser",
    "addDate": "2022-08-10T00:00:00.000Z",
    "updateDate": "2022-08-11T12:11:25.000Z"
  }
];

mock.onGet(url).reply(200, protocolGasApiResponse);
mock.onDelete(deleteUrl).reply(200, 'protocol gas deleted')

const locId = "1873";
const testSummaryId = "4f2d07c0-55f9-49b0-8946-ea80c1febb15";
initialState.dropdowns.protocolGas = {
  gasLevelCode: [
    {
      code: '',
      name: '-- Select a value --'
    },
    {
      code: 'HIGH',
      name: 'High'
    },
    {
      code: 'LOW',
      name: 'Low'
    },
    {
      code: 'MID',
      name: 'Mid'
    },
    {
      code: 'ZERO',
      name: 'Zero'
    }
  ],
  gasTypeCode: [
    {
      code: '',
      name: '-- Select a value --'
    },
    {
      code: 'ZERO',
      name: 'Zero level gas used for the low level calibration of a reference analyzer used in RATA testing'
    },
    {
      code: 'ZAM',
      name: 'Zero Air Material'
    },
    {
      code: 'AIR',
      name: 'Purified air material'
    },
    {
      code: 'APPVD',
      name: 'Other EPA-approved EPA Protocol gas blend'
    },
    {
      code: 'CO2',
      name: 'EPA Protocol gas consisting of CO2, and a balance gas'
    },
    {
      code: 'GMIS',
      name: 'Gas manufacturer\'s intermediate standard'
    },
    {
      code: 'N2C',
      name: 'EPA Protocol gas bi-blend consisting of NO2 and CO, and a balance gas'
    },
    {
      code: 'N2C2',
      name: 'EPA Protocol gas bi-blend consisting of NO2 and CO2, and a balance gas'
    },
    {
      code: 'N2CC',
      name: 'EPA Protocol gas tri-blend consisting of NO2, CO, and CO2, and a balance gas'
    },
    {
      code: 'NC',
      name: 'EPA Protocol gas bi-blend consisting of NO and CO, and a balance gas'
    },
    {
      code: 'NC2',
      name: 'EPA Protocol gas bi-blend consisting of NO and CO2, and a balance gas'
    },
    {
      code: 'NCC',
      name: 'EPA Protocol gas tri-blend consisting of NO, CO, and CO2, and a balance gas'
    },
    {
      code: 'NO',
      name: 'EPA Protocol gas consisting of NO, and a balance gas'
    },
    {
      code: 'NO2',
      name: 'EPA Protocol gas consisting of NO2, and a balance gas'
    },
    {
      code: 'NTRM',
      name: 'NIST-traceable reference material'
    },
    {
      code: 'NX',
      name: 'EPA Protocol gas bi-blend consisting of NO and NO2, and a balance gas'
    },
    {
      code: 'NXC',
      name: 'EPA Protocol gas tri-blend consisting of NO, NO2, and CO, and a balance gas'
    },
    {
      code: 'NXC2',
      name: 'EPA Protocol gas tri-blend consisting of NO, NO2, and CO2, and a balance gas'
    },
    {
      code: 'NXCC',
      name: 'EPA Protocol gas quad-blend consisting of NO, NO2, CO, and CO2, and a balance gas'
    },
    {
      code: 'O2',
      name: 'EPA Protocol gas consisting of O2, and a balance gas'
    },
    {
      code: 'OC',
      name: 'EPA Protocol gas bi-blend consisting of O2 and CO, and a balance gas'
    },
    {
      code: 'OC2',
      name: 'EPA Protocol gas bi-blend consisting of O2 and CO2, and a balance gas'
    },
    {
      code: 'OCC',
      name: 'EPA Protocol gas tri-blend consisting of O2, CO, and CO2, and a balance gas'
    },
    {
      code: 'PRM',
      name: 'SRM-equivalent compressed gas primary reference material'
    },
    {
      code: 'RGM',
      name: 'Research gas mixture'
    },
    {
      code: 'SC',
      name: 'EPA Protocol gas bi-blend consisting of SO2 and CO, and a balance gas'
    },
    {
      code: 'SC2',
      name: 'EPA Protocol gas bi-blend consisting of SO2 and CO2, and a balance gas'
    },
    {
      code: 'SN',
      name: 'EPA Protocol gas bi-blend consisting of SO2 and NO, and a balance gas'
    },
    {
      code: 'SN2',
      name: 'EPA Protocol gas bi-blend consisting of SO2 and NO2, and a balance gas'
    },
    {
      code: 'SN2C',
      name: 'EPA Protocol gas tri-blend consisting of SO2, NO2, and CO, and a balance gas'
    },
    {
      code: 'SN2C2',
      name: 'EPA Protocol gas tri-blend consisting of SO2, NO2, and CO2, and a balance gas'
    },
    {
      code: 'SN2CC',
      name: 'EPA Protocol gas quad-blend consisting of SO2, NO2, CO, and CO2, and a balance gas'
    },
    {
      code: 'SNC',
      name: 'EPA Protocol gas tri-blend consisting of SO2, NO, and CO, and a balance gas'
    },
    {
      code: 'SNC2',
      name: 'EPA Protocol gas tri-blend consisting of SO2, NO, and CO2, and a balance gas'
    },
    {
      code: 'SNCC',
      name: 'EPA Protocol gas quad-blend consisting of SO2, NO, CO, and CO2, and a balance gas'
    },
    {
      code: 'SNX',
      name: 'EPA Protocol gas tri-blend consisting of SO2, NO, and NO2, and a balance gas'
    },
    {
      code: 'SNXC',
      name: 'EPA Protocol gas quad-blend consisting of SO2, NO, NO2, and CO, and a balance gas'
    },
    {
      code: 'SNXC2',
      name: 'EPA Protocol gas quad-blend consisting of SO2, NO, NO2, and CO2, and a balance gas'
    },
    {
      code: 'SNXCC',
      name: 'EPA Protocol gas quint-blend consisting of SO2, NO, NO2, CO, and CO2, and a balance gas'
    },
    {
      code: 'SO',
      name: 'EPA Protocol gas bi-blend consisting of SO2 and O2, and a balance gas'
    },
    {
      code: 'SO2',
      name: 'EPA Protocol gas consisting of SO2, and a balance gas'
    },
    {
      code: 'SOC',
      name: 'EPA Protocol gas tri-blend consisting of SO2, O2, and CO, and a balance gas'
    },
    {
      code: 'SRM',
      name: 'Standard reference material'
    }
  ]
};
let store = configureStore(initialState);
const componentRenderer = () => {
  const props = {
    user: "test_user",
    locId: locId,
    testSumId: testSummaryId
  }
  return render(
    <Provider store={store}>
      <QAProtocolGasExpandableRows {...props} />
    </Provider>
  );
};
test('renders QAProtocolGasExpandableRows properly', async () => {
  // Arrange
  let { container, findByRole } = await waitForElement(() => componentRenderer("1873", "a53e88ab-13bc-4775-b5a0-a9cf3c3b6040"));
  // Assert
  expect(container).toBeDefined();
  expect(findByRole).toBeDefined();
})

test('given a user then user can add new data', async () => {
  // Assert
  await waitForElement(() => componentRenderer("1873", "4f2d07c0-55f9-49b0-8946-ea80c1febb15"))

  const addBtn = screen.getAllByRole('button', { name: /Add/i })

  // Act
  userEvent.click(addBtn[0])

  // Assert
  expect(addBtn).toBeDefined()
})

test('given a user when "Delete" button is clicked then a row is deleted', async () => {
  // Arrange
  let { getAllByRole } = await waitForElement(() => componentRenderer("1873", "a53e88ab-13bc-4775-b5a0-a9cf3c3b6040"));

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

describe("Testing QAProtocolGasExpandableRows", () => {
  const getUrl = `${config.services.qaCertification.uri}/locations/${locId}/test-summary/${testSummaryId}/protocol-gases`;
  const deleteUrl = `${config.services.qaCertification.uri}/workspace/locations/${locId}/test-summary/${testSummaryId}/protocol-gases/${protocolGasApiResponse[0].id}`;
  const postUrl = `${config.services.qaCertification.uri}/workspace/locations/${locId}/test-summary/${testSummaryId}/protocol-gases`;
  const putUrl = `${config.services.qaCertification.uri}/workspace/locations/${locId}/test-summary/${testSummaryId}/protocol-gases/${protocolGasApiResponse[1].id}`;

  const mock = new MockAdapter(axios);
  mock
    .onGet(getUrl)
    .reply(200, protocolGasApiResponse);
  mock
    .onDelete(deleteUrl)
    .reply(200, "success");
  mock
    .onPost(postUrl,
      {
        "testSumId": "a53e88ab-13bc-4775-b5a0-a9cf3c3b6040",
        "gasLevelCode": "HIGH",
        "gasTypeCode": "AIR",
        "vendorID": 123,
        "cylinderID": 321,
        "expirationDate": "2022-10-21",
        "userId": "testUser",
      }
    ).reply(200, 'success');
  mock
    .onPut(putUrl,
      {
        "testSumId": "a53e88ab-13bc-4775-b5a0-a9cf3c3b6040",
        "gasLevelCode": "MID",
        "gasTypeCode": "GMIS",
        "vendorID": 1,
        "cylinderID": 11,
        "expirationDate": "2024-10-12",
        "userId": "testUser",
      }
    ).reply(200, 'success');

  test('testing component renders properly and functionlity for add/edit/remove', async () => {
    //console.log("START mock.history",mock.history);
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
    expect(utils.getByRole("dialog", { name: "Confirmation" })).toBeInTheDocument();
    const confirmBtn = utils.getAllByRole("button", { name: "Yes" });
    expect(confirmBtn).toBeDefined();
    userEvent.click(confirmBtn[0]);
    expect(mock.history.delete[0].url).toEqual(deleteUrl);
    //add record
    const addBtn = utils.getByRole("button", { name: "Add" });
    expect(addBtn).toBeDefined();
    userEvent.click(addBtn);
    expect(utils.getByText("Add Protocol Gas")).toBeInTheDocument();
    const input = utils.getByLabelText('Cylinder ID');
    userEvent.change(input, { target: { value: '23' } });
    userEvent.change(utils.getAllByTestId('dropdown')[0], { target: { value: 2 } })
    const saveBtn = utils.getByRole("button", { name: "Click to save" });
    expect(saveBtn).toBeDefined();
    userEvent.click(saveBtn);
    expect(mock.history.post[0].url).toEqual(postUrl);
    // //edit record
    const editBtns = utils.getAllByRole("button", { name: "Edit" });
    expect(editBtns.length).toBe(2);
    userEvent.click(editBtns[1]);
    expect(utils.getByText("Edit Protocol Gas")).toBeInTheDocument();
    userEvent.change(utils.getAllByTestId('dropdown')[0], { target: { value: 1 } })
    const updateBtn = utils.getByRole("button", { name: "Click to save" });
    expect(updateBtn).toBeDefined();
    userEvent.click(updateBtn);
    expect(mock.history.put[0].url).toEqual(putUrl);
    //console.log("END mock.history",mock.history);
  });

});
