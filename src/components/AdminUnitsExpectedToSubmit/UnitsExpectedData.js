import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { Preloader } from "@us-epa-camd/easey-design-system";
import { Button } from "@trussworks/react-uswds";
import { ArrowDownwardSharp } from "@material-ui/icons";
import PropTypes from "prop-types";

import { unitsExpectedTitle } from "../../utils/constants/moduleTitles";
import { exportToCSV } from "../../utils/functions";

export const UnitsExpectedData = ({
  data = [],
  isLoading = false,
}) => {
  const [filteredData, setFilteredData] = useState(data);

  useEffect(() => {
    setFilteredData(data);
  }, [data]);

  const downloadFilteredDataIntoCSV = () => {
    const columnMapping = {
      facilityId: "Facility ID (ORISPL)",
      facilityName: "Facility Name",
      state: "State",
      unitId: "Unit ID",
      mpLocations: "MP Locations",
      submissionType: "Submission Type",
      openDate: "Open Date",
      closeDate: "Close Date",
      windowStatus: "Window Status",
      submissionStatus: "Submission Status",
      submissionId: "Submission ID",
      submissionDateTime: "Submission Date/Time",
      errorLevel: "Error Level"
    };

    exportToCSV(filteredData, columnMapping, "Units_Expected_To_Submit_Report");
  };

  const columns = [
    {
      name: "Facility ID (ORISPL)",
      selector: (row) => row.facilityId,
      sortable: true,
      wrap: true,
      sortFunction: (a, b) => a.facilityId - b.facilityId
    },
    {
      name: "Facility Name",
      selector: (row) => row.facilityName,
      sortable: true,
      wrap: true,
    },
    {
      name: "State",
      selector: (row) => row.stateCode,
      sortable: true,
      wrap: true,
    },
    {
      name: "Unit ID",
      selector: (row) => row.unitId,
      sortable: true,
      wrap: true,
    },
    {
      name: "MP Locations",
      selector: (row) => row.locations,
      sortable: true,
      wrap: true,
    },
    {
      name: "Submission Type",
      selector: (row) => row.submissionTypeDescription,
      sortable: true,
      wrap: true,
    },
    {
      name: "Open Date",
      selector: (row) => row.accessBeginDate,
      sortable: true,
      wrap: true,
      sortFunction: (a, b) => new Date(a.accessBeginDate) - new Date(b.accessBeginDate)
    },
    {
      name: "Close Date",
      selector: (row) => row.accessEndDate,
      sortable: true,
      wrap: true,
      sortFunction: (a, b) => new Date(a.accessEndDate) - new Date(b.accessEndDate)
    },
    {
      name: "Window Status",
      selector: (row) => row.windowStatus,
      sortable: true,
      wrap: true,
    },
    {
      name: "Submission Status",
      selector: (row) => row.submissionStatus,
      sortable: true,
      wrap: true,
    },
    {
      name: "Submission ID",
      selector: (row) => row.submissionId,
      sortable: true,
      wrap: true,
    },
    {
      name: "Submission Date/Time",
      selector: (row) => row.submissionDate,
      sortable: true,
      wrap: true,
      sortFunction: (a, b) => new Date(a.submissionDate) - new Date(b.submissionDate)
    },
    {
      name: "Error Level",
      selector: (row) => row.errorLevel,
      sortable: true,
      wrap: true,
    },
  ];

  return (
    <div>
      <div className="padding-left-0 margin-left-0 padding-right-0">
        <div className="grid-row row-width">
          <div className="grid-col-4">
            <span className="data-container-header">{unitsExpectedTitle}</span>
          </div>
        </div>
        <br />
        
        <div className="es-datatable margin-top-5">
          <div className="grid-row" style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              type="button"
              data-testid="units-expected-download-csv-button"
              title="Download To CSV"
              onClick={downloadFilteredDataIntoCSV}
              disabled={!filteredData || filteredData.length === 0}
            >
              Download To CSV
            </Button>
          </div>
          
          <span data-aria-label="Units Expected to Submit Report"></span>
          
          {isLoading && <Preloader />}
          
          {!isLoading && (
            <DataTable
              sortIcon={<ArrowDownwardSharp className="margin-left-2 text-primary" />}
              noHeader={true}
              fixedHeader={false}
              columns={columns}
              data={filteredData}
              className="data-display-table-cat react-transition fade-in"
              pagination={true}
              paginationPerPage={10}
              paginationRowsPerPageOptions={[10, 25, 50]}
              pointerOnHover={true}
              highlightOnHover={true}
            />
          )}
        </div>
      </div>
    </div>
  );
};


UnitsExpectedData.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      facilityId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      facilityName: PropTypes.string,
      stateCode: PropTypes.string,
      unitId: PropTypes.string,
      locations: PropTypes.string,
      submissionTypeDescription: PropTypes.string,
      accessBeginDate: PropTypes.string,
      accessEndDate: PropTypes.string,
      windowStatus: PropTypes.string,
      submissionStatus: PropTypes.string,
      submissionId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      submissionDate: PropTypes.string,
      errorLevel: PropTypes.string,
    })
  ),
  isLoading: PropTypes.bool,
};