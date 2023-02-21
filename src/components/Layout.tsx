import React from 'react';
import Bar from './topbar/TopBar';
import ErrorBoundary from './common/ErrorBoundary';
import 'react-notifications-component/dist/theme.css';
import { ReactNotifications } from 'react-notifications-component';

const Layout = (props: any) => {
    return (
        <>
            <Bar />
            <div style={{ marginBottom: '92px' }} />
            <ErrorBoundary appInsights={props.appInsights}>
                <ReactNotifications />
                {props.children}
            </ErrorBoundary>
        </>
    );
};

export default Layout;
