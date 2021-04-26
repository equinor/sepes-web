/* eslint-disable consistent-return */
import { InteractionRequiredAuthError } from '@azure/msal-browser';
import { myMSALObj } from './AuthConfig';
import { StudyObj } from '../components/common/interfaces';
import axios from 'axios';
import _ from 'lodash';
import * as notify from '../components/common/notify';

const scope = process.env.REACT_APP_SEPES_CLIENTID + '/' + process.env.REACT_APP_SEPES_BASIC_SCOPE;

const request = { scopes: [scope] };

export const SignInSilentRedirect = async () => {
    const accounts = myMSALObj.getAllAccounts();

    if (accounts.length) {
        const srequest = {
            scopes: [scope],
            loginHint: accounts[0] ? accounts[0].username : '',
            account: accounts[0],
        };
        try {
            console.log('acquireTokenSilent');
            await myMSALObj.acquireTokenSilent(srequest).then((tokenResponse) => {
                console.log('acquireTokenSilent storing access tokens');

                sessionStorage.setItem('accessToken', tokenResponse.accessToken);
                // const anyObj: any = tokenResponse.idTokenClaims;
                // sessionStorage.setItem('role', anyObj.roles);

                if (tokenResponse.account) {
                    console.log('acquireTokenSilent setting username', tokenResponse.account);
                    sessionStorage.setItem('userName', tokenResponse.account.username);
                }
            });
        } catch (error) {
            console.log('acquireTokenSilent error', error);
            if (error instanceof InteractionRequiredAuthError) {
                await myMSALObj.acquireTokenRedirect({ scopes: [scope] });
            }
        }
    } else {
        try {
            console.log('acquireTokenRedirect');
            const response = await myMSALObj.acquireTokenRedirect(request);
            console.log(response);
        } catch (error) {
            console.log('acquireTokenRedirect error', error);
            console.warn(error);
        }
    }
};

myMSALObj
    .handleRedirectPromise()
    .then((tokenResponse) => {
        console.log('handleRedirectPromise');
        if (tokenResponse !== null) {
            console.log('handleRedirectPromise tokenresponse', tokenResponse);
            sessionStorage.setItem('accessToken', tokenResponse.accessToken);
            // const anyObj: any = tokenResponse.idTokenClaims;
            //sessionStorage.setItem('role', anyObj.roles);

            if (tokenResponse.account) {
                console.log('handleRedirectPromise setting username', tokenResponse.account);
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
        console.log('makeHeaders, cypress token');
        accessTokenToUse = cyToken;
    } else if (accessTokenFromSession) {
        console.log('makeHeaders, normal token');
        accessTokenToUse = accessTokenFromSession;
    }
    else {
        console.log('makeHeaders, no token found');
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
                notify.show('danger', response.status, response);
            }

            return await JSON.parse((await response.text()) ?? {});
        };

        const performRequest = async () => {
            try {

                let response = await fetch(process.env.REACT_APP_SEPES_BASE_API_URL + url, options);

                if (!response.ok && response.status === 401) {
                    //Unauthorized, need to re-authorize. Only try this once
                    await SignInSilentRedirect();
                    response = await fetch(process.env.REACT_APP_SEPES_BASE_API_URL + url, options);
                }

                return resolve(await processAuthorizedResponse(response));

            } catch (error) {
                return resolve(error);
            }
        };

        console.log('apiRequestInternal');
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

        console.log('apiRequestWithToken');
        performRequest();
    });
};

export const createOrUpdateStudyRequest = async (study: StudyObj, imageUrl: string, url: any, method: string) => {
    return new Promise((resolve) => {

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

    if (accounts.length && accounts.length == 1) {

        const logoutRequest = {
            account: accounts[0],
        };

        myMSALObj.logoutRedirect(logoutRequest as any);
    }
};