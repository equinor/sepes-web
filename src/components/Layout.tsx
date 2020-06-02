import React from 'react';
import NavBar from './NavBar';
import ErrorBoundary from '../components/common/ErrorBoundary';
import ReactNotification from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';

const Layout = (props: any) => {
    return (
        <>
            <NavBar />
            <ErrorBoundary>
                <ReactNotification />
                {props.children}
            </ErrorBoundary>
        </>
    );
}

export default Layout;
