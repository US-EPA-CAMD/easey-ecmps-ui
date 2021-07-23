import React, { useState } from "react";
import "./MenuSearch.scss";
import { Button, Form, TextInput } from "@trussworks/react-uswds";
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
          // onSubmit={() => {
          //   void 0;
          // }}
          children={
            <div>
              <label
                data-testid="label"
                className="usa-sr-only"
                htmlFor="search-field"
              >
                Search
              </label>
              <TextInput
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
        />
        <Button
          className="usa-search--big bg-primary-vivid"
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
