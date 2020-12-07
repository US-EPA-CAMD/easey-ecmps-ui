//import axios from "./axiosSetup";
import axios from "axios";
import { handleResponse, handleError } from "./apiUtils";
import config from "../../config";

export async function getMonitoringPlans(orisCode) {
  const URL = config.services.monitorPlans.uri + "?orisCode=" + orisCode;
  return axios.get(URL).then(handleResponse).catch(handleError);
}
