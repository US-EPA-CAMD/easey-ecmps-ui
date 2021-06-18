import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";

import DataTable from "react-data-table-component";

import { Preloader } from "../../Preloader/Preloader";

const DataTableConfigurationsRender = ({ columns, data }) => {
  return (
    <div>
      <div aria-live="polite" className="padding-left-4 padding-bottom-3">
        {data.length > 0 ? (
          <DataTable
            fixedHeader={true}
            sortIcon={
              <FontAwesomeIcon
                icon={faCaretDown}
                className="margin-left-2 text-indigo"
              />
            }
            defaultSortField="col2"
            highlightOnHover={true}
            selectableRows={false}
            responsive={true}
            striped={true}
            columns={columns}
            data={data}
            expandableRowExpanded={(row) => !row.disabled}
            className="data-display-table react-transition fade-in"
          />
        ) : (
          <div
            id="preloader"
            className="margin-y-9 padding-y-9 react-transition fade-in"
          >
            <Preloader />
          </div>
        )}
      </div>
    </div>
  );
};

export default DataTableConfigurationsRender;
