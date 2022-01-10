import React, { useState, useEffect } from "react";
import { Button, GovBanner } from "@trussworks/react-uswds";
import { DataTableRender } from "../DataTableRender/DataTableRender";
import * as mpApi from "../../utils/api/monitoringPlansApi";
import * as fs from "../../utils/selectors/monitoringPlanEvalData";
import { AppVersion } from "@us-epa-camd/easey-design-system";
import config from "../../config";

export const MonitoringPlanEvaluationReport = ({
  monitorPlanId,
  facility,
  showTitle = false,
}) => {
  // *** extract facility main and additional names
  const splitFacility = facility.split("(");
  const facilityMainName = splitFacility[0];
  const facilityAdditionalName = splitFacility[1].replace(")", "");

  const [dataLoaded, setDataLoaded] = useState(false);
  const [reportData, setReportData] = useState(null);
  const [displayCloseButton, setDisplayCloseButton] = useState(true);

  const columnNames = [
    "Unit/Stack",
    "Severity",
    "Category",
    "Check Code",
    "Result Message",
  ];

  useEffect(() => {
    if (window.opener && window.opener !== window) {
      setDisplayCloseButton(true);
    } else {
      setDisplayCloseButton(false);
    }

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

  // Grabs the Report Area for printing (Print button is excluded)
  const print = () => {
    window.print();
  };

  const closeReport = () => {
    window.close();
  };

  return (
    <>
      {dataLoaded ? (
        <div>
          <GovBanner className="padding-y-2px bg-base-lighter do-not-print" />

          <div className="">
            <div className="padding-x-5 padding-y-3 border-bottom-1px border-base-light">
              <img
                alt="EPA Logo"
                title="EPA Logo"
                src={`${process.env.PUBLIC_URL}/images/epa-logo-blue.svg`}
              />
              {displayCloseButton ? (
                <Button
                  type="button"
                  outline={true}
                  aria-label={`Print the evaluation report`}
                  className="float-right clearfix do-not-print"
                  onClick={() => closeReport()}
                  id="printBTN"
                  epa-testid="printBTN"
                >
                  Close Report
                </Button>
              ) : null}
            </div>

            <div className="padding-x-5">
              {showTitle ? (
                <h1 className="text-bold">
                  Monitoring Plan Evaluation Report
                  <Button
                    type="button"
                    outline={false}
                    aria-label="Print Monitoring Plan Evaluation report"
                    className="float-right clearfix do-not-print"
                    onClick={() => print()}
                    id="printBTN"
                    epa-testid="printBTN"
                  >
                    Print PDF
                  </Button>
                </h1>
              ) : null}

              <div className="text-bold padding-bottom-2 border-bottom-1px border-base-light">
                {displayCurrentDate()}
              </div>

              <div className="padding-top-5 padding-bottom-2">
                Facility Name:
                <span className="text-bold margin-left-2">
                  {facilityMainName}
                </span>
              </div>
              <div className="subheader-wrapper bg-epa-blue-base text-white text-normal padding-left-1">
                Facility Details
              </div>

              <table role="presentation" className="width-auto">
                <tr>
                  <th className="text-right width-auto padding-top-2 text-normal">
                    Facility ID (ORISPL):
                  </th>
                  <td className="width-auto padding-left-1 padding-top-2 text-bold">
                    {reportData.facilityId}
                  </td>
                </tr>
                <tr>
                  <th className="text-right width-auto text-normal">
                    Monitoring Plan Location IDs:
                  </th>
                  <td className="width-auto padding-left-1 text-bold">
                    {facilityAdditionalName}
                  </td>
                </tr>
                <tr>
                  <th className="text-right width-auto text-normal">State:</th>
                  <td className="width-auto padding-left-1 text-bold">
                    {reportData.state}
                  </td>
                </tr>
                <tr>
                  <th className="text-right width-auto text-normal">County:</th>
                  <td className="width-auto padding-left-1 text-bold">
                    {reportData.countyName}
                  </td>
                </tr>
              </table>

              <div className="width-auto border-top-1px border-base-light margin-top-3">
                <DataTableRender
                  columnNames={columnNames}
                  data={reportData.mpReportResults}
                  dataLoaded={dataLoaded}
                  pagination={false}
                  filter={false}
                />
              </div>
              <div className="position-fixed bottom-0 right-0 width-full do-not-print">
                <AppVersion
                  version={config.app.version}
                  publishDate={config.app.published}
                />
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default MonitoringPlanEvaluationReport;
