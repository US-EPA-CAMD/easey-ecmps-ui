import React, { useEffect, useMemo, useState } from "react";

// selectors that normalize api data to fit the columns in UI datatable
import * as loadSelector from "../../../utils/selectors/monitoringPlanLoads";
import * as wafSelector from "../../../utils/selectors/monitoringPlanRectangularDucts";
import * as spanSelector from "../../../utils/selectors/monitoringPlanSpans";
import * as formulaSelector from "../../../utils/selectors/monitoringPlanFormulas";
import * as defaultSelector from "../../../utils/selectors/monitoringPlanDefaults";
import * as unitFuelSelector from "../../../utils/selectors/monitoringPlanFuelData";
import * as unitControlSelector from "../../../utils/selectors/monitoringPlanUnitControls";
import * as unitCapacitySelector from "../../../utils/selectors/monitoringPlanUnitCapacity";

import Modal from "../../Modal/Modal";
import ModalDetails from "../../ModalDetails/ModalDetails";
import { DataTableRender } from "../../DataTableRender/DataTableRender";
import { extractUserInput } from "../../../additional-functions/extract-user-input";
import { modalViewData } from "../../../additional-functions/create-modal-input-controls";
import * as mpApi from "../../../utils/api/monitoringPlansApi";
import { useRetrieveDropdownApi } from "../../../additional-functions/retrieve-dropdown-api";
import * as assertSelector from "../../../utils/selectors/assert";

import {
  getActiveData,
  getInactiveData,
} from "../../../additional-functions/filter-data";

import {
  attachChangeEventListeners,
  removeChangeEventListeners,
  unsavedDataMessage,
} from "../../../additional-functions/prompt-to-save-unsaved-changes";

export const DataTableAssert = ({
  locationSelectValue,
  user,
  checkout,
  inactive,
  settingInactiveCheckBox,
  revertedState,
  setRevertedState,

  pagination,
  filter,
  controlInputs,
  controlDatePickerInputs,
  radioName,
  payload,
  urlParameters,
  columnNames,
  dropdownArray,
  dataTableName,
  selectedLocation,
  showModal = false,
}) => {
  const [dataPulled, setDataPulled] = useState([]);
  const [show, setShow] = useState(showModal);
  const [selectedRow, setSelectedRow] = useState(null);
  const [selectedModalData, setSelectedModalData] = useState(null);
  const [dataLoaded, setDataLoaded] = useState(false);
  const totalOptions = useRetrieveDropdownApi(
    dropdownArray[0],
    dropdownArray.length > 1 ? dropdownArray[1] : null
  );

  const [updateTable, setUpdateTable] = useState(false);
  useEffect(() => {
    if (
      updateTable ||
      dataPulled.length <= 0 ||
      locationSelectValue ||
      revertedState
    ) {
      console.log(
        "payload,",
        payload,
        urlParameters,
        columnNames,
        dropdownArray,
        dataTableName
      );
      setDataLoaded(false);
      getDataTableApi(dataTableName, locationSelectValue, selectedLocation);

      setUpdateTable(false);
      setRevertedState(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locationSelectValue, updateTable, revertedState, dataTableName]);

  // get API for data
  // in  a timer because WAFS get takes a lil bit exxtra time to process, fixes update of datatable after editing data
  const getDataTableApi = (name, location, selectedLocation) => {
    let timerFunc = setTimeout(() => {
      assertSelector
        .getDataTableApis(name, location, selectedLocation)
        .then((res) => {
          setDataPulled(res.data);
          setDataLoaded(true);
        });
    }, [500]);
    setUpdateTable(true);
    return () => clearTimeout(timerFunc);
  };

  const saveData = () => {
    const userInput = extractUserInput(
      payload,
      ".modalUserInput",
      radioName ? radioName : null
    );

    assertSelector.saveDataSwitch(
      userInput,
      dataTableName,
      locationSelectValue,
      urlParameters
    );

    setShow(false);
    setUpdateTable(true);
  };

  const createData = () => {
    const userInput = extractUserInput(
      payload,
      ".modalUserInput",
      radioName ? radioName : null
    );

    assertSelector.createDataSwitch(
      userInput,
      dataTableName,
      locationSelectValue,
      urlParameters
    );

    setShow(false);
    setUpdateTable(true);
  };

  // *** column names for dataset (will be passed to normalizeRowObjectFormat later to generate the row object
  // *** in the format expected by the modal / tabs plugins)

  // cant unit test properly
  const [createNewData, setCreateNewData] = useState(false);

  // Executed when "View" action is clicked
  const openModal = (row, bool, create) => {
    let selectedData = null;
    setCreateNewData(create);
    if (dataPulled.length > 0 && !create) {
      selectedData = dataPulled.filter(
        (element) => element.id === row[`col${Object.keys(row).length - 1}`]
      )[0];
      setSelectedRow(selectedData);
    }

    setSelectedModalData(
      modalViewData(
        selectedData,
        controlInputs,
        controlDatePickerInputs,
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

  const [dataSet, setDataSet] = useState([]);
  useEffect(() => {
    console.log("locationSelectValue", locationSelectValue, dataPulled);
    if (dataPulled.length > 0) {
      const activeOnly = getActiveData(dataPulled);
      const inactiveOnly = getInactiveData(dataPulled);

      // only active data >  disable checkbox and unchecks it
      if (activeOnly.length === dataPulled.length) {
        // uncheck it and disable checkbox
        //function parameters ( check flag, disable flag )
        settingInactiveCheckBox(false, true);
        setDataSet(
          assertSelector.getDataTableRecords(dataPulled, dataTableName)
        );
      }

      // only inactive data > disables checkbox and checks it
      if (inactiveOnly.length === dataPulled.length) {
        //check it and disable checkbox
        settingInactiveCheckBox(true, true);
        setDataSet(
          assertSelector.getDataTableRecords(dataPulled, dataTableName)
        );
      }
      // resets checkbox
      settingInactiveCheckBox(inactive[0], false);
      setDataSet(
        assertSelector.getDataTableRecords(
          !inactive[0] ? getActiveData(dataPulled) : dataPulled,
          dataTableName
        )
      );
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataPulled, inactive, locationSelectValue, dataTableName]);

  const testSave = () => {
    openModal(
      { col5: "MELISSARHO-CDF765BC7BF849EE9C23608B95540200" },
      false,
      true
    );
    saveData();
  };
  const testOpen = () => {
    openModal(
      { col5: "MELISSARHO-CDF765BC7BF849EE9C23608B95540200" },
      false,
      false
    );
  };
  const testCreate = () => {
    openModal(
      { col5: "MELISSARHO-CDF765BC7BF849EE9C23608B95540200" },
      false,
      true
    );
    createData();
    saveData();
    closeModalHandler();
  };

  return (
    <div className="methodTable">
      <div className={`usa-overlay ${show ? "is-visible" : ""}`} />
      <input
        tabIndex={-1}
        aria-hidden={true}
        role="button"
        type="hidden"
        id="testBtn"
        onClick={() => {
          testOpen();
          testSave();
          testCreate();
          closeModalHandler();
        }}
      />

      <DataTableRender
        openHandler={openModal}
        columnNames={columnNames}
        data={dataSet}
        dataLoaded={dataLoaded}
        pagination={pagination}
        filter={filter}
        actionsBtn={"View"}
        checkout={checkout}
        user={user}
        addBtn={openModal}
        addBtnName={`Create ${dataTableName}`}
        setViewBtn={setViewBtn}
        viewBtn={viewBtn}
        setAddBtn={setAddBtn}
      />
      {show ? (
        <Modal
          show={show}
          close={closeModalHandler}
          save={createNewData ? createData : saveData}
          showCancel={!(user && checkout)}
          showSave={user && checkout}
          title={createNewData ? `Create ${dataTableName}` : `${dataTableName}`}
          exitBTN={createNewData ? `Create ${dataTableName}` : `Save and Close`}
          children={
            <div>
              <ModalDetails
                modalData={selectedRow}
                data={selectedModalData}
                cols={2}
                title={`${dataTableName}`}
                viewOnly={!(user && checkout)}
              />
            </div>
          }
        />
      ) : null}
    </div>
  );
};

export default DataTableAssert;
