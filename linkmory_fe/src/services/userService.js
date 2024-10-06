import http from "./httpService";
import config from "../config.json"

function setUserData(data, m_id) {
    const endpoint = config.bUrl + "/user/create/";
    return http.post(endpoint, data, {params: {id: m_id}})
    .catch(res => {
        if((res.response.status !== 200) && (res.response.data.error !== undefined)){
            alert(res.response.data.error);
        }
    });
}

export function getUserData(m_id) {
    const endpoint = config.bUrl + "/user/info/";
    return http.post(endpoint, data, {params: {id: m_id}})
    .catch(res => {
        if((res.response.status !== 200) && (res.response.data.error !== undefined)){
            alert(res.response.data.error);
        }
    });
}

export default setUserData;
