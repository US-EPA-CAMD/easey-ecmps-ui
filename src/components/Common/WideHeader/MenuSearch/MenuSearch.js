import React, { useState } from "react";
import "./MenuSearch.css";
import { Button, Form } from "@trussworks/react-uswds";
const MenuSearch = () => {
  const [searchState, setSearchState] = useState("");

  const searchHandler = (val) => {
    setSearchState(val);
  };

  const onSearch = () => {
    window.open(
      "https://search.epa.gov/epasearch/?querytext=" + searchState,
      "_blank"
    );
    return false;
  };

  return (
    <div className="menuSearch">
      <div className="usa-search" role="search">
        <Form
          children={
            <div>
              <label data-testid="label" className="usa-sr-only" htmlFor="search-field">
                Search
              </label>
              <input
                id="search-field"
                name="input-search"
                data-testid="input-search"
                className="usa-input"
                type="search"
                value={searchState}
                placeholder={"Search EPA.gov"}
                onChange={(e) => {
                  searchHandler(e.target.value);
                }}
              />
            </div>
          }
        ></Form>
        <Button
          className="usa-search--big menuSearchBTN"
          type="submit"
          id="input-button-search"
          onClick={onSearch}
          data-testid="input-button-search"
        >
          <span className="usa-sr-only">Search</span>
        </Button>
      </div>
    </div>
  );
};

export default MenuSearch;
