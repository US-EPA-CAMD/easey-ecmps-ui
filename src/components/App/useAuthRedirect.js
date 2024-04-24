import {useEffect} from 'react';
import {validateAuthRedirect} from "../../utils/api/easeyAuthApi";
import jwt_decode from 'jwt-decode';
import config from "../../config";

const useAuthRedirect = (queryParams) => {
  useEffect(() => {
    const validateRedirectUri = async () => {
      const urlParams = new URLSearchParams(queryParams);
      const token = urlParams.get('token');
      const state = urlParams.get('state');
      const error = urlParams.get('error');

      if (token || error) {
        if (token && state) {
          // Decode the ID token to extract the nonce
          const decodedToken = jwt_decode(token);
          const idTokenNonce = decodedToken.nonce; // Ensure your ID token actually includes the nonce

          // Validate and parse the state
          try {
            const { nonce: stateNonce } = await validateAndParseState(state);
            if (idTokenNonce !== stateNonce) {
              throw new Error("Nonce mismatch");
            }
          } catch (e) {
            console.error("State validation failed:", e);
            // Handle state validation error
          }
        }

        // Validate the authentication redirect response
        await validateAuthRedirect({userId: token, error})
          .then((response) => {
            if (response && response.error) {
              throw response.error;
            }
            // Process successful authentication here
          }).catch((error) => {
            // Handle error from your backend
            console.error("Authentication validation error:", error);
          });
      }
    };

    validateRedirectUri();
  }, [queryParams]);
};

export default useAuthRedirect;

// Function to validate and parse the state
async function validateAndParseState(state) {
  const [nonce, timestamp, signature] = state.split('.');
  // Here, recreate the signed data and verify the signature as done in createState
  const encoder = new TextEncoder();
  const dataToSign = encoder.encode(`${nonce}|${timestamp}`);
  const secretKey = encoder.encode(config.app.oidcAuthStateHmacSecretKey);

  const cryptoKey = await window.crypto.subtle.importKey(
    "raw",
    secretKey,
    { name: "HMAC", hash: { name: "SHA-256" } },
    false,
    ["verify"]
  );

  // Convert hex string signature back to ArrayBuffer for verification
  const signatureBuffer = new Uint8Array(signature.match(/[\da-f]{2}/gi).map(byte => parseInt(byte, 16)));

  const isValid = await window.crypto.subtle.verify(
    "HMAC",
    cryptoKey,
    signatureBuffer,
    dataToSign
  );

  if (!isValid) {
    throw new Error('Invalid state signature');
  }

  return { nonce, timestamp };  // Return parsed values
}