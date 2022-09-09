import React, { useState, useMemo, useEffect } from "react";
import {
  deleteQALinearitySummary,
  getQALinearitySummary,
  updateQALinearitySummaryTestSecondLevel,
  createQALinearitySummaryTestSecondLevel,
} from "../../../utils/api/qaCertificationsAPI.js";
import { getLinearitySummaryRecords } from "../../../utils/selectors/QACert/TestSummary.js";

import { Button } from "@trussworks/react-uswds";
import {
  attachChangeEventListeners,
  removeChangeEventListeners,
  unsavedDataMessage,
} from "../../../additional-functions/prompt-to-save-unsaved-changes";
import { addAriaLabelToDatatable } from "../../../additional-functions/ensure-508";
/*********** COMPONENTS ***********/
import QALinearityInjectionExpandableRows from "../QALinearityInjectionExpandableRows/QALinearityInjectionExpandableRows";

import QADataTableRender from "../../QADataTableRender/QADataTableRender.js";
import { Preloader } from "@us-epa-camd/easey-design-system";

import { extractUserInput } from "../../../additional-functions/extract-user-input";
import { modalViewData } from "../../../additional-functions/create-modal-input-controls";
import Modal from "../../Modal/Modal";
import ModalDetails from "../../ModalDetails/ModalDetails";
import QAProtocolGasExpandableRows from "../QAProtocolGasExpandableRows/QAProtocolGasExpandableRows.js";
import * as dmApi from "../../../utils/api/dataManagementApi";

// contains test summary data table
const QALinearitySummaryExpandableRows = ({
  user,
  nonEditable,
  locationSelectValue,
  data,
  showProtocolGas = true,
}) => {
  const { locationId, id } = data;
  const [mdmData, setMdmData] = useState(null);
  const [dropdownsLoading, setDropdownsLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [qaLinearitySummary, setQaLinearitySummary] = useState([]);

  const [updateTable, setUpdateTable] = useState(false);
  useEffect(() => {
    if (qaLinearitySummary.length === 0 || updateTable) {
      setLoading(true);
      getQALinearitySummary(locationId, id) //locID, testSumId
        .then((res) => {
          finishedLoadingData(res.data);
          setQaLinearitySummary(res.data);
          setLoading(false);
        })
        .catch((error) => {
          console.log("error", error);
        });
      setUpdateTable(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, updateTable]);

  const data1 = useMemo(() => {
    return getLinearitySummaryRecords(qaLinearitySummary);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [qaLinearitySummary]);
  const [dataPulled, setDataPulled] = useState([]);
  const [show, setShow] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [selectedModalData, setSelectedModalData] = useState(null);
  const [dropdownsLoaded, setDropdownsLoaded] = useState(false);

  // const [mainDropdownChange, setMainDropdownChange] = useState("");

  const [createNewData, setCreateNewData] = useState(false);
  // const [prefilteredMdmData, setPrefilteredMdmData] = useState(false);

  const selectText = "-- Select a value --";
  //*****
  // pull these out and make components reuseable like monitoring plan
  const dropdownArray = ["gasLevelCode", "gasTypeCode"];
  const dropdownArrayIsEmpty = dropdownArray.length === 0;

  const columns = [
    "Gas Level Code",
    "Mean Measured Value",
    "Mean Reference Value",
    "Percent Error",
    "APS Indicator",
  ];

  const onRemoveHandler = async (row) => {
    const { id: idToRemove, testSumId } = row;
    deleteQALinearitySummary(locationId, testSumId, idToRemove)
      .then((resp) => {
        if (resp.status === 200) {
          const dataPostRemove = qaLinearitySummary.filter(
            (rowData) => rowData.id !== idToRemove
          );
          setQaLinearitySummary(dataPostRemove);
        }
      })
      .catch((error) => {
        console.log("error", error);
      });
  };
  const dataTableName = "Linearity Test";
  const controlInputs = {
    gasLevelCode: ["Gas Level Code", "dropdown", "", "locked"],
    meanMeasuredValue: ["Mean Measured Value", "input", "", ""],
    meanReferenceValue: ["Mean Reference Value", "input", "", ""],
    percentError: ["Percent Error", "input", "", ""],
    apsIndicator: ["APS Indicator", "radio", "", ""],
    skip: ["", "skip", "", ""],
  };
  const loadDropdownsData = () => {
    let dropdowns = {};
    const allPromises = [];
    allPromises.push(dmApi.getAllGasLevelCodes());
    allPromises.push(dmApi.getAllGasTypeCodes());
    Promise.all(allPromises).then((values) => {
      values.forEach((val, i) => {
        if (i === 0) {
          dropdowns[dropdownArray[i]] = val.data.map((d) => {
            return {
              code: d["gasLevelCode"],
              name: d["gasLevelDescription"],
            };
          });
          dropdowns[dropdownArray[i]].unshift({
            code: "",
            name: "-- Select a value --",
          });
        } else {
          dropdowns[dropdownArray[i]] = val.data.map((d) => {
            return {
              code: d["gasTypeCode"],
              name: d["gasTypeDescription"],
            };
          });
          dropdowns[dropdownArray[i]].unshift({
            code: "",
            name: "-- Select a value --",
          });
        }
      });
      setMdmData(dropdowns);
    });
  };
  useEffect(() => {
    // Load MDM data (for dropdowns) only if we don't have them already
    if (!dropdownArrayIsEmpty && mdmData === null) {
      if (!dropdownsLoading) {
        loadDropdownsData();
        setDropdownsLoading(true);
      }
    } else {
      setDropdownsLoaded(true);
      setDropdownsLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mdmData]);

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
      controlInputs.gasLevelCode = ["Gas Level Code", "dropdown", "", ""];
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
      prefilteredDataName = dropdownArray[dropdownArray.length - 1];
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

    // if (!dropdownArrayIsEmpty) {
    //   setPrefilteredMdmData(mdmData[prefilteredDataName]);
    // }

    const prefilteredTotalName = dropdownArray[dropdownArray.length - 1];
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
      gasLevelCode: selectedRow.gasLevelCode,
      meanMeasuredValue: 0,
      meanReferenceValue: 0,
      percentError: 0,
      apsIndicator: 0,
    };
    const userInput = extractUserInput(payload, ".modalUserInput", [
      "apsIndicator",
    ]);

    updateQALinearitySummaryTestSecondLevel(
      locationId,
      selectedRow.testSumId,
      selectedRow.id,
      userInput
    )
      .then((res) => {
        setUpdateTable(true);
        executeOnClose();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const createData = () => {
    const uiControls = {
      gasLevelCode: null,
      meanMeasuredValue: 0,
      meanReferenceValue: 0,
      percentError: 0,
      apsIndicator: 0,
    };
    const userInput = extractUserInput(uiControls, ".modalUserInput", [
      "apsIndicator",
    ]);
    createQALinearitySummaryTestSecondLevel(locationId, data.id, userInput)
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
  return (
    <div className="padding-3">
      <div className={`usa-overlay ${show ? "is-visible" : ""}`} />
      {!loading ? (
        <QADataTableRender
          columnNames={columns}
          columnWidth={15}
          data={data1}
          openHandler={openModal}
          onRemoveHandler={onRemoveHandler}
          actionColumnName={
            user ? (
              <>
                <span className="padding-right-2">Linearity Summary</span>
                <Button
                  epa-testid="btnOpen"
                  className="text-white"
                  onClick={() => openModal(false, false, true)}
                >
                  Add
                </Button>
              </>
            ) : (
              "Linearity Summary"
            )
          }
          actionsBtn={"View"}
          user={user}
          evaluate={false}
          expandableRowComp={
            <QALinearityInjectionExpandableRows
              user={user}
              nonEditable={nonEditable}
              locationSelectValue={locationSelectValue}
              linSumId={locationId}
              testSumId={id}
            />
          }
          noDataComp={
            user ? (
              <QADataTableRender
                columnNames={columns}
                columnWidth={15}
                data={[]}
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
              />
            ) : (
              "There're no linearity summary records available."
            )
          }
        />
      ) : (
        <Preloader />
      )}

      {showProtocolGas && (
        <QAProtocolGasExpandableRows
          user={user}
          locId={locationId}
          testSumId={id}
        />
      )}

      {show ? (
        <Modal
          show={show}
          close={closeModalHandler}
          save={createNewData ? createData : saveData}
          showCancel={!user || nonEditable}
          showSave={user && !nonEditable}
          nonEditable={nonEditable}
          title={
            createNewData
              ? `Add  ${dataTableName}`
              : user
              ? ` Edit ${dataTableName}`
              : ` ${dataTableName}`
          }
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

export default QALinearitySummaryExpandableRows;
