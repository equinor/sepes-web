/* eslint-disable react/no-unused-state */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class ErrorBoundary extends Component {
    static getDerivedStateFromError(error) {
        return {
            hasError: true
        };
    }

    constructor(props) {
        super(props);
        this.state = {
            hasError: false,
            error: null,
            errorInfo: null,
            errorMessage: ''
        };
    }

    componentDidCatch(error, errorInfo) {
        this.setState({
            hasError: true,
            error,
            errorInfo,
            errorMessage: error.message
        });
    }

    makeErrorMessage = (errorType) => {
        switch (errorType) {
            case 'accessDenied':
                return (
                    <div>
                        <h1>Access denied</h1>
                    </div>
                );
            default:
                return (
                    <div>
                        <h1>Something went wrong..</h1>
                    </div>
                );
        }
    };

    render() {
        const linkStyle = {
            marginTop: '16px',
            color: '#007079',
            textDecoration: 'underline',
            fontSize: '22px'
        };

        if (this.state.hasError) {
            return (
                <div style={{ paddingTop: '128px', textAlign: 'center' }}>
                    {this.makeErrorMessage(this.state.errorMessage)}
                    {this.props.appInsights.trackTrace(this.state.errorMessage)}
                    <Link to="/" style={linkStyle}>
                        Go back
                    </Link>
                </div>
            );
        }
        return this.props.children;
    }
}

export default ErrorBoundary;
