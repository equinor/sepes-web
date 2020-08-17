import React from 'react';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import Home from './components/home/Home';
import StudyDetails from './components/studyDetails/StudyDetails';
import Layout from './components/Layout';
import StudySpecificDataset from './components/dataset/StudySpecificDataset';
import DatasetDetails from './components/dataset/DatasetDetails';
import Datasets from './components/dataset/Datasets';
import { ApplicationInsights } from '@microsoft/applicationinsights-web';
import './styles/app.scss';

const App = () => {
    const appInsights = new ApplicationInsights({ config: {
        instrumentationKey: process.env.REACT_APP_INSTRUMENTATION_KEY
      } });
      appInsights.loadAppInsights();

    return (
        <Router>
            <Layout appInsights={appInsights}>
                <Route exact path="/" component={Home} />
                <Route exact path="/studies/:id/datasets" component={StudySpecificDataset} />
                <Route exact path="/studies/:id/datasets/:datasetid/edit" component={StudySpecificDataset} />
                <Route exact path="/studies/:id/datasets/:datasetid" component={DatasetDetails} />
                <Route exact path="/studies/:id" component={StudyDetails} />
                <Route exact path="/studies/" component={StudyDetails} />
                <Route exact path="/datasets/" component={Datasets} />
                <Route exact path="/datasets/new" component={StudySpecificDataset} />
                <Route exact path={'/datasets/:datasetid(\\d+)'} component={DatasetDetails} />
                <Route exact path={'/datasets/:datasetid(\\d+)/edit'} component={StudySpecificDataset} />
            </Layout>
        </Router>
    );
}

export default App;
