import React, {useState} from "react";

const TableSearch = () => {

const [searchState, setSearchState] = useState('');
const searchHandler = (val) => {
    console.log(val.target.value);
    setSearchState(val.target.value);
}
  return (
    <div>
      <form >
          <input
            type="text"
            value={searchState}
            placeholder='Search'
            onChange={searchHandler}
          />
      </form>
    </div>
  );
};

export default TableSearch;
