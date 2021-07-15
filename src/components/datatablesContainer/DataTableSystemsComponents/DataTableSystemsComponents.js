import React, { useEffect, useMemo, useState } from "react";
import * as fs from "../../../utils/selectors/monitoringPlanSystems";
import ModalDetails from "../../ModalDetails/ModalDetails";
import {
  componentTypes,
  acqMethodCode,
  basisCode,
} from "../../SystemComponentsModal/SystemComponentsData";
import SystemComponentsModal from "../../SystemComponentsModal/SystemComponentsModal";
import SystemFuelFlowsModal from "../../SystemFuelFlowsModal/SystemFuelFlowsModal";
import {
  findValue,
  adjustDate,
} from "../../../additional-functions/find-values-in-array";
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
  user,
  checkout,
}) => {
  const [monitoringSystemsFuelFlows, setMonitoringSystemsFuelFlows] = useState(
    ""
  );
  const [dataLoaded, setDataLoaded] = useState(false);
  const [dataFuelLoaded, setFuelDataLoaded] = useState(false);
  const [selectedModalData, setSelectedModalData] = useState(null);
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

  // *** column names for dataset (will be passed to normalizeRowObjectFormat later to generate the row object
  // *** in the format expected by the modal / tabs plugins)
  const fuelFlowsColumnNames = ["Fuel Code", "Type Code", "Begin to End Date"];

  const [selectedComponent, setSelectedComponent] = useState("");

  // object property,Label Name, value, control type,  = arr

  const modalViewData = (selected, label, time, codeList) => {
    const arr = [];

    for (let y in label) {
      if (label[y][1] === "dropdown") {
        const labels = findValue(codeList[y], selected[y], "name");
        arr.push([
          y,
          label[y][0],
          labels,
          "required",
          "dropdown",
          selected[y],
          codeList[y],
        ]);
      } else if (label[y][1] === "input") {
        arr.push([y, label[y][0], selected[y], "required", "input"]);
      } else if (label[y][1] === "radio") {
        arr.push([y, label[y][0], "required", selected[y], "radio"]);
      } else if (y === "skip") {
        arr.push([[], [], [], "", "skip"]);
      }
    }

    for (let y in time) {
      if (y === "endDate" || y === "beginDate") {
        const formattedDate = adjustDate("mm/dd/yyyy", selected[y]);
        arr.push([
          y,
          time[y][0],
          formattedDate,
          y === "endDate" ? " " : "required",
          "date",
          selected[y],
        ]);
      }
      if (y === "endHour" || y === "beginHour") {
        arr.push([
          y,
          time[y][0],
          selected[y],
          y === "endHour" ? " " : "required",
          "time",
          selected[y],
        ]);
      }
    }
    return arr;
  };
  const selectedRowHandlerComponent = (val) => {
    const selectComponents = monitoringSystemsComponents.filter(
      (element) => element.componentIdentifier === val.col1
    )[0];
    setSelectedComponent(selectComponents);
    setSelectedModalData(
      modalViewData(
        selectComponents,
        {
          componentIdentifier: ["Component ID", "input"],
          acquisitionMethodCode: ["Sample Acquistion Method", "dropdown"],
          componentTypeCode: ["Component Type", "dropdown"],
          basisCode: ["Basis Description", "dropdown"],
          manufacturer: ["Manufacturer", "input"],
          modelVersion: ["Modal or Version", "input"],
          serialNumber: ["Serial Number", "input"],
          hgConverterInd: ["Hg Converter Indicator", "radio"],
        },
        {
          beginDate: ["Start Date", "date"],
          beginHour: ["Start Time", "time"],
          endDate: ["End Date", "date"],
          endHour: ["End Time", "time"],
        },
        {
          componentTypeCode: componentTypes,
          acquisitionMethodCode: acqMethodCode,
          basisCode: basisCode,
        }
      )
    );
    setSecondLevel(true);
  };
  const selectedRowHandlerFuelFlows = (val) => {
    const selectFuelFlows = monitoringSystemsFuelFlows.filter(
      (element) => element.fuelCode === val.col1
    )[0];
    setSelectedComponent(selectFuelFlows);
    setSelectedModalData(
      modalViewData(
        selectFuelFlows,
        {
          maxRateSourceCode: ["Rate Source Code", "dropdown"],
          skip: [""],
          maxRate: ["Max Rate ", "input"],
          sysFuelUomCode: ["Unit of Measure Code", "dropdown"],
        },
        {
          beginDate: ["Start Date", "date"],
          beginHour: ["Start Time", "time"],
          endDate: ["End Date", "date"],
          endHour: ["End Time", "time"],
        },
        {
          maxRateSourceCode: componentTypes,
          maxRate: acqMethodCode,
          sysFuelUomCode: basisCode,
        }
      )
    );
    setSecondLevel(true);
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
    <div className="methodTable react-transition fade-in">
      {(() => {
        if (!secondLevel) {
          return (
            <div>
              <DataTableRender
                columnNames={columnNames}
                data={data}
                openHandler={selectedRowHandlerComponent}
                tableTitle="System Components"
                componentStyling="systemsCompTable"
                dataLoaded={dataLoaded}
                actionsBtn={"View"}
                user={user}
                checkout={checkout}
                addBtn
                addBtnName={"Add Component"}
              />
              <DataTableRender
                columnNames={fuelFlowsColumnNames}
                data={fuelFlowsData}
                openHandler={selectedRowHandlerFuelFlows}
                tableTitle="Fuel Flows"
                user={user}
                checkout={checkout}
                componentStyling="systemsCompTable"
                dataLoaded={dataFuelLoaded}
                actionsBtn={"View"}
                addBtn
                addBtnName={"Create New Fuel Flow"}
              />
            </div>
          );
        } else {
          if (selectedComponent["sysFuelUomCode"] !== undefined) {
            // fuel flow
            return (
              <ModalDetails
                modalData={selectedComponent}
                backBtn={setSecondLevel}
                data={selectedModalData}
                cols={2}
                title={`Fuel Code: ${selectedComponent["fuelCode"]}, System Type Code: ${selectedComponent["systemTypeCode"]}`}
                viewOnly={!(user && checkout)}
              />
            );
          } else {
            // components
            return (
              <ModalDetails
                modalData={selectedComponent}
                backBtn={setSecondLevel}
                data={selectedModalData}
                cols={2}
                title={`Component: ${selectedComponent["componentIdentifier"]}`}
                viewOnly={!(user && checkout)}
              />
            );
          }
        }
      })()}
    </div>
  );
};

export default DataTableSystemsComponents;
