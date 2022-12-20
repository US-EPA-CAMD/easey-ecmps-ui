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
import { checkInOutLocation } from "../../../utils/api/monitoringPlansApi";
import './ReviewAndSubmitTableRender.scss';
const ReviewAndSubmitTableRender = forwardRef(
  (
    { columns, state, setState, name, type, selectMonPlanRow, getRowState, checkedOutLocationsMap },
    ref
  ) => {
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

    const mappings = [
      {
        name: (
          <div className="margin-bottom-5">
            {selectAllVisible && (
              <Checkbox
                className=" margin-left-4"
                id={`${uuidv4()}`}
                data-testid="SelectAll"
                onClick={(e) => {
                  selectAll(!selectAllState);
                  setSelectAllState(!selectAllState);
                }}
                defaultChecked={selectAllState}
              />
            )}
          </div>
        ),
        cell: (row) => (
          <ReviewCell
            row={row}
            handleRowSelection={handleRowSelection}
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

    const selectAll = useCallback((bool) => {
      for (const r of ref.current) {
        if (getRowState(r, type) === "Checkbox") {
          //Logic to see if row can actually be checked out
          r.selected = bool;
          r.userCheckedOut = bool;

          if (r.selected && type !== "MP") {
            // Need to activate mp for subsequent child records
            selectMonPlanRow(r.monPlanId);
          }
          checkInOutLocation(bool, r, checkedOutLocationsMap);
        }
      }//eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleRowView = useCallback((row) => {
      let reportTitle;
      let reportCode;
      let url;

      //TODO: Filter by type
      reportCode = "MPP";
      reportTitle = "ECMPS Monitoring Plan Printout Report";
      url = `/workspace/reports?reportCode=${reportCode}&monitorPlanId=${row.monPlanId}`;

      window.open(url, reportTitle, reportWindowParams);//eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleRowSelection = useCallback((row, type, selection) => {
      if (selection === false) {
        setSelectAllState(false);
      }

      let filterId = "monPlanId"; //Different data types have different uids
      if (type === "QA") {
        filterId = "testSumId";
      } else if (type === "EM") {
        filterId = "periodAbbreviation";
      }

      for (const r of ref.current) {
        if (r[filterId] === row[filterId] && r.monPlanId === row.monPlanId) {
          r.selected = selection;
          r.userCheckedOut = r.selected;
          checkInOutLocation(selection, r, checkedOutLocationsMap);
          if (r.selected && type !== "MP") {
            // Need to activate mp for subsequent child records
            selectMonPlanRow(row.monPlanId);
          }
        }
      }//eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
      <div>
        {state.length > 0 && (
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

export default ReviewAndSubmitTableRender;
