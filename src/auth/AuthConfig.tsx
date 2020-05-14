import { UserAgentApplication }  from 'msal';
// Config object to be passed to Msal on creation.
// For a full list of msal.js configuration parameters, 
// visit https://azuread.github.io/microsoft-authentication-library-for-js/docs/msal/modules/_authenticationparameters_.html
export {}; //Empty export because TS will treat this as a script if not.
export const myMSALObj = new UserAgentApplication({
  auth: {
    clientId: process.env.REACT_APP_SEPES_CLIENTID + "",
    authority: process.env.REACT_APP_SEPES_AUTHORITY,
    redirectUri: process.env.REACT_APP_SEPES_REDIRECT_URI,
  },
  cache: {
    cacheLocation: "sessionStorage", // This configures where your cache will be stored
    storeAuthStateInCookie: false, // Set this to "true" if you are having issues on IE11 or Edge
  }
});  
    
  // Add here scopes for id token to be used at MS Identity Platform endpoints.


  