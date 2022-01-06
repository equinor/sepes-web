import React from 'react';
import Bar from './topbar/TopBar';
import ErrorBoundary from './common/ErrorBoundary';
import ReactNotification from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';

const Layout = (props: any) => {
    // <ErrorBoundary appInsights={props.appInsights}>
    return (
        <>
            <Bar />
            <div style={{ marginBottom: '92px' }} />
            <ErrorBoundary>
                <ReactNotification />
                {props.children}
            </ErrorBoundary>
        </>
    );
};

export default Layout;
