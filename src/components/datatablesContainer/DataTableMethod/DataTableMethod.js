import React, { useEffect, useMemo } from "react";
import { connect } from "react-redux";
import {
  loadMonitoringMethods,
  loadMonitoringMatsMethods,
} from "../../../store/actions/monitoringMethods";
import * as fs from "../../../utils/selectors/monitoringPlanMethods";
import DataTableMethodRender from "../DataTableMethodRender/DataTableMethodRender";
import { Preloader } from "../../Preloader/Preloader";

export const DataTableMethod = ({
  monitoringMethods,
  monitoringMatsMethods,
  loadMonitoringMethodsData,
  loading,
  locationSelectValue,
  loadMonitoringMatsMethodsData,
  matsTableHandler,
  showActiveOnly,
}) => {
  useEffect(() => {
    loadMonitoringMethodsData(locationSelectValue);
    loadMonitoringMatsMethodsData(locationSelectValue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locationSelectValue, showActiveOnly]);

  // *** column names for dataset (will be passed to normalizeRowObjectFormat later to generate the row object
  // *** in the format expected by the modal / tabs plugins)
  const columnNames = [];
  columnNames.push("Parameter");
  columnNames.push("Methodology");
  columnNames.push("Substitute Data Approach");
  columnNames.push("Bypass Approach");
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
    if (monitoringMethods.length > 0 || loading === false) {
      return fs.getMonitoringPlansMethodsTableRecords(
        showActiveOnly
          ? fs.getActiveMethods(monitoringMethods)
          : monitoringMethods
      );
    } else {
      return [{ col3: <Preloader /> }];
    }
  }, [loading, monitoringMethods, showActiveOnly]);

  useMemo(() => {
    if (matsTableHandler) {
      if (monitoringMatsMethods.length < 1) {
        matsTableHandler(false);
      } else {
        matsTableHandler(true);
      }
    }
  }, [monitoringMatsMethods.length, matsTableHandler]);

  return (
    <div className="methodTable">
      <DataTableMethodRender columns={columns} data={data} />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    monitoringMethods: state.monitoringMethods.methods,
    loading: state.apiCallsInProgress.monitoringMethods,
    monitoringMatsMethods: state.monitoringMethods.matsMethods,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadMonitoringMethodsData: (monitoringPlanLocationSelect) =>
      dispatch(loadMonitoringMethods(monitoringPlanLocationSelect)),
    loadMonitoringMatsMethodsData: (monitoringPlanLocationSelect) =>
      dispatch(loadMonitoringMatsMethods(monitoringPlanLocationSelect)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DataTableMethod);
