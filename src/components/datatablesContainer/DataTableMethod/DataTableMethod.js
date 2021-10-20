import React, { useEffect, useMemo, useState } from "react";
import * as fs from "../../../utils/selectors/monitoringPlanMethods";
import Modal from "../../Modal/Modal";
import ModalDetails from "../../ModalDetails/ModalDetails";
import { DataTableRender } from "../../DataTableRender/DataTableRender";

import { extractUserInput } from "../../../additional-functions/extract-user-input";
import { modalViewData } from "../../../additional-functions/create-modal-input-controls";
import * as mpApi from "../../../utils/api/monitoringPlansApi";
import { useRetrieveDropdownApi } from "../../../additional-functions/retrieve-dropdown-api";
import {
  getActiveData,
  getInactiveData,
} from "../../../additional-functions/filter-data";

import {
  attachChangeEventListeners,
  removeChangeEventListeners,
  unsavedDataMessage,
} from "../../../additional-functions/prompt-to-save-unsaved-changes";

export const DataTableMethod = ({
  locationSelectValue,
  matsTableHandler,
  user,
  checkout,
  inactive,
  settingInactiveCheckBox,
  revertedState,
  setRevertedState,
  showModal = false,
}) => {
  const [methods, setMethods] = useState([]);
  const [matsMethods, setMatsMethods] = useState([]);
  const [show, setShow] = useState(showModal);
  const [selectedMonitoringMethod, setSelectedMonitoringMethod] = useState(
    null
  );
  const [selectedModalData, setSelectedModalData] = useState(null);
  const [dataLoaded, setDataLoaded] = useState(false);

  const totalOptions = useRetrieveDropdownApi([
    "parameterCode",
    "monitoringMethodCode",
    "substituteDataCode",
    "bypassApproachCode",
  ]);
  const [updateTable, setUpdateTable] = useState(false);
  useEffect(() => {
    if (
      updateTable ||
      methods.length <= 0 ||
      locationSelectValue ||
      revertedState
    ) {
      mpApi.getMonitoringMethods(locationSelectValue).then((res) => {
        setMethods(res.data);
        setDataLoaded(true);
      });
      mpApi.getMonitoringMatsMethods(locationSelectValue).then((res) => {
        setMatsMethods(res.data);
      });
      setUpdateTable(false);
      setRevertedState(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locationSelectValue, updateTable, revertedState]);

  // *** column names for dataset (will be passed to normalizeRowObjectFormat later to generate the row object
  // *** in the format expected by the modal / tabs plugins)
  const columnNames = [
    "Parameter",
    "Methodology",
    "Substitute Data Approach",
    "Bypass Approach",
    "Begin Date and Time",
    "End Date and Time",
  ];
  const payload = {
    locationId: locationSelectValue,
    id: null,
    parameterCode: null,
    substituteDataCode: null,
    bypassApproachCode: null,
    monitoringMethodCode: null,
    beginDate: null,
    beginHour: 0,
    endDate: null,
    endHour: 0,
  };
  // cant unit test properly
  const [createNewMethod, setCreateNewMethod] = useState(false);

  const testing = () => {
    openMethodModal(false, false, true);
    saveMethods();
  };

  const testing2 = () => {
    openMethodModal(
      { col7: "CAMD-BAC9D84563F24FE08057AF5643C8602C" },
      false,
      false
    );
  };

  const testing3 = () => {
    openMethodModal(false, false, true);
    createMethods();
  };

  const openMethodModal = (row, bool, create) => {
    let monMethod = null;
    setCreateNewMethod(create);
    if (methods.length > 0 && !create) {
      monMethod = methods.filter((element) => element.id === row.col7)[0];
      setSelectedMonitoringMethod(monMethod);
    }

    setSelectedModalData(
      modalViewData(
        monMethod,
        {
          parameterCode: ["Parameter", "dropdown", ""],
          monitoringMethodCode: ["Methodology", "dropdown", ""],
          substituteDataCode: ["Substitute Data Approach", "dropdown", ""],
          bypassApproachCode: ["Bypass Approach", "dropdown", ""],
        },
        {
          beginDate: ["Start Date", "date", ""],
          beginHour: ["Start Time", "time", ""],
          endDate: ["End Date", "date", ""],
          endHour: ["End Time", "time", ""],
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

  const [viewBtn, setViewBtn] = useState(null);
  const [addBtn, setAddBtn] = useState(null);

  const closeModalHandler = () => {
    if (window.isDataChanged === true) {
      if (window.confirm(unsavedDataMessage) === true) {
        setShow(false);
        removeChangeEventListeners(".modalUserInput");
      }
    } else {
      setShow(false);
      removeChangeEventListeners(".modalUserInput");
    }
    if (addBtn) {
      addBtn.focus();
    }
  };

  const data = useMemo(() => {
    if (methods.length > 0) {
      const activeOnly = getActiveData(methods);
      const inactiveOnly = getInactiveData(methods);

      // only active data >  disable checkbox and unchecks it
      if (activeOnly.length === methods.length) {
        // uncheck it and disable checkbox
        //function parameters ( check flag, disable flag )
        settingInactiveCheckBox(false, true);
        return fs.getMonitoringPlansMethodsTableRecords(methods);
      }

      // only inactive data > disables checkbox and checks it
      if (inactiveOnly.length === methods.length) {
        //check it and disable checkbox
        settingInactiveCheckBox(true, true);
        return fs.getMonitoringPlansMethodsTableRecords(methods);
      }
      // resets checkbox
      settingInactiveCheckBox(inactive[0], false);
      return fs.getMonitoringPlansMethodsTableRecords(
        !inactive[0] ? getActiveData(methods) : methods
      );
    }
    return [];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [methods, inactive]);

  useEffect(() => {
    if (matsTableHandler) {
      if (matsMethods.length < 1) {
        matsTableHandler(false);
      } else {
        matsTableHandler(true);
      }
    }
  }, [matsMethods.length, matsTableHandler]);

  const saveMethods = () => {
    const userInput = extractUserInput(payload, ".modalUserInput");

    mpApi
      .saveMonitoringMethods(userInput)
      .then((result) => {
        console.log(result, " was saved");
        // openModal(false);
        setShow(false);
      })
      .catch((error) => {
        console.log("error is", error);
        // openModal(false);
        setShow(false);
      });
    setUpdateTable(true);
  };

  const createMethods = () => {
    const userInput = extractUserInput(payload, ".modalUserInput");

    mpApi
      .createMethods(userInput)
      .then((result) => {
        console.log(result, " was created");
        // openModal(false);
        setShow(false);
      })
      .catch((error) => {
        console.log("error is", error);
        // openModal(false);
        setShow(false);
      });
    setUpdateTable(true);
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
        openHandler={openMethodModal}
        columnNames={columnNames}
        data={data}
        dataLoaded={dataLoaded}
        actionsBtn={"View"}
        checkout={checkout}
        user={user}
        addBtn={openMethodModal}
        addBtnName={"Create Method"}
        setViewBtn={setViewBtn}
        viewBtn={viewBtn}
        setAddBtn={setAddBtn}
      />
      {show ? (
        <Modal
          show={show}
          close={closeModalHandler}
          save={createNewMethod ? createMethods : saveMethods}
          showCancel={!(user && checkout)}
          showSave={user && checkout}
          title={createNewMethod ? "Create Method" : "Method"}
          exitBTN={createNewMethod ? "Create Method" : `Save and Close`}
          children={
            <div>
              <ModalDetails
                modalData={selectedMonitoringMethod}
                data={selectedModalData}
                cols={2}
                title={"Method"}
                viewOnly={!(user && checkout)}
              />
            </div>
          }
        />
      ) : null}
    </div>
  );
};

export default DataTableMethod;
