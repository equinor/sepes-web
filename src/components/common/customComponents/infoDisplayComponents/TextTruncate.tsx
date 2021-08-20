import React from 'react';
import { truncate } from '../../helpers/helpers';
import { Tooltip, Typography } from '@equinor/eds-core-react';
import { truncateLength as defaultLength } from '../../staticValues/lenghts';

type TextTruncateProps = {
    inputText: string;
    truncateLength?: number;
};

const TextTruncate: React.FC<TextTruncateProps> = ({ inputText, truncateLength = defaultLength }) => {
    // const history = useHistory();
    return (
        <Tooltip title={inputText.length > truncateLength ? inputText : ''} placement="top" enterDelay={200}>
            <Typography>{truncate(inputText, defaultLength)}</Typography>
        </Tooltip>
    );
};

export default TextTruncate;
