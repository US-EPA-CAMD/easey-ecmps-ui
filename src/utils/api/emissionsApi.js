import axios from "axios";
import config from "../../config";
import { handleError, handleResponse, handleImportError } from "./apiUtils";
import { secureAxios } from "./easeyAuthApi";
import download from "downloadjs";

axios.defaults.headers.common = {
  "x-api-key": config.app.apiKey,
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
  });

  try {
    const response = await axios.get(
      `${url.toString()}?${searchParams.toString()}`
    );
    return handleResponse(response);
  } catch (error) {
    handleError(error);
  }
};

export const exportEmissionsDataDownload = async (
  facility,
  monitorPlanId,
  year,
  quarter,
  isWorkspace = false
) => {
  const fileName = `Emissions | Export - ${facility}.json`;
  const response = await exportEmissionsData(
    monitorPlanId,
    year,
    quarter,
    isWorkspace
  );

  download(JSON.stringify(response.data, null, "\t"), fileName);
};

export const getEmissionViewData = async (
  viewCode,
  monitorPlanId,
  year,
  quarter,
  unitIds,
  stackPipeIds,
  attachFile = false
) => {
  const url = new URL(
    `${config.services.emissions.uri}/emissions/views/${viewCode}`
  );

  const searchParams = new URLSearchParams({
    monitorPlanId,
    quarter: Array.isArray(quarter) ? quarter.join("|") : quarter,
    year: Array.isArray(year) ? year.join("|") : year,
    unitIds: Array.isArray(unitIds) ? unitIds.join("|") : unitIds,
    stackPipeIds: Array.isArray(stackPipeIds)
      ? stackPipeIds.join("|")
      : stackPipeIds,
    attachFile,
  });

  try {
    let response;
    if (attachFile) {
      response = await axios.get(
        `${url.toString()}?${searchParams.toString()}`,
        {
          headers: {
            Accept: "text/csv",
          },
          responseType: "blob",
          timeout: Number(config.app.apiTimeout),
        }
      );
    } else {
      response = await axios.get(
        `${url.toString()}?${searchParams.toString()}`
      );
    }
    return handleResponse(response);
  } catch (error) {
    handleError(error);
  }
};

export const getViews = async () => {
  try {
    const response = await axios.get(
      `${config.services.emissions.uri}/emissions/views`
    );
    return handleResponse(response);
  } catch (error) {
    handleError(error);
    return [];
  }
};

export const getEmissionsSchema = async () => {
  const url = `${config.services.content.uri}/ecmps/reporting-instructions/emissions.schema.json`;
  return axios.get(url).then(handleResponse).catch(handleError);
};

export const importEmissionsFile = async (payload) => {
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
    return handleImportError(error);
  }
};