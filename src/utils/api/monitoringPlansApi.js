import axios from "axios";
import { handleResponse, handleError } from "./apiUtils";
import config from "../../config";

// *** obtain monitoring plans
export const getMonitoringPlans = async (orisCode) => {
  let url = `${config.services.monitorPlans.uri}`;

  // *** workspace section url (authenticated)
  if (window.location.href.indexOf("workspace") > -1) {
    url = `${url}/workspace`;
  }

  // *** attach the rest of the url
  url = `${url}/plans/${orisCode}/configurations`;

  return axios.get(url).then(handleResponse).catch(handleError);
};

// *** obtain monitoring methods
export const getMonitoringMethods = async (locationId) => {
  let url = `${config.services.monitorPlans.uri}`;

  // *** workspace section url (authenticated)
  if (window.location.href.indexOf("workspace") > -1) {
    url = `${url}/workspace`;
  }

  // *** attach the rest of the url
  url = `${url}/locations/${locationId}/methods`;

  return axios.get(url).then(handleResponse).catch(handleError);
};

export const getMonitoringMatsMethods = async (locationId) => {
  return axios
    .get(
      `${config.services.monitorPlans.uri}/locations/${locationId}/supplemental-methods`
    )
    .then(handleResponse)
    .catch(handleError);
};

export const getMonitoringSystems = async (locationId) => {
  return axios
    .get(`${config.services.monitorPlans.uri}/locations/${locationId}/systems`)
    .then(handleResponse)
    .catch(handleError);
};

export const getMonitoringSystemsFuelFlows = async (locationId, systemId) => {
  return axios
    .get(
      `${config.services.monitorPlans.uri}/locations/${locationId}/systems/${systemId}/system-fuel-flows`
    )
    .then(handleResponse)
    .catch(handleError);
};

export const getMonitoringSystemsComponents = async (systemId, componentId) => {
  return axios
    .get(
      `${config.services.monitorPlans.uri}/locations/${systemId}/systems/${componentId}/components`
    )
    .then(handleResponse)
    .catch(handleError);
};

export const postCheckoutMonitoringPlanConfiguration = async (id, user) => {
  const userName = { username: user };
  return axios
    .post(
      `${config.services.monitorPlans.uri}/workspace/plans/${id}/check-out`,
      userName
    )
    .then((response) => response.data)
    .catch(handleError);
};

export const putLockTimerUpdateConfiguration = async (id) => {
  return axios
    .put(`${config.services.monitorPlans.uri}/workspace/plans/${id}/check-out`)
    .then(handleResponse)
    .catch(handleError);
};

export const saveMonitoringMethods = async (payload) => {
  const url = `${config.services.monitorPlans.uri}/workspace/locations/${payload["monLocId"]}/methods/${payload["id"]}`;

  // *** remove attributes not needed by the API
  delete payload["monLocId"];
  delete payload["id"];

  return axios.put(url, payload).then(handleResponse).catch(handleError);
};

export async function deleteCheckInMonitoringPlanConfiguration(id) {
  return axios
    .delete(
      `${config.services.monitorPlans.uri}/workspace/plans/${id}/check-in`
    )
    .then((response) => response.data)
    .catch(handleError);
}
