export {};
/*
import AdalConfig from '../AdalConfig';
import AuthContext from '../Auth';
import config from '../Config';
import { LogRequest } from '../components/tie-components/Logging';
import _ from 'lodash';


const queryFromArray = params => {
    let query = '';
    params = params || [];
    if (params.length > 0) query = '?';
    let firstSet = true;
    for (var i = 0; i < params.length; i++) {
        if (params[i].value !== null && params[i].value !== undefined) {
            if (i > 0 && !firstSet) query += '&';
            firstSet = false;
            query += params[i].name + '=' + encodeURIComponent(params[i].value);
        }
    }

    return query;
};

const encodeValue = value => {
    if (
        value &&
        value.length &&
        value.length > 0 &&
        value[0].value !== undefined
    ) {
        return encodeURIComponent(
            _.without(
                value.map(i => i.value),
                null
            ).join(',')
        );
    }

    return encodeURIComponent(value);
};
const queryFromObject = o => {
    let query = '';
    let props = Object.getOwnPropertyNames(o);

    if (props.length > 0) query = '?';

    let firstSet = true;

    for (var i = 0; i < props.length; i++) {
        if (o[props[i]] !== null && o[props[i]] !== undefined) {
            if (i > 0 && !firstSet) query += '&';
            firstSet = false;
            query += props[i] + '=' + encodeValue(o[props[i]]);
        }
    }

    return query;
};

const cyToken = localStorage.getItem("cyToken");

export const apiRequest = async (url, params, acceptHeader) => {
    let query = '';
    params = params || [];
    if (Array.isArray(params)) {
        query = queryFromArray(params);
    } else {
        query = queryFromObject(params);
    }
    if (params.length > 0) query = '?';
    let firstSet = true;
    for (var i = 0; i < params.length; i++) {
        if (params[i].value !== null) {
            if (i > 0 && !firstSet) query += '&';
            firstSet = false;
            query += params[i].name + '=' + encodeURIComponent(params[i].value);
        }
    }
    return new Promise(function (resolve, reject) {
        //Use cypress token if it exists in local storage
        //Token is validated in back-end in the request, so no need to validate it again in front end
        if (cyToken && cyToken.length > 0){
            getApiRequest(url, query, acceptHeader, cyToken, resolve);
        }
        //Normal user login
        else {
        AuthContext.acquireToken(
            AdalConfig.endpoints.api,
            (message, token, msg) => {
                if (!!token) {
                    LogRequest(`${config.apiBase}${url}${query}`);
                    getApiRequest(url, query, acceptHeader, token, resolve);
                } else {
                    reject(); 
                }
            });
        }
    });
};

const getApiRequest = (url, query, acceptHeader, token, resolve) => {
    return fetch(`${config.apiBase}${url}${query}`, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
            Accept: acceptHeader ? acceptHeader : 'application/json'
        }
    })
    .then(response => {
        if (response.error) return response;
        const contentType = response.headers.get('content-type');
        if (
            contentType &&
            contentType.indexOf('application/json') !== -1
        ) {
            if (response.status !== 200) {
                if (response.status === 404)
                    return {
                        error: `Resource ${config.apiBase}${url}${query} was not found`
                    };
                return response
                    .json()
                    .then(data => (data.error ? data : { error: data }));
            } else return response.json();
        } else if (
            contentType &&
            contentType.indexOf(acceptHeader) !== -1
        ) {
            return response.blob().then(blob => {
                var newBlob = new Blob([blob], { type: acceptHeader });
                let disposition = response.headers.get('content-disposition');
                let filename = '';
                if (disposition && disposition.indexOf('attachment') !== -1) {
                    var filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
                    var matches = filenameRegex.exec(disposition);
                    if (matches != null && matches[1]) {
                        filename = matches[1].replace(/['"]/g, '');
                    }
                }
                const data = window.URL.createObjectURL(newBlob);
                var link = document.createElement('a');
                link.href = data;
                link.download = filename;
                link.click();
                setTimeout(function () {
                    window.URL.revokeObjectURL(data);
                }, 100);
            });
        } else {
            return response.text().then(data => {
                if (response.status === 404)
                    return {
                        error: `Resource ${config.apiBase}${url}${query} was not found`
                    };
                return {
                    error:
                        response.status +
                        ': ' +
                        (data ? data : response.statusText)
                };
            });
        }
    })
    .then(data => {
        return resolve(data);
    })
    .catch(error => {
        return resolve({ error: error });
    });  
};
*/