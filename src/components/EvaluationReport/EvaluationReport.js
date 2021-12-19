import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import * as mpApi from "../../utils/api/monitoringPlansApi";
import * as facApi from "../../utils/api/facilityApi";
import { Preloader } from "../Preloader/Preloader";

import "./EvaluationReport.scss";
import MonitoringPlanEvaluationReport from "../MonitoringPlanEvaluationReport/MonitoringPlanEvaluationReport";

export const EvaluationReport = () => {
  // get id from router params

  const { id } = useParams();
  const [facility, setFacility] = useState("");
  const [dataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {
    if (!dataLoaded) {
      // get plan info
      mpApi.getRefreshInfo(id).then((configRes) => {
        const plan = configRes.data;
        console.log({ plan });
        facApi.getFacilityById(plan.facId).then((facRes) => {
          const facility = facRes.data;
          const orisCode = facility.facilityId;
          console.log({ facility });
          mpApi.getMonitoringPlans(orisCode).then((plansRes) => {
            const plans = plansRes.data;
            const currPlan = plans.find((ele) => ele.id === id);
            setFacility(facility.facilityName + "(" + currPlan.name + ")");
            setDataLoaded(true);
          });
        });
      });
    }
  }, [dataLoaded, id]);

  return (
    <div className="usa-banner__content fade-in padding-bottom-5">
      {!dataLoaded ? (
        <Preloader />
      ) : (
        <div className="grid-col margin-x-2 minh-tablet-lg" id="main">
          <MonitoringPlanEvaluationReport
            monitorPlanId={id}
            facility={facility}
            showTitle={true}
          />
        </div>
      )}
    </div>
  );
};

export default EvaluationReport;
