import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { acquireTokenSilent, loginRequest, signInRedirect } from './auth/AuthFunctions';
import 'bootstrap/dist/css/bootstrap.min.css';
import { myMSALObj } from './auth/AuthConfig';
import { getPermissions } from './services/Api';
import { UserAgentApplication } from 'msal';

export const UserConfig = React.createContext(myMSALObj);
export const Permissions = React.createContext({
  admin: false,
  canAdministerDatasets: false,
  canCreateStudy: false,
  datasetAdmin: false,
  emailAddress: null,
  fullName: null,
  sponsor: false,
  userName: null
});

const renderApp = (user) => {
  getPermissions().then((result: any) => {
    if (!result.Message) {
        return ReactDOM.render(
            <React.StrictMode>
                <UserConfig.Provider value={user}>
                  <Permissions.Provider value={result}>
                    <App />
                  </Permissions.Provider>
                </UserConfig.Provider>
            </React.StrictMode>,
            document.getElementById('root')
        );
    }
  else {
    console.log('err: ', result.Message)
  }})
  }

let cyToken = localStorage.getItem("cyToken");

if (cyToken && cyToken.length) {
    let mockUser = {
        account: {
            name: "MockUser",
            roles: ""
        }
    };
    renderApp(mockUser);
    //renderApp(mockUser, test);

    /*validateAccessToken(cyToken).then(result => {
        if (result.error) {
            console.log('err', result);
        } else {
            let isValid = result;
            if (isValid) {
                renderApp(mockUser)
            }
        }
    });*/
} else {
    if (myMSALObj.getCurrentConfiguration().cache && !myMSALObj.getAccount()) {
        signInRedirect();
        console.log('Sign In PopUp');
    } else {
        acquireTokenSilent().catch((error: string) => {
          myMSALObj.acquireTokenRedirect(loginRequest);
          console.log(error);
        });
        console.log('Sign in Silent');
    }
    
    if (myMSALObj.getAccount()) {
        renderApp(myMSALObj);
    }
}
/*
}

else {
    console.log("Err");
}
});*/
/*
if (myMSALObj.getCurrentConfiguration().cache && !myMSALObj.getAccount()) {
  signInRedirect();
  console.log('Sign In PopUp');
}
else {
  acquireTokenSilent();
  console.log('Sign in Silent');
}
export const UserConfig = React.createContext(myMSALObj);
if (myMSALObj.getAccount()) {
  ReactDOM.render(
    <React.StrictMode>
      <UserConfig.Provider value={myMSALObj}>
        <App />
      </UserConfig.Provider>
    </React.StrictMode>,
    document.getElementById('root')
  );
}*/
/*
else{
  ReactDOM.render(
    <NoAccess />, document.getElementById('root')
  )
}
*/
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
