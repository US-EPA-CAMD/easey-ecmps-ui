import React from "react";
import { render, waitForElement, screen, fireEvent, waitFor } from "@testing-library/react";
import QAProtocolGasExpandableRows from "./QAProtocolGasExpandableRows"
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import config from "../../../config";

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
const locId = "1873";
const testSummaryId = "4f2d07c0-55f9-49b0-8946-ea80c1febb15";
const gasLevelCodes = [
  {
    code: "",
    name: " --- select ---"
  },
  {
    code: "HIGH",
    name: "high"
  },
  {
    code: "MID",
    name: "mid"
  },
  {
    code: "LOW",
    name: "low"
  },
];

const gasTypeCode = [
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
];
const componentRenderer = () => {
  const props = {
    user: "test_user",
    locId: locId,
    testSumId: testSummaryId
  }
  return render(<QAProtocolGasExpandableRows {...props} />);
};
describe("Testing QAProtocolGasExpandableRows", () => {
  const getUrl = `${config.services.qaCertification.uri}/locations/${locId}/test-summary/${testSummaryId}/protocol-gases`;
  const getGasLevelCodes = `${config.services.mdm.uri}/gas-level-codes`;
  const getGasTypeCodes = `${config.services.mdm.uri}/gas-type-codes`;
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
    .onGet(getGasLevelCodes)
    .reply(200, gasLevelCodes);
  mock
    .onGet(getGasTypeCodes)
    .reply(200, gasTypeCode);
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
    fireEvent.click(remBtns[0]);
    expect(utils.getByRole("dialog", { name: "Confirmation" })).toBeInTheDocument();
    const confirmBtn = utils.getAllByRole("button", { name: "Yes" });
    expect(confirmBtn).toBeDefined();
    fireEvent.click(confirmBtn[0]);
    expect(mock.history.delete[0].url).toEqual(deleteUrl);
    //add record
    const addBtn = utils.getByRole("button", { name: "Add" });
    expect(addBtn).toBeDefined();
    fireEvent.click(addBtn);
    expect(utils.getByText("Add Protocol Gas")).toBeInTheDocument();
    const input = utils.getByLabelText('Cylinder ID');
    fireEvent.change(input, { target: { value: '23' } });
    fireEvent.change(utils.getAllByTestId('dropdown')[0], { target: { value: 2 } })
    const saveBtn = utils.getByRole("button", { name: "Click to save" });
    expect(saveBtn).toBeDefined();
    fireEvent.click(saveBtn);
    expect(mock.history.post[0].url).toEqual(postUrl);
    // //edit record
    const editBtns = utils.getAllByRole("button", { name: "Edit" });
    expect(editBtns.length).toBe(2);
    fireEvent.click(editBtns[1]);
    expect(utils.getByText("Edit Protocol Gas")).toBeInTheDocument();
    fireEvent.change(utils.getAllByTestId('dropdown')[0], { target: { value: 1 } })
    const updateBtn = utils.getByRole("button", { name: "Click to save" });
    expect(updateBtn).toBeDefined();
    fireEvent.click(updateBtn);
    expect(mock.history.put[0].url).toEqual(putUrl);
    //console.log("END mock.history",mock.history);
  });
});
