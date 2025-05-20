import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { Preloader } from "@us-epa-camd/easey-design-system";
import { Button, Checkbox } from "@trussworks/react-uswds";
import { ArrowDownwardSharp } from "@material-ui/icons";
import { submissionReportTitle } from "../../utils/constants/moduleTitles";
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
      locations: "MP Location(s) ",
      reportingPeriodAbbreviation: "Identifying Information",
      reportingFrequencyCode: "Reporting Frequency",
      submissionTypeCode: "Submission Type",
      submissionId: "Submission ID",
      submissionDateTime:"Submission Date/Time",
      severityLevel: "Severity Level",
      mostRecent: "Most Recent",
      submissionStatus: "Submission Status",
      criticalErrLevelOne: "Critical Error Level 1",
      criticalErrLevelTwo: "Critical Error Level 2",
      nonCritical: "Non-Critical",
      infoMessage: "Informational Message",
      adminOverride: "Administrative Override",
      submitter: "Submitter"
    };
  
    exportToCSV(filteredData, columnMapping, `Submission_Report`)
    
  };


  const columns = [
    {
      name: "Facility ID",
      selector: (row) => row.orisCode,
      sortable: true,
      wrap: true,   // Enables wrapping of both header and cell content
    },
    {
      name: "Facility Name",
      selector: (row) => row.facilityName,
      sortable: true,
      wrap: true,   // Enables wrapping of both header and cell content
    },
    {
      name: "State",
      selector: (row) => row.state,
      sortable: true,
      wrap: true,   // Enables wrapping of both header and cell content
    },
    {
      name: "MP Location(s)",
      selector: (row) => row.locations,
      sortable: true,
      wrap: true,   // Enables wrapping of both header and cell content
    },
    {
      name: "Identifying Information",
      selector: (row) => row?.reportingPeriodAbbreviation,
      sortable: true,
      sortFunction: (a, b) => {  
        // Have to sort the nulls as well
        // a and b null don't change
        if (!a?.reportingPeriodAbbreviation && !b?.reportingPeriodAbbreviation) return 0;
  
        // Put null/undefined values at the end
        if (!a?.reportingPeriodAbbreviation) return 1;
        if (!b?.reportingPeriodAbbreviation) return -1;
  
        return a.reportingPeriodAbbreviation.toLowerCase().localeCompare(b.reportingPeriodAbbreviation.toLowerCase());
      },
      wrap: true,   // Enables wrapping of both header and cell content
    },
    {
      name: "Reporting Frequency",
      selector: (row) => row.reportingFrequencyCode,
      sortable: true,
      wrap: true,   // Enables wrapping of both header and cell content
    },
    {
      name: "Submission Type",
      selector: (row) => row.submissionTypeCode,
      sortable: true,
      wrap: true,   // Enables wrapping of both header and cell content
    },
    {
      name: "Submission ID",
      selector: (row) => row.submissionId,
      sortable: true,
      wrap: true,   // Enables wrapping of both header and cell content
    },
    {
      name: "Submission Date/Time",
      selector: (row) => row.submissionDateTime,
      sortable: true,
      sortFunction: (a, b) => {
        return a.submissionDateTime.toLowerCase().localeCompare(b.submissionDateTime.toLowerCase());   // alphabetical sort
      },
      wrap: true,   // Enables wrapping of both header and cell content
    },
    {
      name: "Severity Level",
      selector: (row) => row.severityLevel,
      sortable: true,
      wrap: true,   // Enables wrapping of both header and cell content
    },
    {
      name: "Most Recent",
      selector: (row) => row.mostRecent,
      sortable: true,
      wrap: true,   // Enables wrapping of both header and cell content
    },
    {
      name: "Submission Status",
      selector: (row) => row.submissionStatus,
      sortable: true,
      wrap: true,   // Enables wrapping of both header and cell content
    },
    {
      name: "Critical Error Level 1",
      selector: (row) => row.criticalErrLevelOne,
      sortable: true,
      wrap: true,   // Enables wrapping of both header and cell content
    },
    {
      name: "Critical Error Level 2",
      selector: (row) => row.criticalErrLevelTwo,
      sortable: true,
      wrap: true,   // Enables wrapping of both header and cell content
    },
    {
      name: "Non-Critical",
      selector: (row) => row.nonCritical,
      sortable: true,
      wrap: true,   // Enables wrapping of both header and cell content
    },
    {
      name: "Informational Message",
      selector: (row) => row.infoMessage,
      sortable: true,
      wrap: true,   // Enables wrapping of both header and cell content
    },
    {
      name: "Administrative Override",
      selector: (row) => row.adminOverride,
      sortable: true,
      wrap: true,   // Enables wrapping of both header and cell content
    },
    {
      name: "Submitter",
      selector: (row) => row.submitter,
      sortable: true,
      wrap: true,   // Enables wrapping of both header and cell content
    },
  ];



  return (
    <div>
      <div className="padding-left-0 margin-left-0 padding-right-0">
        <div className="grid-row row-width">
          <div className="grid-col-4">
            <span className="data-container-header">
              {submissionReportTitle}
            </span>
          </div>
        </div>
        <br/>
        <div className="es-datatable margin-top-5">
          <div className="grid-row" style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button
                  type="button"
                  data-testid={`submission-list-download-csv-button`}
                  title={"Download To CSV"}
                  onClick={downloadFilteredDataIntoCSV}
                  disabled={!filteredData || filteredData.length === 0}
                >
                  {"Download To CSV"}
                </Button>
            </div>
          <span data-aria-label={"Submission List Report"}></span>
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
              className={`data-display-table-cat react-transition fade-in`}
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
