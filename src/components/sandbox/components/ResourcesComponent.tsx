/* eslint-disable react/no-array-index-key */
import React from 'react';
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
    return (
        <Table style={{ width: '100%', marginBottom: '24px' }}>
            <Head>
                <Row>
                    <Cell scope="col">Resources</Cell>
                </Row>
            </Head>
            <Body>
                {resources && resources.length > 0 && Array.isArray(resources) ? (
                    resources.map((resource: any, i: number) => {
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
    );
};

export default Dataset;
