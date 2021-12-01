import log from "loglevel";

const successResponses = [200, 201];

export async function handleResponse(response) {
  if (successResponses.includes(response.status)) {
    return response;
  } else {
    throw new Error("failed");
  }
}

export function handleError(error) {
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
}
