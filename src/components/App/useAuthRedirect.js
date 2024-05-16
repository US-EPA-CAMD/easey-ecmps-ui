import {authenticate} from "../../utils/api/easeyAuthApi";

export async function signInUser(message, sessionId) {
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
        console.log("Login successful", response);
      }
    } catch (err) {
      console.error("Error during authentication:", err.message);
      throw err;
    }
  }
}