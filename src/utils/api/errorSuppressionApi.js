import axios from "axios";
import config from "../../config";
import { handleError, handleResponse } from "./apiUtils";
import { secureAxios } from "./easeyAuthApi";

axios.defaults.headers.common = {
    "x-api-key": config.app.apiKey,
};

const url = `${config.services.camd.uri}/error-suppressions`;

export const getErrorSuppressionRecords = (checkTypeCode, checkNumber, checkResult)=>{

    return axios.get(url, {params:{checkTypeCode, checkNumber, checkResult}})
                .then(handleResponse).catch(handleError)
}