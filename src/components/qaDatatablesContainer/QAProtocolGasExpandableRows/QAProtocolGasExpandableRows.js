import React, { useState, useMemo, useEffect } from "react";
import {
  getProtocolGas,
  createProtocolGas,
  updateProtocolGas,
  deleteProtocolGas,
} from "../../../utils/api/qaCertificationsAPI.js";
import { getProtocolGasRecords } from "../../../utils/selectors/QACert/TestSummary.js";
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
// contains protocol gas data table

const QAProtocolGasExpandableRows = ({ user, locId, testSumId }) => {
  const [mdmData, setMdmData] = useState(null);
  const [dropdownsLoading, setDropdownsLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [protocolGas, setProtocolGas] = useState([]);
  const [updateTable, setUpdateTable] = useState(false);

  useEffect(() => {
    if (protocolGas.length === 0 || updateTable) {
      setLoading(true);
      getProtocolGas(locId, testSumId)
        .then((res) => {
          finishedLoadingData(res.data);
          setProtocolGas(res.data);
          setLoading(false);
        })
        .catch((error) => {
          console.log("error", error);
        });
      setUpdateTable(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locId, testSumId, updateTable]);

  const data = useMemo(() => {
    return getProtocolGasRecords(protocolGas);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [protocolGas]);

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
    "Gas Type Code",
    "Cylinder ID",
    "Vendor ID",
    "Expiration Date",
  ];

  const dataTableName = "Protocol Gas";
  const controlInputs = {
    gasLevelCode: ["Summary Type/Gas Level Code", "input", "", "locked"],
    gasTypeCode: ["Gas Type Code", "dropdown", "", ""],
    cylinderID: ["Cylinder ID", "input", "", ""],
    vendorID: ["Vendor ID", "input", "", ""],
    expirationDate: ["Expiration Date", "date", "", ""],
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
      gasTypeCode: null,
      cylinderID: null,
      vendorID: null,
      expirationDate: null,
    };
    const userInput = extractUserInput(payload, ".modalUserInput");

    updateProtocolGas(locId, testSumId, selectedRow.id, userInput)
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
      gasTypeCode: null,
      cylinderID: null,
      vendorID: null,
      expirationDate: null,
    };
    const userInput = extractUserInput(uiControls, ".modalUserInput");
    createProtocolGas(locId, testSumId, userInput)
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
      const resp = await deleteProtocolGas(locId, testSumId, idToRemove);
      if (resp.status === 200) {
        const dataPostRemove = protocolGas.filter(
          (rowData) => rowData.id !== idToRemove
        );
        setProtocolGas(dataPostRemove);
      }
    } catch (error) {
      console.log("error deleting protocol gas", error);
    }
  };

  return (
    <div className="padding-y-3">
      <div className={`usa-overlay ${show ? "is-visible" : ""}`} />
      {!loading ? (
        <QADataTableRender
          columnNames={columns}
          columnWidth={15}
          data={data}
          openHandler={openModal}
          onRemoveHandler={onRemoveHandler}
          actionColumnName={
            user ? (
              <>
                <span className="padding-right-2">Protocol Gas</span>
                <Button
                  epa-testid="btnOpen"
                  className="text-white"
                  onClick={() => openModal(false, false, true)}
                >
                  Add
                </Button>
              </>
            ) : (
              "Protocol Gas"
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
                    <span className="padding-right-2">Protocol Gas</span>
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
              "There're no protocol gas records available."
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

export default QAProtocolGasExpandableRows;
