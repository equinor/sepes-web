import React from 'react';
import { truncate } from '../../helpers/helpers';
import { Breadcrumbs, Tooltip } from '@equinor/eds-core-react';
import { truncateLength as defaultLength } from '../../staticValues/lenghts';
import { useHistory } from 'react-router-dom';

type BreadcrumbTruncateProps = {
    breadcrumbText: string;
    truncateLength?: number;
    link?: string;
    datacy?: string;
};

const BreadcrumbTruncate: React.FC<BreadcrumbTruncateProps> = ({
    breadcrumbText,
    truncateLength = defaultLength,
    link = window.location.pathname,
    datacy
}) => {
    const history = useHistory();
    return (
        <Tooltip
            title={breadcrumbText && breadcrumbText.length > truncateLength ? breadcrumbText : ''}
            placement="top"
            enterDelay={200}
        >
            <Breadcrumbs.Breadcrumb
                onClick={() => {
                    history.push(link);
                }}
                data-cy={datacy}
            >
                {truncate(breadcrumbText, truncateLength)}
            </Breadcrumbs.Breadcrumb>
        </Tooltip>
    );
};

export default BreadcrumbTruncate;
