import React, { useEffect, useMemo, useState } from "react";
import { modalViewData } from "../../../additional-functions/create-modal-input-controls";
import * as fs from "../../../utils/selectors/monitoringPlanSystems";
import Modal from "../../Modal/Modal";
import DataTableSystemsComponents from "../DataTableSystemsComponents/DataTableSystemsComponents";
import { DataTableRender } from "../../DataTableRender/DataTableRender";
import * as mpApi from "../../../utils/api/monitoringPlansApi";
import ModalDetails from "../../ModalDetails/ModalDetails";
import { extractUserInput, validateUserInput } from "../../../additional-functions/extract-user-input";
import {
  needEndDate,
} from "../../../additional-functions/app-error";
import { Preloader } from "@us-epa-camd/easey-design-system";
import { connect } from "react-redux";
import { loadDropdowns } from "../../../store/actions/dropdowns";
import {
  convertSectionToStoreName,
  SYSTEMS_SECTION_NAME,
  SYSTEMS_STORE_NAME,
} from "../../../additional-functions/data-table-section-and-store-names";

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

import {
  assignFocusEventListeners,
  cleanupFocusEventListeners,
  returnFocusToLast,
} from "../../../additional-functions/manage-focus";
import { successResponses } from "../../../utils/api/apiUtils";

export const DataTableSystems = ({
  mdmData,
  loadDropdownsData,
  locationSelectValue,
  inactive,
  user,
  checkout,
  settingInactiveCheckBox,
  revertedState,
  setRevertedState,
  selectedRangeInFirstTest,
  currentTabIndex,
  //

  tabs,
  selectedSysIdTest = false,

  showModal = false,
}) => {
  const [show, setShow] = useState(showModal);
  const [monitoringSystems, setMonitoringSystems] = useState([]);
  const [disableExitBtn, setDisableExitBtn] = useState(true);

  // for components/ fuel flow view
  const [secondLevel, setSecondLevel] = useState(false);
  const [secondLevelName, setSecondLevelName] = useState("");

  // for analyzer range view
  const [thirdLevel, setThirdLevel] = useState(false);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [updateSystemTable, setUpdateSystemTable] = useState(false);

  const [dropdownsLoaded, setDropdownsLoaded] = useState(false);
  const dropdownArray = [
    ["systemDesignationCode", "systemTypeCode", "fuelCode"],
  ];

  const [returnedFocusToLast, setReturnedFocusToLast] = useState(false);

  // modal add component selection
  const [selectedUnlinkedComponent, setSelectedUnlinkedComponent] = useState(
    []
  );
  const [errorMsgs, setErrorMsgs] = useState([])
  const dataTableName = "Systems";

  useEffect(() => {
    if (selectedUnlinkedComponent.length > 0) {
      setDisableExitBtn(false);
    }
  }, [selectedUnlinkedComponent]);

  // *** Assign initial event listeners after loading data/dropdowns
  useEffect(() => {
    if (dataLoaded && dropdownsLoaded) {
      returnFocusToLast();
      assignFocusEventListeners();
    }
  }, [dataLoaded, dropdownsLoaded]);

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
  }, [locationSelectValue, revertedState, checkout, updateSystemTable]);

  // load dropdowns data (called once)
  useEffect(() => {
    if (mdmData.length === 0) {
      loadDropdownsData(SYSTEMS_SECTION_NAME, dropdownArray);
    } else {
      setDropdownsLoaded(true);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mdmData]);

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
          fuelCode: ["Fuel Code", "dropdown", ""],
        },
        {
          beginDate: ["Start Date", "date", ""],
          beginHour: ["Start Time", "hourDropdown", ""],
          endDate: ["End Date", "date", ""],
          endHour: ["End Time", "hourDropdown", ""],
        },
        create,
        mdmData
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
        executeOnClose();
      }
    } else {
      executeOnClose();
    }
  };

  const executeOnClose = () => {
    setErrorMsgs([]);
    resetFlags();
    setShow(false);
    setDisableExitBtn(true);
    removeChangeEventListeners(".modalUserInput");
    setReturnedFocusToLast(false);
  };

  const [createNewSystem, setCreateNewSystem] = useState(false);

  // *** column names for dataset (will be passed to normalizeRowObjectFormat later to generate the row object
  // *** in the format expected by the modal / tabs plugins)
  const columnNames = [
    "System ID",
    "System Type",
    "System Designation",
    "Fuel Code",
    "Begin Date/Time",
    "End Date/Time",
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
    if (!val) {
      setReturnedFocusToLast(false);
    }

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
  // const [createBTN, setCreateBTN] = useState("Save and Close");
  // const [createBtnAPI, setCreateBtnAPI] = useState(null);

  const [selectedRangeInFirst, setSelectedRangeInFirst] = useState(
    selectedRangeInFirstTest ? selectedRangeInFirstTest : null
  );
  const [updateAnalyzerRangeTable, setUpdateAnalyzerRangeTable] =
    useState(false);
  const [updateFuelFlowTable, setUpdateFuelFlowTable] = useState(false);
  const [updateComponentTable, setupdateComponentTable] = useState(false);
  const [createAnalyzerRangesFlag, setCreateAnalyzerRangesFlag] =
    useState(false);
  const [createFuelFlowFlag, setCreateFuelFlowFlag] = useState(false);
  const [createNewComponentFlag, setCreateNewComponentFlag] = useState(false);

  const [addComponentFlag, setAddComponentFlag] = React.useState(false);
  const [addExistingComponentFlag, setAddExistingComponentFlag] =
    React.useState(false);
  const [addCompThirdLevelTrigger, setAddCompThirdLevelTrigger] =
    React.useState(false);
  const [addCompThirdLevelCreateTrigger, setAddCompThirdLevelCreateTrigger] =
    React.useState(false);

  const saveSystems = async () => {
    const userInput = extractUserInput(sysPayload, ".modalUserInput");
    const validationErrors = validateUserInput(userInput, dataTableName);
    if (validationErrors.length > 0) {
      setErrorMsgs(validationErrors);
      return;
    }
    try {
      const resp = await mpApi.saveSystems(userInput, locationSelectValue, selectedSystem.id);
      if (successResponses.includes(resp.status)) {
        setUpdateSystemTable(true);
        executeOnClose();
      } else {
        const errorResp = Array.isArray(resp) ? resp : [resp];
        setErrorMsgs(errorResp);
      }
    } catch (error) {
      setErrorMsgs([JSON.stringify(error)])
    }
  };

  const createSystems = async () => {
    const userInput = extractUserInput(sysPayload, ".modalUserInput");
    const validationErrors = validateUserInput(userInput, dataTableName);
    if (validationErrors.length > 0) {
      setErrorMsgs(validationErrors);
      return;
    }
    try {
      const resp = await mpApi.createSystems(userInput, locationSelectValue);
      if (successResponses.includes(resp.status)) {
        setSecondLevel(false);
        setUpdateSystemTable(true);
        executeOnClose();
      } else {
        const errorResp = Array.isArray(resp) ? resp : [resp];
        setErrorMsgs(errorResp);
      }
    } catch (error) {
      setErrorMsgs([JSON.stringify(error)])
    }
  };

  /**
   * Saves analyzer range for system component
   * @returns true if saved successfully, false otherwise
   */
  const saveAnalyzerRanges = async () => {
    const payload = {
      locId: selectedRangeInFirst.locationId,
      compId: selectedRangeInFirst.componentRecordId,
      id: "string",
      analyzerRangeCode: "string",
      dualRangeIndicator: 0,
      beginDate: "string",
      beginHour: 0,
      endDate: "string",
      endHour: 0,
    };
    const userInput = extractUserInput(payload, ".modalUserInput", [
      "dualRangeIndicator",
    ]);
    const analyzerRangesTable = "Analyzer Ranges";
    const validationErrors = validateUserInput(userInput, analyzerRangesTable);
    if (validationErrors.length > 0) {
      setErrorMsgs(validationErrors);
      return false;
    }
    try {
      const resp = await mpApi.saveAnalyzerRanges(userInput);
      if (resp.status >= 200 && resp.status < 300) {
        setUpdateAnalyzerRangeTable(true);
        return true;
      } else {
        const errorResp = Array.isArray(resp) ? resp : [resp];
        setErrorMsgs(errorResp);
      }
    } catch (error) {
      setErrorMsgs([JSON.stringify(error)])
    }
    return false;
  };

  /**
   * Create analyzer range for a system component
   * @returns true if created successfully, false otherwise
   */
  const createAnalyzerRange = async () => {
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
    const userInput = extractUserInput(payload, ".modalUserInput", [
      "dualRangeIndicator",
    ]);
    const analyzerRangesTable = "Analyzer Ranges";
    const validationErrors = validateUserInput(userInput, analyzerRangesTable);
    if (validationErrors.length > 0) {
      setErrorMsgs(validationErrors);
      return false;
    }
    try {
      const resp = await mpApi.createAnalyzerRanges(userInput);
      if (resp.status >= 200 && resp.status < 300) {
        setUpdateAnalyzerRangeTable(true);
        return true;
      } else {
        const errorResp = Array.isArray(resp) ? resp : [resp];
        setErrorMsgs(errorResp);
      }
    } catch (error) {
      setErrorMsgs([JSON.stringify(error)])
    }
    return false;
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

  /**
   * Saves fuel flow for a system
   * @returns true if saved successfully, false otherwise
   */
  const saveFuelFlows = async () => {
    const userInput = extractUserInput(fuelFlowsPayload, ".modalUserInput");
    const fuelFlowTable = "Fuel Flows";
    const validationErrors = validateUserInput(userInput, fuelFlowTable);
    if (validationErrors.length > 0) {
      setErrorMsgs(validationErrors);
      return false;
    }
    try {
      const resp = await mpApi.saveSystemsFuelFlows(userInput, selectedSystem.locationId, selectedSystem.locationId);
      if (resp.status >= 200 && resp.status < 300) {
        setUpdateFuelFlowTable(true);
        return true;
      } else {
        const errorResp = Array.isArray(resp) ? resp : [resp];
        setErrorMsgs(errorResp);
      }
    } catch (error) {
      setErrorMsgs([JSON.stringify(error)])
    }
    return false;
  };

  /**
   * Creates fuel flow for a system
   * @returns true if created successfully, false otherwise
   */
  const createFuelFlows = async () => {
    const userInput = extractUserInput(fuelFlowsPayload, ".modalUserInput");
    const fuelFlowsTable = "Fuel Flows";
    const validationErrors = validateUserInput(userInput, fuelFlowsTable);
    if (validationErrors.length > 0) {
      setErrorMsgs(validationErrors);
      return false;
    }
    try {
      const resp = await mpApi.createSystemsFuelFlows(userInput, selectedSystem.locationId, selectedSystem.id);
      if (resp.status >= 200 && resp.status < 300) {
        setUpdateFuelFlowTable(true);
        return true;
      } else {
        const errorResp = Array.isArray(resp) ? resp : [resp];
        setErrorMsgs(errorResp);
      }
    } catch (error) {
      setErrorMsgs([JSON.stringify(error)])
    }
    return false;
  };
  // system components

  const componentPayload = {
    basisCode: "string",
    manufacturer: "string",
    modelVersion: "string",
    serialNumber: "string",
    sampleAcquisitionMethodCode: "string",
    componentTypeCode: "string",
    hgConverterIndicator: 0,
    beginDate: "2021-09-11T06:23:36.289Z",
    beginHour: 0,
    endDate: "2021-09-11T06:23:36.289Z",
    endHour: 0,
    componentId: "string",
  };

  /**
   * Creates a component for a system
   * @returns true if component created successfully, false otherwise
   */
  const createComponent = async () => {
    const userInput = extractUserInput(componentPayload, ".modalUserInput");
    const sysCompTable = "System Components";
    const validationErrors = validateUserInput(userInput, sysCompTable);
    if (validationErrors.length > 0) {
      setErrorMsgs(validationErrors);
      return false;
    }
    try {
      const resp = await mpApi.createSystemsComponents(userInput, selectedSystem.locationId, selectedSystem.id);
      if (resp.status >= 200 && resp.status < 300) {
        setupdateComponentTable(true);
        return true;
      } else {
        const errorResp = Array.isArray(resp) ? resp : [resp];
        setErrorMsgs(errorResp);
      }
    } catch (error) {
      setErrorMsgs(JSON.stringify(error))
    }
    return false;
  };

  /**
   * Saves a component for a system
   * @returns true if component saved successfully, false otherwise
   */
  const saveComponent = async () => {
    const userInput = extractUserInput(componentPayload, ".modalUserInput");

    userInput.componentId = selectedRangeInFirst.componentId;
    userInput.componentTypeCode = selectedRangeInFirst.componentTypeCode;
    userInput.basisCode = selectedRangeInFirst.basisCode;
    userInput.hgConverterIndicator = selectedRangeInFirst.hgConverterIndicator;
    userInput.sampleAcquisitionMethodCode = selectedRangeInFirst.sampleAcquisitionMethodCode;

    const sysCompTable = "System Components";
    const validationErrors = validateUserInput(userInput, sysCompTable);
    if (validationErrors.length > 0) {
      setErrorMsgs(validationErrors);
      return false;
    }
    try {
      const resp = await mpApi.saveSystemsComponents(userInput, selectedSystem.locationId, selectedSystem.id, selectedRangeInFirst.id);
      if (resp.status >= 200 && resp.status < 300) {
        setupdateComponentTable(true);
        return true;
      } else {
        const errorResp = Array.isArray(resp) ? resp : [resp];
        setErrorMsgs(errorResp);
      }
    } catch (error) {
      setErrorMsgs([JSON.stringify(error)])
    }
    return false;
  };

  // from analyzer ranges view to components view
  const backToSecondLevelBTN = (mainLevel) => {
    setThirdLevel(mainLevel);
    setBread(true, "Components");
    setErrorMsgs([]);
  };

  const backToFirstLevelLevelBTN = (mainLevel) => {
    setSecondLevel(mainLevel);
    setBread(false, "");
    setErrorMsgs([]);
  };
  const data = useMemo(() => {
    if (monitoringSystems.length > 0) {
      const activeOnly = getActiveData(monitoringSystems);
      const inactiveOnly = getInactiveData(monitoringSystems);

      // active records only
      if (activeOnly.length === monitoringSystems.length) {
        settingInactiveCheckBox(false, true);
        return fs.getMonitoringPlansSystemsTableRecords(monitoringSystems);
      }

      // inactive records only
      else if (inactiveOnly.length === monitoringSystems.length) {
        settingInactiveCheckBox(true, true);
        return fs.getMonitoringPlansSystemsTableRecords(monitoringSystems);
      }

      // both active & inactive records
      else {
        settingInactiveCheckBox(tabs[currentTabIndex].inactive[0], false);
        return fs.getMonitoringPlansSystemsTableRecords(
          !tabs[currentTabIndex].inactive[0] ? getActiveData(monitoringSystems) : monitoringSystems
        );
      }
    }

    // no records
    else {

      return [];
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [monitoringSystems, tabs[currentTabIndex].inactive[0]]);

  // *** Reassign handlers when inactive checkbox is toggled
  useEffect(() => {
    assignFocusEventListeners();
  }, [inactive, data]);

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
          dataLoaded={dataLoaded && dropdownsLoaded}
          data={data}
          columnNames={columnNames}
          openHandler={openSystem}
          actionsBtn="View"
          checkout={checkout}
          user={user}
          addBtn={openSystem}
          addBtnName={"Create System"}
          show={show}
          ariaLabel={"Systems"}
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
              // setCreateNewSystem(false);
              // setShow(false);
            }}
            errorMsgs={errorMsgs}
            children={
              <ModalDetails
                modalData={selected}
                data={selectedModalData}
                cols={2}
                title={`Create System`}
                viewOnly={!(user && checkout)}
                setDisableExitBtnStatus={setDisableExitBtn}
              />
            }
          />
        ) : (
          <Modal
            errorMsgs={errorMsgs}
            secondLevel={secondLevel}
            show={show}
            extraBtn={
              secondLevel && !thirdLevel
                ? secondLevelName === "Add Component"
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
                      ? async () => {
                        const createSuccess = await createFuelFlows();
                        if (createSuccess) {
                          backToFirstLevelLevelBTN(false);
                          setOpenFuelFlowsView(false);
                        }
                      }
                      : async () => {
                        const saveSuccess = await saveFuelFlows();
                        if (saveSuccess) {
                          backToFirstLevelLevelBTN(false);
                          setOpenFuelFlowsView(false);
                        }
                      }
                    : secondLevelName === "Component" && !createNewComponentFlag
                      ? // at system components
                      // need to hide analyzer range table on create
                      async () => {
                        const saveSuccess = await saveComponent();
                        if (saveSuccess) { backToFirstLevelLevelBTN(false); }
                      }
                      : secondLevelName === "Component" && createNewComponentFlag
                        ? // at system components
                        async () => {
                          const createSuccess = await createComponent();
                          if (createSuccess) {
                            setCreateNewComponentFlag(false);
                            setAddComponentFlag(false);
                            backToFirstLevelLevelBTN(false);
                          }
                        }
                        : // at add component level page
                        secondLevelName === "Add Component"
                          ? () => {
                            setAddCompThirdLevelTrigger(true);
                          }
                          : () => { }
                  : // at analyzer ranges in components at third level
                  createAnalyzerRangesFlag
                    ? // in creating a range
                    async () => {
                      const createSuccess = await createAnalyzerRange();
                      if (createSuccess) {
                        backToSecondLevelBTN(false);
                        setCreateAnalyzerRangesFlag(false);
                        setDisableExitBtn(false);
                      }

                    }
                    : // in just editing a range
                    async () => {
                      const saveSuccess = await saveAnalyzerRanges();
                      if (saveSuccess) {
                        backToSecondLevelBTN(false);
                        setBread(true, "Component"); // fixes systems component "save and close" not working after saving analyzer range edit
                        setDisableExitBtn(false);
                      }
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
            // disableExitBtn={disableExitBtn}
            breadCrumbBar={currentBar}
            title={`System: ${selected[0]["value"]}`}
            children={
              <div>
                {secondLevel ? (
                  ""
                ) : dropdownsLoaded ? (
                  <ModalDetails
                    modalData={selected}
                    data={selectedModalData}
                    cols={2}
                    title={`System: ${selected[0]["value"]}`}
                    viewOnly={!(user && checkout)}
                    setDisableExitBtnStatus={setDisableExitBtn}
                  />
                ) : (
                  <Preloader />
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
                  setUpdateAnalyzerRangeTable={setUpdateAnalyzerRangeTable}
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
                  setSelectedUnlinkedComponent={setSelectedUnlinkedComponent}
                  selectedUnlinkedComponent={selectedUnlinkedComponent}
                  backToFirstLevelLevelBTN={backToFirstLevelLevelBTN}
                  setCurrentBar={setCurrentBar}
                  openFuelFlowsView={openFuelFlowsView}
                  setOpenFuelFlowsView={setOpenFuelFlowsView}
                  setDisableExitBtn={setDisableExitBtn}
                />
              </div>
            }
          />
        )
      ) : null}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    mdmData: state.dropdowns[SYSTEMS_STORE_NAME],
    tabs: state.openedFacilityTabs[
      'monitoringPlans'
    ],
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
export default connect(mapStateToProps, mapDispatchToProps)(DataTableSystems);
export { mapDispatchToProps };
export { mapStateToProps };
