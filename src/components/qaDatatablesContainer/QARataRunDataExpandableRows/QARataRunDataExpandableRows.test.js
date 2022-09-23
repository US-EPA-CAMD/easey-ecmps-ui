import React from "react";
import {
  render,
  waitForElement,
  screen,
  fireEvent,
} from "@testing-library/react";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import config from "../../../config";
import QARataDataExpandableRows from "./QARataRunDataExpandableRows";

const locId = "1873";
const testSummaryId = "4f2d07c0-55f9-49b0-8946-ea80c1febb15";
const rataId = "EPA-CC367C89032A4719A7794B951EDCC4EB";
const rataSumId = "EPA-56FCDFE610D245BC9AB440F83E98D226";
const rataDataApiResponse = [
  {
    id: "EPA-7C826B56DF4D4B43BD9AEBFEB7920AF3",
    rataSumId: rataSumId,
    runNumber: 1,
    beginDate: "2003-10-30",
    beginHour: 9,
    beginMinute: 50,
    endDate: "2003-10-30",
    endHour: 10,
    endMinute: 10,
    cemValue: 10.9,
    rataReferenceValue: 11,
    calculatedRataReferenceValue: null,
    grossUnitLoad: 35,
    runStatusCode: "RUNUSED",
    userId: "PQA09Q1",
    addDate: "2/21/2009, 7:35:37 PM",
    updateDate: null,
    flowRataRunData: [],
  },
  {
    id: "EPA-AF13B20FF490449C9AB108A5E9A6398E",
    rataSumId: rataSumId,
    runNumber: 2,
    beginDate: "2003-10-30",
    beginHour: 10,
    beginMinute: 30,
    endDate: "2003-10-30",
    endHour: 10,
    endMinute: 50,
    cemValue: 11,
    rataReferenceValue: 11.1,
    calculatedRataReferenceValue: null,
    grossUnitLoad: 34,
    runStatusCode: "RUNUSED",
    userId: "PQA09Q1",
    addDate: "2/21/2009, 7:35:37 PM",
    updateDate: null,
    flowRataRunData: [],
  },
];
const rataStatusCode = [
  {
    runStatusCode: "NOTUSED",
    runStatusCodeDescription: "Run Not Used in RATA Calculation",
  },
  {
    runStatusCode: "RUNUSED",
    runStatusCodeDescription: "Run Used in RATA Calculation",
  },
  {
    runStatusCode: "IGNORED",
    runStatusCodeDescription:
      "Run Not Used in RATA Calculations. Data can be used in hourly emissions reporting but does not meet QA criteria. (Sorbent Trap Systems Only)",
  },
];
const componentRenderer = () => {
  const props = {
    user: "user",
    loadDropdownsData: jest.fn(),
    testSumId: testSummaryId,
    rataId: rataId,
    data: {
      locationId: locId,
      id: rataSumId,
    },
  };
  return render(<QARataDataExpandableRows {...props} />);
};
describe("Testing QARataRunExpandableRows", () => {
  const getUrl = `${config.services.qaCertification.uri}/locations/${locId}/test-summary/${testSummaryId}/rata/${rataId}/rata-summaries/${rataSumId}/rata-runs/`;
  const getRataStatusCodes = `${config.services.mdm.uri}/run-status-codes`;
  const deleteUrl = `${config.services.qaCertification.uri}/workspace/locations/${locId}/test-summary/${testSummaryId}/rata/${rataId}/rata-summaries/${rataSumId}/rata-runs/${rataDataApiResponse[0].id}`;
  const postUrl = `${config.services.qaCertification.uri}/workspace/locations/${locId}/test-summary/${testSummaryId}/rata/${rataId}/rata-summaries/${rataSumId}/rata-runs`;
  const putUrl = `${config.services.qaCertification.uri}/workspace/locations/${locId}/test-summary/${testSummaryId}//rata/${rataId}/rata-summaries/${rataSumId}/rata-runs/${rataDataApiResponse[1].id}`;

  const mock = new MockAdapter(axios);
  mock.onGet(getUrl).reply(200, rataDataApiResponse);
  mock.onGet(getRataStatusCodes).reply(200, rataStatusCode);
  mock.onDelete(deleteUrl).reply(200, "success");
  mock
    .onPost(postUrl, {
      rataSumId: rataSumId,
      runNumber: 2,
      beginDate: "2003-10-30",
      beginHour: 10,
      beginMinute: 30,
      endDate: "2003-10-30",
      endHour: 10,
      endMinute: 50,
      cemValue: 11,
    })
    .reply(200, "success");
  mock
    .onPut(putUrl, {
      rataSumId: rataSumId,
      runNumber: 2,
      beginDate: "2003-10-30",
      beginHour: 10,
      beginMinute: 30,
      endDate: "2003-10-30",
      endHour: 10,
      endMinute: 50,
      cemValue: 11,
    })
    .reply(200, "success");

  test("testing component renders properly and functionlity for add/edit/remove", async () => {
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
    console.log("START mock.history", mock.history);
    expect(mock.history.delete[0].url).toEqual(deleteUrl);
    // //add record
    const addBtn = utils.getByRole("button", { name: "Add" });
    expect(addBtn).toBeDefined();
    fireEvent.click(addBtn);
    expect(utils.getByText("Add RATA Run Data")).toBeInTheDocument();
    const input = utils.getByLabelText("CEM Value");
    fireEvent.change(input, { target: { value: "23" } });
    const saveBtn = utils.getByRole("button", { name: "Click to save" });
    expect(saveBtn).toBeDefined();
    fireEvent.click(saveBtn);
    expect(mock.history.post[0].url).toEqual(postUrl);
    // //edit record
    const editBtns = utils.getAllByRole("button", { name: "Edit" });
    expect(editBtns.length).toBe(2);
    fireEvent.click(editBtns[1]);
    expect(utils.getByText("Edit RATA Run Data")).toBeInTheDocument();
    const inputPE = utils.getByLabelText("CEM Value");
    fireEvent.change(inputPE, { target: { value: "70" } });
    const updateBtn = utils.getByRole("button", { name: "Click to save" });
    expect(updateBtn).toBeDefined();
    fireEvent.click(updateBtn);
    expect(mock.history.put[0].url).toEqual(putUrl);
    //console.log("END mock.history",mock.history);
  });
});
