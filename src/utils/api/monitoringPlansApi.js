//import axios from "./axiosSetup";
import axios from "axios";
import { handleResponse, handleError } from "./apiUtils";
import config from "../../config";

export async function getMonitoringPlans(orisCode) {
  return axios
    .get(`${config.services.monitorPlans.uri}/monitor-plans?orisCode=${orisCode}`)
    .then(handleResponse)
    .catch(handleError);
}
