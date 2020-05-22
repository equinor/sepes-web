import React, { useState } from 'react';
import StudyComponent from './StudyComponent';

let mockDescription = "Random Extended Three Letter Acronyms. Løsning for å finne navn til hva som helst. Genererer tilfeldig utvidetet trebokstavforkortelser"

const Studies = (props:any) => {
    console.log("Studylist", props.studyList, )
    return (
        <div>
            {props.studyList ? props.studyList.map(study => {
                return (<StudyComponent name={study.studyName} description={mockDescription}/>);
            }): "No studies yet"}     
        </div>         
    )
}

export default Studies; 