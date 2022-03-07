import axios from "axios";
import { handleResponse, handleError } from "./apiUtils";
import config from "../../config";

export const getContent = async (path) => {
  let url = `${config.services.content.uri}${path}`;

  return axios
    .get(url)
    .then(handleResponse)
    .catch((error) => {
      handleError(error);
      throw new Error(error);
    });
};
