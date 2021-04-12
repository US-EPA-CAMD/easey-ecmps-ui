import React from "react";
import UswdsTable from "../../../../../Common/Table/UswdsTable";
import "./DataTableMethodRender.css";

const DataTableMethodRender = ({ columns, data, selectedRowHandler }) => {
  return (
    <div className="tableContainerWS">
      <UswdsTable
        columns={columns}
        header
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

export default DataTableMethodRender;
