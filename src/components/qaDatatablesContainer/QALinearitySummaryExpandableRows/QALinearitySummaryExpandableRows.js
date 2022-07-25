import React, { useState, useMemo, useEffect } from "react";
import { connect } from "react-redux";
import {
  deleteQALinearitySummary,
  getQALinearitySummary,
  updateQALinearitySummaryTestSecondLevel,
} from "../../../utils/api/qaCertificationsAPI.js";
import { loadDropdowns } from "../../../store/actions/dropdowns";
import { convertSectionToStoreName } from "../../../additional-functions/data-table-section-and-store-names";
import { getLinearitySummaryRecords } from "../../../utils/selectors/QACert/TestSummary.js";
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
import { addAriaLabelToDatatable } from "../../../additional-functions/ensure-508";
/*********** COMPONENTS ***********/

import QADataTableRender from "../../QADataTableRender/QADataTableRender.js";
import { Preloader } from "@us-epa-camd/easey-design-system";

import { extractUserInput } from "../../../additional-functions/extract-user-input";
import { modalViewData } from "../../../additional-functions/create-modal-input-controls";
import Modal from "../../Modal/Modal";
import ModalDetails from "../../ModalDetails/ModalDetails";
// contains test summary data table

const QALinearitySummaryExpandableRows = ({
  user,
  id,
  locationId,
  nonEditable,
  mdmData,
}) => {
  // const { locationId, id } = data;
  const [loading, setLoading] = useState(false);
  const [qaLinearitySummary, setQaLinearitySummary] = useState([]);

  useEffect(() => {
    if (qaLinearitySummary.length === 0) {
      setLoading(true);
      getQALinearitySummary(locationId, id).then((res) => {
        setQaLinearitySummary(res.data);
        setLoading(false);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const data = useMemo(() => {
    return getLinearitySummaryRecords(qaLinearitySummary);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [qaLinearitySummary]);
  const [qaLinearityTest, setLinearityTest] = useState([]);
  const [dataPulled, setDataPulled] = useState([]);
  const [show, setShow] = useState(false);
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
  const dropdownArray = [["gasLevelCode"]];
  const dropdownArrayIsEmpty = dropdownArray[0].length === 0;

  let selectedModalDataCloned;
  let selectedRowCloned;

  const columns = [
    "Gas Level Code",
    "Mean Measured Value",
    "Mean Reference Value",
    "Percent Error",
    "APS Indicator",
  ];

  const onRemoveHandler = async (row) => {
    const { id: idToRemove, testSumId } = row;
    const resp = await deleteQALinearitySummary(
      locationId,
      testSumId,
      idToRemove
    );
    if (resp.status === 200) {
      const dataPostRemove = qaLinearitySummary.filter(
        (rowData) => rowData.id !== idToRemove
      );
      setQaLinearitySummary(dataPostRemove);
    }
  };
  const dataTableName = "Linearity Test";
  const controlInputs = {
    gasLevelCode: ["Gas Level Code", "dropdown", "", "locked"],
    meanMeasuredValue: ["Mean Measured Value", "input", "", ""],
    meanReferenceValue: ["Mean Reference Value", "input", "", ""],
    percentError: ["Percent Error", "input", "", ""],
    apsIndicator: ["APS Indicator", "dropdown", "", ""],
  };

  const controlDatePickerInputs = {};
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
  const finishedLoadingData = (loadedData) => {
    // setDataPulled(loadedData);
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
        false // no extra controls
      )
    );

    setShow(true);
    setTimeout(() => {
      attachChangeEventListeners(".modalUserInput");
    });
  };
  const saveData = () => {
    const payload = {
      gasLevelCode: "string",
      meanMeasuredValue: 0,
      meanReferenceValue: 0,
      percentError: 0,
      apsIndicator: 0,
    };

    updateQALinearitySummaryTestSecondLevel(
      selectedRow.locationId,
      selectedRow.id,
      payload
    ).then((res) => {
      //console.log("res", res);
      if (Object.prototype.toString.call(res) === "[object Array]") {
        alert(res[0]);
      } else {
        const newQaLinearityTest = qaLinearityTest.map((e) => {
          if (e.id === selectedRow.id) {
            return res.data;
          } else {
            return e;
          }
        });
        finishedLoadingData(newQaLinearityTest);
        setLinearityTest(newQaLinearityTest);
        executeOnClose();
      }
    });
  };
  return (
    <div className="padding-3">
      <div className={`usa-overlay ${show ? "is-visible" : ""}`} />
      {!loading ? (
        <QADataTableRender
          columnNames={columns}
          columnWidth={15}
          data={data}
          openHandler={() => {}}
          onRemoveHandler={onRemoveHandler}
          actionColumnName={"Linearity Summary Data"}
          actionsBtn={"View"}
          user={user}
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
                  // onEditUpdateHandler={onEditUpdateHandler}
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
  const dataTableName = "Linearity Test";
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
)(QALinearitySummaryExpandableRows);
export { mapDispatchToProps };
export { mapStateToProps };
