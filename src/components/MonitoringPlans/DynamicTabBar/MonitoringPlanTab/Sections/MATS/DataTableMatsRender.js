import React from "react";
import UswdsTable from "../../../../../Common/Table/UswdsTable";
import "./DataTableMatsRender.css";

const DataTableMatsRender = ({ columns, data, selectedRowHandler }) => {
  return (
    <div className="tableContainerWS">
      <UswdsTable
      header
        columns={columns}
        data={data}
        bordered={false}
        // /paginate
        // showEntries={[10, 250, 500]}
        // search
        // viewDataColumn
        selectedRowHandler={selectedRowHandler}
      />
    </div>
  );
};

export default DataTableMatsRender;
