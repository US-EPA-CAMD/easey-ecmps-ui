import React, { useEffect, useState } from "react";
import ReportingPeriodSelector from "../ReportingPeriodSelector/ReportingPeriodSelector";
import { exportQA } from "../../utils/api/qaCertificationsAPI";
import DataTable from "react-data-table-component";
import { Button } from "@trussworks/react-uswds";
import { Preloader } from "@us-epa-camd/easey-design-system";
import { ArrowDownwardSharp } from "@material-ui/icons";
import { qaTestSummaryCols as columns } from "../../utils/constants/tableColumns";
import { assignAriaLabelsToDataTable } from "../../additional-functions/ensure-508";

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
}) => {
  const [reportingPeriodObj, setReportingPeriodObj] = useState(null);
  const [testSummaryData, setTestSummaryData] = useState(null);
  const [previewData, setPreviewData] = useState(false);
  const [loading, setLoading] = useState(false);

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
          true
        );
        if (response) {
          setTestSummaryData(response.data.testSummaryData);
          setPreviewData(true);
          setLoading(false);

          const rowsAriaLabelData = []
          response.data.testSummaryData.forEach(e => {
            rowsAriaLabelData.push(e.testNumber)
          });

          assignAriaLabelsToDataTable('[aria-label="Test-Summary-Data"]', rowsAriaLabelData) 
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  useEffect(() => {
    setDisablePortBtn(true);
    if (testSummaryData === null) {
      fetchDataPreviewRecords();
    }
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

  const handleHistoricalDataSelection = (state) => {
    let fName = "";
    const length = state.selectedRows.length;

    if (length > 0) {
      setDisablePortBtn(false);
    } else {
      setDisablePortBtn(true);
    }

    state.selectedRows.forEach((data, idx) => {
      if (idx !== 0 && idx < length) {
        fName += ", ";
      }
      fName += `${data.id}`;
    });

    setFileName(fName);
    setSelectedHistoricalData(state.selectedRows);
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
        testSummaryData &&
        previewData && (
            <div className="margin-x-3 margin-y-4" aria-label={"Test-Summary-Data"}>
            <h3 className="margin-y-1">Test Summary</h3>
            <DataTable
              responsive={true}
              fixedHeader={true}
              noHeader={true}
              striped={false}
              highlightOnHover={true}
              sortIcon={
                <ArrowDownwardSharp className="margin-left-2 text-primary" />
              }
              columns={columns}
              data={testSummaryData}
              onSelectedRowsChange={handleHistoricalDataSelection}
              selectableRows
            />
          </div>
        )
      )}
    </>
  );
};

export default QAImportHistoricalDataPreview;
