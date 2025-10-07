import React, { useState, useEffect } from "react";
import { normalizeRowObjectFormat } from "../../additional-functions/react-data-table-component";
import "./QADataTableRender.scss";
import {
  changeGridCellAttributeValue,
  returnsFocusDatatableExpandBTN,
} from "../../additional-functions/ensure-508";
// *** local
import { oneSecond } from "../../config";
/*********** COMPONENTS ***********/
// *** 3rd party
import { Add, Remove, ArrowDownwardSharp } from "@material-ui/icons";
import { Button } from "@trussworks/react-uswds";
import DataTable from "react-data-table-component";
import {
  getEmptyRows,
  getTableRowActionAriaLabel,
  customSort,
  hasEvalStatusColumn
} from "../../utils/selectors/QACert/TestSummary";

import { cleanUp508, ensure508 } from "../../additional-functions/ensure-508";
import ConfirmActionModal from "../ConfirmActionModal/ConfirmActionModal";
import PropTypes from 'prop-types';

const QADataTableRender = ({
  columnNames,
  actionColumnName,
  title,
  columnWidth,
  openHandler,
  data,
  user,
  actionsBtn,
  expandableRowComp,
  expandableRowProps,
  onRemoveHandler,
  noDataComp,
  isCheckedOut,
  dataTableName,
  sectionSelect = null,
}) => {
  const columns = [];
  columnNames.forEach((name, index) => {
    switch (name) {
      default:
        columns.push({
          name: <span>{name}</span>,
          selector: (row) => row[`col${index + 1}`],
          sortable: true,
          wrap: true,
          width: `${columnWidth}%`,
          style: {
            justifyContent: "left",
          },
        });
        break;
    }
  });

  useEffect(() => {
    setTimeout(() => {
      ensure508(dataTableName, sectionSelect ? sectionSelect[1] : null);
    }, oneSecond);

    return () => {
      cleanUp508();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sectionSelect]);

  const [totalExpand, setTotalExpand] = useState([]);

  useEffect(() => {
    const emptyArr = [];
    for (let i = 0; i < data.length; i++) {
      emptyArr.push(0);
    }
    setTotalExpand(emptyArr);
    changeGridCellAttributeValue();
  }, [data]);

  const expandRowBTN = (index) => {
    const arr = [...totalExpand];
    // hasnt been touched or had been closed
    if (!totalExpand[index] || totalExpand[index] === 0) {
      arr[index] = 1;
    } else {
      // closes it
      arr[index] = 0;
    }
    setTotalExpand(arr);
  };

  const createExpandBTNS = (index, row) => {
    return !totalExpand[index] || totalExpand[index] === 0 ? (
      <Add
        className="expandBTN "
        onClick={() => {
          expandRowBTN(index);
          returnsFocusDatatableExpandBTN(
            dataTableName.replaceAll(" ", "-"),
            index,
            false,
            row.col1
          );
          row.expanded = true;
        }}
        onKeyPress={(event) => {
          if (event.key === "Enter") {
            expandRowBTN(index);
            returnsFocusDatatableExpandBTN(
              dataTableName.replaceAll(" ", "-"),
              index,
              false,
              row.col1
            );
            row.expanded = true;
          }
        }}
        title={`Click to expand row ${index + 1}`}
        name={`expand row ${index + 1}`}
        id={`expandRow${dataTableName.replaceAll(" ", "-")}${row.col1}${index + 1
          }`}
        aria-expanded={false}
        role="button"
        tabIndex="0"
        aria-hidden="false"
      />
    ) : (
      <Remove
        className="expandBTN "
        onClick={() => {
          expandRowBTN(index);
          returnsFocusDatatableExpandBTN(
            dataTableName.replaceAll(" ", "-"),
            index,
            true,
            row.col1
          );
          row.expanded = false;
        }}
        onKeyPress={(event) => {
          if (event.key === "Enter") {
            expandRowBTN(index);
            returnsFocusDatatableExpandBTN(
              dataTableName.replaceAll(" ", "-"),
              index,
              true,
              row.col1
            );
            row.expanded = false;
          }
        }}
        title={`Click to collapse row ${index + 1}`}
        name={`collapse row ${index + 1}`}
        id={`collapseRow${dataTableName.replaceAll(" ", "-")}${row.col1}${index + 1
          }`}
        role="button"
        tabIndex="0"
        aria-expanded={true}
        aria-hidden="false"
      />
    );
    
  };

  useEffect(() => {
    // Use a minimal timeout to run this code right after the DOM has updated
    const timerId = setTimeout(() => {
      // Find ALL column headers for the first column that are still focusable
      const focusableHeaders = document.querySelectorAll(
        'div[data-column-id="1"][role="columnheader"][tabindex="0"]',
      );

      // Loop through any that were found and fix them
      focusableHeaders.forEach(header => {
        header.setAttribute('tabindex', '-1');
      });
    }, 0); // A timeout of 0ms defers execution until the next event loop cycle

    // Cleanup function to clear the timeout if the component unmounts
    return () => {
      clearTimeout(timerId);
    };
  }, [data, totalExpand]);

  if (actionsBtn) {
    if (actionsBtn === "View") {
      columns.unshift({
        cell: (row, index) => {
          // *** normalize the row object to be in the format expected by DynamicTabs
          const normalizedRow = normalizeRowObjectFormat(row, columnNames);
          const rowNumber = index + 1;
          return (
            <div>
              {/* user is logged in and config is checked out */}
              {user && isCheckedOut ? (
                <div className="editViewExpandGroup ">
                  {data.length > 0 && (
                    <>
                      <Button
                        type="button"
                        epa-testid="btnOpen"
                        className="cursor-pointer open-modal-button text-no-wrap"
                        id={`btnEditView${dataTableName.replaceAll(" ", "-")}${index + 1
                          }`}
                        onClick={() => {
                          openHandler(normalizedRow, false, null, index);
                        }}
                        role="button"
                        aria-label={getTableRowActionAriaLabel(
                          dataTableName,
                          row,
                          "Edit",
                          rowNumber
                        )}
                        data-testid="Edit"
                      >
                        {"Edit"}
                      </Button>

                      {!row?.isSubmitted && (
                        <RemoveButton
                          rowNumber={rowNumber}
                          row={row}
                          dataTableName={dataTableName}
                          onConfirm={() => onRemoveHandler(normalizedRow)}
                        />
                      )}

                      {expandableRowComp ? createExpandBTNS(index, row) : null}
                    </>
                  )}
                </div>
              ) : (
                // user is not logged in (in public record)
                <div className="editViewExpandGroup ">
                  <Button
                    type="button"
                    epa-testid="btnOpen"
                    className="cursor-pointer open-modal-button text-no-wrap"
                    aria-label={getTableRowActionAriaLabel(
                      dataTableName,
                      row,
                      "View",
                      rowNumber
                    )}
                    outline={true}
                    id={`btnEditView${dataTableName.replaceAll(" ", "-")}${index + 1
                      }`}
                    onClick={() => {
                      openHandler(normalizedRow, false, null, index);
                    }}
                    role="button"
                  >
                    {"View"}
                  </Button>
                  {expandableRowComp ? createExpandBTNS(index, row) : null}
                </div>
              )}
            </div>
          );
        },
      });
    }
  }

  return (
    <div
      className="padding-3 qa-table-wrapper"
      id={dataTableName.replaceAll(" ", "-")}
    >
      <DataTable
        title = {title}
        subHeader
        subHeaderComponent={
         actionsBtn === "View" && 
            <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-start' }}>

        {actionColumnName}
        </div>
        }
        aria-label={dataTableName}
        sortIcon={<ArrowDownwardSharp className="margin-left-2 text-primary" />}
        className={`data-display-table react-transition fade-in`}
        columns={columns}
        data={
          data.length > 0
            ? data
            : user && isCheckedOut
              ? getEmptyRows(columns)
              : []
        }
        expandableRows={expandableRowComp ? expandableRowComp : false}
        expandableRowsHideExpander
        expandableRowExpanded={(row) => row.expanded}
        expandableRowsComponent={expandableRowComp ? expandableRowComp : false}
        expandableRowsComponentProps={expandableRowProps}
        noDataComponent={noDataComp}
        sortFunction={hasEvalStatusColumn(dataTableName) ? (rows, selector, direction) => customSort(rows, selector, direction, columns) : null}
      />
    </div>
  );
};

export default QADataTableRender;

const RemoveButton = ({ onConfirm, row, dataTableName, rowNumber }) => {
  return (
    <ConfirmActionModal
      buttonText="Remove"
      description="Are you sure you want to remove the selected data?"
      onConfirm={onConfirm}
      rowNumber={rowNumber}
      row={row}
      dataTableName={dataTableName}
    />
  );
};

RemoveButton.propTypes = {
  row: PropTypes.object.isRequired,
  rowNumber: PropTypes.number.isRequired,
  dataTableName:PropTypes.string.isRequired,
  onConfirm: PropTypes.func.isRequired
};
