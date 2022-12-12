import { connect } from 'react-redux';
import React, { useEffect, useMemo, useState } from "react";
import * as fs from "../../../utils/selectors/monitoringPlanRectangularDucts";
import Modal from "../../Modal/Modal";
import ModalDetails from "../../ModalDetails/ModalDetails";
import { DataTableRender } from "../../DataTableRender/DataTableRender";
import {
  displayAppError,
  needEndDate,
} from "../../../additional-functions/app-error";
import { extractUserInput } from "../../../additional-functions/extract-user-input";
import { modalViewData } from "../../../additional-functions/create-modal-input-controls";
import * as mpApi from "../../../utils/api/monitoringPlansApi";
import { UseRetrieveDropdownApi } from "../../../additional-functions/retrieve-dropdown-api";
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
//
export const DataTableRectangularDucts = ({
  locationSelectValue,
  user,
  checkout,
  inactive,
  settingInactiveCheckBox,
  revertedState,
  setRevertedState,
  currentTabIndex,
  tabs,
  showModal = false,
}) => {
  const [ducts, setDucts] = useState([]);
  const [show, setShow] = useState(showModal);
  const [selectedDuct, setSelectedDuct] = useState(null);
  const [selectedModalData, setSelectedModalData] = useState(null);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [totalOptions, setTotalOptions] = useState({})
  const [updateTable, setUpdateTable] = useState(false);

  const [returnedFocusToLast, setReturnedFocusToLast] = useState(false);

  // *** Assign initial event listeners after loading data/dropdowns
  useEffect(() => {
    if (dataLoaded) {
      returnFocusToLast();
      assignFocusEventListeners();
    }
  }, [dataLoaded]);

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
      updateTable ||
      ducts.length <= 0 ||
      locationSelectValue ||
      revertedState
    ) {
      if (updateTable) {
        let timerFunc = setTimeout(() => {
          mpApi
            .getMonitoringRectangularDucts(locationSelectValue)
            .then((res) => {
              setDucts(res.data);
              setDataLoaded(true);
              setUpdateTable(false);
            });

          setRevertedState(false);
        }, [1000]);
        return () => clearTimeout(timerFunc);
      }
      mpApi.getMonitoringRectangularDucts(locationSelectValue).then((res) => {
        setDucts(res.data);
        setDataLoaded(true);
        setUpdateTable(false);
      });

      UseRetrieveDropdownApi(["wafMethodCode"]).then(resp => {
        setTotalOptions(resp);
        setDataLoaded(true);
        setUpdateTable(false);
      })

      setRevertedState(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locationSelectValue, updateTable, revertedState, checkout]);

  // *** column names for dataset (will be passed to normalizeRowObjectFormat later to generate the row object
  // *** in the format expected by the modal / tabs plugins)
  const columnNames = [
    "WAF Determination Date",
    "WAF Method",
    "Begin Date and Time",
    "End Date and Time",
  ];

  const payload = {
    locationId: locationSelectValue,
    id: "string",
    userId: "string",
    addDate: "2021-10-18T07:05:11.018Z",
    updateDate: "2021-10-18T07:05:11.018Z",
    wafDeterminationDate: "2021-10-18T07:05:11.018Z",
    wafBeginDate: "2021-10-18T07:05:11.018Z",
    wafBeginHour: 0,
    wafMethodCode: "string",
    wafValue: 0,
    numberOfTestRuns: 0,
    numberOfTraversePointsWaf: 0,
    numberOfTestPorts: 0,
    numberOfTraversePointsRef: 0,
    ductWidth: 0,
    ductDepth: 0,
    wafEndDate: "2021-10-18T07:05:11.018Z",
    wafEndHour: 0,
  };

  // cant unit test properly
  const [createNewDuct, setCreateNewDuct] = useState(false);

  // Executed when "View" action is clicked
  const openDuctModal = (row, bool, create) => {
    let duct = null;
    setCreateNewDuct(create);
    if (ducts.length > 0 && !create) {
      duct = ducts.filter(
        (element) => element.id === row[`col${Object.keys(row).length - 1}`]
      )[0];
      setSelectedDuct(duct);
    }
    setSelectedModalData(
      modalViewData(
        duct,
        {
          wafMethodCode: ["WAF Method", "dropdown", ""],
          wafValue: ["WAF Value", "input", ""],
          numberOfTestRuns: ["Number of Test Runs", "input", ""],
          numberOfTraversePointsWaf: [
            "Number of Traverse Points WAF",
            "input",
            "",
          ],
          numberOfTestPorts: ["Number of Test Ports", "input", ""],
          numberOfTraversePointsRef: [
            "Number of Traverse Points Reference",
            "input",
            "",
          ],
          ductWidth: ["Duct Width", "input", ""],
          ductDepth: ["Duct Depth", "input", ""],
        },
        {
          wafDeterminationDate: ["WAF Determination Date", "date", ""],
          skip: ["", "skip", ""],
          wafBeginDate: ["Start Date", "date", ""],
          wafBeginHour: ["Start Time", "hourDropdown", ""],
          wafEndDate: ["End Date", "date", ""],
          wafEndHour: ["End Time", "hourDropdown", ""],
        },
        create,
        totalOptions
      )
    );
    setShow(true);

    setTimeout(() => {
      attachChangeEventListeners(".modalUserInput");
    });
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
    setShow(false);
    removeChangeEventListeners(".modalUserInput");
    setReturnedFocusToLast(false);
  };

  const data = useMemo(() => {
    if (ducts.length > 0) {
      const activeOnly = getActiveData(ducts);
      const inactiveOnly = getInactiveData(ducts);

      // only active data >  disable checkbox and unchecks it
      if (activeOnly.length === ducts.length) {
        // uncheck it and disable checkbox
        //function parameters ( check flag, disable flag )
        settingInactiveCheckBox(false, true);
        return fs.getMonitoringPlansRectangularDuctsTableRecords(ducts);
      }

      // only inactive data > disables checkbox and checks it
      else if (inactiveOnly.length === ducts.length) {
        //check it and disable checkbox
        settingInactiveCheckBox(true, true);
        return fs.getMonitoringPlansRectangularDuctsTableRecords(ducts);
      }
      // resets checkbox
      else {
        settingInactiveCheckBox(tabs[currentTabIndex].inactive[0], false);
        return fs.getMonitoringPlansRectangularDuctsTableRecords(
          tabs[currentTabIndex].inactive[0] === false
            ? getActiveData(ducts)
            : ducts
        );
      }
    } else {
      return [];
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ducts, tabs[currentTabIndex].inactive[0]]);

  const testing = () => {
    openDuctModal(false, false, true);
    saveDuct();
  };

  const testing2 = () => {
    openDuctModal(
      { col5: "MELISSARHO-CDF765BC7BF849EE9C23608B95540200" },
      false,
      false
    );
  };
  const testing3 = () => {
    openDuctModal(false, false, true);
    createDuct();
  };

  const saveDuct = () => {
    const userInput = extractUserInput(payload, ".modalUserInput");
    if (
      (userInput.endHour && !userInput.endDate) ||
      (!userInput.endHour && userInput.endDate)
    ) {
      displayAppError(needEndDate);
      setShow(false);
    } else {
      mpApi
        .saveMonitoringDuct(userInput)
        .then((result) => {
          setShow(false);
        })
        .catch((error) => {
          console.log("error is", error);
          setShow(false);
        });
      setUpdateTable(true);
    }
  };

  const createDuct = () => {
    const userInput = extractUserInput(payload, ".modalUserInput");
    if (
      (userInput.endHour && !userInput.endDate) ||
      (!userInput.endHour && userInput.endDate)
    ) {
      displayAppError(needEndDate);
      setShow(false);
    } else {
      mpApi
        .createMonitoringDuct(userInput)
        .then((result) => {
          setShow(false);
        })
        .catch((error) => {
          console.log("error is", error);
          setShow(false);
        });
      setUpdateTable(true);
    }
  };

  return (
    <div className="methodTable">
      <div className={`usa-overlay ${show ? "is-visible" : ""}`} />
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
      <input
        tabIndex={-1}
        aria-hidden={true}
        role="button"
        type="hidden"
        id="testingBtn3"
        onClick={() => testing3()}
      />

      <DataTableRender
        openHandler={openDuctModal}
        columnNames={columnNames}
        data={data}
        dataLoaded={dataLoaded}
        pagination={false}
        filter={false}
        actionsBtn={"View"}
        checkout={checkout}
        user={user}
        addBtn={openDuctModal}
        addBtnName={"Create Rectangular Duct WAF"}
      />
      {show ? (
        <Modal
          show={show}
          close={closeModalHandler}
          save={createNewDuct ? createDuct : saveDuct}
          showCancel={!(user && checkout)}
          showSave={user && checkout}
          title={
            createNewDuct
              ? "Create Rectangular Duct WAF"
              : "Rectangular Duct WAF"
          }
          exitBTN={
            createNewDuct ? "Create Rectangular Duct WAF" : `Save and Close`
          }
          children={
            <div>
              <ModalDetails
                modalData={selectedDuct}
                data={selectedModalData}
                cols={2}
                title={"Rectangular Duct WAFs"}
                viewOnly={!(user && checkout)}
              />
            </div>
          }
        />
      ) : null}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {

    tabs: state.openedFacilityTabs['monitoringPlans'],
  };
};

export default connect(mapStateToProps, null)(DataTableRectangularDucts);
export { mapStateToProps };
