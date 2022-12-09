import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import config from "../../../config";
import * as qaAssert from "./assert";

axios.defaults.headers.common = {
  "x-api-key": config.app.apiKey,
};

const mock = new MockAdapter(axios);

const qaCertBaseUrl = `${config.services.qaCertification.uri}`;
const id= "id";
const locId ="locId";
const testSumId = "testSumId";
const appECorrTestSumId="appECorrTestSumId";
const appECorrTestRunId ="appECorrTestRunId";

const lineTest = "Linearity Test";
const testQualification = "Test Qualification";
const appendixECorrHeatInputOil = "Appendix E Correlation Heat Input from Oil";
const fuelFlowmeterAccuracyData = "Fuel Flowmeter Accuracy Data";
const cycleTimeSummary = "Cycle Time Summary";
// below types don't have coverage if needed more
const flowToLoadCheck = "Flow To Load Check";
const lineInjection = "Linearity Injection";
const rataData = "RATA Data";
const airEmissions = "Air Emissions";

describe("Test Qualification CRUD operations", () => {
  beforeEach(() => {
    mock.resetHistory();
  });
  test("getTestQualification", async () => {
    const lineSumData = [
      { lineSum: "data" },
    ];
    const getTestQualificationUrl = `${qaCertBaseUrl}/locations/${locId}/test-summary/${testSumId}/test-qualifications`;
    mock
      .onGet(getTestQualificationUrl)
      .reply(200, lineSumData);
    const resp = await qaAssert.getDataTableApis(
      testQualification,
      locId,
      testSumId,
    )

    expect(mock.history.get.length).toBe(1);
    expect(resp.data).toStrictEqual(lineSumData);
  });

  test("createTestQualification", async () => {
    const payload = { lineSum: "data" };
    const postTestQualificationUrl = `${qaCertBaseUrl}/locations/${locId}/test-summary/${testSumId}/test-qualifications`;
    mock.onPost(postTestQualificationUrl).reply(200, "success");
    const resp = await qaAssert.createDataSwitch(
      payload,
      testQualification,
      locId,
      testSumId,
    )
    expect(mock.history.post.length).toBe(1);
    expect(resp.data).toStrictEqual("success");
  });

  test("updateTestQualification", async () => {
    const payload = {id:"id", lineSum: "data" };
    const putTestQualificationUrl = `${qaCertBaseUrl}/locations/${locId}/test-summary/${testSumId}/test-qualifications/${id}`;
    mock.onPut(putTestQualificationUrl).reply(200, "success");
    const resp = await qaAssert.saveDataSwitch(
      payload,
      testQualification,
      locId,
      testSumId,
    )
    expect(mock.history.put.length).toBe(1);
    expect(resp.data).toStrictEqual("success");
  });

  test("deleteTestQualification", async () => {
    const payload = {id:"id", lineSum: "data" };
    const deleteTestQualUrl = `${qaCertBaseUrl}/workspace/locations/${locId}/test-summary/${testSumId}/test-qualifications/${id}`;
    mock.onDelete(deleteTestQualUrl).reply(200, "deleted");
    const resp = await qaAssert.removeDataSwitch(
      payload,
      testQualification,
      locId,
      testSumId,
    )

    expect(mock.history.delete.length).toBe(1);
    expect(resp.data).toStrictEqual("deleted");
  });
});

describe("Appendix E Correlation Heat Input from Oil CRUD operations", () => {
  beforeEach(() => {
    mock.resetHistory();
  });
  test("getAppendixEHeatInputOilData", async () => {
    const appendixECorrelationHeatInputOil = [
      { appendixECorrelationHeatInputOil: "data" },
    ];
    const postAppendixEHeatInputOilUrl = `${qaCertBaseUrl}/locations/${locId}/test-summary/${testSumId}/appendix-e-correlation-test-summaries/${appECorrTestSumId}/appendix-e-correlation-test-runs/${appECorrTestRunId}/appendix-e-heat-input-from-oils`;
    mock
      .onGet(postAppendixEHeatInputOilUrl)
      .reply(200, appendixECorrelationHeatInputOil);
    const extraIDs = [locId,testSumId,appECorrTestSumId];
    const resp = await qaAssert.getDataTableApis(
      appendixECorrHeatInputOil,
      locId,
      appECorrTestRunId,
      extraIDs
    )

    expect(mock.history.get.length).toBe(1);
    expect(resp.data).toStrictEqual(appendixECorrelationHeatInputOil);
  });

  test("createAppendixEHeatInputOil", async () => {
    const payload = { appendixECorrelationHeatInputOil: "data" };
    const postAppendixEHeatInputOilUrl = `${qaCertBaseUrl}/locations/${locId}/test-summary/${testSumId}/appendix-e-correlation-test-summaries/${appECorrTestSumId}/appendix-e-correlation-test-runs/${appECorrTestRunId}/appendix-e-heat-input-from-oils`;
    mock.onPost(postAppendixEHeatInputOilUrl).reply(200, "success");
    const extraIDs = [locId,testSumId,appECorrTestSumId];
    const resp = await qaAssert.createDataSwitch(
      payload,
      appendixECorrHeatInputOil,
      locId,
      appECorrTestRunId,
      extraIDs
    )

    expect(mock.history.post.length).toBe(1);
    expect(resp.data).toStrictEqual("success");
  });

  test("updateAppendixECorrelationHeatInputOil", async () => {
    const payload = { id:id, appendixECorrelationHeatInputOil: "data" };
    const putAppendixEHeatInputOilUrl = `${qaCertBaseUrl}/locations/${locId}/test-summary/${testSumId}/appendix-e-correlation-test-summaries/${appECorrTestSumId}/appendix-e-correlation-test-runs/${appECorrTestRunId}/appendix-e-heat-input-from-oils/${id}`;
    mock.onPut(putAppendixEHeatInputOilUrl).reply(200, "success");

    const extraIDs = [locId,testSumId,appECorrTestSumId];
    const resp = await qaAssert.saveDataSwitch(
      payload,
      appendixECorrHeatInputOil,
      locId,
      appECorrTestRunId,
      extraIDs
    )

    expect(mock.history.put.length).toBe(1);
    expect(resp.data).toStrictEqual("success");
  });

  test("deleteAppendixECorrelationHeatInputOil", async () => {
    const deleteAppendixEHeatInputOilUrl = `${qaCertBaseUrl}/locations/${locId}/test-summary/${testSumId}/appendix-e-correlation-test-summaries/${appECorrTestSumId}/appendix-e-correlation-test-runs/${appECorrTestRunId}/appendix-e-heat-input-from-oils/${id}`;
    mock.onDelete(deleteAppendixEHeatInputOilUrl).reply(200, "deleted");

    const extraIDs = [locId,testSumId,appECorrTestSumId];
    const resp = await qaAssert.removeDataSwitch(
      {id: id},
      appendixECorrHeatInputOil,
      locId,
      appECorrTestRunId,
      extraIDs
    )

    expect(mock.history.delete.length).toBe(1);
    expect(resp.data).toStrictEqual("deleted");
  });
});

describe("Linearity Test CRUD operations", () => {
  beforeEach(() => {
    mock.resetHistory();
  });
  test("getQALinearitySummary", async () => {
    const lineSumData = [
      { lineSum: "data" },
    ];
    const getQALinearitySummaryUrl = `${qaCertBaseUrl}/locations/${locId}/test-summary/${testSumId}/linearities`;
    mock
      .onGet(getQALinearitySummaryUrl)
      .reply(200, lineSumData);
    const resp = await qaAssert.getDataTableApis(
      lineTest,
      locId,
      testSumId,
    )

    expect(mock.history.get.length).toBe(1);
    expect(resp.data).toStrictEqual(lineSumData);
  });

  test("createQALinearitySummary", async () => {
    const payload = { lineSum: "data" };
    const postQALinearitySummaryUrl = `${qaCertBaseUrl}/workspace/locations/${locId}/test-summary/${testSumId}/linearities`;
    mock.onPost(postQALinearitySummaryUrl).reply(200, "success");
    const resp = await qaAssert.createDataSwitch(
      payload,
      lineTest,
      locId,
      testSumId,
    )
    expect(mock.history.post.length).toBe(1);
    expect(resp.data).toStrictEqual("success");
  });

  test("updateAppendixECorrelationHeatInputOil", async () => {
    const payload = {id:"id", lineSum: "data" };
    const putQALinearitySummaryUrl = `${qaCertBaseUrl}/workspace/locations/${locId}/test-summary/${testSumId}/linearities/${id}`;
    mock.onPut(putQALinearitySummaryUrl).reply(200, "success");
    const resp = await qaAssert.saveDataSwitch(
      payload,
      lineTest,
      locId,
      testSumId,
    )
    expect(mock.history.put.length).toBe(1);
    expect(resp.data).toStrictEqual("success");
  });

  test("deleteAppendixECorrelationHeatInputOil", async () => {
    const payload = {id:"id", lineSum: "data" };
    const deleteQALinearitySummaryUrl = `${qaCertBaseUrl}/workspace/locations/${locId}/test-summary/${testSumId}/linearities/${id}`;
    mock.onDelete(deleteQALinearitySummaryUrl).reply(200, "deleted");
    const resp = await qaAssert.removeDataSwitch(
      payload,
      lineTest,
      locId,
      testSumId,
    )

    expect(mock.history.delete.length).toBe(1);
    expect(resp.data).toStrictEqual("deleted");
  });
});

describe("Cycle Time Summary CRUD Operations", () => {
  beforeEach(() => {
    mock.resetHistory();
  });

  test("getCycleTimeSummary", async () => {
    const cycleTimeSummaryRecord = [
      { cycleTimeSummary: "data" },
    ];
    const getCycleTimeSummaryDataUrl = `${qaCertBaseUrl}/locations/${locId}/test-summary/${testSumId}/cycle-time-summaries`;
    mock
    .onGet(getCycleTimeSummaryDataUrl)
    .reply(200, cycleTimeSummaryRecord);
    const extraIDs = [locId,testSumId];
    const resp = await qaAssert.getDataTableApis(
      cycleTimeSummary,
      locId,
      testSumId,
      extraIDs
    )

    expect(mock.history.get.length).toBe(1);
    expect(resp.data).toStrictEqual(cycleTimeSummaryRecord);
  });
  
  test("createCycleTimeSummary", async () => {
    const payload = { cycleTimeSummary: "data" }
    const postCycleTimeSummaryDataUrl = `${qaCertBaseUrl}/locations/${locId}/test-summary/${testSumId}/cycle-time-summaries`;
    mock.onPost(postCycleTimeSummaryDataUrl).reply(200, "success");
    const extraIDs = [locId,testSumId];
    const resp = await qaAssert.createDataSwitch(
      payload,
      cycleTimeSummary,
      locId,
      testSumId,
      extraIDs
    )

    expect(mock.history.post.length).toBe(1);
    expect(resp.data).toStrictEqual("success");
  });

  test("updateCycleTimeSummary", async () => {
    const payload = { id:id, cycleTimeSummary: "data" };
    const putCycleTimeSummaryUrl = `${qaCertBaseUrl}/locations/${locId}/test-summary/${testSumId}/cycle-time-summaries/${id}`;
    mock.onPut(putCycleTimeSummaryUrl).reply(200, "success");
    const extraIDs = [locId,testSumId];
    const resp = await qaAssert.saveDataSwitch(
      payload,
      cycleTimeSummary,
      locId,
      testSumId,
      extraIDs
    )

    expect(mock.history.put.length).toBe(1);
    expect(resp.data).toStrictEqual("success");
  });

  test("updateCycleTimeSummary", async () => {
    const payload = { id:id, cycleTimeSummary: "data" };
    const putCycleTimeSummaryUrl = `${qaCertBaseUrl}/locations/${locId}/test-summary/${testSumId}/cycle-time-summaries/${id}`;
    mock.onPut(putCycleTimeSummaryUrl).reply(200, "deleted");
    const extraIDs = [locId,testSumId];
    const resp = await qaAssert.saveDataSwitch(
      payload,
      cycleTimeSummary,
      locId,
      testSumId,
      extraIDs
    )

    expect(mock.history.put.length).toBe(1);
    expect(resp.data).toStrictEqual("deleted");
  });
})

describe("Fuel Flowmeter Accuracy Data CRUD operations", () => {
  beforeEach(() => {
    mock.resetHistory();
  });
  test("getFuelFlowmeterAccuracyDataRecords", async () => {
    const fuelFlowmeterAccuracyDataRecord = [
      { fuelFlowmeterAccuracyData: "data" },
    ];
    const getFuelFlowmeterAccuracyDataUrl = `${qaCertBaseUrl}/locations/${locId}/test-summary/${testSumId}/fuel-flowmeter-accuracies`;
    mock
      .onGet(getFuelFlowmeterAccuracyDataUrl)
      .reply(200, fuelFlowmeterAccuracyDataRecord);
    const extraIDs = [locId,testSumId];
    const resp = await qaAssert.getDataTableApis(
      fuelFlowmeterAccuracyData,
      locId,
      testSumId,
      extraIDs
    )

    expect(mock.history.get.length).toBe(1);
    expect(resp.data).toStrictEqual(fuelFlowmeterAccuracyDataRecord);
  });

  test("createFuelFlowmeterAccuracyDataRecord", async () => {
    const payload = { fuelFlowmeterAccuracyData: "data" };
    const postFuelFlowmeterAccuracyDataUrl = `${qaCertBaseUrl}/locations/${locId}/test-summary/${testSumId}/fuel-flowmeter-accuracies`;
    mock.onPost(postFuelFlowmeterAccuracyDataUrl).reply(200, "success");
    const extraIDs = [locId,testSumId];
    const resp = await qaAssert.createDataSwitch(
      payload,
      fuelFlowmeterAccuracyData,
      locId,
      testSumId,
      extraIDs
    )

    expect(mock.history.post.length).toBe(1);
    expect(resp.data).toStrictEqual("success");
  });

  test("updateFuelFlowmeterAccuracyDataRecord", async () => {
    const payload = { id:id, fuelFlowmeterAccuracyData: "data" };
    const putFuelFlowmeterAccuracyDataUrl = `${qaCertBaseUrl}/locations/${locId}/test-summary/${testSumId}/fuel-flowmeter-accuracies/${id}`;
    mock.onPut(putFuelFlowmeterAccuracyDataUrl).reply(200, "success");

    const extraIDs = [locId,testSumId];
    const resp = await qaAssert.saveDataSwitch(
      payload,
      fuelFlowmeterAccuracyData,
      locId,
      testSumId,
      extraIDs
    )

    expect(mock.history.put.length).toBe(1);
    expect(resp.data).toStrictEqual("success");
  });

  test("deleteFuelFlowmeterAccuracyDataRecord", async () => {
    const deleteFuelFlowmeterAccuracyDataUrl = `${qaCertBaseUrl}/locations/${locId}/test-summary/${testSumId}/fuel-flowmeter-accuracies/${id}`;
    mock.onDelete(deleteFuelFlowmeterAccuracyDataUrl).reply(200, "deleted");

    const extraIDs = [locId,testSumId];
    const resp = await qaAssert.removeDataSwitch(
      {id: id},
      fuelFlowmeterAccuracyData,
      locId,
      testSumId,
      extraIDs
    )

    expect(mock.history.delete.length).toBe(1);
    expect(resp.data).toStrictEqual("deleted");
  });
});