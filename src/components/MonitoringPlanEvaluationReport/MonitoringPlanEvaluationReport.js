import React, { useState, useEffect } from "react";
import { Button } from "@trussworks/react-uswds";
import { DataTableRender } from "../DataTableRender/DataTableRender";
import * as mpApi from "../../utils/api/monitoringPlansApi";
import * as fs from "../../utils/selectors/monitoringPlanEvalData";

export const MonitoringPlanEvaluationReport = ({
  monitorPlanId,
  facility,
  showTitle = false,
}) => {
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
    const options = {
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
    window.print();
  };

  return (
    <>
      {dataLoaded ? (
        <div>
          <div>
            <div
              id="printContainer"
              className="grid-row clearfix position-relative float-right"
            >
              {
                <Button
                  type="button"
                  outline={false}
                  tabIndex="0"
                  aria-label={`Print the evaluation report`}
                  className=" padding-1 padding-right-3 padding-left-3 margin-2"
                  onClick={print}
                  id="printBTN"
                  epa-testid="printBTN"
                >
                  Print PDF
                </Button>
              }
            </div>
          </div>
          {showTitle ? (
            <div className="epa-active-element">
              <div className="left-0 bottom-0 padding-bottom-1 epa-active-element">
                <h2 className="text-bold epa-active-element">
                  Monitoring Plan Evaluation Report
                </h2>
              </div>
            </div>
          ) : (
            ""
          )}

          <div className="clearfix float-left w-100 border-bottom padding-bottom-1">
            <div className="grid-row clearfix position-relative text-bold">
              {displayCurrentDate()}
            </div>
          </div>

          <br />
          <br />
          <div className="" id="printArea">
            <div className="position-relative padding-top-5 padding-bottom-2">
              Facility Name:{" "}
              <span className="text-bold padding-left-1">
                {" "}
                {facilityMainName}
              </span>
            </div>
            <div className="subheader-wrapper bg-epa-blue-base text-white text-normal padding-left-1">
              Facility Details
            </div>

            <div className="grid-row clearfix float-left w-100 border-bottom padding-bottom-2 margin-bottom-2">
              <div className="text-right padding-right-1 display-inline-block text-nowrap padding-top-2">
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
