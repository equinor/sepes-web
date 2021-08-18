/* eslint-disable react/no-unused-state */
import React, { Component } from 'react';
import { Button } from '@equinor/eds-core-react';
import { withRouter } from 'react-router-dom';

class ErrorBoundary extends Component {
    static getDerivedStateFromError() {
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

    componentDidCatch(error) {
        this.setState({
            hasError: true,
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
        const { history } = this.props;

        if (this.state.hasError) {
            return (
                <div style={{ paddingTop: '128px', textAlign: 'center' }}>
                    {this.makeErrorMessage(this.state.errorMessage)}
                    {this.props.appInsights.trackTrace(this.state.errorMessage)}
                    <Button
                        variant="outlined"
                        onClick={() => {
                            history.push('/');
                            history.go(0);
                        }}
                    >
                        Go back
                    </Button>
                </div>
            );
        }
        return this.props.children;
    }
}

export default withRouter(ErrorBoundary);
