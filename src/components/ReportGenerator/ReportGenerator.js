import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

import { Button, GovBanner } from "@trussworks/react-uswds";
import { Preloader } from "@us-epa-camd/easey-design-system";

import Login from "../Login/Login";
import Report from "./Report/Report";
import * as camdApi from "../../utils/api/camdServices";

import "./ReportGenerator.scss";

export const ReportGenerator = ({ user, requireAuth = false }) => {
  const paramsObject = useRef([]);
  const search = useLocation().search;
  const [error, setError] = useState();
  const [reportData, setReportData] = useState();
  const [dataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {
    const searchParams = new URLSearchParams(search);
    const params = Array.from(searchParams);
    paramsObject.current = params;

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
  }, [requireAuth, user, dataLoaded, search]);

  if (error || (dataLoaded && !reportData?.details.length)) {
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
                <Report
                  reportData={reportData}
                  dataLoaded={dataLoaded}
                  paramsObject={paramsObject}
                />
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
          An error has occurred therefore a report cannot be generated at this
          time. Please check back later or contact support.
        </h1>
        <p>{error}</p>
      </div>
    </div>
  </div>
);
