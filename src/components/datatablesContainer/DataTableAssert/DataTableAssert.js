import React, { useEffect, useState } from "react";

import Modal from "../../Modal/Modal";
import ModalDetails from "../../ModalDetails/ModalDetails";
import { DataTableRender } from "../../DataTableRender/DataTableRender";
import {
  extractUserInput,
  validateUserInput,
} from "../../../additional-functions/extract-user-input";
import { modalViewData } from "../../../additional-functions/create-modal-input-controls";
import * as assertSelector from "../../../utils/selectors/assert";

import { Preloader } from "@us-epa-camd/easey-design-system";
import { connect } from "react-redux";
import { loadDropdowns } from "../../../store/actions/dropdowns";
import { convertSectionToStoreName } from "../../../additional-functions/data-table-section-and-store-names";

import {
  addAriaLabelToDatatable,
  changeGridCellAttributeValue,
  ensure508,
} from "../../../additional-functions/ensure-508";
import {
  assignFocusEventListeners,
  cleanupFocusEventListeners,
} from "../../../additional-functions/manage-focus";
import {
  getActiveData,
  getInactiveData,
} from "../../../additional-functions/filter-data";

import {
  attachChangeEventListeners,
  removeChangeEventListeners,
  unsavedDataMessage,
} from "../../../additional-functions/prompt-to-save-unsaved-changes";
import { returnsFocusMpDatatableCreateBTN } from '../../../additional-functions/ensure-508'

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
  pagination,
  filter,
  controlInputs,
  nonEditable = false,
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
  currentTabIndex,
  tabs,
}) => {
  const [dataPulled, setDataPulled] = useState([]);
  const [show, setShow] = useState(showModal);
  const [selectedRow, setSelectedRow] = useState(null);
  const [selectedModalData, setSelectedModalData] = useState(null);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [dropdownsLoaded, setDropdownsLoaded] = useState(false);

  const [updateTable, setUpdateTable] = useState(false);
  const [complimentaryData, setComplimentaryData] = useState([]);
  const [errorMsgs, setErrorMsgs] = useState([]);
  const dropdownArrayIsEmpty = dropdownArray[0].length === 0;

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
  const selectText = "-- Select a value --";

  useEffect(() => {
    setDataLoaded(false);
  }, [dataTableName]);

  const [returnedFocusToLast, setReturnedFocusToLast] = useState(false);

  // *** Assign initial event listeners after loading data/dropdowns
  useEffect(() => {
    if (dataLoaded && dropdownsLoaded) {
      assignFocusEventListeners();
      ensure508();
    }
  }, [dataLoaded, dropdownsLoaded]);
  // *** Reassign handlers when inactive checkbox is toggled


  // *** Reassign handlers after pop-up modal is closed
  useEffect(() => {
    if (!returnedFocusToLast) {
      setReturnedFocusToLast(true);
    } else {
      assignFocusEventListeners();
    }
    
    return () => {
      setReturnedFocusToLast(true);
    };
  }, [returnedFocusToLast]);

  // *** Clean up focus event listeners
  useEffect(() => {
    return () => {
      cleanupFocusEventListeners();
    };
  }, []);
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
    ensure508();
  };

  useEffect(() => {
    // Load MDM data (for dropdowns) only if dropdown is not empty and we don't have them already
    if (!dropdownArrayIsEmpty && mdmData && Object.keys(mdmData).length === 0) {
      loadDropdownsData(dataTableName, dropdownArray);
    } else {
      setDropdownsLoaded(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mdmData, loadDropdownsData, dataTableName, dropdownArray]);

  const [displayedRecords, setDisplayedRecords] = useState([]);
  useEffect(() => {
    assignFocusEventListeners();
  }, [displayedRecords]);
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
        settingInactiveCheckBox(tabs[currentTabIndex].inactive[0], false);

        setDisplayedRecords(
          assertSelector.getDataTableRecords(
            !tabs[currentTabIndex].inactive[0]
              ? getActiveData(display)
              : display,
            dataTableName
          )
        );
      }
    }
    // if NO RECORDS are returned
    else {
      // disable the inactive checkbox and set it as un-checked\
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
  }, [dataLoaded, dataPulled, tabs[currentTabIndex].inactive[0], updateTable]);

  const saveData = async () => {
    const userInput = extractUserInput(
      payload,
      ".modalUserInput",
      radioNames ? radioNames : null
    );
    const validationErrors = validateUserInput(userInput, dataTableName);
    if (validationErrors.length > 0) {
      setErrorMsgs(validationErrors);
      return;
    }
    try {
      const resp = await assertSelector.saveDataSwitch(
        userInput,
        dataTableName,
        locationSelectValue,
        urlParameters
      );
      if (resp.status === 200) {
        setShow(false);
        setDataLoaded(false);
        setUpdateTable(true);
        setUpdateRelatedTables(true);
      } else {
        const errorResp = Array.isArray(resp) ? resp : [resp];
        setErrorMsgs(errorResp);
      }
    } catch (error) {
      setErrorMsgs([JSON.stringify(error)]);
    }
  };

  const createData = async () => {
    const userInput = extractUserInput(
      payload,
      ".modalUserInput",
      radioNames ? radioNames : null
    );
    const validationErrors = validateUserInput(userInput, dataTableName);
    if (validationErrors.length > 0) {
      setErrorMsgs(validationErrors);
      return;
    }

    try {
      const resp = await assertSelector.createDataSwitch(
        userInput,
        dataTableName,
        locationSelectValue,
        urlParameters
      );
      if (resp.status === 201) {
        setShow(false);
        setDataLoaded(false);
        setUpdateTable(true);
        setUpdateRelatedTables(true);
      } else {
        const errorResp = Array.isArray(resp) ? resp : [resp];
        setErrorMsgs(errorResp);
      }
    } catch (error) {
      setErrorMsgs([JSON.stringify(error)]);
    }
  };

  const [mainDropdownChange, setMainDropdownChange] = useState("");
  const [createNewData, setCreateNewData] = useState(false);
  const [prefilteredMdmData, setPrefilteredMdmData] = useState(false);

  useEffect(() => {debugger;
    const prefilteredDataName = dropdownArray[0][0];
    if (prefilteredMdmData) {
      const result = prefilteredMdmData.filter(
        (data) => data[prefilteredDataName] === mainDropdownChange
      );
      if (result.length > 0) {
        for (const modalDetailData of selectedModalData) {
          if (modalDetailData[4] === "dropdown") {
            const selectedCodes = result[0];
            const filteredOutSubDropdownOptions = mdmData[
              modalDetailData[0]
            ].filter((option) =>
              selectedCodes[modalDetailData[0]].includes(option.code)
            );
            filteredOutSubDropdownOptions.unshift({
              code: "",
              name: selectText,
            });
            modalDetailData[6] = filteredOutSubDropdownOptions;
          }

          // Modal focus resets to close button on setState
          if (modalDetailData[4] === "mainDropdown") {
            // Overrides the firstComponentFocusableElement.focus() in focus-trap
            setTimeout(() => {
              document.getElementById(modalDetailData[1]).focus();
            });
            // Overrides the document.querySelector("#closeModalBtn").focus() in Modal
            setTimeout(() => {
              document.getElementById(modalDetailData[1]).focus();
            }, 1000);
          }
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mainDropdownChange, selectedModalData]);

  // Executed when "View" action is clicked
  const openModal = (row, bool, create) => {debugger;
    let selectedData = null;
    setCreateNewData(create);
    if (dataPulled.length > 0 && !create) {
      selectedData = dataPulled.filter(
        (element) => element.id === row[`col${Object.keys(row).length - 1}`]
      )[0];
      setSelectedRow(selectedData);
    }
    let mainDropdownName = "";
    let hasMainDropdown = false;
    for (const controlProperty in controlInputs) {
      if (controlInputs[controlProperty][1] === "mainDropdown") {
        mainDropdownName = controlProperty;
        hasMainDropdown = true;
        break;
      }
    }
    let prefilteredDataName;
    if (!dropdownArrayIsEmpty) {
      prefilteredDataName = dropdownArray[0][dropdownArray[0].length - 1];
    }
    let mainDropdownResult;
    if (mainDropdownName !== "" && hasMainDropdown === true) {
      mainDropdownResult = mdmData[mainDropdownName].filter((o) =>
        mdmData[prefilteredDataName].some(
          (element, index, arr) => o.code === element[mainDropdownName]
        )
      );
      if (!mainDropdownResult.includes({ code: "", name: selectText })) {
        mainDropdownResult.unshift({ code: "", name: selectText });
      }
    } else {
      mainDropdownResult = [];
    }

    if (!dropdownArrayIsEmpty) {
      setPrefilteredMdmData(mdmData[prefilteredDataName]);
    }

    if (dataTableName === "Unit Capacity") {
      controlInputs.commercialOperationDate = [
        "Commercial Operation Date",
        "date",
        "",
        "locked",
      ];
      controlInputs.operationDate = ["Operation Date", "date", "", "locked"];
      controlInputs.boilerTurbineType = [
        "Boiler/Turbine Type",
        "input",
        "",
        "locked",
      ];
      controlInputs.boilerTurbineBeginDate = [
        "Boiler/Turbine Begin Date",
        "date",
        "",
        "locked",
      ];
      controlInputs.boilerTurbineEndDate = [
        "Boiler/Turbine End Date",
        "date",
        "",
        "locked",
      ];
    }

    const prefilteredTotalName = dropdownArray[0][dropdownArray[0].length - 1];
    if(hasMainDropdown && selectedData){
      setMainDropdownChange(selectedData[mainDropdownName]);
    }
    setSelectedModalData(
      modalViewData(
        selectedData,
        controlInputs,
        controlDatePickerInputs,
        create,
        mdmData,
        prefilteredDataName ? mdmData[prefilteredDataName] : "",
        mainDropdownName,
        mainDropdownResult,
        hasMainDropdown,
        prefilteredTotalName
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
        executeOnClose();
      }
    } else {
      executeOnClose();
    }
  };
  const executeOnClose = () => {
    setReturnedFocusToLast(false);
    setErrorMsgs([]);
    setShow(false);
    removeChangeEventListeners(".modalUserInput");
    if (createNewData) {
      returnsFocusMpDatatableCreateBTN(`Create ${dataTableName}`)
    }
  };
  if (document) {
    changeGridCellAttributeValue();
  }
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
          errorMsgs={errorMsgs}
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
    tabs: state.openedFacilityTabs["monitoringPlans"],
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
