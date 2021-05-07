import axios from "axios";
import config from "../../config";

export async function authenticate(data_payload) {
    try {
        return await axios({
            method: 'POST',
            url: `${config.services.authApi.uri}/authentication/authenticate`,
            data: data_payload
        }).then(data_response => {
            const { data } = data_response;
            sessionStorage.setItem('cdx_user', JSON.stringify(data));
            window.location.reload();
        })
        .catch(e => {
            throw e;
        });
    } catch (e) {
        return {
            success: false,
            message: e.response.data.message,
            statusCode: e.response.data.statusCode,
            error: e.response.data,
        };
    }
}
