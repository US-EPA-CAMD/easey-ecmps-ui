import { ArrowDownwardSharp } from "@material-ui/icons";
import React, { forwardRef, useEffect, useState, useCallback } from "react";
import DataTable from "react-data-table-component";
import {
  addScreenReaderLabelForCollapses,
  cleanUp508,
  ensure508,
} from "../../../additional-functions/ensure-508";
import { oneSecond } from "../../../config";
import ReviewCell from "../ReviewCell/ReviewCell";
import { Checkbox } from "@trussworks/react-uswds";
import { v4 as uuidv4 } from "uuid";
import { addEvalStatusCell } from "../../../utils/functions";

import "./TableRender.scss";

const TableRender = forwardRef(
  ({ columns, state, type, getRowState, rowId, selectRow }, ref) => {
    const reportWindowParams = [
      // eslint-disable-next-line no-restricted-globals
      `height=${screen.height}`,
      // eslint-disable-next-line no-restricted-globals
      `width=${screen.width}`,
      //`fullscreen=yes`,
    ].join(",");

    const [selectAllState, setSelectAllState] = useState(false);
    const [selectAllVisible, setSelectAllVisible] = useState(true);

    useEffect(() => {
      setTimeout(() => {
        ensure508();
      }, oneSecond);

      return () => {
        cleanUp508();
        addScreenReaderLabelForCollapses();
      };
    }, []);

    const selectAll = () => {
      const bool = !selectAllState;
      setSelectAllState(bool);

      for (const r of ref.current) {
        if (getRowState(r, type) === "Checkbox" && r.selected !== bool) {
          //Multithread this portion out
          selectRow(r, bool, type);
        }
      }
    };

    const selectIndividual = (row, type, selection) => {
      if (selection === false) {
        setSelectAllState(false);
      }

      for (const r of ref.current) {
        if (r[rowId] === row[rowId] && r.monPlanId === row.monPlanId) {
          selectRow(r, selection, type);
        }
      }
    };

    const handleRowView = useCallback((row) => {
      let reportTitle;
      let reportCode;
      let url;

      //TODO: Filter by type
      reportCode = "MPP";
      reportTitle = "ECMPS Monitoring Plan Printout Report";
      url = `/workspace/reports?reportCode=${reportCode}&monitorPlanId=${row.monPlanId}`;

      if (type === "MP") {
        //Load MP Report
      } else if (type === "QA") {
        if (rowId === "testSumId") {
          // Load Test Summary Report
        }
        //etc
      }

      window.open(url, reportTitle, reportWindowParams); //eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const mappings = [
      {
        name: (
          <div className="margin-bottom-5">
            {selectAllVisible && (
              <Checkbox
                className=" margin-left-4"
                id={`${uuidv4()}`}
                data-testid="SelectAll"
                onClick={selectAll}
                defaultChecked={selectAllState}
              />
            )}
          </div>
        ),
        cell: (row) => (
          <ReviewCell
            row={row}
            handleRowSelection={selectIndividual}
            handleRowView={handleRowView}
            type={type}
            getRowState={getRowState}
            setSelectAllState={setSelectAllState}
            setSelectAllVisible={setSelectAllVisible}
          />
        ),
        width: "100px",
        button: true,
      },
      ...columns,
    ];
    addEvalStatusCell(mappings);

    return (
      <div>
        {state && state.length > 0 && (
          <DataTable
            defaultSortField="orisCode"
            columns={mappings}
            data={state}
            noHeader={true}
            highlightOnHover={true}
            responsive={false}
            persistTableHead={false}
            sortIcon={
              <ArrowDownwardSharp
                className="margin-left-2 text-primary"
                id="bdfSortIcon"
              />
            }
          />
        )}
      </div>
    );
  }
);

export default TableRender;
