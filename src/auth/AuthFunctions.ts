/* eslint-disable consistent-return */
import { myMSALObj } from './AuthConfig';
import { StudyObj } from '../components/common/interfaces';
import axios from 'axios';
import _ from 'lodash';
import * as notify from '../components/common/notify';

export const acquireTokenSilent = async () => {
    myMSALObj
        .acquireTokenSilent(loginRequest)
        .then((tokenResponse: any) => {
            if (!tokenResponse.accessToken) {
                signInRedirect();
            } else {
                return tokenResponse;
            }
        })
        .catch((error: string) => {
            console.log('acquireTokenSilent err', error);
        });
};

const cyToken = localStorage.getItem('cyToken');

const makeHeaders = (accessToken: any, acceptHeader?: string, skipSettingContentType?: boolean) => {
    const headers = new Headers();
    const bearer = `Bearer ${accessToken}`;
    headers.append('Authorization', bearer);

    headers.append('Accept', acceptHeader || 'application/json');

    if (!skipSettingContentType) {
        headers.append('Content-Type', 'application/json');
    }
    return headers;
};

export const apiRequestWithToken = async (url: string, method: string, body?: any, signal?: any) => {
    return new Promise((resolve) => {
        const post = async (accessToken) => {
            try {
                const headers = makeHeaders(accessToken);
                const options = {
                    method,
                    headers,
                    body: JSON.stringify(body),
                    signal
                };
                /*
                const response = await fetch(process.env.REACT_APP_SEPES_BASE_API_URL + url, options);

                if (!response.ok) {
                    notify.show('danger', response.status, response);
                }
                return resolve(await JSON.parse((await response.text()) ?? {}));
*/

                return await fetch(process.env.REACT_APP_SEPES_BASE_API_URL + url, options)
                    .then((response) => {
                        if (!response.ok) {
                            notify.show('danger', response.status, response);
                        }
                        return response.text();
                    })
                    .then((responseData) => {
                        return resolve(responseData ? JSON.parse(responseData) : {});
                    })
                    .catch((error) => console.log(error));
            } catch (error) {
                return resolve(error);
            }
        };

        if (cyToken) {
            post(cyToken);
        } else {
            myMSALObj
                .acquireTokenSilent(loginRequest)
                .then((tokenResponse: any) => {
                    if (!tokenResponse.accessToken) {
                        signInRedirect();
                    }
                    post(tokenResponse.accessToken);
                })
                .catch((error: string) => {
                    //myMSALObj.acquireTokenRedirect(loginRequest);
                    console.log(error);
                });
        }
    });
};

export const apiRequestPermissionsWithToken = async (url: string, method: string, body?: any) => {
    return new Promise((resolve) => {
        const post = async (accessToken) => {
            try {
                const headers = makeHeaders(accessToken);
                const options = {
                    method,
                    headers,
                    body: JSON.stringify(body)
                };
                return await fetch(process.env.REACT_APP_SEPES_BASE_API_URL + url, options)
                    .then((response) => {
                        return response.text();
                    })
                    .then((responseData) => {
                        return resolve(responseData ? JSON.parse(responseData) : {});
                    });
            } catch (error) {
                return resolve(error);
            }
        };

        if (cyToken) {
            post(cyToken);
        } else {
            myMSALObj
                .acquireTokenSilent(loginRequest)
                .then((tokenResponse: any) => {
                    if (!tokenResponse.accessToken) {
                        signInRedirect();
                    }
                    post(tokenResponse.accessToken);
                })
                .catch((error: string) => {
                    myMSALObj.acquireTokenRedirect(loginRequest);
                    console.log(error);
                });
        }
    });
};

export const makeFileBlobFromUrl = async (blobUrl: any, fileName: string) => {
    const axiosWithBlobUrl = axios.create({
        baseURL: blobUrl
    });
    const response = await axiosWithBlobUrl.get('', {
        responseType: 'blob'
    });

    return new File([response.data], fileName);
};

export const postFile = async (url, files: any) => {
    return new Promise(() => {
        myMSALObj
            .acquireTokenSilent(loginRequest)
            .then((tokenResponse: any) => {
                if (tokenResponse.accessToken) {
                    const headers = new Headers();
                    const bearer = `Bearer ${tokenResponse.accessToken}`;
                    headers.append('Authorization', bearer);

                    const xhr = new XMLHttpRequest();
                    xhr.upload.addEventListener(
                        'progress',
                        (evt) => {
                            if (evt.lengthComputable) {
                                const percentComplete = evt.loaded / evt.total;
                                return percentComplete;
                            }
                        },
                        false
                    );
                    xhr.open('POST', `${process.env.REACT_APP_SEPES_BASE_API_URL}${url}`);
                    xhr.setRequestHeader('Authorization', bearer);
                    xhr.send(files);

                    xhr.onreadystatechange = function () {
                        if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
                            return this.response;
                        }
                    };
                }

                // Callback code here
            })
            .catch((error: string) => {
                console.log(error);
            });
    });
};

export const postputStudy = async (study: StudyObj, imageUrl: string, url: any, method: string) => {
    const requestBody = await createStudyRequestBody(study, imageUrl);

    return new Promise((resolve) => {
        const post = async (accessToken) => {
            try {
                const headers = makeHeaders(accessToken, undefined, true);
                const options = {
                    method,
                    headers,
                    body: requestBody
                };
                return fetch(process.env.REACT_APP_SEPES_BASE_API_URL + url, options)
                    .then((response) => response.json())
                    .then((responseData) => {
                        return resolve(responseData);
                    })
                    .catch((error) => console.log(error));
            } catch (error) {
                return resolve(error);
            }
        };

        if (cyToken) {
            post(cyToken);
        } else {
            myMSALObj
                .acquireTokenSilent(loginRequest)
                .then((tokenResponse: any) => {
                    if (!tokenResponse.accessToken) {
                        signInRedirect();
                    }
                    post(tokenResponse.accessToken);
                })
                .catch((error: string) => {
                    console.log(error);
                });
        }
    });
};

const createStudyRequestBody = async (study: StudyObj, blobUrl: string) => {
    const studyRequestPart = {
        name: study.name,
        description: study.description,
        wbsCode: study.wbsCode,
        vendor: study.vendor,
        restricted: study.restricted,
        deleteLogo: !study.logoUrl && !blobUrl
    };

    const formData = new FormData();
    formData.append('study', JSON.stringify(studyRequestPart));

    if (blobUrl && blobUrl !== study.logoUrl) {
        const axiosWithBlobUrl = axios.create({
            baseURL: blobUrl,
            timeout: 1000
        });

        const response = await axiosWithBlobUrl.get('', {
            responseType: 'blob'
        });

        const imageFile = new File([response.data], 'image.' + response.headers['content-type'].split('/')[1]);

        formData.append('image', imageFile);
    }

    return formData;
};

function authCallback(error: any, response: any) {
    // handle redirect response
    if (response) {
        console.log('id_token acquired at: ' + new Date().toString());
    } else {
        console.log('err', error);
    }
}

export function signInRedirect() {
    myMSALObj.handleRedirectCallback(authCallback);
    myMSALObj.loginRedirect(loginRequest);
}
/*
export function signOut(myMSALObj: any) {
    myMSALObj.logout();
}
*/
export const loginRequest = {
    scopes: [process.env.REACT_APP_SEPES_CLIENTID + '']
};
