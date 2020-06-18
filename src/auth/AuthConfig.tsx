import { UserAgentApplication } from 'msal';

export const myMSALObj = new UserAgentApplication({
  auth: {
    clientId: "e90cbb61-896e-4ec7-aa37-23511700e1ed",
    authority: "https://login.microsoftonline.com/3aa4a235-b6e2-48d5-9195-7fcf05b459b0",
    redirectUri: "http://localhost:3000/"
  },
  cache: {
    cacheLocation: 'sessionStorage', // This configures where your cache will be stored
    storeAuthStateInCookie: false, // Set this to "true" if you are having issues on IE11 or Edge
  }
});

export default myMSALObj;
