import React from 'react';
import StudyComponentFull from './StudyComponentFull';
import styled from 'styled-components';
import DataSetComponent from './DataSetComponent';
import ParticipantComponent from './ParticipantComponent';
import SandBoxComponent from './SandboxComponent';

let mockDescription = "Random Extended Three Letter Acronyms. Løsning for å finne navn til hva som helst. Genererer tilfeldig utvidetet trebokstavforkortelser"

const Wrapper = styled.div`
    display: grid;
    grid-template-rowns: 1fr 4fr;
    width: 100%;
    grid-gap: 10px;
`;

const ComponentWrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr 2fr;
    grid-gap: 100px;
    backgroundColor: FFFFFF;
`;

const LeftWrapper = styled.div`
    display: grid;
    grid-template-rows: 1fr 1fr;
    grid-gap: 10px;
    backgroundColor: FFFFFF;
`;


const StudyDetails = () => {
    return (
    <Wrapper>
        <StudyComponentFull name="ProsjektNavnet" description={ mockDescription } />
        <ComponentWrapper style={{backgroundColor: "#FFFFFF", margin: "0 20px 0 20px", padding: "20px", borderRadius: "4px"}}>
            <LeftWrapper>
                <DataSetComponent />
                <SandBoxComponent />
            </LeftWrapper>
            
            <ParticipantComponent />
            
        </ComponentWrapper>
    </Wrapper>);
};

export default StudyDetails;
