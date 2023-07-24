import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import config from "../../../config";
import * as qaAssert from "./assert";
import * as qaApi from "../../api/qaCertificationsAPI";

import { secureAxios } from "../../api/easeyAuthApi";

const mock = new MockAdapter(axios);

const qaCertBaseUrl = `${config.services.qaCertification.uri}`;
const id = "id";
const locId = "locId";
const testSumId = "testSumId";
const appECorrTestSumId = "appECorrTestSumId";
const appECorrTestRunId = "appECorrTestRunId";
const linSumId = "linSumId";
const hgTestSumId = "hgTestSumId";
const proGas = "Protocol Gas";
const lineTest = "Linearity Test";
const testQualification = "Test Qualification";
const appendixECorrHeatInputOil = "Appendix E Correlation Heat Input from Oil";
const fuelFlowmeterAccuracyData = "Fuel Flowmeter Accuracy Data";
const cycleTimeSummary = "Cycle Time Summary";
const transmitterTransducerAccuracyData =
  "Transmitter Transducer Accuracy Data";
const flowToLoadCheck = "Flow To Load Check";
const lineInjection = "Linearity Injection";
const rataData = "RATA Data";
const airEmissions = "Air Emissions";
const unitDefualtTest = "Unit Default Test";
const hgSummary = "Hg Summary";
const hgInjection = "Hg Injection";

jest.mock("../../api/easeyAuthApi");
secureAxios.mockImplementation((options) => axios(options));

describe("Test Qualification CRUD operations", () => {
  beforeEach(() => {
    mock.resetHistory();
  });
  test("getTestQualification", async () => {
    const mockGetTestQualification = jest.fn().mockResolvedValue({});
    jest
        .spyOn(qaApi, "getTestQualification")
        .mockImplementation(mockGetTestQualification);
    const extraIDs = [locId, testSumId];
    await qaAssert.getDataTableApis(
      testQualification,
      locId,
      testSumId,
      extraIDs
    );
    expect(mockGetTestQualification).toHaveBeenCalledTimes(1);
  });

  test("createTestQualification", async () => {
    const mockCreateTestQualification = jest.fn().mockResolvedValue({});
    jest
        .spyOn(qaApi, "createTestQualification")
        .mockImplementation(mockCreateTestQualification);
    const extraIDs = [locId, testSumId];
    await qaAssert.createDataSwitch(
      {},
      testQualification,
      locId,
      testSumId,
      extraIDs
    );
    expect(mockCreateTestQualification).toHaveBeenCalledTimes(1);
  });

  test("updateTestQualification", async () => {
    const mockUpdateTestQualification = jest.fn().mockResolvedValue({});
    jest
        .spyOn(qaApi, "updateTestQualification")
        .mockImplementation(mockUpdateTestQualification);
    const extraIDs = [locId, testSumId];
    await qaAssert.saveDataSwitch(
      {},
      testQualification,
      locId,
      testSumId,
      extraIDs
    );
    expect(mockUpdateTestQualification).toHaveBeenCalledTimes(1);
  });

  test("deleteTestQualification", async () => {
    const mockDeleteTestQualification = jest.fn().mockResolvedValue({});
    jest
        .spyOn(qaApi, "deleteTestQualification")
        .mockImplementation(mockDeleteTestQualification);
    const extraIDs = [locId, testSumId];
    await qaAssert.removeDataSwitch(
      {},
      testQualification,
      locId,
      testSumId,
      extraIDs
    );
    expect(mockDeleteTestQualification).toHaveBeenCalledTimes(1);
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
    const extraIDs = [locId, testSumId, appECorrTestSumId];
    const resp = await qaAssert.getDataTableApis(
      appendixECorrHeatInputOil,
      locId,
      appECorrTestRunId,
      extraIDs
    );

    expect(mock.history.get.length).toBe(1);
    expect(resp.data).toStrictEqual(appendixECorrelationHeatInputOil);
  });

  test("createAppendixEHeatInputOil", async () => {
    const payload = { appendixECorrelationHeatInputOil: "data" };
    const postAppendixEHeatInputOilUrl = `${qaCertBaseUrl}/locations/${locId}/test-summary/${testSumId}/appendix-e-correlation-test-summaries/${appECorrTestSumId}/appendix-e-correlation-test-runs/${appECorrTestRunId}/appendix-e-heat-input-from-oils`;
    mock.onPost(postAppendixEHeatInputOilUrl).reply(200, "success");
    const extraIDs = [locId, testSumId, appECorrTestSumId];
    const resp = await qaAssert.createDataSwitch(
      payload,
      appendixECorrHeatInputOil,
      locId,
      appECorrTestRunId,
      extraIDs
    );

    expect(mock.history.post.length).toBe(1);
    expect(resp.data).toStrictEqual("success");
  });

  test("updateAppendixECorrelationHeatInputOil", async () => {
    const payload = { id: id, appendixECorrelationHeatInputOil: "data" };
    const putAppendixEHeatInputOilUrl = `${qaCertBaseUrl}/locations/${locId}/test-summary/${testSumId}/appendix-e-correlation-test-summaries/${appECorrTestSumId}/appendix-e-correlation-test-runs/${appECorrTestRunId}/appendix-e-heat-input-from-oils/${id}`;
    mock.onPut(putAppendixEHeatInputOilUrl).reply(200, "success");

    const extraIDs = [locId, testSumId, appECorrTestSumId];
    const resp = await qaAssert.saveDataSwitch(
      payload,
      appendixECorrHeatInputOil,
      locId,
      appECorrTestRunId,
      extraIDs
    );

    expect(mock.history.put.length).toBe(1);
    expect(resp.data).toStrictEqual("success");
  });

  test("deleteAppendixECorrelationHeatInputOil", async () => {
    const deleteAppendixEHeatInputOilUrl = `${qaCertBaseUrl}/locations/${locId}/test-summary/${testSumId}/appendix-e-correlation-test-summaries/${appECorrTestSumId}/appendix-e-correlation-test-runs/${appECorrTestRunId}/appendix-e-heat-input-from-oils/${id}`;
    mock.onDelete(deleteAppendixEHeatInputOilUrl).reply(200, "deleted");

    const extraIDs = [locId, testSumId, appECorrTestSumId];
    const resp = await qaAssert.removeDataSwitch(
      { id: id },
      appendixECorrHeatInputOil,
      locId,
      appECorrTestRunId,
      extraIDs
    );

    expect(mock.history.delete.length).toBe(1);
    expect(resp.data).toStrictEqual("deleted");
  });
});

describe("Linearity Test CRUD operations", () => {
  beforeEach(() => {
    mock.resetHistory();
  });
  test("getQALinearitySummary", async () => {
    const lineSumData = [{ lineSum: "data" }];
    const getQALinearitySummaryUrl = `${qaCertBaseUrl}/locations/${locId}/test-summary/${testSumId}/linearities`;
    mock.onGet(getQALinearitySummaryUrl).reply(200, lineSumData);
    const resp = await qaAssert.getDataTableApis(lineTest, locId, testSumId);

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
      testSumId
    );
    expect(mock.history.post.length).toBe(1);
    expect(resp.data).toStrictEqual("success");
  });

  test("updateAppendixECorrelationHeatInputOil", async () => {
    const payload = { id: "id", lineSum: "data" };
    const putQALinearitySummaryUrl = `${qaCertBaseUrl}/workspace/locations/${locId}/test-summary/${testSumId}/linearities/${id}`;
    mock.onPut(putQALinearitySummaryUrl).reply(200, "success");
    const resp = await qaAssert.saveDataSwitch(
      payload,
      lineTest,
      locId,
      testSumId
    );
    expect(mock.history.put.length).toBe(1);
    expect(resp.data).toStrictEqual("success");
  });

  test("deleteAppendixECorrelationHeatInputOil", async () => {
    const payload = { id: "id", lineSum: "data" };
    const deleteQALinearitySummaryUrl = `${qaCertBaseUrl}/workspace/locations/${locId}/test-summary/${testSumId}/linearities/${id}`;
    mock.onDelete(deleteQALinearitySummaryUrl).reply(200, "deleted");
    const resp = await qaAssert.removeDataSwitch(
      payload,
      lineTest,
      locId,
      testSumId
    );

    expect(mock.history.delete.length).toBe(1);
    expect(resp.data).toStrictEqual("deleted");
  });
});

describe("Cycle Time Summary CRUD Operations", () => {
  beforeEach(() => {
    mock.resetHistory();
  });

  test("getCycleTimeSummary", async () => {
    const cycleTimeSummaryRecord = [{ cycleTimeSummary: "data" }];
    const getCycleTimeSummaryDataUrl = `${qaCertBaseUrl}/locations/${locId}/test-summary/${testSumId}/cycle-time-summaries`;
    mock.onGet(getCycleTimeSummaryDataUrl).reply(200, cycleTimeSummaryRecord);
    const extraIDs = [locId, testSumId];
    const resp = await qaAssert.getDataTableApis(
      cycleTimeSummary,
      locId,
      testSumId,
      extraIDs
    );

    expect(mock.history.get.length).toBe(1);
    expect(resp.data).toStrictEqual(cycleTimeSummaryRecord);
  });

  test("createCycleTimeSummary", async () => {
    const payload = { cycleTimeSummary: "data" };
    const postCycleTimeSummaryDataUrl = `${qaCertBaseUrl}/locations/${locId}/test-summary/${testSumId}/cycle-time-summaries`;
    mock.onPost(postCycleTimeSummaryDataUrl).reply(200, "success");
    const extraIDs = [locId, testSumId];
    const resp = await qaAssert.createDataSwitch(
      payload,
      cycleTimeSummary,
      locId,
      testSumId,
      extraIDs
    );

    expect(mock.history.post.length).toBe(1);
    expect(resp.data).toStrictEqual("success");
  });

  test("updateCycleTimeSummary", async () => {
    const payload = { id: id, cycleTimeSummary: "data" };
    const putCycleTimeSummaryUrl = `${qaCertBaseUrl}/locations/${locId}/test-summary/${testSumId}/cycle-time-summaries/${id}`;
    mock.onPut(putCycleTimeSummaryUrl).reply(200, "success");
    const extraIDs = [locId, testSumId];
    const resp = await qaAssert.saveDataSwitch(
      payload,
      cycleTimeSummary,
      locId,
      testSumId,
      extraIDs
    );

    expect(mock.history.put.length).toBe(1);
    expect(resp.data).toStrictEqual("success");
  });

  test("deleteCycleTimeSummary", async () => {
    const deleteCycleTimeSummaryUrl = `${qaCertBaseUrl}/locations/${locId}/test-summary/${testSumId}/cycle-time-summaries/${id}`;
    mock.onDelete(deleteCycleTimeSummaryUrl).reply(200, "deleted");
    const extraIDs = [locId, testSumId];
    const resp = await qaAssert.removeDataSwitch(
      { id: id },
      cycleTimeSummary,
      locId,
      testSumId,
      extraIDs
    );

    expect(mock.history.put.length).toBe(0);
    expect(resp.data).toStrictEqual("deleted");
  });
});

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
    const extraIDs = [locId, testSumId];
    const resp = await qaAssert.getDataTableApis(
      fuelFlowmeterAccuracyData,
      locId,
      testSumId,
      extraIDs
    );

    expect(mock.history.get.length).toBe(1);
    expect(resp.data).toStrictEqual(fuelFlowmeterAccuracyDataRecord);
  });

  test("createFuelFlowmeterAccuracyDataRecord", async () => {
    const payload = { fuelFlowmeterAccuracyData: "data" };
    const postFuelFlowmeterAccuracyDataUrl = `${qaCertBaseUrl}/locations/${locId}/test-summary/${testSumId}/fuel-flowmeter-accuracies`;
    mock.onPost(postFuelFlowmeterAccuracyDataUrl).reply(200, "success");
    const extraIDs = [locId, testSumId];
    const resp = await qaAssert.createDataSwitch(
      payload,
      fuelFlowmeterAccuracyData,
      locId,
      testSumId,
      extraIDs
    );

    expect(mock.history.post.length).toBe(1);
    expect(resp.data).toStrictEqual("success");
  });

  test("updateFuelFlowmeterAccuracyDataRecord", async () => {
    const payload = { id: id, fuelFlowmeterAccuracyData: "data" };
    const putFuelFlowmeterAccuracyDataUrl = `${qaCertBaseUrl}/locations/${locId}/test-summary/${testSumId}/fuel-flowmeter-accuracies/${id}`;
    mock.onPut(putFuelFlowmeterAccuracyDataUrl).reply(200, "success");

    const extraIDs = [locId, testSumId];
    const resp = await qaAssert.saveDataSwitch(
      payload,
      fuelFlowmeterAccuracyData,
      locId,
      testSumId,
      extraIDs
    );

    expect(mock.history.put.length).toBe(1);
    expect(resp.data).toStrictEqual("success");
  });

  test("deleteFuelFlowmeterAccuracyDataRecord", async () => {
    const deleteFuelFlowmeterAccuracyDataUrl = `${qaCertBaseUrl}/locations/${locId}/test-summary/${testSumId}/fuel-flowmeter-accuracies/${id}`;
    mock.onDelete(deleteFuelFlowmeterAccuracyDataUrl).reply(200, "deleted");

    const extraIDs = [locId, testSumId];
    const resp = await qaAssert.removeDataSwitch(
      { id: id },
      fuelFlowmeterAccuracyData,
      locId,
      testSumId,
      extraIDs
    );

    expect(mock.history.delete.length).toBe(1);
    expect(resp.data).toStrictEqual("deleted");
  });
});

describe("Transmitter Transducer Accuracy Data CRUD operations", () => {
  beforeEach(() => {
    mock.resetHistory();
  });
  test("getTransmitterTransducerAccuracyDataRecords", async () => {
    const transmitterTransducerAccuracyDataRecord = [
      { transmitterTransducerAccuracyData: "data" },
    ];
    const getTransmitterTransducerAccuracyDataUrl = `${qaCertBaseUrl}/locations/${locId}/test-summary/${testSumId}/transmitter-transducer-accuracy`;
    mock
      .onGet(getTransmitterTransducerAccuracyDataUrl)
      .reply(200, transmitterTransducerAccuracyDataRecord);
    const extraIDs = [locId, testSumId];
    const resp = await qaAssert.getDataTableApis(
      transmitterTransducerAccuracyData,
      locId,
      testSumId,
      extraIDs
    );

    expect(mock.history.get.length).toBe(1);
    expect(resp.data).toStrictEqual(transmitterTransducerAccuracyDataRecord);
  });

  test("createTransmitterTransducerAccuracyDataRecord", async () => {
    const payload = { transmitterTransducerAccuracyData: "data" };
    const postTransmitterTransducerAccuracyDataUrl = `${qaCertBaseUrl}/locations/${locId}/test-summary/${testSumId}/transmitter-transducer-accuracy`;
    mock.onPost(postTransmitterTransducerAccuracyDataUrl).reply(200, "success");
    const extraIDs = [locId, testSumId];
    const resp = await qaAssert.createDataSwitch(
      payload,
      transmitterTransducerAccuracyData,
      locId,
      testSumId,
      extraIDs
    );

    expect(mock.history.post.length).toBe(1);
    expect(resp.data).toStrictEqual("success");
  });

  test("updateTransmitterTransducerAccuracyDataRecord", async () => {
    const payload = { id: id, transmitterTransducerAccuracyData: "data" };
    const putTransmitterTransducerAccuracyDataUrl = `${qaCertBaseUrl}/locations/${locId}/test-summary/${testSumId}/transmitter-transducer-accuracy/${id}`;
    mock.onPut(putTransmitterTransducerAccuracyDataUrl).reply(200, "success");

    const extraIDs = [locId, testSumId];
    const resp = await qaAssert.saveDataSwitch(
      payload,
      transmitterTransducerAccuracyData,
      locId,
      testSumId,
      extraIDs
    );

    expect(mock.history.put.length).toBe(1);
    expect(resp.data).toStrictEqual("success");
  });

  test("deleteTransmitterTransducerAccuracyDataRecord", async () => {
    const deleteTransmitterTransducerAccuracyDataUrl = `${qaCertBaseUrl}/locations/${locId}/test-summary/${testSumId}/transmitter-transducer-accuracy/${id}`;
    mock
      .onDelete(deleteTransmitterTransducerAccuracyDataUrl)
      .reply(200, "deleted");

    const extraIDs = [locId, testSumId];
    const resp = await qaAssert.removeDataSwitch(
      { id: id },
      transmitterTransducerAccuracyData,
      locId,
      testSumId,
      extraIDs
    );

    expect(mock.history.delete.length).toBe(1);
    expect(resp.data).toStrictEqual("deleted");
  });
});

describe("Flow to Load Check CRUD operations", () => {
  beforeEach(() => {
    mock.resetHistory();
  });
  test("getFlowToLoadCheckRecords", async () => {
    const flowToLoadCheckData = [{ flowToLoadCheck: "data" }];
    const postFlowToLoadCheckUrl = `${qaCertBaseUrl}/locations/${locId}/test-summary/${testSumId}/flow-to-load-checks`;
    mock.onGet(postFlowToLoadCheckUrl).reply(200, flowToLoadCheckData);
    const extraIDs = [locId, testSumId];
    const resp = await qaAssert.getDataTableApis(
      flowToLoadCheck,
      locId,
      testSumId,
      extraIDs
    );

    expect(mock.history.get.length).toBe(1);
    expect(resp.data).toStrictEqual(flowToLoadCheckData);
  });

  test("createFlowToLoadCheckRecord", async () => {
    const payload = { flowToLoadCheck: "data" };
    const postFlowToLoadCheckUrl = `${qaCertBaseUrl}/locations/${locId}/test-summary/${testSumId}/flow-to-load-checks`;
    mock.onPost(postFlowToLoadCheckUrl).reply(200, "success");
    const extraIDs = [locId, testSumId];
    const resp = await qaAssert.createDataSwitch(
      payload,
      flowToLoadCheck,
      locId,
      testSumId,
      extraIDs
    );

    expect(mock.history.post.length).toBe(1);
    expect(resp.data).toStrictEqual("success");
  });

  test("updateFlowToLoadCheckRecord", async () => {
    const payload = { id: id, flowToLoadCheck: "data" };
    const putFlowToLoadCheckUrl = `${qaCertBaseUrl}/locations/${locId}/test-summary/${testSumId}/flow-to-load-checks/${id}`;
    mock.onPut(putFlowToLoadCheckUrl).reply(200, "success");

    const extraIDs = [locId, testSumId];
    const resp = await qaAssert.saveDataSwitch(
      payload,
      flowToLoadCheck,
      locId,
      testSumId,
      extraIDs
    );

    expect(mock.history.put.length).toBe(1);
    expect(resp.data).toStrictEqual("success");
  });

  test("deleteFlowToLoadCheckRecord", async () => {
    const deleteFlowToLoadCheckUrl = `${qaCertBaseUrl}/locations/${locId}/test-summary/${testSumId}/flow-to-load-checks/${id}`;
    mock.onDelete(deleteFlowToLoadCheckUrl).reply(200, "deleted");

    const extraIDs = [locId, testSumId];
    const resp = await qaAssert.removeDataSwitch(
      { id: id },
      flowToLoadCheck,
      locId,
      testSumId,
      extraIDs
    );

    expect(mock.history.delete.length).toBe(1);
    expect(resp.data).toStrictEqual("deleted");
  });
});

describe("Linear Injection CRUD operations", () => {
  beforeEach(() => {
    mock.resetHistory();
  });
  test("getQALinearityInjection", async () => {
    const qaLinearityInjectionData = [{ qaLinearityInjection: "data" }];
    const postQALinearityInjectionUrl = `${qaCertBaseUrl}/locations/${locId}/test-summary/${testSumId}/linearities/${linSumId}/injections`;
    mock
      .onGet(postQALinearityInjectionUrl)
      .reply(200, qaLinearityInjectionData);
    const extraIDs = [locId, testSumId];
    const resp = await qaAssert.getDataTableApis(
      lineInjection,
      locId,
      linSumId,
      extraIDs
    );

    expect(mock.history.get.length).toBe(1);
    expect(resp.data).toStrictEqual(qaLinearityInjectionData);
  });

  test("createQALinearityInjection", async () => {
    const payload = { qaLinearityInjection: "data" };
    const postQALinearityInjectionUrl = `${qaCertBaseUrl}/workspace/locations/${locId}/test-summary/${testSumId}/linearities/${linSumId}/injections/`;
    mock.onPost(postQALinearityInjectionUrl).reply(200, "success");
    const extraIDs = [locId, testSumId];
    const resp = await qaAssert.createDataSwitch(
      payload,
      lineInjection,
      locId,
      linSumId,
      extraIDs
    );

    expect(mock.history.post.length).toBe(1);
    expect(resp.data).toStrictEqual("success");
  });

  test("editQALinearityInjection", async () => {
    const payload = { id: id, qaLinearityInjection: "data" };
    const putQALinearityInjectionUrl = `${qaCertBaseUrl}/locations/${locId}/test-summary/${testSumId}/linearities/${linSumId}/injections/${id}`;
    mock.onPut(putQALinearityInjectionUrl).reply(200, "success");

    const extraIDs = [locId, testSumId];
    const resp = await qaAssert.saveDataSwitch(
      payload,
      lineInjection,
      locId,
      linSumId,
      extraIDs
    );

    expect(mock.history.put.length).toBe(1);
    expect(resp.data).toStrictEqual("success");
  });

  test("deleteQALinearityInjection", async () => {
    const deleteQALinearityInjectionUrl = `${qaCertBaseUrl}/workspace/locations/${locId}/test-summary/${testSumId}/linearities/${linSumId}/injections/${id}`;
    mock.onDelete(deleteQALinearityInjectionUrl).reply(200, "deleted");

    const extraIDs = [locId, testSumId];
    const resp = await qaAssert.removeDataSwitch(
      { id: id },
      lineInjection,
      locId,
      linSumId,
      extraIDs
    );

    expect(mock.history.delete.length).toBe(1);
    expect(resp.data).toStrictEqual("deleted");
  });
});

describe("Rata Data CRUD operations", () => {
  beforeEach(() => {
    mock.resetHistory();
  });
  test("getRataData", async () => {
    const rataDataObject = [{ rataData: "data" }];
    const postRataDataUrl = `${qaCertBaseUrl}/locations/${locId}/test-summary/${testSumId}/rata`;
    mock.onGet(postRataDataUrl).reply(200, rataDataObject);
    const extraIDs = [locId, testSumId];
    const resp = await qaAssert.getDataTableApis(
      rataData,
      locId,
      testSumId,
      extraIDs
    );

    expect(mock.history.get.length).toBe(1);
    expect(resp.data).toStrictEqual(rataDataObject);
  });

  test("createRataData", async () => {
    const payload = { rataData: "data" };
    const postRataDataUrl = `${qaCertBaseUrl}/workspace/locations/${locId}/test-summary/${testSumId}/rata`;
    mock.onPost(postRataDataUrl).reply(200, "success");
    const extraIDs = [locId, testSumId];
    const resp = await qaAssert.createDataSwitch(
      payload,
      rataData,
      locId,
      testSumId,
      extraIDs
    );

    expect(mock.history.post.length).toBe(1);
    expect(resp.data).toStrictEqual("success");
  });

  test("updateRataData", async () => {
    const payload = { id: id, rataData: "data" };
    const putRataDataUrl = `${qaCertBaseUrl}/workspace/locations/${locId}/test-summary/${testSumId}/rata/${id}`;
    mock.onPut(putRataDataUrl).reply(200, "success");

    const extraIDs = [locId, testSumId];
    const resp = await qaAssert.saveDataSwitch(
      payload,
      rataData,
      locId,
      testSumId,
      extraIDs
    );

    expect(mock.history.put.length).toBe(1);
    expect(resp.data).toStrictEqual("success");
  });

  test("deleteRataData", async () => {
    const deleteRataDataUrl = `${qaCertBaseUrl}/workspace/locations/${locId}/test-summary/${testSumId}/rata/${id}`;
    mock.onDelete(deleteRataDataUrl).reply(200, "deleted");

    const extraIDs = [locId, testSumId];
    const resp = await qaAssert.removeDataSwitch(
      { id: id },
      rataData,
      locId,
      testSumId,
      extraIDs
    );

    expect(mock.history.delete.length).toBe(1);
    expect(resp.data).toStrictEqual("deleted");
  });
});

describe("Protocol Gas CRUD operations", () => {
  beforeEach(() => {
    mock.resetHistory();
  });
  test("getProtocolGas", async () => {
    const mockGetProtocolGas = jest.fn().mockResolvedValue({});
    jest
        .spyOn(qaApi, "getProtocolGas")
        .mockImplementation(mockGetProtocolGas);
    const extraIDs = [locId, testSumId];
    await qaAssert.getDataTableApis(
      proGas,
      locId,
      testSumId,
      extraIDs
    );
    expect(mockGetProtocolGas).toHaveBeenCalledTimes(1);
  });

  test("createProtocolGas", async () => {
    const mockCreateProtocolGas = jest.fn().mockResolvedValue({});
    jest
        .spyOn(qaApi, "createProtocolGas")
        .mockImplementation(mockCreateProtocolGas);
    const extraIDs = [locId, testSumId];
    await qaAssert.createDataSwitch(
      {},
      proGas,
      locId,
      testSumId,
      extraIDs
    );
    expect(mockCreateProtocolGas).toHaveBeenCalledTimes(1);
  });

  test("updateProtocolGas", async () => {
    const mockUpdateProtocolGas = jest.fn().mockResolvedValue({});
    jest
        .spyOn(qaApi, "updateProtocolGas")
        .mockImplementation(mockUpdateProtocolGas);
    const extraIDs = [locId, testSumId];
    await qaAssert.saveDataSwitch(
      {},
      proGas,
      locId,
      testSumId,
      extraIDs
    );

    expect(mockUpdateProtocolGas).toHaveBeenCalledTimes(1);
  });

  test("deleteProtocolGas", async () => {
    const mockDeleteProtocolGas = jest.fn().mockResolvedValue({});
    jest
        .spyOn(qaApi, "deleteProtocolGas")
        .mockImplementation(mockDeleteProtocolGas);
    const extraIDs = [locId, testSumId];
    await qaAssert.removeDataSwitch(
      { id: id },
      proGas,
      locId,
      testSumId,
      extraIDs
    );

    expect(mockDeleteProtocolGas).toHaveBeenCalledTimes(1);
  });
});

describe("Air Emissions CRUD operations", () => {
  beforeEach(() => {
    mock.resetHistory();
  });
  test("getAirEmissions", async () => {
    const mockGetAirEmissions = jest.fn().mockResolvedValue({});
    jest
        .spyOn(qaApi, "getAirEmissions")
        .mockImplementation(mockGetAirEmissions);
    const extraIDs = [locId, testSumId];
    await qaAssert.getDataTableApis(
      airEmissions,
      locId,
      testSumId,
      extraIDs
    );
    expect(mockGetAirEmissions).toHaveBeenCalledTimes(1);
  });

  test("createAirEmissions", async () => {
    const mockCreateAirEmissions = jest.fn().mockResolvedValue({});
    jest
        .spyOn(qaApi, "createAirEmissions")
        .mockImplementation(mockCreateAirEmissions);
    const extraIDs = [locId, testSumId];
    await qaAssert.createDataSwitch(
      {},
      airEmissions,
      locId,
      testSumId,
      extraIDs
    );
    expect(mockCreateAirEmissions).toHaveBeenCalledTimes(1);
  });

  test("updateAirEmissions", async () => {
    const mockUpdateAirEmissions = jest.fn().mockResolvedValue({});
    jest
        .spyOn(qaApi, "updateAirEmissions")
        .mockImplementation(mockUpdateAirEmissions);
    const extraIDs = [locId, testSumId];
    await qaAssert.saveDataSwitch(
      {},
      airEmissions,
      locId,
      testSumId,
      extraIDs
    );

    expect(mockUpdateAirEmissions).toHaveBeenCalledTimes(1);
  });

  test("deleteAirEmissions", async () => {
    const mockDeleteAirEmissions = jest.fn().mockResolvedValue({});
    jest
        .spyOn(qaApi, "deleteAirEmissions")
        .mockImplementation(mockDeleteAirEmissions);
    const extraIDs = [locId, testSumId];
    await qaAssert.removeDataSwitch(
      { id: id },
      airEmissions,
      locId,
      testSumId,
      extraIDs
    );

    expect(mockDeleteAirEmissions).toHaveBeenCalledTimes(1);
  });
});

describe("Unit Default CRUD operations", () => {
  beforeEach(() => {
    mock.resetHistory();
  });
  test("getUnitDefaultTest", async () => {
    const unitDefaultTestObject = [{ unitDefaultTest: "data" }];
    const getUnitDefaultTestUrl = `${qaCertBaseUrl}/locations/${locId}/test-summary/${testSumId}/unit-default-tests`;
    mock.onGet(getUnitDefaultTestUrl).reply(200, unitDefaultTestObject);
    const extraIDs = [locId, testSumId];
    const resp = await qaAssert.getDataTableApis(
      unitDefualtTest,
      locId,
      testSumId,
      extraIDs
    );

    expect(mock.history.get.length).toBe(1);
    expect(resp.data).toStrictEqual(unitDefaultTestObject);
  });

  test("createUnitDefaultTest", async () => {
    const payload = { unitDefaultTest: "data" };
    const postUnitDefaultTestUrl = `${qaCertBaseUrl}/locations/${locId}/test-summary/${testSumId}/unit-default-tests`;
    mock.onPost(postUnitDefaultTestUrl).reply(200, "success");
    const extraIDs = [locId, testSumId];
    const resp = await qaAssert.createDataSwitch(
      payload,
      unitDefualtTest,
      locId,
      testSumId,
      extraIDs
    );

    expect(mock.history.post.length).toBe(1);
    expect(resp.data).toStrictEqual("success");
  });

  test("updateUnitDefaultTest", async () => {
    const payload = { id: id, unitDefaultTest: "data" };
    const putUnitDefaultTestUrl = `${qaCertBaseUrl}/locations/${locId}/test-summary/${testSumId}/unit-default-tests/${id}`;
    mock.onPut(putUnitDefaultTestUrl).reply(200, "success");

    const extraIDs = [locId, testSumId];
    const resp = await qaAssert.saveDataSwitch(
      payload,
      unitDefualtTest,
      locId,
      testSumId,
      extraIDs
    );

    expect(mock.history.put.length).toBe(1);
    expect(resp.data).toStrictEqual("success");
  });

  test("deleteUnitDefaultTest", async () => {
    const deleteUnitDefaultTestUrl = `${qaCertBaseUrl}/locations/${locId}/test-summary/${testSumId}/unit-default-tests/${id}`;
    mock.onDelete(deleteUnitDefaultTestUrl).reply(200, "deleted");

    const extraIDs = [locId, testSumId];
    const resp = await qaAssert.removeDataSwitch(
      { id: id },
      unitDefualtTest,
      locId,
      testSumId,
      extraIDs
    );

    expect(mock.history.delete.length).toBe(1);
    expect(resp.data).toStrictEqual("deleted");
  });
});

describe("Hg Summary CRUD operations", () => {
  beforeEach(() => {
    mock.resetHistory();
  });
  test("getHgSummary", async () => {
    const hgSummaryObject = [{ hgSummary: "data" }];
    const getHgSummaryUrl = `${qaCertBaseUrl}/locations/${locId}/test-summary/${testSumId}/hg-summaries`;
    mock.onGet(getHgSummaryUrl).reply(200, hgSummaryObject);
    const extraIDs = [locId, testSumId];
    const resp = await qaAssert.getDataTableApis(
      hgSummary,
      locId,
      testSumId,
      extraIDs
    );

    expect(mock.history.get.length).toBe(1);
    expect(resp.data).toStrictEqual(hgSummaryObject);
  });

  test("createHgSummary", async () => {
    const payload = { hgSummary: "data" };
    const postHgSummaryUrl = `${qaCertBaseUrl}/locations/${locId}/test-summary/${testSumId}/hg-summaries`;
    mock.onPost(postHgSummaryUrl).reply(200, "success");
    const extraIDs = [locId, testSumId];
    const resp = await qaAssert.createDataSwitch(
      payload,
      hgSummary,
      locId,
      testSumId,
      extraIDs
    );

    expect(mock.history.post.length).toBe(1);
    expect(resp.data).toStrictEqual("success");
  });

  test("updateHgSummary", async () => {
    const payload = { id: id, hgSummary: "data" };
    const putHgSummaryUrl = `${qaCertBaseUrl}/locations/${locId}/test-summary/${testSumId}/hg-summaries/${id}`;
    mock.onPut(putHgSummaryUrl).reply(200, "success");

    const extraIDs = [locId, testSumId];
    const resp = await qaAssert.saveDataSwitch(
      payload,
      hgSummary,
      locId,
      testSumId,
      extraIDs
    );

    expect(mock.history.put.length).toBe(1);
    expect(resp.data).toStrictEqual("success");
  });

  test("deleteHgSummary", async () => {
    const deleteHgSummaryUrl = `${qaCertBaseUrl}/locations/${locId}/test-summary/${testSumId}/hg-summaries/${id}`;
    mock.onDelete(deleteHgSummaryUrl).reply(200, "deleted");

    const extraIDs = [locId, testSumId];
    const resp = await qaAssert.removeDataSwitch(
      { id: id },
      hgSummary,
      locId,
      testSumId,
      extraIDs
    );

    expect(mock.history.delete.length).toBe(1);
    expect(resp.data).toStrictEqual("deleted");
  });
});

describe("Hg Injection CRUD operations", () => {
  beforeEach(() => {
    mock.resetHistory();
  });
  test("getHgInjection", async () => {
    const hgInjectionObject = [{ hgInjection: "data" }];
    const getHgInjectionUrl = `${qaCertBaseUrl}/locations/${locId}/test-summary/${testSumId}/hg-summaries/${hgTestSumId}/hg-injections`;
    mock.onGet(getHgInjectionUrl).reply(200, hgInjectionObject);
    const extraIDs = [locId, testSumId, hgTestSumId];
    const resp = await qaAssert.getDataTableApis(
      hgInjection,
      locId,
      hgTestSumId,
      extraIDs
    );

    expect(mock.history.get.length).toBe(1);
    expect(resp.data).toStrictEqual(hgInjectionObject);
  });

  test("createHgInjection", async () => {
    const payload = { hgInjection: "data" };
    const postHgInjectionUrl = `${qaCertBaseUrl}/locations/${locId}/test-summary/${testSumId}/hg-summaries/${hgTestSumId}/hg-injections`;
    mock.onPost(postHgInjectionUrl).reply(200, "success");
    const extraIDs = [locId, testSumId, hgTestSumId];
    const resp = await qaAssert.createDataSwitch(
      payload,
      hgInjection,
      locId,
      hgTestSumId,
      extraIDs
    );

    expect(mock.history.post.length).toBe(1);
    expect(resp.data).toStrictEqual("success");
  });

  test("deleteHgInjection", async () => {
    const deleteHgInjectionUrl = `${qaCertBaseUrl}/locations/${locId}/test-summary/${testSumId}/hg-summaries/${hgTestSumId}/hg-injections/${id}`;
    mock.onDelete(deleteHgInjectionUrl).reply(200, "deleted");

    const extraIDs = [locId, testSumId, hgTestSumId];
    const resp = await qaAssert.removeDataSwitch(
      { id: id },
      hgInjection,
      locId,
      hgTestSumId,
      extraIDs
    );

    expect(mock.history.delete.length).toBe(1);
    expect(resp.data).toStrictEqual("deleted");
  });
});
