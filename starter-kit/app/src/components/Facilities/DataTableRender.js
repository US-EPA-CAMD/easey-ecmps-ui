import React from "react";
import UswdsTable from "../Common/Table/UswdsTable";
import "./DataTableRender.css";

const DataTableRender = ({ columns, data }) => {
  return (
    <div className="tableContainer">
      <p>
        <strong>Instructions:</strong> click on a facility name in the table to
        display detailed information.
      </p>
      <UswdsTable
        columns={columns}
        data={data}
        bordered={false}
        paginate
        showEntries={[100, 250, 500]}
      />
    </div>
  );
};

export default DataTableRender;
