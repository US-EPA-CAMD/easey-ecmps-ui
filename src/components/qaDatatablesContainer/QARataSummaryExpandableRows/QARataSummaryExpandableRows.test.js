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
import QARataSummaryExpandableRows from "./QARataSummaryExpandableRows";

const locId = "1873";
const testSummaryId = "4f2d07c0-55f9-49b0-8946-ea80c1febb15";
const rataId = "EPA-CC367C89032A4719A7794B951EDCC4EB";
const rataSummaryApiResponse = [
  {
    id: "EPA-656FCDFE610D245BC9AB440F83E98D22",
    rataId: "EPA-CC367C89032A4719A7794B951EDCC4EB",
    operatingLevelCode: "M",
    averageGrossUnitLoad: 33,
    calculatedAverageGrossUnitLoad: null,
    referenceMethodCode: "3A",
    meanCEMValue: 11.056,
    calculatedMeanCEMValue: null,
    meanRATAReferenceValue: 11.278,
    calculatedMeanRATAReferenceValue: null,
    meanDifference: 0.222,
    calculatedMeanDifference: 0.222,
    standardDeviationDifference: 0.172,
    calculatedStandardDeviationDifference: null,
    confidenceCoefficient: 0.132,
    calculatedConfidenceCoefficient: null,
    tValue: 2.306,
    calculatedTValue: null,
    apsIndicator: 0,
    calculatedApsIndicator: 0,
    apsCode: null,
    relativeAccuracy: 3.14,
    calculatedRelativeAccuracy: 3.14,
    biasAdjustmentFactor: 1,
    calculatedBiasAdjustmentFactor: 1,
    co2OrO2ReferenceMethodCode: null,
    stackDiameter: null,
    stackArea: null,
    calculatedStackArea: null,
    numberOfTraversePoints: null,
    calculatedWAF: null,
    calculatedCalculatedWAF: null,
    defaultWAF: null,
    userId: "PQA09Q1",
    addDate: "2/21/2009, 7:35:37 PM",
    updateDate: null,
    rataRunData: [],
  },
  {
    id: "EPA-56FCDFE610D245BC9AB440F83E98D226",
    rataId: "EPA-CC367C89032A4719A7794B951EDCC4EB",
    operatingLevelCode: "M",
    averageGrossUnitLoad: 33,
    calculatedAverageGrossUnitLoad: null,
    referenceMethodCode: "3A",
    meanCEMValue: 11.056,
    calculatedMeanCEMValue: null,
    meanRATAReferenceValue: 11.278,
    calculatedMeanRATAReferenceValue: null,
    meanDifference: 0.222,
    calculatedMeanDifference: 0.222,
    standardDeviationDifference: 0.172,
    calculatedStandardDeviationDifference: null,
    confidenceCoefficient: 0.132,
    calculatedConfidenceCoefficient: null,
    tValue: 2.306,
    calculatedTValue: null,
    apsIndicator: 0,
    calculatedApsIndicator: 0,
    apsCode: null,
    relativeAccuracy: 3.14,
    calculatedRelativeAccuracy: 3.14,
    biasAdjustmentFactor: 1,
    calculatedBiasAdjustmentFactor: 1,
    co2OrO2ReferenceMethodCode: null,
    stackDiameter: null,
    stackArea: null,
    calculatedStackArea: null,
    numberOfTraversePoints: null,
    calculatedWAF: null,
    calculatedCalculatedWAF: null,
    defaultWAF: null,
    userId: "PQA09Q1",
    addDate: "2/21/2009, 7:35:37 PM",
    updateDate: null,
    rataRunData: [],
  },
];

const operatingLevelCode = [
  {
    code: "",
    name: "-- Select a value --",
  },
  {
    code: "H",
    name: "High",
  },
  {
    code: "L",
    name: "Low",
  },
  {
    code: "M",
    name: "Mid",
  },
  {
    code: "N",
    name: "Normal",
  },
  {
    code: "T",
    name: "Typical Unit Load",
  },
];

const referenceMethodCode = [
  {
    code: "",
    name: "-- Select a value --",
  },
];

const apsCode = [
  {
    code: "",
    name: "-- Select a value --",
  },
  {
    code: "PS15",
    name: "Performance Spec 15",
  },
];

const componentRenderer = () => {
  const props = {
    user: "user",
    locId: locId,
    testSumId: testSummaryId,
    data: {
      locationId: locId,
      id: rataId,
    },
  };
  return render(<QARataSummaryExpandableRows {...props} />);
};

describe("Testing QARataRunExpandableRows", () => {
  const getUrl = `${config.services.qaCertification.uri}/locations/${locId}/test-summary/${testSummaryId}/rata/${rataId}/rata-summaries`;
  const getOpLevelCodes = `${config.services.mdm.uri}/operating-level-codes`;
  const getAllReferenceMethodCodes = `${config.services.mdm.uri}/reference-method-codes`;
  const getAllApsCodes = `${config.services.mdm.uri}/aps-codes`;
  const deleteUrl = `${config.services.qaCertification.uri}/workspace/locations/${locId}/test-summary/${testSummaryId}/rata/${rataId}/rata-summaries/${rataSummaryApiResponse[0].id}`;
  const postUrl = `${config.services.qaCertification.uri}/workspace/locations/${locId}/test-summary/${testSummaryId}/rata/${rataId}/rata-summaries`;
  const putUrl = `${config.services.qaCertification.uri}/workspace/locations/${locId}/test-summary/${testSummaryId}/rata/${rataId}/rata-summaries/${rataSummaryApiResponse[1].id}`;

  const mock = new MockAdapter(axios);
  mock.onGet(getUrl).reply(200, rataSummaryApiResponse);
  mock.onGet(getOpLevelCodes).reply(200, operatingLevelCode);
  mock.onGet(getAllReferenceMethodCodes).reply(200, referenceMethodCode);
  mock.onGet(getAllApsCodes).reply(200, apsCode);
  mock.onDelete(deleteUrl).reply(200, "success");
  mock
    .onPost(postUrl, {
      rataId: "EPA-CC367C89032A4719A7794B951EDCC4EB",
      operatingLevelCode: "M",
      averageGrossUnitLoad: 33,
      calculatedAverageGrossUnitLoad: null,
      referenceMethodCode: "3A",
      meanCEMValue: 11.056,
      calculatedMeanCEMValue: null,
      meanRATAReferenceValue: 11.278,
      calculatedMeanRATAReferenceValue: null,
      meanDifference: 0.222,
      calculatedMeanDifference: 0.222,
      standardDeviationDifference: 0.172,
      calculatedStandardDeviationDifference: null,
      confidenceCoefficient: 0.132,
      calculatedConfidenceCoefficient: null,
      tValue: 2.306,
      calculatedTValue: null,
      apsIndicator: 0,
    })
    .reply(200, "success");
  mock
    .onPut(putUrl, {
      rataSumId: "EPA-CC367C89032A4719A7794B951EDCC4EB",
      rataId: "EPA-CC367C89032A4719A7794B951EDCC4EB",
      operatingLevelCode: "M",
      averageGrossUnitLoad: 33,
      calculatedAverageGrossUnitLoad: null,
      referenceMethodCode: "3A",
      meanCEMValue: 11.056,
      calculatedMeanCEMValue: null,
      meanRATAReferenceValue: 11.278,
      calculatedMeanRATAReferenceValue: null,
      meanDifference: 0.222,
      calculatedMeanDifference: 0.222,
      standardDeviationDifference: 0.172,
      calculatedStandardDeviationDifference: null,
      confidenceCoefficient: 0.132,
      calculatedConfidenceCoefficient: null,
      tValue: 2.306,
      calculatedTValue: null,
      apsIndicator: 0,
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
    expect(utils.getByText("Add RATA Summary")).toBeInTheDocument();
    const input = utils.getByLabelText("Mean CEM Value");
    fireEvent.change(input, { target: { value: "23" } });
    const saveBtn = utils.getByRole("button", { name: "Click to save" });
    expect(saveBtn).toBeDefined();
    fireEvent.click(saveBtn);
    expect(mock.history.post[0].url).toEqual(postUrl);
    // //edit record
    const editBtns = utils.getAllByRole("button", { name: "Edit" });
    expect(editBtns.length).toBe(2);
    fireEvent.click(editBtns[1]);
    expect(utils.getByText("Edit RATA Summary")).toBeInTheDocument();
    const inputPE = utils.getByLabelText("Mean CEM Value");
    fireEvent.change(inputPE, { target: { value: "70" } });
    const updateBtn = utils.getByRole("button", { name: "Click to save" });
    expect(updateBtn).toBeDefined();
    fireEvent.click(updateBtn);
    expect(mock.history.put[0].url).toEqual(putUrl);
    //console.log("END mock.history",mock.history);
  });
});
