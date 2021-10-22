import React, { useEffect, useMemo, useState } from "react";
import { modalViewData } from "../../../additional-functions/create-modal-input-controls";
import { extractUserInput } from "../../../additional-functions/extract-user-input";
import * as fs from "../../../utils/selectors/monitoringPlanMethods";
import { DataTableRender } from "../../DataTableRender/DataTableRender";

import Modal from "../../Modal/Modal";
import ModalDetails from "../../ModalDetails/ModalDetails";
import { useRetrieveDropdownApi } from "../../../additional-functions/retrieve-dropdown-api";
import * as mpApi from "../../../utils/api/monitoringPlansApi";

import {
  getActiveData,
  getInactiveData,
} from "../../../additional-functions/filter-data";

import {
  attachChangeEventListeners,
  removeChangeEventListeners,
  unsavedDataMessage,
} from "../../../additional-functions/prompt-to-save-unsaved-changes";

export const DataTableUnitControl = ({
  locationSelectValue,
  user,
  checkout,
  inactive,
  settingInactiveCheckBox,
  revertedState,
  setRevertedState,
  selectedLocation,
}) => {
  const [dataLoaded, setDataLoaded] = useState(false);
  const [unitControlMethods, setUnitControlMethods] = useState([]);
  const totalOptions = useRetrieveDropdownApi(
    ["parameterCode", "monitoringMethodCode"],
    true
  );
  const [show, setShow] = useState(false);
  const [updateTable, setUpdateTable] = useState(false);
  useEffect(() => {
    if (
      updateTable ||
      unitControlMethods.length <= 0 ||
      locationSelectValue ||
      revertedState
    ) {
      mpApi
        .getMonitoringPlansUnitControlRecords(selectedLocation)
        .then((res) => {
          setUnitControlMethods(res.data);
          setDataLoaded(true);
        });
      setUpdateTable(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locationSelectValue, updateTable, revertedState]);
  const [selectedUnitControlMethods, setSelectedUnitControlMethods] = useState(
    null
  );
  // *** column names for dataset (will be passed to normalizeRowObjectFormat later to generate the row object
  // *** in the format expected by the modal / tabs plugins)
  const columnNames = [
    "Parameter Code",
    "Control Code",
    "Original Code",
    "Optimization Date",
    "Install Date",
    "Seasonal Controls Indicator",
    "Retire Date",
  ];

  const payload = {
    locationId: locationSelectValue,
    id: null,
    supplementalUnitControlMonitoringMethodCode: null,
    supplementalUnitControlParameterCode: null,
    beginDate: null,
    beginHour: 0,
    endDate: null,
    endHour: 0,
  };
  const data = useMemo(() => {
    if (unitControlMethods.length > 0) {
      const activeOnly = getActiveData(unitControlMethods);
      const inactiveOnly = getInactiveData(unitControlMethods);

      // only active data >  disable checkbox and unchecks it
      if (activeOnly.length === unitControlMethods.length) {
        // uncheck it and disable checkbox
        //function parameters ( check flag, disable flag )
        settingInactiveCheckBox(false, true);
        return fs.getMonitoringPlansUnitControlRecords(unitControlMethods);
      }

      // only inactive data > disables checkbox and checks it
      if (inactiveOnly.length === unitControlMethods.length) {
        //check it and disable checkbox
        settingInactiveCheckBox(true, true);
        return fs.getMonitoringPlansUnitControlRecords(unitControlMethods);
      }
      // resets checkbox
      settingInactiveCheckBox(inactive[0], false);
      return fs.getMonitoringPlansUnitControlRecords(
        !inactive[0] ? getActiveData(unitControlMethods) : unitControlMethods
      );
    }
    return [];

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [unitControlMethods, inactive]);
  const testing = () => {
    openUnitControlModal(false, false, true);
    saveUnitControl();
  };

  const testing2 = () => {
    openUnitControlModal(
      { col5: "MELISSARHO-CDF765BC7BF849EE9C23608B95540200" },
      false,
      false
    );
  };
  const testing3 = () => {
    openUnitControlModal(false, false, true);
    createUnitControl();
  };

  const saveUnitControl = () => {
    const userInput = extractUserInput(payload, ".modalUserInput");
    mpApi
      .saveMonitoringPlansUnitControl(userInput)
      .then((result) => {
        setShow(false);
      })
      .catch((error) => {
        setShow(false);
      });

    setUpdateTable(true);
  };
  const createUnitControl = () => {
    const userInput = extractUserInput(payload, ".modalUserInput");
    mpApi
      .createUnitControl(userInput)
      .then((result) => {
        setShow(false);
      })
      .catch((error) => {
        setShow(false);
      });
    setUpdateTable(true);
  };

  const [createNewUnitControl, setCreateNewUnitControl] = useState(false);
  const [selectedModalData, setSelectedModalData] = useState(null);

  const openUnitControlModal = (row, bool, create) => {
    let unitControl = null;
    setCreateNewUnitControl(create);
    if (unitControlMethods.length > 0 && !create) {
      unitControl = unitControlMethods.filter(
        (element) => element.id === row.col5
      )[0];
      setSelectedUnitControlMethods(unitControl);
    }
    setSelectedModalData(
      modalViewData(
        unitControl,
        {
          supplementalUnitControlParameterCode: ["Parameter", "dropdown", ""],
          supplementalUnitControlMonitoringMethodCode: [
            "Methodology",
            "dropdown",
            "",
          ],
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
        columnNames={columnNames}
        data={data}
        dataLoaded={dataLoaded}
        // actionsBtn={"View"}
        checkout={checkout}
        user={user}
        openHandler={openUnitControlModal}
        actionsBtn={"View"}
        addBtn={openUnitControlModal}
        addBtnName={"Create Unit Control"}
        setViewBtn={setViewBtn}
        viewBtn={viewBtn}
        setAddBtn={setAddBtn}
      />

      {show ? (
        <Modal
          show={show}
          close={closeModalHandler}
          save={createNewUnitControl ? createUnitControl : saveUnitControl}
          showCancel={!(user && checkout)}
          showSave={user && checkout}
          title={
            createNewUnitControl
              ? "Create UnitControl"
              : "Component: Monitoring Unit Control Methods"
          }
          exitBTN={createNewUnitControl ? "Create Fuel Data" : `Save and Close`}
          children={
            <div>
              <ModalDetails
                modalData={selectedUnitControlMethods}
                data={selectedModalData}
                cols={2}
                title={"Component: Monitoring Unit Control Methods"}
                viewOnly={!(user && checkout)}
              />
            </div>
          }
        />
      ) : null}
    </div>
  );
};

export default DataTableUnitControl;
