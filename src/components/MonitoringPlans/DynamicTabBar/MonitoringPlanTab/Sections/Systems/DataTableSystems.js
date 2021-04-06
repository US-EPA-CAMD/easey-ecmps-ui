import React, { useEffect, useMemo } from "react";
import { connect } from "react-redux";
import { loadMonitoringSystems } from "../../../../../../store/actions/monitoringSystems";
import * as fs from "../../../../../../utils/selectors/monitoringPlanSystems";
import DataTableSystemsRender from "./DataTableSystemsRender";

export const DataTableSystems = ({
  monitoringSystems,
  loadMonitoringSystemsData,
  loading,
  locationSelect,
}) => {
  useEffect(() => {
    if (monitoringSystems.length === 0 || loading === false) {
      loadMonitoringSystemsData(locationSelect);
    }
  }, [locationSelect]);

  const columns = useMemo(
    () => [
      {
        Header: "System ID",
        accessor: "col1",
        // width: Math.round(window.innerWidth * 0.2),
        width: "200px",
      },
      {
        Header: "System Type",
        accessor: "col2",
        // width: Math.round(window.innerWidth * 0.2),
        width: "200px",
      },
      {
        Header: "System Designation",
        accessor: "col3",
        // width: Math.round(window.innerWidth * 0.2),
        width: "200px",
      },
      {
        Header: "Fuel Type",
        accessor: "col4",
        // width: Math.round(window.innerWidth * 0.2),
      },
      {
        Header: "Begin Date and Time",
        accessor: "col5",
        // width: Math.round(window.innerWidth * 0.2),
        width: "200px",
      },
      {
        Header: "End Date and Time",
        accessor: "col6",
        // width: Math.round(window.innerWidth * 0.2),
        width: "200px",
      },
    ],
    []
  );

  const data = useMemo(() => {
    if (monitoringSystems.length > 0 || loading === false) {
      return fs.getMonitoringPlansSystemsTableRecords(monitoringSystems);
    } else {
      return [{ col2: "Loading list of Systems" }];
    }
  }, [loading, monitoringSystems]);

  return (
    <div className="methodTable">
      <DataTableSystemsRender columns={columns} data={data} />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    monitoringSystems: state.monitoringSystems.systems,
    loading: state.apiCallsInProgress.monitoringSystems,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadMonitoringSystemsData: (monitoringPlanLocationSelect) =>
      dispatch(loadMonitoringSystems(monitoringPlanLocationSelect)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DataTableSystems);
