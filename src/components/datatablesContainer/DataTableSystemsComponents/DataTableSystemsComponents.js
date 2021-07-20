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
  setCreateBtn,
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
  const fuelFlowsColumnNames = ["Fuel Code", "Type Code", "Date and Time"];

  const [selectedComponent, setSelectedComponent] = useState("");

  // object property,Label Name, value, control type,  = arr

  // *** row handler onclick event listener
  const [createNewComponent, setCreateNewComponent] = useState(false);

  const [openComponentView, setComponentView] = useState(false);
  const openComponent = (row, bool, create) => {
    let selectComponents = null;
    setCreateNewComponent(create);
    setOpenFuelFlowsView(false);
    setComponentView(true);
    if (create) {
      setCreateBtn("Create Component");
    }
    if (monitoringSystemsComponents.length > 0 && !create) {
      selectComponents = monitoringSystemsComponents.filter(
        (element) => element.componentIdentifier === row.col1
      )[0];
      setSelectedComponent(selectComponents);
      setCreateBtn("Go Back");
      if (user && checkout) {
        setCreateBtn("Save and Go Back");
      }
    }
    setSelectedModalData(
      modalViewData(
        selectComponents,
        {
          componentIdentifier: ["Component ID", "input", "required"],
          acquisitionMethodCode: ["Sample Acquistion Method", "dropdown", ""],
          componentTypeCode: ["Component Type", "dropdown", "required"],
          basisCode: ["Basis Description", "dropdown", ""],
          manufacturer: ["Manufacturer", "input", ""],
          modelVersion: ["Modal or Version", "input", ""],
          serialNumber: ["Serial Number", "input", ""],
          hgConverterInd: ["Hg Converter Indicator", "radio", ""],
        },
        {
          beginDate: ["Start Date", "date", "required"],
          beginHour: ["Start Time", "time", "required"],
          endDate: ["End Date", "date", ""],
          endHour: ["End Time", "time", ""],
        },
        create
      )
    );
    // if (create) {
    //   // setSecondLevel(create);

    setSecondLevel(true, "Component");
    // }
  };

  const [createNewFuelFlow, setCreateNewFuelFlow] = useState(false);
  const [openFuelFlowsView, setOpenFuelFlowsView] = useState(false);
  // *** row handler onclick event listener
  const openFuelFlows = (row, bool, create) => {
    let selectFuelFlows = null;
    // setCreateNewSystem(create);
    setCreateNewFuelFlow(create);
    setComponentView(false);
    setOpenFuelFlowsView(true);
    if (create) {
      setCreateBtn("Create Fuel Flow");
    }
    if (monitoringSystemsFuelFlows.length > 0 && !create) {
      selectFuelFlows = monitoringSystemsFuelFlows.filter(
        (element) => element.fuelCode === row.col1
      )[0];
      setSelectedComponent(selectFuelFlows);
      setCreateBtn("Go Back");
      if (user && checkout) {
        setCreateBtn("Save and Go Back");
      }
    }
    setSelectedModalData(
      modalViewData(
        selectFuelFlows,
        {
          maxRate: ["Max Fuel Flow Rate", "input", "required"],
          maxRateSourceCode: [
            "Max Fuel Flow Rate Source",
            "dropdown",
            "required",
          ],

          sysFuelUomCode: ["Units of Measure Code", "dropdown", "required"],
          skip: ["", "skip", ""],
        },
        {
          beginDate: ["Start Date", "date", "required"],
          beginHour: ["Start Time", "time", "required"],
          endDate: ["End Date", "date", ""],
          endHour: ["End Time", "time", ""],
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
                addBtn={openComponent}
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
          // if (selectedComponent["sysFuelUomCode"] !== undefined) {
          if (openFuelFlowsView) {
            // fuel flow
            return (
              <ModalDetails
                modalData={selectedComponent}
                backBtn={setSecondLevel}
                data={selectedModalData}
                cols={2}
                title={
                  createNewFuelFlow
                    ? "Create Fuel Flow"
                    : `Fuel Code: ${selectedComponent["fuelCode"]}, System Type Code: ${selectedComponent["systemTypeCode"]}`
                }
                viewOnly={!(user && checkout)}
              />
            );
          } else if (openComponentView) {
            // components
            return (
              <ModalDetails
                modalData={selectedComponent}
                backBtn={setSecondLevel}
                data={selectedModalData}
                cols={2}
                title={
                  createNewComponent
                    ? "Create Component"
                    : `Component: ${selectedComponent["componentIdentifier"]}`
                }
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
