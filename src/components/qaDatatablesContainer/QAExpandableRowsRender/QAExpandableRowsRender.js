import React, { useState, useEffect } from "react";

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
  qaAirEmissionsProps,
  qaProtocalGasProps,
  qaLinearityInjectionProps,
  qaRataSummaryProps,
  qaRataRunDataProps,
} from "../../../additional-functions/qa-dataTable-props";
const QAExpandableRowsRender = ({
  user,
  controlInputs,
  controlDatePickerInputs,
  extraControls,
  columns,
  dataTableName,
  dropdownArray,
  payload,
  expandable,
  radioBtnPayload,
  extraIDs, // [locid, testsumid, linsumid,   ]
  data,
}) => {
  const { locationId, id } = dataTableName !== "Protocol Gas" ? data : ""; // id / testsumid
  const [mdmData, setMdmData] = useState(null);
  const [dropdownsLoading, setDropdownsLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [updateTable, setUpdateTable] = useState(false);
  const [dataPulled, setDataPulled] = useState([]);

  const [displayedRecords, setDisplayedRecords] = useState([]);
  useEffect(() => {
    if (updateTable || (dataPulled && dataPulled.length === 0)) {
      setLoading(true);
      assertSelector
        .getDataTableApis(dataTableName, locationId, id, extraIDs)
        .then((res) => {
          console.log("res", res.data);
          finishedLoadingData(res.data);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataTableName, updateTable]);

  useEffect(() => {
    if (updateTable || (dataPulled && dataPulled.length > 0)) {
      setLoading(true);
      setDisplayedRecords(
        assertSelector.getDataTableRecords(dataPulled, dataTableName)
      );
    }
    setLoading(false);

    setUpdateTable(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataPulled, updateTable]);

  const [show, setShow] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [selectedModalData, setSelectedModalData] = useState(null);
  const [dropdownsLoaded, setDropdownsLoaded] = useState(false);

  // const [mainDropdownChange, setMainDropdownChange] = useState("");

  const [createNewData, setCreateNewData] = useState(false);
  // const [prefilteredMdmData, setPrefilteredMdmData] = useState(false);

  // const [returnedFocusToLast, setReturnedFocusToLast] = useState(false);
  const selectText = "-- Select a value --";

  const dropdownArrayIsEmpty = dropdownArray.length === 0;
  const nextExpandableRow = (name) => {
    console.log("expanded", name);
    switch (name) {
      case "Protocol Gas":
        const objGas = qaProtocalGasProps(data);
        return (
          <QAExpandableRowsRender
            payload={objGas["payload"]}
            dropdownArray={objGas["dropdownArray"]}
            columns={objGas["columnNames"]}
            controlInputs={objGas["controlInputs"]}
            controlDatePickerInputs={objGas["controlDatePickerInputs"]}
            dataTableName={objGas["dataTableName"]}
            extraControls={objGas["extraControls"]}
            data={data}
            user={user}
          />
        );
      case "Air Emissions":
        const objAirEms = qaAirEmissionsProps(data);
        return (
          <QAExpandableRowsRender
            payload={objAirEms["payload"]}
            dropdownArray={objAirEms["dropdownArray"]}
            columns={objAirEms["columnNames"]}
            controlInputs={objAirEms["controlInputs"]}
            controlDatePickerInputs={objAirEms["controlDatePickerInputs"]}
            dataTableName={objAirEms["dataTableName"]}
            extraControls={objAirEms["extraControls"]}
            data={data}
            user={user}
          />
        );
      // test  > injections
      case "Linearity Test":
        const idArr = [locationId, id];
        const obj = qaLinearityInjectionProps();
        return (
          <QAExpandableRowsRender
            payload={obj["payload"]}
            dropdownArray={obj["dropdownArray"]}
            columns={obj["columnNames"]}
            controlInputs={obj["controlInputs"]}
            controlDatePickerInputs={obj["controlDatePickerInputs"]}
            dataTableName={obj["dataTableName"]}
            extraControls={obj["extraControls"]}
            extraIDs={idArr}
            user={user}
          />
        );
      // rata data > rata summary > rata run
      case "RATA Data":
        const rataIdArray = [locationId, id];
        const rataSumObj = qaRataSummaryProps();
        return (
          <QAExpandableRowsRender
            payload={rataSumObj["payload"]}
            dropdownArray={rataSumObj["dropdownArray"]}
            columns={rataSumObj["columnNames"]}
            controlInputs={rataSumObj["controlInputs"]}
            controlDatePickerInputs={rataSumObj["controlDatePickerInputs"]}
            dataTableName={rataSumObj["dataTableName"]}
            extraControls={rataSumObj["extraControls"]}
            extraIDs={rataIdArray}
            expandable
            user={user}
          />
        );

      case "RATA Summary": // 3rd level 
        const rataRunIdArray = [...extraIDs, locationId, id];
        const rataRunObj = qaRataRunDataProps();
        return (
          <QAExpandableRowsRender
            payload={rataRunObj["payload"]}
            dropdownArray={rataRunObj["dropdownArray"]}
            columns={rataRunObj["columnNames"]}
            controlInputs={rataRunObj["controlInputs"]}
            controlDatePickerInputs={rataRunObj["controlDatePickerInputs"]}
            dataTableName={rataRunObj["dataTableName"]}
            extraControls={rataRunObj["extraControls"]}
            extraIDs={rataRunIdArray}
            expandable
            user={user}
          />
        );

      default:
        break;
    }
  };
  const loadDropdownsData = (name) => {
    let dropdowns = {};
    const allPromises = [];

    switch (name) {
      case "Protocol Gas":
      case "Linearity Test":
      case "Linearity Injection":
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
        break;
      case "RATA Data":
        allPromises.push(dmApi.getAllRataFreqCodes());
        Promise.all(allPromises).then((values) => {
          values.forEach((val, i) => {
            if (i === 0) {
              dropdowns[dropdownArray[i]] = val.data.map((d) => {
                return {
                  code: d["rataFrequencyCode"],
                  name: d["rataFrequencyCodeDescription"],
                };
              });
              dropdowns[dropdownArray[i]].unshift({
                code: "",
                name: "-- Select a value --",
              });
            }
          });

          dropdowns.numberOfLoadLevels = [
            { code: "", name: selectText },
            { code: 1, name: 1 },
            { code: 2, name: 2 },
            { code: 3, name: 3 },
          ];
          console.log(dropdowns, "dropdowns");
          setMdmData(dropdowns);
        });
        break;

      case "RATA Run Data":
        allPromises.push(dmApi.getAllRunStatusCodes());
        Promise.all(allPromises).then((response) => {
          dropdownArray.forEach((val, i) => {
            if (i === 0) {
              dropdowns[dropdownArray[i]] = response[0].data.map((d) => {
                return {
                  code: d["runStatusCode"],
                  name: d["runStatusCodeDescription"],
                };
              });
              dropdowns[dropdownArray[i]].unshift({
                code: "",
                name: "-- Select a value --",
              });
            }
          });
          console.log("dropdowns", dropdowns);
          setMdmData(dropdowns);
        });
        break;

      case "RATA Summary":
        allPromises.push(dmApi.getAllOperatingLevelCodes());
        allPromises.push(dmApi.getAllReferenceMethodCodes());
        allPromises.push(dmApi.getAllApsCodes());
        Promise.all(allPromises).then((response) => {
          dropdownArray.forEach((val, i) => {
            if (i === 0) {
              dropdowns[dropdownArray[i]] = response[0].data.map((d) => {
                return {
                  code: d["operatingLevelCode"],
                  name: d["operatingLevelCodeDescription"],
                };
              });
              dropdowns[dropdownArray[i]].unshift({
                code: "",
                name: "-- Select a value --",
              });
            } else if (i === 1 || i === 3) {
              dropdowns[dropdownArray[i]] = response[1].data.map((d) => {
                return {
                  code: d["referenceMethodCode"],
                  name: d["referenceMethodCodeDescription"],
                };
              });
              dropdowns[dropdownArray[i]].unshift({
                code: "",
                name: "-- Select a value --",
              });
            } else {
              dropdowns[dropdownArray[i]] = response[2].data.map((d) => {
                return {
                  code: d["apsCode"],
                  name: d["apsCodeDescription"],
                };
              });
              dropdowns[dropdownArray[i]].unshift({
                code: "",
                name: "-- Select a value --",
              });
            }
          });
          console.log("dropdowns", dropdowns);
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
      if (dataTableName === "Rata Data") {
        mdmData.numberOfLoadLevels = [
          { code: "", name: selectText },
          { code: 1, name: 1 },
          { code: 2, name: 2 },
          { code: 3, name: 3 },
        ];
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    // setReturnedFocusToLast(false);
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
      if (dataTableName === "Linearity Test") {
        controlInputs.gasLevelCode = ["Gas Level Code", "dropdown", "", ""];
      }
      if (dataTableName === "Rata Data") {
        console.log("control inputs", controlInputs);
        controlInputs.numberOfLoadLevels = [
          "Number of Load Levels",
          "dropdown",
          "",
          "",
        ];
      }
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

  const saveData = async () => {
    const userInput = extractUserInput(
      payload,
      ".modalUserInput",
      radioBtnPayload
    );

    assertSelector
      .saveDataSwitch(userInput, dataTableName, locationId, id, extraIDs)
      .then((res) => {
        console.log(res.data);
        setUpdateTable(true);
        executeOnClose();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const createData = () => {
    const userInput = extractUserInput(payload, ".modalUserInput");
    assertSelector
      .createDataSwitch(userInput, dataTableName, locationId, id, extraIDs)
      .then((res) => {
        console.log(res.data, "create");
        setUpdateTable(true);
        executeOnClose();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const onRemoveHandler = async (row) => {
    try {
      const resp = await assertSelector.removeDataSwitch(row, dataTableName, locationId, id, extraIDs)
      if (resp.status === 200) {
        const dataPostRemove = dataPulled.filter(
          (rowData) => rowData.id !== row.id
        );
        setDisplayedRecords(dataPostRemove)
        executeOnClose()
      }
    } catch (error) {
      console.log("error deleting data", error);
    }
  };

  const getFirstLevelExpandables = () =>{
    const expandables = [];
    switch(dataTableName){
      case 'Linearity Test':
        expandables.push(nextExpandableRow("Protocol Gas"));
        break;
      case 'RATA Data':
        expandables.push(nextExpandableRow("Protocol Gas"));
        expandables.push(nextExpandableRow("Air Emissions"));
        break;
      default:
        break;
    }
    console.log("dataTableName",dataTableName);
    console.log("expandables",expandables);
    return expandables;
  }

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
          user={user}
          actionsBtn={"View"}
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
              dataTableName
            )
          }
          evaluate={false}
          expandableRowComp={
            expandable ? nextExpandableRow(dataTableName) : false
          }
          // shows empty table with add if user is logged in
          noDataComp={
            user ? (
              <div>
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
              </div>
            ) : (
              `There're no ${dataTableName} records available.`
            )
          }
        />
      ) : (
        <Preloader />
      )}
      {
       [...getFirstLevelExpandables(dataTableName)] 
      }
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
