import log from "loglevel";
import { displayAppError } from "../../additional-functions/app-error";
import { clientTokenAxios } from "./clientTokenAxios";
import config from "./../../config";

export const successResponses = [200, 201];

export async function handleResponse(response) {
  console.log('response from handleResponse', response);
  if (successResponses.includes(response.status) && (response.data !== null && response.data !== undefined)) {
    return response;
  } else {
    console.log('handleResponse failed');
    throw new Error("failed");
  }
}

export async function logServerError(message, metadata = {}) {
  const url = config.services.camd.uri + "/logging/error";

  try {
    await clientTokenAxios({
      method: "POST",
      url: url,
      data: {
        errorMessage: message,
        metadata: metadata,
      },
    });
  } catch (error) {
    handleError(error);
  }
}

export function handleError(error) {
  console.log("this is error", error);
  let errorMessage = "";

  if (error.response) {
    // client received an error response (5xx, 4xx)
    log.error({
      error: error.response.data,
      //requestUrl: error.response.request.responseURL,
      status: error.response.status,
      headers: error.response.headers,
    });
    errorMessage = `${error.response.data.error} ${error.response.data.message}`;
  } else if (error.request) {
    // client never received a response, or request never left
    log.error({ error: error.request });
    errorMessage = "API Communication error";
  } else {
    // anything else
    log.error({ error: error.message });
    errorMessage = error.message;
  }

  // *** display error only if encountered
  if (errorMessage !== "") {
    displayAppError(errorMessage);
  }
}
export function handleImportError(error) {
  if (error.response) {
    // client received an error response (5xx, 4xx)
    log.error({
      error: error.response.data,
      //requestUrl: error.response.request.responseURL,
      status: error.response.status,
      headers: error.response.headers,
    });
  } else if (error.request) {
    // client never received a response, or request never left
    log.error({ error: error.request });
  } else {
    // anything else
    log.error({ error: error.message });
  }

  if (error.response) {
    return error.response.data.message;
  }
}
