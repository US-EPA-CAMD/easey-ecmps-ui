import React, { useEffect, useMemo } from "react";
import { connect } from "react-redux";
// import { FaArrowRight } from "react-icons/fa";
import { loadMonitoringSystemsComponents } from "../../../../../../../store/actions/monitoringSystems";
import * as fs from "../../../../../../../utils/selectors/monitoringPlanSystems";
import DataTableSystemsComponentsRender from "./DataTableSystemsComponentsRender";

export const DataTableSystemsComponents = ({
  monitoringSystems,
  monitoringSystemsComponents,
  loading,
  systemID,
  loadMonitoringSystemsComponentsData,
  showActiveOnly,
}) => {
  useEffect(() => {
    let selected = 1;
    for (let value of monitoringSystems) {
      if (value.systemIdentifier === systemID) {
        selected = value;
      }
    }
    loadMonitoringSystemsComponentsData(selected.monLocId, selected.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showActiveOnly, monitoringSystemsComponents]);
  const columns = useMemo(
    () => [
      {
        Header: "Component id",
        accessor: "col1",
        width: "100px",
      },
      {
        Header: "type code",
        accessor: "col2",
        width: "120px",
      },
      {
        Header: "begin",
        accessor: "col3",
        width: "410px",
      },
      // {
      //   Header: "end",
      //   accessor: "col4",
      //   width: "210px",
      // },
    ],
    []
  );

  const data = useMemo(() => {
    if (monitoringSystemsComponents.length > 0 || loading === false) {
      // return fs.getMonitoringSystemsComponentsTableRecords(showActiveOnly? fs.getActiveMethods(monitoringSystems):monitoringSystems);
      return fs.getMonitoringPlansSystemsComponentsTableRecords(
        monitoringSystemsComponents
      );
    } else {
      return [{ col3: "Loading list of System Components" }];
    }
  }, [loading, monitoringSystemsComponents]);
  return (
    <div className="methodTable">
      <DataTableSystemsComponentsRender columns={columns} data={data} />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    monitoringSystems: state.monitoringSystems.systems,
    monitoringSystemsComponents: state.monitoringSystems.components,
    loading: state.apiCallsInProgress.monitoringSystemsComponents,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadMonitoringSystemsComponentsData: (systemID, location) =>
      dispatch(loadMonitoringSystemsComponents(systemID, location)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DataTableSystemsComponents);
