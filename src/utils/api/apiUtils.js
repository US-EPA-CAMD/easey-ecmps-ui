import log from "loglevel";
import { displayAppError } from "../../additional-functions/app-error";

const successResponses = [200, 201];

export async function handleResponse(response) {
  if (successResponses.includes(response.status) && response.data) {
    return response;
  } else {
    throw new Error("failed");
  }
}

export function handleError(error) {
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
