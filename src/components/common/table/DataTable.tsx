import React, { useEffect, useState, useCallback } from 'react';
import { Table, Icon } from '@equinor/eds-core-react';
import { chevron_down, chevron_up, unfold_more } from '@equinor/eds-icons';
import { Pagination } from './Pagination';
import Cookies from 'js-cookie';

Icon.add({ chevron_down, chevron_up, unfold_more });

let prevPage;
let prevPerPage;

export const DataTable = (props) => {
    const {
        data,
        useExternalPagingAndSorting,
        setExternalPerPage,
        setExternalPageIndex,
        setExternalSortBy,
        externalTotalItems,
        columns,
        cookiePrefix,
        loading,
        abortAndSetNewController
    } = props;
    const columnsCookie = cookiePrefix + 'Columns';
    const perPageCookie = cookiePrefix + 'PerPage';
    const pageNumberCookie = cookiePrefix + 'PageNumber';
    const _columns = Cookies.get(columnsCookie);
    const columnsToUse = (columnsCookie && _columns && JSON.parse(_columns)) || columns;
    const [state, setState] = useState<{
        columns: any;
        cellValues?: string[][];
    }>({ columns: columnsToUse });
    const pageNumberFromCookie = Number(Cookies.get(pageNumberCookie));
    const [perPage, setPerPage] = useState(Number(Cookies.get(perPageCookie)) || 10);
    const [currentPageIndex, setCurrentPageIndex] = useState(pageNumberFromCookie || 1);
    const [viewableData, setViewableData] = useState([]);
    const [sortedData, setSortedData] = useState(data);
    const [updateTable, setUpdateTable] = useState(true);
    // const [showLoading, setShowLoading] = useState(false);
    const [columnHover, setColumnHover] = useState('');
    const [itemNumbers, setItemNumbers] = useState({
        start: 1,
        end: 10
    });

    const [hidePagination, setHidePagination] = useState(false);

    useEffect(() => {
        if (props.tableToPageOne) {
            props.setTableToPageOne(false);
            props.setFetchReports(true);
            forcePaginationToPage(1);
        }
    }, [props.tableToPageOne]);

    const forcePaginationToPage = (_pageNumber) => {
        setExternalPageIndex(_pageNumber - 1);
        setCurrentPageIndex(_pageNumber);
        setHidePagination(true);
        setTimeout(() => {
            setHidePagination(false);
        }, 10);
        Cookies.set(pageNumberCookie, _pageNumber, { expires: 365 });
    };

    useEffect(() => {
        if (useExternalPagingAndSorting && props.userHasAbortedRequest) {
            let newPerPage = prevPerPage || 10;

            if (prevPerPage < 10) {
                newPerPage = 10;
            }
            if (!props.tableToPageOne && newPerPage === perPage) {
                forcePaginationToPage(prevPage < 1 ? 1 : prevPage);
            } else {
                setPerPage(newPerPage);
                setExternalPerPage(newPerPage);
                Cookies.set(perPageCookie, newPerPage, { expires: 365 });
                if (currentPageIndex !== prevPage) {
                    forcePaginationToPage(prevPage < 1 ? 1 : prevPage);
                }
            }
            props.setUserHasAbortedRequest(false);
        }
    }, [props.userHasAbortedRequest, props.tableToPageOne]);

    useEffect(() => {
        if (!props.isFetchingAnyRequest && useExternalPagingAndSorting) {
            prevPage = currentPageIndex;
            prevPerPage = perPage;
        }
    }, [props.isFetchingAnyRequest]);

    const setAsSelected = () => {
        const _perPage = Number(Cookies.get(perPageCookie));
        if (!Number.isNaN(_perPage)) {
            setPerPage(_perPage);
        }
        if (useExternalPagingAndSorting) {
            if (_columns) {
                const sortByColumn = JSON.parse(_columns).find((col) => col.isSorted);
                setExternalSortBy(sortByColumn);
            }
        }
    };

    const changePage = (_pageIndex) => {
        if (_pageIndex === currentPageIndex) {
            return;
        }
        setCurrentPageIndex(_pageIndex);
        if (useExternalPagingAndSorting) {
            if (!props.isFetchingAnyRequest) {
                prevPage = currentPageIndex;
            }
            //we can assume that consumers of this component use 0-based page indexing

            setExternalPageIndex(_pageIndex - 1);
            props.setFetchReports(true);
            abortAndSetNewController();
        }
        Cookies.set(pageNumberCookie, _pageIndex, { expires: 365 });
    };

    const changePageSize = (_perPage) => {
        if (_perPage === perPage) {
            return;
        }
        setPerPage(_perPage);
        setCurrentPageIndex(0);

        if (useExternalPagingAndSorting) {
            if (!props.isFetchingAnyRequest) {
                prevPerPage = perPage;
            }

            abortAndSetNewController();
            setExternalPageIndex(0);
            setExternalPerPage(_perPage);
            props.setFetchReports(true);
        }
        Cookies.set(pageNumberCookie, 1, { expires: 365 });
        Cookies.set(perPageCookie, _perPage, { expires: 365 });
    };

    useEffect(() => {
        setAsSelected();
    }, []);

    const recalculateItemNumbers = () => {
        const firstItemInPageIndex = currentPageIndex === 1 ? 1 : perPage * (currentPageIndex - 1) + 1;
        const totalItems = useExternalPagingAndSorting ? externalTotalItems : data.length;

        setItemNumbers({
            start: firstItemInPageIndex,
            end: Math.min(firstItemInPageIndex + perPage - 1, totalItems)
        });
    };

    useEffect(() => {
        setUpdateTable(true);
        if (!useExternalPagingAndSorting) {
            setViewableData(returnSlicedData(sortedData));
        } else {
            recalculateItemNumbers();
        }
    }, [currentPageIndex, perPage, data]);

    // useEffect(() => {
    //     setCurrentPageIndex(1);
    //     if (useExternalPagingAndSorting) {
    //         //we can assume that consumers of this component use 0-based page indexing
    //         setExternalPageIndex(currentPageIndex - 1);
    //     }
    // }, [perPage]);

    const returnSlicedData = (_data) => {
        const firstItemInPageIndex = currentPageIndex === 1 ? 0 : perPage * (currentPageIndex - 1);
        recalculateItemNumbers();
        return _data.slice(firstItemInPageIndex, firstItemInPageIndex + perPage);
    };

    const onSortClick = (sortCol) => {
        setUpdateTable(true);
        const updateColumns =
            state.columns &&
            state.columns.map((col) => {
                if (sortCol.accessor === col.accessor) {
                    const isSorted = true;
                    let sortDirection = 'none';
                    switch (sortCol.sortDirection) {
                        case 'ascending':
                            sortDirection = 'descending';
                            break;
                        default:
                            sortDirection = 'ascending';
                            break;
                    }
                    //Use this if you want "none" to be a third state of the sorting
                    // case 'descending':
                    //     isSorted = false;
                    //     sortDirection = 'none';
                    //     break;

                    return {
                        ...sortCol,
                        isSorted,
                        sortDirection
                    };
                }
                return {
                    ...col,
                    isSorted: false,
                    sortDirection: col.sortDirection ? 'none' : undefined
                };
            });
        Cookies.set(columnsCookie, updateColumns);
        setState({ ...state, columns: updateColumns });
        const updatedColumn = updateColumns.find((col) => col.accessor === sortCol.accessor);
        if (useExternalPagingAndSorting) {
            setExternalSortBy(updatedColumn);
            abortAndSetNewController();
        }
    };

    const sortData = useCallback(
        (_viewableData) =>
            _viewableData.sort((right, left) => {
                const sortedCol = state.columns && state.columns.find((col) => col.isSorted);
                if (!sortedCol) {
                    return 1;
                }
                const { sortDirection, accessor } = sortedCol;
                let leftValue;
                let rightValue;
                //TODO: see if this can be improved. This handles accessors with nested properties
                const accessorArray = accessor.split('.');
                if (accessor.includes('.')) {
                    leftValue = left[accessorArray[0]][accessorArray[1]]
                        ? left[accessorArray[0]][accessorArray[1]].toString().toLowerCase()
                        : '';
                    rightValue = right[accessorArray[0]][accessorArray[1]]
                        ? right[accessorArray[0]][accessorArray[1]].toString().toLowerCase()
                        : '';
                } else {
                    leftValue = left[accessor] ? left[accessor].toString().toLowerCase() : '';
                    rightValue = right[accessor] ? right[accessor].toString().toLowerCase() : '';
                }

                if (sortDirection === 'ascending') {
                    return leftValue < rightValue ? 1 : -1;
                }
                if (sortDirection === 'descending') {
                    return leftValue > rightValue ? 1 : -1;
                }
                return {};
            }),
        [state.columns, data, props.listItems, viewableData]
    );

    useEffect(() => {
        if (columns) {
            if (!useExternalPagingAndSorting) {
                if (updateTable) {
                    const sorted = sortData(data);
                    setSortedData(data);
                    setState((prevState) => ({ ...prevState, cellValues: returnSlicedData(sorted) }));
                    setUpdateTable(false);
                }
            } else {
                setSortedData(data);
                recalculateItemNumbers();
                setState((prevState) => ({ ...prevState, cellValues: data }));
            }
        }
    }, [state.columns, setState, sortData, data]);

    const getColumnStyle = (col) => {
        return {
            ...col.style,
            background: !col.isSortable ? '#F7F7F7' : '',
            cursor: !col.isSortable ? 'default' : ''
        };
    };

    return (
        <>
            <Table style={{ width: '100%' }}>
                <Table.Head>
                    <Table.Row>
                        {state.columns.map((col) => (
                            <Table.Cell
                                scope="col"
                                sort={col.sortDirection}
                                key={'head-' + col.accessor + col.key}
                                onClick={col.sortDirection && col.isSortable ? () => onSortClick(col) : undefined}
                                style={getColumnStyle(col)}
                                data-cy={col.datacy}
                                onMouseEnter={() => setColumnHover(col.key)}
                                onMouseLeave={() => setColumnHover('')}
                            >
                                {col.name}
                                {col.isSortable && col.sortDirection === 'none' ? (
                                    <Icon
                                        style={{ fill: col.key !== columnHover ? 'lightgrey' : '' }}
                                        name="unfold_more"
                                    />
                                ) : (
                                    col.isSortable && (
                                        <Icon
                                            name={
                                                col.sortDirection === 'descending'
                                                    ? 'chevron_down'
                                                    : col.sortDirection === 'ascending'
                                                    ? 'chevron_up'
                                                    : 'unfold_more'
                                            }
                                        />
                                    )
                                )}
                            </Table.Cell>
                        ))}
                    </Table.Row>
                </Table.Head>
                <Table.Body style={{ opacity: loading ? '0.5' : '1' }}>
                    {state.cellValues && state.cellValues.length > 0 ? (
                        state.cellValues?.slice(0, perPage).map((row) => props.listItems(row))
                    ) : (
                        <Table.Row>
                            {columns.map((a, b) => {
                                if (b === 0) {
                                    return <Table.Cell key={1}>No items in table</Table.Cell>;
                                }
                                return <Table.Cell key={a.key} />;
                            })}
                        </Table.Row>
                    )}
                </Table.Body>
            </Table>
            {!hidePagination && (
                <Pagination
                    totalItems={useExternalPagingAndSorting ? externalTotalItems : data.length}
                    initialItemsPerPage={perPage}
                    initialPage={currentPageIndex}
                    onChangePage={(pageIndex) => {
                        changePage(pageIndex);
                    }}
                    onChangeItemsPerPage={(itemsPerPage) => {
                        changePageSize(itemsPerPage);
                    }}
                    itemNumbers={itemNumbers}
                />
            )}
        </>
    );
};

export default DataTable;
