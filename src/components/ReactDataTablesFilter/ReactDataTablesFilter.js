import { Button, TextInput } from "@trussworks/react-uswds";
import React from "react";

export const FilterComponent = ({
  filterText,
  onSearch,
  title,
  setShowInactive,
}) => (
  <div className="width-full">
    <div className="filter-title clearfix font-heading-xl text-bold data-table-title tablet:font-heading-xl mobile:margin-left-3 mobile:font-body-lg mobile:text-bold mobile:padding-bottom-2 mobile:padding-left-6 tablet:padding-left-0">
      {title}{" "}
      {/*{title === "Select Configurations" ? (
        <Checkbox
          id="chkShowInactive"
          name="chkShowInactive"
          className="display-inline"
          title="Select this checkbox to display inactive facilities"
          label={
            <strong className="font-body-md text-normal line-height-2 position-relative top-neg-2px">
              Show Inactive
            </strong>
          }
        />
      ) : null}*/}
    </div>

    <table
      className="float-right clearfix display-none tablet:display-block"
      role="presentation"
    >
      <tbody>
        <tr>
          <td className="text-bold text-center padding-right-1">
            Filter by keyword:
          </td>
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
              className="position-relative top-05 left-neg-2px radius-left-0 "
            >
              Filter
            </Button>
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
          <td className="text-bold mobile-lg:padding-left-10 tablet:padding-left-0 mobile-lg:font-body-sm">
            Filter by keyword:
          </td>
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
              className="position-relative top-05 left-neg-1px"
            >
              Filter
            </Button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
);
