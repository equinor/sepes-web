import React from 'react';
import Bar from './topbar/TopBar';
import ErrorBoundary from '../components/common/ErrorBoundary';
import ReactNotification from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';

const Layout = (props: any) => {
    return (
        <>
            <Bar />
            <ErrorBoundary>
                <ReactNotification />
                {props.children}
            </ErrorBoundary>
        </>
    );
}

export default Layout;
