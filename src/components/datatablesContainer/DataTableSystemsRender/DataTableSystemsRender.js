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
  // *** needed for search dataset functionality
  const [searchText, setSearchText] = useState("");

  // *** contains dataset with current filter applied (default is blank)
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

  // *** subheader component (title and search)
  const subHeaderComponentMemo = useMemo(() => {
    // *** NOTE: driving off of the value in DOM makes the code a lot less complex, in this case
    // *** since the component is re-rendered on every state operation.  we're not MANIPULATING DOM,
    // *** just using what is presently there to avoid multiple state functions / values / logic cases
    const handleSearch = () => {
      setSearchText(document.querySelector("#txtSearchData").value);
    };

    // *** output filter component (title is optional)
    return <FilterComponent onSearch={handleSearch} title="" />;
  }, []);

  return (
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
  );
};

export default DataTableSystemsRender;
