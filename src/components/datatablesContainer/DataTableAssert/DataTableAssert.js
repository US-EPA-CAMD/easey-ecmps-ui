import React, { useEffect, useState } from "react";

import Modal from "../../Modal/Modal";
import ModalDetails from "../../ModalDetails/ModalDetails";
import { DataTableRender } from "../../DataTableRender/DataTableRender";
import { extractUserInput } from "../../../additional-functions/extract-user-input";
import { modalViewData } from "../../../additional-functions/create-modal-input-controls";
import * as assertSelector from "../../../utils/selectors/assert";

import { Preloader } from "@us-epa-camd/easey-design-system";
import { connect } from "react-redux";
import {
  loadDropdowns,
  updateDropdowns,
} from "../../../store/actions/dropdowns";
import { convertSectionToStoreName } from "../../../additional-functions/data-table-section-and-store-names";

import { addAriaLabelToDatatable } from "../../../additional-functions/ensure-508";

import {
  getActiveData,
  getInactiveData,
} from "../../../additional-functions/filter-data";

import {
  attachChangeEventListeners,
  removeChangeEventListeners,
  unsavedDataMessage,
} from "../../../additional-functions/prompt-to-save-unsaved-changes";
import { values } from "lodash";

export const DataTableAssert = ({
  mdmData,
  loadDropdownsData,
  updateDropdowns,
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
  setUpdateRelatedTables,
  updateRelatedTables,
}) => {
  const [dataPulled, setDataPulled] = useState([]);
  const [show, setShow] = useState(showModal);
  const [selectedRow, setSelectedRow] = useState(null);
  const [selectedModalData, setSelectedModalData] = useState(null);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [dropdownsLoaded, setDropdownsLoaded] = useState(false);

  const [updateTable, setUpdateTable] = useState(false);
  const [complimentaryData, setComplimentaryData] = useState([]);

  // Unit Information variables
  const uCon = "Unit Control";
  const uFuel = "Unit Fuel";
  const uCap = "Unit Capacity";
  const unitInfoDict = {
    "Unit Control": [uFuel, uCap],
    "Unit Fuel": [uCon, uCap],
    "Unit Capacity": [uFuel, uCon],
  };
  const unitInfoTables = [uCon, uFuel, uCap];

  // Location Attributes & Relationship Data variables
  const lAttr = "Location Attribute";
  const rDat = "Relationship Data";
  const locAttAndRelDataDict = {
    "Location Attribute": rDat,
    "Relationship Data": lAttr,
  };
  const locAttAndRelDataTables = [lAttr, rDat];

  useEffect(() => {
    setDataLoaded(false);
  }, [dataTableName]);

  useEffect(() => {
    if (
      updateTable ||
      dataPulled.length <= 0 ||
      locationSelectValue ||
      revertedState ||
      updateRelatedTables
    ) {
      assertSelector
        .getDataTableApis(dataTableName, locationSelectValue, selectedLocation)
        .then((res) => {
          // Location Attributes & Relationship Data tables
          if (locAttAndRelDataTables.includes(dataTableName)) {
            assertSelector
              .getDataTableApis(
                locAttAndRelDataDict[dataTableName],
                locationSelectValue,
                selectedLocation
              )
              .then((locAtt) => {
                setComplimentaryData(locAtt.data);
                finishedLoadingData(res.data);
              });
          }

          // Unit Information tables
          else if (unitInfoTables.includes(dataTableName)) {
            assertSelector
              .getDataTableApis(
                unitInfoDict[dataTableName][0],
                locationSelectValue,
                selectedLocation
              )
              .then((sec) => {
                const secondTableData = sec.data;
                assertSelector
                  .getDataTableApis(
                    unitInfoDict[dataTableName][1],
                    locationSelectValue,
                    selectedLocation
                  )
                  .then((third) => {
                    const thirdTableData = third.data;
                    setComplimentaryData(
                      secondTableData.concat(thirdTableData)
                    );
                    finishedLoadingData(res.data);
                  });
              });
          } else {
            finishedLoadingData(res.data);
          }
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    locationSelectValue,
    updateTable,
    revertedState,
    dataTableName,
    updateRelatedTables,
  ]);

  const finishedLoadingData = (loadedData) => {
    setDataPulled(loadedData);
    setDataLoaded(true);
    setUpdateTable(false);
    setRevertedState(false);
    setUpdateRelatedTables(false);
    addAriaLabelToDatatable();
  };

  useEffect(() => {
    // Load MDM data (for dropdowns) only if we don't have them already
    if (mdmData && mdmData.length === 0) {
      loadDropdownsData(dataTableName, dropdownArray);
    } else {
      setDropdownsLoaded(true);
    }
  }, [mdmData, loadDropdownsData, dataTableName, dropdownArray]);

  const [displayedRecords, setDisplayedRecords] = useState([]);

  const inactiveCheckboxFiltering = (records, multiTable) => {
    if (records.length > 0) {
      const activeRecords = getActiveData(records);
      const inactiveRecords = getInactiveData(records);
      const display = multiTable ? dataPulled : records;

      // Note: settingInactiveCheckbox -> function parameters ( check flag, disable flag )

      // if ONLY ACTIVE records return,
      if (activeRecords.length === records.length) {
        // then disable the inactive checkbox and set it as un-checked
        settingInactiveCheckBox(false, true);
        setDisplayedRecords(
          assertSelector.getDataTableRecords(display, dataTableName)
        );
      }

      // if ONLY INACTIVE records return
      else if (inactiveRecords.length === records.length) {
        // then disable the inactive checkbox and set it as checked
        settingInactiveCheckBox(true, true);
        setDisplayedRecords(
          assertSelector.getDataTableRecords(display, dataTableName)
        );
      }

      // if BOTH ACTIVE & INACTIVE records return
      else {
        // then enable the inactive checkbox (user can mark it as checked/un-checked manually)
        settingInactiveCheckBox(inactive[0], false);

        setDisplayedRecords(
          assertSelector.getDataTableRecords(
            !inactive[0] ? getActiveData(display) : display,
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
  };

  // Setting "Show Inactive" checkbox disabled & checked statuses based on records
  useEffect(() => {
    if (
      locAttAndRelDataTables.includes(dataTableName) ||
      unitInfoTables.includes(dataTableName)
    ) {
      inactiveCheckboxFiltering(dataPulled.concat(complimentaryData), true);
    } else {
      inactiveCheckboxFiltering(dataPulled, false);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataLoaded, dataPulled, inactive, updateTable]);

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
        setDataLoaded(false);
        setUpdateTable(true);
        setUpdateRelatedTables(true);
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
        setDataLoaded(false);
        setUpdateTable(true);
        setUpdateRelatedTables(true);
      });
  };
  const [mainDropdownChange, setMainDropdownChange] = useState("");

  const [rerenderDropdown, setRerenderDropdown] = useState(false);
  const [createNewData, setCreateNewData] = useState(false);
  const [prefilteredMdmData, setPrefilteredMdmData] = useState(false);
  useEffect(() => {
    if (prefilteredMdmData) {
      const result = prefilteredMdmData.filter(
        (mdmData) => mdmData.parameterCode === mainDropdownChange
      );

      let newDropdownValuesObject = {};
      if (result.length > 0 && !rerenderDropdown) {
        for (const modalDetailData of selectedModalData) {
          if (modalDetailData[4] === "dropdown") {
            const selectedCodes = result[0];
            const selectedCodeName = modalDetailData[0];
            const prefilteredDataName =
              dropdownArray[0][dropdownArray[0].length - 1];
            const filteredOutSubDropdownOptions = mdmData[
              modalDetailData[0]
            ].filter((option) =>
              selectedCodes[modalDetailData[0]].includes(option.code)
            );
            filteredOutSubDropdownOptions.unshift({
              code: "",
              name: "-- Select a value --",
            });
            modalDetailData[6] = filteredOutSubDropdownOptions;
          }
        }
      }
    }
  }, [mainDropdownChange, selectedModalData]);

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
    let mainDropdownName = "";
    for (const controlProperty in controlInputs) {
      if (controlInputs[controlProperty][1] === "mainDropdown") {
        mainDropdownName = controlProperty;
      }
    }
    const prefilteredDataName = dropdownArray[0][dropdownArray[0].length - 1];
    const mainDropdownResult = mdmData[mainDropdownName].filter((o) =>
    mdmData[prefilteredDataName].some(
        (element, index, arr) => o.code === element[mainDropdownName]
      )
    );
    if (!mainDropdownResult.includes({ code: "", name: "-- Select a value --" })) {
      mainDropdownResult.unshift({ code: "", name: "-- Select a value --" });
    }
    setPrefilteredMdmData(mdmData[prefilteredDataName]);

    console.log('result',mainDropdownResult)
    // changes paramtercode in redux mdm 
    let newMdmData = JSON.parse(JSON.stringify(mdmData));
    newMdmData[mainDropdownName] = mainDropdownResult;

    setSelectedModalData(
      modalViewData(
        selectedData,
        controlInputs,
        controlDatePickerInputs,
        create,
        mdmData,
        mdmData[prefilteredDataName],
        mainDropdownResult
      )
    );
    setShow(true);
    console.log("  mdmData[prefilteredDataName]",   mdmData[prefilteredDataName]);
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
        show={show}
        ariaLabel={`${dataTableName}s`}
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
                  prefilteredMdmData={prefilteredMdmData}
                  cols={2}
                  title={`${dataTableName}`}
                  viewOnly={!(user && checkout) || nonEditable}
                  create={createNewData}
                  setMainDropdownChange={setMainDropdownChange}
                  mainDropdownChange={mainDropdownChange}
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
    loadDropdownsData: async (section, dropdownArray) =>
      dispatch(
        loadDropdowns(convertSectionToStoreName(section), dropdownArray)
      ),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(DataTableAssert);
export { mapDispatchToProps };
export { mapStateToProps };
