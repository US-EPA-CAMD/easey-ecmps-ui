import axios from "axios";
import MockAdapter from "axios-mock-adapter";

import config from "../../config";
import * as qaCert from "./qaCertificationsAPI";

const mock = new MockAdapter(axios);

const qaCertBaseUrl = `${config.services.qaCertification.uri}`;
const locId = 'locId'
const testSumId = 'testSumId'
const rataId = 'rataId'
const rataSumId = 'rataSumId'
const rataRunId = 'rataRunId'
const flowRataRunId = 'flowRataRunId'
const id = 'id'

beforeEach(() => {
  mock.resetHistory()
})

describe('RATA summary CRUD operations', () => {

  test('getRataSummary', async () => {
    const rataSummaryData = [{ rataSummary: 'data' }, { rataSummary: 'data2' }]
    const getRataSummaryUrl = `${qaCertBaseUrl}/locations/${locId}/test-summary/${testSumId}/rata/${rataId}/rata-summaries`;
    mock.onGet(getRataSummaryUrl).reply(200, rataSummaryData)

    const resp = await qaCert.getRataSummary(locId, testSumId, rataId)

    expect(mock.history.get.length).toBe(1)
    expect(resp.data).toStrictEqual(rataSummaryData)
  })

  test('createRataSummary', async () => {
    const payload = { rataSummary: 'data' }
    const postRataSummaryUrl = `${qaCertBaseUrl}/workspace/locations/${locId}/test-summary/${testSumId}/rata/${rataId}/rata-summaries`;
    mock.onPost(postRataSummaryUrl).reply(200, payload)

    const resp = await qaCert.createRataSummary(locId, testSumId, rataId, payload)

    expect(mock.history.post.length).toBe(1)
    expect(resp.data).toStrictEqual(payload)
  })

  test('updateRataSummary', async () => {
    const payload = { rataSummary: 'data' }
    const putRataSummaryUrl = `${qaCertBaseUrl}/workspace/locations/${locId}/test-summary/${testSumId}/rata/${rataId}/rata-summaries/${id}`
    mock.onPut(putRataSummaryUrl).reply(200, payload)

    const resp = await qaCert.updateRataSummary(locId, testSumId, rataId, id, payload)

    expect(mock.history.put.length).toBe(1)
    expect(resp.data).toStrictEqual(payload)
  })

  test('deleteRataSummary', async () => {
    const deleteRataSummaryUrl = `${qaCertBaseUrl}/workspace/locations/${locId}/test-summary/${testSumId}/rata/${rataId}/rata-summaries/${id}`
    mock.onDelete(deleteRataSummaryUrl).reply(200, 'deleted')

    const resp = await qaCert.deleteRataSummary(locId, testSumId, rataId, id)

    expect(mock.history.delete.length).toBe(1)
    expect(resp.data).toStrictEqual('deleted')
  })
})

describe('RATA traverse CRUD operations', () => {

  test('getRataTraverseData', async () => {
    const rataTraverseResp = [{ rataTraverse: 'data' }, { rataTraverse: 'data2' }]
    const getRataTraverseUrl = `${qaCertBaseUrl}/locations/${locId}/test-summary/${testSumId}/rata/${rataId}/rata-summaries/${rataSumId}/rata-runs/${rataRunId}/flow-rata-runs/${flowRataRunId}/rata-traverses`;
    mock.onGet(getRataTraverseUrl).reply(200, rataTraverseResp)

    const resp = await qaCert.getRataTraverseData(locId, testSumId, rataId, rataSumId, rataRunId, flowRataRunId)

    expect(mock.history.get.length).toBe(1)
    expect(resp.data).toStrictEqual(rataTraverseResp)
  })

  test('createRataTraverse', async () => {
    const postRataTraverseUrl = `${qaCertBaseUrl}/workspace/locations/${locId}/test-summary/${testSumId}/rata/${rataId}/rata-summaries/${rataSumId}/rata-runs/${rataRunId}/flow-rata-runs/${flowRataRunId}/rata-traverses`;
    const payload = { data: 'rataTraverse' }
    mock.onPost(postRataTraverseUrl).reply(200, 'created')

    const resp = await qaCert.createRataTraverse(locId, testSumId, rataId, rataSumId, rataRunId, flowRataRunId, payload)

    expect(mock.history.post.length).toBe(1)
    expect(resp.data).toStrictEqual('created')
  })

  test('updateRataTraverse', async () => {
    const putRataTraverseUrl = `${qaCertBaseUrl}/workspace/locations/${locId}/test-summary/${testSumId}/rata/${rataId}/rata-summaries/${rataSumId}/rata-runs/${rataRunId}/flow-rata-runs/${flowRataRunId}/rata-traverses/${id}`;
    const payload = { data: 'rataTraverse' }
    mock.onPut(putRataTraverseUrl).reply(200, payload)

    const resp = await qaCert.updateRataTraverseData(locId, testSumId, rataId, rataSumId, rataRunId, flowRataRunId, id, payload)

    expect(mock.history.put.length).toBe(1)
    expect(resp.data).toStrictEqual(payload)
  })

  test('deleteRataTraverseData', async () => {
    const deleteRataTraverseUrl = `${qaCertBaseUrl}/workspace/locations/${locId}/test-summary/${testSumId}/rata/${rataId}/rata-summaries/${rataSumId}/rata-runs/${rataRunId}/flow-rata-runs/${flowRataRunId}/rata-traverses/${id}`;
    mock.onDelete(deleteRataTraverseUrl).reply(200, 'deleted')

    const resp = await qaCert.deleteRataTraverseData(locId, testSumId, rataId, rataSumId, rataRunId, flowRataRunId, id)

    expect(mock.history.delete.length).toBe(1)
    expect(resp.data).toStrictEqual('deleted')

  })
})

describe('Appendix E Correlation Summary Test CRUD operations', () => {

  test('getAppendixECorrelationSummary', async () => {
    const appendixECorrelationSummaryData = [{ appendixECorrelationSummary: 'data' }, { appendixECorrelationSummary: 'data2' }]
    const getAppendixECorrelationSummaryUrl = `${qaCertBaseUrl}/locations/${locId}/test-summary/${testSumId}/appendix-e-correlation-test-summaries`;
    mock.onGet(getAppendixECorrelationSummaryUrl).reply(200, appendixECorrelationSummaryData)

    const resp = await qaCert.getAppendixECorrelationSummaryRecords(locId, testSumId)

    expect(mock.history.get.length).toBe(1)
    expect(resp.data).toStrictEqual(appendixECorrelationSummaryData)
  })

  test('createAppendixECorrelationSummary', async () => {
    const payload = { appendixECorrelationSummary: 'data' }
    const postAppendixECorrelationSummaryUrl = `${qaCertBaseUrl}/workspace/locations/${locId}/test-summary/${testSumId}/appendix-e-correlation-test-summaries`;
    mock.onPost(postAppendixECorrelationSummaryUrl).reply(200, payload)

    const resp = await qaCert.createAppendixECorrelationSummaryRecord(locId, testSumId, payload)

    expect(mock.history.post.length).toBe(1)
    expect(resp.data).toStrictEqual(payload)
  })
})

describe('RATA Test Qualification CRUD operations', () => {
  test('deleteTestQualification', async () => {
    const deleteTestQualUrl = `${qaCertBaseUrl}/workspace/locations/${locId}/test-summary/${testSumId}/test-qualifications/${id}`
    mock.onDelete(deleteTestQualUrl).reply(200, 'deleted')

    const resp = await qaCert.deleteRataSummary(locId, testSumId, id)

    expect(mock.history.delete.length).toBe(1)
    expect(resp.data).toStrictEqual('deleted')
  })
})