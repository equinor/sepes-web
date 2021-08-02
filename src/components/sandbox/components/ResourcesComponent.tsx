/* eslint-disable react/no-array-index-key */
import React, { useState, useEffect } from 'react';
import { Table } from '@equinor/eds-core-react';
import ResourceItemComponent from './ResourceItemComponent';
import '../../../styles/Table.scss';
import { SandboxPermissions } from 'components/common/interfaces';

const { Body, Row, Cell, Head } = Table;

type ResourcesComponentProps = {
    resources: any;
    getResources: any;
    permissions: SandboxPermissions;
};

const Dataset: React.FC<ResourcesComponentProps> = ({ resources, getResources, permissions }) => {
    //const { resources, getResources } = props;
    // const [expandList, setExpandList] = useState<boolean>(false);
    const [orderedResources, setOrderedResources] = useState<any>(false);
    useEffect(() => {
        const temp = resources.reverse();
        setOrderedResources(temp);
    }, [resources]);

    return (
        <div style={{ height: '331px', overflowX: 'hidden' }}>
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
                                            getResources={getResources}
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

export default Dataset;
