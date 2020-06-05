import React, { useState } from 'react';
import StudyComponent from './StudyComponent';

let mockDescription = "Random Extended Three Letter Acronyms. Løsning for å finne navn til hva som helst. Genererer tilfeldig utvidetet trebokstavforkortelser"

const Studies = (props: any) => {
    return (
        <div>
            {props.studyList ? props.studyList.map(study => {
                return (<StudyComponent name={study.name} description={study.description} key={study.studyId} url={'/studies/' + study.id} />);
            }) : "No studies yet"}
        </div>
    )
}

export default Studies;
