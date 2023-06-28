import config from "../../config";
import { handleError, handleResponse } from "./apiUtils";
import { secureAxios } from "./easeyAuthApi";

const url = `${config.services.camd.uri}/admin/em-submission-access`;

export const getEmSubmissionRecords = (orisCode, monitorPlanId, year, quarter, status)=>{

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