import React, { useEffect, useMemo } from "react";
import { connect } from "react-redux";
import { loadMonitoringMatsMethods } from "../../../store/actions/monitoringMethods";
import * as fs from "../../../utils/selectors/monitoringPlanMethods";
import DataTableMatsRender from "../DataTableMatsRender/DataTableMatsRender";

export const DataTableMats = ({
  monitoringMatsMethods,
  loading,
  locationSelect,
}) => {
  useEffect(() => {
    if (monitoringMatsMethods.length === 0 || loading === false) {
      loadMonitoringMatsMethods(locationSelect);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locationSelect]);

  // *** column names for dataset (will be passed to normalizeRowObjectFormat later to generate the row object
  // *** in the format expected by the modal / tabs plugins)
  const columnNames = [];
  columnNames.push("Parameter");
  columnNames.push("Methodology");
  columnNames.push("Begin Date and Time");
  columnNames.push("End Date and Time");

  // *** generate columns array of object based on columnNames array above
  const columns = [];

  columnNames.forEach((name, index) => {
    columns.push({
      name,
      selector: `col${index + 1}`,
      sortable: true,
    });
  });

  const data = useMemo(() => {
    if (monitoringMatsMethods.length > 0 || loading === false) {
      return fs.getMonitoringPlansMatsMethodsTableRecords(
        monitoringMatsMethods
      );
    } else {
      return [{ col2: "Loading list of Supplemental Methods" }];
    }
  }, [loading, monitoringMatsMethods]);

  return (
    <div className="methodTable">
      <DataTableMatsRender columns={columns} data={data} />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    monitoringMatsMethods: state.monitoringMethods.matsMethods,
    loading: state.apiCallsInProgress.monitoringMethods,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadMonitoringMatsMethodsData: (monitoringPlanLocationSelect) =>
      dispatch(loadMonitoringMatsMethods(monitoringPlanLocationSelect)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DataTableMats);
