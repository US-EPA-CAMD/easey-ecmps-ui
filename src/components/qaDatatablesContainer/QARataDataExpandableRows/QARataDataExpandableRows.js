import React, { useState, useMemo, useEffect } from "react";
import { connect } from "react-redux";
import {
  getRataData,
  createRataData,
  updateRataData,
  deleteRataData
} from "../../../utils/api/qaCertificationsAPI.js";
import { loadDropdowns } from "../../../store/actions/dropdowns";
import { convertSectionToStoreName } from "../../../additional-functions/data-table-section-and-store-names";
import { getRataDataRecords } from "../../../utils/selectors/QACert/TestSummary.js";
import { Button } from "@trussworks/react-uswds";
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
import QAProtocolGasExpandableRows from "../QAProtocolGasExpandableRows/QAProtocolGasExpandableRows.js";
import QARataSummaryExpandableRows from "../QARataSummaryExpandableRows/QARataSummaryExpandableRows.js";
// contains RATA data table

const QARataDataExpandableRows = ({
  user,
  mdmData,
  loadDropdownsData,
  data
}) => {
  const locId = data.locationId;
  const testSumId = data.id;
  const [loading, setLoading] = useState(false);
  const [rataData, setRataData] = useState([]);
  const [updateTable, setUpdateTable] = useState(false);

  useEffect(() => {
    if (rataData.length === 0 || updateTable) {
      setLoading(true);
      getRataData(locId, testSumId)
        .then((res) => {
          finishedLoadingData(res.data);
          setRataData(res.data);
          setLoading(false);
        })
        .catch((error) => {
          console.log("error", error);
        });
      setUpdateTable(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locId, testSumId, updateTable]);

  const dataRecords = useMemo(() => {
    return getRataDataRecords(rataData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rataData]);

  const [dataPulled, setDataPulled] = useState([]);
  const [show, setShow] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [selectedModalData, setSelectedModalData] = useState(null);
  const [dropdownsLoaded, setDropdownsLoaded] = useState(false);

  const [createNewData, setCreateNewData] = useState(false);
  const selectText = "-- Select a value --";
  //*****
  // pull these out and make components reuseable like monitoring plan
  const dropdownArray = [["rataFrequencyCode"]];
  const dropdownArrayIsEmpty = dropdownArray[0].length === 0;

  const columns = [
    "Number of Load Levels",
    "Relative Accuracy",
    "RATA Frequency Code",
    "Overall Bias Adjustment Factor",
  ];

  const dataTableName = "RATA Data";
  const controlInputs = {
    numberOfLoadLevels: ["Number of Load Levels", "dropdown", "", ""],
    relativeAccuracy: ["Relative Accuracy", "input", "", ""],
    rataFrequencyCode: ["RATA Frequency Code", "dropdown", "", ""],
    overallBiasAdjustmentFactor: ["Overall Bias Adjustment Factor", "input", "", ""],
  };
  useEffect(() => {
    // Load MDM data (for dropdowns) only if we don't have them already
    if (mdmData && mdmData.length === 0) {
      loadDropdownsData(dataTableName, dropdownArray);
    } else {
      setDropdownsLoaded(true);
      mdmData.numberOfLoadLevels = [
        { code: "", name: selectText }, { code: 1, name: 1 }, { code: 2, name: 2 }, { code: 3, name: 3 },
      ];
    }
  }, [mdmData, loadDropdownsData, dataTableName, dropdownArray]);

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
    setShow(false);
    removeChangeEventListeners(".modalUserInput");
  };
  const finishedLoadingData = (loadedData) => {
    setDataPulled(loadedData);
    addAriaLabelToDatatable();
  };
  // Executed when "View" action is clicked
  const openModal = (row, bool, create) => {
    let selectedData = null;
    setCreateNewData(create);
    if (create) {
      controlInputs.numberOfLoadLevels = ["Number of Load Levels", "dropdown", "", ""];
    }
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

  const createData = () => {
    const uiControls = {}
    Object.keys(controlInputs).forEach((key) => { uiControls[key] = null });
    const userInput = extractUserInput(uiControls, ".modalUserInput");
    createRataData(locId, testSumId, userInput)
      .then((res) => {
        console.log("res", res);
        if (Object.prototype.toString.call(res) === "[object Array]") {
          alert(res[0]);
        } else {
          setUpdateTable(true);
          executeOnClose();
        }
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  const saveData = () => {
    const uiControls = {}
    Object.keys(controlInputs).forEach((key) => {
      if (key === 'numberOfLoadLevels') {
        uiControls[key] = selectedRow.numberOfLoadLevels
      } else {
        uiControls[key] = null;
      }
    });
    const userInput = extractUserInput(uiControls, ".modalUserInput");
    updateRataData(selectedRow.id, locId, testSumId, userInput)
      .then((res) => {
        console.log("res", res);
        if (Object.prototype.toString.call(res) === "[object Array]") {
          alert(res[0]);
        } else {
          setUpdateTable(true);
          executeOnClose();
        }
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  const onRemoveHandler = async (row) => {
    const { id: idToRemove, testSumId } = row;
    try {
      const resp = await deleteRataData(
        locId,
        testSumId,
        idToRemove
      );
      if (resp.status === 200) {
        const dataPostRemove = rataData.filter(
          (rowData) => rowData.id !== idToRemove
        );
        setRataData(dataPostRemove);
      }
    } catch (error) {
      console.log('error deleting rata data', error);
    }
  };

  return (
    <div className="padding-y-3">
      <div className={`usa-overlay ${show ? "is-visible" : ""}`} />
      {!loading ? (
        <QADataTableRender
          columnNames={columns}
          columnWidth={15}
          data={dataRecords}
          openHandler={openModal}
          onRemoveHandler={onRemoveHandler}
          expandableRowComp={<QARataSummaryExpandableRows
            user={user}
            locId={locId}
            testSumId={testSumId}
          />}
          actionColumnName={
            user ?
              <>
                <span className="padding-right-2">
                  RATA Data
                </span>
                <Button
                  epa-testid="btnOpen"
                  className="text-white"
                  onClick={() => openModal(false, false, true)}
                >
                  Add
                </Button>
              </>
              : "RATA Data"
          }
          actionsBtn={"View"}
          user={user}
          evaluate={false}
          noDataComp={
            user ?
              (<QADataTableRender
                columnNames={columns}
                columnWidth={15}
                data={[]}
                actionColumnName={
                  (
                    <>
                      <span className="padding-right-2">RATA Data</span>
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
              />) : "There're no RATA data records available."
          }
        />
      ) : (
        <Preloader />
      )}

      <QAProtocolGasExpandableRows
        user={user}
        locId={locId}
        testSumId={testSumId}
      />

      {show ? (
        <Modal
          show={show}
          close={closeModalHandler}
          save={createNewData ? createData : saveData}
          showCancel={!user ? true : false}
          showSave={user ? true : false}
          title={
            createNewData
              ? `Add  ${dataTableName}`
              : user
                ? ` Edit ${dataTableName}`
                : ` ${dataTableName}`
          }
          exitBTN={`Save and Close`}
          children={
            dropdownsLoaded ? (
              <div>
                <ModalDetails
                  modalData={selectedRow}
                  data={selectedModalData}
                  cols={2}
                  title={`${dataTableName}`}
                  viewOnly={!user ? true : false}
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
  const dataTableName = "RATA Data";
  return {
    mdmData: JSON.parse(JSON.stringify(state.dropdowns[convertSectionToStoreName(dataTableName)])),
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
)(QARataDataExpandableRows);
export { mapDispatchToProps };
export { mapStateToProps };
