import React from 'react';
import StudyComponent from './StudyComponent';
import { StudyObj } from '../common/interfaces';

type StudiesProps = {
    studyList: any;
};

const Studies: React.FC<StudiesProps> = ({ studyList }) => {
    return (
        <div>
            {studyList
                ? studyList.map((study: StudyObj) => {
                      return <StudyComponent study={study} key={study.id} />;
                  })
                : 'No studies yet'}
        </div>
    );
};

export default Studies;
