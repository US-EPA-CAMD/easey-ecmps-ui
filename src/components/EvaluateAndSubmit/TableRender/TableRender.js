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
import _ from "lodash";

import "./TableRender.scss";

const TableRender = forwardRef(
  (
    {
      columns,
      state,
      setState,
      type,
      getRowState,
      rowId,
      selectRow,
      componentType,
    },
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

    const selectAll = () => {
      const bool = !selectAllState;
      setSelectAllState(bool);

      for (const r of ref.current) {
        if (getRowState(r, type) === "Checkbox" && r.selected !== bool) {
          //Multithread this portion out
          selectRow(r, bool, type);
        }
      }

      setState(_.cloneDeep(ref.current));
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

      setState(_.cloneDeep(ref.current));
    };

    const handleRowView = useCallback((row, printout) => {
      let reportTitle;
      let reportCode;
      let url;
      const reportType = printout ? "Printout" : "Evaluation";
      //TODO: Filter by type
      reportCode = "MPP";
      reportTitle = `ECMPS Monitoring Plan ${reportType} Report`;

      let additionalParams = "";

      if (type === "MP") {
        reportCode = printout ? "MPP" : "MP_EVAL";
        additionalParams = "&monitorPlanId=" + row.monPlanId;
      } else if (type === "QA") {
        if (rowId === "testSumId") {
          reportCode = printout ? "TEST_DETAIL" : "TEST_EVAL";
          additionalParams = "&testId=" + row.testSumId;
        }
        if (rowId === "qaCertEventIdentifier") {
          reportCode = printout ? "QCE" : "QCE_EVAL";
          additionalParams = "&qceId=" + row.qaCertEventIdentifier;
        }
        if (rowId === "testExtensionExemptionIdentifier") {
          reportCode = printout ? "TEE" : "TEE_EVAL";
          additionalParams = "&teeId=" + row.testExtensionExemptionIdentifier;
        }
      }

      url =
        `/workspace/reports?reportCode=${reportCode}&facilityId=${row.orisCode}` +
        additionalParams;

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
      {
        name: "Submission Status",
        selector: "submissionAvailabilityCode",
        sortable: true,
      },
      {
        name: "Eval Status",
        selector: "evalStatusCode",
        sortable: true,
      },
    ];

    addEvalStatusCell(mappings, handleRowView);

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
