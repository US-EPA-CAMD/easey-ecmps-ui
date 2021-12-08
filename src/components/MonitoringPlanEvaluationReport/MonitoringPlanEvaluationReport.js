import React, { useState, useEffect } from "react";
import { Button } from "@trussworks/react-uswds";
import { DataTableRender } from "../DataTableRender/DataTableRender";
import * as mpApi from "../../utils/api/monitoringPlansApi";
import * as fs from "../../utils/selectors/monitoringPlanEvalData";

export const MonitoringPlanEvaluationReport = ({ monitorPlanId, facility }) => {
  const facilityMainName = facility.split("(")[0];
  const facilityAdditionalName = facility.split("(")[1].replace(")", "");
  const [dataLoaded, setDataLoaded] = useState(false);
  const [reportData, setReportData] = useState(null);
  //Columns to be displayed in the data table
  const columnNames = [
    "Unit/Stack",
    "Severity",
    "Category",
    "Check Code",
    "Result Message",
  ];

  useEffect(() => {
    if (!dataLoaded) {
      mpApi
        .getMonitoringPlansEvaluationReportData(monitorPlanId)
        .then((res) => {
          let reportResults = res.data;
          reportResults.mpReportResults = fs.getMonitoringPlansEvalData(
            reportResults.mpReportResults
          );
          setReportData(reportResults);
          setDataLoaded(true);
        });
    }
  }, [dataLoaded, monitorPlanId]);

  const displayCurrentDate = () => {
    const date = new Date();
    var options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    };

    return date.toLocaleDateString("en-US", options);
  };

  //Grabs the Report Area for printing (Print button is excluded)
  const print = () => {
    const printArea = document.getElementById("printArea").innerHTML;
    const originalArea = document.body.innerHTML;

    var printWindow = window.open("", "", "fullscreen=yes");
    printWindow.document.write(originalArea);
    printWindow.document.body.innerHTML = printArea;
    printWindow.focus();
    printWindow.print();
    printWindow.close();
  };

  return (
    <>
      {dataLoaded ? (
        <div>
          <div className="grid-row clearfix position-relative float-right">
            {
              <Button
                outline={false}
                tabIndex="0"
                aria-label={`Print the evaluation report`}
                className=" padding-1 padding-right-3 padding-left-3 margin-2"
                onClick={print}
                id="printBTN"
                epa-testid="printBTN"
              >
                Print Report
              </Button>
            }
          </div>
          <br />
          <br />
          <div className="padding-x-3" id="printArea">
            <div className="grid-row clearfix position-relative text-bold">
              {displayCurrentDate()}
            </div>
            <div className="grid-row clearfix position-relative padding-top-5 padding-bottom-2">
              Facility Name:{" "}
              <span className="text-bold padding-left-1">
                {" "}
                {facilityMainName}
              </span>
            </div>
            <div className="subheader-wrapper bg-epa-blue-base text-white text-normal">
              Facility Details
            </div>

            <div className="grid-row clearfix float-left">
              <div className="grid-col text-right padding-right-7 display-inline-block text-nowrap padding-top-2">
                Facility ID (ORISPL):
                <br />
                Monitoring Plan Location IDs: <br />
                State:
                <br />
                County:
                <br />
              </div>
              <div className="grid-col text-bold text-left display-inline-block text-nowrap padding-top-2">
                {reportData.facilityId}
                <br />
                {facilityAdditionalName}
                <br />
                {reportData.state}
                <br />
                {reportData.countyName}
                <br />
              </div>
            </div>
            <div className="width-auto">
              <DataTableRender
                columnNames={columnNames}
                data={reportData.mpReportResults}
                dataLoaded={dataLoaded}
                pagination={false}
                filter={false}
              />
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default MonitoringPlanEvaluationReport;
