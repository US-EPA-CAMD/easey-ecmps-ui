import React from "react";
import UswdsTable from "../../../Common/Table/UswdsTable";
import "./DataTableRender.css";

const DataTableRender = ({ columns, data, selectedRowHandler }) => {
  return (
    <div className="tableContainerWS">
      <UswdsTable
        columns={columns}
        data={data}
        bordered={false}
        paginate
        showEntries={[10, 250, 500]}
        search
        //editable
        viewDataColumn
        title="Facilities"
        selectedRowHandler={selectedRowHandler}
      />
    </div>
  );
};

export default DataTableRender;
