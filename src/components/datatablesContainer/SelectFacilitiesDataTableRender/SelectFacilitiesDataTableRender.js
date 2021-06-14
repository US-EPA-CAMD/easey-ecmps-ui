import React, { useState, useMemo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";

import DataTable from "react-data-table-component";
import { FilterComponent } from "../../ReactDataTablesFilter/ReactDataTablesFilter";
import { Preloader } from "../../Preloader/Preloader";
import DataTableConfigurations from "../DataTableConfigurations/DataTableConfigurations";
import InactivityTracker from "../../InactivityTracker/InactivityTracker";

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
  // columns.push({
  //   name: "Actions",
  //   button: true,
  //   width: "25%",
  //   cell: (row) => {
  //     // *** normalize the row object to be in the format expected by DynamicTabs
  //     const normalizedRow = normalizeRowObjectFormat(row, columnNames);

  //     return (
  //       <div
  //         role="button"
  //         className="cursor-pointer"
  //         onClick={() => selectedRowHandler(normalizedRow.cells)}
  //         tabIndex={0}
  //         aria-label={`open ${normalizedRow.col2} facility`}
  //         onKeyPress={(event) => {
  //           if (event.key === "Enter") {
  //             selectedRowHandler(normalizedRow.cells);
  //             handleEnterPress(normalizedRow);
  //           }
  //         }}
  //       >
  //         <img
  //           height="32px"
  //           width="32px"
  //           alt="Open Tab"
  //           src={`${process.env.PUBLIC_URL}/images/openTab.jpg`}
  //           className="margin-right-1"
  //         />
  //         Open
  //       </div>
  //     );
  //   },
  // });

  return (
    <div>
      <div className="padding-top-4 padding-left-2">
        <h2 className="padding-0">Select Facilities</h2>
        <hr width="100%" align="center" className="height-1px bg-base-light" />

        <InactivityTracker />
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
            expandableRowExpanded={row=>row.expanded}
            subHeader={true}
            subHeaderComponent={subHeaderComponentMemo}
            paginationPerPage={100}
            paginationRowsPerPageOptions={[100, 200, 500]}
            paginationComponentOptions={{ rangeSeparatorText: "out of" }}
            className="data-display-table react-transition fade-in"
            expandableRows
            expandableRowDisabled={row => row.disabled}
            expandableRowsComponent={<DataTableConfigurations />}
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
