import React, { useState } from "react";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./ReviewAndSubmitTables.scss";
import ReviewAndSubmitTableRender from "../ReviewAndSubmitTableRender/ReviewAndSubmitTableRender";
import {
  monPlanColumns,
  qaTestSummaryColumns,
  emissionsColumns,
} from "./ColumnMappings";

const ReviewAndSubmitTables = ({
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
}) => {
  const selectMonPlanRow = (id) => {
    for (const mpR of monPlanRef.current) {
      if (mpR.monPlanId === id && getRowState(mpR, "MP") === "Checkbox") {
        mpR.selected = true;
        mpR.userCheckedOut = true;
      }
    }

    setMonPlanState([...monPlanRef.current]); //Update monitor plan state
  };

  const getRowState = (row, type) => {
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
      row.evalStatusCode !== "ERR" &&
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
    }
  };

  const tables = [
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
    },
  ];

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
              <ReviewAndSubmitTableRender
                columns={columns}
                state={state}
                setState={setState}
                ref={ref}
                dataTableName={name}
                type={type}
                selectMonPlanRow={selectMonPlanRow}
                getRowState={getRowState}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ReviewAndSubmitTables;
