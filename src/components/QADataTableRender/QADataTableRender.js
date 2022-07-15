import React, { useState, useEffect } from "react";
import { normalizeRowObjectFormat } from "../../additional-functions/react-data-table-component";
import { Add, Remove } from "@material-ui/icons";
import "./QADataTableRender.scss";

// *** local
import { config, oneSecond } from "../../config";
// import { getLinearitySummary } from "../../../utils/selectors/QACert/LinearitySummary.js";
/*********** COMPONENTS ***********/
// *** 3rd party
import {
  ArrowDownwardSharp,
  CreateSharp,
  KeyboardArrowDownSharp,
  KeyboardArrowUpSharp,
  LockSharp,
} from "@material-ui/icons";
import { Button } from "@trussworks/react-uswds";
import DataTable from "react-data-table-component";

import { connect } from "react-redux";
import {
  cleanUp508,
  ensure508,
  addRowNumberAsScreenReaderLabelForExpandables,
} from "../../additional-functions/ensure-508";
import ConfirmActionModal from "../ConfirmActionModal/ConfirmActionModal";
import { deleteQATestSummary } from "../../utils/api/qaCertificationsAPI";

const QADataTableRender = ({
  columnNames,
  actionColumnName,
  columnWidth,
  openHandler,
  data,
  user,
  actionsBtn,
  expandableRowComp,
}) => {

  const columns = [];
  columnNames.forEach((name, index) => {
    switch (name) {
      default:
        columns.push({
          name,
          selector: `col${index + 1}`,
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
      ensure508();
    }, oneSecond);

    return () => {
      cleanUp508();
    };
  }, []);

  const [totalExpand, setTotalExpand] = useState([]);
  const [tableData, setTableData] = useState(data);

  useEffect(() => {
    const emptyArr = [];
    for (let i = 0; i < data.length; i++) {
      emptyArr.push(0);
    }
    //console.log("data", data);
    setTotalExpand(emptyArr);
    setTableData(data);
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
          row.expanded = true;
        }}
        onKeyPress={(event) => {
          if (event.key === "Enter") {
            expandRowBTN(index);
            row.expanded = true;
          }
        }}
        title={`Click to expand row ${index + 1}`}
        name={`expand row ${index + 1}`}
        id={`expandRow${index + 1}`}
        role="button"
        tabIndex="0"
        aria-hidden="false"
      />
    ) : (
      <Remove
        className="expandBTN "
        onClick={() => {
          expandRowBTN(index);
          row.expanded = false;
        }}
        onKeyPress={(event) => {
          if (event.key === "Enter") {
            expandRowBTN(index);
            row.expanded = false;
          }
        }}
        title={`Click to collapse row ${index + 1}`}
        name={`collapse row ${index + 1}`}
        id={`collapseRow${index + 1}`}
        role="button"
        tabIndex="0"
        aria-hidden="false"
      />
    );
  };
  if (actionsBtn) {
    if (actionsBtn === "View") {
      columns.unshift({
        name: actionColumnName,
        button: true,
        width: user ? "25%" : `${columnWidth}%`,
        style: {
          justifyContent: "left",
          // width:'fit-content'
        },
        cell: (row, index) => {
          // *** normalize the row object to be in the format expected by DynamicTabs
          const normalizedRow = normalizeRowObjectFormat(row, columnNames);
          return (
            <div>
              {/* user is logged in  */}
              {user ? (
                <div className="editViewExpandGroup ">
                  <Button>
                    Evaluate
                  </Button>
                  <Button
                    type="button"
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
                  >
                    {"Edit"}
                  </Button>
                  <RemoveButton
                    onConfirm={async () => {
                      const { id, locId } = row;
                      const deletedSuccessfully = await deleteQATestSummary(
                        locId,
                        id
                      );
                      if (!deletedSuccessfully) {
                        return;
                      }
                      setTableData((oldRows) =>
                        oldRows.filter((curRow) => curRow.id !== id)
                      );
                    }}
                  />

                  {createExpandBTNS(index, row)}
                </div>
              ) : (
                // user is not logged in (in public record)
                <div className="editViewExpandGroup ">
                  <Button
                    type="button"
                    epa-testid="btnOpen"
                    className="cursor-pointer open-modal-button"
                    outline={true}
                    id={
                      // tableTitle
                      //   ? `btnOpen${tableTitle.split(" ").join("")}`
                      // :
                      `btnOpen${row[`col${Object.keys(row).length - 1}`]}`
                    }
                    onClick={() => {
                      openHandler(normalizedRow, false);
                    }}
                  >
                    {"View"}
                  </Button>
                  {createExpandBTNS(index, row)}
                </div>
              )}
            </div>
          );
        },
      });
    }
  }

  return (
    <div aria-live="polite padding-3">
      <DataTable
        sortIcon={<ArrowDownwardSharp className="margin-left-2 text-primary" />}
        className={`data-display-table react-transition fade-in`}
        columns={columns}
        data={tableData}
        expandableRows
        expandableRowsHideExpander
        expandableRowExpanded={(row) => row.expanded}
        expandableRowsComponent={expandableRowComp}
      />
    </div>
  );
};

export default QADataTableRender;

const RemoveButton = ({ onConfirm }) => {
  return (
    <ConfirmActionModal
      buttonText="Remove"
      description="Are you sure you want to remove the selected data?"
      onConfirm={onConfirm}
    />
  );
};
