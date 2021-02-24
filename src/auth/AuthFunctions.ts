import { myMSALObj } from './AuthConfig';
import { StudyObj } from '../components/common/interfaces';
import axios from 'axios';
import _ from 'lodash';

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

const makeHeaders = (accessToken: any, acceptHeader?: string) => {
    const headers = new Headers();
    const bearer = `Bearer ${accessToken}`;
    headers.append('Authorization', bearer);
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', acceptHeader ? acceptHeader : 'application/json');
    return headers;
};

export const apiRequestWithToken = async (url: string, method: string, body?: any, signal?: any) => {
    return new Promise((resolve, reject) => {
        const post = async (accessToken) => {
            try {
                const headers = makeHeaders(accessToken);
                const options = {
                    method,
                    headers: headers,
                    body: JSON.stringify(body),
                    signal
                };
                return await fetch(process.env.REACT_APP_SEPES_BASE_API_URL + url, options)
                    .then((response) => {
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
                    myMSALObj.acquireTokenRedirect(loginRequest);
                    console.log(error);
                });
        }
    });
};

export const apiRequestPermissionsWithToken = async (url: string, method: string, body?: any) => {
    return new Promise((resolve, reject) => {
        const post = async (accessToken) => {
            try {
                const headers = makeHeaders(accessToken);
                const options = {
                    method,
                    headers: headers,
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

const makeBlobFromUrl = async (blobUrl: string) => {
    const axiosWithBlobUrl = axios.create({
        baseURL: blobUrl,
        timeout: 1000
    });
    const response = await axiosWithBlobUrl.get('', {
        responseType: 'blob'
    });
    const imageFile = new File([response.data], 'image.' + response.headers['content-type'].split('/')[1]);
    const formData = new FormData();
    formData.append('image', imageFile);
    return formData;
};
// Posts the image separately before the piece is posted to the API, returns URL of the uploaded file
export const postBlob = async (imageUrl: string, studyId: string) => {
    const imageFile = await makeBlobFromUrl(imageUrl);
    return new Promise((resolve, reject) => {
        myMSALObj
            .acquireTokenSilent(loginRequest)
            .then((tokenResponse: any) => {
                if (tokenResponse.accessToken) {
                    const headers = new Headers();
                    const bearer = `Bearer ${tokenResponse.accessToken}`;

                    headers.append('Authorization', bearer);
                    const options = {
                        method: 'PUT',
                        headers: headers,
                        body: imageFile
                    };

                    return fetch(process.env.REACT_APP_SEPES_BASE_API_URL + 'api/studies/' + studyId + '/logo', options)
                        .then((response) => response.json())
                        .then((responseData) => {
                            return resolve(responseData);
                        })
                        .catch((error) => console.log(error));
                }

                // Callback code here
            })
            .catch((error: string) => {
                console.log(error);
            });
    });
};

export const postFile = async (url, files: any) => {
    return new Promise((resolve, reject) => {
        myMSALObj
            .acquireTokenSilent(loginRequest)
            .then((tokenResponse: any) => {
                if (tokenResponse.accessToken) {
                    const headers = new Headers();
                    const bearer = `Bearer ${tokenResponse.accessToken}`;
                    headers.append('Authorization', bearer);

                    var xhr = new XMLHttpRequest();
                    xhr.upload.addEventListener(
                        'progress',
                        (evt) => {
                            if (evt.lengthComputable) {
                                var percentComplete = evt.loaded / evt.total;
                                console.log(percentComplete);
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

export const postputStudy = async (study: StudyObj, url: any, method: string, imageUrl: string) => {
    let newStudyWithBlob: StudyObj = {
        ...study
    };
    if (imageUrl) {
        const fileUrl = 'process.env.REACT_APP_BLOB_BASE_URL' + (await postBlob(imageUrl, study.id));

        newStudyWithBlob = {
            ...study,
            logoUrl: fileUrl
        };
        console.log('Fileurl:');
        console.log(fileUrl);
    }

    return new Promise((resolve, reject) => {
        const post = async (accessToken) => {
            console.log('post request made to Graph API at: ' + new Date().toString());
            try {
                const headers = makeHeaders(accessToken);
                const options = {
                    method,
                    headers: headers,
                    body: JSON.stringify(newStudyWithBlob)
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

function authCallback(error: any, response: any) {
    //handle redirect response
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

export function signOut(myMSALObj: any) {
    myMSALObj.logout();
}

export const loginRequest = {
    scopes: [process.env.REACT_APP_SEPES_CLIENTID + '']
};
