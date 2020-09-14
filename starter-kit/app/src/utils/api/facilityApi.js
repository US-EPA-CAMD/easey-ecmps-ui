import axios from "./axiosSetup";
//import axios from "axios";
import { handleResponse, handleError } from "./apiUtils";

export function getAllFacilities() {
  const FACT_API_URL =
    "https://api.epa.gov/FACT/1.0/facilities?api_key=05h6CAooxu0vZpfPnAgGzsbB4nCRqdWKCkfo95rG";
  return axios.get(FACT_API_URL).then(handleResponse).catch(handleError);
}
