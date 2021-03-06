import React, { useEffect, useState, Suspense, lazy } from "react";
import { useParams } from "react-router-dom";
import * as mpApi from "../../utils/api/monitoringPlansApi";
import * as facApi from "../../utils/api/facilityApi";
import { Preloader } from "@us-epa-camd/easey-design-system";

import "./ReportGenerator.scss";
import Login from "../Login/Login";

export const ReportGenerator = (user) => {
  // *** determine report type that needs to be generated from the url
  const reportType = window.location.href.split("/").pop();

  // *** extract id from url params
  const { id } = useParams();
  const [facility, setFacility] = useState("");
  const [dataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {
    if (!dataLoaded) {
      // *** obtain plan info needed to generate report
      mpApi.getRefreshInfo(id).then((configRes) => {
        const plan = configRes.data;

        facApi.getFacilityById(plan.facId).then((facRes) => {
          const fac = facRes.data;
          const orisCode = fac.facilityId;

          mpApi.getMonitoringPlans(orisCode).then((plansRes) => {
            const plans = plansRes.data;
            const currPlan = plans.find((ele) => ele.id === id);
            const facName = fac.facilityName + "(" + currPlan.name + ")";

            setFacility(facName);
            setDataLoaded(true);
          });
        });
      });
    }
  }, [dataLoaded, id]);

  const Report = () => {
    // *** output reports based on determined type
    switch (reportType) {
      case "evaluation-report":
        // noinspection JSCheckFunctionSignatures
        const MonitoringPlanEvaluationReport = lazy(() =>
          import(
            "../MonitoringPlanEvaluationReport/MonitoringPlanEvaluationReport"
          )
        );
        return (
          <MonitoringPlanEvaluationReport
            monitorPlanId={id}
            facility={facility}
            showTitle={true}
          />
        );

      default:
        break;
    }
  };

  const Loading = () => {
    return (
      <div className="height-viewport display-flex flex-justify-center flex-align-center text-center">
        <Preloader />
      </div>
    );
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
