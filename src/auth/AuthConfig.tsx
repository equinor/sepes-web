import { UserAgentApplication }  from 'msal';
// Config object to be passed to Msal on creation.
// For a full list of msal.js configuration parameters, 
// visit https://azuread.github.io/microsoft-authentication-library-for-js/docs/msal/modules/_authenticationparameters_.html
export {}; //Empty export because TS will treat this as a script if not.
export const myMSALObj = new UserAgentApplication({
  auth: {
    clientId: "e90cbb61-896e-4ec7-aa37-23511700e1ed",
    authority: "https://login.microsoftonline.com/3aa4a235-b6e2-48d5-9195-7fcf05b459b0",
    redirectUri: "http://localhost:3000",
  },
  cache: {
    cacheLocation: "sessionStorage", // This configures where your cache will be stored
    storeAuthStateInCookie: false, // Set this to "true" if you are having issues on IE11 or Edge
  }
});  
    
  // Add here scopes for id token to be used at MS Identity Platform endpoints.


  