import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import config from '../../config';
import * as qaCert from './qaCertificationsAPI';

axios.defaults.headers.common = {
  'x-api-key': config.app.apiKey,
};

const mock = new MockAdapter(axios);

const qaCertBaseUrl = `${config.services.qaCertification.uri}`;
const locId = 'locId';
const testSumId = 'testSumId';
const rataId = 'rataId';
const rataSumId = 'rataSumId';
const rataRunId = 'rataRunId';
const flowRataRunId = 'flowRataRunId';
const id = 'id';
const appECorrTestSumId = 'appECorrTestSumId';
const appECorrTestRunId = 'appECorrTestRunId';
const cycleTimeSumId = 'cycleTimeSumId';
const hgTestSumId = 'hgTestSumId';
// const unitDefaultTestRunId = 'unitDefaultTestRunId'

describe('QA Cert API', function () {
  beforeEach(() => {
    mock.resetHistory();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('RATA summary CRUD operations', () => {
    test('getRataSummary', async () => {
      const rataSummaryData = [
        { rataSummary: 'data' },
        { rataSummary: 'data2' },
      ];
      const getRataSummaryUrl = `${qaCertBaseUrl}/locations/${locId}/test-summary/${testSumId}/rata/${rataId}/rata-summaries`;
      mock.onGet(getRataSummaryUrl).reply(200, rataSummaryData);

      const resp = await qaCert.getRataSummary(locId, testSumId, rataId);

      expect(mock.history.get.length).toBe(1);
      expect(resp.data).toStrictEqual(rataSummaryData);
    });

    test('createRataSummary', async () => {
      const payload = { rataSummary: 'data' };
      const postRataSummaryUrl = `${qaCertBaseUrl}/workspace/locations/${locId}/test-summary/${testSumId}/rata/${rataId}/rata-summaries`;
      mock.onPost(postRataSummaryUrl).reply(200, payload);

      const resp = await qaCert.createRataSummary(
        locId,
        testSumId,
        rataId,
        payload,
      );

      expect(mock.history.post.length).toBe(1);
      expect(resp.data).toStrictEqual(payload);
    });

    test('updateRataSummary', async () => {
      const payload = { rataSummary: 'data' };
      const putRataSummaryUrl = `${qaCertBaseUrl}/workspace/locations/${locId}/test-summary/${testSumId}/rata/${rataId}/rata-summaries/${id}`;
      mock.onPut(putRataSummaryUrl).reply(200, payload);

      const resp = await qaCert.updateRataSummary(
        locId,
        testSumId,
        rataId,
        id,
        payload,
      );

      expect(mock.history.put.length).toBe(1);
      expect(resp.data).toStrictEqual(payload);
    });

    test('deleteRataSummary', async () => {
      const deleteRataSummaryUrl = `${qaCertBaseUrl}/workspace/locations/${locId}/test-summary/${testSumId}/rata/${rataId}/rata-summaries/${id}`;
      mock.onDelete(deleteRataSummaryUrl).reply(200, 'deleted');

      const resp = await qaCert.deleteRataSummary(locId, testSumId, rataId, id);

      expect(mock.history.delete.length).toBe(1);
      expect(resp.data).toStrictEqual('deleted');
    });
  });

  describe('RATA traverse CRUD operations', () => {
    test('getRataTraverseData', async () => {
      const rataTraverseResp = [
        { rataTraverse: 'data' },
        { rataTraverse: 'data2' },
      ];
      const getRataTraverseUrl = `${qaCertBaseUrl}/locations/${locId}/test-summary/${testSumId}/rata/${rataId}/rata-summaries/${rataSumId}/rata-runs/${rataRunId}/flow-rata-runs/${flowRataRunId}/rata-traverses`;
      mock.onGet(getRataTraverseUrl).reply(200, rataTraverseResp);

      const resp = await qaCert.getRataTraverseData(
        locId,
        testSumId,
        rataId,
        rataSumId,
        rataRunId,
        flowRataRunId,
      );

      expect(mock.history.get.length).toBe(1);
      expect(resp.data).toStrictEqual(rataTraverseResp);
    });

    test('createRataTraverse', async () => {
      const postRataTraverseUrl = `${qaCertBaseUrl}/workspace/locations/${locId}/test-summary/${testSumId}/rata/${rataId}/rata-summaries/${rataSumId}/rata-runs/${rataRunId}/flow-rata-runs/${flowRataRunId}/rata-traverses`;
      const payload = { data: 'rataTraverse' };
      mock.onPost(postRataTraverseUrl).reply(200, 'created');

      const resp = await qaCert.createRataTraverse(
        locId,
        testSumId,
        rataId,
        rataSumId,
        rataRunId,
        flowRataRunId,
        payload,
      );

      expect(mock.history.post.length).toBe(1);
      expect(resp.data).toStrictEqual('created');
    });

    test('updateRataTraverse', async () => {
      const putRataTraverseUrl = `${qaCertBaseUrl}/workspace/locations/${locId}/test-summary/${testSumId}/rata/${rataId}/rata-summaries/${rataSumId}/rata-runs/${rataRunId}/flow-rata-runs/${flowRataRunId}/rata-traverses/${id}`;
      const payload = { data: 'rataTraverse' };
      mock.onPut(putRataTraverseUrl).reply(200, payload);

      const resp = await qaCert.updateRataTraverseData(
        locId,
        testSumId,
        rataId,
        rataSumId,
        rataRunId,
        flowRataRunId,
        id,
        payload,
      );

      expect(mock.history.put.length).toBe(1);
      expect(resp.data).toStrictEqual(payload);
    });

    test('deleteRataTraverseData', async () => {
      const deleteRataTraverseUrl = `${qaCertBaseUrl}/workspace/locations/${locId}/test-summary/${testSumId}/rata/${rataId}/rata-summaries/${rataSumId}/rata-runs/${rataRunId}/flow-rata-runs/${flowRataRunId}/rata-traverses/${id}`;
      mock.onDelete(deleteRataTraverseUrl).reply(200, 'deleted');

      const resp = await qaCert.deleteRataTraverseData(
        locId,
        testSumId,
        rataId,
        rataSumId,
        rataRunId,
        flowRataRunId,
        id,
      );

      expect(mock.history.delete.length).toBe(1);
      expect(resp.data).toStrictEqual('deleted');
    });
  });

  describe('Fuel Flow To Load CRUD operations', () => {
    test('deleteFuelFlowToLoadData', async () => {
      const deleteFuelFlowToLoadDataUrl = `${qaCertBaseUrl}/workspace/locations/${locId}/test-summary/${testSumId}/fuel-flow-to-load-tests/${id}`;
      mock.onDelete(deleteFuelFlowToLoadDataUrl).reply(200, 'deleted');

      const resp = await qaCert.deleteFuelFlowToLoadData(locId, testSumId, id);

      expect(mock.history.delete.length).toBe(1);
      expect(resp.data).toStrictEqual('deleted');
    });
  });

  describe('Appendix E Correlation Summary Test CRUD operations', () => {
    test('getAppendixECorrelationSummary', async () => {
      const appendixECorrelationSummaryData = [
        { appendixECorrelationSummary: 'data' },
        { appendixECorrelationSummary: 'data2' },
      ];
      const getAppendixECorrelationSummaryUrl = `${qaCertBaseUrl}/locations/${locId}/test-summary/${testSumId}/appendix-e-correlation-test-summaries`;
      mock
        .onGet(getAppendixECorrelationSummaryUrl)
        .reply(200, appendixECorrelationSummaryData);

      const resp = await qaCert.getAppendixECorrelationSummaryRecords(
        locId,
        testSumId,
      );

      expect(mock.history.get.length).toBe(1);
      expect(resp.data).toStrictEqual(appendixECorrelationSummaryData);
    });

    test('createAppendixECorrelationSummary', async () => {
      const payload = { appendixECorrelationSummary: 'data' };
      const postAppendixECorrelationSummaryUrl = `${qaCertBaseUrl}/locations/${locId}/test-summary/${testSumId}/appendix-e-correlation-test-summaries`;
      mock.onPost(postAppendixECorrelationSummaryUrl).reply(200, payload);

      const resp = await qaCert.createAppendixECorrelationSummaryRecord(
        locId,
        testSumId,
        payload,
      );

      expect(mock.history.post.length).toBe(1);
      expect(resp.data).toStrictEqual(payload);
    });

    test('updateAppendixECorrelationSummary', async () => {
      const payload = { appendixECorrelationSummary: 'data' };
      const updateAppendixECorrelationSummaryUrl = `${qaCertBaseUrl}/locations/${locId}/test-summary/${testSumId}/appendix-e-correlation-test-summaries/${id}`;
      mock.onPut(updateAppendixECorrelationSummaryUrl).reply(200, payload);

      const resp = await qaCert.updateAppendixECorrelationSummaryRecord(
        locId,
        testSumId,
        id,
        payload,
      );

      expect(mock.history.put.length).toBe(1);
      expect(resp.data).toStrictEqual(payload);
    });
  });

  describe('RATA Test Qualification CRUD operations', () => {
    test('deleteTestQualification', async () => {
      const deleteTestQualUrl = `${qaCertBaseUrl}/workspace/locations/${locId}/test-summary/${testSumId}/test-qualifications/${id}`;
      mock.onDelete(deleteTestQualUrl).reply(200, 'deleted');

      const resp = await qaCert.deleteTestQualification(locId, testSumId, id);

      expect(mock.history.delete.length).toBe(1);
      expect(resp.data).toStrictEqual('deleted');
    });
  });

  describe('Appendix E Correlation Heat Input from Oil CRUD operations', () => {
    test('getAppendixEHeatInputOilData', async () => {
      const appendixECorrelationHeatInputOil = [
        { appendixECorrelationHeatInputOil: 'data' },
      ];
      const postAppendixEHeatInputOilUrl = `${qaCertBaseUrl}/locations/${locId}/test-summary/${testSumId}/appendix-e-correlation-test-summaries/${appECorrTestSumId}/appendix-e-correlation-test-runs/${appECorrTestRunId}/appendix-e-heat-input-from-oils`;
      mock
        .onGet(postAppendixEHeatInputOilUrl)
        .reply(200, appendixECorrelationHeatInputOil);

      const resp = await qaCert.getAppendixEHeatInputOilData(
        locId,
        testSumId,
        appECorrTestSumId,
        appECorrTestRunId,
      );

      expect(mock.history.get.length).toBe(1);
      expect(resp.data).toStrictEqual(appendixECorrelationHeatInputOil);
    });

    test('createAppendixEHeatInputOil', async () => {
      const payload = { appendixECorrelationHeatInputOil: 'data' };
      const postAppendixEHeatInputOilUrl = `${qaCertBaseUrl}/locations/${locId}/test-summary/${testSumId}/appendix-e-correlation-test-summaries/${appECorrTestSumId}/appendix-e-correlation-test-runs/${appECorrTestRunId}/appendix-e-heat-input-from-oils`;
      mock.onPost(postAppendixEHeatInputOilUrl).reply(200, payload);

      const resp = await qaCert.createAppendixEHeatInputOil(
        locId,
        testSumId,
        appECorrTestSumId,
        appECorrTestRunId,
        payload,
      );

      expect(mock.history.post.length).toBe(1);
      expect(resp.data).toStrictEqual(payload);
    });

    test('updateAppendixECorrelationHeatInputOil', async () => {
      const payload = { appendixECorrelationHeatInputOil: 'data' };
      const putAppendixEHeatInputOilUrl = `${qaCertBaseUrl}/locations/${locId}/test-summary/${testSumId}/appendix-e-correlation-test-summaries/${appECorrTestSumId}/appendix-e-correlation-test-runs/${appECorrTestRunId}/appendix-e-heat-input-from-oils/${id}`;
      mock.onPut(putAppendixEHeatInputOilUrl).reply(200, payload);

      const resp = await qaCert.updateAppendixECorrelationHeatInputOil(
        locId,
        testSumId,
        appECorrTestSumId,
        appECorrTestRunId,
        id,
        payload,
      );

      expect(mock.history.put.length).toBe(1);
      expect(resp.data).toStrictEqual(payload);
    });

    test('deleteAppendixECorrelationHeatInputOil', async () => {
      const deleteAppendixEHeatInputOilUrl = `${qaCertBaseUrl}/locations/${locId}/test-summary/${testSumId}/appendix-e-correlation-test-summaries/${appECorrTestSumId}/appendix-e-correlation-test-runs/${appECorrTestRunId}/appendix-e-heat-input-from-oils/${id}`;
      mock.onDelete(deleteAppendixEHeatInputOilUrl).reply(200, 'deleted');

      const resp = await qaCert.deleteAppendixECorrelationHeatInputOil(
        locId,
        testSumId,
        appECorrTestSumId,
        appECorrTestRunId,
        id,
      );

      expect(mock.history.delete.length).toBe(1);
      expect(resp.data).toStrictEqual('deleted');
    });
  });

  describe('Appendix E Correlation Heat Input from Gas CRUD operations', () => {
    test('getAppendixEHeatInputGasData', async () => {
      const appendixEHeatInputGasData = [
        { appendixECorrelationHeatInputGas: 'data' },
        { appendixECorrelationHeatInputGas: 'data2' },
      ];
      const getAppendixEHeatInputGasDataUrl = `${qaCertBaseUrl}/locations/${locId}/test-summary/${testSumId}/appendix-e-correlation-test-summaries/${appECorrTestSumId}/appendix-e-correlation-test-runs/${appECorrTestRunId}/appendix-e-heat-input-from-gases`;
      mock
        .onGet(getAppendixEHeatInputGasDataUrl)
        .reply(200, appendixEHeatInputGasData);

      const resp = await qaCert.getAppendixEHeatInputGasData(
        locId,
        testSumId,
        appECorrTestSumId,
        appECorrTestRunId,
      );

      expect(mock.history.get.length).toBe(1);
      expect(resp.data).toStrictEqual(appendixEHeatInputGasData);
    });

    test('createAppendixEHeatInputGas', async () => {
      const payload = {
        appendixECorrelationHeatInputGas: 'data',
        monitoringSystemID: undefined,
      };
      const testSummaryData = {
        data: {
          id: 'L3FY866-950F544520244336B5ED7E3824642F9E',
          locationId: '2286',
          stackPipeId: null,
          unitId: '1',
          testTypeCode: 'APPE',
          monitoringSystemID: '400',
          componentID: null,
          spanScaleCode: null,
          testNumber: '01NOX2021-2',
          testReasonCode: 'QA',
          testDescription: null,
          testResultCode: null,
          calculatedTestResultCode: null,
          beginDate: '2021-02-05',
          beginHour: 8,
          beginMinute: 0,
          endDate: '2021-02-05',
          endHour: 15,
          endMinute: 26,
          gracePeriodIndicator: null,
          calculatedGracePeriodIndicator: null,
          year: null,
          quarter: null,
          testComment: null,
          injectionProtocolCode: null,
          calculatedSpanValue: null,
          evalStatusCode: 'EVAL',
          userId: 'rboehme-dp',
          addDate: '4/7/2021, 7:34:01 AM',
          updateDate: '11/9/2022, 3:05:01 PM',
          reportPeriodId: null,
        },
      };
      const postAppendixEHeatInputGasDataUrl = `${qaCertBaseUrl}/locations/${locId}/test-summary/${testSumId}/appendix-e-correlation-test-summaries/${appECorrTestSumId}/appendix-e-correlation-test-runs/${appECorrTestRunId}/appendix-e-heat-input-from-gases`;
      mock.onPost(postAppendixEHeatInputGasDataUrl).reply(200, payload);
      mock
        .onGet(
          `https://api.epa.gov/easey/dev/qa-certification-mgmt//locations/${locId}/test-summary/${testSumId}`,
        )
        .reply(200, testSummaryData);
      const resp = await qaCert.createAppendixEHeatInputGas(
        locId,
        testSumId,
        appECorrTestSumId,
        appECorrTestRunId,
        payload,
      );
      expect(mock.history.get.length).toBe(1);
      expect(mock.history.post.length).toBe(1);
      expect(resp.data).toEqual(payload);
    });

    test('updateAppendixECorrelationHeatInputGas', async () => {
      const payload = { appendixECorrelationHeatInputGas: 'data' };
      const putAppendixEHeatInputGasDataUrl = `${qaCertBaseUrl}/locations/${locId}/test-summary/${testSumId}/appendix-e-correlation-test-summaries/${appECorrTestSumId}/appendix-e-correlation-test-runs/${appECorrTestRunId}/appendix-e-heat-input-from-gases/${id}`;
      mock.onPut(putAppendixEHeatInputGasDataUrl).reply(200, payload);

      const resp = await qaCert.updateAppendixECorrelationHeatInputGas(
        locId,
        testSumId,
        appECorrTestSumId,
        appECorrTestRunId,
        id,
        payload,
      );

      expect(mock.history.put.length).toBe(1);
      expect(resp.data).toStrictEqual(payload);
    });

    test('deleteAppendixECorrelationHeatInputGas', async () => {
      const deleteAppendixEHeatInputGasDataUrl = `${qaCertBaseUrl}/locations/${locId}/test-summary/${testSumId}/appendix-e-correlation-test-summaries/${appECorrTestSumId}/appendix-e-correlation-test-runs/${appECorrTestRunId}/appendix-e-heat-input-from-gases/${id}`;
      mock.onDelete(deleteAppendixEHeatInputGasDataUrl).reply(200, 'deleted');

      const resp = await qaCert.deleteAppendixECorrelationHeatInputGas(
        locId,
        testSumId,
        appECorrTestSumId,
        appECorrTestRunId,
        id,
      );

      expect(mock.history.delete.length).toBe(1);
      expect(resp.data).toStrictEqual('deleted');
    });
  });

  describe('Fuel Flowmeter Accuracy Data CRUD operations', () => {
    test('getFuelFlowmeterAccuracyDataRecords', async () => {
      const fuelFlowmeterAccuracyDataResp = [
        { fuelFlowmeterAccuracyData: 'data' },
        { fuelFlowmeterAccuracyData: 'data2' },
      ];
      const getFuelFlowmeterAccuracyDataUrl = `${qaCertBaseUrl}/locations/${locId}/test-summary/${testSumId}/fuel-flowmeter-accuracies`;
      mock
        .onGet(getFuelFlowmeterAccuracyDataUrl)
        .reply(200, fuelFlowmeterAccuracyDataResp);

      const resp = await qaCert.getFuelFlowmeterAccuracyDataRecords(
        locId,
        testSumId,
      );

      expect(mock.history.get.length).toBe(1);
      expect(resp.data).toStrictEqual(fuelFlowmeterAccuracyDataResp);
    });

    test('createFuelFlowmeterAccuracyDataRecord', async () => {
      const payload = { fuelFlowmeterAccuracyData: 'data' };
      const postFuelFlowmeterAccuracyDataUrl = `${qaCertBaseUrl}/locations/${locId}/test-summary/${testSumId}/fuel-flowmeter-accuracies`;
      mock.onPost(postFuelFlowmeterAccuracyDataUrl).reply(200, payload);

      const resp = await qaCert.createFuelFlowmeterAccuracyDataRecord(
        locId,
        testSumId,
        payload,
      );

      expect(mock.history.post.length).toBe(1);
      expect(resp.data).toStrictEqual(payload);
    });

    test('updateFuelFlowmeterAccuracyDataRecord', async () => {
      const payload = { fuelFlowmeterAccuracyData: 'data' };
      const putFuelFlowmeterAccuracyDataUrl = `${qaCertBaseUrl}/locations/${locId}/test-summary/${testSumId}/fuel-flowmeter-accuracies/${id}`;
      mock.onPut(putFuelFlowmeterAccuracyDataUrl).reply(200, payload);

      const resp = await qaCert.updateFuelFlowmeterAccuracyDataRecord(
        locId,
        testSumId,
        id,
        payload,
      );

      expect(mock.history.put.length).toBe(1);
      expect(resp.data).toStrictEqual(payload);
    });

    test('deleteFuelFlowmeterAccuracyDataRecord', async () => {
      const deleteFuelFlowmeterAccuracyDataUrl = `${qaCertBaseUrl}/locations/${locId}/test-summary/${testSumId}/fuel-flowmeter-accuracies/${id}`;
      mock.onDelete(deleteFuelFlowmeterAccuracyDataUrl).reply(200, 'deleted');

      const resp = await qaCert.deleteFuelFlowmeterAccuracyDataRecord(
        locId,
        testSumId,
        id,
      );

      expect(mock.history.delete.length).toBe(1);
      expect(resp.data).toStrictEqual('deleted');
    });
  });

  describe('Cycle Time Summary CRUD Operations', () => {
    test('getCycleTimeSummary', async () => {
      const cycleTimeSummaryData = [{ cycleTimeSummary: 'data' }];
      const getCycleTimeSummaryUrl = `${qaCertBaseUrl}/locations/${locId}/test-summary/${testSumId}/cycle-time-summaries`;
      mock.onGet(getCycleTimeSummaryUrl).reply(200, cycleTimeSummaryData);

      const resp = await qaCert.getCycleTimeSummary(locId, testSumId);

      expect(mock.history.get.length).toBe(1);
      expect(resp.data).toStrictEqual(cycleTimeSummaryData);
    });

    test('createCycleTimeSummary', async () => {
      const payload = { cycleTimeSummary: 'data' };
      const postCycleTimeSummaryUrl = `${qaCertBaseUrl}/locations/${locId}/test-summary/${testSumId}/cycle-time-summaries`;
      mock.onPost(postCycleTimeSummaryUrl).reply(200, payload);

      const resp = await qaCert.createCycleTimeSummary(
        locId,
        testSumId,
        payload,
      );

      expect(mock.history.post.length).toBe(1);
      expect(resp.data).toStrictEqual(payload);
    });

    test('updateCycleTimeSummary', async () => {
      const payload = { cycleTimeSummary: 'data' };
      const updateCycleTimeSummaryUrl = `${qaCertBaseUrl}/locations/${locId}/test-summary/${testSumId}/cycle-time-summaries/${id}`;
      mock.onPut(updateCycleTimeSummaryUrl).reply(200, payload);

      const resp = await qaCert.updateCycleTimeSummary(
        locId,
        testSumId,
        id,
        payload,
      );

      expect(mock.history.put.length).toBe(1);
      expect(resp.data).toStrictEqual(payload);
    });
    test('deleteCycleTimeSummary', async () => {
      const deleteCycleTimeSummaryUrl = `${qaCertBaseUrl}/locations/${locId}/test-summary/${testSumId}/cycle-time-summaries/${id}`;
      mock.onDelete(deleteCycleTimeSummaryUrl).reply(200, 'Deleted');

      const resp = await qaCert.deleteCycleTimeSummary(locId, testSumId, id);

      expect(mock.history.delete.length).toBe(1);
      expect(resp.data).toStrictEqual('Deleted');
    });
  });

  describe('Cycle Time Injection CRUD Operations', () => {
    test('getCycleTimeInjection', async () => {
      const cycleTimeInjectionData = [
        { cycleTimeInjection: 'data' },
        { cycleTimeInjection: 'data2' },
      ];
      const getCycleTimeInjectionUrl = `${qaCertBaseUrl}/locations/${locId}/test-summary/${testSumId}/cycle-time-summaries/${cycleTimeSumId}/cycle-time-injections`;
      mock.onGet(getCycleTimeInjectionUrl).reply(200, cycleTimeInjectionData);

      const resp = await qaCert.getCycleTimeInjection(
        locId,
        testSumId,
        cycleTimeSumId,
      );

      expect(mock.history.get.length).toBe(1);
      expect(resp.data).toStrictEqual(cycleTimeInjectionData);
    });

    test('createCycleTimeInjection', async () => {
      const payload = { cycleTimeInjection: 'data' };
      const postCycleTimeInjectionUrl = `${qaCertBaseUrl}/locations/${locId}/test-summary/${testSumId}/cycle-time-summaries/${cycleTimeSumId}/cycle-time-injections`;
      mock.onPost(postCycleTimeInjectionUrl).reply(200, payload);

      const resp = await qaCert.createCycleTimeInjection(
        locId,
        testSumId,
        cycleTimeSumId,
        payload,
      );

      expect(mock.history.post.length).toBe(1);
      expect(resp.data).toStrictEqual(payload);
    });

    test('updateCycleTimeInjection', async () => {
      const payload = { cycleTimeInjection: 'data' };
      const updateCycleTimeInjectionUrl = `${qaCertBaseUrl}/locations/${locId}/test-summary/${testSumId}/cycle-time-summaries/${cycleTimeSumId}/cycle-time-injections/${id}`;
      mock.onPut(updateCycleTimeInjectionUrl).reply(200, payload);

      const resp = await qaCert.updateCycleTimeInjection(
        locId,
        testSumId,
        cycleTimeSumId,
        id,
        payload,
      );

      expect(mock.history.put.length).toBe(1);
      expect(resp.data).toStrictEqual(payload);
    });
    test('deleteCycleTimeInjection', async () => {
      const deleteCycleTimeInjectionUrl = `${qaCertBaseUrl}/locations/${locId}/test-summary/${testSumId}/cycle-time-summaries/${cycleTimeSumId}/cycle-time-injections/${id}`;
      mock.onDelete(deleteCycleTimeInjectionUrl).reply(200, 'Deleted');

      const resp = await qaCert.deleteCycleTimeInjection(
        locId,
        testSumId,
        cycleTimeSumId,
        id,
      );

      expect(mock.history.delete.length).toBe(1);
      expect(resp.data).toStrictEqual('Deleted');
    });
  });

  describe('Transmitter Transducer Accuracy Data CRUD operations', () => {
    test('getTransmitterTransducerAccuracyDataRecords', async () => {
      const transmitterTransducerAccuracyDataResp = [
        { transmitterTransducerAccuracyData: 'data' },
        { transmitterTransducerAccuracyData: 'data2' },
      ];
      const getTransmitterTransducerAccuracyDataUrl = `${qaCertBaseUrl}/locations/${locId}/test-summary/${testSumId}/transmitter-transducer-accuracy`;
      mock
        .onGet(getTransmitterTransducerAccuracyDataUrl)
        .reply(200, transmitterTransducerAccuracyDataResp);

      const resp = await qaCert.getTransmitterTransducerAccuracyDataRecords(
        locId,
        testSumId,
      );

      expect(mock.history.get.length).toBe(1);
      expect(resp.data).toStrictEqual(transmitterTransducerAccuracyDataResp);
    });

    test('createTransmitterTransducerAccuracyDataRecord', async () => {
      const payload = { transmitterTransducerAccuracyData: 'data' };
      const postTransmitterTransducerAccuracyDataUrl = `${qaCertBaseUrl}/locations/${locId}/test-summary/${testSumId}/transmitter-transducer-accuracy`;
      mock.onPost(postTransmitterTransducerAccuracyDataUrl).reply(200, payload);

      const resp = await qaCert.createTransmitterTransducerAccuracyDataRecord(
        locId,
        testSumId,
        payload,
      );

      expect(mock.history.post.length).toBe(1);
      expect(resp.data).toStrictEqual(payload);
    });

    test('updateTransmitterTransducerAccuracyDataRecord', async () => {
      const payload = { transmitterTransducerAccuracyData: 'data' };
      const putTransmitterTransducerAccuracyDataUrl = `${qaCertBaseUrl}/locations/${locId}/test-summary/${testSumId}/transmitter-transducer-accuracy/${id}`;
      mock.onPut(putTransmitterTransducerAccuracyDataUrl).reply(200, payload);

      const resp = await qaCert.updateTransmitterTransducerAccuracyDataRecord(
        locId,
        testSumId,
        id,
        payload,
      );

      expect(mock.history.put.length).toBe(1);
      expect(resp.data).toStrictEqual(payload);
    });

    test('deleteTransmitterTransducerAccuracyDataRecord', async () => {
      const deleteTransmitterTransducerAccuracyDataUrl = `${qaCertBaseUrl}/locations/${locId}/test-summary/${testSumId}/transmitter-transducer-accuracy/${id}`;
      mock
        .onDelete(deleteTransmitterTransducerAccuracyDataUrl)
        .reply(200, 'deleted');

      const resp = await qaCert.deleteTransmitterTransducerAccuracyDataRecord(
        locId,
        testSumId,
        id,
      );

      expect(mock.history.delete.length).toBe(1);
      expect(resp.data).toStrictEqual('deleted');
    });
  });

  describe('Unit Default Test Data CRUD operations', () => {
    test('getUnitDefaultTest', async () => {
      const unitDefaultTestResp = [
        { unitDefaultTest: 'data' },
        { unitDefaultTest: 'data2' },
      ];
      const getUnitDefaultTestUrl = `${qaCertBaseUrl}/locations/${locId}/test-summary/${testSumId}/unit-default-tests`;
      mock.onGet(getUnitDefaultTestUrl).reply(200, unitDefaultTestResp);

      const resp = await qaCert.getUnitDefaultTest(locId, testSumId);

      expect(mock.history.get.length).toBe(1);
      expect(resp.data).toStrictEqual(unitDefaultTestResp);
    });

    test('createUnitDefaultTest', async () => {
      const payload = { unitDefaultTest: 'data' };
      const postUnitDefaultTestUrl = `${qaCertBaseUrl}/locations/${locId}/test-summary/${testSumId}/unit-default-tests`;
      mock.onPost(postUnitDefaultTestUrl).reply(200, payload);

      const resp = await qaCert.createUnitDefaultTest(
        locId,
        testSumId,
        payload,
      );

      expect(mock.history.post.length).toBe(1);
      expect(resp.data).toStrictEqual(payload);
    });

    test('updateUnitDefaultTest', async () => {
      const payload = { unitDefaultTest: 'data' };
      const putUnitDefaultTestUrl = `${qaCertBaseUrl}/locations/${locId}/test-summary/${testSumId}/unit-default-tests/${id}`;
      mock.onPut(putUnitDefaultTestUrl).reply(200, payload);

      const resp = await qaCert.updateUnitDefaultTest(
        locId,
        testSumId,
        id,
        payload,
      );

      expect(mock.history.put.length).toBe(1);
      expect(resp.data).toStrictEqual(payload);
    });

    test('deleteUnitDefaultTest', async () => {
      const deleteUnitDefaultTestUrl = `${qaCertBaseUrl}/locations/${locId}/test-summary/${testSumId}/unit-default-tests/${id}`;
      mock.onDelete(deleteUnitDefaultTestUrl).reply(200, 'deleted');

      const resp = await qaCert.deleteUnitDefaultTest(locId, testSumId, id);

      expect(mock.history.delete.length).toBe(1);
      expect(resp.data).toStrictEqual('deleted');
    });
  });

  describe('Hg Summary Data CRUD operations', () => {
    test('getHgSummary', async () => {
      const hgSummaryResp = [{ hgSummary: 'data' }, { hgSummary: 'data2' }];
      const getHgSummaryUrl = `${qaCertBaseUrl}/locations/${locId}/test-summary/${testSumId}/hg-summaries`;
      mock.onGet(getHgSummaryUrl).reply(200, hgSummaryResp);

      const resp = await qaCert.getHgSummary(locId, testSumId);

      expect(mock.history.get.length).toBe(1);
      expect(resp.data).toStrictEqual(hgSummaryResp);
    });

    test('createHgSummary', async () => {
      const payload = { hgSummary: 'data' };
      const postHgSummaryUrl = `${qaCertBaseUrl}/locations/${locId}/test-summary/${testSumId}/hg-summaries`;
      mock.onPost(postHgSummaryUrl).reply(200, payload);

      const resp = await qaCert.createHgSummary(locId, testSumId, payload);

      expect(mock.history.post.length).toBe(1);
      expect(resp.data).toStrictEqual(payload);
    });

    test('updateHgSummary', async () => {
      const payload = { hgSummary: 'data' };
      const putHgSummaryUrl = `${qaCertBaseUrl}/locations/${locId}/test-summary/${testSumId}/hg-summaries/${id}`;
      mock.onPut(putHgSummaryUrl).reply(200, payload);

      const resp = await qaCert.updateHgSummary(locId, testSumId, id, payload);

      expect(mock.history.put.length).toBe(1);
      expect(resp.data).toStrictEqual(payload);
    });

    test('deleteHgSummary', async () => {
      const deleteHgSummaryUrl = `${qaCertBaseUrl}/locations/${locId}/test-summary/${testSumId}/hg-summaries/${id}`;
      mock.onDelete(deleteHgSummaryUrl).reply(200, 'deleted');

      const resp = await qaCert.deleteHgSummary(locId, testSumId, id);

      expect(mock.history.delete.length).toBe(1);
      expect(resp.data).toStrictEqual('deleted');
    });
  });

  describe('Hg Injection Data CRUD operations', () => {
    test('getHgInjection', async () => {
      const hgInjectionResp = [
        { hgInjection: 'data' },
        { hgInjection: 'data2' },
      ];
      const getHgInjectionUrl = `${qaCertBaseUrl}/locations/${locId}/test-summary/${testSumId}/hg-summaries/${hgTestSumId}/hg-injections`;
      mock.onGet(getHgInjectionUrl).reply(200, hgInjectionResp);

      const resp = await qaCert.getHgInjection(locId, testSumId, hgTestSumId);

      expect(mock.history.get.length).toBe(1);
      expect(resp.data).toStrictEqual(hgInjectionResp);
    });

    test('createHgInjection', async () => {
      const payload = { hgInjection: 'data' };
      const postHgInjectionUrl = `${qaCertBaseUrl}/locations/${locId}/test-summary/${testSumId}/hg-summaries/${hgTestSumId}/hg-injections`;
      mock.onPost(postHgInjectionUrl).reply(200, payload);

      const resp = await qaCert.createHgInjection(
        locId,
        testSumId,
        hgTestSumId,
        payload,
      );

      expect(mock.history.post.length).toBe(1);
      expect(resp.data).toStrictEqual(payload);
    });

    test('deleteHgInjection', async () => {
      const deleteHgInjectionUrl = `${qaCertBaseUrl}/locations/${locId}/test-summary/${testSumId}/hg-summaries/${hgTestSumId}/hg-injections/${id}`;
      mock.onDelete(deleteHgInjectionUrl).reply(200, 'deleted');

      const resp = await qaCert.deleteHgInjection(
        locId,
        testSumId,
        hgTestSumId,
        id,
      );

      expect(mock.history.delete.length).toBe(1);
      expect(resp.data).toStrictEqual('deleted');
    });

    // test("deleteUnitDefaultTestRun", async () => {
    //   const deleteUnitDefaultTestRunUrl = `${qaCertBaseUrl}/locations/${locId}/test-summary/${testSumId}/unit-default-tests/${hgTestSumId}/unit-default-test-runs/${id}`;
    //   mock.onDelete(deleteUnitDefaultTestRunUrl).reply(200, "deleted");

    //   const resp = await qaCert.deleteUnitDefaultTestRun(
    //     locId,
    //     testSumId,
    //     unitDefaultTestRunId,
    //     id
    //   );

    //   expect(mock.history.delete.length).toBe(1);
    //   expect(resp.data).toStrictEqual("deleted");
    // });
  });

  /*
  describe("Review And Submit", () => {
    test("getQATestSummaryReviewSubmit", async () => {
      const url = `${config.services.qaCertification.uri}/review-and-submit/test-summary?orisCodes=3`;
      mock.onGet(url).reply(200, "Mocked");

      const resp = await qaCert.getQATestSummaryReviewSubmit([3], []);

      expect(resp.data).toEqual("Mocked");
    });
  });
  */
});
