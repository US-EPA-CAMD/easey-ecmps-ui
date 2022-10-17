import axios from "axios";
import config from "../../config";
import { handleError, handleResponse } from "./apiUtils";
import download from "downloadjs";

axios.defaults.headers.common = {
  "x-api-key": config.app.apiKey,
};

export const exportEmissionsData = async (monitorPlanId, year, quarter) => {
  const url = new URL(`${config.services.emissions.uri}/emissions/export`);
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
  quarter
) => {
  const fileName = `Emissions | Export - ${facility}.json`;
  const response = await exportEmissionsData(monitorPlanId, year, quarter);

  download(JSON.stringify(response.data, null, "\t"), fileName);
};
