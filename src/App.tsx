import React from 'react';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import Home from './components/home/Home';
import StudyDetails from './components/studyDetails/StudyDetails';
import Layout from './components/Layout';
import StudySpecificDataset from './components/dataset/StudySpecificDataset';
import DatasetDetails from './components/dataset/DatasetDetails';
import { ApplicationInsights } from '@microsoft/applicationinsights-web';
import './styles/app.scss';

const App = () => {
    console.log(process.env);
    const appInsights = new ApplicationInsights({ config: {
        instrumentationKey: process.env.SEPES_Appi_Key
      } });
      appInsights.loadAppInsights();

    return (
        <Router>
            <Layout appInsights={appInsights}>
                <Route exact path="/" component={Home} />
                <Route exact path="/studies/:id/datasets" component={StudySpecificDataset} />
                <Route exact path="/studies/:id/datasets/:datasetid" component={DatasetDetails} />
                <Route exact path="/studies/:id" component={StudyDetails} />
                <Route exact path="/studies/" component={StudyDetails} />
            </Layout>
        </Router>
    );
}

export default App;
