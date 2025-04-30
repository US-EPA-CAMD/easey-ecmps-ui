import log from "loglevel";
import { displayAppError } from "../../additional-functions/app-error";
import { clientTokenAxios } from "./clientTokenAxios";
import config from "./../../config";

export const successResponses = [200, 201];

export async function handleResponse(response) {
  if (
    successResponses.includes(response.status) &&
    response.data !== null &&
    response.data !== undefined
  ) {
    return response;
  } else {
    throw new Error("failed");
  }
}

export function handleError(error) {
  const errorMessage = parseErrorMessage(error);

  // *** display error only if encountered
  if (errorMessage !== "") {
    displayAppError(errorMessage);
  }
}

export function handleImportError(error, monitoringPlan = false) {
  return parseErrorMessage(error, monitoringPlan);
}

//Clearer field names for user in UI
const replacements = {
  wafDeterminationDate: "WAF Determination Date",
  wafBeginDate: "Begin Date",
  wafBeginHour: "Begin Hour",
  wafMethodCode: "WAF Method",
  wafValue: "WAF Value",
  numberOfTestRuns: "Number of Test Runs",
  numberOfTraversePointsWAF: "Number of Traverse Points WAF",
  numberOfTestPorts: "Number of Test Ports",
  numberOfTraversePointsRef: "Number of Traverse Points Reference",
  ductWidth: "Duct Width",
  ductDepth: "Duct Depth",
  wafEndDate: "End Date",
  wafEndHour: "End Hour"
};

function replaceStringValues(inputString) {
  let outputString = inputString;

  for (const [key, value] of Object.entries(replacements)) {
    const regex = new RegExp(key, 'g'); 
    outputString = outputString.replace(regex, value); 
  }

  return outputString;
}

export function parseErrorMessage(error ,  monitoringPlansApi = false) {
  let errorMessage = "";

  if (error.response) {
    // client received an error response (5xx, 4xx)
    log.error({
      error: error.response.data,
      //requestUrl: error.response.request.responseURL,
      status: error.response.status,
      headers: error.response.headers,
    });
    if(monitoringPlansApi)
    errorMessage = replaceStringValues(error?.response?.data?.message)?.replaceAll(null, ' ');
    else
    errorMessage = error.response.data?.message;
  } else if (error.request) {
    // client never received a response, or request never left
    log.error({ error: error.request });
    errorMessage = "API Communication error";
  } else {
    // anything else
    log.error({ error: error.message });
    errorMessage = error.message;
  }

  return errorMessage;
}

export async function logServerError(errorId, message, stackTrace) {
  const url = config.services.camd.uri + "/logging/error";

  try {
    await clientTokenAxios({
      method: "POST",
      url: url,
      data: {
        errorId,
        message,
        stackTrace,
      },
    });
  } catch (error) {
    handleError(error);
  }
}
