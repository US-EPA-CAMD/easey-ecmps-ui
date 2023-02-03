import axios from "axios";
import config from "../../config";
import { handleError, handleResponse, handleImportError } from "./apiUtils";
import { secureAxios } from "./easeyAuthApi";
import download from "downloadjs";

axios.defaults.headers.common = {
    "x-api-key": config.app.apiKey,
};

const url = `${config.services.camd.uri}/error-suppressions`;

export const getErrorSuppressionRecords = (checkTypeCode, checkNumber, checkResult)=>{

    return axios.get(url, {params:{checkTypeCode, checkNumber, checkResult}})
                .then(handleResponse).catch(handleError)
}