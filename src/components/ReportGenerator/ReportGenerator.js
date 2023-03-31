import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import { Button, GovBanner } from "@trussworks/react-uswds";
import { Preloader } from "@us-epa-camd/easey-design-system";

import Login from "../Login/Login";
import Report from "./Report/Report";
import * as camdApi from "../../utils/api/camdServices";

import "./ReportGenerator.scss";

export const ReportGenerator = ({ user, requireAuth = false }) => {
  const search = useLocation().search;
  const searchParams = new URLSearchParams(search);

  const year = searchParams.get("year");
  const teeId = searchParams.get("teeId");
  const qceId = searchParams.get("qceId");
  const testId = searchParams.get("testId");
  const quarter = searchParams.get("quarter");
  const facilityId = searchParams.get("facilityId");
  const reportCode = searchParams.get("reportCode");
  const monitorPlanId = searchParams.get("monitorPlanId");

  const [error, setError] = useState();
  const [reportData, setReportData] = useState();
  const [dataLoaded, setDataLoaded] = useState(false);

  const params = {
    reportCode,
    facilityId,
    monitorPlanId,
    testId,
    qceId,
    teeId,
    year,
    quarter,
  };

  useEffect(() => {
    if (((requireAuth && user) || !requireAuth) && !dataLoaded) {
      camdApi
        .getReport(params)
        .then((response) => {
          setReportData(response.data);
          setDataLoaded(true);
        })
        .catch((error) => {
          setError(error.response?.data?.message);
        });
    }
  }, [user, requireAuth, dataLoaded, params]);

  if (error) {
    return <ErrorMessage error={error} />;
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
            <div className="height-viewport display-flex flex-justify-center flex-align-center text-center">
              <Preloader />
            </div>
          ) : (
            <div>
              <div className="react-transition scale-in">
                <Report reportData={reportData} dataLoaded={dataLoaded} />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ReportGenerator;

export const ErrorMessage = ({ error }) => (
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
        <h1 className="text-bold">
          An error occurred while generating the report
        </h1>
        <p>{error}</p>
      </div>
    </div>
  </div>
);
