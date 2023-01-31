import React, { useState, useEffect, Suspense } from "react";
import { useLocation } from "react-router-dom";

import { Preloader } from "@us-epa-camd/easey-design-system";

import Login from "../Login/Login";
import Report from "./Report/Report";
import * as camdApi from '../../utils/api/camdServices';

import "./ReportGenerator.scss";
import { Button, GovBanner } from "@trussworks/react-uswds";

export const ReportGenerator = ({user, requireAuth = false}) => {
  const search = useLocation().search;
  const params = new URLSearchParams(search);

  const teeId = params.get("teeId");
  const qceId = params.get("qceId");
  const testId = params.get("testId");
  const facilityId = params.get("facilityId");
  const reportCode = params.get("reportCode");
  const monitorPlanId = params.get("monitorPlanId");

  const [reportData, setReportData] = useState();
  const [dataLoaded, setDataLoaded] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!dataLoaded) {
      camdApi.getReport(reportCode, facilityId, monitorPlanId, testId, qceId, teeId)
        .then(response => response.data)
        .then(data => {
          setReportData(data);
          setDataLoaded(true);
        })
        .catch((err) =>{
          setError(true);
          console.error(err);
        });
    }
  }, [reportCode, facilityId, monitorPlanId, testId, qceId, teeId, dataLoaded]);

  const Loading = () => {
    return (
      <div className="height-viewport display-flex flex-justify-center flex-align-center text-center">
        <Preloader />
      </div>
    );
  };
  if (error) {
    return <ErrorMessage />
  }
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

export const ErrorMessage = () => (
  <div>
    <GovBanner className="padding-y-2px bg-base-lighter do-not-print" />

    <div className="">
      <div className="padding-x-5 padding-y-3 border-bottom-1px border-base-light">
        <img
          alt="EPA Logo"
          title="EPA Logo"
          src={`${process.env.PUBLIC_URL}/images/epa-logo-blue.svg`}
        />
        <Button
          type="button"
          outline={true}
          aria-label={`Close Window`}
          className="float-right clearfix do-not-print"
          onClick={() => window.close()}
          id="closeBTN"
          epa-testid="closeBTN"
        >
          Close Report
        </Button>
      </div>

      <div className="padding-x-5">
        <h1 className="text-bold">Report could not be generated</h1>
      </div>
    </div>
  </div>
);
