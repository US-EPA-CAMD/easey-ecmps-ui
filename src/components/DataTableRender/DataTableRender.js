import React, { useState, useMemo, useEffect } from "react";
import { Button } from "@trussworks/react-uswds";
import { normalizeRowObjectFormat } from "../../additional-functions/react-data-table-component";
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
  columnNames,
  data,
  user,
  dataLoaded,
  openHandler,
  selectedRowHandler,
  checkout,
  actionsBTN,
  // for data table
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
  useEffect(() => {
    setSearchText("");
  }, [dataLoaded]);
  const columns = [];
  columnNames.forEach((name, index) => {
    switch (name) {
      case "ORIS":
        columns.push({
          name,
          selector: `col${index + 1}`,
          sortable: true,
          sortFunction: (a, b) =>
            parseFloat(a[`col${index + 1}`]) - parseFloat(b[`col${index + 1}`]),
        });
        break;
      default:
        columns.push({
          name,
          selector: `col${index + 1}`,
          sortable: true,
        });
        break;
    }
  });
  if (actionsBTN) {
    columns.push({
      name: "Actions",
      button: true,
      width: "25%",
      cell: (row) => {
        // *** normalize the row object to be in the format expected by DynamicTabs
        const normalizedRow = normalizeRowObjectFormat(row, columnNames);
        return (
          <div>
            {/* user is logged in  */}
            {user ? (
              // user is at the configuration table
              // needs 2 buttons, open and open and checkout
              // user is at a section table, it only says view/edit if checked out
              // or just view if not checked out
              actionsBTN === "Open" ? (
                <div>
                  <Button
                    type="button"
                    unstyled="true"
                    epa-testid="btnOpen"
                    className="cursor-pointer open-modal-button"
                    id="btnOpen"
                    onClick={() => openHandler(row, false)}
                    // aria-label={`open method ${row.col1} `}
                  >
                    {"Open"}
                  </Button>
                  {/* checks out when a user is logged in  */}
                  {" | "}
                  <Button
                    type="button"
                    unstyled="true"
                    epa-testid="btnOpenAndCheckout"
                    className="cursor-pointer open-modal-button"
                    id="btnOpenAndCheckout"
                    onClick={() => openHandler(normalizedRow, true)}
                    aria-label={`open method ${row.col1} `}
                  >
                    {"Open & Checkout"}
                  </Button>
                </div>
              ) : (
                // actionbtn = "view"
                <Button
                  type="button"
                  unstyled="true"
                  epa-testid="btnOpen"
                  className="cursor-pointer open-modal-button"
                  id="btnOpen"
                  onClick={() => openHandler(normalizedRow, false)}
                  aria-label={`open method ${row.col1} `}
                >
                  {checkout ? "View / Edit" : "View"}
                </Button>
              )
            ) : (
              // user is not logged in (in public record)
              <Button
                type="button"
                unstyled="true"
                epa-testid="btnOpen"
                id="btnOpen"
                className="cursor-pointer margin-left-2 open-modal-button"
                onClick={() => openHandler(normalizedRow, false)}
                aria-label={`edit method ${row.col1} `}
              >
                {actionsBTN === "Open" ? "Open" : "View"}
              </Button>
            )}
          </div>
        );
      },
    });
  }
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
    //cannot unit test properly
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
                // test-id={tableTitle? `btnAdd${tableTitle.split(" ").join("")}`: `${sectionTitle.split(" ").join("")}`}
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
        {dataLoaded && data.length >= 0 ? (
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
