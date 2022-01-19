/* eslint-disable consistent-return, import/no-unresolved */
import { InteractionRequiredAuthError } from '@azure/msal-browser';
import { myMSALObj } from './AuthConfig';
import { StudyObj } from '../components/common/interfaces';
import axios from 'axios';
import * as notify from '../components/common/notify';

const scope = process.env.REACT_APP_SEPES_CLIENTID + '/' + process.env.REACT_APP_SEPES_BASIC_SCOPE;

const request = { scopes: [scope] };

export const SignInSilentRedirect = async () => {
    const accounts = myMSALObj.getAllAccounts();

    if (accounts.length) {
        const srequest = {
            scopes: [scope],
            loginHint: accounts[0] ? accounts[0].username : '',
            account: accounts[0]
        };
        try {
            await myMSALObj.acquireTokenSilent(srequest).then((tokenResponse) => {
                sessionStorage.setItem('accessToken', tokenResponse.accessToken);

                if (tokenResponse.account) {
                    sessionStorage.setItem('userName', tokenResponse.account.username);
                }
            });
        } catch (error) {
            console.warn('acquireTokenSilent error', error);
            if (error instanceof InteractionRequiredAuthError) {
                await myMSALObj.acquireTokenRedirect({ scopes: [scope] });
            }
        }
    } else {
        try {
            await myMSALObj.acquireTokenRedirect(request);
        } catch (error) {
            console.warn(error);
        }
    }
};

myMSALObj
    .handleRedirectPromise()
    .then((tokenResponse) => {
        if (tokenResponse !== null) {
            sessionStorage.setItem('accessToken', tokenResponse.accessToken);
            // const anyObj: any = tokenResponse.idTokenClaims;
            //sessionStorage.setItem('role', anyObj.roles);

            if (tokenResponse.account) {
                sessionStorage.setItem('userName', tokenResponse.account.username);
            }
            window.location.reload();
        }
    })
    .catch((error) => {
        console.warn(error);
    });

const makeHeaders = (skipSettingContentType?: boolean, skipSettingAccept?: boolean) => {
    const headers = new Headers();

    let accessTokenToUse: string | null;

    const cyToken = localStorage.getItem('cyToken');
    const accessTokenFromSession: string | null = sessionStorage.getItem('accessToken');

    if (cyToken) {
        accessTokenToUse = cyToken;
    } else if (accessTokenFromSession) {
        accessTokenToUse = accessTokenFromSession;
    } else {
        accessTokenToUse = null;
    }

    const bearer = `Bearer ${accessTokenToUse}`;
    headers.append('Authorization', bearer);

    if (!skipSettingContentType) {
        headers.append('Content-Type', 'application/json');
    }

    if (!skipSettingAccept) {
        headers.append('Accept', 'application/json');
    }

    return headers;
};

const apiRequestInternal = async (url: string, headers: Headers, options: any) => {
    return new Promise((resolve) => {
        const processAuthorizedResponse = async (response) => {
            if (!response.ok) {
                const res = JSON.parse((await response.text()) ?? {});
                if (!res.errors) {
                    notify.show(res.critical ? 'danger' : 'warning', response.status, res.message, res.requestId);
                } else {
                    notify.show('danger', response.status, res.title, res.traceId);
                }
            }
            if (response.status === 204) {
                return {};
            }
            return JSON.parse((await response.text()) ?? {});
        };

        const performRequest = async () => {
            try {
                // let response = await fetch(process.env.REACT_APP_SEPES_BASE_API_URL + url, options);
                // let response = await fetch(window.BASE_API_URI + url, options);
                const apiUrl =
                    process.env.REACT_APP_SEPES_LOCAL === 'test' ? 'http://localhost:44371/' : window.BASE_API_URI;

                let response = await fetch(apiUrl + url, options);

                if (!response.ok && response.status === 401) {
                    //Unauthorized, need to re-authorize. Only try this once
                    await SignInSilentRedirect();
                    headers.set('Authorization', `Bearer ${sessionStorage.getItem('accessToken')}`);
                    apiRequestInternal(url, headers, options);
                    // response = await fetch(process.env.REACT_APP_SEPES_BASE_API_URL + url, options);
                    // response = await fetch(window.BASE_API_URI + url, options);
                    response = await fetch(apiUrl + url, options);
                }

                return resolve(await processAuthorizedResponse(response));
            } catch (error) {
                return resolve(error);
            }
        };

        performRequest();
    });
};

export const apiRequestWithToken = async (url: string, method: string, body?: any, signal?: any) => {
    return new Promise((resolve) => {
        const performRequest = async () => {
            const headers = makeHeaders();

            const options = {
                method,
                headers,
                body: JSON.stringify(body),
                signal
            };

            return resolve(await apiRequestInternal(url, headers, options));
        };

        performRequest();
    });
};

export const createOrUpdateStudyRequest = async (study: StudyObj, imageUrl: string, url: any, method: string) => {
    return new Promise((resolve) => {
        const createStudyRequestBody = async (studyInner: StudyObj, blobUrl: string) => {
            const studyRequestPart = {
                name: studyInner.name,
                description: studyInner.description,
                wbsCode: studyInner.wbsCode,
                vendor: studyInner.vendor,
                restricted: studyInner.restricted,
                deleteLogo: !studyInner.logoUrl && !blobUrl
            };

            const formData = new FormData();
            formData.append('study', JSON.stringify(studyRequestPart));

            if (blobUrl && blobUrl !== studyInner.logoUrl) {
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

        const performRequest = async () => {
            const headers = makeHeaders(true);

            const requestBody = await createStudyRequestBody(study, imageUrl);

            const options = {
                method,
                headers,
                body: requestBody
            };

            return resolve(await apiRequestInternal(url, headers, options));
        };

        performRequest();
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

// eslint-disable-next-line no-shadow
export const signOut = () => {
    const accounts = myMSALObj.getAllAccounts();

    if (accounts.length && accounts.length === 1) {
        const logoutRequest = {
            account: accounts[0]
        };

        myMSALObj.logoutRedirect(logoutRequest as any);
    }
};
