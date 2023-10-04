import { Button } from "@trussworks/react-uswds";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import SelectableDataTable from "../SelectableDataTable/SelectableDataTable";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";

//Selectable data table that automatically refreshes its data based on the dataFetchCall whenever dataFetchParams are changed
export const ExportTable = ({
  toggleExportCallback,
  title,
  columns,
  dataFetchCall,
  dataFetchParams,
  selectedDataRef,
  reportCode,
  uniqueIdField = "id",
  exportState,
  providedData,
  dispatchSetExportState,
}) => {
  const [hasSelected, setHasSelected] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  const handleSelectionChange = useCallback(
    (rows) => {
      setHasSelected(rows.selectedRows.length > 0);
      selectedDataRef.current = rows.selectedRows;

      const selectedIds = rows.selectedRows.map((row) => row[uniqueIdField]);
      const newExportState = {
        ...exportState,
        [title]: selectedIds,
      };

      dispatchSetExportState(newExportState);
      toggleExportCallback();
    },
    [
      dispatchSetExportState,
      exportState,
      selectedDataRef,
      title,
      uniqueIdField,
      toggleExportCallback,
    ]
  );

  const handleReportLoad = () => {
    let additionalParams = "";
    let reportTitle = "";

    if (reportCode === "MPP") {
      additionalParams = "&monitorPlanId=" + selectedDataRef.current[0].id;
      reportTitle = "Monitoring Plan Printout Report";
    } else if (reportCode === "TEST_DETAIL") {
      additionalParams =
        "&testId=" + selectedDataRef.current.map((m) => m.testSumId).join("|");
      reportTitle = "QA/Cert Test Data Printout Report";
    } else if (reportCode === "QCE") {
      additionalParams =
        "&qceId=" +
        selectedDataRef.current.map((m) => m.qaCertEventIdentifier).join("|");
      reportTitle = "QA/Cert Events Printout Report";
    } else if (reportCode === "TEE") {
      additionalParams =
        "&teeId=" +
        selectedDataRef.current
          .map((m) => m.testExtensionExemptionIdentifier)
          .join("|");
      reportTitle = "Test Ext/Exemptions Printout Report";
    } else {
      const yearQuarter =
        selectedDataRef.current[0].periodAbbreviation.split(" ");
      additionalParams = `&monitorPlanId=${
        selectedDataRef.current[0].monPlanId
      }&year=${yearQuarter[0]}&quarter=${yearQuarter[1].charAt(1)}`;
      reportTitle = "Emissions Printout Report";
    }

    const url = `/workspace/reports?reportCode=${reportCode}&facilityId=${selectedDataRef.current[0].orisCode}${additionalParams}`;

    const reportWindowParams = [
      // eslint-disable-next-line no-restricted-globals
      `height=${screen.height}`,
      // eslint-disable-next-line no-restricted-globals
      `width=${screen.width}`,
      //`fullscreen=yes`,
    ].join(",");

    window.open(url, reportTitle, reportWindowParams); //eslint-disable-next-line react-hooks/exhaustive-deps
  };

  const selectedIds = useMemo(() => exportState?.[title] ?? [], []);

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
        <h2> {title} </h2>
      </div>
      <div className="grid-col-3 margin-y-auto">
        <div className="display-flex flex-column flex-align-end">
          <Button onClick={handleReportLoad} disabled={!hasSelected}>
            View Print-out Report
          </Button>
        </div>
      </div>
      <div style={{ display: isVisible ? "block" : "none", width: "100%" }}>
        <SelectableDataTable
          columns={columns}
          changedCallback={handleSelectionChange}
          selectedIds={selectedIds}
          providedData={providedData}
          tableTitle={title}
          uniqueIdField={uniqueIdField}
        ></SelectableDataTable>
      </div>
    </div>
  );
};

export default ExportTable;
