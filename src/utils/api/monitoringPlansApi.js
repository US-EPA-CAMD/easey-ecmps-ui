import axios from "axios";
import { handleResponse, handleError } from "./apiUtils";
import config from "../../config";

export async function getMonitoringPlans(orisCode) {
  return axios
    .get(
      `${config.services.monitorPlans.uri}/monitor-plans/${orisCode}/configurations`
    )
    .then(handleResponse)
    .catch(handleError);
}

export async function getMonitoringMethods(locationId) {
  return axios
    .get(
      `${config.services.monitorPlans.uri}/monitor-locations/${locationId}/methods`
    )
    .then(handleResponse)
    .catch(handleError);
}

export async function getMonitoringMatsMethods(locationId) {
  return (
    axios
      // .get(`${config.services.monitorPlans.uri}/monitor-locations/${locationId}/matsMethods`)
      .get(
        `${config.services.monitorPlans.uri}/monitor-locations/${locationId}/supplemental-methods`
      )
      .then(handleResponse)
      .catch(handleError)
  );
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
  return axios
    .put(
      `${config.services.monitorPlans.uri}/workspace/locations/${payload["monLocId"]}/methods/${payload["id"]}`,
      payload
    )
    .then(handleResponse)
    .catch(handleError);
};
