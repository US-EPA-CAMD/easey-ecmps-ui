import axios from "axios";
import { handleResponse, handleError } from "./apiUtils";
import config from "../../config";
import { secureAxios } from "./easeyAuthApi";

axios.defaults.headers.common = {
  "x-api-key": config.app.apiKey,
};

export async function getReport(
  reportCode,
  facilityId,
  monitorPlanId,
  testId,
  isBatchView
) {
  let workspace = "";
  const test = testId ? `&testId=${testId}` : "";
  const facility = facilityId ? `&facilityId=${facilityId}` : "";
  const monitorPlan = monitorPlanId ? `&monitorPlanId=${monitorPlanId}` : "";
  const batchView =
    isBatchView && isBatchView === "true" ? `&batchView=true` : "";

  if (window.location.href.indexOf("workspace") > -1) {
    workspace = "&workspace=true";
  }

  return axios
    .get(
      `${config.services.camd.uri}/reports?reportCode=${reportCode}${facility}${monitorPlan}${test}${batchView}${workspace}`
    )
    .then(handleResponse)
    .catch(handleError);
}

export async function submitData(payload) {
  return secureAxios({
    method: "POST",
    url: `${config.services.camd.uri}/submit`,
    data: payload,
  });
}
