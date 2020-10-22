import React, { useEffect, useState } from 'react';
import { Table } from '@equinor/eds-core-react';
import ResourceItemComponent from './ResourceItemComponent';

const { Body, Row, Cell, Head } = Table;

const Dataset = (props: any) => {
    const { resources } = props;
    return (
        <Table style={{ width: '100%', marginBottom: '24px' }}>
                    <Head>
                    <Row>
                        <Cell as="th" scope="col">Resources</Cell>

                    </Row>
                    </Head>
                    <Body>
                        {resources && resources.map((resource:any, i:number) => {
                            return (
                                <Row key={i}>
                                    <Cell component="th" scope="row"><ResourceItemComponent name={resource.name} type={resource.type} status={resource.status} /></Cell>
                                </Row>
                        );
                        })}
                    </Body>
        </Table>
    )
}

export default Dataset;
