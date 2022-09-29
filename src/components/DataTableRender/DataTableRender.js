/*********** FUNCTIONS / HOOKS / PLUGINS ***********/
// *** 3rd party
import React, { useState, useMemo, useEffect } from "react";

// *** local
import { config, oneSecond } from "../../config";
import {
  cleanUp508,
  ensure508,
  addScreenReaderLabelForCollapses,
} from "../../additional-functions/ensure-508";
import { normalizeRowObjectFormat } from "../../additional-functions/react-data-table-component";

/*********** COMPONENTS ***********/
// *** 3rd party
import { Button } from "@trussworks/react-uswds";
import DataTable from "react-data-table-component";

// *** local
import { FilterComponent } from "../ReactDataTablesFilter/ReactDataTablesFilter";
import { Preloader } from "@us-epa-camd/easey-design-system";

/*********** LOOKS AND DECORATION (ICONS, SCSS, ETC.) ***********/
// *** icons
import {
  ArrowDownwardSharp,
  CreateSharp,
  KeyboardArrowDownSharp,
  KeyboardArrowUpSharp,
  LockSharp,
} from "@material-ui/icons";

import { MONITORING_PLAN_STORE_NAME, EXPORT_STORE_NAME } from "../../additional-functions/workspace-section-and-store-names";
// *** scss
import "./DataTableRender.scss";
import { setCheckoutState } from "../../store/actions/dynamicFacilityTab";
import { connect } from "react-redux";

export const DataTableRender = ({
  sectionTitle,
  tableTitle,
  addBtn,
  columnNames,
  checkedOutLocations,
  data,
  user,
  dataLoaded,
  openHandler,
  checkout,
  actionsBtn,
  nonEditable,
  // for data table
  pagination,
  filter,
  expandableRowComp,
  defaultSort,
  expandableRows,
  headerStyling,
  tableStyling,
  componentStyling,
  // className,
  addBtnName,
  uniqueKey,
  setShowInactive,
  openedFacilityTabs,
  // setMostRecentlyCheckedInMonitorPlanId,
  // setMostRecentlyCheckedInMonitorPlanIdForTab,
  setCheckout,
  show = false,
  ariaLabel,
  noDataString = `No data currently present.`,

  // for 508
  openAndCheckoutBTNFocus,

  workspaceSection,
}) => {
  const ariaLabelProp = { "aria-label": ariaLabel };
  const [searchText, setSearchText] = useState("");
  const columns = [];
  useEffect(() => {
    setTimeout(() => {
      ensure508();
    }, oneSecond);

    return () => {
      cleanUp508();
      addScreenReaderLabelForCollapses();
    };
  }, []);
  useEffect(() => {
    if (openAndCheckoutBTNFocus) {
      setTimeout(() => {
        const x = document.querySelector(
          `[aria-label="${openAndCheckoutBTNFocus}"]`
        );
        if (x) {
          x.focus();
        }
      }, [2000]);
    }
  }, [openAndCheckoutBTNFocus]);

  const isLocationCheckedOut = (facilityId) => {
    return (
      checkedOutLocations
        .map((location) => location["facId"])
        .indexOf(parseInt(facilityId)) > -1
    );
  };

  const isAnyLocationCheckedOutByUser = () => {
    let result = false;
    if (workspaceSection !== EXPORT_STORE_NAME) {
      if (checkedOutLocations.length > 0) {
        result =
          checkedOutLocations
            .map((location) => location["checkedOutBy"])
            .indexOf(user.userId) > -1;
      }
    }
    return result;
  };

  const isCurrentlyCheckedOutByUser = (monitoringPlanId) => {
    let result = false;
    if (
      checkedOutLocations
        .map((location) => location["monPlanId"])
        .indexOf(monitoringPlanId) > -1 &&
      checkedOutLocations[
        checkedOutLocations
          .map((location) => location["monPlanId"])
          .indexOf(monitoringPlanId)
      ]["checkedOutBy"] === user["userId"]
    ) {
      result = true;
    }
    return result;
  };

  const AddLock = (dataRowObject) => {
    if (
      workspaceSection !== EXPORT_STORE_NAME &&
      checkedOutLocations &&
      checkedOutLocations.length > 0
    ) {
      if (isLocationCheckedOut(dataRowObject.row["facId"]) && user) {
        return (
          <>
            <LockSharp
              className="row-lock margin-right-1"
              aria-hidden="false"
              title={`Locked Facility - ${dataRowObject.row["col1"]}`}
              role="img"
            />{" "}
            {dataRowObject.row["col1"]}
          </>
        );
      }
    }
    return <>{dataRowObject.row["col1"]}</>;
  };

  const AddPencil = (dataRowObject) => {
    if (
      workspaceSection !== EXPORT_STORE_NAME &&
      checkedOutLocations &&
      checkedOutLocations.length > 0
    ) {
      if (isCurrentlyCheckedOutByUser(dataRowObject.row["monPlanId"])) {
        return (
          <>
            <CreateSharp
              aria-hidden="false"
              className="row-lock margin-right-1"
              title={`Checked-out Configuration - ${dataRowObject.row["col1"]}`}
              role="img"
            />{" "}
            {dataRowObject.row["col1"]}
          </>
        );
      }
    }
    return <>{dataRowObject.row["col1"]}</>;
  };

  columnNames.forEach((name, index) => {
    switch (name) {
      case "Facility":
        columns.push({
          name,
          selector: `col${index + 1}`,
          sortable: true,
          cell: (row) => <AddLock row={row} />,
        });
        break;

      case "Configurations":
        columns.push({
          name,
          selector: `col${index + 1}`,
          sortable: true,
          cell: (row) => <AddPencil row={row} />,
        });
        break;

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
          wrap: true,
        });
        break;
    }
  });
  if (actionsBtn) {
    if (actionsBtn === "Open") {
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
                // user is at the configuration table main page
                // needs 2 buttons, open and open and checkout
                actionsBtn === "Open" ? (
                  <div>
                    <Button
                      type="button"
                      unstyled="true"
                      epa-testid="btnOpen"
                      className="cursor-pointer open-modal-button"
                      id={
                        tableTitle
                          ? `btnOpen${tableTitle.split(" ").join("")}`
                          : `btnOpen`
                      }
                      onClick={() => openHandler(normalizedRow, false, false)}
                      aria-label={`open ${row["col1"]} in a new tab`}
                    >
                      {"Open"}
                    </Button>

                    {/* display a checkout option only if no other locations are currently checked out by user */}

                    {workspaceSection !== EXPORT_STORE_NAME &&
                    isAnyLocationCheckedOutByUser() === false &&
                    isLocationCheckedOut(row["facId"]) === false &&
                    row["col2"] === "Active" ? (
                      <>
                        <span className="margin-x-1">|</span>
                        <Button
                          type="button"
                          unstyled="true"
                          epa-testid="btnOpenAndCheckout"
                          className="cursor-pointer open-modal-button"
                          id={
                            tableTitle
                              ? `btnOpenAndCheckout${tableTitle
                                  .split(" ")
                                  .join("")}`
                              : `btnOpenAndCheckout`
                          }
                          onClick={() => openHandler(normalizedRow, true)}
                          aria-label={`open and checkout ${row.col1} in a new tab`}
                        >
                          {"Open & Checkout"}
                        </Button>
                      </>
                    ) : /* display check in option only if THIS location is currently checked out by user */
                    workspaceSection !== EXPORT_STORE_NAME &&
                      isCurrentlyCheckedOutByUser(row.col3) === true ? (
                      <>
                        <span className="margin-x-1">|</span>
                        <Button
                          type="button"
                          unstyled="true"
                          epa-testid="btnCheckBackIn"
                          className="cursor-pointer open-modal-button"
                          id={
                            tableTitle
                              ? `btnCheckBackIn${tableTitle
                                  .split(" ")
                                  .join("")}`
                              : `btnCheckBackIn`
                          }
                          onClick={() =>
                            openHandler(normalizedRow, false, true)
                          }
                          aria-label={`check back in ${row.col1} `}
                        >
                          {"Check Back In"}
                        </Button>
                      </>
                    ) : null}
                  </div>
                ) : (
                  <div></div>
                )
              ) : (
                // user is not logged in (in public record)
                <Button
                  type="button"
                  unstyled="true"
                  epa-testid="btnOpen"
                  id={
                    tableTitle
                      ? `btnOpen${tableTitle.split(" ").join("")}`
                      : `btnOpen_${row[`col${Object.keys(row).length - 1}`]}`
                  }
                  className="cursor-pointer margin-left-2 open-modal-button"
                  onClick={() => {
                    openHandler(normalizedRow, false);
                  }}
                  aria-label={`Open ${row.col1} in a new tab`}
                >
                  {"Open"}
                </Button>
              )}
            </div>
          );
        },
      });
    }
    if (actionsBtn === "View") {
      columns.unshift({
        name: "Actions",
        button: true,
        width: "15%",
        cell: (row) => {
          // *** normalize the row object to be in the format expected by DynamicTabs
          const normalizedRow = normalizeRowObjectFormat(row, columnNames);

          return (
            <div>
              {/* user is logged in  */}
              {user ? (
                <Button
                  type="button"
                  unstyled="true"
                  epa-testid="btnOpen"
                  className="cursor-pointer open-modal-button"
                  id={
                    // tableTitle
                    //   ? `btnOpen${tableTitle.split(" ").join("")}`
                    // :
                    `btnOpen${row[`col${Object.keys(row).length - 1}`]}`
                  }
                  onClick={() => {
                    openHandler(normalizedRow, false);
                  }}
                  aria-label={
                    checkout
                      ? `view and/or edit ${row.col1}`
                      : `view ${row.col1}`
                  }
                >
                  {checkout && !nonEditable ? "View / Edit" : "View"}
                </Button>
              ) : (
                // user is not logged in (in public record)
                <Button
                  type="button"
                  unstyled="true"
                  epa-testid="btnOpen"
                  id={
                    // tableTitle
                    //   ? `btnOpen${tableTitle.split(" ").join("")}`
                    // :
                    `btnOpen_${row[`col${Object.keys(row).length - 1}`]}`
                  }
                  className="cursor-pointer margin-left-2 open-modal-button"
                  onClick={() => {
                    openHandler(normalizedRow, false);
                  }}
                  aria-label={`View ${row.col1}`}
                >
                  {"View"}
                </Button>
              )}
            </div>
          );
        },
      });
    }
  }

  const resetExpandedRows = () => {
    const expandedRows = document.querySelectorAll(
      "[data-testid='expander-button-undefined']"
    );

    for (const row of expandedRows) {
      if (row["ariaLabel"].includes("Collapse")) {
        row.click();
      }
    }
  };

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
      } else if (
        currentElement.hasOwnProperty(prop) &&
        typeof currentElement[prop] === "number" &&
        prop === "col2" &&
        (currentElement[prop] + "").indexOf(searchText) > -1
      ) {
        return currentElement;
      }
    }
  };
  const filteredItems = data.filter(colsFilter);
  // const filteredItems = data.filter((row) => {
  //   const facilityStr = row.col1.toString().toLowerCase();
  //   const orisStr = row.col2.toString().toLowerCase();
  //   const searchStr = searchText.toLowerCase();
  //   return facilityStr.includes(searchStr) || orisStr.includes(searchStr);
  // });

  const subHeaderComponentMemo = useMemo(() => {
    //cannot unit test properly
    const handleSearch = () => {
      resetExpandedRows();
      setSearchText(document.querySelector("#txtSearchData").value);
    };

    let title = tableTitle ? tableTitle : "";

    if (title === "") {
      title = sectionTitle ? sectionTitle : null;
    }

    return (
      <FilterComponent
        onSearch={handleSearch}
        title={title}
        setShowInactive={setShowInactive}
      />
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className={`${componentStyling}`}>
      <div id="datatableFilterContainer" />
      <div
        aria-live="polite"
        className={`${tableStyling}`}
        id="datatableContainer"
      >
        {dataLoaded && data.length > 0 ? (
          <div>
            {tableTitle ? (
              <h3
                className={`margin-top-5 text-bold ${
                  tableStyling
                    ? "mobile:font-body-md mobile:text-bold"
                    : "mobile:font-body-xl mobile:text-bold"
                }`}
              >
                {tableTitle}
              </h3>
            ) : (
              ""
            )}
            <span data-aria-label={ariaLabel}></span>
            <DataTable
              keyField={!uniqueKey ? `col${columnNames.length + 1}` : "col1"}
              className={`data-display-table react-transition fade-in`}
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
              // expandableRowExpanded={(row) => row.expanded}
              subHeaderComponent={subHeaderComponentMemo}
              paginationPerPage={config.app.paginationPerPage}
              paginationRowsPerPageOptions={config.app.paginationPerPageOptions}
              paginationComponentOptions={{
                rangeSeparatorText: config.app.paginationRangeSeparatorText,
              }}
              onChangePage={() => {
                resetExpandedRows();
              }}
              expandableRowDisabled={(row) => row.disabled}
              expandableRowsComponent={expandableRowComp}
              expandableIcon={{
                collapsed: <KeyboardArrowDownSharp />,
                expanded: <KeyboardArrowUpSharp />,
              }}
              {...ariaLabelProp}
            />{" "}
            <div className={`${headerStyling}`}>
              {addBtn && checkout && user && !nonEditable ? (
                <div className="padding-y-1">
                  <Button
                    type="button"
                    // test-id={tableTitle? `btnAdd${tableTitle.split(" ").join("")}`: `${sectionTitle.split(" ").join("")}`}
                    className={"float-left clearfix margin-right-3 margin-y-1"}
                    outline="true"
                    color="black"
                    onClick={(event) => {
                      addBtn(false, false, true);
                    }}
                    id={
                      addBtnName.toLowerCase().split(" ").join("-") + "-add-btn"
                    }
                  >
                    {addBtnName}
                  </Button>
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
        ) : dataLoaded && data.length === 0 ? (
          <div>
            <h3
              className={`margin-top-5 text-bold ${
                tableStyling
                  ? "mobile:font-body-md mobile:text-bold"
                  : "mobile:font-body-xl mobile:text-bold"
              }`}
            >
              {tableTitle}
            </h3>
            <div className="text-center">
              <p>{noDataString}</p>
            </div>
            <div className={`${headerStyling}`}>
              {addBtn && checkout && user && !nonEditable ? (
                <h2 className="padding-0 page-subheader">
                  <div className="padding-y-1">
                    <Button
                      type="button"
                      // test-id={tableTitle? `btnAdd${tableTitle.split(" ").join("")}`: `${sectionTitle.split(" ").join("")}`}
                      className="float-left clearfix margin-right-3 margin-y-1"
                      outline="true"
                      color="black"
                      onClick={(event) => {
                        addBtn(false, false, true);
                      }}
                      id="addBtn"
                    >
                      {addBtnName}
                    </Button>
                  </div>{" "}
                </h2>
              ) : (
                ""
              )}
            </div>
          </div>
        ) : (
          <div className="margin-y-3 padding-y-3 react-transition fade-in font-body-sm width-full">
            <Preloader />
          </div>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    openedFacilityTabs: state.openedFacilityTabs,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setCheckout: (value, configID, workspaceSection) =>
      dispatch(setCheckoutState(value, configID, workspaceSection)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(DataTableRender);
export { mapStateToProps };
export { mapDispatchToProps };
