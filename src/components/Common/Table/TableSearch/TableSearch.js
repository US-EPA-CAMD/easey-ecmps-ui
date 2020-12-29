import React, { useState } from "react";
import './TableSearch.css';
const TableSearch = ({ setGlobalFilter,title }) => {
  const [searchState, setSearchState] = useState("");

  const searchHandler = (val) => {
    setSearchState(val);
    setGlobalFilter(val || undefined);
  };
  return (
    <div >
     {title ?
         <div className="searchBar">Search {title.toLowerCase()} :</div> : ''}
      <form>
        <input className="searchBox"
          type="text"
          value={searchState}
          placeholder={title ? "": "Search"}
          onChange={(e) => {
            searchHandler(e.target.value);
          }}
        />
      </form>
    </div>
  );
};

export default TableSearch;
