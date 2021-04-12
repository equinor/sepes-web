import React, { useState } from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import Home from './components/home/Home';
import StudyDetails from './components/studyDetails/StudyDetails';
import Layout from './components/Layout';
import CreateEditDataset from './components/dataset/CreateEditDataset';
import DatasetDetails from './components/dataset/DatasetDetails';
import Datasets from './components/dataset/Datasets';
import { ApplicationInsights } from '@microsoft/applicationinsights-web';
import Sandbox from './components/sandbox/Sandbox';
import './styles/app.scss';
import NotFound from './components/common/informationalComponents/NotFound';
import ReleaseNotes from './components/releaseNotes/ReleaseNotes';

interface IContextProps {
    updateCache: any;
    setUpdateCache: any;
}

export const UpdateCache = React.createContext({} as IContextProps);

const App = () => {
    const [updateCache, setUpdateCache] = useState();
    const appInsights = new ApplicationInsights({
        config: {
            instrumentationKey: process.env.REACT_APP_INSTRUMENTATION_KEY
        }
    });
    appInsights.loadAppInsights();

    return (
        <Router>
            <Layout appInsights={appInsights}>
                <UpdateCache.Provider value={{ updateCache, setUpdateCache }}>
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route exact path="/studies/:id/datasets" component={CreateEditDataset} />
                        <Route exact path="/studies/:id/datasets/:datasetid/edit" component={CreateEditDataset} />
                        <Route exact path="/studies/:id/datasets/:datasetid" component={DatasetDetails} />
                        <Route exact path="/studies/:id/sandboxes/:sandboxid" component={Sandbox} />
                        <Route exact path="/studies/:id" component={StudyDetails} />
                        <Route exact path="/studies/" component={StudyDetails} />
                        <Route exact path="/datasets/" component={Datasets} />
                        <Route exact path="/datasets/new" component={CreateEditDataset} />
                        <Route exact path={'/datasets/:datasetid(\\d+)'} component={DatasetDetails} />
                        <Route exact path={'/datasets/:datasetid(\\d+)/edit'} component={CreateEditDataset} />
                        <Route exact path="/releasenotes/" component={ReleaseNotes} />
                        <Route component={NotFound} />
                    </Switch>
                </UpdateCache.Provider>
            </Layout>
        </Router>
    );
};

export default App;
