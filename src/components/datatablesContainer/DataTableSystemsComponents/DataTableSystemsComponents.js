import React, { useEffect, useMemo, useState } from "react";
import * as fs from "../../../utils/selectors/monitoringPlanSystems";
import ModalDetails from "../../ModalDetails/ModalDetails";
import { modalViewData } from "../../../additional-functions/create-modal-input-controls";
import * as mpApi from "../../../utils/api/monitoringPlansApi";
import { extractUserInput } from "../../../additional-functions/extract-user-input";
import { DataTableRender } from "../../DataTableRender/DataTableRender";
import "./DataTableSystemsComponentsRender.scss";
import {
  attachChangeEventListeners,
  removeChangeEventListeners,
  unsavedDataMessage,
} from "../../../additional-functions/prompt-to-save-unsaved-changes";

import { useRetrieveDropdownApi } from "../../../additional-functions/retrieve-dropdown-api";
import DataTableAnalyzerRanges from "../DataTableAnalyzerRanges/DataTableAnalyzerRanges";
import ModalAddComponent from "../../ModalAddComponent/ModalAddComponent";
export const DataTableSystemsComponents = ({
  systemID,
  viewOnly,
  setSecondLevel,
  secondLevel,
  thirdLevel,
  setThirdLevel,
  setBread,
  locationSelectValue,
  user,
  checkout,
  // setCreateBtn,
  // setCreateBtnAPI,
  // setSaveAnalyzerRange,
  setSelectedFuelFlows,
  selectedFuelFlows,
  // setSelectedFuelFlowInFirst,
  setSelectedRangeInFirst,
  backBTN,
  updateAnalyzerRangeTable,
  setUpdateFuelFlowTable,
  updateFuelFlowTable,
  setCreateAnalyzerRangesFlag,
  createAnalyzerRangesFlag,
  setCreateFuelFlowFlag,
  createFuelFlowFlag,
  setCreateNewComponentFlag,
  createNewComponentFlag,
  updateComponentTable,
  setupdateComponentTable,
  addComponentFlag,
  setAddComponentFlag,
  addCompThirdLevelTrigger,
  setAddCompThirdLevelTrigger,
  addCompThirdLevelCreateTrigger,
  setAddCompThirdLevelCreateTrigger,
  backToFirstLevelLevelBTN,
  setCurrentBar,
  openFuelFlowsView,
  setOpenFuelFlowsView,
  openComponentViewTest=false,
  openAddComponentTest=false,
}) => {
  const [monitoringSystemsFuelFlows, setMonitoringSystemsFuelFlows] = useState(
    ""
  );
  const [selectedUnlinkedComponent, setSelectedUnlinkedComponent] = useState(
    {}
  );
  const [dataLoaded, setDataLoaded] = useState(false);
  const [dataFuelLoaded, setFuelDataLoaded] = useState(false);
  const [selectedModalData, setSelectedModalData] = useState(null);
  const [
    selectedComponentsModalData,
    setSelectedComponentsModalData,
  ] = useState(null);
  const [selectedFuelFlowsModalData, setSelectedFuelFlowsModalData] = useState(
    null
  );
  const [selected, setSelected] = useState(1);

  const [
    monitoringSystemsComponents,
    setMonitoringSystemsComponents,
  ] = useState("");

  useEffect(() => {
    if (addCompThirdLevelTrigger) {
      if (selectedUnlinkedComponent[0]) {
        openAddComponentHandler(selectedUnlinkedComponent[0], false, true);
      } else {
        openAddComponentHandler(false, true, true);
      }
      setAddCompThirdLevelTrigger(false);
    }
  }, [addCompThirdLevelTrigger]);

  useEffect(() => {
    if (addCompThirdLevelCreateTrigger) {
      openAddComponentHandler(false, true, true);
      setAddCompThirdLevelCreateTrigger(false);
    }
  }, [addCompThirdLevelCreateTrigger]);
  useEffect(() => {
    mpApi.getMonitoringSystems(locationSelectValue).then((res) => {
      for (let value of res.data) {
        if (value.monitoringSystemId === systemID) {
          setSelected(value);
        }
      }
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [systemID]);

  useEffect(() => {
    mpApi
      .getMonitoringSystemsComponents(selected.locationId, selected.id)
      .then((res) => {
        setMonitoringSystemsComponents(res.data);
        setDataLoaded(true);
        setupdateComponentTable(false);
      });

    mpApi
      .getMonitoringSystemsFuelFlows(selected.locationId, selected.id)
      .then((res) => {
        setMonitoringSystemsFuelFlows(res.data);
        setFuelDataLoaded(true);
        setUpdateFuelFlowTable(false);
      });
  }, [selected, updateFuelFlowTable, updateComponentTable]);

  const columnNames = ["ID", "Type", "Date and Time"];
  // *** column names for dataset (will be passed to normalizeRowObjectFormat later to generate the row object
  // *** in the format expected by the modal / tabs plugins)
  const fuelFlowsColumnNames = ["Fuel Code", "Type Code", "Date and Time"];

  const [selectedComponent, setSelectedComponent] = useState("");

  // object property,Label Name, value, control type,  = arr

  // *** row handler onclick event listener

  const [openComponentView, setComponentView] = React.useState(openComponentViewTest);
  const [openAddComponent, setAddComponent] = React.useState(openAddComponentTest); // for viewing the dropdown component page

  //for analyzer ranges
  const [openAnalyzer, setOpenAnalyzer] = useState(false);
  const totalComponentsOptions = useRetrieveDropdownApi([
    "sampleAcquisitionMethodCode",
    "componentTypeCode",
    "basisCode",
  ]);

  const openAddComponents = (row, bool, create) => {
    setAddComponent(true);
    setAddComponentFlag(true);
    setBread(true, "Add Component", false, true);
  };

  const openAddComponentHandler = (selectedComp, create, page) => {
    let selectComponents = null;
    setCreateNewComponentFlag(page);
    setOpenFuelFlowsView(false);
    setAddComponent(false);
    setComponentView(true);
    if (selectedComp) {
      selectedComp["beginDate"] = null;
      selectedComp["beginHour"] = null;
      selectedComp["endDate"] = null;
      selectedComp["endHour"] = null;
      setSelectedComponent(selectedComp);
    } else {
      setSelectedComponent(null);
    }

    setSelectedComponentsModalData(
      modalViewData(
        !create ? selectedComp : null,
        {
          componentId: ["Component ID", "input", "required"],
          sampleAcquisitionMethodCode: [
            "Sample Acquistion Method",
            "dropdown",
            "",
          ],
          componentTypeCode: ["Component Type", "dropdown", "required"],
          basisCode: ["Basis Description", "dropdown", ""],
          manufacturer: ["Manufacturer", "input", ""],
          modelVersion: ["Modal or Version", "input", ""],
          serialNumber: ["Serial Number", "input", ""],
          hgConverterIndicator: ["Hg Converter Indicator", "radio", ""],
        },
        {
          beginDate: ["Start Date", "date", "required"],
          beginHour: ["Start Time", "time", "required"],
          endDate: ["End Date", "date", ""],
          endHour: ["End Time", "time", ""],
        },
        create,
        totalComponentsOptions
      )
    );
    setTimeout(() => {
      attachChangeEventListeners(".modalUserInput");
    });
    setBread(true, "Component");
  };
  const openComponent = (row, bool, create) => {
    let selectComponents = null;
    setCreateNewComponentFlag(create);
    setOpenFuelFlowsView(false);
    setComponentView(true);
    if (monitoringSystemsComponents.length > 0 && !create) {
      selectComponents = monitoringSystemsComponents.filter(
        (element) => element.componentId === row.col1
      )[0];
      setSelectedComponent(selectComponents);

      setOpenAnalyzer(selectComponents);
      setSelectedRangeInFirst(selectComponents); // for saving
    }
    setSelectedComponentsModalData(
      modalViewData(
        selectComponents,
        {
          componentId: ["Component ID", "input", "required"],
          sampleAcquisitionMethodCode: [
            "Sample Acquistion Method",
            "dropdown",
            "",
          ],
          componentTypeCode: ["Component Type", "dropdown", "required"],
          basisCode: ["Basis Description", "dropdown", ""],
          manufacturer: ["Manufacturer", "input", ""],
          modelVersion: ["Modal or Version", "input", ""],
          serialNumber: ["Serial Number", "input", ""],
          hgConverterIndicator: ["Hg Converter Indicator", "radio", ""],
        },
        {
          beginDate: ["Start Date", "date", "required"],
          beginHour: ["Start Time", "time", "required"],
          endDate: ["End Date", "date", ""],
          endHour: ["End Time", "time", ""],
        },
        create,
        totalComponentsOptions
      )
    );
    setTimeout(() => {
      attachChangeEventListeners(".modalUserInput");
    });
    setBread(true, "Component");
  };

  const payloadComponents = {
    locationId: locationSelectValue,
    id: null,
    matsMethodCode: null,
    matsMethodParameterCode: null,
    beginDate: null,
    beginHour: 0,
    endDate: null,
    endHour: 0,
  };

  const totalFuelFlowssOptions = useRetrieveDropdownApi([
    "maximumFuelFlowRateSourceCode",
    "systemFuelFlowUOMCode",
  ]);
  const openFuelFlows = (row, bool, create) => {
    let selectFuelFlows = null;
    setCreateFuelFlowFlag(create);
    setComponentView(false);
    setOpenFuelFlowsView(true);
    if (monitoringSystemsFuelFlows.length > 0 && !create) {
      selectFuelFlows = monitoringSystemsFuelFlows.filter(
        (element) => element.id === row.col4
      )[0];
      setSelectedFuelFlows(selectFuelFlows);
    }
    setSelectedFuelFlowsModalData(
      modalViewData(
        selectFuelFlows,
        {
          maximumFuelFlowRate: ["Max Fuel Flow Rate", "input", "required"],
          systemFuelFlowUOMCode: [
            "Units of Measure Code",
            "dropdown",
            "required",
          ],
          maximumFuelFlowRateSourceCode: [
            "Max Fuel Flow Rate Source",
            "dropdown",
            "required",
          ],

          skip: ["", "skip", ""],
        },
        {
          beginDate: ["Start Date", "date", "required"],
          beginHour: ["Start Time", "time", "required"],
          endDate: ["End Date", "date", ""],
          endHour: ["End Time", "time", ""],
        },
        create,
        totalFuelFlowssOptions
      )
    );
    setTimeout(() => {
      attachChangeEventListeners(".modalUserInput");
    });
    setBread(true, "Fuel Flow", create ? true : false);
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
  const [selectedRange, setSelectedRange] = useState("");

  const testing = () => {
    openAddComponentHandler(false, false, true);
    // openAddComponents
  };

  const testing2 = () => {
    openFuelFlows(false, false, true);
    openComponent(false, false, true);
  };
  return (
    <div className="methodTable react-transition fade-in">
      <input
        tabIndex={-1}
        aria-hidden={true}
        role="button"
        type="hidden"
        id="testingBtn"
        onClick={() => testing()}
      />
      <input
        tabIndex={-1}
        aria-hidden={true}
        role="button"
        type="hidden"
        id="testingBtn2"
        onClick={() => testing2()}
      />

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
                addBtn={openAddComponents}
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
          //Second LEVEL
          if (openFuelFlowsView) {
            // fuel flow
            return (
              <ModalDetails
                modalData={selectedFuelFlows}
                backBtn={setBread}
                data={selectedFuelFlowsModalData}
                cols={2}
                title={
                  createFuelFlowFlag
                    ? "Create Fuel Flow"
                    : user && checkout
                    ? "Edit Fuel Flow"
                    : `Fuel Code: ${selectedFuelFlows["fuelCode"]}, System Type Code: ${selectedFuelFlows["systemTypeCode"]}`
                }
                viewOnly={!(user && checkout)}
              />
            );

            // going to the add component modal page
          } else if (openAddComponent && addComponentFlag) {
            return (
              <ModalAddComponent
                locationId={locationSelectValue}
                systemId={selected.id}
                selectionHandler={setSelectedUnlinkedComponent}
                caption={"Select Component by ID or Type"}
                backBtn={() => {
                  setCreateNewComponentFlag(false);
                  setAddComponentFlag(false);
                  backToFirstLevelLevelBTN(false);
                }}
                title={"Add Component"}
              />
            );
          }
          // editing / adding a new component and linking to sys page
          else if (openComponentView && addComponentFlag) {
            return (
              <div>
                <ModalDetails
                  modalData={selectedComponent} // need to review from modaladdcomp
                  backBtn={() => {
                    openAddComponents();
                    setCurrentBar("");
                  }}
                  data={selectedComponentsModalData}
                  cols={2}
                  title={
                    selectedComponent !== null
                      ? ` Add Component: ${selectedComponent["componentId"]}`
                      : "Create Component"
                  }
                  viewOnly={!(user && checkout)}
                />
              </div>
            );
          }
          // pressing view/edit a sys component directly
          else if (openComponentView && !addComponentFlag) {
            // }else if (openAddComponent){
            // components
            return (
              <div>
                {!thirdLevel ? (
                  <div>
                    <ModalDetails
                      modalData={selectedComponent}
                      backBtn={setBread}
                      data={selectedComponentsModalData}
                      cols={2}
                      title={
                        createNewComponentFlag
                          ? "Create Component"
                          : user && checkout
                          ? `Edit Component: ${selectedComponent["componentId"]}`
                          : `Component: ${selectedComponent["componentId"]}`
                      }
                      viewOnly={!(user && checkout)}
                    />
                    {createNewComponentFlag ? (
                      ""
                    ) : (
                      <DataTableAnalyzerRanges
                        selectedRanges={openAnalyzer}
                        thirdLevel={thirdLevel}
                        setThirdLevel={setThirdLevel}
                        updateTable={updateAnalyzerRangeTable}
                        user={user}
                        checkout={checkout}
                        setOpenFuelFlowsView={setOpenFuelFlowsView}
                        setComponentView={setComponentView}
                        setSelectedModalData={setSelectedModalData}
                        // setSaveAnalyzerRange={setSaveAnalyzerRange}
                        setSelectedRange={setSelectedRange}
                        setCreateAnalyzerRangesFlag={
                          setCreateAnalyzerRangesFlag
                        }
                      />
                    )}{" "}
                  </div>
                ) : (
                  //EDIT ANALYZER RANGES
                  <ModalDetails
                    modalData={selectedRange}
                    backBtn={setThirdLevel}
                    data={selectedModalData}
                    cols={2}
                    title={
                      createAnalyzerRangesFlag
                        ? "Create Analyzer Range"
                        : user && checkout
                        ? `Edit  Analyzer Range `
                        : ` Analyzer Range `
                    }
                    viewOnly={!(user && checkout)}
                  />
                )}
              </div>
            );
          }
        }
      })()}
    </div>
  );
};

export default DataTableSystemsComponents;
