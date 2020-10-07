import React from "react";
import { useTable, useSortBy, usePagination, useFilters } from "react-table";
import TableHeader from "./TableHeader";
import TableBody from "./TableBody";
import TablePagination from "./TablePagination/TablePagination";
import TablePaginationFilter from "./TablePaginationFilter/TablePaginationFilter";
import TableSearch from "./TableSearch/TableSearch";
import "./UswdsTable.css";
//import Search from "@trussworks/react-uswds/lib/components/Search/Search";
const UswdsTable = ({
  columns,
  data,
  bordered = false,
  caption,
  bodyRef,
  paginate,
  showEntries
}) => {
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
        // make search funcationality dynamic in component initialization 
        filters: [
          // make search object

        ],
        pageIndex: 0,
        pageSize: showEntries[0],
      },
    },
    useFilters,
    useSortBy,
    usePagination
  );

  const variant = bordered ? "usa-table" : "usa-table usa-table--borderless";

  return (
    <div className="container">
      {paginate ? (
        <div className="filterAndSearch">
          <span className="filter">
            <TablePaginationFilter
              setPageSize={setPageSize}
              pageSize={pageSize}
              paginationFiltering={[...showEntries, rows.length]}
            />
          </span>
          <div className="search">
            <TableSearch/>
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
            paginationFiltering={[...showEntries, rows.length]}
          />
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default UswdsTable;
