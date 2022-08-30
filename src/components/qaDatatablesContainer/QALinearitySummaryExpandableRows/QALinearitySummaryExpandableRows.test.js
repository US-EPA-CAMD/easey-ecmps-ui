import React from "react";
import { render, waitForElement, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import QALinearitySummaryExpandableRows  from "./QALinearitySummaryExpandableRows";
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import configureStore from "../../../store/configureStore.dev";
import initialState from "../../../store/reducers/initialState";
import * as qaApi from "../../../utils/api/qaCertificationsAPI";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import config from "../../../config";

const linearitySummary = [
  {
    "id": "IT07D0112-4CBC1A08D61B403DBB179D0B78EC51A8",
    "testSumId": "4f2d07c0-55f9-49b0-8946-ea80c1febb15",
    "gasLevelCode": "MID",
    "meanMeasuredValue": 55.3,
    "calculatedMeanMeasuredValue": 55.3,
    "meanReferenceValue": 55.9,
    "calculatedMeanReferenceValue": 55.9,
    "percentError": 1.1,
    "calculatedPercentError": 1.1,
    "apsIndicator": 0,
    "calculatedAPSIndicator": 0,
    "userId": "lperez",
    "addDate": "4/25/2011, 7:30:54 PM",
    "updateDate": null,
    "linearityInjectionData": []
  },
  {
    "id": "IT07D0112-7B71D94A53784A5282585A35DDB346C0",
    "testSumId": "4f2d07c0-55f9-49b0-8946-ea80c1febb15",
    "gasLevelCode": "LOW",
    "meanMeasuredValue": 25.233,
    "calculatedMeanMeasuredValue": 25.233,
    "meanReferenceValue": 25.2,
    "calculatedMeanReferenceValue": 25.2,
    "percentError": 0.1,
    "calculatedPercentError": 0.1,
    "apsIndicator": 0,
    "calculatedAPSIndicator": 0,
    "userId": "lperez",
    "addDate": "4/25/2011, 7:30:54 PM",
    "updateDate": null,
    "linearityInjectionData": []
  },
];
const locId= "1873";
const testSummaryId= "4f2d07c0-55f9-49b0-8946-ea80c1febb15";
initialState.dropdowns.linearitySummaryTestSecondLevel = {
  gasLevelCode : [
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
  ]
};
let store = configureStore(initialState);
//testing redux connected component to mimic props passed as argument
const componentRenderer = () => {
  const props = {
    user: { firstName: "test" },
    data: {
      locationId: locId,
      id: testSummaryId
    },
    showProtocolGas:false,
    locationSelectValue:locId,
  };
  return render(
    <Provider store={store}>
      <QALinearitySummaryExpandableRows {...props} />
    </Provider>
  );
};

describe("Testing QAProtocolGasExpandableRows", () => {
  const getUrl = `${config.services.qaCertification.uri}/locations/${locId}/test-summary/${testSummaryId}/linearities`;
  const deleteUrl = `${config.services.qaCertification.uri}/workspace/locations/${locId}/test-summary/${testSummaryId}/linearities/${linearitySummary[0].id}`;
  const postUrl = `${config.services.qaCertification.uri}/workspace/locations/${locId}/test-summary/${testSummaryId}/linearities`;
  const putUrl = `${config.services.qaCertification.uri}/workspace/locations/${locId}/test-summary/${testSummaryId}/linearities/${linearitySummary[1].id}`;

  const mock = new MockAdapter(axios);
  mock
    .onGet(getUrl)
    .reply(200, linearitySummary);
  mock
    .onDelete(deleteUrl)  
    .reply(200, "success");
  mock
    .onPost(postUrl, 
      {
        "testSumId": "4f2d07c0-55f9-49b0-8946-ea80c1febb15",
        "gasLevelCode": "LOW",
        "meanMeasuredValue": 25.233,
        "meanReferenceValue": 25.2,
        "percentError": 0.1,
        "apsIndicator": 0,
      }
    ).reply(200, 'success');
  mock
    .onPut(putUrl, 
      {
        
        "testSumId": "4f2d07c0-55f9-49b0-8946-ea80c1febb15",
        "gasLevelCode": "HIGH",
        "meanMeasuredValue": 25.233,
        "meanReferenceValue": 25.2,
        "percentError": 0.1,
        "apsIndicator": 0,
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
    expect(utils.getByRole("dialog",{name:"Confirmation"})).toBeInTheDocument();
    const confirmBtn = utils.getAllByRole("button", { name: "Yes" });
    expect(confirmBtn).toBeDefined();
    fireEvent.click(confirmBtn[0]);
    expect(mock.history.delete[0].url).toEqual(deleteUrl);
    // //add record
    const addBtn = utils.getByRole("button", { name: "Add" }); 
    expect(addBtn).toBeDefined();
    fireEvent.click(addBtn);
    expect(utils.getByText("Add Linearity Test")).toBeInTheDocument();
    const input = utils.getByLabelText('Percent Error');
    fireEvent.change(input, {target: {value: '23'}});
    fireEvent.change(utils.getAllByTestId('dropdown')[0], { target: { value: 2 } })
    const saveBtn = utils.getByRole("button", { name: "Click to save" });
    expect(saveBtn).toBeDefined();
    fireEvent.click(saveBtn);
    expect(mock.history.post[0].url).toEqual(postUrl);
    // //edit record
    const editBtns = utils.getAllByRole("button", { name: "Edit" }); 
    expect(editBtns.length).toBe(2);
    fireEvent.click(editBtns[1]);
    expect(utils.getByText("Edit Linearity Test")).toBeInTheDocument();
    const inputPE = utils.getByLabelText('Percent Error');
    fireEvent.change(inputPE, {target: {value: '70'}});
    const updateBtn = utils.getByRole("button", { name: "Click to save" });
    expect(updateBtn).toBeDefined();
    fireEvent.click(updateBtn);
    expect(mock.history.put[0].url).toEqual(putUrl);
    //console.log("END mock.history",mock.history);
  });
  
});
