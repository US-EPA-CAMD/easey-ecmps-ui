import React, { useEffect, useMemo, useState } from "react";
import * as fs from "../../../utils/selectors/monitoringPlanSystems";
import ModalDetails from "../../ModalDetails/ModalDetails";
import { modalViewData } from "../../../additional-functions/create-modal-input-controls";
import * as mpApi from "../../../utils/api/monitoringPlansApi";
import { DataTableRender } from "../../DataTableRender/DataTableRender";
import { attachChangeEventListeners } from "../../../additional-functions/prompt-to-save-unsaved-changes";
import DataTableAnalyzerRanges from "../DataTableAnalyzerRanges/DataTableAnalyzerRanges";
import {
  assignFocusEventListeners,
  cleanupFocusEventListeners,
  returnFocusToLast,
} from "../../../additional-functions/manage-focus";
import { Preloader } from "../../Preloader/Preloader";
import { connect } from "react-redux";
import { loadDropdowns } from "../../../store/actions/dropdowns";
import {
  convertSectionToStoreName,
  SYSTEM_COMPONENTS_SECTION_NAME,
  FUEL_FLOWS_SECTION_NAME,
  FUEL_FLOWS_STORE_NAME,
  SYSTEM_COMPONENTS_STORE_NAME,
} from "../../../additional-functions/data-table-section-and-store-names";

import ModalAddComponent from "../../ModalAddComponent/ModalAddComponent";

export const DataTableSystemsComponents = ({
  fuelFlowsMdmData,
  systemComponentsMdmData,
  loadDropdownsData,
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
  setUpdateAnalyzerRangeTable,
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
  addExistingComponentFlag,
  setAddExistingComponentFlag,
  addCompThirdLevelTrigger,
  setAddCompThirdLevelTrigger,
  addCompThirdLevelCreateTrigger,
  setAddCompThirdLevelCreateTrigger,
  backToFirstLevelLevelBTN,
  setCurrentBar,
  openFuelFlowsView,
  setOpenFuelFlowsView,
  openComponentViewTest = false,
  openAddComponentTest = false,
}) => {
  const [monitoringSystemsFuelFlows, setMonitoringSystemsFuelFlows] =
    useState("");
  const [selectedUnlinkedComponent, setSelectedUnlinkedComponent] = useState(
    {}
  );
  const selectText = "-- Select a value --";
  const [dataLoaded, setDataLoaded] = useState(false);
  const [dataFuelLoaded, setFuelDataLoaded] = useState(false);
  const [selectedModalData, setSelectedModalData] = useState(null);
  const [selectedComponentsModalData, setSelectedComponentsModalData] =
    useState(null);
  const [selectedFuelFlowsModalData, setSelectedFuelFlowsModalData] =
    useState(null);
  const [selected, setSelected] = useState(1);

  const [monitoringSystemsComponents, setMonitoringSystemsComponents] =
    useState("");

  const [fuelFlowDropdownsLoaded, setFuelFlowDropdownsLoaded] = useState(false);
  const [systemComponentDropdownsLoaded, setSystemComponentDropdownsLoaded] =
    useState(false);

  const [
    prefilteredSystemComponentMdmData,
    setSystemComponentPrefilteredMdmData,
  ] = useState(false);
  const [
    mainSystemComponentDropdownChange,
    setSystemComponentMainDropdownChange,
  ] = useState("");
  const fuelFlowsDataArray = [
    [
      "maximumFuelFlowRateSourceCode",
      "systemFuelFlowUOMCode",
      "prefilteredSystemFuelFlows",
    ],
  ];
  const systemComponentsDataArray = [
    [
      "sampleAcquisitionMethodCode",
      "componentTypeCode",
      "basisCode",
      "prefilteredSystemsComponents",
    ],
  ];

  // *** Assign initial event listeners after loading data/dropdowns
  useEffect(() => {
    if (dataLoaded && systemComponentDropdownsLoaded) {
      returnFocusToLast();
      assignFocusEventListeners();
    }
  }, [dataLoaded, systemComponentDropdownsLoaded]);

  const [returnedFocusToLast, setReturnedFocusToLast] = useState(false);
  // *** Reassign handlers after pop-up modal is closed
  useEffect(() => {
    if (!returnedFocusToLast) {
      setReturnedFocusToLast(true);
    } else {
      returnFocusToLast();
      assignFocusEventListeners();
    }
  }, [returnedFocusToLast]);

  // *** Clean up focus event listeners
  useEffect(() => {
    return () => {
      cleanupFocusEventListeners();
    };
  }, []);

  useEffect(() => {
    if (addCompThirdLevelTrigger) {
      if (selectedUnlinkedComponent[0]) {
        openAddComponentHandler(selectedUnlinkedComponent[0], false, true);
      } else {
        openAddComponentHandler(false, true, true);
      }
      setAddCompThirdLevelTrigger(false);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addCompThirdLevelTrigger]);

  // load dropdowns data (called once)
  useEffect(() => {
    if (systemComponentsMdmData.length === 0) {
      loadDropdownsData(
        SYSTEM_COMPONENTS_SECTION_NAME,
        systemComponentsDataArray
      );
    } else {
      setSystemComponentDropdownsLoaded(true);
    }

    if (fuelFlowsMdmData.length === 0) {
      loadDropdownsData(FUEL_FLOWS_SECTION_NAME, fuelFlowsDataArray);
    } else {
      setFuelFlowDropdownsLoaded(true);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [systemComponentsMdmData, fuelFlowsMdmData]);

  useEffect(() => {
    if (addCompThirdLevelCreateTrigger) {
      openAddComponentHandler(false, true, true);
      setAddCompThirdLevelCreateTrigger(false);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected, updateFuelFlowTable, updateComponentTable]);

  // triggers on change prefilter of systems component
  useEffect(() => {
    const prefilteredDataName = "componentTypeCode";
    if (prefilteredSystemComponentMdmData) {
      const result = prefilteredSystemComponentMdmData.filter(
        (data) =>
          data[prefilteredDataName] === mainSystemComponentDropdownChange
      );
      if (result.length > 0) {
        for (const modalDetailData of selectedComponentsModalData) {
          if (modalDetailData[4] === "dropdown") {
            const selectedCodes = result[0];
            const filteredOutSubDropdownOptions = systemComponentsMdmData[
              modalDetailData[0]
            ].filter((option) =>
              selectedCodes[modalDetailData[0]].includes(option.code)
            );
            filteredOutSubDropdownOptions.unshift({
              code: "",
              name: selectText,
            });
            modalDetailData[6] = filteredOutSubDropdownOptions;
          }
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mainSystemComponentDropdownChange, selectedComponentsModalData]);

  const columnNames = ["ID", "Type", "Date and Time"];
  // *** column names for dataset (will be passed to normalizeRowObjectFormat later to generate the row object
  // *** in the format expected by the modal / tabs plugins)
  const fuelFlowsColumnNames = ["Fuel Code", "Type Code", "Date and Time"];

  const [selectedComponent, setSelectedComponent] = useState("");

  // object property,Label Name, value, control type,  = arr

  // *** row handler onclick event listener

  const [openComponentView, setComponentView] = React.useState(
    openComponentViewTest
  );
  const [openAddComponent, setAddComponent] =
    React.useState(openAddComponentTest); // for viewing the dropdown component page

  //for analyzer ranges
  const [openAnalyzer, setOpenAnalyzer] = useState(false);

  const openAddComponents = (row, bool, create) => {
    setAddComponent(true);
    setAddComponentFlag(true);
    setBread(true, "Add Component", false, true);
  };

  const openAddComponentHandler = (selectedComp, create, page) => {
    setAddExistingComponentFlag(!create);
    setCreateNewComponentFlag(page);
    setOpenFuelFlowsView(false);
    setAddComponent(false);
    setComponentView(true);

    const prefilteredDataName = "prefilteredSystemsComponents";
    if (selectedComp) {
      selectedComp["beginDate"] = null;
      selectedComp["beginHour"] = null;
      selectedComp["endDate"] = null;
      selectedComp["endHour"] = null;
      setSelectedComponent(selectedComp);
    } else {
      setSelectedComponent(null);
    }

    let mainDropdownResult = [];
    let mainDropdownName = "componentTypeCode";

    mainDropdownResult = systemComponentsMdmData[mainDropdownName].filter((o) =>
      systemComponentsMdmData[prefilteredDataName].some(
        (element, index, arr) => o.code === element[mainDropdownName]
      )
    );
    if (!mainDropdownResult.includes({ code: "", name: selectText })) {
      mainDropdownResult.unshift({ code: "", name: selectText });
    }

    setSystemComponentPrefilteredMdmData(
      systemComponentsMdmData[prefilteredDataName]
    );
    setSelectedComponentsModalData(
      modalViewData(
        !create ? selectedComp : null,
        {
          componentId: ["Component ID", "input", "", ""],
          sampleAcquisitionMethodCode: [
            "Sample Acquistion Method",
            "dropdown",
            "",
            "",
          ],
          componentTypeCode: ["Component Type", "mainDropdown", "", ""],
          basisCode: ["Basis Description", "dropdown", "", ""],
          manufacturer: ["Manufacturer", "input", "", ""],
          modelVersion: ["Model or Version", "input", "", ""],
          serialNumber: ["Serial Number", "input", "", ""],
          hgConverterIndicator: [
            "Hg Converter Indicator",
            "customDropdown",
            "",
            "",
            [
              { code: null, name: "--- Select a Value ---" },
              { code: 1, name: "Yes" },
              { code: 0, name: "No" },
            ],
          ],
        },
        {
          beginDate: ["Start Date", "date", "", ""],
          beginHour: ["Start Time", "hourDropdown", "", ""],
          endDate: ["End Date", "date", "", ""],
          endHour: ["End Time", "hourDropdown", "", ""],
        },
        create,
        systemComponentsMdmData,
        systemComponentsMdmData[prefilteredDataName],
        mainDropdownName, // mainDropdownName'',
        mainDropdownResult,
        false, // staticDropdownFlag,
        "prefilteredSystemsComponents" // "prefilteredTotalName"
      )
    );
    setTimeout(() => {
      attachChangeEventListeners(".modalUserInput");
    });
    setBread(true, "Component");
  };

  const openComponent = (row, bool, create) => {
    let selectComponents = null;
    const prefilteredDataName = "prefilteredSystemsComponents";
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
    let mainDropdownResult = [];
    let mainDropdownName = "componentTypeCode";
    mainDropdownResult = systemComponentsMdmData[mainDropdownName].filter((o) =>
      systemComponentsMdmData[prefilteredDataName].some(
        (element, index, arr) => o.code === element[mainDropdownName]
      )
    );
    if (!mainDropdownResult.includes({ code: "", name: selectText })) {
      mainDropdownResult.unshift({ code: "", name: selectText });
    }

    setSystemComponentPrefilteredMdmData(
      systemComponentsMdmData[prefilteredDataName]
    );
    setSelectedComponentsModalData(
      modalViewData(
        selectComponents,
        {
          componentId: ["Component ID", "input", "", "locked"],
          sampleAcquisitionMethodCode: [
            "Sample Acquistion Method",
            "dropdown",
            "",
            "locked",
          ],
          componentTypeCode: ["Component Type", "mainDropdown", "", "locked"],
          basisCode: ["Basis Description", "dropdown", "", "locked"],
          manufacturer: ["Manufacturer", "input", "", ""],
          modelVersion: ["Model or Version", "input", "", ""],
          serialNumber: ["Serial Number", "input", "", ""],
          hgConverterIndicator: [
            "Hg Converter Indicator",
            "customDropdown",
            "",
            "",
            [
              { code: null, name: "--- Select a Value ---" },
              { code: 1, name: "Yes" },
              { code: 0, name: "No" },
            ],
          ],
        },
        {
          beginDate: ["Start Date", "date", "", ""],
          beginHour: ["Start Time", "hourDropdown", ""],
          endDate: ["End Date", "date", "", ""],
          endHour: ["End Time", "hourDropdown", "", ""],
        },
        create,
        systemComponentsMdmData,
        systemComponentsMdmData[prefilteredDataName],
        mainDropdownName, // mainDropdownName'',
        mainDropdownResult,
        false, // staticDropdownFlag,
        "prefilteredSystemsComponents" // "prefilteredTotalName"
      )
    );
    setTimeout(() => {
      attachChangeEventListeners(".modalUserInput");
    });
    setBread(true, "Component");
  };
  const [prefilteredMdmDataFuelFlows, setPrefilteredMdmDataFuelFlows] =
    useState(false);
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

    // Get the name of the property of the correct array in mdmData (full data set)
    const prefilteredDataName = "prefilteredSystemFuelFlows";

    const mainDropdownResult = [];

    setPrefilteredMdmDataFuelFlows(fuelFlowsMdmData[prefilteredDataName]);

    setSelectedFuelFlowsModalData(
      modalViewData(
        selectFuelFlows,
        {
          maximumFuelFlowRate: ["Max Fuel Flow Rate", "input", "", ""],
          systemFuelFlowUOMCode: [
            "Units of Measure Code",
            "independentDropdown",
            "",
            "",
          ],
          maximumFuelFlowRateSourceCode: [
            "Max Fuel Flow Rate Source",
            "independentDropdown",
            "",
            "",
          ],

          skip: ["", "skip", "", ""],
        },
        {
          beginDate: ["Start Date", "date", "", ""],
          beginHour: ["Start Time", "hourDropdown", "", ""],
          endDate: ["End Date", "date", "", ""],
          endHour: ["End Time", "hourDropdown", "", ""],
        },
        create,
        fuelFlowsMdmData,
        prefilteredDataName ? fuelFlowsMdmData[prefilteredDataName] : "",
        "", // mainDropdownName'',
        mainDropdownResult,
        true, // staticDropdownFlag,
        "prefilteredSystemFuelFlows" // "prefilteredTotalName"
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
                dataLoaded={dataLoaded && systemComponentDropdownsLoaded}
                actionsBtn={"View"}
                user={user}
                checkout={checkout}
                addBtn={openAddComponents}
                addBtnName={"Add Component"}
                show={true}
                ariaLabel={"System Components"}
              />
              <DataTableRender
                columnNames={fuelFlowsColumnNames}
                data={fuelFlowsData}
                openHandler={openFuelFlows}
                tableTitle="Fuel Flows"
                user={user}
                checkout={checkout}
                componentStyling="systemsCompTable"
                dataLoaded={dataFuelLoaded && fuelFlowDropdownsLoaded}
                actionsBtn={"View"}
                addBtn={openFuelFlows}
                addBtnName={"Create New Fuel Flow"}
                show={true}
                ariaLabel={"Fuel Flows"}
              />
            </div>
          );
        } else {
          //Second LEVEL
          if (openFuelFlowsView) {
            // fuel flow
            return fuelFlowDropdownsLoaded ? (
              <ModalDetails
                modalData={selectedFuelFlows}
                backBtn={setBread}
                prefilteredMdmData={prefilteredMdmDataFuelFlows}
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
            ) : (
              <Preloader />
            );

            // going to the add component modal page
          } else if (openAddComponent && addComponentFlag) {
            return (
              <ModalAddComponent
                locationId={locationSelectValue}
                systemId={selected.id}
                selectionHandler={setSelectedUnlinkedComponent}
                caption={"Select Component by ID or Type"}
                data={selectedComponentsModalData}
                backBtn={() => {
                  setCreateNewComponentFlag(false);
                  setAddComponentFlag(false);
                  setAddExistingComponentFlag(false);
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
                {systemComponentDropdownsLoaded ? (
                  <ModalDetails
                    modalData={selectedComponent} // need to review from modaladdcomp
                    backBtn={() => {
                      setCreateNewComponentFlag(false);
                      setAddComponentFlag(false);
                      openAddComponents();
                      setCurrentBar("");
                    }}
                    data={selectedComponentsModalData}
                    cols={2}
                    create={createNewComponentFlag}
                    setMainDropdownChange={setSystemComponentMainDropdownChange}
                    mainDropdownChange={mainSystemComponentDropdownChange}
                    title={
                      selectedComponent !== null
                        ? ` Add Component: ${selectedComponent["componentId"]}`
                        : "Create Component"
                    }
                    viewOnly={!(user && checkout)}
                  />
                ) : (
                  <Preloader />
                )}
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
                      create={createNewComponentFlag}
                      setMainDropdownChange={
                        setSystemComponentMainDropdownChange
                      }
                      mainDropdownChange={mainSystemComponentDropdownChange}
                      viewOnly={!(user && checkout)}
                    />
                    {createNewComponentFlag ? (
                      ""
                    ) : (
                      <DataTableAnalyzerRanges
                        selectedRanges={openAnalyzer}
                        thirdLevel={thirdLevel}
                        setThirdLevel={setThirdLevel}
                        updateAnalyzerRangeTable={updateAnalyzerRangeTable}
                        setUpdateAnalyzerRangeTable={
                          setUpdateAnalyzerRangeTable
                        }
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

const mapStateToProps = (state) => {
  return {
    fuelFlowsMdmData: state.dropdowns[FUEL_FLOWS_STORE_NAME],
    systemComponentsMdmData: state.dropdowns[SYSTEM_COMPONENTS_STORE_NAME],
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadDropdownsData: async (section, dropdownArray) => {
      dispatch(
        loadDropdowns(convertSectionToStoreName(section), dropdownArray)
      );
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DataTableSystemsComponents);
export { mapDispatchToProps };
export { mapStateToProps };
