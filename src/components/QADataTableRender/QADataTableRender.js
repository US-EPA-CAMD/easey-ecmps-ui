import React, { useState, useMemo, useEffect } from "react";
import { normalizeRowObjectFormat } from "../../additional-functions/react-data-table-component";
import { Remove } from "@material-ui/icons";

import { dataColumnSwap } from "../../additional-functions/datatable-swap";
// import { getLinearitySummary } from "../../../utils/selectors/QACert/LinearitySummary.js";
/*********** COMPONENTS ***********/
// *** 3rd party

import { Button } from "@trussworks/react-uswds";
import DataTable from "react-data-table-component";

import { connect } from "react-redux";

const QADataTableRender = ({
  columnNames,

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
        });
        break;
    }
  });

  useEffect(() => {
    // dataColumnSwap();

    const table = document.querySelector(`[role="table"]`);
    console.log('table',table);
  }, []);
  if (actionsBtn) {
    if (actionsBtn === "View") {
      columns.unshift({
        name: "Actions",
        button: true,
        width: "10%",
        cell: (row) => {
          // *** normalize the row object to be in the format expected by DynamicTabs
          const normalizedRow = normalizeRowObjectFormat(row, columnNames);

          return (
            <div>
              {/* user is logged in  */}
              {user ? (
                <div>
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
                      // openHandler(normalizedRow, false);
                    }}
                  >
                    {"Edit"}
                  </Button>

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
                      // openHandler(normalizedRow, false);
                    }}
                  >
                    {"Remove"}
                  </Button>
                </div>
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
                    // openHandler(normalizedRow, false);
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

  return <DataTable columns={columns} data={data} expandableRows />;
};

export default QADataTableRender;
