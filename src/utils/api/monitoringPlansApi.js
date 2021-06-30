import axios from "axios";
import { handleResponse, handleError } from "./apiUtils";
import config from "../../config";

// *** obtain monitoring plans
export async function getMonitoringPlans(orisCode) {
  let url = `${config.services.monitorPlans.uri}`;

  // *** workspace section url (authenticated)
  if (url.indexOf("workspace") > -1) {
    url = `${url}/workspace/plans/${orisCode}/configurations`;
  }
  // *** non-authenticated section
  else {
    url = `${url}/monitor-plans/${orisCode}/configurations`;
  }

  return axios.get(url).then(handleResponse).catch(handleError);
}

// *** obtain monitoring methods
export async function getMonitoringMethods(locationId) {
  let url = `${config.services.monitorPlans.uri}`;

  // *** workspace section url (authenticated)
  if (url.indexOf("workspace") > -1) {
    url = `${url}/workspace/locations/${locationId}/methods`;
  }
  // *** non-authenticated section
  else {
    url = `${url}/monitor-locations/${locationId}/methods`;
  }

  return axios.get(url).then(handleResponse).catch(handleError);
}

export async function getMonitoringMatsMethods(locationId) {
  return axios
    .get(
      `${config.services.monitorPlans.uri}/monitor-locations/${locationId}/supplemental-methods`
    )
    .then(handleResponse)
    .catch(handleError);
}
export async function getMonitoringSystems(locationId) {
  return axios
    .get(
      `${config.services.monitorPlans.uri}/monitor-locations/${locationId}/systems`
    )
    .then(handleResponse)
    .catch(handleError);
}
export async function getMonitoringSystemsFuelFlows(locationId, systemId) {
  return axios
    .get(
      `${config.services.monitorPlans.uri}/monitor-locations/${locationId}/systems/${systemId}/system-fuel-flows`
    )
    .then(handleResponse)
    .catch(handleError);
}
export async function getMonitoringSystemsComponents(systemId, componentId) {
  return axios
    .get(
      `${config.services.monitorPlans.uri}/monitor-locations/${systemId}/systems/${componentId}/components`
    )
    .then(handleResponse)
    .catch(handleError);
}

export async function postCheckoutMonitoringPlanConfiguration(id, user) {
  const userName = { username: user };
  return axios
    .post(
      `${config.services.monitorPlans.uri}/workspace/plans/${id}/check-out`,
      userName
    )
    .then((response) => response.data)
    .catch(handleError);
}

export async function putLockTimerUpdateConfiguration(id) {
  return axios
    .put(`${config.services.monitorPlans.uri}/workspace/plans/${id}/check-out`)
    .then(handleResponse)
    .catch(handleError);
}

export const saveMonitoringMethods = async (payload) => {
  let url = `${config.services.monitorPlans.uri}/workspace/locations/${payload["monLocId"]}/methods/${payload["id"]}`;

  delete payload["monLocId"];
  delete payload["id"];

  return axios.put(url, payload).then(handleResponse).catch(handleError);
};
