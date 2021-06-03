import React, { useState, useMemo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";

import DataTable from "react-data-table-component";
import { FilterComponent } from "../../ReactDataTablesFilter/ReactDataTablesFilter";
import { Preloader } from "../../Preloader/Preloader";

const SelectFacilitiesDataTableRender = ({ columns, data }) => {
  const [searchText, setSearchText] = useState("");

  const filteredItems = data.filter(
    (item) =>
      // *** filter column 1
      (item.col1 &&
        item.col1.toLowerCase().includes(searchText.toLowerCase())) ||
      // *** filter column 2
      (item.col2 &&
        item.col2.toLowerCase().includes(searchText.toLowerCase())) ||
      // *** filter column 3
      (item.col3 && item.col3.toLowerCase().includes(searchText.toLowerCase()))
  );

  const subHeaderComponentMemo = useMemo(() => {
    const handleSearch = () => {
      setSearchText(document.querySelector("#txtSearchData").value);
    };

    return <FilterComponent onSearch={handleSearch} title="Facilities" />;
  }, []);

  return (
    <div>
      <div className="padding-top-4 padding-left-2">
        <h2 className="padding-0">Select Facilities</h2>
        <hr width="100%" align="center" className="height-1px bg-base-light" />
      </div>
      <div aria-live="polite">
        {data.length > 1 ? (
          <DataTable
            defaultSortField="col1"
            fixedHeader={true}
            sortIcon={
              <FontAwesomeIcon
                icon={faCaretDown}
                className="margin-left-2 text-indigo"
              />
            }
            highlightOnHover={true}
            selectableRows={false}
            responsive={true}
            striped={true}
            pagination={true}
            columns={columns}
            data={filteredItems}
            subHeader={true}
            subHeaderComponent={subHeaderComponentMemo}
            paginationPerPage={100}
            paginationRowsPerPageOptions={[100, 200, 500]}
            paginationComponentOptions={{ rangeSeparatorText: "out of" }}
            className="data-display-table react-transition fade-in"
          />
        ) : (
          <div className="margin-y-9 padding-y-9 react-transition fade-in">
            <Preloader />
          </div>
        )}
      </div>
    </div>
  );
};

export default SelectFacilitiesDataTableRender;
