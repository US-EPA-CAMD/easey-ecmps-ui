import React, { useEffect, useMemo, useState } from "react";
import { connect } from "react-redux";
import { loadMonitoringSystemsComponents } from "../../../store/actions/monitoringSystems";
import * as fs from "../../../utils/selectors/monitoringPlanSystems";
import DataTableSystemsComponentsRender from "../DataTableSystemsComponentsRender/DataTableSystemsComponentsRender";
import SystemComponentsModal from "../../SystemComponentsModal/SystemComponentsModal";
export const DataTableSystemsComponents = ({
  monitoringSystems,
  monitoringSystemsComponents,
  loading,
  systemID,
  loadMonitoringSystemsComponentsData,
  showActiveOnly,
  viewOnly,
  setSecondLevel,
  secondLevel
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
        Header: "Component ID",
        accessor: "col1",
        width: "100px",
      },
      {
        Header: "Type Code",
        accessor: "col2",
        width: "120px",
      },
      {
        Header: "Begin to End Date",
        accessor: "col3",
        width: "410px",
      },
    ],
    []
  );

  const [selectedComponent, setSelectedComponent] = useState("");
  const selectedRowHandler = (val) => {
    for (const x of monitoringSystemsComponents) {
      if (x.componentIdentifier === val[0].value) {
        setSelectedComponent(x);
        setSecondLevel(true)
      }
    }
  };
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
      {!secondLevel ? (
        <DataTableSystemsComponentsRender
          columns={columns}
          data={data}
          selectedRowHandler={selectedRowHandler}
        />
      ) : (
        <SystemComponentsModal
          backBTN={setSecondLevel}
          viewOnly={viewOnly}
          modalData={selectedComponent}
        />
      )}
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
