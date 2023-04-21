import React, { useEffect, useState, useRef } from "react";
import DataTable from "react-data-table-component";
import { Button } from "@trussworks/react-uswds";
import { Preloader } from "@us-epa-camd/easey-design-system";
import { ArrowDownwardSharp } from "@material-ui/icons";

import ReportingPeriodSelector from "../ReportingPeriodSelector/ReportingPeriodSelector";
import { exportQA } from "../../utils/api/qaCertificationsAPI";
import { qaTestSummaryCols as columns } from "../../utils/constants/tableColumns";
import { assignAriaLabelsToDataTable } from "../../additional-functions/ensure-508";

const TEST_SUMMARY_KEY = 'testSummaryData';
const CERT_EVENT_KEY = 'certificationEventData';
const TEST_EXT_EXE_KEY = 'testExtensionExemptionData'

export const getUnitIdAndStackPipeIds = (locs) => {
  const unitIds = [];
  const stackPipeIds = [];
  locs.forEach((e) => {
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
  showTestSummaryTable = true
}) => {
  const [reportingPeriodObj, setReportingPeriodObj] = useState(null);
  const [tableData, setTableData] = useState(null);
  const [previewData, setPreviewData] = useState(false);
  const [loading, setLoading] = useState(false);

  const selectedRows = useRef()

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

          console.log('response.data',response.data)
          const dataKeys = showTestSummaryTable ? [TEST_SUMMARY_KEY] : [CERT_EVENT_KEY, TEST_EXT_EXE_KEY]
          for (const dataKey of dataKeys) {
            const rowsAriaLabelData = response.data[dataKey].map(e => e.id)
            const dataTableId = `#import-${dataKey}`
            assignAriaLabelsToDataTable(
              dataTableId,
              rowsAriaLabelData
            );
          }
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

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
      [dataKey]: state.selectedRows
    }
    setSelectedHistoricalData(prevSelected => {
      const newSelection = {
        ...prevSelected,
        [dataKey]: state.selectedRows
      }
      return newSelection;
    })

    const rowsHasSelected = () => {
      for (const listOfSelected of Object.values(selectedRows.current)) {
        if (listOfSelected.length > 0) {
          return true;
        }
      }
      return false;
    }
    rowsHasSelected() ? setDisablePortBtn(false) : setDisablePortBtn(true)

    const listsOfSelected = Object.values(selectedRows.current ?? [])
    const allSelectedIds = listsOfSelected.flat().map(row => row.id)
    const fName = allSelectedIds.join(', ')
    setFileName(fName);
  };

  return (
    <>
      <div className="grid-row">
        <div className="grid-col-8 float-left padding-left-3">
          <ReportingPeriodSelector
            isExport={false}
            dataTypes={null}
            reportingPeriodSelectionHandler={reportingPeriodSelectionHandler}
            exportState={null}
            getInitSelection={getInitSelection}
            setLoading={setLoading}
          />
        </div>
        <div className="grid-col-fill padding-x-9 padding-top-3">
          <Button
            className="width-card"
            onClick={() => fetchDataPreviewRecords()}
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
            {showTestSummaryTable &&
              <div className="margin-x-3 margin-y-4" id={`import-${TEST_SUMMARY_KEY}`}>
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
                  columns={columns}
                  data={tableData.testSummaryData}
                  onSelectedRowsChange={(state) => handleHistoricalDataSelection(state, TEST_SUMMARY_KEY)}
                  style={{ overflowX: "visible", overflowY: "visible" }}
                  selectableRows
                />
              </div>
            }
            {!showTestSummaryTable &&
              <>
                <div className="margin-x-3 margin-y-4" id={`import-${CERT_EVENT_KEY}`}>
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
                    columns={columns}
                    data={tableData.certificationEventData}
                    onSelectedRowsChange={(state) => handleHistoricalDataSelection(state, CERT_EVENT_KEY)}
                    style={{ overflowX: "visible", overflowY: "visible" }}
                    selectableRows
                  />
                </div>
                <div className="margin-x-3 margin-y-4" id={`import-${TEST_EXT_EXE_KEY}`}>
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
                    columns={columns}
                    data={tableData.testExtensionExemptionData}
                    onSelectedRowsChange={(state) => handleHistoricalDataSelection(state, TEST_EXT_EXE_KEY)}
                    style={{ overflowX: "visible", overflowY: "visible" }}
                    selectableRows
                  />
                </div>
              </>
            }
          </>
        )
      )}
    </>
  );
};

export default QAImportHistoricalDataPreview;
