import config from "../../config";
import { handleError, handleResponse } from "./apiUtils";
import { secureAxios } from "./easeyAuthApi";

const url = `${config.services.camd.uri}/admin/em-submission-access`;

export const getEmSubmissionRecords = async (orisCode, monitorPlanId, year, quarter, status) => {

  // At least some kind of filtering is required
  if (!orisCode && !monitorPlanId && !year && !quarter && !status)
    return []

  return secureAxios({
    url: url,
    params: {
      facilityId: orisCode,
      monitorPlanId,
      year,
      quarter,
      status,
    },
  })
    .then(handleResponse)
    .catch(handleError);
}

export const openEmSubmissionRecord = async (payload) => {

  return secureAxios({
    method: "POST",
    url: url,
    data: payload,
})
    .then(handleResponse)
    .catch(handleError);
}

export const updateEmSubmissionRecord = async (payload, id) => {

  return secureAxios({
    method: "PUT",
    url: `${url}/${id}`,
    data: payload,
  })
    .then(handleResponse)
    .catch(handleError);
}