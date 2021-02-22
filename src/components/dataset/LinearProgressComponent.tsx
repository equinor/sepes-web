import React, { useEffect } from 'react';
import { LinearProgress } from '@equinor/eds-core-react';

type LinearProgressComponentProps = {
    percentComplete: any;
    blobName: string;
};

const LinearProgressComponent: React.FC<LinearProgressComponentProps> = (percentComplete, blobName) => {
    const returnPercentForFile = (blobName: string) => {
        //const percent = percentComplete.percentComplete[blobName];
        // console.log(percent);
        // return percent;
    };
    return <></>;
    //return <LinearProgress style={{ marginBottom: '16px', marginTop: '-4px' }} value={1} variant="determinate" />;
};

export default LinearProgressComponent;
