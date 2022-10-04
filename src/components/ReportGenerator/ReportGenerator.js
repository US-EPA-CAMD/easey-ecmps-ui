import React, { useState, useEffect, Suspense } from "react";
import { useLocation } from "react-router-dom";

import { Preloader } from "@us-epa-camd/easey-design-system";

import Login from "../Login/Login";
import DetailReport from "./DetailReport/DetailReport";
import SummaryReport from "./SummaryReport/SummaryReport";
import * as camdApi from '../../utils/api/camdServices';

import "./ReportGenerator.scss";

export const ReportGenerator = (user) => {
  const search = useLocation().search;
  const params = new URLSearchParams(search);

  const testId = params.get("testId");
  const batchView = params.get("batchView");
  const reportCode = params.get("reportCode");
  const facilityId = params.get("facilityId");
  const monitorPlanId = params.get("monitorPlanId");

  const [reportData, setReportData] = useState();
  const [dataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {
    if (!dataLoaded) {
      camdApi.getReport(reportCode, facilityId, monitorPlanId, testId, batchView)
        .then(response => response.data)
        .then(data => {
          setReportData(data);
          setDataLoaded(true);
        });
    }
  }, [reportCode, facilityId, monitorPlanId, testId, batchView, dataLoaded]);

  const Loading = () => {
    return (
      <div className="height-viewport display-flex flex-justify-center flex-align-center text-center">
        <Preloader />
      </div>
    );
  };

  const Report = () => {
    switch(reportData.templateCode) {
      case "DTLRPT":
        return <DetailReport reportData={reportData} dataLoaded={dataLoaded} />
      case "SUMRPT":
      default:
        return <SummaryReport reportData={reportData} dataLoaded={dataLoaded} />
    }
  };

  return (
    <div className="ReportGenerator">
      {!user.user ? (
        <div className="loginPanel react-transition delayed-fade-in">
          <Login isModal={false} source="ReportGenerator" />
        </div>
      ) : (
        <div className="padding-bottom-5">
          {!dataLoaded ? (
            <Loading />
          ) : (
            <div>
              <Suspense fallback={Loading}>
                <div className="react-transition scale-in">
                  <Report />
                </div>
              </Suspense>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ReportGenerator;
