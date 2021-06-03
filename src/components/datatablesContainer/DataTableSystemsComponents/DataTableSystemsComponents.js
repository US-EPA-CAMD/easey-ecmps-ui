import React, { useEffect, useMemo, useState } from "react";
import { connect } from "react-redux";

import { loadMonitoringSystemsComponents } from "../../../store/actions/monitoringSystems";
import * as fs from "../../../utils/selectors/monitoringPlanSystems";

import DataTableSystemsComponentsRender from "../DataTableSystemsComponentsRender/DataTableSystemsComponentsRender";
import SystemComponentsModal from "../../SystemComponentsModal/SystemComponentsModal";

import { normalizeRowObjectFormat } from "../../../additional-functions/react-data-table-component";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons";

export const DataTableSystemsComponents = ({
  monitoringSystems,
  monitoringSystemsComponents,
  loading,
  systemID,
  loadMonitoringSystemsComponentsData,
  showActiveOnly,
  viewOnly,
  setSecondLevel,
  secondLevel,
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

  // *** column names for dataset (will be passed to normalizeRowObjectFormat later to generate the row object
  // *** in the format expected by the modal / tabs plugins)
  const columnNames = [];
  columnNames.push("Component ID");
  columnNames.push("Type Code");
  columnNames.push("Begin to End Date");

  // *** generate columns array of object based on columnNames array above
  const columns = [];

  columnNames.forEach((name, index) => {
    columns.push({
      name,
      selector: `col${index + 1}`,
      sortable: true,
    });
  });

  // *** add column with action button
  columns.push({
    name: "Actions",
    button: true,
    width: "15%",
    cell: (row) => {
      // *** normalize the row object to be in the format expected by DynamicTabs
      const normalizedRow = normalizeRowObjectFormat(row, columnNames);

      return (
        <div
          className="cursor-pointer"
          onClick={() => selectedRowHandler(normalizedRow.cells)}
        >
          <FontAwesomeIcon icon={faPencilAlt} className="margin-right-1" />
          View
        </div>
      );
    },
  });

  const [selectedComponent, setSelectedComponent] = useState("");
  const selectedRowHandler = (val) => {
    for (const x of monitoringSystemsComponents) {
      if (x.componentIdentifier === val[0].value) {
        setSelectedComponent(x);
        setSecondLevel(true);
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
