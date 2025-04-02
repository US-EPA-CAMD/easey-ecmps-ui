import { ArrowDownwardSharp } from "@material-ui/icons";
import { Button } from "@trussworks/react-uswds";
import log from "loglevel";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { useNavigate } from "react-router-dom";

import { formatDate } from "../../../utils/functions";
import { getMatsSubmissions } from "../../../utils/api/qaCertificationsAPI";
import { dataStatus } from "../../../utils/constants/dataStatus";
import StatusContent from "../../StatusContent/StatusContent";

const DataTableMatsSubmission = ({
  canSubmit = false,
  selectedConfigId,
  selectedLocation,
  selectedReportType,
}) => {
  const navigate = useNavigate();

  const [data, setData] = useState([]);
  const [status, setStatus] = useState(dataStatus.IDLE);

  const onResubmit = (row) => {
    navigate("create", {
      relative: "path",
      state: {
        selectedConfigId,
        originalSubmissionId: row.id,
      },
    });
  };

  const filteredData = data
    .filter((row) => !selectedLocation || row.location.id === selectedLocation)
    .filter(
      (row) => !selectedReportType || row.reportType.code === selectedReportType
    );

  const columns = [
    ...(canSubmit
      ? [
          {
            name: "Action",
            button: true,
            style: { justifyContent: "left" },
            width: "100px",
            cell: (row) => (
              <Button
                className="margin-left-1 text-no-wrap"
                disabled={row.status.code !== "COMPLETE"}
                onClick={() => onResubmit(row)}
                type="button"
                unstyled
              >
                Resubmit
              </Button>
            ),
          },
        ]
      : []),
    {
      name: "Submission ID",
      selector: (row) => row.id,
    },
    {
      name: "ORIS Code",
      selector: (row) => row.orisCode,
    },
    {
      name: "Facility Name",
      selector: (row) => row.facilityName,
    },
    { name: "FRS ID", selector: (row) => row.frsId },
    { name: "Location", selector: (row) => row.location?.name },
    {
      name: "Averaging Group",
      selector: (row) => row.averagingGroup?.description,
    },
    { name: "Report Type", selector: (row) => row.reportType?.description },
    {
      name: "Pollutants",
      selector: (row) =>
        row.pollutants?.map((pollutant) => pollutant.description).join(", "),
    },
    {
      name: "Test Methods",
      selector: (row) =>
        row.testMethods?.map((method) => method.description).join(", "),
    },
    { name: "Test Number", selector: (row) => row.testNumber },
    { name: "Test Date", selector: (row) => formatDate(row.testDate) },
    { name: "Test Comment", selector: (row) => row.testComment },
    {
      name: "Year / Quarter",
      selector: (row) => `${row.year} Q${row.quarter}`,
    },
    { name: "Status", selector: (row) => row.status?.description },
  ].map((column) => ({
    ...column,
    sortable: true,
    wrap: true,
  }));

  useEffect(() => {
    if (status !== dataStatus.IDLE) return;

    setStatus(dataStatus.PENDING);
    getMatsSubmissions(selectedConfigId)
      .then((res) => {
        setData(res.data.items);
        setStatus(dataStatus.SUCCESS);
      })
      .catch((err) => {
        log.error(err);
        setStatus(dataStatus.ERROR);
      });
  }, [selectedConfigId, status]);

  return (
    <StatusContent label="MATS Submission" status={status}>
      <DataTable
        className={`data-display-table react-transition fade-in`}
        columns={columns}
        data={filteredData}
        sortIcon={<ArrowDownwardSharp className="margin-left-2 text-primary" />}
      />
    </StatusContent>
  );
};

export default DataTableMatsSubmission;
