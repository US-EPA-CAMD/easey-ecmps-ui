import config from "../../config";
import { handleError, handleResponse } from "./apiUtils";
import { secureAxios } from "./easeyAuthApi";

const url = `${config.services.camd.uri}/error-suppressions`;

export const getErrorSuppressionRecords = ({
  checkType,
  checkNumber,
  checkResult,
  facility,
  locations,
  active,
  reason,
  addDateAfter,
  addDateBefore,
}) => {
  const pipeDelimitedLocations =
    locations && locations.length > 0 ? locations.join("|") : undefined;
  // NOTE: This is temporary until we change the active/inactive checkbox into a dropdown
  if (!active) active = undefined;
  return secureAxios({
    url: url,
    params: {
      checkTypeCode: checkType,
      checkNumber,
      checkResult,
      active,
      facilityId: facility,
      locations: pipeDelimitedLocations,
      reasonCode: reason,
      beginDateHrQtr: addDateAfter,
      endDateHrQtr: addDateBefore,
    },
  })
    .then(handleResponse)
    .catch(handleError);
};

export const deactivateErrorSuppression = async (id) => {
  try {
    return handleResponse(
      await secureAxios({
        method: "PUT",
        url: `${url}/${id}`,
      })
    );
  } catch (error) {
    return handleError(error);
  }
};
