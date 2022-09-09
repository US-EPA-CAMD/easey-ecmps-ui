import React, { useState, useMemo, useEffect } from "react";
import {
  getProtocolGas,
  createProtocolGas,
  updateProtocolGas,
  deleteProtocolGas,
  getRataSummary,
  createRataSummary,
  updateRataSummary,
  deleteRataSummary,
  getRataRunData,
  createRataRunData,
  updateRataRunData,
  deleteRataRunData,
  getRataData,
  createRataData,
  updateRataData,
  deleteRataData,
  deleteQALinearitySummary,
  getQALinearitySummary,
  updateQALinearitySummaryTestSecondLevel,
  createQALinearitySummaryTestSecondLevel,
  deleteQALinearityInjection,
  getQALinearityInjection,
  editQALinearityInjection,
  createQALinearityInjection,
} from "../../../utils/api/qaCertificationsAPI.js";
import { getLinearityInjection } from "../../../utils/selectors/QACert/LinearityInjection";

import {
  getProtocolGasRecords,
  getRataDataRecords,
  mapRataSummaryToRows,
  getRataRunDataRecords,
  getLinearitySummaryRecords,
} from "../../../utils/selectors/QACert/TestSummary.js";
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
import * as assertSelector from "../../../utils/selectors/QACert/assert";
import {
  qaProtocalGasProps,
  qaLinearityInjectionProps,
} from "../../../additional-functions/qa-dataTable-props";
const QAExpandableRowsRender = ({
  user,
  locId,
  testSumId,
  controlInputs,
  controlDatePickerInputs,
  extraControls,
  columns,
  dataTableName,
  dropdownArray,
  payload,
  expandable,
  data,
}) => {
  const { locationId, id } = data;
  console.log("data", data);
  const [mdmData, setMdmData] = useState(null);
  const [dropdownsLoading, setDropdownsLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [updateTable, setUpdateTable] = useState(false);
  const [dataPulled, setDataPulled] = useState([]);
  // useEffect(() => {
  //   if (dataPulled.length === 0 || updateTable) {
  //     setLoading(true);
  //     const name = dataTableName;
  //     switch (name) {
  //       case "Protocol Gas":
  //         getProtocolGas(locId, testSumId)
  //           .then((res) => {
  //             finishedLoadingData(res.data);
  //             setLoading(false);
  //           })
  //           .catch((error) => {
  //             console.log("error", error);
  //           });
  //         break;
  //       case "Linearity Test":
  //         getQALinearitySummary(locationId, id)
  //           .then((res) => {
  //             console.log("testing", res.data);
  //             finishedLoadingData(res.data);
  //             setLoading(false);
  //           })
  //           .catch((error) => {
  //             console.log("error", error);
  //           });
  //         break;
  //       case "Linearity Injection":
  //         getQALinearityInjection(locationId, id)
  //           .then((res) => {
  //             finishedLoadingData(res.data);
  //             setLoading(false);
  //             console.log("testing", res.data);
  //           })
  //           .catch((error) => {
  //             console.log("error", error);
  //           });
  //         break;
  //       default:
  //         break;
  //     }

  //     setUpdateTable(false);
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [locId, testSumId, updateTable]);
  const [displayedRecords, setDisplayedRecords] = useState([]);
  useEffect(() => {
    if (updateTable || dataPulled.length === 0) {
      console.log("test???");
      setLoading(true)
      assertSelector
        .getDataTableApis(dataTableName, locationId, id)
        .then((res) => {
          finishedLoadingData(res.data);
          console.log("res", res.data);
          
          
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataTableName, locId, testSumId,updateTable]);

  useEffect(() => {
    if (updateTable || dataPulled.length > 0) {
      setDisplayedRecords(
        assertSelector.getDataTableRecords(dataPulled, dataTableName)
      );
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataPulled,updateTable]);

  const [show, setShow] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [selectedModalData, setSelectedModalData] = useState(null);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [dropdownsLoaded, setDropdownsLoaded] = useState(false);

  const [mainDropdownChange, setMainDropdownChange] = useState("");

  const [createNewData, setCreateNewData] = useState(false);
  const [prefilteredMdmData, setPrefilteredMdmData] = useState(false);

  const [complimentaryData, setComplimentaryData] = useState([]);

  const [returnedFocusToLast, setReturnedFocusToLast] = useState(false);
  const selectText = "-- Select a value --";

  const dropdownArrayIsEmpty = dropdownArray.length === 0;
  const nextExpandableRow = (name) => {
    switch (name) {
      case "Protocal Gas":
        return (
          <QAExpandableRowsRender
            payload={qaProtocalGasProps()["payload"]}
            dropdownArray={qaProtocalGasProps()["dropdownArray"]}
            columns={qaProtocalGasProps()["columnNames"]}
            controlInputs={qaProtocalGasProps()["controlInputs"]}
            controlDatePickerInputs={
              qaProtocalGasProps()["controlDatePickerInputs"]
            }
            dataTableName={qaProtocalGasProps()["dataTableName"]}
            extraControls={qaProtocalGasProps()["extraControls"]}
          />
        );
      // test  > injections
      case "Linearity Test":
        return (
          <QAExpandableRowsRender
            payload={qaLinearityInjectionProps()["payload"]}
            dropdownArray={qaLinearityInjectionProps()["dropdownArray"]}
            columns={qaLinearityInjectionProps()["columnNames"]}
            controlInputs={qaLinearityInjectionProps()["controlInputs"]}
            controlDatePickerInputs={
              qaLinearityInjectionProps()["controlDatePickerInputs"]
            }
            dataTableName={qaLinearityInjectionProps()["dataTableName"]}
            extraControls={qaLinearityInjectionProps()["extraControls"]}
          />
        );
        break;
      default:
        break;
    }
  };
  const loadDropdownsData = (dataTableName) => {
    let dropdowns = {};
    const allPromises = [];

    switch (dataTableName) {
      case "Protocal Gas":
      case "Linearity Test":
        allPromises.push(dmApi.getAllGasLevelCodes());
        allPromises.push(dmApi.getAllGasTypeCodes());
        Promise.all(allPromises).then((values) => {
          values.forEach((val, i) => {
            if (i == 0) {
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
        break;
      default:
        break;
    }
  };
  useEffect(() => {
    // Load MDM data (for dropdowns) only if we don't have them already
    if (!dropdownArrayIsEmpty && mdmData === null) {
      if (!dropdownsLoading) {
        loadDropdownsData(dataTableName);
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
    setReturnedFocusToLast(false);
    setShow(false);
    removeChangeEventListeners(".modalUserInput");
  };
  const finishedLoadingData = (loadedData) => {
    setDataPulled(loadedData);
    setDataLoaded(true);
    addAriaLabelToDatatable();
  };
  // Executed when "View" action is clicked
  const openModal = (row, bool, create) => {
    let selectedData = null;
    setCreateNewData(create);
    if (create) {
      controlInputs.gasLevelCode = [
        "Summary Type/Gas Level Code",
        "dropdown",
        "",
        "",
      ];
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

    if (!dropdownArrayIsEmpty) {
      setPrefilteredMdmData(mdmData[prefilteredDataName]);
    }

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
        extraControls
      )
    );

    setShow(true);
    setTimeout(() => {
      attachChangeEventListeners(".modalUserInput");
    });
  };

  const saveData = () => {
    const userInput = extractUserInput(payload, ".modalUserInput");

    // updateProtocolGas(locId, testSumId, selectedRow.id, userInput)
    //   .then((res) => {
    //     setUpdateTable(true);
    //     executeOnClose();
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
  };

  const createData = () => {
    const userInput = extractUserInput(payload, ".modalUserInput");
    // createProtocolGas(locId, testSumId, userInput)
    //   .then((res) => {
    //     console.log("res", res);
    //     if (Object.prototype.toString.call(res) === "[object Array]") {
    //       alert(res[0]);
    //     } else {
    //       setUpdateTable(true);
    //       executeOnClose();
    //     }
    //   })
    //   .catch((error) => {
    //     console.log("error", error);
    //   });
  };

  const onRemoveHandler = async (row) => {
    const { id: idToRemove, testSumId } = row;
    // try {
    //   const resp = await deleteProtocolGas(locId, testSumId, idToRemove);
    //   if (resp.status === 200) {
    //     const dataPostRemove = data.filter(
    //       (rowData) => rowData.id !== idToRemove
    //     );
    //     setDataPulled(dataPostRemove);
    //   }
    // } catch (error) {
    //   console.log("error deleting protocol gas", error);
    // }
  };

  return (
    <div className="padding-y-3">
      <div className={`usa-overlay ${show ? "is-visible" : ""}`} />
      {!loading ? (
        <QADataTableRender
          columnNames={columns}
          columnWidth={15}
          data={displayedRecords}
          openHandler={openModal}
          onRemoveHandler={onRemoveHandler}
          actionColumnName={
            user ? (
              <>
                <span className="padding-right-2">{dataTableName}</span>
                <Button
                  epa-testid="btnOpen"
                  className="text-white"
                  onClick={() => openModal(false, false, true)}
                >
                  Add
                </Button>
              </>
            ) : (
              { dataTableName }
            )
          }
          actionsBtn={"View"}
          user={user}
          evaluate={false}
          // expandableRowComp={
          //   expandable ? nextExpandableRow(dataTableName) : false
          // }
          noDataComp={
            user ? (
              <QADataTableRender
                columnNames={columns}
                columnWidth={15}
                data={[]}
                actionColumnName={
                  <>
                    <span className="padding-right-2">{dataTableName}</span>
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
              `There're no ${dataTableName}s records available.`
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

export default QAExpandableRowsRender;
