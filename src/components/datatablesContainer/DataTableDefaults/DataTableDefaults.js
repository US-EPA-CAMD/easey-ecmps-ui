import React, { useEffect, useMemo, useState } from "react";
import * as fs from "../../../utils/selectors/monitoringPlanDefaults";
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

export const DataTableDefaults = ({
  locationSelectValue,
  user,
  checkout,
  inactive,
  settingInactiveCheckBox,
  revertedState,
  setRevertedState,
  showModal = false,
}) => {
  const [defaults, setDefaults] = useState([]);
  const [show, setShow] = useState(showModal);
  const [selectedDefault, setSelectedDefault] = useState(null);
  const [selectedModalData, setSelectedModalData] = useState(null);
  const [dataLoaded, setDataLoaded] = useState(false);

  const totalOptions = useRetrieveDropdownApi([
    "parameterCode",
    "defaultUnitsOfMeasureCode",
    "fuelCode",
    "operatingConditionCode",
    "defaultSourceCode",
    "defaultPurposeCode",
  ]);
  const [updateTable, setUpdateTable] = useState(false);
  useEffect(() => {
    if (
      updateTable ||
      defaults.length <= 0 ||
      locationSelectValue ||
      revertedState
    ) {
      mpApi.getMonitoringDefaults(locationSelectValue).then((res) => {
        console.log("res.data defaults", res.data);
        setDefaults(res.data);
        setDataLoaded(true);
      });
      setUpdateTable(false);
      setRevertedState(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locationSelectValue, updateTable, revertedState]);

  // *** column names for dataset (will be passed to normalizeRowObjectFormat later to generate the row object
  // *** in the format expected by the modal / tabs plugins)
  const columnNames = [
    "Parameter Code",
    "Units of Measure",
    "Purpose",
    "Fuel Code",
    "Operating Condition",
    "Source of Value",
    "Begin Date and Time",
    "End Date and Time",
  ];
  const payload = {
    id: null,
    locationId: locationSelectValue,
    parameterCode: "string",
    defaultValue: "0",
    defaultUnitsOfMeasureCode: "string",
    defaultPurposeCode: "string",
    fuelCode: null,
    operatingConditionCode: "string",
    defaultSourceCode: null,
    groupId: null,
    beginDate: null,
    beginHour: null,
    endDate: null,
    endHour: null,
  };
  // // cant unit test properly
  const [createNewDefault, setCreateNewDefault] = useState(false);

  const testing = () => {
    openDefaultModal(false, false, true);
    saveDefault();
    createDefault();
  };

  const testing2 = () => {
    openDefaultModal(
      { col7: "CAMD-BAC9D84563F24FE08057AF5643C8602C" },
      false,
      false
    );
  };

  const openDefaultModal = (row, bool, create) => {
    let defaultPick = null;
    setCreateNewDefault(create);
    if (defaults.length > 0 && !create) {
      defaultPick = defaults.filter(
        (element) => element.id === row[`col${Object.keys(row).length - 1}`]
      )[0];
      setSelectedDefault(defaultPick);
    }

    setSelectedModalData(
      modalViewData(
        defaultPick,
        {
          parameterCode: ["Parameter", "dropdown", ""],
          defaultValue: ["Default Value", "input", ""],
          defaultUnitsOfMeasureCode: ["Units of Measure", "dropdown", ""],
          defaultPurposeCode: ["Purpose", "dropdown", ""],
          fuelCode: ["Fuel Code", "dropdown", ""],
          operatingConditionCode: ["Operating Condition", "dropdown", ""],
          defaultSourceCode: ["Source of Value", "dropdown", ""],
          groupId: ["Group ID", "input", ""],
          // skip: ["", "skip", ""],
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
  };

  const data = useMemo(() => {
    if (defaults.length > 0) {
      console.log("DEFAULTS", defaults);
      const activeOnly = getActiveData(defaults);
      const inactiveOnly = getInactiveData(defaults);

      // only active data >  disable checkbox and unchecks it
      if (activeOnly.length === defaults.length) {
        // uncheck it and disable checkbox
        //function parameters ( check flag, disable flag )
        settingInactiveCheckBox(false, true);
        return fs.getMonitoringPlansDefaultsTableRecords(defaults);
      }

      // only inactive data > disables checkbox and checks it
      if (inactiveOnly.length === defaults.length) {
        //check it and disable checkbox
        settingInactiveCheckBox(true, true);
        return fs.getMonitoringPlansDefaultsTableRecords(defaults);
      }
      // resets checkbox
      settingInactiveCheckBox(inactive[0], false);
      return fs.getMonitoringPlansDefaultsTableRecords(
        !inactive[0] ? getActiveData(defaults) : defaults
      );
    }
    return [];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaults, inactive]);

  const saveDefault = () => {
    const userInput = extractUserInput(payload, ".modalUserInput");

    mpApi
      .saveMonitoringDefaults(userInput)
      .then((result) => {
        console.log(result, " was saved");
        setShow(false);
      })
      .catch((error) => {
        console.log("error is", error);
        setShow(false);
      });
    setUpdateTable(true);
  };

  const createDefault = () => {
    const userInput = extractUserInput(payload, ".modalUserInput");

    mpApi
      .createMonitoringDefaults(userInput)
      .then((result) => {
        console.log(result, " was created");
        setShow(false);
      })
      .catch((error) => {
        console.log("error is", error);
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

      <DataTableRender
        openHandler={openDefaultModal}
        columnNames={columnNames}
        data={data}
        dataLoaded={dataLoaded}
        pagination={false}
        filter={false}
        actionsBtn={"View"}
        checkout={checkout}
        user={user}
        addBtn={openDefaultModal}
        addBtnName={"Create Defaults"}
      />
      {show ? (
        <Modal
          show={show}
          close={closeModalHandler}
          save={createNewDefault ? createDefault : saveDefault}
          showCancel={!(user && checkout)}
          showSave={user && checkout}
          title={createNewDefault ? "Create Default" : "Default"}
          exitBTN={createNewDefault ? "Create Default" : `Save and Close`}
          children={
            <div>
              <ModalDetails
                modalData={selectedDefault}
                data={selectedModalData}
                cols={2}
                title={"Default"}
                viewOnly={!(user && checkout)}
              />
            </div>
          }
        />
      ) : null}
    </div>
  );
};

export default DataTableDefaults;
