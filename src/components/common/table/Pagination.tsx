import React from 'react';
import { Button, Pagination as EDSPagination } from '@equinor/eds-core-react';

export function Pagination(props) {
    const getVariantForPageSizeButton = (pageSize) => {
        if (pageSize === (props.initialItemsPerPage || 10)) return 'outlined';
        return 'ghost';
    };

    const pageSizeButton = (sizeNumber) => {
        return (
            <Button
                onClick={() => props.onChangeItemsPerPage(sizeNumber)}
                style={{ maxWidth: '30px', maxHeight: '30px' }}
                variant={getVariantForPageSizeButton(sizeNumber)}
            >
                {sizeNumber}
            </Button>
        );
    };

    return (
        <div>
            <div style={{ float: 'left', maxWidth: '375px', paddingTop: '8px' }}>
                <span style={{ marginRight: '8px' }}>Rows per page:</span>
                {pageSizeButton(10)}
                {pageSizeButton(20)}
                {pageSizeButton(50)}
                {pageSizeButton(100)}
                {pageSizeButton(500)}
            </div>

            <div style={{ float: 'right', display: 'inline-flex' }}>
                <EDSPagination
                    data-cy="pagination"
                    totalItems={props.totalItems}
                    itemsPerPage={props.initialItemsPerPage || 10}
                    onChange={(e, p) => props.onChangePage(p)}
                    defaultPage={props.initialPage}
                    withItemIndicator
                />
            </div>
        </div>
    );
}

export default Pagination;
