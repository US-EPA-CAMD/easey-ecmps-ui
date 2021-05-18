import React from "react";
import UswdsTable from "../../UswdsTable/UswdsTable";
import "./DataTableMethodRender.scss";

const DataTableMethodRender = ({ columns, data, selectedRowHandler }) => {
  return (
    <div>
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
