import React, { useState, useCallback } from "react";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import TableRender from "../TableRender/TableRender";
import { checkoutAPI } from "../../../additional-functions/checkout";

const DataTables = ({
  dataList,
  permissions,
  updateFilesSelected,
  componentType,
  monitorPlanIdToSelectedMap,
  userCheckedOutPlans,
}) => {
  const selectRow = (row, bool, tableType) => {
    try {
      //TODO: Flip QA and MP Records if possible
      updateFilesSelected(bool);
      row.selected = bool;
      row.userCheckedOut = bool;
      row.checkedOut = bool;

      // Change the amount of the stored monitor plan selections
      if (bool) {
        if (monitorPlanIdToSelectedMap.current.has(row.monPlanId)) {
          //The map associated monPlanIds to {facId, count} facId is needed in checkout process that uses the map to check records back in
          monitorPlanIdToSelectedMap.current.set(row.monPlanId, [
            monitorPlanIdToSelectedMap.current.get(row.monPlanId)[0],
            monitorPlanIdToSelectedMap.current.get(row.monPlanId)[1] + 1,
          ]);
        } else {
          monitorPlanIdToSelectedMap.current.set(row.monPlanId, [
            row.facilityId,
            1,
          ]);
        }
        if (
          monitorPlanIdToSelectedMap.current.get(row.monPlanId)[1] === 1 &&
          !userCheckedOutPlans.current.has(row.monPlanId)
        ) {
          checkoutAPI(true, row.facilityId, row.monPlanId);
        }

        if (tableType === "QA") {
          updateMonPlanRow(row.monPlanId, bool);
        } else if (tableType === "EM") {
          updateMonPlanRow(row.monPlanId, bool);
          updateQARow(row.monPlanId, row.periodAbbreviation, bool);
        }
      } else {
        monitorPlanIdToSelectedMap.current.set(row.monPlanId, [
          monitorPlanIdToSelectedMap.current.get(row.monPlanId)[0],
          monitorPlanIdToSelectedMap.current.get(row.monPlanId)[1] - 1,
        ]);
        if (monitorPlanIdToSelectedMap.current.get(row.monPlanId)[1] === 0) {
          checkoutAPI(false, row.facilityId, row.monPlanId);
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

  const updateMonPlanRow = useCallback((id, selection) => {
    let rowStateFunc;

    if (componentType === "Submission") {
      rowStateFunc = getRowStateSubmission;
    } else {
      rowStateFunc = getRowStateEvaluate;
    }

    for (const mpR of dataList[0].ref.current) {
      if (
        mpR.monPlanId === id &&
        rowStateFunc(mpR, "MP") === "Checkbox" &&
        mpR.selected !== selection
      ) {
        selectRow(mpR, selection, "MP");
      }
    }

    dataList[0].setState([...dataList[0].ref.current]);

    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updateQARow = useCallback((id, periodAbr, selection) => {
    let rowStateFunc;

    if (componentType === "Submission") {
      rowStateFunc = getRowStateSubmission;
    } else {
      rowStateFunc = getRowStateEvaluate;
    }

    const qaData = [dataList[1], dataList[2], dataList[3]];

    for (const dataChunk of qaData) {
      //TODO: Iterate all possible qa tables and select the desired ones
      for (const qaR of dataChunk.ref.current) {
        if (
          qaR.monPlanId === id &&
          qaR.periodAbbreviation === periodAbr &&
          rowStateFunc(qaR, "QA") === "Checkbox" &&
          qaR.selected !== selection
        ) {
          selectRow(qaR, selection, "NONRECUR"); //Set to nonrecur so we don't iterate monitor plans for every qa record change
        }
      }

      dataChunk.setState([...dataChunk.ref.current]);
    }
  }, []);

  const getRowStateSubmission = useCallback((row, type) => {
    if (row.viewOnly) {
      row.selected = false;
      return "View";
    }

    const rowSubmissionAllowed =
      row.submissionAvailabilityCode === "REQUIRE" ||
      row.submissionAvailabilityCode === null ||
      row.submissionAvailabilityCode === undefined ||
      row.submissionAvailabilityCode === "";

    if (row.checkedOut && !row.userCheckedOut) {
      row.selected = false;
      return "Lock";
    } else if (
      //Can only submit records if not ERR eval code, submissionStatus is REQUIRE or blank, and they have permissions
      ["PASS", "INFO"].includes(row.evalStatusCode) &&
      rowSubmissionAllowed &&
      permissions.current[row.orisCode]?.includes(`DS${type}`)
    ) {
      if (
        type === "EM" &&
        row.windowStatus !== "REQUIRE" &&
        row.windowStatus !== "GRANTED"
      ) {
        row.selected = false;
        return "View";
      }

      return "Checkbox"; //True checkbox
    } else {
      row.selected = false;
      return "View";
    } //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getRowStateEvaluate = useCallback((row, type) => {
    if (row.checkedOut && !row.userCheckedOut) {
      row.selected = false;
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
        row.selected = false;
        return "View";
      }

      return "Checkbox"; //True checkbox
    } else {
      row.selected = false;
      return "View";
    } //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [activeTables, setActiveTables] = useState(
    dataList.reduce((acc, curr) => ({ ...acc, [curr.name]: true }), {})
  );
  const showOrHideTable = (name) =>
    setActiveTables({
      ...activeTables,
      [name]: !activeTables[name],
    });

  return (
    <div>
      {dataList.map((table, i) => {
        const { name, columns, state, setState, ref, type, rowId } = table;
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
                updateMonPlanRow={updateMonPlanRow}
                updateQARow={updateQARow}
                rowId={rowId}
                getRowState={
                  componentType === "Submission"
                    ? getRowStateSubmission
                    : getRowStateEvaluate
                }
                selectRow={selectRow}
                updateFilesSelected={updateFilesSelected}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default DataTables;
