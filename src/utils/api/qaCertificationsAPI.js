import axios from "axios";
import { handleResponse, handleError, handleImportError } from "./apiUtils";
import config from "../../config";
import { secureAxios } from "./easeyAuthApi";
axios.defaults.headers.common = {
  "x-api-key": config.app.apiKey,
};

export const getQATestSummary = async (locID, beginDate, endDate) => {
  let url = `${config.services.qaCertification.uri}`;

  // *** workspace section url (authenticated)
  if (window.location.href.indexOf("workspace") > -1) {
    url = `${url}/workspace`;
  }

  // *** attach the rest of the url
  url = `${url}/locations/${locID}/test-summary`;

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
}

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
}
export const updateQALinearityTestSummary = async (locId, testSumId, payload) => {
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

export const updateQALinearitySummaryTestSecondLevel = async (locId, testSumId,id, payload) => {
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

export const createQALinearitySummaryTestSecondLevel = async (locId, testSumId, payload) => {
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