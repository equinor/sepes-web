import React, {useState, useEffect} from 'react';
import StudyComponentFull from './StudyComponentFull';
import styled from 'styled-components';
import DataSetComponent from './DataSetComponent';
import ParticipantComponent from './ParticipantComponent';
import SandBoxComponent from './SandboxComponent';
import * as api from '../../services/Api';
import loadingGif from '../../assets/loading.gif'
//import { PromptState } from 'msal/lib-commonjs/utils/Constants';

let mockDescription = "Random Extended Three Letter Acronyms. Løsning for å finne navn til hva som helst. Genererer tilfeldig utvidetet trebokstavforkortelser"

const Wrapper = styled.div`
    display: grid;
    width: 100%;
    grid-gap: 10px;
`;

const ComponentWrapper = styled.div`
    @media (min-width: 768px) {
        display: grid;
        grid-template-columns: 1fr 2fr;
        grid-gap: 100px;
    }
    background-color: #FFFFFF;
`;

const LeftWrapper = styled.div`
    display: grid;
    grid-template-rows: 1fr 1fr;
    grid-gap: 10px;
`;

const RightWrapper = styled.div`
    @media (max-width: 768px) {
        margin-top: 20px;
}
`;


const StudyDetails = () => {
    const [isSubscribed, setIsSubscribed] = useState<boolean>(true);
    const [study, setStudy] = useState<any>({});
    const [newStudy, setNewStudy] = useState<boolean>(true);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        setIsSubscribed(true);
        getStudy();
        return () => setIsSubscribed(false);
    }, []);

    const getStudy = () => {
        const id = window.location.pathname.split('/')[2];
        if (!id){
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

    return (<>
        {!loading ?
    <Wrapper>
        <StudyComponentFull wbs={study.wbsCode && study.wbsCode} name={study.name && study.name} description={study.description && study.description} newStudy={newStudy} supplier={study.createdBy} />
        <ComponentWrapper style={{ margin: "0 20px 0 20px", padding: "20px", borderRadius: "4px" }}>
            <LeftWrapper>
                <DataSetComponent dataSets={study.dataSets} />
                <SandBoxComponent sandBoxes={study.sandBoxes} />
            </LeftWrapper>
            <RightWrapper>
                <ParticipantComponent />
            </RightWrapper>
        </ComponentWrapper>
    </Wrapper>
    : <img src={loadingGif} alt="loading..."/> } </>
    );
};

export default StudyDetails;
