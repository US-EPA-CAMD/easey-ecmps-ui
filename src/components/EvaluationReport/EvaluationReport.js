import React from "react";
import { useParams } from "react-router-dom";

import "./EvaluationReport.scss";
import MonitoringPlanEvaluationReport from "../MonitoringPlanEvaluationReport/MonitoringPlanEvaluationReport";

export const EvaluationReport = () => {
  const { id } = useParams();
  const facility = "Testing (1,2,3)";
  return (
    <div className="usa-banner__content fade-in padding-bottom-5">
      <div className="grid-col margin-x-2 minh-tablet-lg" id="main">
        {/* <p>{`Placeholder page for evaluation report for monitor plan with ID: ${id}`}</p> */}
        <MonitoringPlanEvaluationReport
          monitorPlanId={id}
          facility={facility}
        />
      </div>
    </div>
  );
};

export default EvaluationReport;
