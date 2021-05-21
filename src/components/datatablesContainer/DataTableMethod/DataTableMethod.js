import React, { useEffect, useMemo } from "react";
import { connect } from "react-redux";
import {
  loadMonitoringMethods,
  loadMonitoringMatsMethods,
} from "../../../store/actions/monitoringMethods";
import * as fs from "../../../utils/selectors/monitoringPlanMethods";
import DataTableMethodRender from "../DataTableMethodRender/DataTableMethodRender";

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
  const columns = useMemo(
    () => [
      {
        Header: "Parameter",
        accessor: "col1",
        width: "240px",
      },
      {
        Header: "Methodology",
        accessor: "col2",
        width: "210px",
      },
      {
        Header: "Substitute Data Approach",
        accessor: "col3",
        width: "410px",
      },
      {
        Header: "Bypass Approach",
        accessor: "col4",
        width: "210px",
      },
      {
        Header: "Begin Date and Time",
        accessor: "col5",
        width: "210px",
      },
      {
        Header: "End Date and Time",
        accessor: "col6",
        width: "210px",
      },
    ],
    []
  );

  const data = useMemo(() => {
    if (monitoringMethods.length > 0 || loading === false) {
      return fs.getMonitoringPlansMethodsTableRecords(
        showActiveOnly
          ? fs.getActiveMethods(monitoringMethods)
          : monitoringMethods
      );
    } else {
      return [{ col2: "Loading list of Methods" }];
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
  }, [locationSelectValue, monitoringMatsMethods.length]);

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
