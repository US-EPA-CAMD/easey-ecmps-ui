import React from "react";
import DataTable from "react-data-table-component";
import PropTypes from "prop-types";


const AdminUnitsExpectedToSubmitSubRecords = ({ data }) => {
  const subRecords = data.subRecords || [];

  if (subRecords.length === 0) {
    return <div className="padding-2">No sub-records available</div>;
  }

  const columns = [
    {
      name: "Unit ID",
      selector: row => row.unitid,
      sortable: true,
      wrap: true,
    },
    {
      name: "Program",
      selector: row => row.programcode,
      sortable: true,
      wrap: true,
    },
    {
      name: "Unit Classification",
      selector: row => row.unittypedescription,
      sortable: true,
      wrap: true,
    },
    {
      name: "Commence Operation Date",
      selector: row => row.commopdate,
      sortable: true,
    },
    {
      name: "Commercial Operation Date",
      selector: row => row.comropdate,
      sortable: true,
    },
    {
      name: "Operating Status",
      selector: row => row.opstatusdescription,
      sortable: true,
    },
    {
      name: "Cert Begin",
      selector: row => row.unitmonitorcertbegindate,
      sortable: true,
    },
    {
      name: "Cert Deadline",
      selector: row => row.unitmonitorcertdeadline,
      sortable: true,
    },
    {
      name: "Recording Begin",
      selector: row => row.emissionsrecordingbegindate,
      sortable: true,
    },
  ];

  return (
    <div className="padding-2">
      <DataTable
        columns={columns}
        data={subRecords}
        pagination={false}   
      />
    </div>
  );
};

AdminUnitsExpectedToSubmitSubRecords.propTypes = {
  data: PropTypes.shape({
    subRecords: PropTypes.arrayOf(
      PropTypes.shape({
        unitid: PropTypes.string,
        programcode: PropTypes.string,
        programdescription: PropTypes.string,
        unittypedescription: PropTypes.string,
        commopdate: PropTypes.string,
        comropdate: PropTypes.string,
        opstatusdescription: PropTypes.string,
        unitmonitorcertbegindate: PropTypes.string,
        unitmonitorcertdeadline: PropTypes.string,
        emissionsrecordingbegindate: PropTypes.string,
      })
    )
  }).isRequired,
};

export default AdminUnitsExpectedToSubmitSubRecords;