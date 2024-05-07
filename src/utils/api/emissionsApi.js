import config from "../../config";
import { handleError, handleResponse, handleImportError } from "./apiUtils";
import { secureAxios } from "./easeyAuthApi";
import download from "downloadjs";
import axios from "axios";

const getApiUrl = (path = "") => {
  let url = config.services.emissions.uri;

  if (window.location.href.includes("/workspace")) {
    url = `${url}/workspace`;
  }

  return `${url}${path}`;
};

export const getEmissionsReviewSubmit = async (
  orisCodes,
  monPlanIds = [],
  quarters = []
) => {
  let queryString = `orisCodes=${orisCodes.join("|")}`;

  if (monPlanIds.length > 0) {
    queryString = queryString + `&monPlanIds=${monPlanIds.join("|")}`;
  }

  queryString = queryString + `&quarters=${quarters.join("|")}`;

  let url = `${getApiUrl()}/emissions?${queryString}`;
  return await secureAxios({ url: url, method: "GET" })
    .then(handleResponse)
    .catch(handleError);
};

export const exportEmissionsData = async (
  monitorPlanId,
  year,
  quarter,
  isWorkspace = false
) => {
  const url = new URL(
    isWorkspace
      ? `${config.services.emissions.uri}/workspace/emissions/export`
      : `${config.services.emissions.uri}/emissions/export`
  );
  const searchParams = new URLSearchParams({
    monitorPlanId,
    year,
    quarter,
    reportedValuesOnly: true,
  });

  const response = await secureAxios({
    url: `${url.toString()}?${searchParams.toString()}`,
    method: "GET",
   });

  return handleResponse(response);
};

export const exportEmissionsDataDownload = async (
  facility,
  monitorPlanId,
  year,
  quarter,
  isWorkspace = false
) => {
  const fileName = `Emissions | Export - ${facility} - ${year} - Q${quarter}.json`;

  try {
    const response = await exportEmissionsData(
        monitorPlanId,
        year,
        quarter,
        isWorkspace
    );

    if (response.status === 200)
      download(JSON.stringify(response.data, null, "\t"), fileName);

  } catch(error) {
    handleError(error);
  }
};

export const getEmissionViewData = async (
  viewCode,
  monitorPlanId,
  reportingPeriod,
  unitIds,
  stackPipeIds,
  isWorkspace,
  attachFile = false
) => {
  const url = new URL(
    // `${config.services.emissions.uri}/emissions/views/${viewCode}`
    isWorkspace
      ? `${config.services.emissions.uri}/workspace/emissions/views/${viewCode}`
      : `${config.services.emissions.uri}/emissions/views/${viewCode}`
  );
  const searchParams = new URLSearchParams({
    monitorPlanId,
    reportingPeriod: Array.isArray(reportingPeriod)
      ? reportingPeriod.join("|")
      : reportingPeriod,
    unitIds: Array.isArray(unitIds) ? unitIds.join("|") : unitIds,
    stackPipeIds: Array.isArray(stackPipeIds)
      ? stackPipeIds.join("|")
      : stackPipeIds,
    attachFile,
  });

  try {
    let response;
    if (attachFile) {
      response = await secureAxios({
        url: `${url.toString()}?${searchParams.toString()}`,
        method: "GET",
        headers: {
          Accept: "text/csv",
        },
        responseType: "blob",
        timeout: Number(config.app.apiTimeout),
      });
    } else {
      response = await secureAxios({
        url: `${url.toString()}?${searchParams.toString()}`,
        method: "GET",
      });
    }
    return handleResponse(response);
  } catch (error) {
    handleError(error);
  }
};

export const getViews = async () => {
  try {
    const response = await secureAxios({
      url: `${config.services.emissions.uri}/emissions/views`,
      method: "GET",
    });
    return handleResponse(response);
  } catch (error) {
    handleError(error);
    return [];
  }
};

export const getEmissionsSchema = async () => {
  const url = `${config.services.content.uri}/ecmps/reporting-instructions/emissions.schema.json`;
  return axios({ url: url, method: "GET" })
    .then(handleResponse)
    .catch(handleError);
};

export const importEmissionsData = async (payload) => {
  const url = `${config.services.emissions.uri}/workspace/emissions/import`;
  try {
    return handleResponse(
      await secureAxios({
        method: "POST",
        url: url,
        data: payload,
      })
    );
  } catch (error) {
    // get errors logged
    handleImportError(error);
    return error.response;
  }
};
