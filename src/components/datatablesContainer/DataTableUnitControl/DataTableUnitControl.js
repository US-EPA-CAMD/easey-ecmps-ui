import React, { useEffect, useMemo, useState } from "react";
import { modalViewData } from "../../../additional-functions/create-modal-input-controls";
import { extractUserInput } from "../../../additional-functions/extract-user-input";
import * as fs from "../../../utils/selectors/monitoringPlanUnitControls";
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
  const [selectedUnitControl, setSelectedUnitControl] = useState(null);
  const [selectedModalData, setSelectedModalData] = useState(null);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [unitControls, setUnitControls] = useState([]);
  const totalOptions = useRetrieveDropdownApi([
    "controlEquipParamCode",
    "controlCode",
  ]);
  const [show, setShow] = useState(false);
  const [updateTable, setUpdateTable] = useState(false);
  useEffect(() => {
    if (
      updateTable ||
      unitControls.length <= 0 ||
      locationSelectValue ||
      revertedState
    ) {
      mpApi
        .getMonitoringPlansUnitControlRecords(selectedLocation)
        .then((res) => {
          setUnitControls(res.data);
          setDataLoaded(true);
          setUpdateTable(false);
          setRevertedState(false);
        });
      if (dataLoaded) {
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locationSelectValue, updateTable, revertedState]);
  // *** column names for dataset (will be passed to normalizeRowObjectFormat later to generate the row object
  // *** in the format expected by the modal / tabs plugins)
  const columnNames = [
    "Parameter Code",
    "Control Code",
    "Original Code",
    "Install Date",
    "Optimization Date",
    "Seasonal Controls Indicator",
    "Retire Date",
  ];

  const payload = {
    locationId: locationSelectValue,
    id: null,
    parameterCode: "string",
    controlCode: "string",
    originalCode: "",
    seasonalControlsIndicator: "",
    installDate: null,
    optimizationDate: null,
    retireDate: null,
  };

  const [createNewUnitControl, setCreateNewUnitControl] = useState(false);

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

  const openUnitControlModal = (row, bool, create) => {
    let unitControl = null;

    setCreateNewUnitControl(create);
    if (unitControls.length > 0 && !create) {
      unitControl = unitControls.filter(
        (element) => element.id === row[`col${Object.keys(row).length - 1}`]
      )[0];
      setSelectedUnitControl(unitControl);
    }
    setSelectedModalData(
      modalViewData(
        unitControl,
        {
          parameterCode: ["Parameter Code", "dropdown", ""],
          controlCode: ["Control Code", "dropdown", ""],
          originalCode: ["Original Code", "radio", ""],
          seasonalControlsIndicator: [
            "Seasonal Controls Indicator",
            "radio",
            "",
          ],
        },
        {
          installDate: ["Install Date", "date", ""],
          optimizationDate: ["Optimization Date", "date", ""],
          retireDate: ["Retire Date", "date", ""],
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
    if (unitControls.length > 0) {
      const activeOnly = getActiveData(unitControls);
      const inactiveOnly = getInactiveData(unitControls);

      // only active data >  disable checkbox and unchecks it
      if (activeOnly.length === unitControls.length) {
        // uncheck it and disable checkbox
        //function parameters ( check flag, disable flag )
        settingInactiveCheckBox(false, true);
        return fs.getMonitoringPlansUnitControlRecords(unitControls);
      }

      // only inactive data > disables checkbox and checks it
      if (inactiveOnly.length === unitControls.length) {
        //check it and disable checkbox
        settingInactiveCheckBox(true, true);
        return fs.getMonitoringPlansUnitControlRecords(unitControls);
      }
      // resets checkbox
      settingInactiveCheckBox(inactive[0], false);
      return fs.getMonitoringPlansUnitControlRecords(
        !inactive[0] ? getActiveData(unitControls) : unitControls
      );
    }
    return [];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [unitControls, inactive]);

  const saveUnitControl = () => {
    const radios = ["originalCode", "seasonalControlsIndicator"];

    const userInput = extractUserInput(payload, ".modalUserInput", radios);

    const urlParameters = {
      locId: selectedLocation.id,
      unitRecordId: selectedLocation.unitRecordId,
      unitControlId: payload.id,
    };

    mpApi
      .saveUnitControl(userInput, urlParameters)
      .then((result) => {
        setShow(false);
        setDataLoaded(false);
        setUpdateTable(true);
      })
      .catch((error) => {
        setShow(false);
      });
  };
  const createUnitControl = () => {
    const radios = ["originalCode", "seasonalControlsIndicator"];

    const userInput = extractUserInput(payload, ".modalUserInput", radios);

    const urlParameters = {
      locId: selectedLocation.id,
      unitRecordId: selectedLocation.unitRecordId,
      unitControlId: payload.id,
    };

    mpApi
      .createUnitControl(userInput, urlParameters)
      .then((result) => {
        setShow(false);
        setDataLoaded(false);
        setUpdateTable(true);
      })
      .catch((error) => {
        setShow(false);
      });
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
        openHandler={openUnitControlModal}
        columnNames={columnNames}
        data={data}
        dataLoaded={dataLoaded}
        actionsBtn={"View"}
        checkout={checkout}
        user={user}
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
          title={createNewUnitControl ? "Create Unit Control" : "Unit Control"}
          exitBTN={
            createNewUnitControl ? "Create Unit Control" : `Save and Close`
          }
          children={
            <div>
              <ModalDetails
                modalData={selectedUnitControl}
                data={selectedModalData}
                cols={2}
                title={"Unit Control"}
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
