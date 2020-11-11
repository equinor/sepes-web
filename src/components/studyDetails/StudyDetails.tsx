import React, { useState, useContext } from 'react';
import StudyComponentFull from './StudyComponentFull';
import styled from 'styled-components';
import DataSetComponent from './DataSetComponent';
import ParticipantComponent from './ParticipantComponent';
import SandBoxComponent from './SandboxComponent';
import Overview from './Overview';
import * as api from '../../services/Api';
import { Tabs } from '@equinor/eds-core-react';
import Promt from '../common/Promt';
import LoadingFull from '../common/LoadingComponentFullscreen';
import { Permissions } from '../../index';
import NoAccess from '../common/NoAccess';
import { StudyObj } from '../common/interfaces';
import useFetch from '../common/hooks/useFetch';
import { UpdateCache } from '../../App';

const LoadingWrapper = styled.div`
    height:196px;
    background-color: #ffffff;
    margin: 24px 32px 24px 32px;
    display:flex;
    align-items:center;
  `;

const { TabList, Tab } = Tabs;

const StudyDetails = () => {
    const id = window.location.pathname.split('/')[2];
    const { updateCache, setUpdateCache } = useContext(UpdateCache);
    const [study, setStudy] = useState<StudyObj>({
        name: '',
        vendor: '',
        wbsCode: '',
        restricted: true,
        description: '',
        logoUrl: '',
        id: '',
        resultsAndLearnings: '',
        datasets: [],
        participants: [],
        sandboxes: []
    });
    const [newStudy, setNewStudy] = useState<boolean>(id ? false : true);
    const [activeTab, setActiveTab] = useState<number>(0);
    const [hasChanged, setHasChanged] = useState<boolean>(false);
    const { loading, setLoading, cache } = useFetch(
        api.getStudy,
        setStudy,
        'study' + window.location.pathname.split('/')[2],
        window.location.pathname.split('/')[2]
    );
    const permissions = useContext(Permissions);

    const changeComponent = () => {
        switch (activeTab) {
            case 1:
                return (
                    <DataSetComponent
                        study={study && study}
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
                    />
                );
            case 3:
                return (
                    <ParticipantComponent
                        study={study && study}
                        setStudy={setStudy}
                        setUpdateCache={setUpdateCache}
                        updateCache={updateCache}
                    />)
                    ;
            case 4:
                return <div>Missing spec</div>;
            default:
                return <Overview study={study} setStudy={setStudy} setHasChanged={setHasChanged} />;
        }
    };

    return (
    <>
        {!permissions.canAdministerDatasets && newStudy ? <NoAccess /> :
        <>
            <Promt hasChanged={hasChanged} />
            {!loading && study ?
            <StudyComponentFull
                study={study && study}
                newStudy={newStudy}
                setNewStudy={setNewStudy}
                setLoading={setLoading}
                loading={loading}
                setStudy={setStudy}
                setHasChanged={setHasChanged}
                cache={cache}
                setUpdateCache={setUpdateCache}
                updateCache={updateCache}
            /> :
            <LoadingWrapper>
                <LoadingFull />
            </LoadingWrapper> }
                {!newStudy &&
                <div style={{ margin: '24px 32px 32px 32px', backgroundColor: '#ffffff', borderRadius: '4px' }}>
                    <Tabs activeTab={activeTab} variant="fullWidth" onChange={(e: any) => setActiveTab(e)}>
                        <TabList>
                            <Tab style={{ borderRadius: '4px' }}>Overview</Tab>
                            <Tab data-cy="datasets_tab">Data sets</Tab>
                            <Tab data-cy="sandbox_tab">Sandboxes</Tab>
                            <Tab>Participants</Tab>
                            <Tab style={{ borderRadius: '4px' }}>Study defaults</Tab>
                        </TabList>
                    </Tabs>
                    <div style={{ padding: '16px' }}>
                        {changeComponent()}
                    </div>
                </div>}
        </>}
    </>
    );
};

export default StudyDetails;
