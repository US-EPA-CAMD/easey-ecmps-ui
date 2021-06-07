/*** global dependencies ***/
import React from "react";

/*** 3rd party packages ***/
import DataTable from "react-data-table-component";
import { Button } from "@trussworks/react-uswds";

/*** icons ***/
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import "../DataTableSystemsComponents/DataTableSystemsComponentsRender.scss";

const DataTableSystemsComponentsRender = ({ columns, data, title }) => {
  return (
    <div className="systemsCompTable">
      <div className="padding-top-4 padding-left-2">
        <h2 className="padding-0">
          {title}
          {title.toLowerCase() === "fuel flows" ? (
            <Button
              type="button"
              test-id="btnAddFuelFlow"
              className="float-right clearfix margin-right-3"
              outline="true"
            >
              Add Fuel Flow
            </Button>
          ) : null}
        </h2>

        <hr width="100%" align="center" className="height-1px bg-base-light" />
      </div>
      <div aria-live="polite">
        <DataTable
          defaultSortField="col1"
          fixedHeader={true}
          sortIcon={
            <FontAwesomeIcon
              icon={faCaretDown}
              className="margin-left-2 text-indigo"
            />
          }
          highlightOnHover={true}
          selectableRows={false}
          responsive={true}
          striped={true}
          pagination={false}
          columns={columns}
          data={data}
          subHeader={false}
          paginationPerPage={100}
          paginationRowsPerPageOptions={[100, 200, 500]}
          paginationComponentOptions={{ rangeSeparatorText: "out of" }}
          className="data-display-table"
        />
      </div>
    </div>
  );
};

export default DataTableSystemsComponentsRender;
