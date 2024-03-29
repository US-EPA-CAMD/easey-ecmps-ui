import config from "../../config";
import { handleError, handleResponse,handleImportError } from "./apiUtils";
import { secureAxios } from "./easeyAuthApi";

const url = `${config.services.camd.uri}/admin/error-suppressions`;

export const getErrorSuppressionRecords = ({
  checkType,
  checkNumber,
  checkResult,
  facility,
  locations,
  active,
  reasonCode,
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
      orisCode: facility,
      locations: pipeDelimitedLocations,
      reasonCode,
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

// Just makes GET calls to the passed in url
export const getMdmData = async (path)=>{
    
  if( !path )
    return;
  // uri and the path returns some shared

  const url = `${config.services.mdm.uri}/${path}`;
  try {
    return handleResponse(
      await secureAxios({
        method: "GET",
        url,
      })
    );
  } catch (error) {
    return handleError(error);
  }
}

export const createErrorSuppression = async (payload)=>{
  try{
    return handleResponse(
      await secureAxios({
        method: "POST",
        url,
        data: payload,
      })
    );
  }
  catch(error){
    return handleImportError(error)
  }
}
