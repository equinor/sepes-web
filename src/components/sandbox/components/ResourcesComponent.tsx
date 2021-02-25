import React from 'react';
import { Table } from '@equinor/eds-core-react';
import ResourceItemComponent from './ResourceItemComponent';
import '../../../styles/Table.scss';

const { Body, Row, Cell, Head } = Table;

const Dataset = (props: any) => {
    const { resources } = props;
    return (
        <Table style={{ width: '100%', marginBottom: '24px' }}>
            <Head>
                <Row>
                    <Cell scope="col">Resources</Cell>
                </Row>
            </Head>
            <Body>
                {resources && Array.isArray(resources) ? (
                    resources.map((resource: any, i: number) => {
                        return (
                            <Row key={i} id="tableRowNoPointerNoColor">
                                <Cell>
                                    <ResourceItemComponent
                                        name={resource.name}
                                        type={resource.type}
                                        status={resource.status}
                                        linkToResource={resource.linkToExternalSystem}
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
