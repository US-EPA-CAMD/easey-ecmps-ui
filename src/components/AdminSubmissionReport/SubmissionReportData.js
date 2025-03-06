import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { Preloader } from "@us-epa-camd/easey-design-system";
import { Button, Checkbox } from "@trussworks/react-uswds";
import { ArrowDownwardSharp } from "@material-ui/icons";
import { submissionAccessTitle } from "../../utils/constants/moduleTitles";

import { exportToCSV } from "../../utils/functions";


export const SubmissionReportData = ({
  data = [],
  isLoading = false,
  selectedRows,
  setSelectedRows,
}) => {
 

  const [filteredData, setFilteredData] = useState(data);
  useEffect(() => {
    setFilteredData(data);
  }, [data]);

  const downloadFilteredDataIntoCSV = () => {

    // Extract only the displayed columns
    let columnMapping = {
      orisCode: "Facility ID",
      facilityName: "Facility Name",
      state: "State",
      location: "MP Location ",
      reportingPeriodAbbreviation: "Reporting Period",
      reportingFrequencyCode: "Reporting Frequency",
      submissionTypeCode: "Submission Type",
      submissionId: "Submission ID",
      submissionDateTime:"Submission Date/Time",
      severityLevel: "Severity Level",
      mostRecet: "Most Recent",
      submissionStatus: "Submission Status",
      criticalErrLevelOne: "Critical Error Level 1",
      criticalErrLevelTwo: "Critical Error Level 2",
      nonCritical: "Non-Critical",
      infoMessage: "Informational Message",
      adminOverride: "Administrative Override",
      submitter: "Submitter"
    };

    const facilityName = filteredData[0].facilityName;
    const orisCode = filteredData[0].orisCode
    const reportingPeriod = filteredData[0].reportingPeriodAbbreviation
  
    exportToCSV(filteredData, columnMapping, `Submission_Report_${facilityName}(${orisCode})_${reportingPeriod}`)
    
  };

  const onRowSelection = (row, checked) => {
    row.selected = checked;
    if (checked) {
      setSelectedRows((prev) => [...prev, row]);
    } else {
      const currSelectedRows = selectedRows.filter((r) => r.id !== row.id);
      setSelectedRows(currSelectedRows);
    }
  };

  const columns = [
    {
      name: "Select",
      width: "95px",
      cell: (row, idx) => (
        <div>
          <Checkbox
            data-testid={`select-cb-${idx}`}
            className="margin-bottom-5"
            aria-label={`select row for EM Submission Access record with id ${row.id}`}
            id={idx}
            key={idx}
            onChange={(e) => {
              onRowSelection(row, e.target.checked);
            }}
            onKeyUp={(event) => {
              if (event.key === "Enter") {
                onRowSelection(row, !event.target.checked);
                event.target.checked = !event.target.checked;
              }
            }}
            defaultChecked={row.selected}
          />
        </div>
      ),
    },
    {
      name: "Facility ID",
      width: "210px",
      selector: (row) => `${row.orisCode}`,
      sortable: true,
    },
    {
      name: "Facility Name",
      width: "210px",
      selector: (row) => `${row.facilityName}`,
      sortable: true,
    },
    {
      name: "State",
      width: "210px",
      selector: (row) => row.state,
      sortable: true,
    },
    {
      name: "MP location",
      width: "210px",
      selector: (row) => row.location,
      sortable: true,
    },
    {
      name: "Reporting Period",
      width: "210px",
      selector: (row) => row.reportingPeriodAbbreviation,
      sortable: true,
    },
    {
      name: "Reporting Frequency",
      width: "230px",
      selector: (row) => row.reportingFrequencyCode,
      sortable: true,
    },
    {
      name: "Submission Type",
      width: "150px",
      selector: (row) => row.submissionTypeCode,
      sortable: true,
    },
    {
      name: "Submission ID",
      width: "150px",
      selector: (row) => row.submissionId,
      sortable: true,
    },
    {
      name: "Submission Date/Time",
      width: "150px",
      selector: (row) => row.submissionDateTime,
      sortable: true,
    },
    {
      name: "Severity Level",
      width: "200px",
      selector: (row) => row.severityLevel,
      sortable: true,
    },
    {
      name: "Most Recent",
      width: "160px",
      selector: (row) => row.mostRecet,
      sortable: true,
    },
    {
      name: "Submission Status",
      width: "160px",
      selector: (row) => row.submissionStatus,
      sortable: true,
    },
    {
      name: "Critical Error Level 1",
      width: "160px",
      selector: (row) => row.criticalErrLevelOne,
      sortable: true,
    },
    {
      name: "Critical Error Level 2",
      width: "160px",
      selector: (row) => row.criticalErrLevelTwo,
      sortable: true,
    },
    {
      name: "Non-Critical",
      width: "160px",
      selector: (row) => row.nonCritical,
      sortable: true,
    },
    {
      name: "Informational Message",
      width: "160px",
      selector: (row) => row.infoMessage,
      sortable: true,
    },
    {
      name: "Administrative Override",
      width: "160px",
      selector: (row) => row.adminOverride,
      sortable: true,
    },
    {
      name: "Submitter",
      width: "160px",
      selector: (row) => row.submitter,
      sortable: true,
    },
  ];



  return (
    <div>
      <div className="padding-left-0 margin-left-0 padding-right-0">
        <div className="grid-row row-width">
          <div className="grid-col-4">
            <span className="data-container-header">
              {submissionAccessTitle}
            </span>
          </div>
        </div>
        <br/>
        <div className="es-datatable margin-top-5">
          <div className="grid-row" style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button
                  type="button"
                  data-testid={`em-submission-download-csv-button`}
                  title={"Download To CSV"}
                  onClick={downloadFilteredDataIntoCSV}
                  disabled={!filteredData || filteredData.length === 0}
                >
                  {"Download To CSV"}
                </Button>
            </div>
          <span data-aria-label={"Maintain EM Submission Access"}></span>
          {isLoading && <Preloader />}
          {!isLoading && (
            <DataTable
              sortIcon={
                <ArrowDownwardSharp className="margin-left-2 text-primary" />
              }
              noHeader={true}
              fixedHeader={false}
              columns={columns}
              data={filteredData}
              className={`data-display-table react-transition fade-in`}
              pagination={true}
              paginationPerPage={10}
              paginationRowsPerPageOptions={[10, 25, 50]}
            />
          )}
        </div>
      </div>
    </div>
  );
};
