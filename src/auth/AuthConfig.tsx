/* eslint-disable import/no-unresolved */
import { PublicClientApplication } from '@azure/msal-browser';
import './Environment';

console.log(window.REDIRECT_URI);
console.log(window.BASE_API_URI);
console.log(process.env.REACT_APP_SEPES_CLIENTID);
console.log(process.env.REACT_APP_SEPES_AUTHORITY);
// eslint-disable-next-line import/prefer-default-export
export const myMSALObj = new PublicClientApplication({
    auth: {
        clientId: 'e90cbb61-896e-4ec7-aa37-23511700e1ed',
        authority: 'https://login.microsoftonline.com/3aa4a235-b6e2-48d5-9195-7fcf05b459b0',
        redirectUri: window.REDIRECT_URI
    },
    cache: {
        cacheLocation: 'sessionStorage', // This configures where your cache will be stored
        storeAuthStateInCookie: false // Set this to "true" if you are having issues on IE11 or Edge
    }
});

export default myMSALObj;
