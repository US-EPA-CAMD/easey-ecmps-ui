import React, { useEffect, useMemo, useState } from "react";
import * as fs from "../../../utils/selectors/monitoringPlanSystems";

import SystemComponentsModal from "../../SystemComponentsModal/SystemComponentsModal";
import SystemFuelFlowsModal from "../../SystemFuelFlowsModal/SystemFuelFlowsModal";

import * as mpApi from "../../../utils/api/monitoringPlansApi";

import DataTableRender from "../../DataTableRender/DataTableRender";
import "./DataTableSystemsComponentsRender.scss";

export const DataTableSystemsComponents = ({
  systemID,
  showActiveOnly,
  viewOnly,
  setSecondLevel,
  secondLevel,
  locationSelectValue,
}) => {
  const [monitoringSystemsFuelFlows, setMonitoringSystemsFuelFlows] = useState(
    ""
  );
  const [dataLoaded, setDataLoaded] = useState(false);
  const [dataFuelLoaded, setFuelDataLoaded] = useState(false);

  const [selected, setSelected] = useState(1);
  const [
    monitoringSystemsComponents,
    setMonitoringSystemsComponents,
  ] = useState("");
  useEffect(() => {
    mpApi.getMonitoringSystems(locationSelectValue).then((res) => {
      for (let value of res.data) {
        if (value.systemIdentifier === systemID) {
          setSelected(value);
        }
      }
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [systemID]);

  useEffect(() => {
    mpApi
      .getMonitoringSystemsComponents(selected.monLocId, selected.id)
      .then((res) => {
        setMonitoringSystemsComponents(res.data);
        setDataLoaded(true);
      });

    mpApi
      .getMonitoringSystemsFuelFlows(selected.monLocId, selected.id)
      .then((res) => {
        setMonitoringSystemsFuelFlows(res.data);
        setFuelDataLoaded(true);
      });
  }, [selected]);

  const columnNames = ["Component ID", "Type Code", "Begin to End Date"];

  // // *** add column with action button
  // columns.push({
  //   name: "Actions",
  //   button: true,
  //   width: "15%",
  //   cell: (row) => {
  //     // *** normalize the row object to be in the format expected by DynamicTabs
  //     const normalizedRow = normalizeRowObjectFormat(row, columnNames);

  //     return (
  //       <div
  //         className="cursor-pointer"
  //         tabIndex="0"
  //         aria-label={viewOnly ? "Click to View" : "Click to View or Edit"}
  //         onClick={() => selectedRowHandler(normalizedRow.cells)}
  //       >
  //         <CreateSharp className="margin-right-1" />
  //         {viewOnly ? "View" : "View/Edit"}
  //       </div>
  //     );
  //   },
  // });

  // *** column names for dataset (will be passed to normalizeRowObjectFormat later to generate the row object
  // *** in the format expected by the modal / tabs plugins)
  const fuelFlowsColumnNames = ["Fuel Code", "Type Code", "Begin to End Date"];

  const [selectedComponent, setSelectedComponent] = useState("");
  const selectedRowHandler = (val) => {
    for (const x of monitoringSystemsComponents) {
      if (x.componentIdentifier === val.col1) {
        setSelectedComponent(x);
        setSecondLevel(true);
      }
    }

    for (const x of monitoringSystemsFuelFlows) {
      if (x.fuelCode === val.col1) {
        setSelectedComponent(x);
        setSecondLevel(true);
      }
    }
  };
  const data = useMemo(() => {
    if (monitoringSystemsComponents.length > 0) {
      return fs.getMonitoringPlansSystemsComponentsTableRecords(
        monitoringSystemsComponents
      );
    } else {
      return [];
    }
  }, [monitoringSystemsComponents]);

  const fuelFlowsData = useMemo(() => {
    if (monitoringSystemsFuelFlows.length > 0) {
      return fs.getMonitoringPlansSystemsFuelFlowsComponentsTableRecords(
        monitoringSystemsFuelFlows
      );
    } else {
      return [];
    }
  }, [monitoringSystemsFuelFlows]);

  return (
    <div className="methodTable">
      {(() => {
        if (!secondLevel) {
          return (
            <div>
              <DataTableRender
                columnNames={columnNames}
                data={data}
                openHandler={selectedRowHandler}
                tableTitle="System Components"
                componentStyling="systemsCompTable"
                dataLoaded={dataLoaded}
                actionsBtn= {"View"}
              />
              <DataTableRender
                columnNames={fuelFlowsColumnNames}
                data={fuelFlowsData}
                openHandler={selectedRowHandler}
                tableTitle="Fuel Flows"
                button
                componentStyling="systemsCompTable"
                dataLoaded={dataFuelLoaded}
                
                actionsBtn= {"View"}
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

export default DataTableSystemsComponents;
