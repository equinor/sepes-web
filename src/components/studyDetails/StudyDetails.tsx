import React from 'react';
import StudyComponentFull from './StudyComponentFull';
import styled from 'styled-components';
import DataSetComponent from './DataSetComponent';

let mockDescription = "Random Extended Three Letter Acronyms. Løsning for å finne navn til hva som helst. Genererer tilfeldig utvidetet trebokstavforkortelser"

const Wrapper = styled.div`
    display: grid;
    grid-template-rowns: 1fr 4fr;
    width: 100%;
    grid-gap: 10px;
`;

const StudyDetails = () => {
    return (
    <Wrapper>
        <StudyComponentFull name="ProsjektNavnet" description={ mockDescription } />
        <div style={{backgroundColor: "FFFFFF", margin: "0 20px 0 20px"}}>
            <DataSetComponent />
        </div>
    </Wrapper>);
};

export default StudyDetails;
