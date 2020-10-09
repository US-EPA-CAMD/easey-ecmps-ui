import React, { useState } from "react";

const TableSearch = ({ setGlobalFilter }) => {
  const [searchState, setSearchState] = useState("");

  const searchHandler = (val) => {
    setSearchState(val);
    setGlobalFilter(val || undefined);
  };

  return (
    <div>
      <form>
        <input className="searchBox"
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
