import axios from "axios";
import config from "../../config";
import { handleError, handleResponse } from "./apiUtils";
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

export const getViews = async ()=>{
  
  try{
    const response = await axios.get(`${config.services.emissions.uri}/emissions/views`)
    return handleResponse(response)
  }catch(error){
    handleError(error)
    return [];
  }
}
