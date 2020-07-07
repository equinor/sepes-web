import React, { useState } from 'react';
import DatasetsTable from '../common/customComponents/DatasetsTable';
import ParticipantTable from '../common/customComponents/ParticipantTable';
import styled from 'styled-components';

const Wrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 16px;
    @media (max-width: 768px) {
        display: block;
    }
`;

const Overview = (props: any) => {
    return (
        <Wrapper>
            <DatasetsTable
                datasets={props.study.datasets}
                editMode={false}
                studyId={props.study.id}
                />
            <ParticipantTable
                participants={props.study.participants}
                editMode={false}
                />
        </Wrapper>
    )
}

export default Overview;
