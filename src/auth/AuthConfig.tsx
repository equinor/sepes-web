import { PublicClientApplication } from '@azure/msal-browser';

export const myMSALObj = new PublicClientApplication({
  auth: {
    clientId: process.env.REACT_APP_SEPES_CLIENTID + '',
    authority: process.env.REACT_APP_SEPES_AUTHORITY,
    redirectUri: process.env.REACT_APP_SEPES_REDIRECT_URI
  },
  cache: {
    cacheLocation: 'sessionStorage', // This configures where your cache will be stored
    storeAuthStateInCookie: false, // Set this to "true" if you are having issues on IE11 or Edge
  }
});

export default myMSALObj;
