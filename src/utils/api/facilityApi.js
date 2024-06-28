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

export const getStackPipesByFacId = async (id) => {
  // return fireApiGetRequest(`/facilities/${id}/stack-pipes`);
  return Promise.resolve({ data: [] });
};

export const getUnitStackConfigsByFacId = async (id) => {
  // return fireApiGetRequest(`/facilities/${id}/unit-stack-configurations`);
  return Promise.resolve({ data: [] });
};

export const getUnitsByFacId = async (facId) => {
  // return fireApiGetRequest(`/facilities/${id}/units`);
  return Promise.resolve({ data: [] });
};

export async function getAllFacilities() {
  return await fireApiGetRequest("/facilities");
}

export async function getFacilityById(id) {
  return await fireApiGetRequest(`/facilities/${id}`);
}
