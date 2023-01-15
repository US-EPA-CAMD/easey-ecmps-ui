import React, { useState, useEffect, Suspense } from "react";
import { useLocation } from "react-router-dom";

import { Preloader } from "@us-epa-camd/easey-design-system";

import Login from "../Login/Login";
import Report from "./Report/Report";
import * as camdApi from '../../utils/api/camdServices';

import "./ReportGenerator.scss";

export const ReportGenerator = ({user, requireAuth = false}) => {
  const search = useLocation().search;
  const params = new URLSearchParams(search);

  const testId = params.get("testId");
  const reportCode = params.get("reportCode");
  const facilityId = params.get("facilityId");
  const monitorPlanId = params.get("monitorPlanId");

  const [reportData, setReportData] = useState();
  const [dataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {
    if (!dataLoaded) {
      camdApi.getReport(reportCode, facilityId, monitorPlanId, testId)
        .then(response => response.data)
        .then(data => {
          setReportData(data);
          setDataLoaded(true);
        });
    }
  }, [reportCode, facilityId, monitorPlanId, testId, dataLoaded]);

  const Loading = () => {
    return (
      <div className="height-viewport display-flex flex-justify-center flex-align-center text-center">
        <Preloader />
      </div>
    );
  };

  return (
    <div className="ReportGenerator">
      {requireAuth && !user ? (
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
                  <Report reportData={reportData} dataLoaded={dataLoaded} />
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
