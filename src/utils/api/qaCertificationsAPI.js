import axios from "axios";
import { handleResponse, handleError, handleImportError } from "./apiUtils";
import config from "../../config";
import { secureAxios } from "./easeyAuthApi";
axios.defaults.headers.common = {
  "x-api-key": config.app.apiKey,
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

export const getQATestSummaryByID = async (locID, id) => {
  let url = `${config.services.qaCertification.uri}/`;

  // *** workspace section url (authenticated)
  if (window.location.href.indexOf("workspace") > -1) {
    url = `${url}/workspace`;
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
  endDate
) => {
  let url = `${config.services.qaCertification.uri}/export?facilityId=${facilityId}`;
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
  try {
    return handleResponse(
      await secureAxios({
        method: "GET",
        url: url,
      })
    );
  } catch (error) {
    return handleError(error);
  }
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

export const createProtocolGas = async (
  locId,
  testSumId,
  payload
) => {
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

export const createRataData = async (
  locId,
  testSumId,
  payload
) => {
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

export const getRataSummary = async (locId, testSumId, rataId) => {
  // dummy fetch
  await Promise.resolve(resolve => setTimeout(resolve, 3000))
  const data = [
    {
      operatingLevelCode: "opLvlCode2",
      averageGrossUnitLoad: 0,
      referenceMethodCode: "string",
      meanCEMValue: 0,
      meanRATAReferenceValue: 1,
      meanDifference: 0,
      standardDeviationDifference: 0,
      confidenceCoefficient: 0,
      tValue: 0,
      apsIndicator: 0,
      apsCode: "string",
      relativeAccuracy: 0,
      biasAdjustmentFactor: 0,
      co2OrO2ReferenceMethodCode: "string",
      stackDiameter: 0,
      stackArea: 0,
      numberOfTraversePoints: 0,
      calculatedWAF: 0,
      defaultWAF: 0,
      id: "string",
      rataId: "string",
      calculatedAverageGrossUnitLoad: 0,
      calculatedMeanCEMValue: 0,
      calculatedMeanRATAReferenceValue: 0,
      calculatedMeanDifference: 0,
      calculatedStandardDeviationDifference: 0,
      calculatedConfidenceCoefficient: 0,
      calculatedTValue: 0,
      calculatedApsIndicator: 0,
      calculatedRelativeAccuracy: 0,
      calculatedBiasAdjustmentFactor: 0,
      calculatedStackArea: 0,
      calculatedCalculatedWAF: 0,
      userId: "string",
      addDate: "string",
      updateDate: "string"
    },
    {
      operatingLevelCode: "opLvlCode1",
      averageGrossUnitLoad: 0,
      referenceMethodCode: "string",
      meanCEMValue: 0,
      meanRATAReferenceValue: 1,
      meanDifference: 0,
      standardDeviationDifference: 0,
      confidenceCoefficient: 0,
      tValue: 0,
      apsIndicator: 0,
      apsCode: "string",
      relativeAccuracy: 0,
      biasAdjustmentFactor: 0,
      co2OrO2ReferenceMethodCode: "string",
      stackDiameter: 0,
      stackArea: 0,
      numberOfTraversePoints: 0,
      calculatedWAF: 0,
      defaultWAF: 0,
      id: "string",
      rataId: "string",
      calculatedAverageGrossUnitLoad: 0,
      calculatedMeanCEMValue: 0,
      calculatedMeanRATAReferenceValue: 0,
      calculatedMeanDifference: 0,
      calculatedStandardDeviationDifference: 0,
      calculatedConfidenceCoefficient: 0,
      calculatedTValue: 0,
      calculatedApsIndicator: 0,
      calculatedRelativeAccuracy: 0,
      calculatedBiasAdjustmentFactor: 0,
      calculatedStackArea: 0,
      calculatedCalculatedWAF: 0,
      userId: "string",
      addDate: "string",
      updateDate: "string"
    }
  ]
  return { status: 200, data }

  // actual fetch
  let url = `${config.services.qaCertification.uri}`;

  // *** workspace section url (authenticated)
  if (window.location.href.indexOf("workspace") > -1) {
    url = `${url}/workspace`;
  }

  // *** attach the rest of the url
  url = `${url}/locations/${locId}/test-summary/${testSumId}/rata/${rataId}/rata-summary`;

  return axios.get(url).then(handleResponse).catch(handleError);
}

export const createRataSummary = async (locId, testSumId, rataId, payload) => {
  const url = `${config.services.qaCertification.uri}/workspace/locations/${locId}/test-summary/${testSumId}/rata/${rataId}/rata-summary`;
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
}

export const updateRataSummary = async (locId, testSumId, rataId, payload) => {
  const url = `${config.services.qaCertification.uri}/workspace/locations/${locId}/test-summary/${testSumId}/rata/${rataId}/rata-summary`;
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
}
