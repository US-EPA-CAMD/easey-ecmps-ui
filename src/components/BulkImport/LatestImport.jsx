import React from "react";
import { Alert } from "@trussworks/react-uswds";

import { workspaceUrl, reportWindowParams } from "../../utils/functions";
import Preloader from "../Preloader/Preloader";

// Opens the generated import report for a completed row.
// TODO: the exact report route is finalized by the (out-of-scope) import job;
// keyed on facility + plan here.
const openReport = (row) => {
  const url = workspaceUrl(
    `/reports?reportCode=IMPORT&facilityId=${row.orisCode}&monitorPlanId=${row.monPlanId}`
  );
  window.open(url, "Bulk Import Report", reportWindowParams);
};

const statusCell = (row) =>
  row.statusCode === "COMPLETE" ? (
    <button
      type="button"
      className="usa-button usa-button--unstyled"
      onClick={() => openReport(row)}
    >
      {row.statusCode}
    </button>
  ) : (
    row.statusCode
  );

const LatestImport = ({ latest, loading }) => {
  if (loading) return <Preloader />;

  if (!latest) {
    return (
      <Alert type="info" slim headingLevel="h3">
        You have no bulk imports yet.
      </Alert>
    );
  }

  const files = latest.files ?? [];

  return (
    <table className="usa-table usa-table--borderless width-full">
      <thead>
        <tr>
          <th scope="col">File Name</th>
          <th scope="col">File Type</th>
          <th scope="col">ORIS</th>
          <th scope="col">Unit/Stack/Pipe</th>
          <th scope="col">Status</th>
        </tr>
      </thead>
      <tbody>
        {files.map((row) => (
          <tr key={row.importId}>
            <td>{row.fileName}</td>
            <td>{row.fileType}</td>
            <td>{row.orisCode}</td>
            <td>{row.unitStackPipe}</td>
            <td>{statusCell(row)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default LatestImport;
