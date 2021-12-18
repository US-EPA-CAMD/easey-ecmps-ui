import React from "react";
import { useParams } from "react-router-dom";

import "./EvaluationReport.scss";

export const EvaluationReport = () => {
  const { id } = useParams();
  return (
    <div className="usa-banner__content fade-in padding-bottom-5">
      <div className="grid-col margin-x-2 minh-tablet-lg" id="main">
        <p>{`Placeholder page for evaluation report for monitor plan with ID: ${id}`}</p>
      </div>
    </div>
  );
};

export default EvaluationReport;
