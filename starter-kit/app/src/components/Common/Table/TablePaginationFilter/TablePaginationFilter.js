import React from "react";

import "./TablePaginationFilter.css";
const TablePaginationFilter = ({
  setPageSize,
  paginationFiltering,
  pageSize,
}) => {
  function pageAmounts(pageValue) {
    if (
      paginationFiltering.indexOf(pageValue) !==
      paginationFiltering.length - 1
    ) {
      return (
        <option key={pageValue} value={pageValue}>
          {pageValue}
        </option>
      );
    }
    return (
      <option key={pageValue} value={pageValue}>
        All
      </option>
    );
  }
  return (
    <div className="top">
      {"Show"}
      <select
        data-testid="select-option"
        className="form-control box"
        value={pageSize}
        onChange={(e) => {
          setPageSize(Number(e.target.value));
        }}
        style={{ width: "75px", height: "35px" }}
      >
        {paginationFiltering.map((pageSize) => pageAmounts(pageSize))}
      </select>
      {"Entries"}
    </div>
  );
};

export default TablePaginationFilter;
