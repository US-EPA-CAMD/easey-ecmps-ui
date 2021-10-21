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
  attachChangeEventListeners,
  removeChangeEventListeners,
  unsavedDataMessage,
} from "../../../additional-functions/prompt-to-save-unsaved-changes";

export const DataTableFuelData = ({
  locationSelectValue,
  user,
  checkout,
  revertedState,
  setRevertedState,
  selectedLocation,
}) => {
  const [dataLoaded, setDataLoaded] = useState(false);
  const [fuelDataMethods, setFuelDataMethods] = useState([]);
  const totalOptions = useRetrieveDropdownApi(
    ["parameterCode", "monitoringMethodCode"],
    true
  );
  const [show, setShow] = useState(false);
  const [updateTable, setUpdateTable] = useState(false);
  useEffect(() => {
    if (
      updateTable ||
      fuelDataMethods.length <= 0 ||
      locationSelectValue ||
      revertedState
    ) {
      mpApi.getMonitoringPlansFuelDataRecords(selectedLocation).then((res) => {
        setFuelDataMethods(res.data);
        setDataLoaded(true);
      });
      setUpdateTable(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locationSelectValue, updateTable, revertedState]);
  const [selectedFuelDataMethods, setSelectedFuelDataMethods] = useState(null);
  // *** column names for dataset (will be passed to normalizeRowObjectFormat later to generate the row object
  // *** in the format expected by the modal / tabs plugins)
  const columnNames = [
    "Fuel Code",
    "Indicator Code",
    "Ozone Season Indicator",
    "Dem GCV",
    "Dem SO2",
    "Start Date",
    "End Date",
  ];

  const payload = {
    locationId: locationSelectValue,
    id: null,
    supplementalFuelDataMonitoringMethodCode: null,
    supplementalFuelDataParameterCode: null,
    beginDate: null,
    beginHour: 0,
    endDate: null,
    endHour: 0,
  };
  const data = useMemo(() => {
    if (fuelDataMethods.length > 0) {
      return fs.getMonitoringPlansFuelDataRecords(fuelDataMethods);
    }
    return [];

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fuelDataMethods]);
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
    const userInput = extractUserInput(payload, ".modalUserInput");
    mpApi
      .saveMonitoringPlansFuelData(userInput)
      .then((result) => {
        setShow(false);
      })
      .catch((error) => {
        setShow(false);
      });

    setUpdateTable(true);
  };
  const createFuelData = () => {
    const userInput = extractUserInput(payload, ".modalUserInput");
    mpApi
      .createFuelData(userInput)
      .then((result) => {
        setShow(false);
      })
      .catch((error) => {
        setShow(false);
      });
    setUpdateTable(true);
  };

  const [createNewFuelData, setCreateNewFuelData] = useState(false);
  const [selectedModalData, setSelectedModalData] = useState(null);

  const openFuelDataModal = (row, bool, create) => {
    let fuelData = null;
    setCreateNewFuelData(create);
    if (fuelDataMethods.length > 0 && !create) {
      fuelData = fuelDataMethods.filter(
        (element) => element.id === row.col5
      )[0];
      setSelectedFuelDataMethods(fuelData);
    }
    setSelectedModalData(
      modalViewData(
        fuelData,
        {
          supplementalFuelDataParameterCode: ["Parameter", "dropdown", ""],
          supplementalFuelDataMonitoringMethodCode: [
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
        openHandler={openFuelDataModal}
        actionsBtn={"View"}
        addBtn={openFuelDataModal}
        addBtnName={"Create FuelData"}
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
                modalData={selectedFuelDataMethods}
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
