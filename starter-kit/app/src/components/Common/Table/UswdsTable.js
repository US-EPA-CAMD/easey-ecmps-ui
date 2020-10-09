import React, { useState } from "react";
import {
  useTable,
  useSortBy,
  usePagination,
  useFilters,
  useGlobalFilter,
} from "react-table";
import TableHeader from "./TableHeader";
import TableBody from "./TableBody";
import TablePagination from "./TablePagination/TablePagination";
import TablePaginationFilter from "./TablePaginationFilter/TablePaginationFilter";
import TableSearch from "./TableSearch/TableSearch";
import "./UswdsTable.css";

// if showEntries is not supplied, by default will have show entries of only [100 and all data]
// each page will default to 10 per page if paginate is enabled
const UswdsTable = ({
  columns,
  data,
  bordered = false,
  caption,
  bodyRef,
  paginate,
  showEntries,
}) => {
  const [searchState, setSearchState] = useState("");
  // Use the state and functions returned from useTable to build UI
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    setGlobalFilter,
    state: { pageIndex, pageSize },
    // try to reduce consts in uswds component and put them in respective component via useTable();
  } = useTable(
    {
      columns,
      data,
      disableSortRemove: true,
      initialState: {
        sortBy: [
          {
            id: "col1",
            desc: false,
          },
        ],
        pageIndex: 0,
        pageSize: showEntries ? showEntries[0] : 10,
      },
    },
    useFilters,
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const variant = bordered ? "usa-table" : "usa-table usa-table--borderless";
  const handleSearch = (value) => {
    setSearchState(value);
  };

  return (
    <div className="container">
      {paginate ? (
        <div className="filterAndSearch">
          <span className="filter">
            <TablePaginationFilter
              setPageSize={setPageSize}
              pageSize={pageSize}
              paginationFiltering={
                showEntries ? [...showEntries, rows.length] : [100, rows.length]
              }
            />
          </span>
          <div className="search">
            <TableSearch
              handleSearch={handleSearch}
              searchState={searchState}
              setGlobalFilter={setGlobalFilter}
            />
          </div>
        </div>
      ) : (
        ""
      )}

      <table className={variant} {...getTableProps()}>
        <TableHeader headerGroups={headerGroups} />
        <TableBody
          bodyRef={bodyRef}
          getTableBodyProps={getTableBodyProps}
          headerGroups={headerGroups}
          rows={rows}
          page={page}
          prepareRow={prepareRow}
        />
      </table>
      <div className="paginateBar">
        {paginate ? (
          <TablePagination
            canPreviousPage={canPreviousPage}
            canNextPage={canNextPage}
            pageOptions={pageOptions}
            pageCount={pageCount}
            gotoPage={gotoPage}
            nextPage={nextPage}
            previousPage={previousPage}
            setPageSize={setPageSize}
            pageIndex={pageIndex}
            pageSize={pageSize}
            paginationFiltering={
              showEntries ? [...showEntries, rows.length] : [100, rows.length]
            }
          />
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default UswdsTable;
