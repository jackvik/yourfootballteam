import axios from "axios";
export const getData = (url,responseCallback,exceptionCallback) => {
    let headers = { 'X-Auth-Token': 'c56a2a8e43ba4f8f90fe0ffad0501ee0'};

    axios.get(url, {headers}).then(response => {
        responseCallback(response.data);
    }).catch(error => {
        exceptionCallback(error);
    });
};