import React, { useState, useMemo, useEffect } from "react";
import { connect } from "react-redux";
import {
  getQATestSummary,
  updateQALinearityTestSummary,
  deleteQATestSummary,
  createQATestData,
} from "../../../utils/api/qaCertificationsAPI.js";
import { getTestSummary } from "../../../utils/selectors/QACert/TestSummary.js";
import QALinearitySummaryExpandableRows from "../QALinearitySummaryExpandableRows/QALinearitySummaryExpandableRows";

import Modal from "../../Modal/Modal";
import ModalDetails from "../../ModalDetails/ModalDetails";
import { extractUserInput } from "../../../additional-functions/extract-user-input";
import { modalViewData } from "../../../additional-functions/create-modal-input-controls";

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
import { getQAColsByTestCode, getQAModalDetailsByTestCode } from "../../../utils/selectors/QACert/LinearitySummary.js";

// contains test summary data table

const QALinearitySummaryDataTable = ({
  mdmData,
  loadDropdownsData,
  locationSelectValue,
  user,
  nonEditable = false,
  showModal = false,
  selectedTestCode,
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

  const dataTableName = "Test Summary Data";

  //**** */
  useEffect(() => {
    if (updateTable || qaTestSummary.length <= 0 || locationSelectValue) {
      setLoading(true);

      const { testTypeCodes } = selectedTestCode
      if (testTypeCodes && testTypeCodes.length !== 0) {
        getQATestSummary(locationSelectValue, testTypeCodes).then((res) => {
          if (res !== undefined && res.data.length > 0) {
            finishedLoadingData(res.data);
            setQATestSummary(res.data);
          } else {
            finishedLoadingData([]);
            setQATestSummary([]);
          }
          setLoading(false);
        });
        setUpdateTable(false);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locationSelectValue, updateTable, selectedTestCode]);

  useEffect(() => {
    // Load MDM data (for dropdowns) only if we don't have them already
    if (mdmData && mdmData.length === 0) {
      loadDropdownsData(dataTableName, dropdownArray);
    } else {
      setDropdownsLoaded(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mdmData, loadDropdownsData, dataTableName, dropdownArray]);

  const columns = getQAColsByTestCode(selectedTestCode.testTypeGroupCode)
  const { controlInputs, extraControlInputs, controlDatePickerInputs } = getQAModalDetailsByTestCode(selectedTestCode.testTypeGroupCode)

  const data = useMemo(() => {
    return getTestSummary(qaTestSummary, columns);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [qaTestSummary]);

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

  const uiControls = {
    stackPipeId: null,
    unitId: null,
    testTypeCode: null,
    componentID: null,
    spanScaleCode: null,
    testNumber: null,
    testReasonCode: null,
    testResultCode: null,
    beginDate: null,
    beginHour: null,
    beginMinute: null,
    endDate: null,
    endHour: null,
    endMinute: null,
    gracePeriodIndicator: null,
    testComment: null,
    injectionProtocolCode: null,
  };

  const saveData = () => {
    const userInput = extractUserInput(uiControls, ".modalUserInput", [
      "gracePeriodIndicator",
    ]);
    updateQALinearityTestSummary(locationSelectValue, userInput.id, userInput)
      .then((res) => {
        if (Object.prototype.toString.call(res) === "[object Array]") {
          alert(res[0]);
        } else {
          setUpdateTable(true);
          executeOnClose();
        }
      })
      .catch((error) => {
        console.error("error", error);
      });
  };

  const createData = () => {
    const userInput = extractUserInput(uiControls, ".modalUserInput", [
      "gracePeriodIndicator",
    ]);
    userInput.unitId
      ? (userInput.unitId = String(userInput.unitId))
      : (userInput.stackPipeId = String(userInput.stackPipeId));
    createQATestData(locationSelectValue, userInput)
      .then((res) => {
        if (Object.prototype.toString.call(res) === "[object Array]") {
          alert(res[0]);
        } else {
          setUpdateTable(true);
          executeOnClose();
        }
      })
      .catch((error) => {
        console.error("error", error);
      });
  };

  return (
    <div>
      <div className={`usa-overlay ${show ? "is-visible" : ""}`} />
      <div className=" padding-3">
        <h3 className="display-inline padding-right-3">Test Summary Data</h3>
      </div>
      {!loading ? (
        <QADataTableRender
          columnNames={columns}
          columnWidth={10}
          data={data}
          openHandler={openModal}
          onRemoveHandler={onRemoveHandler}
          actionColumnName={
            user ? (
              <>
                <span className="padding-right-2">Test Data</span>
                <Button
                  epa-testid="btnOpen"
                  className="text-white"
                  onClick={() => openModal(false, false, true)}
                >
                  Add
                </Button>
              </>
            ) : (
              "Test Data"
            )
          }
          actionsBtn={"View"}
          user={user}
          expandableRowComp={
            <QALinearitySummaryExpandableRows
              user={user}
              nonEditable={nonEditable}
              locationSelectValue={locationSelectValue}
            />
          }
          evaluate={true}
          noDataComp={
            user ?
              (<QADataTableRender
                columnNames={columns}
                columnWidth={10}
                data={[]}
                actionColumnName={
                  (
                    <>
                      <span className="padding-right-2">Test Data</span>
                      <Button
                        epa-testid="btnOpen"
                        className="text-white"
                        onClick={() => openModal(false, false, true)}
                      >
                        Add
                      </Button>
                    </>
                  )
                }
                actionsBtn={"View"}
                user={user}
              />) : "There're no records available."
          }
        />
      ) : (
        <Preloader />
      )}
      {show ? (
        <Modal
          show={show}
          close={closeModalHandler}
          save={createNewData ? createData : saveData}
          showCancel={!user || nonEditable}
          showSave={user && !nonEditable}
          nonEditable={nonEditable}
          title={createNewData ? `Add ${dataTableName}` : `${dataTableName}`}
          exitBTN={`Save and Close`}
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
