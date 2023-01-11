import { ArrowDownwardSharp } from "@material-ui/icons";
import React, { forwardRef, useEffect, useState, useCallback } from "react";
import { useDispatch } from "react-redux";
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
import {
  addEvalStatusCell,
  updateCheckedOutLocationsRef,
  updateCorrespondingMPAndQARow,
  updateCurrentRow,
} from "../../../utils/functions";
import {
  checkInOutLocation,
  getUpdatedCheckedOutLocations,
} from "../../../utils/api/monitoringPlansApi";
import "./TableRender.scss";

const TableRender = forwardRef(
  (
    {
      columns,
      state,
      setState,
      name,
      type,
      updateMonPlanRow,
      updateQARow,
      getRowState,
      checkedOutLocationsMap,
      updateFilesSelected,
      checkedOutLocationsInCurrentSessionRef,
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
    const dispatch = useDispatch();

    useEffect(() => {
      setTimeout(() => {
        ensure508();
      }, oneSecond);

      return () => {
        cleanUp508();
        addScreenReaderLabelForCollapses();
      };
    }, []);

    const handleSelectAll = useCallback(async () => {
      const updatedCheckedOutLocationsMap = await getUpdatedCheckedOutLocations(
        dispatch
      );
      selectAll(!selectAllState, updatedCheckedOutLocationsMap);
      setSelectAllState(!selectAllState); //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectAllState]);
    const mappings = [
      {
        name: (
          <div className="margin-bottom-5">
            {selectAllVisible && (
              <Checkbox
                className=" margin-left-4"
                id={`${uuidv4()}`}
                data-testid="SelectAll"
                onClick={handleSelectAll}
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

    const selectAll = useCallback((bool, map) => {
      for (const r of ref.current) {
        if (getRowState(r, type) === "Checkbox") {
          //Logic to see if row can actually be checked out
          checkInOutLocation(bool, r, map);
          updateCheckedOutLocationsRef(
            bool,
            r,
            checkedOutLocationsInCurrentSessionRef
          );
          updateCurrentRow(bool, r)
          updateFilesSelected(bool);
          updateCorrespondingMPAndQARow({r, type, updateMonPlanRow, updateQARow, selection: bool,});
        }
      } //eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleRowView = useCallback((row) => {
      let reportTitle;
      let reportCode;
      let url;

      //TODO: Filter by type
      reportCode = "MPP";
      reportTitle = "ECMPS Monitoring Plan Printout Report";
      url = `/workspace/reports?reportCode=${reportCode}&monitorPlanId=${row.monPlanId}`;

      window.open(url, reportTitle, reportWindowParams); //eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleRowSelection = useCallback(async (row, type, selection) => {
      const updatedCheckedOutLocationsMap = await getUpdatedCheckedOutLocations(
        dispatch
      );
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
          checkInOutLocation(selection, r, updatedCheckedOutLocationsMap);
          updateCheckedOutLocationsRef(
            selection,
            r,
            checkedOutLocationsInCurrentSessionRef
          );
          updateCurrentRow(selection, r);
          updateFilesSelected(selection);
          updateCorrespondingMPAndQARow({r, type, updateMonPlanRow, updateQARow, selection});
        }
      } //eslint-disable-next-line react-hooks/exhaustive-deps
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

export default TableRender;
