import React from "react";
import UswdsTable from "../../../../../Common/Table/UswdsTable";
import "./DataTableSystemsRender.css";

const DataTableSystemsRender = ({ columns, data, selectedRowHandler }) => {
  return (
    <div className="tableContainerWS">
      <UswdsTable
        columns={columns}
        data={data}
        bordered={false}
        // /paginate
        // showEntries={[10, 250, 500]}
        // search
        viewDataColumn
        // openTabColumn={[]}
        selectedRowHandler={selectedRowHandler}
      />
    </div>
  );
};

export default DataTableSystemsRender;
