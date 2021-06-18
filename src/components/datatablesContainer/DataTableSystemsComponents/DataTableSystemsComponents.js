import React, { useEffect, useMemo, useState } from "react";
import { connect } from "react-redux";

import {
  loadMonitoringSystemsComponents,
  loadMonitoringSystemsFuelFlows,
} from "../../../store/actions/monitoringSystems";
import * as fs from "../../../utils/selectors/monitoringPlanSystems";

import DataTableSystemsComponentsRender from "../DataTableSystemsComponentsRender/DataTableSystemsComponentsRender";
import SystemComponentsModal from "../../SystemComponentsModal/SystemComponentsModal";
import SystemFuelFlowsModal from "../../SystemFuelFlowsModal/SystemFuelFlowsModal";

import { normalizeRowObjectFormat } from "../../../additional-functions/react-data-table-component";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons";

export const DataTableSystemsComponents = ({
  monitoringSystems,
  monitoringSystemsComponents,
  monitoringSystemsFuelFlows,
  loading,
  systemID,
  loadMonitoringSystemsComponentsData,
  loadMonitoringSystemsFuelFlowsData,
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
    loadMonitoringSystemsFuelFlowsData(selected.monLocId, selected.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showActiveOnly, monitoringSystemsComponents]);

  // *** column names for dataset will be passed to normalizeRowObjectFormat later to generate the row object
  // *** in the format expected by the modal / tabs plugins
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
          tabIndex="0"
          aria-label={viewOnly ? "Click to View" : "Click to View or Edit"}
          onClick={() => selectedRowHandler(normalizedRow.cells)}
        >
          <FontAwesomeIcon icon={faPencilAlt} className="margin-right-1" />
          {viewOnly ? "View" : "View/Edit"}
        </div>
      );
    },
  });

  // *** column names for dataset (will be passed to normalizeRowObjectFormat later to generate the row object
  // *** in the format expected by the modal / tabs plugins)
  const fuelFlowsColumnNames = [];
  fuelFlowsColumnNames.push("Fuel Code");
  fuelFlowsColumnNames.push("Type Code");
  fuelFlowsColumnNames.push("Begin to End Date");

  // *** generate columns array of object based on columnNames array above
  const fuelFlowsColumns = [];

  fuelFlowsColumnNames.forEach((name, index) => {
    fuelFlowsColumns.push({
      name,
      selector: `col${index + 1}`,
      sortable: true,
    });
  });

  // *** add column with action button
  fuelFlowsColumns.push({
    name: "Actions",
    button: true,
    width: "15%",
    cell: (row) => {
      // *** normalize the row object to be in the format expected by DynamicTabs
      const normalizedRow = normalizeRowObjectFormat(row, fuelFlowsColumnNames);

      return (
        <div
          className="cursor-pointer"
          tabIndex="0"
          aria-label="Click to view fuel flow details"
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

    for (const x of monitoringSystemsFuelFlows) {
      if (x.fuelCode === val[0].value) {
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
      return [{ col2: "Loading list of System Components" }];
    }
  }, [loading, monitoringSystemsComponents]);

  const fuelFlowsData = useMemo(() => {
    if (monitoringSystemsFuelFlows !== undefined) {
      // return fs.getMonitoringSystemsComponentsTableRecords(showActiveOnly? fs.getActiveMethods(monitoringSystems):monitoringSystems);
      return fs.getMonitoringPlansSystemsFuelFlowsComponentsTableRecords(
        monitoringSystemsFuelFlows
      );
    } else {
      return [{ col2: "Loading list of Fuel Flows" }];
    }
  }, [monitoringSystemsFuelFlows]);

  return (
    <div className="methodTable">
      {(() => {
        if (!secondLevel) {
          return (
            <div>
              <DataTableSystemsComponentsRender
                columns={columns}
                data={data}
                selectedRowHandler={selectedRowHandler}
                title="System Components"
              />
              <DataTableSystemsComponentsRender
                columns={fuelFlowsColumns}
                data={fuelFlowsData}
                selectedRowHandler={selectedRowHandler}
                title="Fuel Flows"
              />
            </div>
          );
        } else {
          if (selectedComponent.sysFuelUomCode !== undefined) {
            return (
              <SystemFuelFlowsModal
                backBTN={setSecondLevel}
                viewOnly={viewOnly}
                modalData={selectedComponent}
              />
            );
          } else {
            return (
              <SystemComponentsModal
                backBTN={setSecondLevel}
                viewOnly={viewOnly}
                modalData={selectedComponent}
              />
            );
          }
        }
      })()}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    monitoringSystems: state.monitoringSystems.systems,
    monitoringSystemsFuelFlows: state.monitoringSystems.fuelFlows,
    monitoringSystemsComponents: state.monitoringSystems.components,
    loading: state.apiCallsInProgress.monitoringSystemsComponents,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadMonitoringSystemsComponentsData: (systemID, location) =>
      dispatch(loadMonitoringSystemsComponents(systemID, location)),
    loadMonitoringSystemsFuelFlowsData: (systemId, location) =>
      dispatch(loadMonitoringSystemsFuelFlows(systemId, location)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DataTableSystemsComponents);
