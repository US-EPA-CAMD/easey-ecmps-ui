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
import { qaFlowRataRunProps } from "../../additional-functions/qa-dataTable-props";

const QADataTableRender = ({
  columnNames,
  actionColumnName,
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
      const header = document.querySelector('[role="heading"');

      if (header !== null) {
        header.remove();
      }
    });
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
    if(dataTableName === qaFlowRataRunProps().dataTableName){
      if(row.expandable)
        return renderExpandableIcon();
      else
        return null;
    }else{
      return renderExpandableIcon();
    }
    function renderExpandableIcon () {
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
    }
    
  };

  if (actionsBtn) {
    if (actionsBtn === "View") {
      columns.unshift({
        name: actionColumnName,
        button: true,
        width: user ? "20%" : `${columnWidth}%`,
        style: {
          justifyContent: "left",
          // width:'fit-content'
        },
        cell: (row, index) => {
          // *** normalize the row object to be in the format expected by DynamicTabs
          const normalizedRow = normalizeRowObjectFormat(row, columnNames);
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
                          "Edit"
                        )}
                        data-testid="Edit"
                      >
                        {"Edit"}
                      </Button>
                      <RemoveButton
                        row={row}
                        dataTableName={dataTableName}
                        onConfirm={() => onRemoveHandler(normalizedRow)}
                      />
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
                      "View"
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

const RemoveButton = ({ onConfirm, row, dataTableName }) => {
  return (
    <ConfirmActionModal
      buttonText="Remove"
      description="Are you sure you want to remove the selected data?"
      onConfirm={onConfirm}
      row={row}
      dataTableName={dataTableName}
    />
  );
};
