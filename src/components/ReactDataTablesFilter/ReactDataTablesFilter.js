import { Button, TextInput } from "@trussworks/react-uswds";
import React from "react";

export const FilterComponent = ({ filterText, onSearch, title }) => (
  <div className="width-full">
    <div className="float-left clearfix font-heading-xl text-bold">{title}</div>
    <table className="float-right clearfix">
      <tbody>
        <tr>
          <td className="text-bold">Filter by keyword:</td>
        </tr>
        <tr>
          <td>
            {" "}
            <TextInput
              id="txtSearchData"
              type="text"
              placeholder="Keyword"
              aria-label="Search Input"
              value={filterText}
            />
          </td>
          <td>
            <Button
              type="button"
              onClick={onSearch}
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
