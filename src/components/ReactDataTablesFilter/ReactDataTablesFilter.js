import { Search } from "@trussworks/react-uswds";
import React, { useEffect } from "react";

export const FilterComponent = ({ onSearch, title }) => {
useEffect(()=>{
  const searchButtons = document.querySelector("#filter-component-wrapper").getElementsByClassName("usa-search__submit-text");
  for (let i = 0; i < searchButtons.length; i++) {
    searchButtons[i].textContent = "Filter";
  }
},[]);

return(
  <div id="filter-component-wrapper" className="width-full">
    <h3 className="margin-top-5 text-bold mobile:font-body-xl mobile:text-bold mobile:padding-bottom-1">
      {title}
    </h3>
    <table
      className="float-right clearfix display-none tablet-lg:display-block"
      role="presentation"
    >
      <tbody>
        <tr>
          <td className="text-bold text-center padding-right-1">
            Filter by keyword:
          </td>
          <td>
            <Search
              inputId="search-data"
              label="Search Data Table"
              size="big"
              placeholder="Keyword"
              aria-label="Search Input"
              onSubmit={onSearch}
            />
          </td>
        </tr>
      </tbody>
    </table>

    <table
      className="float-right display-none tablet:display-block tablet-lg:display-none"
      role="presentation"
    >
      <tbody>
        <tr>
          <td className="text-bold font-body-xs">Filter by keyword:</td>
        </tr>
        <tr>
          <td>
            <Search
              inputId="search-data"
              label="Search Data Table"
              size="big"
              placeholder="Keyword"
              aria-label="Search Input"
              onSubmit={onSearch}
            />
          </td>
        </tr>
      </tbody>
    </table>

    <table
      className="margin-left-7 mobile-lg:display-block tablet:display-none"
      role="presentation"
    >
      <tbody>
        <tr>
          <td className="text-bold mobile-lg:padding-left-10 tablet:padding-left-5 mobile-lg:font-body-sm">
            Filter by keyword:
          </td>
        </tr>
        <tr>
          <td>
            <Search
              inputId="search-data"
              label="Search Data Table"
              size="small"
              placeholder="Keyword"
              aria-label="Search Input"
              onSubmit={onSearch}
            />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
)};
export default FilterComponent;
