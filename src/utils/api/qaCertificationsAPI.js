import axios from "axios";
import { handleResponse, handleError, handleImportError } from "./apiUtils";
import config from "../../config";
import { secureAxios } from "./easeyAuthApi";

axios.defaults.headers.common = {
  "x-api-key": config.app.apiKey,
};

const getApiUrl = (path) => {
  let url = config.services.qaCertification.uri;

  if (window.location.href.includes("/workspace")) {
    url = `${url}/workspace`;
  }

  return `${url}${path}`;
};

export const getQAEvaluationReportData = async (
  type,
  monPlanId,
  testId,
  batchId
) => {
  let url = `${config.services.qaCertification.uri}`;

  // *** workspace section url (authenticated)
  if (window.location.href.indexOf("workspace") > -1) {
    url = `${url}/workspace`;
  }

  type = type.replace("_EVAL", "");
  const test = testId ? `&testId=${testId}` : "";
  const batch = batchId ? `&batchId=${batchId}` : "";

  url = `${url}/evaluations/results?type=${type}&monitorPlanId=${monPlanId}${test}${batch}`;

  return axios.get(url).then(handleResponse).catch(handleError);
};

export const getQATestSummary = async (
  locID,
  selectedTestCode,
  beginDate,
  endDate
) => {
  let url = `${config.services.qaCertification.uri}`;
  // *** workspace section url (authenticated)
  if (window.location.href.indexOf("workspace") > -1) {
    url = `${url}/workspace`;
  }
  // *** attach the rest of the url
  url = `${url}/locations/${locID}/test-summary`;
  if (selectedTestCode) {
    if (selectedTestCode.length === 1) {
      url = `${url}?testTypeCodes=${selectedTestCode}`;
    } else {
      let additionalUrl = "";
      for (const x of selectedTestCode) {
        additionalUrl = `${additionalUrl} ${x} |`;
      }
      url = `${url}?testTypeCodes=${additionalUrl}`;
    }
  }
  // *** attach query params
  if (beginDate && endDate) {
    url = `${url}?beginDate=${beginDate}&endDate=${endDate}`;
  }
  return axios.get(url).then(handleResponse).catch(handleError);
};

export const getQATestSummaryReviewSubmit = async (
  orisCodes,
  monPlanIds = []
) => {
  let queryString = `orisCodes=${orisCodes.join("|")}`;

  if (monPlanIds.length > 0) {
    queryString = queryString + `&monPlanIds=${monPlanIds.join("|")}`;
  }

  let url = `${config.services.qaCertification.uri}/review-and-submit/test-summary?${queryString}`;
  return axios.get(url).then(handleResponse).catch(handleError);
};

export const getQATestSummaryByID = async (locID, id) => {
  let url = `${config.services.qaCertification.uri}/`;

  // *** workspace section url (authenticated)
  if (window.location.href.indexOf("workspace") > -1) {
    url = `${url}workspace`;
  }

  // *** attach the rest of the url
  url = `${url}/locations/${locID}/test-summary/${id}`;

  return axios.get(url).then(handleResponse).catch(handleError);
};

export const getQATestSummaryByCode = async (
  locId,
  { _beginDate, _endDate, testTypeCodes = [] }
) => {
  let url = `${config.services.qaCertification.uri}`;

  // *** attach the rest of the url
  url = `${url}/locations/${locId}/test-summary`;

  if (testTypeCodes.length > 0) {
    const param = testTypeCodes.join("|");
    url = `${url}?testTypeCode=${param}`;
  }

  return axios.get(url).then(handleResponse).catch(handleError);
};

export const getQASchema = async () => {
  const url = `${config.services.content.uri}/ecmps/reporting-instructions/qa-certification.schema.json`;

  return axios.get(url).then(handleResponse).catch(handleError);
};

export const getReportingPeriod = async () => {
  const url = `${config.services.mdm.uri}/reporting-periods`;
  return axios.get(url).then(handleResponse).catch(handleError);
};

export const importQA = async (payload) => {
  const url = `${config.services.qaCertification.uri}/workspace/import/`;
  try {
    return handleResponse(
      await secureAxios({
        method: "POST",
        url: url,
        data: payload,
      })
    );
  } catch (error) {
    return handleImportError(error);
  }
};

export const exportQA = async (
  facilityId,
  unitIds,
  stackPipeIds,
  beginDate,
  endDate,
  isOfficial
) => {
  let url;

  if (isOfficial) {
    url = `${config.services.qaCertification.uri}/export?facilityId=${facilityId}`;
  } else {
    url = getApiUrl(`/export?facilityId=${facilityId}`);
  }

  if (unitIds?.length > 0) {
    const unitIdsQueryParam = unitIds.join("|");
    url = `${url}&unitIds=${unitIdsQueryParam}`;
  }
  if (stackPipeIds?.length > 0) {
    const stackPipeIdsQueryParam = stackPipeIds.join("|");
    url = `${url}&stackPipeIds=${stackPipeIdsQueryParam}`;
  }
  if (beginDate && endDate) {
    url = `${url}&beginDate=${beginDate}&endDate=${endDate}`;
  }
  return axios.get(url).then(handleResponse).catch(handleError);
};

export const deleteQATestSummary = async (locId, id) => {
  const url = `${config.services.qaCertification.uri}/workspace/locations/${locId}/test-summary/${id}`;
  try {
    return handleResponse(
      await secureAxios({
        method: "DELETE",
        url,
      })
    );
  } catch (error) {
    return handleError(error);
  }
};

export const getQALinearitySummary = async (locID, testSumId) => {
  let url = `${config.services.qaCertification.uri}`;

  // *** workspace section url (authenticated)
  if (window.location.href.indexOf("workspace") > -1) {
    url = `${url}/workspace`;
  }

  // *** attach the rest of the url
  url = `${url}/locations/${locID}/test-summary/${testSumId}/linearities`;

  return axios.get(url).then(handleResponse).catch(handleError);
};

export const deleteQALinearitySummary = async (locId, testSumId, id) => {
  const url = `${config.services.qaCertification.uri}/workspace/locations/${locId}/test-summary/${testSumId}/linearities/${id}`;
  try {
    return handleResponse(
      await secureAxios({
        method: "DELETE",
        url,
      })
    );
  } catch (error) {
    return handleError(error);
  }
};
export const updateQALinearityTestSummary = async (
  locId,
  testSumId,
  payload
) => {
  const url = `${config.services.qaCertification.uri}/workspace/locations/${locId}/test-summary/${testSumId}`;
  try {
    return handleResponse(
      await secureAxios({
        method: "PUT",
        url: url,
        data: payload,
      })
    );
  } catch (error) {
    return handleImportError(error);
  }
};

export const updateQALinearitySummaryTestSecondLevel = async (
  locId,
  testSumId,
  id,
  payload
) => {
  const url = `${config.services.qaCertification.uri}/workspace/locations/${locId}/test-summary/${testSumId}/linearities/${id}`;
  try {
    return handleResponse(
      await secureAxios({
        method: "PUT",
        url: url,
        data: payload,
      })
    );
  } catch (error) {
    return handleImportError(error);
  }
};
export const createQATestData = async (locId, payload) => {
  const url = `${config.services.qaCertification.uri}/workspace/locations/${locId}/test-summary`;
  try {
    return handleResponse(
      await secureAxios({
        method: "POST",
        url: url,
        data: payload,
      })
    );
  } catch (error) {
    return handleImportError(error);
  }
};

export const createQALinearitySummaryTestSecondLevel = async (
  locId,
  testSumId,
  payload
) => {
  const url = `${config.services.qaCertification.uri}/workspace/locations/${locId}/test-summary/${testSumId}/linearities`;
  try {
    return handleResponse(
      await secureAxios({
        method: "POST",
        url: url,
        data: payload,
      })
    );
  } catch (error) {
    return handleImportError(error);
  }
};

export const getQALinearityInjection = async (locID, testSumId, linSumId) => {
  let url = `${config.services.qaCertification.uri}`;

  // *** workspace section url (authenticated)
  if (window.location.href.indexOf("workspace") > -1) {
    url = `${url}/workspace`;
  }
  // *** attach the rest of the url
  url = `${url}/locations/${locID}/test-summary/${testSumId}/linearities/${linSumId}/injections`;

  return axios.get(url).then(handleResponse).catch(handleError);
};

export const editQALinearityInjection = async (
  locID,
  testSumId,
  linSumId,
  id,
  payload
) => {
  let url = `${config.services.qaCertification.uri}`;

  // *** workspace section url (authenticated)
  if (window.location.href.indexOf("workspace") > -1) {
    url = `${url}/workspace`;
  }

  // *** attach the rest of the url
  url = `${url}/locations/${locID}/test-summary/${testSumId}/linearities/${linSumId}/injections/${id}`;
  try {
    return handleResponse(
      await secureAxios({
        method: "PUT",
        url: url,
        data: payload,
      })
    );
  } catch (error) {
    return handleImportError(error);
  }
};

export const createQALinearityInjection = async (
  locID,
  testSumId,
  linSumId,
  payload
) => {
  let url = `${config.services.qaCertification.uri}`;
  url = `${url}/workspace/locations/${locID}/test-summary/${testSumId}/linearities/${linSumId}/injections/`;
  delete payload["id"];
  try {
    return handleResponse(
      await secureAxios({
        method: "POST",
        url: url,
        data: payload,
      })
    );
  } catch (error) {
    return handleImportError(error);
  }
};

export const deleteQALinearityInjection = async (
  locID,
  testSumId,
  linSumId,
  id
) => {
  const url = `${config.services.qaCertification.uri}/workspace/locations/${locID}/test-summary/${testSumId}/linearities/${linSumId}/injections/${id}`;
  try {
    return handleResponse(
      await secureAxios({
        method: "DELETE",
        url,
      })
    );
  } catch (error) {
    return handleError(error);
  }
};

export const getProtocolGas = async (locID, testSumId) => {
  let url = `${config.services.qaCertification.uri}`;

  // *** workspace section url (authenticated)
  if (window.location.href.indexOf("workspace") > -1) {
    url = `${url}/workspace`;
  }

  // *** attach the rest of the url
  url = `${url}/locations/${locID}/test-summary/${testSumId}/protocol-gases`;

  return axios.get(url).then(handleResponse).catch(handleError);
};

export const createProtocolGas = async (locId, testSumId, payload) => {
  const url = `${config.services.qaCertification.uri}/workspace/locations/${locId}/test-summary/${testSumId}/protocol-gases`;
  try {
    return handleResponse(
      await secureAxios({
        method: "POST",
        url: url,
        data: payload,
      })
    );
  } catch (error) {
    return handleImportError(error);
  }
};

export const updateProtocolGas = async (
  locId,
  testSumId,
  protocolGasId,
  payload
) => {
  const url = `${config.services.qaCertification.uri}/workspace/locations/${locId}/test-summary/${testSumId}/protocol-gases/${protocolGasId}`;
  try {
    return handleResponse(
      await secureAxios({
        method: "PUT",
        url: url,
        data: payload,
      })
    );
  } catch (error) {
    return handleImportError(error);
  }
};
export const deleteProtocolGas = async (locId, testSumId, id) => {
  const url = `${config.services.qaCertification.uri}/workspace/locations/${locId}/test-summary/${testSumId}/protocol-gases/${id}`;
  try {
    return handleResponse(
      await secureAxios({
        method: "DELETE",
        url,
      })
    );
  } catch (error) {
    return handleError(error);
  }
};

export const getRataData = async (locID, testSumId) => {
  let url = `${config.services.qaCertification.uri}`;

  // *** workspace section url (authenticated)
  if (window.location.href.indexOf("workspace") > -1) {
    url = `${url}/workspace`;
  }

  // *** attach the rest of the url
  url = `${url}/locations/${locID}/test-summary/${testSumId}/rata`;

  return axios.get(url).then(handleResponse).catch(handleError);
};

export const createRataData = async (locId, testSumId, payload) => {
  const url = `${config.services.qaCertification.uri}/workspace/locations/${locId}/test-summary/${testSumId}/rata`;
  try {
    return handleResponse(
      await secureAxios({
        method: "POST",
        url: url,
        data: payload,
      })
    );
  } catch (error) {
    return handleImportError(error);
  }
};

export const updateRataData = async (id, locId, testSumId, payload) => {
  const url = `${config.services.qaCertification.uri}/workspace/locations/${locId}/test-summary/${testSumId}/rata/${id}`;
  try {
    return handleResponse(
      await secureAxios({
        method: "PUT",
        url: url,
        data: payload,
      })
    );
  } catch (error) {
    return handleImportError(error);
  }
};

export const deleteRataData = async (locId, testSumId, id) => {
  const url = `${config.services.qaCertification.uri}/workspace/locations/${locId}/test-summary/${testSumId}/rata/${id}`;
  try {
    return handleResponse(
      await secureAxios({
        method: "DELETE",
        url: url,
      })
    );
  } catch (error) {
    return handleImportError(error);
  }
};

export const getRataSummary = async (locId, testSumId, rataId) => {
  let url = `${config.services.qaCertification.uri}`;

  // *** workspace section url (authenticated)
  if (window.location.href.indexOf("workspace") > -1) {
    url = `${url}/workspace`;
  }

  // *** attach the rest of the url
  url = `${url}/locations/${locId}/test-summary/${testSumId}/rata/${rataId}/rata-summaries`;

  return axios.get(url).then(handleResponse).catch(handleError);
};

export const createRataSummary = async (locId, testSumId, rataId, payload) => {
  const url = `${config.services.qaCertification.uri}/workspace/locations/${locId}/test-summary/${testSumId}/rata/${rataId}/rata-summaries`;
  try {
    return handleResponse(
      await secureAxios({
        method: "POST",
        url: url,
        data: payload,
      })
    );
  } catch (error) {
    return handleError(error);
  }
};

export const updateRataSummary = async (
  locId,
  testSumId,
  rataId,
  id,
  payload
) => {
  const url = `${config.services.qaCertification.uri}/workspace/locations/${locId}/test-summary/${testSumId}/rata/${rataId}/rata-summaries/${id}`;
  try {
    return handleResponse(
      await secureAxios({
        method: "PUT",
        url: url,
        data: payload,
      })
    );
  } catch (error) {
    return handleImportError(error);
  }
};

export const deleteRataSummary = async (locId, testSumId, rataId, id) => {
  const url = `${config.services.qaCertification.uri}/workspace/locations/${locId}/test-summary/${testSumId}/rata/${rataId}/rata-summaries/${id}`;
  try {
    return handleResponse(
      await secureAxios({
        method: "DELETE",
        url: url,
      })
    );
  } catch (error) {
    return handleImportError(error);
  }
};

export const getRataRunData = async (locId, testSumId, rataId, rataSumId) => {
  let url = `${config.services.qaCertification.uri}`;

  // *** workspace section url (authenticated)
  if (window.location.href.indexOf("workspace") > -1) {
    url = `${url}/workspace`;
  }

  // *** attach the rest of the url
  url = `${url}/locations/${locId}/test-summary/${testSumId}/rata/${rataId}/rata-summaries/${rataSumId}/rata-runs`;
  return axios.get(url).then(handleResponse).catch(handleError);
};

export const createRataRunData = async (
  locId,
  testSumId,
  rataId,
  rataSumId,
  payload
) => {
  const url = `${config.services.qaCertification.uri}/workspace/locations/${locId}/test-summary/${testSumId}/rata/${rataId}/rata-summaries/${rataSumId}/rata-runs`;
  try {
    return handleResponse(
      await secureAxios({
        method: "POST",
        url: url,
        data: payload,
      })
    );
  } catch (error) {
    return handleError(error);
  }
};

export const updateRataRunData = async (
  locId,
  testSumId,
  rataId,
  rataSumId,

  id,
  payload
) => {
  const url = `${config.services.qaCertification.uri}/workspace/locations/${locId}/test-summary/${testSumId}/rata/${rataId}/rata-summaries/${rataSumId}/rata-runs/${id}`;

  try {
    return handleResponse(
      await secureAxios({
        method: "PUT",
        url: url,
        data: payload,
      })
    );
  } catch (error) {
    return handleImportError(error);
  }
};

export const deleteRataRunData = async (
  locId,
  testSumId,
  rataId,
  rataSumId,
  id
) => {
  const url = `${config.services.qaCertification.uri}/workspace/locations/${locId}/test-summary/${testSumId}/rata/${rataId}/rata-summaries/${rataSumId}/rata-runs/${id}`;
  try {
    return handleResponse(
      await secureAxios({
        method: "DELETE",
        url: url,
      })
    );
  } catch (error) {
    return handleImportError(error);
  }
};

export const getRataTraverseData = async (
  locId,
  testSumId,
  rataId,
  rataSumId,
  rataRunId,
  flowRataRunId
) => {
  let url = `${config.services.qaCertification.uri}`;
  // *** workspace section url (authenticated)
  if (window.location.href.indexOf("workspace") > -1) {
    url = `${url}/workspace`;
  }
  // *** attach the rest of the url
  url = `${url}/locations/${locId}/test-summary/${testSumId}/rata/${rataId}/rata-summaries/${rataSumId}/rata-runs/${rataRunId}/flow-rata-runs/${flowRataRunId}/rata-traverses`;
  return axios.get(url).then(handleResponse).catch(handleError);
};

export const createRataTraverse = async (
  locId,
  testSumId,
  rataId,
  rataSumId,
  rataRunId,
  flowRataRunId,
  payload
) => {
  const url = `${config.services.qaCertification.uri}/workspace/locations/${locId}/test-summary/${testSumId}/rata/${rataId}/rata-summaries/${rataSumId}/rata-runs/${rataRunId}/flow-rata-runs/${flowRataRunId}/rata-traverses`;
  try {
    return handleResponse(
      await secureAxios({
        method: "POST",
        url: url,
        data: payload,
      })
    );
  } catch (error) {
    return handleError(error);
  }
};

export const updateRataTraverseData = async (
  locId,
  testSumId,
  rataId,
  rataSumId,
  rataRunId,
  flowRataRunId,
  id,
  payload
) => {
  const url = `${config.services.qaCertification.uri}/workspace/locations/${locId}/test-summary/${testSumId}/rata/${rataId}/rata-summaries/${rataSumId}/rata-runs/${rataRunId}/flow-rata-runs/${flowRataRunId}/rata-traverses/${id}`;
  try {
    return handleResponse(
      await secureAxios({
        method: "PUT",
        url: url,
        data: payload,
      })
    );
  } catch (error) {
    return handleImportError(error);
  }
};

export const deleteRataTraverseData = async (
  locId,
  testSumId,
  rataId,
  rataSumId,
  rataRunId,
  flowRataRunId,
  id
) => {
  const url = `${config.services.qaCertification.uri}/workspace/locations/${locId}/test-summary/${testSumId}/rata/${rataId}/rata-summaries/${rataSumId}/rata-runs/${rataRunId}/flow-rata-runs/${flowRataRunId}/rata-traverses/${id}`;
  try {
    return handleResponse(
      await secureAxios({
        method: "DELETE",
        url: url,
      })
    );
  } catch (error) {
    return handleImportError(error);
  }
};

export const getAirEmissions = async (locID, testSumId) => {
  let url = `${config.services.qaCertification.uri}`;

  // *** workspace section url (authenticated)
  if (window.location.href.indexOf("workspace") > -1) {
    url = `${url}/workspace`;
  }

  // *** attach the rest of the url
  url = `${url}/locations/${locID}/test-summary/${testSumId}/air-emission-testings`;

  return axios.get(url).then(handleResponse).catch(handleError);
};

export const createAirEmissions = async (locId, testSumId, payload) => {
  const url = `${config.services.qaCertification.uri}/workspace/locations/${locId}/test-summary/${testSumId}/air-emission-testings`;
  try {
    return handleResponse(
      await secureAxios({
        method: "POST",
        url: url,
        data: payload,
      })
    );
  } catch (error) {
    return handleImportError(error);
  }
};

export const updateAirEmissions = async (locId, testSumId, id, payload) => {
  const url = `${config.services.qaCertification.uri}/workspace/locations/${locId}/test-summary/${testSumId}/air-emission-testings/${id}`;
  try {
    return handleResponse(
      await secureAxios({
        method: "PUT",
        url: url,
        data: payload,
      })
    );
  } catch (error) {
    return handleImportError(error);
  }
};

export const deleteAirEmissions = async (locId, testSumId, id) => {
  const url = `${config.services.qaCertification.uri}/workspace/locations/${locId}/test-summary/${testSumId}/air-emission-testings/${id}`;
  try {
    return handleResponse(
      await secureAxios({
        method: "DELETE",
        url,
      })
    );
  } catch (error) {
    return handleError(error);
  }
};

export const getFlowRunData = async (
  locID,
  testSumId,
  rataId,
  rataSumId,
  rataRunId
) => {
  let url = `${config.services.qaCertification.uri}`;

  // *** workspace section url (authenticated)
  if (window.location.href.indexOf("workspace") > -1) {
    url = `${url}/workspace`;
  }

  // *** attach the rest of the url
  url = `${url}/locations/${locID}/test-summary/${testSumId}/rata/${rataId}/rata-summaries/${rataSumId}/rata-runs/${rataRunId}/flow-rata-runs`;

  return axios.get(url).then(handleResponse).catch(handleError);
};

export const createFlowRunData = async (
  locId,
  testSumId,
  rataId,
  rataSumId,
  rataRunId,
  payload
) => {
  let url = `${config.services.qaCertification.uri}/workspace`;
  url = `${url}/locations/${locId}/test-summary/${testSumId}/rata/${rataId}/rata-summaries/${rataSumId}/rata-runs/${rataRunId}/flow-rata-runs`;
  try {
    return handleResponse(
      await secureAxios({
        method: "POST",
        url: url,
        data: payload,
      })
    );
  } catch (error) {
    return handleImportError(error);
  }
};

export const updateFlowRunData = async (
  locId,
  testSumId,
  rataId,
  rataSumId,
  rataRunId,
  id,
  payload
) => {
  let url = `${config.services.qaCertification.uri}/workspace`;
  url = `${url}/locations/${locId}/test-summary/${testSumId}/rata/${rataId}/rata-summaries/${rataSumId}/rata-runs/${rataRunId}/flow-rata-runs/${id}`;
  try {
    return handleResponse(
      await secureAxios({
        method: "PUT",
        url: url,
        data: payload,
      })
    );
  } catch (error) {
    return handleImportError(error);
  }
};

export const deleteFlowRunData = async (
  locId,
  testSumId,
  rataId,
  rataSumId,
  rataRunId,
  id
) => {
  let url = `${config.services.qaCertification.uri}/workspace`;
  url = `${url}/locations/${locId}/test-summary/${testSumId}/rata/${rataId}/rata-summaries/${rataSumId}/rata-runs/${rataRunId}/flow-rata-runs/${id}`;

  try {
    return handleResponse(
      await secureAxios({
        method: "DELETE",
        url,
      })
    );
  } catch (error) {
    return handleError(error);
  }
};

export const getTestQualification = async (locId, testSumId) => {
  const path = `/locations/${locId}/test-summary/${testSumId}/test-qualifications`;
  const url = getApiUrl(path);
  return axios.get(url).then(handleResponse).catch(handleError);
};

export const createTestQualification = async (locId, testSumId, payload) => {
  const path = `/locations/${locId}/test-summary/${testSumId}/test-qualifications`;
  const url = getApiUrl(path);
  try {
    return handleResponse(
      await secureAxios({
        method: "POST",
        url: url,
        data: payload,
      })
    );
  } catch (error) {
    return handleImportError(error);
  }
};

export const updateTestQualification = async (
  locId,
  testSumId,
  id,
  payload
) => {
  const path = `/locations/${locId}/test-summary/${testSumId}/test-qualifications/${id}`;
  const url = getApiUrl(path);
  try {
    return handleResponse(
      await secureAxios({
        method: "PUT",
        url: url,
        data: payload,
      })
    );
  } catch (error) {
    return handleImportError(error);
  }
};

export const deleteTestQualification = async (locId, testSumId, id) => {
  const url = `${config.services.qaCertification.uri}/workspace/locations/${locId}/test-summary/${testSumId}/test-qualifications/${id}`;
  try {
    return handleResponse(
      await secureAxios({
        method: "DELETE",
        url,
      })
    );
  } catch (error) {
    return handleError(error);
  }
};

export const getAppendixECorrelationSummaryRecords = async (
  locId,
  testSumId
) => {
  const path = `/locations/${locId}/test-summary/${testSumId}/appendix-e-correlation-test-summaries`;
  const url = getApiUrl(path);
  return axios.get(url).then(handleResponse).catch(handleError);
};

export const createAppendixECorrelationSummaryRecord = async (
  locId,
  testSumId,
  payload
) => {
  const path = `/locations/${locId}/test-summary/${testSumId}/appendix-e-correlation-test-summaries`;
  const url = getApiUrl(path);
  try {
    return handleResponse(
      await secureAxios({
        method: "POST",
        url: url,
        data: payload,
      })
    );
  } catch (error) {
    return handleError(error);
  }
};

export const updateAppendixECorrelationSummaryRecord = async (
  locId,
  testSumId,
  id,
  payload
) => {
  const path = `/locations/${locId}/test-summary/${testSumId}/appendix-e-correlation-test-summaries/${id}`;
  const url = getApiUrl(path);
  try {
    return handleResponse(
      await secureAxios({
        method: "PUT",
        url: url,
        data: payload,
      })
    );
  } catch (error) {
    return handleImportError(error);
  }
};

export const deleteAppendixECorrelationSummaryRecord = async (
  locId,
  testSumId,
  id
) => {
  const path = `/locations/${locId}/test-summary/${testSumId}/appendix-e-correlation-test-summaries/${id}`;
  const url = getApiUrl(path);
  try {
    return handleResponse(
      await secureAxios({
        method: "DELETE",
        url,
      })
    );
  } catch (error) {
    return handleError(error);
  }
};

export const getFuelFlowToLoadData = async (locId, testSumId) => {
  const path = `/locations/${locId}/test-summary/${testSumId}/fuel-flow-to-load-tests`;
  const url = getApiUrl(path);
  return axios.get(url).then(handleResponse).catch(handleError);
};

export const createFuelFlowToLoad = async (locId, testSumId, payload) => {
  const url = `${config.services.qaCertification.uri}/workspace/locations/${locId}/test-summary/${testSumId}/fuel-flow-to-load-tests`;
  try {
    return handleResponse(
      await secureAxios({
        method: "POST",
        url: url,
        data: payload,
      })
    );
  } catch (error) {
    return handleImportError(error);
  }
};

export const deleteFuelFlowToLoadData = async (locId, testSumId, id) => {
  const url = `${config.services.qaCertification.uri}/workspace/locations/${locId}/test-summary/${testSumId}/fuel-flow-to-load-tests/${id}`;
  try {
    return handleResponse(
      await secureAxios({
        method: "DELETE",
        url,
      })
    );
  } catch (error) {
    return handleError(error);
  }
};

export const updateFuelFlowToLoad = async (locId, testSumId, id, payload) => {
  const url = `${config.services.qaCertification.uri}/workspace/locations/${locId}/test-summary/${testSumId}/fuel-flow-to-load-tests/${id}`;
  try {
    return handleResponse(
      await secureAxios({
        method: "PUT",
        url: url,
        data: payload,
      })
    );
  } catch (error) {
    return handleImportError(error);
  }
};

export const getFuelFlowToLoadBaseline = async (locId, testSumId) => {
  const path = `/locations/${locId}/test-summary/${testSumId}/fuel-flow-to-load-baselines`;
  const url = getApiUrl(path);
  return axios.get(url).then(handleResponse).catch(handleError);
};

export const createFuelFlowToLoadBaseline = async (
  locId,
  testSumId,
  payload
) => {
  const url = `${config.services.qaCertification.uri}/workspace/locations/${locId}/test-summary/${testSumId}/fuel-flow-to-load-baselines`;
  try {
    return handleResponse(
      await secureAxios({
        method: "POST",
        url: url,
        data: payload,
      })
    );
  } catch (error) {
    return handleImportError(error);
  }
};

export const updateFuelFlowToLoadBaseline = async (
  locId,
  testSumId,
  id,
  payload
) => {
  const url = `${config.services.qaCertification.uri}/workspace/locations/${locId}/test-summary/${testSumId}/fuel-flow-to-load-baselines/${id}`;
  try {
    return handleResponse(
      await secureAxios({
        method: "PUT",
        url: url,
        data: payload,
      })
    );
  } catch (error) {
    return handleImportError(error);
  }
};

export const deleteFuelFlowToLoadBaseline = async (locId, testSumId, id) => {
  const url = `${config.services.qaCertification.uri}/workspace/locations/${locId}/test-summary/${testSumId}/fuel-flow-to-load-baselines/${id}`;
  try {
    return handleResponse(
      await secureAxios({
        method: "DELETE",
        url,
      })
    );
  } catch (error) {
    return handleError(error);
  }
};

export const getAppendixERunData = async (
  locId,
  testSumId,
  appECorrTestSumId
) => {
  const path = `/locations/${locId}/test-summary/${testSumId}/appendix-e-correlation-test-summaries/${appECorrTestSumId}/appendix-e-correlation-test-runs`;
  const url = getApiUrl(path);

  return axios.get(url).then(handleResponse).catch(handleError);
};

export const createAppendixERun = async (
  locId,
  testSumId,
  appECorrTestSumId,
  payload
) => {
  const path = `/locations/${locId}/test-summary/${testSumId}/appendix-e-correlation-test-summaries/${appECorrTestSumId}/appendix-e-correlation-test-runs`;
  const url = getApiUrl(path);
  try {
    return handleResponse(
      await secureAxios({
        method: "POST",
        url: url,
        data: payload,
      })
    );
  } catch (error) {
    return handleError(error);
  }
};

export const getAppendixEHeatInputGasData = async (
  locId,
  testSumId,
  appECorrTestSumId,
  appECorrTestRunId
) => {
  const path = `/locations/${locId}/test-summary/${testSumId}/appendix-e-correlation-test-summaries/${appECorrTestSumId}/appendix-e-correlation-test-runs/${appECorrTestRunId}/appendix-e-heat-input-from-gases`;
  const url = getApiUrl(path);
  return axios.get(url).then(handleResponse).catch(handleError);
};

export const createAppendixEHeatInputGas = async (
  locId,
  testSumId,
  appECorrTestSumId,
  appECorrTestRunId,
  payload
) => {
  const testSummary = await getQATestSummaryByID(locId, testSumId);
  payload.monitoringSystemID = testSummary.data.monitoringSystemID;
  const path = `/locations/${locId}/test-summary/${testSumId}/appendix-e-correlation-test-summaries/${appECorrTestSumId}/appendix-e-correlation-test-runs/${appECorrTestRunId}/appendix-e-heat-input-from-gases`;
  const url = getApiUrl(path);
  try {
    return handleResponse(
      await secureAxios({
        method: "POST",
        url: url,
        data: payload,
      })
    );
  } catch (error) {
    return handleError(error);
  }
};

export const updateAppendixECorrelationHeatInputGas = async (
  locId,
  testSumId,
  appECorrTestSumId,
  appECorrTestRunId,
  id,
  payload
) => {
  const path = `/locations/${locId}/test-summary/${testSumId}/appendix-e-correlation-test-summaries/${appECorrTestSumId}/appendix-e-correlation-test-runs/${appECorrTestRunId}/appendix-e-heat-input-from-gases/${id}`;
  const url = getApiUrl(path);
  try {
    return handleResponse(
      await secureAxios({
        method: "PUT",
        url: url,
        data: payload,
      })
    );
  } catch (error) {
    return handleImportError(error);
  }
};

export const deleteAppendixECorrelationHeatInputGas = async (
  locId,
  testSumId,
  appECorrTestSumId,
  appECorrTestRunId,
  id
) => {
  const path = `/locations/${locId}/test-summary/${testSumId}/appendix-e-correlation-test-summaries/${appECorrTestSumId}/appendix-e-correlation-test-runs/${appECorrTestRunId}/appendix-e-heat-input-from-gases/${id}`;
  const url = getApiUrl(path);
  try {
    return handleResponse(
      await secureAxios({
        method: "DELETE",
        url,
      })
    );
  } catch (error) {
    return handleError(error);
  }
};

export const getAppendixEHeatInputOilData = async (
  locId,
  testSumId,
  appECorrTestSumId,
  appECorrTestrunId
) => {
  const path = `/locations/${locId}/test-summary/${testSumId}/appendix-e-correlation-test-summaries/${appECorrTestSumId}/appendix-e-correlation-test-runs/${appECorrTestrunId}/appendix-e-heat-input-from-oils`;
  const url = getApiUrl(path);
  return axios.get(url).then(handleResponse).catch(handleError);
};

export const createAppendixEHeatInputOil = async (
  locId,
  testSumId,
  appECorrTestSumId,
  appECorrTestrunId,
  payload
) => {
  const path = `/locations/${locId}/test-summary/${testSumId}/appendix-e-correlation-test-summaries/${appECorrTestSumId}/appendix-e-correlation-test-runs/${appECorrTestrunId}/appendix-e-heat-input-from-oils`;
  const url = getApiUrl(path);
  try {
    return handleResponse(
      await secureAxios({
        method: "POST",
        url: url,
        data: payload,
      })
    );
  } catch (error) {
    return handleError(error);
  }
};

export const updateAppendixECorrelationHeatInputOil = async (
  locId,
  testSumId,
  appECorrTestSumId,
  appECorrTestrunId,
  id,
  payload
) => {
  const path = `/locations/${locId}/test-summary/${testSumId}/appendix-e-correlation-test-summaries/${appECorrTestSumId}/appendix-e-correlation-test-runs/${appECorrTestrunId}/appendix-e-heat-input-from-oils/${id}`;
  const url = getApiUrl(path);
  try {
    return handleResponse(
      await secureAxios({
        method: "PUT",
        url: url,
        data: payload,
      })
    );
  } catch (error) {
    return handleImportError(error);
  }
};

export const deleteAppendixECorrelationHeatInputOil = async (
  locId,
  testSumId,
  appECorrTestSumId,
  appECorrTestrunId,
  id
) => {
  const path = `/locations/${locId}/test-summary/${testSumId}/appendix-e-correlation-test-summaries/${appECorrTestSumId}/appendix-e-correlation-test-runs/${appECorrTestrunId}/appendix-e-heat-input-from-oils/${id}`;
  const url = getApiUrl(path);
  try {
    return handleResponse(
      await secureAxios({
        method: "DELETE",
        url,
      })
    );
  } catch (error) {
    return handleError(error);
  }
};

export const updateAppendixERun = async (
  locId,
  testSumId,
  appECorrTestSumId,
  id,
  payload
) => {
  const path = `/locations/${locId}/test-summary/${testSumId}/appendix-e-correlation-test-summaries/${appECorrTestSumId}/appendix-e-correlation-test-runs/${id}`;
  const url = getApiUrl(path);
  try {
    return handleResponse(
      await secureAxios({
        method: "PUT",
        url: url,
        data: payload,
      })
    );
  } catch (error) {
    return handleError(error);
  }
};
export const deleteAppendixERun = async (
  locId,
  testSumId,
  appECorrTestSumId,
  id
) => {
  const path = `/locations/${locId}/test-summary/${testSumId}/appendix-e-correlation-test-summaries/${appECorrTestSumId}/appendix-e-correlation-test-runs/${id}`;
  const url = getApiUrl(path);
  try {
    return handleResponse(
      await secureAxios({
        method: "DELETE",
        url,
      })
    );
  } catch (error) {
    return handleError(error);
  }
};

export const getFlowToLoadCheckRecords = async (locId, testSumId) => {
  const path = `/locations/${locId}/test-summary/${testSumId}/flow-to-load-checks`;
  const url = getApiUrl(path);
  return axios.get(url).then(handleResponse).catch(handleError);
};

export const createFlowToLoadCheckRecord = async (
  locId,
  testSumId,
  payload
) => {
  const path = `/locations/${locId}/test-summary/${testSumId}/flow-to-load-checks`;
  const url = getApiUrl(path);
  try {
    return handleResponse(
      await secureAxios({
        method: "POST",
        url: url,
        data: payload,
      })
    );
  } catch (error) {
    return handleImportError(error);
  }
};

export const updateFlowToLoadCheckRecord = async (
  locId,
  testSumId,
  id,
  payload
) => {
  const path = `/locations/${locId}/test-summary/${testSumId}/flow-to-load-checks/${id}`;
  const url = getApiUrl(path);
  try {
    return handleResponse(
      await secureAxios({
        method: "PUT",
        url: url,
        data: payload,
      })
    );
  } catch (error) {
    return handleImportError(error);
  }
};

export const deleteFlowToLoadCheckRecord = async (locId, testSumId, id) => {
  const path = `/locations/${locId}/test-summary/${testSumId}/flow-to-load-checks/${id}`;
  const url = getApiUrl(path);
  try {
    return handleResponse(
      await secureAxios({
        method: "DELETE",
        url: url,
      })
    );
  } catch (error) {
    return handleImportError(error);
  }
};

export const getOnlineOfflineCalibration = async (locId, testSumId) => {
  const path = `/locations/${locId}/test-summary/${testSumId}/online-offline-calibration`;
  const url = getApiUrl(path);
  return axios.get(url).then(handleResponse).catch(handleError);
};

export const createOnlineOfflineCalibration = async (
  locId,
  testSumId,
  payload
) => {
  const url = `${config.services.qaCertification.uri}/workspace/locations/${locId}/test-summary/${testSumId}/online-offline-calibration`;
  try {
    return handleResponse(
      await secureAxios({
        method: "POST",
        url: url,
        data: payload,
      })
    );
  } catch (error) {
    return handleImportError(error);
  }
};

export const updateOnlineOfflineCalibration = async (
  locId,
  testSumId,
  id,
  payload
) => {
  const path = `/locations/${locId}/test-summary/${testSumId}/online-offline-calibration/${id}`;
  const url = getApiUrl(path);
  try {
    return handleResponse(
      await secureAxios({
        method: "PUT",
        url: url,
        data: payload,
      })
    );
  } catch (error) {
    return handleImportError(error);
  }
};

export const deleteOnlineOfflineCalibration = async (locId, testSumId, id) => {
  const path = `/locations/${locId}/test-summary/${testSumId}/online-offline-calibration/${id}`;
  const url = getApiUrl(path);
  try {
    return handleResponse(
      await secureAxios({
        method: "DELETE",
        url: url,
      })
    );
  } catch (error) {
    return handleImportError(error);
  }
};

export const getCalibrationInjectionRecords = async (locId, testSumId) => {
  const path = `/locations/${locId}/test-summary/${testSumId}/calibration-injections`;
  const url = getApiUrl(path);
  return axios.get(url).then(handleResponse).catch(handleError);
};

export const createCalibrationInjectionRecord = async (
  locId,
  testSumId,
  payload
) => {
  const path = `/locations/${locId}/test-summary/${testSumId}/calibration-injections`;
  const url = getApiUrl(path);
  try {
    return handleResponse(
      await secureAxios({
        method: "POST",
        url: url,
        data: payload,
      })
    );
  } catch (error) {
    return handleImportError(error);
  }
};

export const updateCalibrationInjectionRecord = async (
  locId,
  testSumId,
  id,
  payload
) => {
  const path = `/locations/${locId}/test-summary/${testSumId}/calibration-injections/${id}`;
  const url = getApiUrl(path);
  try {
    return handleResponse(
      await secureAxios({
        method: "PUT",
        url: url,
        data: payload,
      })
    );
  } catch (error) {
    return handleImportError(error);
  }
};

export const deleteCalibrationInjectionRecord = async (
  locId,
  testSumId,
  id
) => {
  const path = `/locations/${locId}/test-summary/${testSumId}/calibration-injections/${id}`;
  const url = getApiUrl(path);
  try {
    return handleResponse(
      await secureAxios({
        method: "DELETE",
        url: url,
      })
    );
  } catch (error) {
    return handleImportError(error);
  }
};

export const getCycleTimeSummary = async (locId, testSumId) => {
  const path = `/locations/${locId}/test-summary/${testSumId}/cycle-time-summaries`;
  const url = getApiUrl(path);
  return axios.get(url).then(handleResponse).catch(handleError);
};

export const createCycleTimeSummary = async (
  locId,
  testSumId,
  payload
) => {
 const url = `${config.services.qaCertification.uri}/workspace/locations/${locId}/test-summary/${testSumId}/cycle-time-summaries`;
    try {
      return handleResponse(
        await secureAxios({
          method: "POST",
          url: url,
          data: payload,
        })
      );
    } catch (error) {
      return handleImportError(error);
    }
};

export const updateCycleTimeSummary = async (
  locId,
  testSumId,
  id,
  payload
) => {
  const path = `/locations/${locId}/test-summary/${testSumId}/cycle-time-summaries/${id}`;
  const url = getApiUrl(path);
  try {
    return handleResponse(
      await secureAxios({
        method: "PUT",
        url: url,
        data: payload,
      })
    );
  } catch (error) {
    return handleImportError(error);
  }
};

export const deleteCycleTimeSummary = async (
  locId,
  testSumId,
  id
) => {
  const path = `/locations/${locId}/test-summary/${testSumId}/cycle-time-summaries/${id}`;
  const url = getApiUrl(path);
  try {
    return handleResponse(
      await secureAxios({
        method: "DELETE",
        url: url,
      })
    );
  } catch (error) {
    return handleImportError(error);
  }
};