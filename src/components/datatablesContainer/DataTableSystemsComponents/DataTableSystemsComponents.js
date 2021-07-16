import React, { useEffect, useMemo, useState } from "react";
import * as fs from "../../../utils/selectors/monitoringPlanSystems";
import ModalDetails from "../../ModalDetails/ModalDetails";
import { modalViewData } from "../../../additional-functions/create-modal-input-controls";
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

  const columnNames = ["ID", "Type", "Date and Time"];

  // *** column names for dataset (will be passed to normalizeRowObjectFormat later to generate the row object
  // *** in the format expected by the modal / tabs plugins)
  const fuelFlowsColumnNames = ["Fuel Code", "Type Code", "Begin to End Date"];

  const [selectedComponent, setSelectedComponent] = useState("");

  // object property,Label Name, value, control type,  = arr

  // *** row handler onclick event listener
  const openComponent = (row, bool, create) => {
    let selectComponents = null;
    // setCreateNewSystem(create);
    if (monitoringSystemsComponents.length > 0 && !create) {
      selectComponents = monitoringSystemsComponents.filter(
        (element) => element.componentIdentifier === row.col1
      )[0];
      setSelectedComponent(selectComponents);
    }
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
        create
      )
    );
    // if (create) {
    //   // setSecondLevel(create);

    setSecondLevel(true, "Component");
    // }
  };

  // *** row handler onclick event listener
  const openFuelFlows = (row, bool, create) => {
    let selectFuelFlows = null;
    // setCreateNewSystem(create);
    if (monitoringSystemsFuelFlows.length > 0 && !create) {
      selectFuelFlows = monitoringSystemsFuelFlows.filter(
        (element) => element.fuelCode === row.col1
      )[0];
      setSelectedComponent(selectFuelFlows);
    }
    setSelectedModalData(
      modalViewData(
        selectFuelFlows,
        {
          maxRateSourceCode: ["Rate Source Code", "dropdown"],
          skip: ["", "skip"],
          maxRate: ["Max Rate ", "input"],
          sysFuelUomCode: ["Unit of Measure Code", "dropdown"],
        },
        {
          beginDate: ["Start Date", "date"],
          beginHour: ["Start Time", "time"],
          endDate: ["End Date", "date"],
          endHour: ["End Time", "time"],
        },
        create
      )
    );
    // if (create) {
    //   // setSecondLevel(create);

    setSecondLevel(true, "Fuel Flow");
    // }
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
                openHandler={openComponent}
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
                openHandler={openFuelFlows}
                tableTitle="Fuel Flows"
                user={user}
                checkout={checkout}
                componentStyling="systemsCompTable"
                dataLoaded={dataFuelLoaded}
                actionsBtn={"View"}
                addBtn={openFuelFlows}
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
