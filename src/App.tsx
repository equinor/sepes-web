import React from 'react';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import Home from './components/home/Home';
import StudyDetails from './components/studyDetails/StudyDetails';
import Layout from './components/Layout';
import './App.css';
//import './styles/app';
import ErrorBoundary from './components/common/ErrorBoundary';

function App() {
  return (
    <Router>
      <ErrorBoundary>
        <Layout />
        <Route exact path="/" component={Home} />
        <Route path="/studies" component={StudyDetails} />
      </ErrorBoundary>
    </Router>
  );
}

export default App;
