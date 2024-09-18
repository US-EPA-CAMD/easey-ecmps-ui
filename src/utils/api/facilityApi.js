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

export const getStackPipesByFacId = async (facId) => {
  return fireApiGetRequest(`/facilities/${facId}/stack-pipes`);
};

export const getUnitStackConfigsByFacId = async (facId) => {
  return fireApiGetRequest(`/facilities/${facId}/unit-stack-configurations`);
};

export const getUnitsByFacId = async (facId) => {
  return fireApiGetRequest(`/facilities/${facId}/units`);
};

export async function getAllFacilities() {
  return await fireApiGetRequest("/facilities");
}

export async function getFacilityById(id) {
  return await fireApiGetRequest(`/facilities/${id}`);
}
