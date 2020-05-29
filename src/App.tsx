import React from 'react';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import Home from './components/home/Home';
import Layout from './components/Layout';
import './App.css';

const App = () => {
    return (
        <Router>
            <Layout>
                <Route exact path="/" component={Home} />
            </Layout>
        </Router>
    );
}

export default App;
