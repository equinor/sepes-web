/* eslint-disable react/no-array-index-key */
import React, { useState, useEffect } from 'react';
import { Table } from '@equinor/eds-core-react';
import ResourceItemComponent from './ResourceItem';
import '../../../styles/Table.scss';
import { SandboxPermissions } from 'components/common/interfaces';
import { useSelector } from 'react-redux';
import getResourcesFromStore from 'store/resources/resourcesSelectors';

const { Body, Row, Cell, Head } = Table;

type ResourcesComponentProps = {
    permissions: SandboxPermissions;
};

const Resources: React.FC<ResourcesComponentProps> = ({ permissions }) => {
    const [orderedResources, setOrderedResources] = useState<any>(false);
    const resources = useSelector(getResourcesFromStore());
    useEffect(() => {
        const sortedArray = [...resources];
        setOrderedResources(sortedArray.reverse());
    }, [resources]);

    return (
        <div style={{ height: '331px', overflowX: 'hidden' }} data-cy="sandbox_resources">
            <Table style={{ width: '100%', marginBottom: '24px', height: '200px' }}>
                <Head>
                    <Row>
                        <Cell scope="col">Resources</Cell>
                    </Row>
                </Head>
                <Body>
                    {orderedResources && orderedResources.length > 0 && Array.isArray(orderedResources) ? (
                        orderedResources.map((resource: any, i: number) => {
                            return (
                                <Row key={i} id="tableRowNoPointerNoColor">
                                    <Cell>
                                        <ResourceItemComponent
                                            name={resource.name}
                                            type={resource.type}
                                            status={resource.status}
                                            linkToResource={resource.linkToExternalSystem}
                                            retryLink={resource.retryLink}
                                            permission={permissions}
                                        />
                                    </Cell>
                                </Row>
                            );
                        })
                    ) : (
                        <Row key={1} id="tableRowNoPointerNoColor">
                            <Cell>No resources...</Cell>
                        </Row>
                    )}
                </Body>
            </Table>
        </div>
    );
};

export default Resources;
