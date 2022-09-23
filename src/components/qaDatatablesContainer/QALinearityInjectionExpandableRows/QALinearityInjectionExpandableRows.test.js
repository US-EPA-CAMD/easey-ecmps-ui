import React from "react";
import {
  render,
  waitForElement,
  screen,
  fireEvent,
} from "@testing-library/react";

import QALinearityInjectionExpandableRows from "./QALinearityInjectionExpandableRows";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import config from "../../../config";

const linearityInjections = [
  {
    id: "IT07D0112-68805043F1FA4D9BB0FED78E115C1D02",
    linSumId: "IT07D0112-7B71D94A53784A5282585A35DDB346C0",
    injectionDate: "2011-02-06",
    injectionHour: 9,
    injectionMinute: 41,
    measuredValue: 25.3,
    referenceValue: 25.2,
    userId: "lperez",
    addDate: "4/25/2011, 7:30:54 PM",
    updateDate: null,
  },
  {
    id: "IT07D0112-3D2D240CE7CF460199A58478173CD30C",
    linSumId: "IT07D0112-7B71D94A53784A5282585A35DDB346C0",
    injectionDate: "2011-02-06",
    injectionHour: 10,
    injectionMinute: 3,
    measuredValue: 25.2,
    referenceValue: 25.2,
    userId: "lperez",
    addDate: "4/25/2011, 7:30:54 PM",
    updateDate: null,
  },
];
const locId = "1873";
const testSummaryId = "4f2d07c0-55f9-49b0-8946-ea80c1febb15";
const lineSumId = "IT07D0112-7B71D94A53784A5282585A35DDB346C0";

//testing redux connected component to mimic props passed as argument
const componentRenderer = () => {
  const props = {
    user: { firstName: "test" },
    testSumId: testSummaryId,
    linSumId: locId,
    data: {
      locationId: locId,
      id: lineSumId,
    },
    showProtocolGas: false,
    locationSelectValue: locId,
  };
  return render(<QALinearityInjectionExpandableRows {...props} />);
};

describe("Testing QALinearityInjectionExpandableRows", () => {
  const getUrl = `${config.services.qaCertification.uri}/locations/${locId}/test-summary/${testSummaryId}/linearities/${lineSumId}/injections`;
  const deleteUrl = `${config.services.qaCertification.uri}/workspace/locations/${locId}/test-summary/${testSummaryId}/linearities/${lineSumId}/injections/${linearityInjections[0].id}`;
  const postUrl = `${config.services.qaCertification.uri}/workspace/locations/${locId}/test-summary/${testSummaryId}/linearities/${lineSumId}/injections/`;
  const putUrl = `${config.services.qaCertification.uri}/locations/${locId}/test-summary/${testSummaryId}/linearities/${lineSumId}/injections/${linearityInjections[1].id}`;

  const mock = new MockAdapter(axios);
  mock.onGet(getUrl).reply(200, linearityInjections);
  mock.onDelete(deleteUrl).reply(200, "success");
  mock
    .onPost(postUrl, {
      injectionDate: "2011-02-06",
      injectionHour: 10,
      injectionMinute: 3,
      measuredValue: 25.2,
      referenceValue: 25.2,
    })
    .reply(200, "success");
  mock
    .onPut(putUrl, {
      injectionDate: "2011-02-06",
      injectionHour: 10,
      injectionMinute: 3,
      measuredValue: 25.2,
      referenceValue: 25.2,
    })
    .reply(200, "success");

  test("testing component renders properly and functionlity for add/edit/remove", async () => {
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
    expect(
      utils.getByRole("dialog", { name: "Confirmation" })
    ).toBeInTheDocument();
    const confirmBtn = utils.getAllByRole("button", { name: "Yes" });
    expect(confirmBtn).toBeDefined();
    fireEvent.click(confirmBtn[0]);
    expect(mock.history.delete[0].url).toEqual(deleteUrl);
    // //add record
    const addBtn = utils.getByRole("button", { name: "Add" });
    expect(addBtn).toBeDefined();
    fireEvent.click(addBtn);
    expect(utils.getByText("Add Linearity Injection")).toBeInTheDocument();
    const input = utils.getByLabelText("Measured Value");
    fireEvent.change(input, { target: { value: "23" } });
    fireEvent.change(utils.getAllByTestId("dropdown")[0], {
      target: { value: 2 },
    });
    const saveBtn = utils.getByRole("button", { name: "Click to save" });
    expect(saveBtn).toBeDefined();
    fireEvent.click(saveBtn);
    expect(mock.history.post[0].url).toEqual(postUrl);
    // //edit record
    const editBtns = utils.getAllByRole("button", { name: "Edit" });
    expect(editBtns.length).toBe(2);
    fireEvent.click(editBtns[1]);
    expect(utils.getByText("Edit Linearity Injection")).toBeInTheDocument();
    const inputPE = utils.getByLabelText("Measured Value");
    fireEvent.change(inputPE, { target: { value: "70" } });
    const updateBtn = utils.getByRole("button", { name: "Click to save" });
    expect(updateBtn).toBeDefined();
    fireEvent.click(updateBtn);
    expect(mock.history.put[0].url).toEqual(putUrl);
    //console.log("END mock.history",mock.history);
  });
});
