import { ArrowDownwardSharp } from "@material-ui/icons";
import { Button } from "@trussworks/react-uswds";
import log from "loglevel";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import DataTable from "react-data-table-component";
import { useNavigate } from "react-router-dom";

import { formatDate } from "../../../utils/functions";
import { getMatsSubmissions } from "../../../utils/api/qaCertificationsAPI";
import { DataStatus } from "../../../utils/constants/dataStatus";
import StatusContent from "../../StatusContent/StatusContent";

const DataTableMatsSubmission = ({
  canSubmit = false,
  selectedConfigId,
  selectedLocation,
  selectedReportType,
}) => {
  const navigate = useNavigate();

  const selectedConfig = useSelector((state) =>
    Object.values(state.monitoringPlans)
      .flat()
      .find((mp) => mp.id === selectedConfigId),
  );

  const [data, setData] = useState([]);
  const [status, setStatus] = useState(DataStatus.IDLE);

  const onResubmit = (row) => {
    navigate("create", {
      relative: "path",
      state: {
        selectedConfigId,
        originalSubmission: row,
      },
    });
  };

  const filteredData = data
    .filter((row) => !selectedLocation || row.locationId === selectedLocation)
    .filter(
      (row) => !selectedReportType || row.reportTypeCode === selectedReportType,
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
                disabled={row.statusCode !== "COMPLETE"}
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
      selector: (row) => selectedConfig?.orisCode,
    },
    {
      name: "Facility Name",
      selector: (row) => selectedConfig?.facilityName,
    },
    {
      name: "FRS ID",
      selector: (row) => selectedConfig?.facilityRegistrySystemId,
    },
    {
      name: "Location",
      selector: (row) =>
        selectedConfig?.monitoringLocationData.find(
          (loc) => loc.id === row.locationId,
        )?.name,
    },
    {
      name: "Averaging Group",
      selector: (row) => row.averagingGroupCode,
    },
    { name: "Report Type", selector: (row) => row.reportTypeCode },
    {
      name: "Pollutants",
      selector: (row) => row.pollutantCodes.join(", "),
    },
    {
      name: "Test Methods",
      selector: (row) => row.testMethodCodes.join(", "),
    },
    { name: "Test Number", selector: (row) => row.testNumber },
    {
      name: "Test Date",
      selector: (row) => (row.testDate ? formatDate(row.testDate) : null),
    },
    { name: "Test Comment", selector: (row) => row.testComment },
    {
      name: "Year / Quarter",
      selector: (row) =>
        row.year && row.quarter ? `${row.year} Q${row.quarter}` : null,
    },
    { name: "Status", selector: (row) => row.statusCode },
  ].map((column) => ({
    ...column,
    sortable: true,
    wrap: true,
  }));

  useEffect(() => {
    if (status !== DataStatus.IDLE) return;

    setStatus(DataStatus.PENDING);
    getMatsSubmissions(selectedConfigId)
      .then((res) => {
        setData(res.data.items);
        setStatus(DataStatus.SUCCESS);
      })
      .catch((err) => {
        log.error(err);
        setStatus(DataStatus.ERROR);
      });
  }, [selectedConfigId, status]);

  return (
    <StatusContent errorMsg="Error loading MATS submissions." status={status}>
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
