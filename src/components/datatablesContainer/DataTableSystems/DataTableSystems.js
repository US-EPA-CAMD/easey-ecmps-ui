import React, { useEffect, useMemo, useState } from "react";
import { modalViewData } from "../../../additional-functions/create-modal-input-controls";
import * as fs from "../../../utils/selectors/monitoringPlanSystems";
import Modal from "../../Modal/Modal";
import DataTableSystemsComponents from "../DataTableSystemsComponents/DataTableSystemsComponents";
import { DataTableRender } from "../../DataTableRender/DataTableRender";
import * as mpApi from "../../../utils/api/monitoringPlansApi";
import ModalDetails from "../../ModalDetails/ModalDetails";
import { extractUserInput } from "../../../additional-functions/extract-user-input";

import {
  Breadcrumb,
  BreadcrumbBar,
  BreadcrumbLink,
} from "@trussworks/react-uswds";

import {
  getActiveData,
  getInactiveData,
} from "../../../additional-functions/filter-data";

import {
  attachChangeEventListeners,
  removeChangeEventListeners,
  unsavedDataMessage,
} from "../../../additional-functions/prompt-to-save-unsaved-changes";
import { useRetrieveDropdownApi } from "../../../additional-functions/retrieve-dropdown-api";

export const DataTableSystems = ({
  locationSelectValue,
  inactive,
  user,
  checkout,
  settingInactiveCheckBox,
  revertedState,
  setRevertedState,
  selectedRangeInFirstTest,
  selectedSysIdTest = false,

  showModal = false,
}) => {
  const [show, setShow] = useState(showModal);
  const [monitoringSystems, setMonitoringSystems] = useState([]);

  // for components/ fuel flow view
  const [secondLevel, setSecondLevel] = useState(false);
  const [secondLevelName, setSecondLevelName] = useState("");

  // for analyzer range view
  const [thirdLevel, setThirdLevel] = useState(false);

  const [dataLoaded, setDataLoaded] = useState(false);

  const [updateSystemTable, setUpdateSystemTable] = useState(false);
  const totalSystemOptions = useRetrieveDropdownApi([
    "systemDesignationCode",
    "systemTypeCode",
    "fuelCode",
  ]);
  useEffect(() => {
    if (
      updateSystemTable ||
      monitoringSystems.length <= 0 ||
      locationSelectValue ||
      revertedState
    ) {
      mpApi.getMonitoringSystems(locationSelectValue).then((res) => {
        setMonitoringSystems(res.data);
        setDataLoaded(true);
      });
      setUpdateSystemTable(false);
      setRevertedState(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locationSelectValue, revertedState, updateSystemTable]);

  const [selected, setSelected] = useState(null);
  const [selectedSystem, setSelectedSystem] = useState(
    selectedSysIdTest ? selectedSysIdTest : null
  );
  const [selectedModalData, setSelectedModalData] = useState(null);

  const sysPayload = {
    monitoringSystemId: "string",
    systemTypeCode: "string",
    systemDesignationCode: "string",
    fuelCode: "string",
    beginDate: "2021-09-10T20:19:58.853Z",
    endDate: "2021-09-10T20:19:58.853Z",
    beginHour: 0,
    endHour: 0,
  };
  // *** row handler onclick event listener
  const openSystem = (row, bool, create) => {
    let selectSystem = null;

    setCreateNewSystem(create);
    if (monitoringSystems.length > 0 && !create) {
      selectSystem = monitoringSystems.filter(
        (element) => element.id === row.col7
      )[0];
      setSelected(row.cells);
      setSelectedSystem(selectSystem);
    }
    setSelectedModalData(
      modalViewData(
        selectSystem,
        {
          monitoringSystemId: ["System ID", "input", ""],
          systemDesignationCode: ["System Designation", "dropdown", ""],
          systemTypeCode: ["System Type", "dropdown", ""],
          fuelCode: ["Fuel Type", "dropdown", ""],
        },
        {
          beginDate: ["Start Date", "date", ""],
          beginHour: ["Start Time", "time", ""],
          endDate: ["End Date", "date", ""],
          endHour: ["End Time", "time", ""],
        },
        create,
        totalSystemOptions
      )
    );
    if (create) {
      setSecondLevel(create);
    }
    setShow(true);

    setTimeout(() => {
      attachChangeEventListeners(".modalUserInput");
    });
  };

  const resetFlags = () => {
    setSecondLevel(false);
    setThirdLevel(false);
    setCreateFuelFlowFlag(false);
    setAddComponentFlag(false);
    setAddExistingComponentFlag(false);
    setCreateAnalyzerRangesFlag(false);
    setCreateNewComponentFlag(false);
  };

  const closeModalHandler = () => {
    if (window.isDataChanged === true) {
      if (window.confirm(unsavedDataMessage) === true) {
        resetFlags();
        setShow(false);
        removeChangeEventListeners(".modalUserInput");
      }
    } else {
      resetFlags();
      setShow(false);
      removeChangeEventListeners(".modalUserInput");
    }
  };

  const [createNewSystem, setCreateNewSystem] = useState(false);

  // *** column names for dataset (will be passed to normalizeRowObjectFormat later to generate the row object
  // *** in the format expected by the modal / tabs plugins)
  const columnNames = [
    "System ID",
    "System Type",
    "System Designation",
    "Fuel Type",
    "Begin Date and Time",
    "End Date and Time",
  ];

  /// handles blue stepper for system
  const [currentBar, setCurrentBar] = useState("");

  const breadCrumbs = (lastBread) => {
    const breadBar = (
      <BreadcrumbBar className="padding-0">
        <Breadcrumb
          onClick={() => {
            resetFlags();
            setBread(false);
          }}
        >
          <BreadcrumbLink>
            <span>System</span>
          </BreadcrumbLink>
        </Breadcrumb>

        <Breadcrumb current>
          <span>{lastBread}</span>
        </Breadcrumb>
      </BreadcrumbBar>
    );
    setCurrentBar(breadBar);
    // if (secondLevel) {
    //   setCurrentBar("");
    // }
  };
  useEffect(() => {
    if (!secondLevel) {
      setCurrentBar("");
    }
  }, [secondLevel]);

  const setBread = (val, currentBread, create, addComp = false) => {
    setSecondLevel(val);
    setSecondLevelName(currentBread);

    // missing stepper if !currentBread
    if (!addComp && !currentBread) {
      setCreateFuelFlowFlag(create);
      setOpenFuelFlowsView(val);
      // setCreateNewComponentFlag(create);
    }
    breadCrumbs(currentBread);

    if (addComp && currentBread === "Add Component") {
      setCurrentBar("");
    }
  };
  /// for analyzer ranges
  const breadThirdCrumbs = (lastBread) => {
    const breadBar = (
      <BreadcrumbBar className="padding-0">
        <Breadcrumb
          onClick={() => {
            setSecondLevel(false);
            setThirdLevel(false);
            setBread(false);
            setCreateAnalyzerRangesFlag(false);
          }}
        >
          <BreadcrumbLink>
            <span>System</span>
          </BreadcrumbLink>
        </Breadcrumb>

        <Breadcrumb
          onClick={() => {
            setThirdLevel(false);
            setCreateAnalyzerRangesFlag(false);
            setBread(true, "Components", false);
          }}
        >
          <BreadcrumbLink>
            <span>Components</span>
          </BreadcrumbLink>
        </Breadcrumb>

        <Breadcrumb current>
          <span>{lastBread}</span>
        </Breadcrumb>
      </BreadcrumbBar>
    );
    setCurrentBar(breadBar);
    if (thirdLevel) {
      setCurrentBar("");
    }
  };

  // this causes the stepper to miss in components thid level then press the back button
  const setThirdBread = (val, currentBread, create) => {
    setThirdLevel(val);
    // setSecondLevel(false);
    breadThirdCrumbs(currentBread);
    setCreateAnalyzerRangesFlag(create);
  };
  //////////
  const [createBTN, setCreateBTN] = useState("Save and Close");
  const [createBtnAPI, setCreateBtnAPI] = useState(null);

  const [selectedRangeInFirst, setSelectedRangeInFirst] = useState(
    selectedRangeInFirstTest ? selectedRangeInFirstTest : null
  );
  const [updateAnalyzerRangeTable, setUpdateAnalyzerRangeTable] = useState(
    false
  );
  const [updateFuelFlowTable, setUpdateFuelFlowTable] = useState(false);
  const [updateComponentTable, setupdateComponentTable] = useState(false);
  const [createAnalyzerRangesFlag, setCreateAnalyzerRangesFlag] = useState(
    false
  );
  const [createFuelFlowFlag, setCreateFuelFlowFlag] = useState(false);
  const [createNewComponentFlag, setCreateNewComponentFlag] = useState(false);

  const [addComponentFlag, setAddComponentFlag] = React.useState(false);
  const [
    addExistingComponentFlag,
    setAddExistingComponentFlag,
  ] = React.useState(false);
  const [
    addCompThirdLevelTrigger,
    setAddCompThirdLevelTrigger,
  ] = React.useState(false);
  const [
    addCompThirdLevelCreateTrigger,
    setAddCompThirdLevelCreateTrigger,
  ] = React.useState(false);
  const saveSystems = () => {
    const userInput = extractUserInput(sysPayload, ".modalUserInput");
    mpApi
      .saveSystems(userInput, locationSelectValue, selectedSystem.id)
      .then((result) => {
        console.log("saving results", result);
      })
      .catch((error) => {
        console.log(error);
      });
    setUpdateSystemTable(true);
  };
  const createSystems = () => {
    const userInput = extractUserInput(sysPayload, ".modalUserInput");
    mpApi
      .createSystems(userInput, locationSelectValue)
      .then((result) => {
        console.log("saving results", result);
      })
      .catch((error) => {
        console.log(error);
      });
    setSecondLevel(false);
    setUpdateSystemTable(true);
  };

  const saveAnalyzerRanges = () => {
    const payload = {
      locId: selectedRangeInFirst.locationId,
      compId: selectedRangeInFirst.componentRecordId,
      id: null,
      analyzerRangeCode: "string",
      dualRangeIndicator: "string",
      beginDate: null,
      beginHour: 0,
      endDate: null,
      endHour: 0,
    };
    const userInput = extractUserInput(
      payload,
      ".modalUserInput",
      "dualRangeIndicator"
    );
    mpApi
      .saveAnalyzerRanges(userInput)
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });
    setUpdateAnalyzerRangeTable(true);
  };

  const createAnalyzerRange = () => {
    const payload = {
      locId: selectedRangeInFirst.locationId,
      compId: selectedRangeInFirst.componentRecordId,
      id: null,
      analyzerRangeCode: "string",
      dualRangeIndicator: 0,
      beginDate: null,
      beginHour: 0,
      endDate: null,
      endHour: 0,
    };

    const userInput = extractUserInput(
      payload,
      ".modalUserInput",
      "dualRangeIndicator"
    );

    mpApi
      .createAnalyzerRanges(userInput)
      .then((result) => {
        console.log(result, " was created");
        setUpdateAnalyzerRangeTable(true);
      })
      .catch((error) => {
        console.log("error is", error);
      });
  };

  const [selectedFuelFlows, setSelectedFuelFlows] = useState("");

  const fuelFlowsPayload = {
    maximumFuelFlowRate: 0,
    id: null, // fuel flow id
    systemFuelFlowUOMCode: "string",
    maximumFuelFlowRateSourceCode: "string",
    beginDate: null,
    beginHour: 0,
    endDate: null,
    endHour: 0,
  };
  const saveFuelFlows = () => {
    const userInput = extractUserInput(fuelFlowsPayload, ".modalUserInput");
    mpApi
      .saveSystemsFuelFlows(
        userInput,
        selectedSystem.locationId,
        selectedSystem.id
      )
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });
    setUpdateFuelFlowTable(true);
  };

  const createFuelFlows = () => {
    const userInput = extractUserInput(fuelFlowsPayload, ".modalUserInput");

    mpApi
      .createSystemsFuelFlows(
        userInput,
        selectedSystem.locationId,
        selectedSystem.id
      )
      .then((result) => {
        console.log(result, " was created");
      })
      .catch((error) => {
        console.log("error is", error);
      });
    setUpdateFuelFlowTable(true);
  };
  // system components

  const componentPayload = {
    basisCode: "string",
    manufacturer: "string",
    modelVersion: "string",
    serialNumber: "string",
    componentTypeCode: "string",
    hgConverterIndicator: 0,
    beginDate: "2021-09-11T06:23:36.289Z",
    beginHour: 0,
    endDate: "2021-09-11T06:23:36.289Z",
    endHour: 0,
    componentId: "string",
  };
  const createComponent = () => {
    console.log("test createComponent");
    const userInput = extractUserInput(
      componentPayload,
      ".modalUserInput",
      "hgConverterIndicator"
    );

    mpApi
      .createSystemsComponents(
        userInput,
        selectedSystem.locationId,
        selectedSystem.id
      )
      .then((result) => {
        console.log(result, " was created");
      })
      .catch((error) => {
        console.log("error is", error);
      });
    setupdateComponentTable(true);
  };

  const saveComponent = () => {
    console.log(selectedSystem, "selectedSystem");
    const userInput = extractUserInput(
      componentPayload,
      ".modalUserInput",
      "hgConverterIndicator"
    );
    mpApi
      .saveSystemsComponents(
        userInput,
        selectedSystem.locationId,
        selectedSystem.id,
        selectedRangeInFirst.componentRecordId
      )
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });
    setupdateComponentTable(true);
  };

  // from analyzer ranges view to components view
  const backToSecondLevelBTN = (mainLevel) => {
    setThirdLevel(mainLevel);
    setBread(true, "Components");
  };

  const backToFirstLevelLevelBTN = (mainLevel) => {
    setSecondLevel(mainLevel);
    setBread(false, "");
  };
  const data = useMemo(() => {
    if (monitoringSystems.length > 0) {
      const activeOnly = getActiveData(monitoringSystems);
      const inactiveOnly = getInactiveData(monitoringSystems);

      // only active data >  disable checkbox and unchecks it
      if (activeOnly.length === monitoringSystems.length) {
        // uncheck it and disable checkbox
        //function parameters ( check flag, disable flag )
        settingInactiveCheckBox(false, true);
        return fs.getMonitoringPlansSystemsTableRecords(monitoringSystems);
      }

      // only inactive data > disables checkbox and checks it
      if (inactiveOnly.length === monitoringSystems.length) {
        //check it and disable checkbox
        settingInactiveCheckBox(true, true);
        return fs.getMonitoringPlansSystemsTableRecords(monitoringSystems);
      }

      // resets checkbox
      settingInactiveCheckBox(inactive[0], false);
      return fs.getMonitoringPlansSystemsTableRecords(
        !inactive[0] ? getActiveData(monitoringSystems) : monitoringSystems
      );
    }
    return [];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [monitoringSystems, inactive]);
  const [openFuelFlowsView, setOpenFuelFlowsView] = React.useState(false);
  return (
    <>
      <input
        tabIndex={-1}
        aria-hidden={true}
        role="button"
        type="hidden"
        id="testingBtn"
        onClick={() => {
          closeModalHandler();
          openSystem(false, false, true);
          setBread(false, false, false, false);
        }}
      />
      {/* tests saving functionality */}
      <input
        tabIndex={-1}
        aria-hidden={true}
        role="button"
        type="hidden"
        id="testingBtn2"
        onClick={() => {
          saveSystems();
          saveFuelFlows();
          saveAnalyzerRanges();
          saveComponent();
        }}
      />
      <div className={`usa-overlay ${show ? "is-visible" : ""}`} />
      <div className="methodTable ">
        <DataTableRender
          dataLoaded={dataLoaded}
          data={data}
          columnNames={columnNames}
          openHandler={openSystem}
          actionsBtn="View"
          checkout={checkout}
          user={user}
          addBtn={openSystem}
          addBtnName={"Create System"}
        />
      </div>
      {show ? (
        createNewSystem ? (
          <Modal
            show={show}
            close={closeModalHandler}
            showCancel={!(user && checkout)}
            showSave={user && checkout}
            breadCrumbBar={currentBar}
            title={"Create System"}
            exitBTN="Create System"
            save={() => {
              createSystems();
              setCreateNewSystem(false);
              setShow(false);
            }}
            children={
              <ModalDetails
                modalData={selected}
                data={selectedModalData}
                cols={2}
                title={`Create System`}
                viewOnly={!(user && checkout)}
              />
            }
          />
        ) : (
          <Modal
            secondLevel={secondLevel}
            show={show}
            extraBtn={
              secondLevel && !thirdLevel
                ? secondLevelName == "Add Component"
                  ? () => {
                      setAddCompThirdLevelCreateTrigger(true);
                    }
                  : null
                : null
            }
            extraBtnText={"Create New Component"}
            save={
              !secondLevel && !thirdLevel // first level at systems
                ? () => {
                    saveSystems();
                    setShow(false);
                  }
                : secondLevel && !thirdLevel // second level at components or fuel flows
                ? // at system fuel flows
                  secondLevelName === "Fuel Flow"
                  ? createFuelFlowFlag
                    ? () => {
                        createFuelFlows();
                        backToFirstLevelLevelBTN(false);
                        setOpenFuelFlowsView(false);
                      }
                    : () => {
                        saveFuelFlows();
                        backToFirstLevelLevelBTN(false);

                        setOpenFuelFlowsView(false);
                      }
                  : secondLevelName === "Component" && !createNewComponentFlag
                  ? // at system components
                    // need to hide analyzer range table on create
                    () => {
                      saveComponent();
                      backToFirstLevelLevelBTN(false);
                    }
                  : secondLevelName === "Component" && createNewComponentFlag
                  ? // at system components
                    () => {
                      setCreateNewComponentFlag(false);
                      setAddComponentFlag(false);
                      backToFirstLevelLevelBTN(false);
                      createComponent();
                      console.log("testing add/creat btn");
                    }
                  : // at add component level page
                  secondLevelName === "Add Component"
                  ? () => {
                      setAddCompThirdLevelTrigger(true);
                    }
                  : () => {
                      console.log("random button press function");
                    }
                : // at analyzer ranges in components at third level
                createAnalyzerRangesFlag
                ? // in creating a range
                  () => {
                    createAnalyzerRange();
                    backToSecondLevelBTN(false);
                    setCreateAnalyzerRangesFlag(false);
                  }
                : // in just editing a range
                  () => {
                    saveAnalyzerRanges();
                    backToSecondLevelBTN(false);
                  }
            }
            close={closeModalHandler}
            showCancel={!(user && checkout)}
            showSave={user && checkout}
            exitBTN={
              createAnalyzerRangesFlag
                ? "Create Analyzer Range"
                : createFuelFlowFlag
                ? "Create Fuel Flow"
                : // add componentmodal page
                addComponentFlag && !createNewComponentFlag
                ? "Continue"
                : createNewComponentFlag &&
                  addComponentFlag &&
                  addExistingComponentFlag
                ? "Add Existing Component"
                : // /: // create a new comp page
                createNewComponentFlag &&
                  addComponentFlag &&
                  !addExistingComponentFlag
                ? "Create New Component"
                : null
            }
            breadCrumbBar={currentBar}
            title={`System: ${selected[0]["value"]}`}
            // exitBTN={createBTN}
            // createBtnAPI={createBtnAPI}
            children={
              <div>
                {secondLevel ? (
                  ""
                ) : (
                  <ModalDetails
                    modalData={selected}
                    data={selectedModalData}
                    cols={2}
                    title={`System: ${selected[0]["value"]}`}
                    viewOnly={!(user && checkout)}
                  />
                )}

                <DataTableSystemsComponents
                  secondLevel={secondLevel}
                  setSecondLevel={setSecondLevel}
                  viewOnly={false}
                  setThirdLevel={setThirdBread}
                  thirdLevel={thirdLevel}
                  setBread={setBread}
                  user={user}
                  checkout={checkout}
                  // setCreateBtn={setCreateBTN}
                  // setCreateBtnAPI={setCreateBtnAPI}
                  updateComponentTable={updateComponentTable}
                  setupdateComponentTable={setupdateComponentTable}
                  updateAnalyzerRangeTable={updateAnalyzerRangeTable}
                  setCreateAnalyzerRangesFlag={setCreateAnalyzerRangesFlag}
                  createAnalyzerRangesFlag={createAnalyzerRangesFlag}
                  setCreateFuelFlowFlag={setCreateFuelFlowFlag}
                  createFuelFlowFlag={createFuelFlowFlag}
                  setCreateNewComponentFlag={setCreateNewComponentFlag}
                  createNewComponentFlag={createNewComponentFlag}
                  updateFuelFlowTable={updateFuelFlowTable}
                  setUpdateFuelFlowTable={setUpdateFuelFlowTable}
                  locationSelectValue={locationSelectValue}
                  systemID={selected.length > 1 ? selected[0].value : 0}
                  setSelectedRangeInFirst={setSelectedRangeInFirst}
                  setSelectedFuelFlows={setSelectedFuelFlows}
                  selectedFuelFlows={selectedFuelFlows}
                  addComponentFlag={addComponentFlag}
                  setAddComponentFlag={setAddComponentFlag}
                  addExistingComponentFlag={addExistingComponentFlag}
                  setAddExistingComponentFlag={setAddExistingComponentFlag}
                  addCompThirdLevelTrigger={addCompThirdLevelTrigger}
                  setAddCompThirdLevelTrigger={setAddCompThirdLevelTrigger}
                  addCompThirdLevelCreateTrigger={
                    addCompThirdLevelCreateTrigger
                  }
                  setAddCompThirdLevelCreateTrigger={
                    setAddCompThirdLevelCreateTrigger
                  }
                  backToFirstLevelLevelBTN={backToFirstLevelLevelBTN}
                  setCurrentBar={setCurrentBar}
                  openFuelFlowsView={openFuelFlowsView}
                  setOpenFuelFlowsView={setOpenFuelFlowsView}
                />
              </div>
            }
          />
        )
      ) : null}
    </>
  );
};

export default DataTableSystems;
