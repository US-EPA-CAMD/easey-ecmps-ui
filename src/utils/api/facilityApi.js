//import axios from "./axiosSetup";
import axios from "axios";
import { handleResponse, handleError } from "./apiUtils";
import config from "../../config";

export async function getAllFacilities() {
  return axios
    .get(`${config.services.facilities.uri}/facilities`)
    .then(handleResponse)
    .catch(handleError);
}
