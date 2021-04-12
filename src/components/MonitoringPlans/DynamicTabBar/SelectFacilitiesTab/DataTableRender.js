import React from "react";
import UswdsTable from "../../../Common/Table/UswdsTable";
import "./DataTableRender.css";

const DataTableRender = ({
  columns,
  data,
  selectedRowHandler,
  openedFacilityTabs,
}) => {
  return (
    <div>
      <div className="selectFacilitiesTitle">
        <h2>Select Facilities</h2>
        <hr width="100%" align="center" />
      </div>
      <div className="tableContainerWS">
        <UswdsTable
          columns={columns}
          data={data}
          header
          bordered={false}
          paginate
          showEntries={[100, 250, 500]}
          search
          //editable
          openTabColumn={openedFacilityTabs}
          title="Facilities"
          selectedRowHandler={selectedRowHandler}
        />
      </div>
    </div>
  );
};

export default DataTableRender;
