import { handleResponse, handleError } from "./apiUtils";
import config from "../../config";
import { secureAxios } from "./easeyAuthApi";

// Endpoint that dynamically routes to workspace or non-workspace environments
const fireApiGetRequest = async (path, workspaceOnly = false) => {
  let url = config.services.facilities.uri;

  if (workspaceOnly || window.location.href.includes("/workspace")) {
    url = `${url}/workspace`;
  }

  const payload = {
    url: `${url}${path}`,
    method: "GET",
  };

  return await secureAxios(payload).then(handleResponse).catch(handleError);
};

export const getStackPipesByOrisCode = async (orisCode) => {
  return fireApiGetRequest(`/facilities/${orisCode}/stack-pipes`);
};

export const getUnitStackConfigsByOrisCode = async (orisCode) => {
  return fireApiGetRequest(`/facilities/${orisCode}/unit-stack-configurations`);
};

export const getUnitsByOrisCode = async (orisCode) => {
  return fireApiGetRequest(`/facilities/${orisCode}/units`);
};

export async function getAllFacilities() {
  return await fireApiGetRequest("/facilities");
}

export async function getFacilityById(id) {
  return await fireApiGetRequest(`/facilities/${id}`);
}
