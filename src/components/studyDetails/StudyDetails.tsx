/*eslint-disable no-unneeded-ternary */
import React, { useState, useContext, useEffect } from 'react';
import StudyComponentFull from './StudyComponentFull';
import styled from 'styled-components';
import DataSetComponent from './DataSetComponent';
import ParticipantComponent from './ParticipantComponent';
import SandBoxComponent from './SandboxComponent';
import Overview from './Overview';
import { Tabs } from '@equinor/eds-core-react';
import Promt from '../common/Promt';
import LoadingFull from '../common/LoadingComponentFullscreen';
import { Permissions } from '../../index';
import NoAccess from '../common/informationalComponents/NoAccess';
import { resultsAndLearningsObj, StudyObj } from '../common/interfaces';
import { UpdateCache } from '../../App';
import Cookies from 'js-cookie';
import useFetchUrl from '../common/hooks/useFetchUrl';
import { getResultsAndLearningsUrl, getStudyByIdUrl } from '../../services/ApiCallStrings';
import NotFound from '../common/informationalComponents/NotFound';
import { useLocation } from 'react-router-dom';
import { getStudyId } from 'utils/CommonUtil';

const LoadingWrapper = styled.div`
    height: 196px;
    background-color: #ffffff;
    margin: 24px 32px 24px 32px;
    display: flex;
    align-items: center;
`;

const divStyle = {
    gridAutoColumns: 'minmax(1%,800px)'
};

const { TabList, Tab } = Tabs;

let controller = new AbortController();

interface passedProps {
    userCameFromHome: boolean;
}

const StudyDetails = () => {
    const id = getStudyId();
    const { updateCache, setUpdateCache } = useContext(UpdateCache);
    const [study, setStudy] = useState<StudyObj>({
        name: '',
        vendor: '',
        wbsCode: '',
        restricted: false,
        description: '',
        logoUrl: '',
        id: '',
        resultsAndLearnings: '',
        datasets: [],
        participants: [],
        sandboxes: [],
        permissions: {
            addRemoveDataset: false,
            addRemoveParticipant: false,
            addRemoveSandbox: false,
            closeStudy: false,
            deleteStudy: false,
            readResulsAndLearnings: false,
            updateMetadata: false,
            updateResulsAndLearnings: false
        }
    });
    const [newStudy, setNewStudy] = useState<boolean>(id ? false : true);
    const location = useLocation<passedProps>();
    const [activeTab, setActiveTab] = useState<number>(
        location.state && location.state.userCameFromHome ? 0 : parseInt(Cookies.get(id)) || 0
    );
    if (location.state) {
        window.history.replaceState(null, '');
    }

    const [hasChanged, setHasChanged] = useState<boolean>(false);
    const [deleteStudyInProgress, setDeleteStudyInProgress] = useState<boolean>(false);
    const [loading, setLoading] = useState<Boolean>(false);
    const studyResponse = useFetchUrl(getStudyByIdUrl(id), setStudy, id ? true : false, controller);

    const [resultsAndLearnings, setResultsAndLearnings] = useState<resultsAndLearningsObj>({ resultsAndLearnings: '' });
    const resultsAndLearningsResponse = useFetchUrl(
        getResultsAndLearningsUrl(id),
        setResultsAndLearnings,
        id !== '' && study.permissions && study.permissions.readResulsAndLearnings,
        controller
    );

    const permissions = useContext(Permissions);
    const displayStudyInfo = !studyResponse.loading && study;
    const noTimeout: any = deleteStudyInProgress || loading;

    useEffect(() => {
        return () => {
            controller.abort();
            controller = new AbortController();
        };
    }, []);

    const changeComponent = () => {
        Cookies.remove(id);
        Cookies.set(id, activeTab, { expires: 1 });
        switch (activeTab) {
            case 1:
                return (
                    <DataSetComponent
                        study={study}
                        setStudy={setStudy}
                        setUpdateCache={setUpdateCache}
                        updateCache={updateCache}
                    />
                );
            case 2:
                return (
                    <SandBoxComponent
                        sandboxes={study.sandboxes}
                        setStudy={setStudy}
                        setHasChanged={setHasChanged}
                        setUpdateCache={setUpdateCache}
                        updateCache={updateCache}
                        disabled={study.permissions && !study.permissions.addRemoveSandbox}
                        study={study}
                        setLoading={setLoading}
                    />
                );
            case 3:
                return (
                    <ParticipantComponent
                        study={study}
                        setStudy={setStudy}
                        setUpdateCache={setUpdateCache}
                        updateCache={updateCache}
                    />
                );
            case 4:
                return <div>Missing spec</div>;
            default:
                return (
                    <Overview
                        study={study}
                        setHasChanged={setHasChanged}
                        setResultsAndLearnings={setResultsAndLearnings}
                        resultsAndLearnings={resultsAndLearnings}
                        resultsAndLearningsResponse={resultsAndLearningsResponse}
                    />
                );
        }
    };

    return (
        <>
            {studyResponse.notFound && <NotFound />}
            {!permissions.canCreateStudy && newStudy && <NoAccess />}
            <>
                <Promt hasChanged={hasChanged} />
                {displayStudyInfo ? (
                    <StudyComponentFull
                        study={study}
                        newStudy={newStudy}
                        setNewStudy={setNewStudy}
                        setLoading={studyResponse.setLoading}
                        loading={studyResponse.loading}
                        setStudy={setStudy}
                        setHasChanged={setHasChanged}
                        hasChanged={hasChanged}
                        cache={studyResponse.cache}
                        setUpdateCache={setUpdateCache}
                        updateCache={updateCache}
                        setDeleteStudyInProgress={setDeleteStudyInProgress}
                    />
                ) : (
                    <LoadingWrapper />
                )}
                {(studyResponse.loading || loading) && <LoadingFull noTimeout={noTimeout} />}
                {!newStudy && (
                    <div style={{ margin: '32px 32px 32px 32px', backgroundColor: '#ffffff', borderRadius: '4px' }}>
                        <Tabs activeTab={activeTab} variant="fullWidth" onChange={(e: any) => setActiveTab(e)}>
                            <TabList style={divStyle}>
                                <Tab style={{ borderRadius: '4px' }}>Overview</Tab>
                                <Tab data-cy="datasets_tab">Data sets</Tab>
                                <Tab data-cy="sandbox_tab">Sandboxes</Tab>
                                <Tab data-cy="participants_tab">Participants</Tab>
                            </TabList>
                        </Tabs>
                        <div style={{ padding: '16px' }}>{changeComponent()}</div>
                    </div>
                )}
            </>
        </>
    );
};

export default StudyDetails;
