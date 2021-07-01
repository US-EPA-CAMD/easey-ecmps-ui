import React, { useState, useMemo } from "react";
import { Button } from "@trussworks/react-uswds";

import DataTable from "react-data-table-component";
import { FilterComponent } from "../ReactDataTablesFilter/ReactDataTablesFilter";
import { Preloader } from "../Preloader/Preloader";

import {
  ArrowDownwardSharp,
  KeyboardArrowDownSharp,
  KeyboardArrowUpSharp,
} from "@material-ui/icons";

import config from "../../config";

/*** scss ***/

const DataTableRender = ({
  sectionTitle,
  tableTitle,
  button,
  columns,
  data,
  user,
  dataLoaded,

  selectedRowHandler,
  pagination,
  filter,
  expandableRowComp,
  defaultSort,
  expandableRows,
  headerStyling,
  tableStyling,
  componentStyling,
  className,
}) => {
  const [searchText, setSearchText] = useState("");

  const colsFilter = (currentElement) => {
    for (const prop in currentElement) {
      // filters out any boolean properties in the data since it does
      // not work with toLowercase and includes
      if (
        currentElement.hasOwnProperty(prop) &&
        typeof currentElement[prop] === "string" &&
        currentElement[prop].toLowerCase().includes(searchText.toLowerCase())
      ) {
        return currentElement;
      }
    }
  };
  const filteredItems = data.filter(colsFilter);
  const subHeaderComponentMemo = useMemo(() => {
    const handleSearch = () => {
      setSearchText(document.querySelector("#txtSearchData").value);
    };

    let title = tableTitle ? tableTitle : "";

    if (title === "") {
      title = sectionTitle ? sectionTitle : null;
    }

    return <FilterComponent onSearch={handleSearch} title={title} />;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={`${componentStyling}`}>
      <div className={`${headerStyling}`}>
        <h2 className="padding-0 page-subheader">
          {button && data.length ? (
            <div className="padding-y-1">
              <Button
                type="button"
                test-id={`btnAdd${tableTitle.split(" ").join("")}`}
                className="float-right clearfix margin-right-3"
                outline="true"
              >
                Add {tableTitle}
              </Button>
            </div>
          ) : (
            ""
          )}
        </h2>
      </div>
      <div aria-live="polite" className={`${tableStyling}`}>
        {dataLoaded && data.length>= 0 ? (
          <DataTable
            className={`data-display-table react-transition fade-in ${className}`}
            sortIcon={
              <ArrowDownwardSharp className="margin-left-2 text-primary" />
            }
            // props
            defaultSortField={defaultSort ? defaultSort : "col1"}
            expandableRows={expandableRows}
            pagination={pagination}
            columns={columns}
            data={filteredItems}
            subHeader={filter}
            ////
            fixedHeader={true}
            noHeader={true}
            highlightOnHover={true}
            selectableRows={false}
            responsive={true}
            striped={true}
            persistTableHead={false}
            // based on props
            expandableRowExpanded={(row) => row.expanded}
            subHeaderComponent={subHeaderComponentMemo}
            paginationPerPage={config.app.paginationPerPage}
            paginationRowsPerPageOptions={config.app.paginationPerPageOptions}
            paginationComponentOptions={{
              rangeSeparatorText: config.app.paginationRangeSeparatorText,
            }}
            expandableRowDisabled={(row) => row.disabled}
            expandableRowsComponent={expandableRowComp}
            expandableIcon={{
              collapsed: <KeyboardArrowDownSharp />,
              expanded: <KeyboardArrowUpSharp />,
            }}
          />
        ) : (
          <div className="margin-y-3 padding-y-3 react-transition fade-in font-body-sm width-full">
            <Preloader />
          </div>
        )}
      </div>
    </div>
  );
};

export default DataTableRender;
