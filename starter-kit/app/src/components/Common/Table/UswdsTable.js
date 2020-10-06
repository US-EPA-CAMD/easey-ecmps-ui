import React from "react";
import { useTable, useSortBy, usePagination } from "react-table";
import TableHeader from "./TableHeader";
import TableBody from "./TableBody";
import TablePagination from "./TablePagination/TablePagination";
import TablePaginationFilter from "./TablePaginationFilter/TablePaginationFilter";

const UswdsTable = ({ columns, data, bordered = false, caption, bodyRef }) => {
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
        pageSize: 100,
      },
    },

    useSortBy,
    usePagination
  );

  const variant = bordered ? "usa-table" : "usa-table usa-table--borderless";

  return (
    <div>

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
      <TablePaginationFilter
        setPageSize={setPageSize}
        pageSize={pageSize}
        paginationFiltering={[100, 250, 500, rows.length]}
      />
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
        paginationFiltering={[100, 250, 500, rows.length]}
      />
    </div>
  );
};

export default UswdsTable;
