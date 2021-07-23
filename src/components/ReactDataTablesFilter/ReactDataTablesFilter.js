import { Button, TextInput } from "@trussworks/react-uswds";
import React from "react";

export const FilterComponent = ({ filterText, onSearch, title }) => (z
  <div className="width-full">
    <div className="filter-title clearfix font-heading-xl text-bold data-table-title tablet:font-heading-xl mobile:font-body-lg mobile:text-bold mobile:padding-bottom-4 mobile:padding-left-6 tablet:padding-left-0">
      {title}
    </div>
    <table className="float-right clearfix" role="presentation">
      <tbody>
        <tr>
          <td className="text-bold text-center">Filter by keyword:</td>
        </tr>
        <tr>
          <td>
            <TextInput
              id="txtSearchData"
              name="txtSearchData"
              type="text"
              placeholder="Keyword"
              aria-label="Search Input"
              value={filterText}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  onSearch();
                }
              }}
            />
          </td>
          <td>
            <Button
              type="button"
              onClick={onSearch}
              id="searchDataTableBTN"
              epa-testid="searchDataTableBTN"
              className="position-relative top-05 left-05"
            >
              Filter
            </Button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
);
