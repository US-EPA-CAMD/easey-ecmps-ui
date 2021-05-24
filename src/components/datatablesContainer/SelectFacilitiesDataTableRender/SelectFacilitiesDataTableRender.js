import React, { useState } from "react";

import { TextInput, Button } from "@trussworks/react-uswds";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";

import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import { LatLngBounds } from "leaflet/dist/leaflet-src.esm";

const SelectFacilitiesDataTableRender = ({
  columns,
  data,
  selectedRowHandler,
  openedFacilityTabs,
}) => {
  const [filterText, setFilterText] = useState("");
  const [searchText, setSearchText] = useState("");
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
  const filteredItems = data.filter(
    (item) =>
      (item.col1 &&
        item.col1.toLowerCase().includes(searchText.toLowerCase())) ||
      (item.col2 &&
        item.col2.toLowerCase().includes(searchText.toLowerCase())) ||
      (item.col3 && item.col3.toLowerCase().includes(searchText.toLowerCase()))
  );

  const tableData = {
    columns,
    data,
  };

  const FilterComponent = ({ filterText, onSearch }) => (
    <div className="width-full">
      <div className="float-left clearfix font-heading-xl text-bold">
        Facilities
      </div>
      <table className="float-right clearfix">
        <tbody>
        <tr>
          <td className="text-bold">Filter by keyword:</td>
        </tr>
        <tr>
          <td>
            {" "}
            <TextInput
              id="txtSearchData"
              type="text"
              placeholder="Keyword"
              aria-label="Search Input"
              value={filterText}
            />
          </td>
          <td>
            <Button
              type="button"
              onClick={onSearch}
              className="position-relative top-05 left-05"
            >
              Filter
            </Button>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  );

  const subHeaderComponentMemo = React.useMemo(() => {
    const handleSearch = () => {
      setSearchText(document.querySelector("#txtSearchData").value);
    };

    return <FilterComponent onSearch={handleSearch} />;
  }, [resetPaginationToggle]);

  return (
    <div>
      <div className="padding-top-4 padding-left-2">
        <h2 className="padding-0">Select Facilities</h2>
        <hr width="100%" align="center" className="height-1px bg-base-light" />
      </div>
      <div>
        {tableData.data.length > 1 ? (
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
            className="data-display-table"
          />
        ) : (
          `Loading... Please wait...`
        )}

        {/*<UswdsTable
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
        />*/}
      </div>
    </div>
  );
};

export default SelectFacilitiesDataTableRender;
