import React, { useEffect, useState, useRef } from "react";
import DataTable from "react-data-table-component";
import { Button } from "@trussworks/react-uswds";
import { Preloader } from "@us-epa-camd/easey-design-system";
import { ArrowDownwardSharp } from "@material-ui/icons";
import log from "loglevel";

import ReportingPeriodSelector from "../ReportingPeriodSelector/ReportingPeriodSelector";
import { exportQA } from "../../utils/api/qaCertificationsAPI";
import {
  qaTestSummaryCols,
  qaCertificationEventDataCols,
  qaTestExtensionExemptionDataCols,
} from "../../utils/constants/tableColumns";
import { assignAriaLabelsToDataTable } from "../../additional-functions/ensure-508";

const TEST_SUMMARY_KEY = "testSummaryData";
const CERT_EVENT_KEY = "certificationEventData";
const TEST_EXT_EXE_KEY = "testExtensionExemptionData";

export const getUnitIdAndStackPipeIds = (locs) => {
  const unitIds = [];
  const stackPipeIds = [];
  locs?.forEach((e) => {
    if (e.type === "stack") {
      stackPipeIds.push(e.stackPipeId);
    }
    if (e.type === "unit") {
      unitIds.push(e.unitId);
    }
  });
  return {
    unitIds,
    stackPipeIds,
  };
};

export const QAImportHistoricalDataPreview = ({
  locations,
  setSelectedHistoricalData,
  setFileName,
  setDisablePortBtn,
  orisCode,
  showTestSummaryTable = true,
  setJsonSchemaVersion
}) => {
  const [reportingPeriodObj, setReportingPeriodObj] = useState(null);
  const [tableData, setTableData] = useState(null);
  const [previewData, setPreviewData] = useState(false);
  const [loading, setLoading] = useState(false);
  const [dataTableId, setDataTableId] = useState('');
  const [rowsAriaLabelData, setRowsAriaLabelData] = useState(null);

  const selectedRows = useRef();
  const userClicked = useRef(false);


  const fetchDataPreviewRecords = async () => {
    if (reportingPeriodObj && !previewData) {
      setLoading(true);
      const unitIdsAndStackPipeIds = getUnitIdAndStackPipeIds(locations);
      try {
        const response = await exportQA(
          orisCode,
          unitIdsAndStackPipeIds.unitIds,
          unitIdsAndStackPipeIds.stackPipeIds,
          reportingPeriodObj.beginDate,
          reportingPeriodObj.endDate,
          {
            isOfficial: true,
            isHistoricalImport: true,
          }
        );
        if (response) {
          setTableData(response.data);
          setPreviewData(true);
          setLoading(false);
          setJsonSchemaVersion(response.data?.version)
          const dataKeys = showTestSummaryTable
            ? [TEST_SUMMARY_KEY]
            : [CERT_EVENT_KEY, TEST_EXT_EXE_KEY];
          for (const dataKey of dataKeys) {
            const rowsAriaLabelData = response.data[dataKey].map((e) => e.unitId ?? e.id);
            setRowsAriaLabelData(rowsAriaLabelData)
            const dataTableId = `#import-${dataKey}`;
            setDataTableId(dataTableId)
            userClicked.current = true;
          }
        }
      } catch (err) {
        log.log(err);
      }
    }
  };

  useEffect(() => {
    //Runs only when button is clicked
    if (userClicked.current) {
      setTimeout(() => {
          assignAriaLabelsToDataTable(dataTableId, rowsAriaLabelData);
          userClicked.current = false;
      }, 500); // ensure the DOM is fully updated
  }}, [tableData, previewData]); // Runs when tableData or previewData changes

  useEffect(() => {
    setDisablePortBtn(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reportingPeriodObj]);

  const getInitSelection = (selectedObj) => {
    setReportingPeriodObj(selectedObj);
  };

  const reportingPeriodSelectionHandler = (selectedObj) => {
    setReportingPeriodObj(selectedObj);
    if (previewData) {
      setPreviewData(false);
    }
  };

  const handleHistoricalDataSelection = (state, dataKey) => {
    selectedRows.current = {
      ...selectedRows.current,
      [dataKey]: state.selectedRows,
    };
    setSelectedHistoricalData((prevSelected) => {
      const newSelection = {
        ...prevSelected,
        [dataKey]: state.selectedRows,
      };
      return newSelection;
    });

    const rowsHasSelected = () => {
      for (const listOfSelected of Object.values(selectedRows.current)) {
        if (listOfSelected.length > 0) {
          return true;
        }
      }
      return false;
    };
    rowsHasSelected() ? setDisablePortBtn(false) : setDisablePortBtn(true);

    const listsOfSelected = Object.values(selectedRows.current ?? []);
    const allSelectedIds = listsOfSelected.flat().map((row) => row.id);
    const fName = allSelectedIds.join(", ");
    setFileName(fName);
  };

  return (
    <>
      <div className="grid-row">
        <div className="grid-col-8 float-left padding-left-3">
          <ReportingPeriodSelector
            isExport={false}
            includeCurrentQuarter={true}
            dataTypes={null}
            reportingPeriodSelectionHandler={reportingPeriodSelectionHandler}
            exportState={null}
            getInitSelection={getInitSelection}
            setLoading={setLoading}
          />
        </div>
        <div className="grid-col-fill padding-x-9 padding-top-3">
          <Button
            tabIndex={0}
            className="width-card"
            onClick={() => fetchDataPreviewRecords()}
            id="preview-button"
          >
            Preview
          </Button>
        </div>
      </div>
      {loading ? (
        <Preloader />
      ) : (
        tableData &&
        previewData && (
          <>
            {showTestSummaryTable && (
              <div
                className="margin-x-3 margin-y-4"
                id={`import-${TEST_SUMMARY_KEY}`}
                data-testid="test-summary-table"
              >
                <h4 className="margin-y-1">Test Summary</h4>
                <DataTable
                  className="data-display-table"
                  responsive={true}
                  fixedHeader={true}
                  noHeader={true}
                  striped={false}
                  highlightOnHover={true}
                  sortIcon={
                    <ArrowDownwardSharp className="margin-left-2 text-primary" />
                  }
                  columns={qaTestSummaryCols}
                  data={tableData.testSummaryData}
                  onSelectedRowsChange={(state) =>
                    handleHistoricalDataSelection(state, TEST_SUMMARY_KEY)
                  }
                  style={{ overflowX: "visible", overflowY: "visible" }}
                  selectableRows
                />
              </div>
            )}
            {!showTestSummaryTable && (
              <>
                <div
                  className="margin-x-3 margin-y-4"
                  id={`import-${CERT_EVENT_KEY}`}
                  data-testid="qa-cert-events-and-tee-table"
                >
                  <h4 className="margin-y-1">QA Certification Events</h4>
                  <DataTable
                    className="data-display-table"
                    responsive={true}
                    fixedHeader={true}
                    noHeader={true}
                    striped={false}
                    highlightOnHover={true}
                    sortIcon={
                      <ArrowDownwardSharp className="margin-left-2 text-primary" />
                    }
                    columns={qaCertificationEventDataCols}
                    data={tableData.certificationEventData}
                    onSelectedRowsChange={(state) =>
                      handleHistoricalDataSelection(state, CERT_EVENT_KEY)
                    }
                    style={{ overflowX: "visible", overflowY: "visible" }}
                    selectableRows
                  />
                </div>
                <div
                  className="margin-x-3 margin-y-4"
                  id={`import-${TEST_EXT_EXE_KEY}`}
                >
                  <h4 className="margin-y-1">Test Extension Exemptions</h4>
                  <DataTable
                    className="data-display-table"
                    responsive={true}
                    fixedHeader={true}
                    noHeader={true}
                    striped={false}
                    highlightOnHover={true}
                    sortIcon={
                      <ArrowDownwardSharp className="margin-left-2 text-primary" />
                    }
                    columns={qaTestExtensionExemptionDataCols}
                    data={tableData.testExtensionExemptionData}
                    onSelectedRowsChange={(state) =>
                      handleHistoricalDataSelection(state, TEST_EXT_EXE_KEY)
                    }
                    style={{ overflowX: "visible", overflowY: "visible" }}
                    selectableRows
                  />
                </div>
              </>
            )}
          </>
        )
      )}
    </>
  );
};

export default QAImportHistoricalDataPreview;
