import React, { useEffect, useState } from "react";

import Modal from "../../Modal/Modal";
import ModalDetails from "../../ModalDetails/ModalDetails";
import { DataTableRender } from "../../DataTableRender/DataTableRender";
import { extractUserInput } from "../../../additional-functions/extract-user-input";
import { modalViewData } from "../../../additional-functions/create-modal-input-controls";
import * as assertSelector from "../../../utils/selectors/assert";

import { Preloader } from "../../Preloader/Preloader";
import { connect } from "react-redux";
import { loadDropdowns } from "../../../store/actions/dropdowns";
import { convertSectionToStoreName } from "../../../additional-functions/data-table-section-and-store-names";

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
  mdmData,
  loadDropdownsData,
  locationSelectValue,
  user,
  checkout,
  inactive,
  settingInactiveCheckBox,
  revertedState,
  setRevertedState,
  nonEditable,

  pagination,
  filter,
  controlInputs,
  controlDatePickerInputs,
  radioNames,
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
  const [dropdownsLoaded, setDropdownsLoaded] = useState(false);

  const [updateTable, setUpdateTable] = useState(false);
  // need to test this part to fully test the page
  useEffect(() => {
    if (
      updateTable ||
      dataPulled.length <= 0 ||
      locationSelectValue ||
      revertedState
    ) {
      setDataLoaded(false);
      getDataTableApi(dataTableName, locationSelectValue, selectedLocation);

      setUpdateTable(false);
      setRevertedState(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locationSelectValue, updateTable, revertedState, dataTableName]);

  // load dropdowns data (called once)
  useEffect(() => {
    if (
      mdmData.length === 0 &&
      mdmData.dropdowns[convertSectionToStoreName(dataTableName)]
    ) {
      loadDropdownsData(
        convertSectionToStoreName(dataTableName),
        dropdownArray
      );
      setDropdownsLoaded(true);
    } else {
      setDropdownsLoaded(true);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // get API for data
  // in  a timer because WAFS get takes a lil bit exxtra time to process, fixes update of datatable after editing data
  const getDataTableApi = (name, location, selectedLocationParameter) => {
    let timerFunc = setTimeout(() => {
      assertSelector
        .getDataTableApis(name, location, selectedLocationParameter)
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
      radioNames ? radioNames : null
    );

    assertSelector
      .saveDataSwitch(
        userInput,
        dataTableName,
        locationSelectValue,
        urlParameters
      )
      .then(() => {
        setShow(false);
        setUpdateTable(true);
      });
  };

  const createData = () => {
    const userInput = extractUserInput(
      payload,
      ".modalUserInput",
      radioNames ? radioNames : null
    );

    assertSelector
      .createDataSwitch(
        userInput,
        dataTableName,
        locationSelectValue,
        urlParameters
      )
      .then(() => {
        setShow(false);
        setUpdateTable(true);
      });
  };

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
        mdmData[convertSectionToStoreName(dataTableName)]
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
    } else {
      setDataSet([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    dataPulled,
    inactive,
    locationSelectValue,
    dataTableName,
    updateTable,
    revertedState,
  ]);

  return (
    <div className="methodTable">
      <div className={`usa-overlay ${show ? "is-visible" : ""}`} />

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
        nonEditable={nonEditable}
        addBtn={openModal}
        addBtnName={`Create ${dataTableName}`}
        setViewBtn={setViewBtn}
        viewBtn={viewBtn}
        setAddBtn={setAddBtn}
        show={show}
      />
      {show ? (
        <Modal
          show={show}
          close={closeModalHandler}
          save={createNewData ? createData : saveData}
          showCancel={!(user && checkout) || nonEditable}
          showSave={user && checkout && !nonEditable}
          nonEditable={nonEditable}
          title={createNewData ? `Create ${dataTableName}` : `${dataTableName}`}
          exitBTN={createNewData ? `Create ${dataTableName}` : `Save and Close`}
          children={
            dropdownsLoaded ? (
              <div>
                <ModalDetails
                  modalData={selectedRow}
                  data={selectedModalData}
                  cols={2}
                  title={`${dataTableName}`}
                  viewOnly={!(user && checkout) || nonEditable}
                  create={createNewData}
                />
              </div>
            ) : (
              <Preloader />
            )
          }
        />
      ) : null}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    mdmData: state.dropdowns,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadDropdownsData: (section, dropdownArray) => {
      dispatch(
        loadDropdowns(convertSectionToStoreName(section), dropdownArray)
      );
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(DataTableAssert);
export { mapDispatchToProps };
export { mapStateToProps };
