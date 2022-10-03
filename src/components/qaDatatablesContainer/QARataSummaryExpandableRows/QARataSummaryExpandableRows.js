import React, { useState, useMemo, useEffect } from "react";
import {
  getRataSummary,
  createRataSummary,
  updateRataSummary,
  deleteRataSummary
} from "../../../utils/api/qaCertificationsAPI.js";
import { mapRataSummaryToRows } from "../../../utils/selectors/QACert/TestSummary.js";
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
// contains rata summary data table

import QARataRunDataExpandableRows from "../QARataRunDataExpandableRows/QARataRunDataExpandableRows.js";

const QARataSummaryExpandableRows = ({
  user,
  locId,
  testSumId,
  data
}) => {
  const rataId = data.id;
  const [mdmData, setMdmData] = useState(null);
  const [dropdownsLoading, setDropdownsLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [updateTable, setUpdateTable] = useState(false);
  const [rataSummaryData, setRataSummaryData] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const resp = await getRataSummary(locId, testSumId, rataId)
        finishedLoadingData(resp.data)
        setRataSummaryData(resp.data)
        setLoading(false)
      } catch (error) {
        console.log(error)
      }
      setUpdateTable(false);
    }

    if (rataSummaryData.length === 0 || updateTable) {
      fetchData()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locId, testSumId, updateTable]);

  const rowData = useMemo(() => {
    return mapRataSummaryToRows(rataSummaryData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rataSummaryData]);

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
  const dropdownArray = ['operatingLevelCode', 'referenceMethodCode', 'apsCode', 'co2OrO2ReferenceMethodCode'];
  const dropdownArrayIsEmpty = dropdownArray.length === 0;

  const dataTableName = "RATA Summary";
  const columns = [
    'Operating Level Code',
    'Reference Method Code',
    'APS Indicator',
    'APS Code',
    'Relative Accuracy',
    'CO2 or O2 Reference Method Code',
  ];

  // controls modal detail form inputs
  const controlInputs = {
    operatingLevelCode: ["Operating Level Code", "dropdown", "", ""],
    averageGrossUnitLoad: ["Average Gross Unit Load", "input", "", ""],
    referenceMethodCode: ["Reference Method Code", "dropdown", "", ""],
    meanCEMValue: ["Mean CEM Value", "input", "", ""],
    meanRATAReferenceValue: ["Mean RATA Reference Value", "input", "", ""],
    meanDifference: ["Mean Difference", "input", "", ""],
    standardDeviationDifference: ["Standard Deviation Difference", "input", "", ""],
    confidenceCoefficient: ["Confidence Coefficient", "input", "", ""],
    tValue: ["T-Value", "input", "", ""],
    apsIndicator: ["APS Indicator", "radio", "", ""],
    apsCode: ["APS Code", "dropdown", "", ""],
    relativeAccuracy: ["Relative Accuracy", "input", "", ""],
    biasAdjustmentFactor: ["Bias Adjustment Factor", "input", "", ""],
    co2OrO2ReferenceMethodCode: ["CO2 or O2 Reference Method Code", "dropdown", "", ""],
    stackDiameter: ["Stack Diameter", "input", "", ""],
    stackArea: ["Stack Area", "input", "", ""],
    numberOfTraversePoints: ["Number of Traverse Points", "input", "", ""],
    calculatedWAF: ["Calculated WAF", "input", "", ""],
  };
  const loadDropdownsData = () =>{
    let dropdowns = {};
    const allPromises = [];
    allPromises.push(dmApi.getAllOperatingLevelCodes());
    allPromises.push(dmApi.getAllReferenceMethodCodes());
    allPromises.push(dmApi.getAllApsCodes());
    Promise.all(allPromises).then((response) => {
      dropdownArray.forEach((val, i) =>{
        if(i===0){
          dropdowns[dropdownArray[i]] = 
          response[0].data.map(d => {
            return {
              code: d["operatingLevelCode"],
              name: d["operatingLevelDescription"],
            };
          });
          dropdowns[dropdownArray[i]].unshift({ code: "", name: "-- Select a value --" });
        }else if(i===1 || i===3){
          dropdowns[dropdownArray[i]] = 
          response[1].data.map(d => {
            return {
              code: d["referenceMethodCode"],
              name: d["referenceMethodDescription"],
            };
          });
          dropdowns[dropdownArray[i]].unshift({ code: "", name: "-- Select a value --" });
        }else {
          dropdowns[dropdownArray[i]] = 
          response[2].data.map(d => {
            return {
              code: d["apsCode"],
              name: d["apsDescription"],
            };
          });
          dropdowns[dropdownArray[i]].unshift({ code: "", name: "-- Select a value --" });
        }
      });
      setMdmData(dropdowns);
    });
  };
  useEffect(() => {
    // Load MDM data (for dropdowns) only if we don't have them already
    if (!dropdownArrayIsEmpty && mdmData === null) {
      if(!dropdownsLoading){
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
    const uiControls = {}
    Object.keys(controlInputs).forEach((key) => { uiControls[key] = null });
    const userInput = extractUserInput( uiControls, ".modalUserInput", ["apsIndicator"]); 
    updateRataSummary(locId, testSumId, rataId, selectedRow.id, userInput)
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

  const createData = async () => {
    const uiControls = {}
    Object.keys(controlInputs).forEach((key) => { uiControls[key] = null });
    const userInput = extractUserInput(uiControls, ".modalUserInput", ["apsIndicator"]);
    createRataSummary(locId, testSumId, rataId, userInput)
      .then((res) => {
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
    const { id: idToRemove } = row;
    try {
      const resp = await deleteRataSummary(
        locId,
        testSumId,
        rataId,
        idToRemove
      );
      if (resp.status === 200) {
        const dataPostRemove = rataSummaryData.filter(curRowData => curRowData.id !== idToRemove);
        setRataSummaryData(dataPostRemove)
      }
    } catch (error) {
      console.log('error deleting rata summary', error);
    }
  };

  return (
    <div className="padding-y-3 padding-left-1">
      <div className={`usa-overlay ${show ? "is-visible" : ""}`} />
      {!loading ? (
        <QADataTableRender
          columnNames={columns}
          columnWidth={15}
          data={rowData}
          openHandler={openModal}
          onRemoveHandler={onRemoveHandler}
          expandableRowComp={<QARataRunDataExpandableRows
            user={user}
            locId={locId}
            rataId={rataId}
            testSumId={testSumId}
          />}
          actionColumnName={
            user ?
              <>
                <span className="padding-right-2">
                  {dataTableName}
                </span>
                <Button
                  epa-testid="btnOpen"
                  className="text-white"
                  onClick={() => openModal(false, false, true)}
                >
                  Add
                </Button>
              </>
              : dataTableName
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
                      <span className="padding-right-2">{dataTableName}</span>
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
              />) : "There're no RATA summary records available."
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

export default QARataSummaryExpandableRows;
