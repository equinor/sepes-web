/*eslint-disable no-unneeded-ternary */
import React, { useState, useContext, useEffect } from 'react';
import StudyComponentFull from './StudyFull';
import styled from 'styled-components';
import DataSetComponent from './DataSet';
import ParticipantComponent from './Participant';
import SandBoxComponent from './Sandbox';
import Overview from './Overview';
import { Tabs } from '@equinor/eds-core-react';
import Promt from '../common/Prompt';
import { Permissions } from '../../index';
import NoAccess from '../common/informationalComponents/NoAccess';
import { resultsAndLearningsObj } from '../common/interfaces';
import { UpdateCache } from '../../App';
import Cookies from 'js-cookie';
import NotFound from '../common/informationalComponents/NotFound';
import { useLocation } from 'react-router-dom';
import { getStudyId } from '../../utils/CommonUtil';
import { useDispatch, useSelector } from 'react-redux';
import getStudyFromStore from 'store/studies/studiesSelector';
import { setStudyInStore, setStudyToInitialState } from 'store/studies/studiesSlice';
import LoadingFullScreenNew from '../common/LoadingFullScreenNew';
import { setScreenLoading } from 'store/screenloading/screenLoadingSlice';
import useFetchUrl from 'components/common/hooks/useFetchUrl';
import { getStudyByIdUrl } from 'services/ApiCallStrings';

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

let controller = new AbortController();

interface passedProps {
    userCameFromHome: boolean;
}

const StudyDetails = () => {
    const id = getStudyId();
    const { updateCache, setUpdateCache } = useContext(UpdateCache);
    const study = useSelector(getStudyFromStore());
    const dispatch = useDispatch();
    const [newStudy, setNewStudy] = useState<boolean>(id ? false : true);
    const location = useLocation<passedProps>();
    const [activeTab, setActiveTab] = useState<number>(
        location.state && location.state.userCameFromHome ? 0 : parseInt(Cookies.get(id)) || 0
    );
    if (location.state) {
        window.history.replaceState(null, '');
    }

    const studyResponse = useFetchUrl(
        getStudyByIdUrl(id),
        undefined,
        id ? true : false,
        controller,
        false,
        dispatch,
        setStudyInStore
    );

    const [hasChanged, setHasChanged] = useState<boolean>(false);
    const [studySaveInProgress, setStudySaveInProgress] = useState<boolean>(false);
    const [wbsIsValid, setWbsIsValid] = useState<boolean | undefined>(undefined);
    const [resultsAndLearnings, setResultsAndLearnings] = useState<resultsAndLearningsObj>({ resultsAndLearnings: '' });
    const [fallBackAddress, setFallBackAddress] = useState<string>('/');

    const permissions = useContext(Permissions);
    const displayStudyInfo = !studyResponse.loading && study;

    const displayPrompt = hasChanged || studySaveInProgress;

    useEffect(() => {
        if (studyResponse.loading) {
            dispatch(setScreenLoading(true));
        } else {
            dispatch(setScreenLoading(false));
        }
    }, [studyResponse.loading]);

    useEffect(() => {
        return () => {
            controller.abort();
            controller = new AbortController();
            dispatch(setStudyToInitialState());
        };
    }, []);

    useEffect(() => {
        setWbsIsValid(study.wbsCodeValid);
    }, [study.wbsCodeValid]);

    const handleFallbackAddressChange = (url: string) => {
        setFallBackAddress(url);
    };

    const changeComponent = () => {
        Cookies.remove(id);
        Cookies.set(id, activeTab, { expires: 1 });
        switch (activeTab) {
            case 1:
                return (
                    <DataSetComponent
                        setUpdateCache={setUpdateCache}
                        updateCache={updateCache}
                        wbsIsValid={wbsIsValid}
                        studySaveInProgress={studySaveInProgress}
                        onFallBackAddressChange={handleFallbackAddressChange}
                    />
                );
            case 2:
                return (
                    <SandBoxComponent
                        setHasChanged={setHasChanged}
                        setUpdateCache={setUpdateCache}
                        updateCache={updateCache}
                        disabled={!(study.permissions && study.permissions.addRemoveSandbox && !studySaveInProgress)}
                        wbsIsValid={wbsIsValid}
                        onFallBackAddressChange={handleFallbackAddressChange}
                    />
                );
            case 3:
                return <ParticipantComponent setUpdateCache={setUpdateCache} updateCache={updateCache} />;
            case 4:
                return <div>Missing spec</div>;
            default:
                return (
                    <Overview
                        setHasChanged={setHasChanged}
                        setResultsAndLearnings={setResultsAndLearnings}
                        resultsAndLearnings={resultsAndLearnings}
                        controller={controller}
                        onFallBackAddressChange={handleFallbackAddressChange}
                    />
                );
        }
    };

    return (
        <>
            {studyResponse.notFound && <NotFound />}
            {!permissions.canCreateStudy && newStudy && <NoAccess />}
            <>
                <Promt hasChanged={displayPrompt} fallBackAddress={fallBackAddress} />
                {displayStudyInfo ? (
                    <StudyComponentFull
                        newStudy={newStudy}
                        setNewStudy={setNewStudy}
                        setHasChanged={setHasChanged}
                        hasChanged={hasChanged}
                        setUpdateCache={setUpdateCache}
                        updateCache={updateCache}
                        setWbsIsValid={setWbsIsValid}
                        wbsIsValid={wbsIsValid}
                        setStudySaveInProgress={setStudySaveInProgress}
                    />
                ) : (
                    <LoadingWrapper />
                )}
                <LoadingFullScreenNew />
                {!newStudy && (
                    <div style={{ margin: '32px 32px 32px 32px', backgroundColor: '#ffffff', borderRadius: '4px' }}>
                        <Tabs activeTab={activeTab} variant="fullWidth" onChange={(e: any) => setActiveTab(e)}>
                            <Tabs.List style={divStyle}>
                                <Tabs.Tab style={{ borderRadius: '4px' }}>Overview</Tabs.Tab>
                                <Tabs.Tab data-cy="datasets_tab">Data sets</Tabs.Tab>
                                <Tabs.Tab data-cy="sandbox_tab">Sandboxes</Tabs.Tab>
                                <Tabs.Tab data-cy="participants_tab">Participants</Tabs.Tab>
                            </Tabs.List>
                        </Tabs>
                        <div style={{ padding: '16px' }}>{changeComponent()}</div>
                    </div>
                )}
            </>
        </>
    );
};

export default StudyDetails;
