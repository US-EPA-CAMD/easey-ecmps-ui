/*** global dependencies ***/
import React, { useState, useMemo } from "react";

/*** 3rd party packages ***/
import DataTable from "react-data-table-component";

/*** additional components to 3rd party packages ***/
import { FilterComponent } from "../../ReactDataTablesFilter/ReactDataTablesFilter";

/*** icons ***/
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";

/*** scss ***/
import "./DataTableSystemsRender.scss";

const DataTableSystemsRender = ({ columns, data }) => {
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
      (item.col3 &&
        item.col3.toLowerCase().includes(searchText.toLowerCase())) ||
      // *** filter column 4
      (item.col4 &&
        item.col4.toLowerCase().includes(searchText.toLowerCase())) ||
      // *** filter column 5
      (item.col5 &&
        item.col5.toLowerCase().includes(searchText.toLowerCase())) ||
      // *** filter column 2
      (item.col6 && item.col6.toLowerCase().includes(searchText.toLowerCase()))
  );

  const subHeaderComponentMemo = useMemo(() => {
    const handleSearch = () => {
      setSearchText(document.querySelector("#txtSearchData").value);
    };

    return <FilterComponent onSearch={handleSearch} title="" />;
  }, []);

  return (
    <div>
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
    </div>
  );
};

export default DataTableSystemsRender;
