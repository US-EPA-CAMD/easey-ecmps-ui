import React, { useState } from "react";
import {
  useFilters,
  useGlobalFilter,
  useAsyncDebounce,
} from "react-table";
const TableSearch = ({
  setGlobalFilter,
}) => {
  const [searchState, setSearchState] = useState("");
  // handles the UI search bar
  const searchHandler = (val) => {
    setSearchState(val);
    setGlobalFilter(val || undefined);
  };
  // handles the data search functionality 
  // const onChange = useAsyncDebounce((globalFilter) => {
  //   setGlobalFilter(globalFilter || undefined);
  // }, 200);

  return (
    <div>
      <form>
        <input
          type="text"
          value={searchState}
          placeholder="Search"
          onChange={(e) => {
            searchHandler(e.target.value);
            //onChange(e.target.value);
            searchHandler(e.target.value);
          }}
        />
      </form>
    </div>
  );
};

export default TableSearch;