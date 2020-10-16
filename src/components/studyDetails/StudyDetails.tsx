import React, { useState, useEffect, useContext } from 'react';
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
import * as notify from '../common/notify';

const LoadingWrapper = styled.div`
    height:196px;
    background-color: #ffffff;
    margin: 24px 32px 24px 32px;
    display:flex;
    align-items:center;
  `;

const { TabList, Tab } = Tabs;

const StudyDetails = () => {
    const [isSubscribed, setIsSubscribed] = useState<boolean>(true);
    const [study, setStudy] = useState<any>({});
    const [newStudy, setNewStudy] = useState<boolean>(true);
    const [loading, setLoading] = useState<boolean>(false);
    const [showDatasets, setShowDatasets] = useState<boolean>(false);
    const [showSandboxes, setShowSandboxes] = useState<boolean>(false);
    const [showParticipants, setShowParticipants] = useState<boolean>(false);
    const [showOverview, setShowOverview] = useState<boolean>(true);
    const [activeTab, setActiveTab] = useState<number>(0);
    const [hasChanged, setHasChanged] = useState<boolean>(false);
    const permissions = useContext(Permissions);

    useEffect(() => {
        setIsSubscribed(true);
        getStudy();
        return () => setIsSubscribed(false);
    }, []);

    const getStudy = () => {
        const id = window.location.pathname.split('/')[2];
        if (!id) {
            return;
        }
        setNewStudy(false);
        setLoading(true);
        api.getStudy(id).then((result: any) => {
            if (isSubscribed && result && !result.Message) {
                setStudy(result);
                setNewStudy(false);
                console.log("resultStudy: ", result)
            }
            else {
                notify.show('danger', '500', result.Message, result.RequestId);
                console.log("Err");
            }
            setLoading(false);
        });
    }

    const changeComponent = (e:any) => {
        hideComponents();
        setActiveTab(e);
        if (e === 0) {
            setShowOverview(true);
        }
        if (e === 1) {
            setShowDatasets(true);
        }
        if (e === 2) {
            setShowSandboxes(true);
        }
        if (e === 3) {
            setShowParticipants(true);
        }
    }

    const hideComponents = () => {
        setShowDatasets(false);
        setShowParticipants(false);
        setShowSandboxes(false);
        setShowOverview(false);
    }

    return (
    <>
        {!permissions.canAdministerDatasets && newStudy ? <NoAccess /> :
        <>
            <Promt hasChanged={hasChanged} />
            {!loading ?
            <StudyComponentFull
                study={study}
                newStudy={newStudy}
                setNewStudy={setNewStudy}
                setLoading={setLoading}
                loading={loading}
                setStudy={setStudy}
                setHasChanged={setHasChanged}
            /> :
            <LoadingWrapper>
                <LoadingFull />
            </LoadingWrapper> }
                {!newStudy &&
                <div style={{ margin: '24px 32px 32px 32px', backgroundColor: '#ffffff', borderRadius: '4px' }}>
                    <Tabs activeTab={activeTab} variant="fullWidth" onChange={(e: any) => changeComponent(e)}>
                        <TabList>
                            <Tab style={{ borderRadius: '4px' }}>Overview</Tab>
                            <Tab data-cy="datasets_tab">Data sets</Tab>
                            <Tab data-cy="sandbox_tab">Sandboxes</Tab>
                            <Tab>Participants</Tab>
                            <Tab style={{ borderRadius: '4px' }}>Study defaults</Tab>
                        </TabList>
                    </Tabs>
                    <div style={{ padding: '16px' }}>
                {showDatasets && <DataSetComponent study={study && study} setStudy={setStudy} />}
                {showParticipants && <ParticipantComponent study={study && study} setStudy={setStudy} />}
                {showSandboxes && <SandBoxComponent sandboxes={study.sandboxes} setStudy={setStudy} setHasChanged={setHasChanged} />}
                {showOverview && <Overview study={study} setStudy={setStudy} setHasChanged={setHasChanged} />}
                    </div>
                </div>}
        </>}
    </>
    );
};

export default StudyDetails;
