import {displayAppError} from "../../additional-functions/app-error";
import {authenticate} from "../../utils/api/easeyAuthApi";

export async function signInUser() {
  // Create a URL object from the current location
  const url = new URL(window.location.href);

  // Extract the sessionId from query parameters
  const sessionId = url.searchParams.get('sessionId');
  const message = url.searchParams.get('message');

  if (message) {
    throw new Error(message);
  }

  if (sessionId) {
    try {
      const response = await authenticate({ sessionId });
      if (response && response.error) {
        throw new Error(response.error);
      } else {
        //successful login
      }
    } catch (err) {
      throw err;
    }
  }
}