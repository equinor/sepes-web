import React, { useState, useContext } from 'react';
import { getStudiesUrl } from '../../services/ApiCallStrings';
import Studies from './Studies';
import { Button, Tooltip, Typography } from '@equinor/eds-core-react';
import styled from 'styled-components';
import LoadingFull from '../common/LoadingComponentFullscreen';
import { useHistory } from 'react-router-dom';
import { Permissions } from '../../index';
import useFetchUrl from '../common/hooks/useFetchUrl';
import { lineBreak } from '../common/helpers';

const Wrapper = styled.div`
    display: grid;
    grid-template-columns: 9fr 400px;
    width: 100%;
    grid-gap: 16px;
    margin-top: 24px;
    margin-bottom: 16px;
    @media (max-width: 768px) {
        display: block;
    }
`;

const RightWrapper = styled.div`
    background-color: #d5eaf4;
    padding: 16px;
    border-radius: 4px;
    margin-right: 32px;
    max-height: 451px;
    text-align: center;

    @media (max-width: 768px) {
        display: block;
        margin: 0 32px 32px 32px;
    }
`;

const sepesInfoText =
    'Sepes is an infrastructure platform, established to make data in Equinor much more available for testing with external vendors. This is done by creating a safe area that the vendors are given access to and yet Equinor can keep full control over the data. The data will never escape beyond the "fenced" area (Sepes in latin for fence).\n\n The purpose of Sepes is to de-risk investments, build more solid business cases, and increase learning and innovation. Sepes is built with the focus on value validation, not technology adaption.\n\n Click the "New Study"-button below to start a new technology study in Sepes:';
const Home = () => {
    const history = useHistory();
    const permissions = useContext(Permissions);
    const [studyList, setStudylist] = useState([]);
    const studies = useFetchUrl(getStudiesUrl(), setStudylist);

    return (
        <Wrapper>
            {!studies.loading ? (
                <Studies studyList={studyList} />
            ) : (
                <div>
                    <LoadingFull />
                </div>
            )}
            <RightWrapper>
                <div style={{ textAlign: 'initial' }} id="test3">
                    <Typography variant="body_long" key="yaasd">
                        {lineBreak(sepesInfoText)}
                    </Typography>
                </div>
                <div style={{ bottom: '16px', width: '100%', marginTop: '16px' }} id="test4">
                    <Tooltip
                        title={permissions.canCreateStudy ? '' : 'You do not have access to create a study'}
                        placement="top"
                    >
                        <Button
                            disabled={!permissions.canCreateStudy}
                            data-cy="new_study"
                            style={{ width: '336px' }}
                            onClick={() => {
                                history.push('/studies');
                            }}
                        >
                            New study
                        </Button>
                    </Tooltip>
                </div>
            </RightWrapper>
        </Wrapper>
    );
};

export default Home;
