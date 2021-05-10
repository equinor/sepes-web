import React from 'react';
import StudyComponent from './StudyComponent';
import { StudyObj } from '../common/interfaces';

type StudiesProps = {
    studyList: any;
};

const Studies: React.FC<StudiesProps> = ({ studyList }) => {
    return (
        <div>
            {studyList &&
                Array.isArray(studyList) &&
                studyList.map((study: StudyObj) => {
                    return <StudyComponent study={study} key={study.id} />;
                })}
        </div>
    );
};

export default Studies;
