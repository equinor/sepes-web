import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { acquireTokenSilent, loginRequest, signInRedirect } from './auth/AuthFunctions';
import 'bootstrap/dist/css/bootstrap.min.css';
import { myMSALObj } from './auth/AuthConfig';
import { getPermissions } from './services/Api';
import { GeneralPermissions } from './components/common/interfaces';
import NoApi from './components/common/informationalComponents/NoApi';
import GeneralError from './components/common/informationalComponents/GeneralError';

export const UserConfig = React.createContext(myMSALObj);
export const Permissions = React.createContext<GeneralPermissions>({
    admin: false,
    canRead_PreApproved_Datasets: false,
    canEdit_PreApproved_Datasets: false,
    canCreateStudy: false,
    datasetAdmin: false,
    sponsor: false
});

const renderApp = async (user) => {
    await getPermissions().then((result: any) => {
        if (result && result.Message) {
            return ReactDOM.render(<GeneralError />, document.getElementById('root'));
        }
        if (result && result.admin !== undefined) {
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
        return ReactDOM.render(<NoApi />, document.getElementById('root'));
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
