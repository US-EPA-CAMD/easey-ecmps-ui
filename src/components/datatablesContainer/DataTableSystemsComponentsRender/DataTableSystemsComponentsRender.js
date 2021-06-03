/*** global dependencies ***/
import React from "react";

/*** 3rd party packages ***/
import DataTable from "react-data-table-component";

/*** icons ***/
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";

import "../DataTableSystemsComponents/DataTableSystemsComponentsRender.scss";

const DataTableSystemsComponentsRender = ({ columns, data }) => {
  return (
    <div className="systemsCompTable">
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
  );
};

export default DataTableSystemsComponentsRender;
