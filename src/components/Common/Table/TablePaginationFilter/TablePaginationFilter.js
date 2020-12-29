import React, { useState } from "react";
import { Button, Dropdown, Label } from "@trussworks/react-uswds";
import "./TablePaginationFilter.css";
const TablePaginationFilter = ({
  setPageSize,
  paginationFiltering,
  pageSize,
}) => {
  const [rowFilterAmount, setRowFilterAmount] = useState(
    paginationFiltering[0]
  );

  const rowChangeHandler = (amount) => {
    setRowFilterAmount(amount);
    console.log(amount);
  };
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
    <div className="filter">
      <div>
        <Label className="filterLabel" htmlFor="input-dropdown">
          Rows for table:
        </Label>
        
        <div className="filterSelect">
          <Dropdown
            data-testid="select-option"
            key={rowFilterAmount}
            value={rowFilterAmount}
            onChange={(e) => {
              // setPageSize(Number(e.target.value));
              rowChangeHandler(Number(e.target.value));
            }}
            id="input-dropdown"
            name="input-dropdown"
          >
            {paginationFiltering.map((size) => pageAmounts(size))}
          </Dropdown>

          <Button
            className="updateBTN"
            onClick={() => setPageSize(rowFilterAmount)}
            id="input-button"
          >
            Update
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TablePaginationFilter;
