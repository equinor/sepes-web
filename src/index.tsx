import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import  { acquireTokenSilent, signIn }  from './auth/AuthFunctions';
import { UserAgentApplication }  from 'msal';
import 'bootstrap/dist/css/bootstrap.min.css';

const myMSALObj = new UserAgentApplication({
  auth: {
    clientId: "e90cbb61-896e-4ec7-aa37-23511700e1ed",
    authority: "https://login.microsoftonline.com/3aa4a235-b6e2-48d5-9195-7fcf05b459b0",
    redirectUri: "http://localhost:3000/",
  },
  cache: {
    cacheLocation: "sessionStorage", // This configures where your cache will be stored
    storeAuthStateInCookie: false, // Set this to "true" if you are having issues on IE11 or Edge
  }
});
//signIn(myMSALObj);
if(myMSALObj.getCurrentConfiguration().cache && !myMSALObj.getAccount()){
  signIn(myMSALObj);
  console.log("Sign In PopUp");
}
else{
  acquireTokenSilent(myMSALObj);
  console.log("Sign in Silent");
}
export const UserConfig = React.createContext(myMSALObj);
if(myMSALObj.getAccount()){
  ReactDOM.render(
    <React.StrictMode>
      <UserConfig.Provider value={myMSALObj}>
      <App />
      </UserConfig.Provider>
    </React.StrictMode>,
    document.getElementById('root')
  );
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
