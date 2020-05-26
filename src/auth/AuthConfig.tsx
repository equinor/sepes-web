import { UserAgentApplication } from 'msal';

export const myMSALObj = new UserAgentApplication({
  auth: {
    clientId: process.env.REACT_APP_SEPES_CLIENTID + '',
    authority: process.env.REACT_APP_SEPES_AUTHORITY,
    redirectUri: process.env.REACT_APP_SEPES_REDIRECT_URI,
  },
  cache: {
    cacheLocation: 'sessionStorage', // This configures where your cache will be stored
    storeAuthStateInCookie: false, // Set this to "true" if you are having issues on IE11 or Edge
  }
});

export default myMSALObj;
