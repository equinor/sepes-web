/* eslint-disable consistent-return */
import { InteractionRequiredAuthError } from '@azure/msal-browser';
import { myMSALObj } from './AuthConfig';
import { StudyObj } from '../components/common/interfaces';
import axios from 'axios';
import _ from 'lodash';
import * as notify from '../components/common/notify';
import { access } from 'fs';

const scope = process.env.REACT_APP_SEPES_CLIENTID + '/' + process.env.REACT_APP_SEPES_BASIC_SCOPE;

const request = { scopes: [scope]};

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

const makeHeaders = (acceptHeader?: string, skipSettingContentType?: boolean) => {
    const headers = new Headers();

    let accessTokenToUse : string | null;

    const cyToken = localStorage.getItem('cyToken');
    const accessTokenFromSession: string | null = sessionStorage.getItem('accessToken');

    if (cyToken) {
       console.log('makeHeaders, cypress token')
       accessTokenToUse = cyToken;
    } else if(accessTokenFromSession) {  
        console.log('makeHeaders, normal token')          
        accessTokenToUse = accessTokenFromSession;
    }
    else{
        console.log('makeHeaders, no token found')          
        accessTokenToUse = null;
    }

    const bearer = `Bearer ${accessTokenToUse}`;
    headers.append('Authorization', bearer);

    headers.append('Accept', acceptHeader || 'application/json');

    if (!skipSettingContentType) {
        headers.append('Content-Type', 'application/json');
    }
    return headers;
};

const apiRequestInternal = async (url: string, headers: Headers, options: any) => {
    return new Promise((resolve) => {

        const processAuthorizedResponse = async (response) => {

            if (!response.ok) 
            {            
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

        console.log('apiRequestInternal')
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
              
                return resolve(await apiRequestInternal(url, headers, options)  );       
          
        };       

        console.log('apiRequestWithToken')
        performRequest();
    });

};

// export const apiRequestWithToken = async (url: string, method: string, body?: any, signal?: any) => {
//     return new Promise((resolve) => {

//         const processAuthorizedResponse = async (response) => {

//             if (!response.ok) 
//             {            
//                 notify.show('danger', response.status, response);
//             }            

//             return await JSON.parse((await response.text()) ?? {});
//         };

//         const performRequest = async (accessToken) => {
//             try {
//                 const headers = makeHeaders(accessToken);
                
//                 const options = {
//                     method,
//                     headers,
//                     body: JSON.stringify(body),
//                     signal
//                 };
                
//                 let response = await fetch(process.env.REACT_APP_SEPES_BASE_API_URL + url, options);

//                 if (!response.ok && response.status === 401) {
//                     //Unauthorized, need to re-authorize. Only try this once
//                     await SignInSilentRedirect();
//                     response = await fetch(process.env.REACT_APP_SEPES_BASE_API_URL + url, options);
//                 }
                
//                 return resolve(await processAuthorizedResponse(response));
           
//             } catch (error) {
//                 return resolve(error);
//             }
//         };

//         const cyToken = localStorage.getItem('cyToken');

//         if (cyToken) {
//            console.log('apiRequestWithToken cypress')
//             performRequest(cyToken);
//         } else {          
//             const accessToken: string | null = sessionStorage.getItem('accessToken'); 
//             console.log('apiRequestWithToken normal')                      
//             performRequest(accessToken);
//         }
//     });

// };

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
    console.log('postFile 3');
    return new Promise(() => {
        console.log('postFile 3 inside promise');
        // myMSALObj
        //     .acquireTokenSilent(loginRequest)
        //     .then((tokenResponse: any) => {
        //         if (tokenResponse.accessToken) {
        //             const headers = new Headers();
        //             const bearer = `Bearer ${tokenResponse.accessToken}`;
        //             headers.append('Authorization', bearer);

        //             const xhr = new XMLHttpRequest();
        //             xhr.upload.addEventListener(
        //                 'progress',
        //                 (evt) => {
        //                     if (evt.lengthComputable) {
        //                         const percentComplete = evt.loaded / evt.total;
        //                         return percentComplete;
        //                     }
        //                 },
        //                 false
        //             );
        //             xhr.open('POST', `${process.env.REACT_APP_SEPES_BASE_API_URL}${url}`);
        //             xhr.setRequestHeader('Authorization', bearer);
        //             xhr.send(files);

        //             xhr.onreadystatechange = function () {
        //                 if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
        //                     return this.response;
        //                 }
        //             };
        //         }

        //         // Callback code here
        //     })
        //     .catch((error: string) => {
        //         console.log(error);
        //     });
    });
};

export const postputStudy = async (study: StudyObj, imageUrl: string, url: any, method: string) => {
    const requestBody = await createStudyRequestBody(study, imageUrl);

    return new Promise((resolve) => {
        const post = async (accessToken) => {
            try {
                const headers = makeHeaders(undefined, true);
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

        // if (cyToken) {
        //     post(cyToken);
        // } else {
        //     console.log('acquireTokenSilent 3');
        //     myMSALObj
        //         .acquireTokenSilent(loginRequest)
        //         .then((tokenResponse: any) => {
        //             if (!tokenResponse.accessToken) {
        //                 signInRedirect();
        //             }
        //             post(tokenResponse.accessToken);
        //         })
        //         .catch((error: string) => {
        //             console.log(error);
        //         });
        // }
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

// function authCallback(error: any, response: any) {
//     // handle redirect response
//     if (response) {
//         console.log('id_token acquired at: ' + new Date().toString());
//     } else {
//         console.log('err', error);
//     }
// }

// export function signInRedirect() {
//     myMSALObj.handleRedirectPromise().then((tokenResponse) => {
//         let accountObj;
//         if (tokenResponse !== null) {
//             accountObj = tokenResponse.account;
//             const id_token = tokenResponse.idToken;
//             const access_token = tokenResponse.accessToken;
//         } else {
//             const currentAccounts = myMSALObj.getAllAccounts();
//             if (!currentAccounts || currentAccounts.length === 0) {
//                 accountObj = undefined;
//             } else if (currentAccounts.length > 1) {
//                 // More than one user signed in, find desired user with getAccountByUsername(username)
//             } else {
//                 const [firstAccount] = currentAccounts;
//                 accountObj = firstAccount;
//             }

//             return;
//         }
//         const [usernameInr] = accountObj;
//         const username = usernameInr;
//       }).catch((error) => {
//         console.log(error);
//         // handleError(error);
//       });
//     myMSALObj.loginRedirect(loginRequest);
// }
/*
export function signOut(myMSALObj: any) {
    myMSALObj.logout();
}
*/

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