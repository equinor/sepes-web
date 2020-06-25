import React, {useState, useEffect} from 'react';
import StudyComponentFull from './StudyComponentFull';
import styled from 'styled-components';
import DataSetComponent from './DataSetComponent';
import ParticipantComponent from './ParticipantComponent';
import SandBoxComponent from './SandboxComponent';
import * as api from '../../services/Api';
//import loadingGif from '../../assets/loading.gif';
import { Tabs } from '@equinor/eds-core-react';
import Loading from '../common/LoadingComponent';

const { TabList, Tab } = Tabs;

const StudyDetails = () => {
    const [isSubscribed, setIsSubscribed] = useState<boolean>(true);
    const [study, setStudy] = useState<any>({});
    const [newStudy, setNewStudy] = useState<boolean>(true);
    const [loading, setLoading] = useState<boolean>(false);
    const [showDatasets, setShowDatasets] = useState<boolean>(false);
    const [showSandboxes, setShowSandboxes] = useState<boolean>(false);
    const [showParticipants, setShowParticipants] = useState<boolean>(false);
    const [activeTab, setActiveTab] = useState<number>(0);
    const [datasets, setDatasets] = useState<any>([]);

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
        setLoading(true);
        api.getStudy(id).then((result: any) => {
            if (isSubscribed) {
                setStudy(result);
                setNewStudy(false);
                console.log("resultStudy: ", result)
            }
            else {
                console.log("Err");
            }
            setLoading(false);
        })
    }

    const changeComponent = (e:any) => {
        hideComponents();
        setActiveTab(e);
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
    }

    return (
    <>
        {!loading
        ? <>
        <StudyComponentFull study={study} newStudy={newStudy} setNewStudy={setNewStudy} />
        {!newStudy ?
        <div style={{ margin: '20px 20px 20px 20px', backgroundColor: '#ffffff', borderRadius: '4px' }}>
            <Tabs activeTab={activeTab} variant="fullWidth" onChange={(e: any) => changeComponent(e)}>
                <TabList>
                    <Tab>Overview</Tab>
                    <Tab>Data sets</Tab>
                    <Tab>Sandboxes</Tab>
                    <Tab>Participants</Tab>
                    <Tab>Study defaults</Tab>
                </TabList>
            </Tabs>
            <div style={{ padding: '20px' }}>
        {showDatasets ? <DataSetComponent study={study && study} setStudy={setStudy} /> : null}
        {showParticipants ? <ParticipantComponent /> : null}
        {showSandboxes ? <SandBoxComponent sandboxes={study.sandboxes} /> : null}
            </div>
        </div> : null }
          </>
    : <Loading /> }
    </>
    );
};

/*
wbs={study.wbsCode && study.wbsCode} name={study.name && study.name} description={study.description && study.description} vendor={study.createdBy}
return (<>
        {!loading ?
    <Wrapper>
        <StudyComponentFull wbs={study.wbsCode && study.wbsCode} name={study.name && study.name} description={study.description && study.description} newStudy={newStudy} supplier={study.createdBy} />
        {!newStudy ?
        <ComponentWrapper style={{ margin: "0 20px 0 20px", padding: "20px", borderRadius: "4px" }}>
            <LeftWrapper>
                <DataSetComponent dataSets={study.dataSets} />
                <SandBoxComponent sandBoxes={study.sandBoxes} />
            </LeftWrapper>
            <RightWrapper>
                <ParticipantComponent />
            </RightWrapper>
        </ComponentWrapper> : null}
    </Wrapper>
    : <img src={loadingGif} alt="loading..."/> } </>
    );
*/


export default StudyDetails;
