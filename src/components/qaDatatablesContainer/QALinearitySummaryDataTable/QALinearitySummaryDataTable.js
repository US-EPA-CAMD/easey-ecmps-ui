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
import QARataDataExpandableRows from "../QARataDataExpandableRows/QARataDataExpandableRows.js";

import Modal from "../../Modal/Modal";
import ModalDetails from "../../ModalDetails/ModalDetails";
import { extractUserInput } from "../../../additional-functions/extract-user-input";
import { modalViewData } from "../../../additional-functions/create-modal-input-controls";

import {
  attachChangeEventListeners,
  removeChangeEventListeners,
  unsavedDataMessage,
} from "../../../additional-functions/prompt-to-save-unsaved-changes";

import {
  loadDropdowns,
  updateDropdowns,
} from "../../../store/actions/dropdowns";
import { convertSectionToStoreName } from "../../../additional-functions/data-table-section-and-store-names";

import { addAriaLabelToDatatable } from "../../../additional-functions/ensure-508";

/*********** COMPONENTS ***********/

import QADataTableRender from "../../QADataTableRender/QADataTableRender.js";
import { Button } from "@trussworks/react-uswds";
import { Preloader } from "@us-epa-camd/easey-design-system";
import {
  getQAColsByTestCode,
  getQAModalDetailsByTestCode,
} from "../../../utils/selectors/QACert/LinearitySummary.js";

// contains test summary data table

const QALinearitySummaryDataTable = ({
  mdmData,
  loadDropdownsData,
  locationSelectValue,
  user,
  nonEditable = false,
  showModal = false,
  selectedTestCode,
  sectionSelect,
}) => {
  console.log("selectedTestCode", selectedTestCode);
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
  const [prevSelectedTest, setPrevSelectedTest] = useState(
    selectedTestCode.testTypeGroupCode
  );
  const selectText = "-- Select a value --";
  //*****
  // pull these out and make components reuseable like monitoring plan
  const dropdownArray = [
    [
      "testTypeCode",
      "spanScaleCode",

      "testReasonCode",
      "testResultCode",
      "prefilteredTestSummaries",
    ],
  ];
  const dropdownArrayIsEmpty = dropdownArray[0].length === 0;

  const dataTableName = "Test Summary Data";

  //**** */
  useEffect(() => {
    if (updateTable || qaTestSummary.length <= 0 || locationSelectValue) {
      setLoading(true);

      const { testTypeCodes } = selectedTestCode;
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
      loadDropdownsData(dataTableName, dropdownArray, selectedTestCode);

      setPrevSelectedTest(selectedTestCode.testTypeGroupCode);
    } else if (prevSelectedTest !== selectedTestCode.testTypeGroupCode) {
      loadDropdownsData(dataTableName, dropdownArray, selectedTestCode);
      setPrevSelectedTest(selectedTestCode.testTypeGroupCode);
      setDropdownsLoaded(true);
    } else {
      setDropdownsLoaded(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedTestCode, sectionSelect,mdmData]);
  useEffect(() => {
    // Update all the "secondary dropdowns" (based on the "main" dropdown)
    const prefilteredDataName = dropdownArray[0][0];
    if (prefilteredMdmData) {
      const result = prefilteredMdmData.filter(
        (prefiltered) => prefiltered[prefilteredDataName] === mainDropdownChange
      );

      if (result.length > 0) {
        // Go through the inputs in the modal
        for (const modalDetailData of selectedModalData) {
          // For each dropdown
          if (modalDetailData[4] === "dropdown") {
            const selectedCodes = result[0];
            // Filter their options (based on the value of the driving dropdown)
            const filteredOutSubDropdownOptions = mdmData[
              modalDetailData[0]
            ].filter((option) =>
              selectedCodes[modalDetailData[0]].includes(option.code)
            );

            // Add select option
            filteredOutSubDropdownOptions.unshift({
              code: "",
              name: selectText,
            });
            // Load the filtered data into the dropdown
            modalDetailData[6] = filteredOutSubDropdownOptions;
          }
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mainDropdownChange, selectedModalData]);
  const columns = getQAColsByTestCode(selectedTestCode.testTypeGroupCode);
  const { controlInputs, extraControlInputs, controlDatePickerInputs } =
    getQAModalDetailsByTestCode(selectedTestCode.testTypeGroupCode);

  // prefilters the test type code dropdown based on group selection
  useEffect(() => {
    console.log("mdm", mdmData);
    if (dropdownsLoaded) {
      console.log("control", controlInputs);
      // Go through the inputs in the modal
      if (controlInputs["testTypeCode"][1] === "mainDropdown") {
        const filteredOutSubDropdownOptions = mdmData["testTypeCode"].filter(
          (option) => selectedTestCode.testTypeCodes.includes(option.code)
        );

        // Add select option
        filteredOutSubDropdownOptions.unshift({
          code: "",
          name: selectText,
        });
        console.log(
          "filteredOutSubDropdownOptions",
          filteredOutSubDropdownOptions
        );
        setPrefilteredMdmData(filteredOutSubDropdownOptions);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedTestCode, dropdownsLoaded]);

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
    console.log("controlInputs", controlInputs);
    let mainDropdownName = "";
    let hasMainDropdown = false;
    for (const controlProperty in controlInputs) {
      console.log("controlprop", controlProperty);
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
      console.log("maindropdownName", mainDropdownName); //testTypeCode
      console.log(
        " mdmData[mainDropdownName]",
        mdmData[mainDropdownName],
        mdmData[prefilteredDataName]
      );

      mainDropdownResult = mdmData[mainDropdownName].filter((o) =>
        mdmData[prefilteredDataName].some(
          (element, index, arr) => o.code === element[mainDropdownName]
        )
      );
      console.log("prefilteredDataName", prefilteredDataName); //prefilteredTestSummaries
      console.log("mdmData", mdmData);
      console.log("mainDropdownResult", mainDropdownResult);
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

  const getExpandableComponent = (testTypeGroupCode, props) =>{
    switch(testTypeGroupCode){
      case "LINSUM":
        return <QALinearitySummaryExpandableRows {...props}/>
      case "RELACC":
        return <QARataDataExpandableRows {...props}/>
      default:
        return null;       
    }
  }

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
            getExpandableComponent(selectedTestCode.testTypeGroupCode, {
              user: user,
              nonEditable: nonEditable,
              locationSelectValue: locationSelectValue
            })
            // <QALinearitySummaryExpandableRows
            //   user={user}
            //   nonEditable={nonEditable}
            //   locationSelectValue={locationSelectValue}
            // />
          }
          evaluate={true}
          noDataComp={
            user ? (
              <QADataTableRender
                columnNames={columns}
                columnWidth={10}
                data={[]}
                actionColumnName={
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
                }
                actionsBtn={"View"}
                user={user}
              />
            ) : (
              "There're no test summary records available."
            )
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
  const dataTableName = "Test Summary Data";
  return {
    mdmData: state.dropdowns[convertSectionToStoreName(dataTableName)],
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadDropdownsData: async (section, dropdownArray, selectedTestCode) =>
      dispatch(
        loadDropdowns(
          convertSectionToStoreName(section),
          dropdownArray,
          selectedTestCode
        )
      ),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(QALinearitySummaryDataTable);
export { mapDispatchToProps };
export { mapStateToProps };
