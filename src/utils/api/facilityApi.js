import axios from "axios";
import { handleResponse, handleError } from "./apiUtils";
import config from "../../config";

axios.defaults.headers.common = {
  "x-api-key": config.app.apiKey,
};

export async function getAllFacilities() {
  return axios
    .get(`${config.services.facilities.uri}/facilities`)
    .then(handleResponse)
    .catch(handleError);
}

export async function getFacilityById(id) {
  return axios
    .get(`${config.services.facilities.uri}/facilities/${id}`)
    .then(handleResponse)
    .catch(handleError);
}
