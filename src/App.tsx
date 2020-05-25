import React from 'react';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import Home from './components/home/Home';
import Layout from './components/Layout';
import './App.css';
import ErrorBoundary from './components/common/ErrorBoundary';

function App() {
  return (
    <Router>
      <ErrorBoundary>
        <Layout />
        <Route exact path="/" component={Home} />
      </ErrorBoundary>
    </Router>
  );
}

export default App;
