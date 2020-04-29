import axios from "./../../config/axios";

export default (url, method, body, token) => {
    const options = {
        url,
        method,
        data: method !== "GET" ? body : null,
    };

    if (token) {
        options.headers = { authorization: token }
    }

    return axios.request(options)
};