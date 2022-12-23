import React, { useState, useCallback, useMemo } from "react";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./DataTables.scss";
import TableRender from "../TableRender/TableRender";
import {
  monPlanColumns,
  qaTestSummaryColumns,
  emissionsColumns,
} from "./ColumnMappings";

const DataTables = ({
  monPlanState,
  setMonPlanState,
  monPlanRef,
  qaTestSumState,
  setQaTestSumState,
  qaTestSumRef,
  emissionsState,
  setEmissionsState,
  emissionsRef,
  permissions,
  updateFilesSelected,
  checkedOutLocationsMap,
  componentType,
}) => {
  const selectMonPlanRow = useCallback((id) => {
    let rowStateFunc;

    if (componentType === "Submission") {
      rowStateFunc = getRowStateSubmission;
    } else {
      rowStateFunc = getRowStateEvaluate;
    }

    for (const mpR of monPlanRef.current) {
      if (mpR.monPlanId === id && rowStateFunc(mpR, "MP") === "Checkbox") {
        mpR.selected = true;
        mpR.userCheckedOut = true;
        updateFilesSelected(true);
      }
    }

    setMonPlanState([...monPlanRef.current]); //Update monitor plan state
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getRowStateSubmission = useCallback((row, type) => {
    if (row.viewOnly) {
      return "View";
    }

    const rowSubmissionAllowed =
      row.submissionAvailabilityCode === "REQUIRE" ||
      row.submissionAvailabilityCode === null ||
      row.submissionAvailabilityCode === undefined ||
      row.submissionAvailabilityCode === "";

    if (row.checkedOut && !row.userCheckedOut) {
      return "Lock";
    } else if (
      //Can only submit records if not ERR eval code, submissionStatus is REQUIRE or blank, and they have permissions
      ["PASS", "INFO"].includes(row.evalStatusCode) &&
      rowSubmissionAllowed &&
      permissions.current[row.orisCode].includes(`DS${type}`)
    ) {
      if (
        type === "EM" &&
        row.windowStatus !== "REQUIRE" &&
        row.windowStatus !== "GRANTED"
      ) {
        return "View";
      }

      return "Checkbox"; //True checkbox
    } else {
      return "View";
    } //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getRowStateEvaluate = useCallback((row, type) => {
    if (row.checkedOut && !row.userCheckedOut) {
      return "Lock";
    } else if (
      //Can only submit records if not ERR eval code, submissionStatus is REQUIRE or blank, and they have permissions
      ["EVAL"].includes(row.evalStatusCode) &&
      (permissions.current[row.orisCode].includes(`DS${type}`) ||
        permissions.current[row.orisCode].includes(`DP${type}`))
    ) {
      if (
        type === "EM" &&
        row.windowStatus !== "REQUIRE" &&
        row.windowStatus !== "GRANTED"
      ) {
        return "View";
      }

      return "Checkbox"; //True checkbox
    } else {
      return "View";
    } //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const tables = useMemo(
    () => [
      {
        columns: monPlanColumns,
        state: monPlanState,
        setState: setMonPlanState,
        ref: monPlanRef,
        name: "Monitoring Plan",
        type: "MP",
      },
      {
        columns: qaTestSummaryColumns,
        state: qaTestSumState,
        setState: setQaTestSumState,
        ref: qaTestSumRef,
        name: "Test Data",
        type: "QA",
      },
      {
        columns: emissionsColumns,
        state: emissionsState,
        setState: setEmissionsState,
        ref: emissionsRef,
        name: "Emissions",
        type: "EM",
      }, //eslint-disable-next-line react-hooks/exhaustive-deps
    ],
    [monPlanState, qaTestSumState, emissionsState]
  );

  const [activeTables, setActiveTables] = useState(
    tables.reduce((acc, curr) => ({ ...acc, [curr.name]: true }), {})
  );
  const showOrHideTable = (name) =>
    setActiveTables({
      ...activeTables,
      [name]: !activeTables[name],
    });

  return (
    <div>
      {tables.map((table, i) => {
        const { name, columns, state, setState, ref, type } = table;
        return (
          <div className="" key={i}>
            <div className="padding-y-5 display-flex">
              <span>
                {activeTables[name] ? (
                  <FontAwesomeIcon
                    role="button"
                    icon={faChevronUp}
                    className="padding-3 bg-base-lighter"
                    onClick={() => showOrHideTable(name)}
                  />
                ) : (
                  <FontAwesomeIcon
                    role="button"
                    icon={faChevronDown}
                    className="padding-3 bg-base-lighter"
                    onClick={() => showOrHideTable(name)}
                  />
                )}
              </span>
              <h4 className="padding-x-3">{name}</h4>
            </div>
            <div
              className={
                activeTables[name]
                  ? "data-display-table maxh-mobile overflow-y-auto overflow-x-auto"
                  : "display-none"
              }
            >
              <TableRender
                columns={columns}
                state={state}
                setState={setState}
                ref={ref}
                dataTableName={name}
                type={type}
                selectMonPlanRow={selectMonPlanRow}
                getRowState={
                  componentType === "Submission"
                    ? getRowStateSubmission
                    : getRowStateEvaluate
                }
                updateFilesSelected={updateFilesSelected}
                checkedOutLocationsMap={checkedOutLocationsMap}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default DataTables;
