import React, { useState, useMemo, useEffect } from "react";
import { connect } from "react-redux";
import {
  getRataRunData,
  createRataRunData,
  updateRataRunData,
  deleteRataRunData,
} from "../../../utils/api/qaCertificationsAPI.js";
import { loadDropdowns } from "../../../store/actions/dropdowns";
import { convertSectionToStoreName } from "../../../additional-functions/data-table-section-and-store-names";
import { getRataRunDataRecords } from "../../../utils/selectors/QACert/TestSummary.js";
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
import * as dmApi from "../../../utils/api/dataManagementApi";
// contains RATA data table

const QARataRunDataExpandableRows = ({
  user,
  testSumId,
  rataId,
  data,
}) => {
  const locId = data.locationId;
  const rataSumId = data.id;
  const [mdmData, setMdmData] = useState(null);
  const [dropdownsLoading, setDropdownsLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [rataRunData, setRataRunData] = useState([]);
  const [updateTable, setUpdateTable] = useState(false);

  useEffect(() => {
    if (rataRunData.length === 0 || updateTable) {
      setLoading(true);
      getRataRunData(locId, testSumId, rataId, rataSumId)
        .then((res) => {
          finishedLoadingData(res.data);
          setRataRunData(res.data);
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
    return getRataRunDataRecords(rataRunData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rataRunData]);

  const [dataPulled, setDataPulled] = useState([]);
  const [show, setShow] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [selectedModalData, setSelectedModalData] = useState(null);
  const [dropdownsLoaded, setDropdownsLoaded] = useState(false);

  const [createNewData, setCreateNewData] = useState(false);
  const selectText = "-- Select a value --";
  //*****
  // pull these out and make components reuseable like monitoring plan
  const dropdownArray = [["runStatusCode"]];
  const dropdownArrayIsEmpty = dropdownArray[0].length === 0;

  const columns = [
    "Run Number",
    "Begin Date ",
    "Begin Hour",
    "Begin Minute",
    "End Date",
    "End Hour ",
    "End Minute",
    "CEM Value",
    "RATA Reference Value",
    "Gross Unit Load ",
    "Run Status Code ",
  ];

  const dataTableName = "RATA Run Data";
  const controlInputs = {
    runNumber: ["Run Number", "input", "", ""],
    skip: ["", "skip", "", ""],
    skip1: ["", "skip", "", ""],
  };
  const extraControlInputs = {
    cemValue: ["CEM Value", "input", "", ""],
    rataReferenceValue: ["RATA Reference Value", "input", "", ""],
    grossUnitLoad: ["Gross Unit Load ", "input", "", ""],
    runStatusCode: ["Run Status Code", "dropdown", "", ""],
  };

  const controlDatePickerInputs = {
    beginDate: ["Begin Date", "date", "", ""],
    beginHour: ["Begin Hour", "hourDropdown", "dropdown", ""],
    beginMinute: ["Begin Minute", "minuteDropdown", "dropdown", ""],
    endDate: ["End Date", "date", "", ""],
    endHour: ["End Hour", "hourDropdown", "dropdown", ""],
    endMinute: ["End Minute", "minuteDropdown", "dropdown", ""],
  };
  const loadDropdownsData = () =>{
    let dropdowns = {};
    dmApi.getAllRunStatusCodes()
      .then((res)=>{
        dropdowns[dropdownArray[0][0]] = 
          res.data.map(d => {
            return {
              code: d["runStatusCode"],
              name: d["runStatusCodeDescription"],
            };
        });
        dropdowns[dropdownArray[0][0]].unshift({ code: "", name: "-- Select a value --" });
        setMdmData(dropdowns);
      })
      .catch((error) => {
        console.log("error", error);
      });
  }
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
  }, [mdmData]);

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

    if (dataPulled.length > 0 && !create) {
      selectedData = dataPulled.filter(
        (element) => element.id === row[`id`]
      )[0];
      setSelectedRow(selectedData);
    }
    let mainDropdownName = "";
    let hasMainDropdown = false;
    // for (const controlProperty in controlInputs) {
    //   if (controlInputs[controlProperty][1] === "mainDropdown") {
    //     mainDropdownName = controlProperty;
    //     hasMainDropdown = true;
    //     break;
    //   }
    // }
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

    console.log("mdmData", mdmData);
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

  const createData = () => {
    const uiControls = {};
    Object.keys(controlInputs).forEach((key) => {
      uiControls[key] = null;
    });
    const userInput = extractUserInput(uiControls, ".modalUserInput");
    createRataRunData(locId, testSumId, rataId, rataSumId, userInput)
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
    const uiControls = {};
    const userInput = extractUserInput(uiControls, ".modalUserInput");
    updateRataRunData(selectedRow.id, locId, testSumId, userInput)
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
      const resp = await deleteRataRunData(locId, testSumId, idToRemove);
      if (resp.status === 200) {
        const dataPostRemove = rataRunData.filter(
          (rowData) => rowData.id !== idToRemove
        );
        setRataRunData(dataPostRemove);
      }
    } catch (error) {
      console.log("error deleting rata data", error);
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
          actionColumnName={
            user ? (
              <>
                <span className="padding-right-2">RATA Run</span>
                <Button
                  epa-testid="btnOpen"
                  className="text-white"
                  onClick={() => openModal(false, false, true)}
                >
                  Add
                </Button>
              </>
            ) : (
              "RATA Run"
            )
          }
          actionsBtn={"View"}
          user={user}
          evaluate={false}
          noDataComp={
            user ? (
              <QADataTableRender
                columnNames={columns}
                columnWidth={15}
                data={[]}
                actionColumnName={
                  <>
                    <span className="padding-right-2">RATA Run Data</span>
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
              "There're no RATA Run records available."
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
                  cols={3}
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

export default QARataRunDataExpandableRows;
