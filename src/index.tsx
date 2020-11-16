import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { acquireTokenSilent, loginRequest, signInRedirect } from './auth/AuthFunctions';
import 'bootstrap/dist/css/bootstrap.min.css';
import { myMSALObj } from './auth/AuthConfig';
import { getPermissions } from './services/Api';

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
        } else {
            console.log('err: ', result.Message);
        }
    });
};

let cyToken = localStorage.getItem('cyToken');

if (cyToken && cyToken.length) {
    let mockUser = {
        account: {
            name: 'MockUser',
            roles: ''
        }
    };
    renderApp(mockUser);
} else {
    if (myMSALObj.getCurrentConfiguration().cache && !myMSALObj.getAccount()) {
        signInRedirect();
    } else {
        acquireTokenSilent().catch((error: string) => {
            myMSALObj.acquireTokenRedirect(loginRequest);
            console.log(error);
        });
    }

    if (myMSALObj.getAccount()) {
        renderApp(myMSALObj);
    }
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
