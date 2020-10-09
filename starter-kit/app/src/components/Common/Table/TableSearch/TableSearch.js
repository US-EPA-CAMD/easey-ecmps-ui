import React, { useState } from "react";
import {
  useTable,
  useSortBy,
  usePagination,
  useFilters,
  useGlobalFilter,
  useAsyncDebounce,
} from "react-table";
const TableSearch = ({
  globalFilter,
  setGlobalFilter,
  handleSearch,
}) => {
  const [searchState, setSearchState] = useState("");
  const searchHandler = (val) => {
    setSearchState(val.target.value);
    handleSearch(searchState);
  };

  const onChange = useAsyncDebounce((globalFilter) => {
    setGlobalFilter(globalFilter || undefined);
  }, 200);
  return (
    <div>
      <form>
        <input
          type="text"
          value={searchState}
          placeholder="Search"
          onChange={(e) => {
            searchHandler(e);
            onChange(e.target.value);
          }}
        />
      </form>
    </div>
  );
};

export default TableSearch;
