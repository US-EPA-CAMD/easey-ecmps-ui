import React, { useEffect, useMemo, useState } from "react";
import { modalViewData } from "../../../additional-functions/create-modal-input-controls";
import { extractUserInput } from "../../../additional-functions/extract-user-input";
import * as fs from "../../../utils/selectors/monitoringPlanFuelData";
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

export const DataTableFuelData = ({
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
  const [fuelData, setFuelData] = useState([]);
  const totalOptions = useRetrieveDropdownApi(
    ["fuelType", "indicatorCode", "demGCV", "demSO2"],
    true
  );
  const [show, setShow] = useState(false);
  const [updateTable, setUpdateTable] = useState(false);
  useEffect(() => {
    if (
      updateTable ||
      fuelData.length <= 0 ||
      locationSelectValue ||
      revertedState
    ) {
      mpApi.getMonitoringPlansFuelDataRecords(selectedLocation).then((res) => {
        setFuelData(res.data);
        setDataLoaded(true);
        setUpdateTable(false);
        setRevertedState(false);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locationSelectValue, updateTable, revertedState]);
  const [selectedFuelData, setSelectedFuelData] = useState(null);
  // *** column names for dataset (will be passed to normalizeRowObjectFormat later to generate the row object
  // *** in the format expected by the modal / tabs plugins)
  const columnNames = [
    "Fuel Type",
    "Indicator Code",
    "Ozone Season Indicator",
    "Dem GCV",
    "Dem SO2",
    "Start Date",
    "End Date",
  ];

  const payload = {
    locationId: selectedLocation["id"],
    unitRecordId: selectedLocation["unitRecordId"],
    id: null,
    fuelCode: null,
    indicatorCode: null,
    ozoneSeasonIndicator: 0,
    demGCV: null,
    demSO2: null,
    beginDate: null,
    endDate: null
  };
  const data = useMemo(() => {
    if (fuelData.length > 0) {
      const activeOnly = getActiveData(fuelData);
      const inactiveOnly = getInactiveData(fuelData);

      // only active data >  disable checkbox and unchecks it
      if (activeOnly.length === fuelData.length) {
        // uncheck it and disable checkbox
        //function parameters ( check flag, disable flag )
        settingInactiveCheckBox(false, true);
        return fs.getMonitoringPlansFuelDataRecords(fuelData);
      }

      // only inactive data > disables checkbox and checks it
      if (inactiveOnly.length === fuelData.length) {
        //check it and disable checkbox
        settingInactiveCheckBox(true, true);
        return fs.getMonitoringPlansFuelDataRecords(fuelData);

      }
      // resets checkbox
      settingInactiveCheckBox(inactive[0], false);
      return fs.getMonitoringPlansFuelDataRecords(
        !inactive[0] ? getActiveData(fuelData) : fuelData
      );
    }
    return [];

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fuelData, inactive]);
  const testing = () => {
    openFuelDataModal(false, false, true);
    saveFuelData();
  };

  const testing2 = () => {
    openFuelDataModal(
      { col5: "MELISSARHO-CDF765BC7BF849EE9C23608B95540200" },
      false,
      false
    );
  };
  const testing3 = () => {
    openFuelDataModal(false, false, true);
    createFuelData();
  };

  const saveFuelData = () => {
    var radioName = ["ozoneSeasonIndicator"];
    const userInput = extractUserInput(payload, ".modalUserInput", radioName);

    mpApi
      .saveMonitoringPlansFuelData(userInput)
      .then((result) => {
        setShow(false);
        setDataLoaded(false);
        setUpdateTable(true);
      })
      .catch((error) => {
        setShow(false);
      });
  };

  const createFuelData = () => {
    var radioName = "ozoneSeasonIndicator";
    const userInput = extractUserInput(payload, ".modalUserInput", radioName);
    mpApi
      .createFuelData(userInput)
      .then((result) => {
        setShow(false);
        setDataLoaded(false);
        setUpdateTable(true);
      })
      .catch((error) => {
        setShow(false);
      });
  };

  const [createNewFuelData, setCreateNewFuelData] = useState(false);
  const [selectedModalData, setSelectedModalData] = useState(null);

  const openFuelDataModal = (row, bool, create) => {
    let unitFuelData = null;
    setCreateNewFuelData(create);
    if (fuelData.length > 0 && !create) {
      unitFuelData = fuelData.filter(
        (element) => element.id === row[`col${Object.keys(row).length - 1}`]
      )[0];
      setSelectedFuelData(unitFuelData);
    }
    setSelectedModalData(
      modalViewData(
        unitFuelData,
        {
          fuelCode: ["Fuel Type", "dropdown", ""],
          indicatorCode: ["Indicator Code", "dropdown", ""],
          ozoneSeasonIndicator: ["Ozone Season Indicator", "radio", ""],
          demGCV: ["Dem GCV", "dropdown", ""],
          demSO2: ["Dem SO2", "dropdown", ""],
        },
        {
          beginDate: ["Start Date", "date", ""],
          endDate: ["End Date", "date", ""],
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
        openHandler={openFuelDataModal}
        actionsBtn={"View"}
        addBtn={openFuelDataModal}
        addBtnName={"Create Fuel Data"}
        setViewBtn={setViewBtn}
        viewBtn={viewBtn}
        setAddBtn={setAddBtn}
      />

      {show ? (
        <Modal
          show={show}
          close={closeModalHandler}
          save={createNewFuelData ? createFuelData : saveFuelData}
          showCancel={!(user && checkout)}
          showSave={user && checkout}
          title={
            createNewFuelData
              ? "Create FuelData"
              : "Component: Monitoring FuelData Methods"
          }
          exitBTN={createNewFuelData ? "Create Fuel Data" : `Save and Close`}
          children={
            <div>
              <ModalDetails
                modalData={selectedFuelData}
                data={selectedModalData}
                cols={2}
                title={"Component: Monitoring FuelData Methods"}
                viewOnly={!(user && checkout)}
              />
            </div>
          }
        />
      ) : null}
    </div>
  );
};

export default DataTableFuelData;
