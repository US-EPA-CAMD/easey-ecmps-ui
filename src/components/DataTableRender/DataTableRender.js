import { config, oneSecond } from "../../config";

import React, { useState, useMemo, useEffect } from "react";
import { Button } from "@trussworks/react-uswds";
import DataTable from "react-data-table-component";
import './DataTableRender.scss'
import { FilterComponent } from "../ReactDataTablesFilter/ReactDataTablesFilter";
import { Preloader } from "../Preloader/Preloader";

import { cleanUp508, ensure508 } from "../../additional-functions/ensure-508";
import { normalizeRowObjectFormat } from "../../additional-functions/react-data-table-component";

import {
  ArrowDownwardSharp,
  KeyboardArrowDownSharp,
  KeyboardArrowUpSharp,
} from "@material-ui/icons";

/*** scss ***/

const DataTableRender = ({
  sectionTitle,
  tableTitle,
  addBtn,
  columnNames,
  data,
  user,
  dataLoaded,
  openHandler,
  checkout,
  actionsBtn,
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
  addBtnName
}) => {
  const [searchText, setSearchText] = useState("");
  const columns = [];

  useEffect(() => {
    setTimeout(() => {
      ensure508();
    }, oneSecond);

    return () => {
      cleanUp508();
    };
  }, []);

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
  if (actionsBtn) {
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
              actionsBtn === "Open" ? (
                <div>
                  <Button
                    type="button"
                    unstyled="true"
                    epa-testid="btnOpen"
                    className="cursor-pointer open-modal-button"
                    id="btnOpen"
                    onClick={() => openHandler(normalizedRow, false)}
                    aria-label={`open ${row.col1} `}
                    onKeyPress={(event) => {
                      if (event.key === "Enter") {
                        openHandler(row, false);
                      }
                    }}
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
                    aria-label={`open and checkout ${row.col1} `}
                    onKeyPress={(event) => {
                      if (event.key === "Enter") {
                        openHandler(normalizedRow, true);
                      }
                    }}
                  >
                    {"Open & Checkout"}
                  </Button>
                </div>
              ) : (
                <Button
                  type="button"
                  unstyled="true"
                  epa-testid="btnOpen"
                  className="cursor-pointer open-modal-button"
                  id="btnOpen"
                  onClick={() => openHandler(normalizedRow, false)}
                  aria-label={
                    checkout
                      ? `view and/or edit ${row.col1}`
                      : `view ${row.col1}`
                  }
                  onKeyPress={(event) => {
                    if (event.key === "Enter") {
                      openHandler(normalizedRow, false);
                    }
                  }}
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
                aria-label={
                  actionsBtn === `Open`
                    ? `Open ${row.col1}`
                    : `View ${row.col1}`
                }
                onKeyPress={(event) => {
                  if (event.key === "Enter") {
                    openHandler(row.col1, row.col2);
                  }
                }}
              >
                {actionsBtn === "Open" ? "Open" : "View"}
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
      <div aria-live="polite" className={`${tableStyling}`}>
        

        {dataLoaded && data.length > 0 ? (
          
          <div>
            <h3 className="margin-top-5">{tableTitle}</h3>
            <DataTable
              keyField="col1"
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
            />{" "}
            <div className={`${headerStyling}`}>
              <h2 className="padding-0 page-subheader">
                {addBtn && checkout && user ? (
                  <div className="padding-y-1">
                    <Button
                      type="button"
                      // test-id={tableTitle? `btnAdd${tableTitle.split(" ").join("")}`: `${sectionTitle.split(" ").join("")}`}
                      className="float-left clearfix margin-right-3"
                      outline="true"
                      color="black"
                      onClick={addBtn}
                    >
                      {addBtnName}
                    </Button>
                  </div>
                ) : (
                  ""
                )}
              </h2>
            </div>
          </div>
        ) : ((dataLoaded && data.length == 0 )? '':(
          <div className="margin-y-3 padding-y-3 react-transition fade-in font-body-sm width-full">
            <Preloader />
          </div>)
        )}
      </div>
    </div>
  );
};

export default DataTableRender;
