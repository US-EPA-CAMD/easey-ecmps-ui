import React from "react";
import UswdsTable from "../../UswdsTable/UswdsTable";
import "./DataTableMatsRender.scss";

const DataTableMatsRender = ({ columns, data, selectedRowHandler }) => {
  return (
    <div>
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
