import React, { useEffect, useState } from "react";
import ReportingPeriodSelector from "../ReportingPeriodSelector/ReportingPeriodSelector";
import { getQATestSummaryByReportingPeriod } from "../../utils/api/qaCertificationsAPI";
import DataTable from "react-data-table-component";
import { Button } from "@trussworks/react-uswds";
import { Preloader } from "@us-epa-camd/easey-design-system";
import { ArrowDownwardSharp } from "@material-ui/icons";
import { qaTestSummaryCols as columns } from '../../utils/constants/tableColumns';

const QAImportHistoricalDataPreview = ({
  locations,
  setSelectedHistoricalData,
  setFileName,
  setDisablePortBtn,
}) => {
  const [reportingPeriodObj, setReportingPeriodObj] = useState(null);
  const [testSummaryData, setTestSummaryData] = useState(null);
  const [previewData, setPreviewData] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchDataPreviewRecords = () => {
    if (reportingPeriodObj && !previewData) {
      const allPromises = [];
      setLoading(true);
      locations.forEach((e) => {
        allPromises.push(
          getQATestSummaryByReportingPeriod(
            e.id,
            reportingPeriodObj.beginDate,
            reportingPeriodObj.endDate
          )
        );
      });
      Promise.all(allPromises).then((res) => {
        console.log("res", res);
        setTestSummaryData(res.map((e) => e.data).flat());
        setPreviewData(true);
        setLoading(false);
      });
    }
  };

  useEffect(() => {
    setDisablePortBtn(true);
    if (testSummaryData === null) {
      fetchDataPreviewRecords();
    }
  }, [reportingPeriodObj]);

  const getInitSelection = (selectedObj) => {
    setReportingPeriodObj(selectedObj);
  };

  const reportingPeroidSelectionHandler = (selectedObj) => {
    setReportingPeriodObj(selectedObj);
    if (previewData) {
      setPreviewData(false);
    }
  }

  const handleHistoricalDataSelection = (state) => {
    console.log("SelectedHistoricalData", state.selectedRows);

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
            reportingPeroidSelectionHandler={reportingPeroidSelectionHandler}
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
          <div className="margin-x-3 margin-y-4">
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
