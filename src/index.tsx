/* eslint-disable react/no-render-return-value */
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { SignInSilentRedirect } from './auth/AuthFunctions';
import { myMSALObj } from './auth/AuthConfig';
import { getPermissions } from './services/Api';
import { GeneralPermissions } from './components/common/interfaces';
import NoApi from './components/common/informationalComponents/NoApi';
import GeneralError from './components/common/informationalComponents/GeneralError';
import LoadingFull from 'components/common/LoadingComponentFullscreen';

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
    ReactDOM.render(<LoadingFull />, document.getElementById('root'));
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

const cyToken = localStorage.getItem('cyToken');

if (cyToken && cyToken.length) {
    const mockUser = {
        account: {
            name: 'MockUser',
            roles: ''
        }
    };
    renderApp(mockUser);
} else {    
    SignInSilentRedirect();

    if (myMSALObj.getAllAccounts().length > 0) {
        renderApp(myMSALObj);
    }   
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
