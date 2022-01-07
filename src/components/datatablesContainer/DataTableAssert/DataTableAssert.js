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
  nonEditable = false,

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

  useEffect(() => {
    setDataLoaded(false);
  }, [dataTableName]);

  useEffect(() => {
    if (
      updateTable ||
      dataPulled.length <= 0 ||
      locationSelectValue ||
      revertedState
    ) {
      assertSelector
        .getDataTableApis(dataTableName, locationSelectValue, selectedLocation)
        .then((res) => {
          setDataPulled(res.data);
          setDataLoaded(true);
          setUpdateTable(true);
          setRevertedState(false);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    locationSelectValue,
    updateTable,
    revertedState,
    dataTableName,
    inactive,
  ]);

  useEffect(() => {
    // Load MDM data (for dropdowns) only if we don't have them already
    if (mdmData && mdmData.length === 0) {
      loadDropdownsData(dataTableName, dropdownArray);
    } else {
      setDropdownsLoaded(true);
    }
  }, [mdmData, loadDropdownsData, dataTableName, dropdownArray]);

  const [displayedRecords, setDisplayedRecords] = useState([]);
  useEffect(() => {
    if (dataPulled.length > 0) {
      const activeRecords = getActiveData(dataPulled);
      const inactiveRecords = getInactiveData(dataPulled);

      // Note: settingInactiveCheckbox -> function parameters ( check flag, disable flag )

      // if ONLY ACTIVE records return,
      if (activeRecords.length === dataPulled.length) {
        // then disable the inactive checkbox and set it as un-checked
        settingInactiveCheckBox(false, true);
        setDisplayedRecords(
          assertSelector.getDataTableRecords(dataPulled, dataTableName)
        );
      }

      // if ONLY INACTIVE records return
      else if (inactiveRecords.length === dataPulled.length) {
        // then disable the inactive checkbox and set it as checked
        settingInactiveCheckBox(true, true);
        setDisplayedRecords(
          assertSelector.getDataTableRecords(dataPulled, dataTableName)
        );
      }

      // if BOTH ACTIVE & INACTIVE records return
      else {
        // then enable the inactive checkbox (user can mark it as checked/un-checked manually)
        settingInactiveCheckBox(inactive[0], false);

        setDisplayedRecords(
          assertSelector.getDataTableRecords(
            !inactive[0] ? getActiveData(dataPulled) : dataPulled,
            dataTableName
          )
        );
      }
    }
    // if NO RECORDS are returned
    else {
      // disable the inactive checkbox and set it as un-checked
      settingInactiveCheckBox(false, true);
      setDisplayedRecords([]);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataPulled, inactive, updateTable]);

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
        mdmData
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

      <DataTableRender
        openHandler={openModal}
        columnNames={columnNames}
        data={displayedRecords}
        dataLoaded={dataLoaded && dropdownsLoaded}
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

const mapStateToProps = (state, ownProps) => {
  const { dataTableName } = ownProps;
  return {
    mdmData: state.dropdowns[convertSectionToStoreName(dataTableName)],
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadDropdownsData: async (section, dropdownArray) => {
      dispatch(
        loadDropdowns(convertSectionToStoreName(section), dropdownArray)
      );
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(DataTableAssert);
export { mapDispatchToProps };
export { mapStateToProps };
