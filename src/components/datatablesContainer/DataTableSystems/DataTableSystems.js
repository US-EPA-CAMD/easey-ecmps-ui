import React, { useEffect, useMemo, useState } from "react";
import { modalViewData } from "../../../additional-functions/create-modal-input-controls";
import * as fs from "../../../utils/selectors/monitoringPlanSystems";
import Modal from "../../Modal/Modal";
import DataTableSystemsComponents from "../DataTableSystemsComponents/DataTableSystemsComponents";
import DataTableRender from "../../DataTableRender/DataTableRender";
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

export const DataTableSystems = ({
  locationSelectValue,
  inactive,
  user,
  checkout,
  settingInactiveCheckBox,
  revertedState,
  setRevertedState,
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
  const [updateTable, setUpdateTable] = useState(false);
  useEffect(() => {
    if (
      updateTable ||
      monitoringSystems.length <= 0 ||
      locationSelectValue ||
      revertedState
    ) {
      mpApi.getMonitoringSystems(locationSelectValue).then((res) => {
        setMonitoringSystems(res.data);
        setDataLoaded(true);
      });
      setUpdateTable(false);
      setRevertedState(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locationSelectValue, updateTable, revertedState]);

  const [selected, setSelected] = useState(null);
  const [selectedSystem, setSelectedSystem] = useState(null);
  const [selectedModalData, setSelectedModalData] = useState(null);

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
          monitoringSystemId: ["System ID", "input", "required"],
          systemDesignationCode: ["System Designation", "dropdown", "required"],
          systemTypeCode: ["System Type", "dropdown", "required"],
          fuelCode: ["Fuel Type", "dropdown", "required"],
        },
        {
          beginDate: ["Start Date", "date", "required"],
          beginHour: ["Start Time", "time", "required"],
          endDate: ["End Date", "date", ""],
          endHour: ["End Time", "time", ""],
        },
        create,
        false
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

  const closeModalHandler = () => {
    if (window.isDataChanged === true) {
      if (window.confirm(unsavedDataMessage) === true) {
        setSecondLevel(false);
        setThirdLevel(false);
        setShow(false);
        removeChangeEventListeners(".modalUserInput");
      }
    } else {
      setSecondLevel(false);
      setThirdLevel(false);
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
        <Breadcrumb onClick={() => setSecondLevel(false)}>
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

  const setBread = (val, currentBread,create) => {
    setSecondLevel(val);
    setSecondLevelName(currentBread);
    setCreateFuelFlowFlag(create);
    breadCrumbs(currentBread);
  };
  /// for analyzer ranges
  const breadThirdCrumbs = (lastBread) => {
    const breadBar = (
      <BreadcrumbBar className="padding-0">
        <Breadcrumb onClick={() => setSecondLevel(false)}>
          <BreadcrumbLink>
            <span>System</span>
          </BreadcrumbLink>
        </Breadcrumb>

        <Breadcrumb
          onClick={() => {
            setThirdLevel(false);
            setBread(true, "Components");
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

  const setThirdBread = (val, currentBread,create) => {
    console.log('valVAL',val,currentBread)
    setThirdLevel(val);
    // setSecondLevel(false);
    breadThirdCrumbs(currentBread);
    setCreateAnalyzerRangesFlag(create);
  };
  //////////
  const [createBTN, setCreateBTN] = useState("Save and Close");
  const [createBtnAPI, setCreateBtnAPI] = useState(null);

  const [selectedRangeInFirst, setSelectedRangeInFirst] = useState(null);
  const [updateAnalyzerRangeTable, setUpdateAnalyzerRangeTable] = useState(
    false
  );
  const [updateFuelFlowTable, setUpdateFuelFlowTable] = useState(false);

  const [createAnalyzerRangesFlag, setCreateAnalyzerRangesFlag] = useState(
    false
  );
  const [createFuelFlowFlag, setCreateFuelFlowFlag] = useState(false);
  const [createNewComponentFlag, setCreateNewComponentFlag] = useState(false);

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
      .createSystemsFuelFlows(userInput)
      .then((result) => {
        console.log(result, " was created");
      })
      .catch((error) => {
        console.log("error is", error);
      });
    setUpdateFuelFlowTable(true);
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
  return (
    <>
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
            save={
              !secondLevel && !thirdLevel // first level at systems
                ? closeModalHandler
                : secondLevel && !thirdLevel // second level at components or fuel flows
                ? // at system fuel flows
                  secondLevelName === "Fuel Flow"
                  ? createFuelFlowFlag
                    ? () => {
                        createFuelFlows();
                        backToFirstLevelLevelBTN(false);
                      
                      }
                    : () => {
                      saveFuelFlows();
                        backToFirstLevelLevelBTN(false);
                      }
                  : // at system components
                  // need to hide analyzer range table on create 
                    () => console.log("DDINT WORK")
                : // at analyzer ranges in components at third level
                createAnalyzerRangesFlag
                ? // in creating a range
                  () => {
                    createAnalyzerRange();
                    backToSecondLevelBTN(false);
                    setCreateAnalyzerRangesFlag(false)
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
            exitBTN={createAnalyzerRangesFlag? 'Create Analyzer Range' : createFuelFlowFlag? "Create Fuel Flow" : null}
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
                  setSecondLevel={setBread}
                  viewOnly={false}
                  setThirdLevel={setThirdBread}
                  thirdLevel={thirdLevel}
                  setBread={setBread}
                  user={user}
                  checkout={checkout}
                  // setCreateBtn={setCreateBTN}
                  // setCreateBtnAPI={setCreateBtnAPI}
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
