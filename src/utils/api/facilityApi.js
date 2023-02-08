import axios from "axios";
import { handleResponse, handleError } from "./apiUtils";
import config from "../../config";
import { secureAxios } from "./easeyAuthApi";

axios.defaults.headers.common = {
  "x-api-key": config.app.apiKey,
};

//Endpoint that dynamically routes to workspace or non-workspace environments
const fireApiGetRequest = async (path, workspaceOnly = false) => {
  let url = config.services.facilities.uri;
  let isWorkspace = false;

  if (workspaceOnly || window.location.href.includes("/workspace")) {
    url = `${url}/workspace`;
    isWorkspace = true;
  }

  const payload = {
    url: `${url}${path}`,
    method: "GET",
  };

  if (isWorkspace) {
    return await secureAxios(payload).then(handleResponse).catch(handleError);
  } else {
    return await axios(payload).then(handleResponse).catch(handleError);
  }
};

export async function getAllFacilities() {
  return await fireApiGetRequest("/facilities");
}

export async function getFacilityById(id) {
  return await fireApiGetRequest(`/facilities/${id}`);
}
