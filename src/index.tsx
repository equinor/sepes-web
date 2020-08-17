import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { acquireTokenSilent, signInRedirect } from './auth/AuthFunctions';
import 'bootstrap/dist/css/bootstrap.min.css';
import { myMSALObj } from './auth/AuthConfig';


export const UserConfig = React.createContext(myMSALObj);

const renderApp = user => {
    return ReactDOM.render(
        <React.StrictMode>
            <UserConfig.Provider value={user}>
                <App />
            </UserConfig.Provider>
        </React.StrictMode>,
        document.getElementById('root')
    );
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
        acquireTokenSilent();
        console.log('Sign in Silent');
    }
        
    if (myMSALObj.getAccount()) {
        renderApp(myMSALObj);
    }
}

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
