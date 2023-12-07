import React, { useState, useCallback } from "react";
import SelectableDataTable from "../SelectableDataTable/SelectableDataTable";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { addEvalStatusCell, storeEvalStatusInLocalStorage } from "../../../utils/functions";
import { Button } from "@trussworks/react-uswds";
import { Preloader } from "@us-epa-camd/easey-design-system";
import { LockSharp } from "@material-ui/icons";
import "./CategoryTable.scss";

export const CategoryTable = ({
  categoryTitle,
  columns,
  data,
  onChange,
  type,
  rowId,
  index,
  loading,
  selectable,
  userId,
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const mappings = [];

  const reportWindowParams = [
    // eslint-disable-next-line no-restricted-globals
    `height=${screen.height}`,
    // eslint-disable-next-line no-restricted-globals
    `width=${screen.width}`,
    //`fullscreen=yes`,
  ].join(",");

  const handleRowView = useCallback((row, printout = false) => {
    let url;
    let reportCode;
    let reportTitle;
    const reportType = printout ? "Printout" : "Evaluation";
    let additionalParams = "";

    if (type === "MP") {
      reportCode = printout ? "MPP" : "MP_EVAL";
      reportTitle = `Monitoring Plan ${reportType} Report`;
      additionalParams = "&monitorPlanId=" + row.monPlanId;
    } else if (type === "QA") {
      if (rowId === "testSumId") {
        reportCode = printout ? "TEST_DETAIL" : "TEST_EVAL";
        reportTitle = `QA/Cert Test Data ${reportType} Report`;
        additionalParams = "&testId=" + row.testSumId;
      }
      if (rowId === "qaCertEventIdentifier") {
        reportCode = printout ? "QCE" : "QCE_EVAL";
        reportTitle = `QA/Cert Events ${reportType} Report`;
        additionalParams = "&qceId=" + row.qaCertEventIdentifier;
      }
      if (rowId === "testExtensionExemptionIdentifier") {
        reportCode = printout ? "TEE" : "TEE_EVAL";
        reportTitle = `Test Ext/Exemptions ${reportType} Report`;
        additionalParams = "&teeId=" + row.testExtensionExemptionIdentifier;
      }
    } else if (type === "EM") {
      reportCode = printout ? "EM" : "EM_EVAL";
      reportTitle = `Emissions ${reportType} Report`;

      const yearQuarter = row.periodAbbreviation.split(" ");

      additionalParams = `&monitorPlanId=${row.monPlanId}&year=${
        yearQuarter[0]
      }&quarter=${yearQuarter[1].charAt(1)}`;
    }

    url =
      `/workspace/reports?reportCode=${reportCode}&facilityId=${row.orisCode}` +
      additionalParams;

    //set redux state with row info
    // localStorage.setItem("reportRow", JSON.stringify(row));
    storeEvalStatusInLocalStorage(row.evalStatusCode);
    window.open(url, reportTitle, reportWindowParams); //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  addEvalStatusCell(columns, handleRowView); // Add the eval status coloring and hyperlink

  if (rowId !== "matsBulkFileIdentifier") {
    //Add the view report button
    mappings.push({
      name: "Report",
      cell: (row, idx) => (
        <Button
          data-testid="ViewButton"
          onClick={() => {
            handleRowView(row, true);
          }}
        >
          View
        </Button>
      ),
      width: "100px",
      button: true,
    });
  }

  mappings.push({
    name: "Checked Out",
    cell: (row, idx) => {
      return (
        <div className="grid-row">
          {row.checkedOutBy && row.checkedOutBy !== userId && (
            <div>
              <div>{row.checkedOutBy !== "" && <LockSharp />}</div>
              <div className="checkOutBy">{row.checkedOutBy}</div>
            </div>
          )}
        </div>
      );
    },
    width: "150px",
  });

  mappings.push(...columns);

  //Functions ------

  const handleRowChange = (selectionEvent) => {
    //Append the type of the row clicked to the callback and pass it to the parent function
    onChange(selectionEvent, type, index);
  };

  return (
    <div className="grid-row">
      <div className="grid-col-1">
        <FontAwesomeIcon
          role="button"
          icon={isVisible ? faChevronUp : faChevronDown}
          className="padding-3 bg-base-lighter margin-top-3"
          onClick={() => {
            setIsVisible(!isVisible);
          }}
          onKeyDown={(e) =>
            e.key === "Enter"
              ? () => {
                  setIsVisible(!isVisible);
                }
              : null
          }
          tabIndex={0}
          focusable={true}
        />
      </div>
      <div className="grid-col-7">
        <h2> {categoryTitle} </h2>
      </div>
      <div style={{ display: isVisible ? "block" : "none", width: "100%" }}>
        {!loading && (
          <SelectableDataTable
            columns={mappings}
            providedData={data}
            changedCallback={handleRowChange}
            isSelectable={selectable}
          ></SelectableDataTable>
        )}
        {loading && <Preloader />}
      </div>
    </div>
  );
};
