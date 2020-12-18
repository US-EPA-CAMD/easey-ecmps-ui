//import axios from "./axiosSetup";
import axios from "axios";
import { handleResponse, handleError } from "./apiUtils";
import config from "../../config";

export async function getMonitoringPlans(orisCode) {
  // const url = `${config.services.monitorPlans.uri}/monitor-plans?orisCode=${orisCode}`;
  // console.log('this is url ',url);
  return axios
    .get(`${config.services.monitorPlans.uri}/monitor-plans/${orisCode}/configurations`)
    .then(handleResponse)
    .catch(handleError);
}

export async function getMonitoringMethods(locationId) {
  return axios
    .get(`${config.services.monitorPlans.uri}/monitor-locations/${locationId}/methods`)
    .then(handleResponse)
    .catch(handleError);
}
