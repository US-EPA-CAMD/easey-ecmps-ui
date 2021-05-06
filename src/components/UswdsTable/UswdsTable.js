import React, { useState, useEffect } from "react";
import {
  useTable,
  useSortBy,
  usePagination,
  useFilters,
  useGlobalFilter,
  useRowSelect,
} from "react-table";
import { Button } from "@trussworks/react-uswds";

import TableHeader from "../TableHeader/TableHeader";
import TableBody from "../TableBody/TableBody";
import TablePagination from "../TablePagination/TablePagination";
import TablePaginationFilter from "../TablePaginationFilter/TablePaginationFilter";
import TableSearch from "../TableSearch/TableSearch";
import { EditableCell, setEditable } from "../TableCell/TableCell";
import "./UswdsTable.scss";

// if showEntries is not supplied, by default will have show entries of only [100 and all data]
// first page will default to all data if BOTH pagination and showentries are not supplied
const UswdsTable = ({
  title,
  columns,
  data,
  bordered = false,
  caption,
  paginate, // enables pagination bar under data table
  search, // enables search bar
  showEntries, // shows entries drop down per page
  disabledColumnFilters, // disable specific columns via using array [1,2] -> disables columns 2 and 3
  selectedRowHandler, // makes a row clickable without the need of a visable button
  dataSelector, // a specific filter header value that we want to return via selectedRowHandler/viewDataHandler. by default it is the first column header
  defaultSelect, //
  editable, // makes data table editable
  viewDataColumn, // creates a view /open all tabs column
  openTabColumn,
  viewDataHandler, // handles the view/ open all tabs column
  openModal, // handles opening the modal for a section
  header, // handles header section ( just for the systems data right now )
  addBTN,
}) => {
  if (disabledColumnFilters) {
    if (disabledColumnFilters.length >= 1) {
      disabledColumnFilters.map((column) => {
        columns[column] = { ...columns[column], disableGlobalFilter: true };
      });
    }
  }
  setEditable(editable);
  const [editableData, setEditableData] = useState(data);

  useEffect(() => {
    setEditableData(data);
  }, [data]);
  const [tabFocus, setTabFocus] = useState(false);
  const resetTabFocusHandler = (event) => {
    setTabFocus(event);
  };
  // const updateData = (rowIndex, columnId, value) => {
  //   setEditableData((old) =>
  //     old.map((row, index) => {
  //       if (index === rowIndex) {
  //         return {
  //           ...old[rowIndex],
  //           [columnId]: value,
  //         };
  //       }
  //       return row;
  //     })
  //   );
  //   // use below to retreive/manipulate updated data
  //   data = editableData;
  // };

  const defaultColumn = {
    Cell: EditableCell,
  };

  // Use the state and functions returned from useTable to build UI
  const {
    // getTableProps,
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
    toggleRowSelected,
    toggleAllRowsSelected,
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
        //9999 is bad practice, -1 works to show all data, but removes 1 data row for some reason
        pageSize: paginate && showEntries ? showEntries[0] : 9999,
      },
      defaultColumn,
      // updateData,
    },
    useFilters,
    useGlobalFilter,
    useSortBy,
    usePagination,
    useRowSelect
  );

  const variant = bordered ? "usa-table" : "usa-table usa-table--borderless";

  return (
    <div className="container">
      <div className="tableHead">
        <h3 className="tableTitle"> {title}</h3>
        <div className="filterAndSearch">
          {paginate ? (
            <span className="filter">
              <TablePaginationFilter
                setPageSize={setPageSize}
                pageSize={pageSize}
                paginationFiltering={
                  showEntries
                    ? [...showEntries, rows.length]
                    : [100, rows.length]
                }
              />
            </span>
          ) : (
            ""
          )}

          {search ? (
            <div className="search">
              <TableSearch title={title} setGlobalFilter={setGlobalFilter} />
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
      <table className={variant}
      // {...getTableProps()}
      >
        {header ? (
          <TableHeader
            headerGroups={headerGroups}
            viewDataColumn={viewDataColumn}
            openTabColumn={openTabColumn}
          />
        ) : (
          ""
        )}
        <TableBody
          selectedRowHandler={selectedRowHandler}
          dataSelector={dataSelector}
          defaultSelect={defaultSelect}
          getTableBodyProps={getTableBodyProps}
          headerGroups={headerGroups}
          rows={rows}
          page={page}
          prepareRow={prepareRow}
          toggleRowSelected={toggleRowSelected}
          toggleAllRowsSelected={toggleAllRowsSelected}
          viewDataColumn={viewDataColumn}
          viewDataHandler={viewDataHandler}
          openTabColumn={openTabColumn}
          openModal={openModal}
          tabFocus={tabFocus}
          resetTabFocusHandler={resetTabFocusHandler}
        />
      </table>
      <span> {caption} </span>
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
            resetTabFocusHandler={resetTabFocusHandler}
            paginationFiltering={
              showEntries ? [...showEntries, rows.length] : [100, rows.length]
            }
          />
        ) : (
          ""
        )}
        {addBTN ? (
          <div className="filterAdd">
            <Button className="addCompBTN align-right">Add Component</Button>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default UswdsTable;
