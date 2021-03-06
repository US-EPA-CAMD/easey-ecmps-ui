import React, { useState, useMemo, useEffect } from "react";
import { connect } from "react-redux";
import {
  getQATestSummary,
  updateQALinearityTestSummary,
  deleteQATestSummary,
} from "../../../utils/api/qaCertificationsAPI.js";
import { getTestSummary } from "../../../utils/selectors/QACert/TestSummary.js";
import QALinearitySummaryExpandableRows from "../QALinearitySummaryExpandableRows/QALinearitySummaryExpandableRows";

import Modal from "../../Modal/Modal";
import ModalDetails from "../../ModalDetails/ModalDetails";
import { extractUserInput } from "../../../additional-functions/extract-user-input";
import { modalViewData } from "../../../additional-functions/create-modal-input-controls";
import {
  assignFocusEventListeners,
  cleanupFocusEventListeners,
  returnFocusToLast,
} from "../../../additional-functions/manage-focus";
import {
  attachChangeEventListeners,
  removeChangeEventListeners,
  unsavedDataMessage,
} from "../../../additional-functions/prompt-to-save-unsaved-changes";

import { loadDropdowns } from "../../../store/actions/dropdowns";
import { convertSectionToStoreName } from "../../../additional-functions/data-table-section-and-store-names";

import { addAriaLabelToDatatable } from "../../../additional-functions/ensure-508";

/*********** COMPONENTS ***********/

import QADataTableRender from "../../QADataTableRender/QADataTableRender.js";
import { Button } from "@trussworks/react-uswds";
import { Preloader } from "@us-epa-camd/easey-design-system";

// contains test summary data table

export const QALinearitySummaryDataTable = ({
  mdmData,
  loadDropdownsData,
  updateDropdowns,
  locationSelectValue,
  user,
  nonEditable = false,

  radioNames,
  payload,
  urlParameters,

  selectedLocation,
  showModal = false,
  setUpdateRelatedTables,
  updateRelatedTables,
}) => {
  const [loading, setLoading] = useState(false);

  const [qaTestSummary, setQATestSummary] = useState([]);
  const [dataPulled, setDataPulled] = useState([]);
  const [show, setShow] = useState(showModal);
  const [selectedRow, setSelectedRow] = useState(null);
  const [selectedModalData, setSelectedModalData] = useState(null);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [dropdownsLoaded, setDropdownsLoaded] = useState(false);

  const [mainDropdownChange, setMainDropdownChange] = useState("");

  const [createNewData, setCreateNewData] = useState(false);
  const [prefilteredMdmData, setPrefilteredMdmData] = useState(false);

  const [updateTable, setUpdateTable] = useState(false);
  const [complimentaryData, setComplimentaryData] = useState([]);

  const [returnedFocusToLast, setReturnedFocusToLast] = useState(false);
  const selectText = "-- Select a value --";
  //*****
  // pull these out and make components reuseable like monitoring plan
  const dropdownArray = [
    ["spanScaleCode", "testTypeCode", "testReasonCode", "testResultCode"],
  ];
  const dropdownArrayIsEmpty = dropdownArray[0].length === 0;

  let selectedModalDataCloned;
  let selectedRowCloned;

  const dataTableName = "Test Summary Data";
  const controlInputs = {
    unitId: ["Unit or Stack Pipe ID", "input", "", ""],
    testTypeCode: ["Test Type Code", "dropdown", "", ""],
    skip: ["", "skip", "", ""],
    componentID: ["Component ID", "input", "", ""],
    spanScaleCode: ["Span Scale Code", "dropdown", "", ""],
    testNumber: ["Test Number", "input", "", ""],
    testReasonCode: ["Test Reason Code", "dropdown", "", ""],
    testResultCode: ["Test Result Code", "dropdown", "", ""],
    gracePeriodIndicator: ["Grace Period Indicator ", "radio", "", ""],
  };

  // goes after dateinput in modals
  const extraControlInputs = {
    testComment: ["Test Comment", "input", "", ""],
  };
  const controlDatePickerInputs = {
    beginDate: ["Begin Date", "date", "", ""],
    beginHour: ["Begin Hour", "hourDropdown", "dropdown", ""],
    beginMinute: ["Begin Minute", "minuteDropdown", "dropdown", ""],
    endDate: ["End Date", "date", "", ""],
    endHour: ["End Hour", "hourDropdown", "dropdown", ""],

    endMinute: ["End Minute", "minuteDropdown", "dropdown", ""],
  };

  //**** */
  useEffect(() => {
    if (
      // updateTable ||
      qaTestSummary.length <= 0 ||
      locationSelectValue
    ) {
      setLoading(true);
      getQATestSummary(locationSelectValue).then((res) => {
        finishedLoadingData(res.data);
        setQATestSummary(res.data);
        setLoading(false);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locationSelectValue]);

  useEffect(() => {
    // Load MDM data (for dropdowns) only if we don't have them already
    if (mdmData && mdmData.length === 0) {
      loadDropdownsData(dataTableName, dropdownArray);
    } else {
      setDropdownsLoaded(true);
    }
  }, [mdmData, loadDropdownsData, dataTableName, dropdownArray]);

  const data = useMemo(() => {
    return getTestSummary(qaTestSummary);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [qaTestSummary]);
  const columns = [
    "Test Type Code",
    "Unit or Stack Pipe ID",
    "Component ID",
    "Test Number",
    "Test Reason Code",
    "Test Result Code",
    "End Date",
    "End Hour",
    "End Minute",
  ];

  const finishedLoadingData = (loadedData) => {
    setDataPulled(loadedData);
    setDataLoaded(true);
    addAriaLabelToDatatable();
  };
  // Executed when "View" action is clicked
  const openModal = (row, bool, create) => {
    let selectedData = null;
    setCreateNewData(create);
    if (dataPulled.length > 0 && !create) {
      selectedData = dataPulled.filter(
        (element) => element.id === row[`id`]
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
    // only applies if there is prefiltering based on a primary driver dropdown
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

    const prefilteredTotalName = dropdownArray[0][dropdownArray[0].length - 1];
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
        prefilteredTotalName,
        extraControlInputs
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
    setShow(false);
    removeChangeEventListeners(".modalUserInput");
  };

  const onRemoveHandler = async (row) => {
    const { id, locationId } = row;
    const resp = await deleteQATestSummary(locationId, id);
    if (resp.status === 200) {
      const dataPostRemove = qaTestSummary.filter(
        (rowData) => rowData.id !== id
      );
      setQATestSummary(dataPostRemove);
    }
  };

  const apiFormatDate = (dateString) => {
    const dateSplit = dateString.split("/");
    return `${dateSplit[2]}-${dateSplit[0]}-${dateSplit[1]}`;
  };

  const onEditUpdateHandler = (updatedValue, fieldType, fieldCode) => {
    if (!selectedModalDataCloned) {
      selectedModalDataCloned = [...selectedModalData];
    }
    if (!selectedRowCloned) {
      selectedRowCloned = { ...selectedRow };
    }
    selectedModalDataCloned.forEach((arr) => {
      if (arr[0] === fieldCode) {
        switch (fieldType) {
          case "date":
            arr[2] = updatedValue;
            arr[5] = apiFormatDate(updatedValue);
            break;
          case "input":
          case "radio":
            arr[2] = updatedValue;
            break;
          default:
            //any kind of dropdown field
            arr[5] = updatedValue;
            if (arr[6]) {
              const optionFound = arr[6].find((e) => e.code === updatedValue);
              if (optionFound) {
                arr[2] = optionFound.name;
              }
            } else {
              arr[2] = updatedValue;
            }
            break;
        }
      }
    });
    selectedRowCloned[fieldCode] = updatedValue;
    //console.log("selectedModalDataCloned",selectedModalDataCloned); console.log("selectedRowCloned", selectedRowCloned);
  };

  const saveData = () => {
    const payload = {
      stackPipeId: selectedRowCloned.stackPipeId,
      unitId: selectedRowCloned.unitId,
      testTypeCode: selectedRowCloned.testTypeCode,
      componentID: selectedRowCloned.componentID,
      spanScaleCode: selectedRowCloned.spanScaleCode,
      testNumber: selectedRowCloned.testNumber,
      testReasonCode: selectedRowCloned.testReasonCode,
      testResultCode: selectedRowCloned.testResultCode,
      beginDate: apiFormatDate(selectedRowCloned.beginDate),
      beginHour: selectedRowCloned.beginHour,
      beginMinute: selectedRowCloned.beginMinute,
      endDate: apiFormatDate(selectedRowCloned.endDate),
      endHour: selectedRowCloned.endHour,
      endMinute: selectedRowCloned.endMinute,
      gracePeriodIndicator: selectedRowCloned.gracePeriodIndicator,
      testComment: selectedRowCloned.testComment,
    };

    updateQALinearityTestSummary(
      selectedRowCloned.locationId,
      selectedRowCloned.id,
      payload
    ).then((res) => {
      //console.log("res", res);
      if (Object.prototype.toString.call(res) === "[object Array]") {
        alert(res[0]);
      } else {
        const newQaTestSummary = qaTestSummary.map((e) => {
          if (e.id === selectedRowCloned.id) {
            return res.data;
          } else {
            return e;
          }
        });
        finishedLoadingData(newQaTestSummary);
        setQATestSummary(newQaTestSummary);
        executeOnClose();
      }
    });
  };

  return (
    <div>
      <div className={`usa-overlay ${show ? "is-visible" : ""}`} />
      <div className=" padding-3">
        <h3 className="display-inline padding-right-3">Test Summary Data</h3>
        {user ? <Button> Add Test Summary Data</Button> : ""}
      </div>
      {!loading ? (
        <QADataTableRender
          columnNames={columns}
          columnWidth={10}
          data={data}
          openHandler={openModal}
          onRemoveHandler={onRemoveHandler}
          actionColumnName={"Actions"}
          actionsBtn={"View"}
          user={user}
          expandableRowComp={<QALinearitySummaryExpandableRows user={user} />}
        />
      ) : (
        <Preloader />
      )}
      {show ? (
        <Modal
          show={show}
          close={closeModalHandler}
          save={saveData}
          showCancel={!user || nonEditable}
          showSave={user && !nonEditable}
          nonEditable={nonEditable}
          title={createNewData ? `Create ${dataTableName}` : `${dataTableName}`}
          exitBTN={createNewData ? `Create ${dataTableName}` : `Save and Close`}
          children={
            dropdownsLoaded ? (
              <div>
                <ModalDetails
                  modalData={selectedRow}
                  data={selectedModalData}
                  // prefilteredMdmData={prefilteredMdmData}
                  cols={3}
                  title={`${dataTableName}`}
                  viewOnly={!user || nonEditable}
                  create={createNewData}
                  // setMainDropdownChange={setMainDropdownChange}
                  //mainDropdownChange={mainDropdownChange}
                  onEditUpdateHandler={onEditUpdateHandler}
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
  const dataTableName = "Test Summary Data";
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(QALinearitySummaryDataTable);
export { mapDispatchToProps };
export { mapStateToProps };
