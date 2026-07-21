import React from "react";
import { Alert } from "@trussworks/react-uswds";
import DataTable from "react-data-table-component";
import { Preloader } from "@us-epa-camd/easey-design-system";

import { workspaceUrl, reportWindowParams } from "../../utils/functions";

// Opens the per-file import results report for a processed row.
const openReport = (row) => {
  const url = workspaceUrl(
    `/reports?reportCode=BULK_IMPORT&facilityId=${row.orisCode}&importId=${row.importId}`
  );
  window.open(url, "Bulk Import Report", reportWindowParams);
};

// A finished file (COMPLETE or ERROR) links to its results report.
const statusCell = (row) =>
  row.statusCode === "COMPLETE" || row.statusCode === "ERROR" ? (
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

// Reporting period only applies to EM files; year/quarter are null otherwise.
const reportingPeriod = (row) =>
  row.year != null && row.quarter != null ? `${row.year} Q${row.quarter}` : "";

const columns = [
  { name: "File Name", selector: (row) => row.fileName, sortable: true, grow: 2 },
  { name: "File Type", selector: (row) => row.fileType, sortable: true, width: "110px" },
  {
    name: "Reporting Period",
    selector: reportingPeriod,
    sortable: true,
  },
  { name: "ORIS", selector: (row) => row.orisCode, sortable: true, width: "100px" },
  { name: "Unit/Stack/Pipe", selector: (row) => row.unitStackPipe, sortable: true },
  {
    name: "Status",
    selector: (row) => row.statusCode,
    cell: statusCell,
    sortable: true,
  },
];

const LatestImport = ({ latest, loading }) => (
  <DataTable
    keyField="importId"
    noHeader
    columns={columns}
    data={latest?.files ?? []}
    progressPending={loading}
    progressComponent={<Preloader />}
    noDataComponent={
      <Alert type="info" slim headingLevel="h3">
        You have no bulk imports yet.
      </Alert>
    }
    className="data-display-table react-transition fade-in"
  />
);

export default LatestImport;
