/*********** FUNCTIONS / HOOKS / PLUGINS ***********/
// *** 3rd party
import React, { useState, useMemo, useEffect } from "react";

// *** local
import { config, oneSecond } from "../../config";
import { cleanUp508, ensure508 } from "../../additional-functions/ensure-508";
import { normalizeRowObjectFormat } from "../../additional-functions/react-data-table-component";

/*********** COMPONENTS ***********/
// *** 3rd party
import { Button } from "@trussworks/react-uswds";
import DataTable from "react-data-table-component";

// *** local
import { FilterComponent } from "../ReactDataTablesFilter/ReactDataTablesFilter";
import { Preloader } from "../Preloader/Preloader";

/*********** LOOKS AND DECORATION (ICONS, SCSS, ETC.) ***********/
// *** icons
import {
  ArrowDownwardSharp,
  CreateSharp,
  KeyboardArrowDownSharp,
  KeyboardArrowUpSharp,
  LockSharp,
} from "@material-ui/icons";

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
  addBtnName,
  uniqueKey,
  setShowInactive,
  openedFacilityTabs,
  setMostRecentlyCheckedInMonitorPlanId,
  setMostRecentlyCheckedInMonitorPlanIdForTab,
  setCheckout,
  setViewBtn,
  viewBtn,
  setAddBtn,

  // for 508
  openAndCheckoutBTNFocus,
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

    if (checkedOutLocations.length > 0) {
      result =
        checkedOutLocations
          .map((location) => location["checkedOutBy"])
          .indexOf(user.userId) > -1;
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
    if (checkedOutLocations && checkedOutLocations.length > 0) {
      if (isLocationCheckedOut(dataRowObject.row["facId"]) && user) {
        return (
          <>
            <LockSharp className="row-lock margin-right-1" />{" "}
            {dataRowObject.row["col1"]}
          </>
        );
      }
    }
    return <>{dataRowObject.row["col1"]}</>;
  };

  const AddPencil = (dataRowObject) => {
    if (checkedOutLocations && checkedOutLocations.length > 0) {
      if (isCurrentlyCheckedOutByUser(dataRowObject.row["monPlanId"])) {
        return (
          <>
            <CreateSharp className="row-lock margin-right-1" />{" "}
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

        let willAutoFocus;
        if (viewBtn && viewBtn === row[`col${Object.keys(row).length - 1}`]) {
          willAutoFocus = true;
        } else {
          willAutoFocus = false;
        }

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
                    id={
                      tableTitle
                        ? `btnOpen${tableTitle.split(" ").join("")}`
                        : `btnOpen`
                    }
                    onClick={() => openHandler(normalizedRow, false, false)}
                    aria-label={`open ${row["col1"]} `}
                  >
                    {"Open"}
                  </Button>

                  {/* display a checkout option only if no other locations are currently checked out by user */}
                  {isAnyLocationCheckedOutByUser() === false &&
                  isLocationCheckedOut(row["facId"]) === false ? (
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
                        aria-label={`open and checkout ${row.col1} `}
                      >
                        {"Open & Checkout"}
                      </Button>
                    </>
                  ) : /* display check in option only if THIS location is currently checked out by user */
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
                            ? `btnCheckBackIn${tableTitle.split(" ").join("")}`
                            : `btnCheckBackIn`
                        }
                        onClick={() => openHandler(normalizedRow, false, true)}
                        aria-label={`check back in ${row.col1} `}
                      >
                        {"Check Back In"}
                      </Button>
                    </>
                  ) : null}
                </div>
              ) : (
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
                  onClick={() => {
                    if (setViewBtn) {
                      setViewBtn(row[`col${Object.keys(row).length - 1}`]);
                    }
                    openHandler(normalizedRow, false);
                  }}
                  aria-label={
                    checkout
                      ? `view and/or edit ${row.col1}`
                      : `view ${row.col1}`
                  }
                  autoFocus={willAutoFocus}
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
                id={
                  tableTitle
                    ? `btnOpen${tableTitle.split(" ").join("")}`
                    : `btnOpen_${row[`col${Object.keys(row).length - 1}`]}`
                }
                className="cursor-pointer margin-left-2 open-modal-button"
                onClick={() => {
                  if (setViewBtn) {
                    setViewBtn(row[`col${Object.keys(row).length - 1}`]);
                  }
                  openHandler(normalizedRow, false);
                }}
                aria-label={
                  actionsBtn === `Open`
                    ? `Open ${row.col1}`
                    : `View ${row.col1}`
                }
                autoFocus={willAutoFocus}
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

    return (
      <FilterComponent
        onSearch={handleSearch}
        title={title}
        setShowInactive={setShowInactive}
      />
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const triggerAddBtn = (event) => {
    if (setAddBtn) {
      setAddBtn(event.target);
      setViewBtn(null);
    }
    addBtn(false, false, true);
  };

  return (
    <div className={`${componentStyling}`}>
      <div aria-live="polite" className={`${tableStyling}`}>
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
            <DataTable
              keyField={!uniqueKey ? `col${columnNames.length + 1}` : "col1"}
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
              {addBtn && checkout && user ? (
                <div className="padding-y-1">
                  <Button
                    type="button"
                    // test-id={tableTitle? `btnAdd${tableTitle.split(" ").join("")}`: `${sectionTitle.split(" ").join("")}`}
                    className="float-left clearfix margin-right-3"
                    outline="true"
                    color="black"
                    onClick={(event) => {
                      triggerAddBtn(event);
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
              <p>{"No data currently present"}</p>
            </div>
            <div className={`${headerStyling}`}>
              {addBtn && checkout && user ? (
                <h2 className="padding-0 page-subheader">
                  <div className="padding-y-1">
                    <Button
                      type="button"
                      // test-id={tableTitle? `btnAdd${tableTitle.split(" ").join("")}`: `${sectionTitle.split(" ").join("")}`}
                      className="float-left clearfix margin-right-3"
                      outline="true"
                      color="black"
                      onClick={(event) => {
                        triggerAddBtn(event);
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
    setCheckout: (value, configID) =>
      dispatch(setCheckoutState(value, configID)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(DataTableRender);
export { mapStateToProps };
export { mapDispatchToProps };
