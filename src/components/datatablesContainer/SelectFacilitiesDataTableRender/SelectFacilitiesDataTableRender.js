import React from "react";
import UswdsTable from "../../UswdsTable/UswdsTable";

const SelectFacilitiesDataTableRender = ({
  columns,
  data,
  selectedRowHandler,
  openedFacilityTabs,
}) => {
  return (
    <div>
      <div className="padding-top-4 padding-left-2">
        <h2 className="padding-0">Select Facilities</h2>
        <hr width="100%" align="center" className="height-1px bg-base-light"/>
      </div>
      <div>
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

export default SelectFacilitiesDataTableRender;
