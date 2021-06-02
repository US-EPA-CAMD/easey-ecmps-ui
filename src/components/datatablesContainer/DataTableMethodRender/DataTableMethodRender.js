/*** global dependencies ***/
import React from "react";
/*** 3rd party packages ***/
import DataTable from "react-data-table-component";

/*** icons ***/
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";

/*** scss ***/
import "./DataTableMethodRender.scss";

const DataTableMethodRender = ({ columns, data }) => {
  return (
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
      className="data-display-table"
    />
  );
};

export default DataTableMethodRender;
