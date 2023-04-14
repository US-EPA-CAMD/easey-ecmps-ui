import React, { useState, useMemo, useEffect } from "react";

import {
  getQATestSummary,
  updateQALinearityTestSummary,
  deleteQATestSummary,
  createQATestData,
} from "../../../utils/api/qaCertificationsAPI.js";
import { getTestSummary } from "../../../utils/selectors/QACert/TestSummary.js";
import Modal from "../../Modal/Modal";
import ModalDetails from "../../ModalDetails/ModalDetails";
import { extractUserInput } from "../../../additional-functions/extract-user-input";
import { modalViewData } from "../../../additional-functions/create-modal-input-controls";
import {
  qaLinearitySummaryProps,
  qaRataDataProps,
  qaAppendixECorrelationSummaryTestProps,
  qaFuelFlowToLoadProps,
  qaFuelFlowToLoadBaselineProps,
  qaFlowToLoadCheckProps,
  qaOnOffCalibrationProps,
  qaCalibrationInjectionProps,
  qaFuelFlowmeterAccuracyDataProps,
  qaCycleTimeSummaryProps,
  qaTransmitterTransducerAccuracyDataProps,
  qaFlowToLoadReferenceProps,
  qaUnitDefaultTestDataProps,
  qaHgSummaryDataProps,
} from "../../../additional-functions/qa-dataTable-props";
import {
  attachChangeEventListeners,
  removeChangeEventListeners,
  unsavedDataMessage,
} from "../../../additional-functions/prompt-to-save-unsaved-changes";

/*********** COMPONENTS ***********/

import QADataTableRender from "../../QADataTableRender/QADataTableRender.js";
import { Button } from "@trussworks/react-uswds";
import { Preloader } from "@us-epa-camd/easey-design-system";
import {
  getQAColsByTestCode,
  getQAModalDetailsByTestCode,
} from "../../../utils/selectors/QACert/LinearitySummary.js";
import * as dmApi from "../../../utils/api/dataManagementApi";
import * as mpApi from "../../../utils/api/monitoringPlansApi.js";
import { organizePrefilterMDMData } from "../../../additional-functions/retrieve-dropdown-api";

import QAExpandableRowsRender from "../QAExpandableRowsRender/QAExpandableRowsRender";
import {
  returnsFocusDatatableViewBTN,
  returnsFocusToAddBtn,
} from "../../../additional-functions/ensure-508.js";

// contains test summary data table

const QATestSummaryDataTable = ({
  locationSelectValue,
  user,
  nonEditable = false,
  showModal = false,
  selectedTestCode,
  isCheckedOut,
  sectionSelect,
  selectedLocation,
  orisCode,
  locations,
  updateTable,
  setUpdateTable,
}) => {
  const [loading, setLoading] = useState(false);
  const [mdmData, setMdmData] = useState(null);
  const [dropdownsLoading, setDropdownsLoading] = useState(false);
  const [qaTestSummary, setQATestSummary] = useState([]);
  const [dataPulled, setDataPulled] = useState([]);
  const [show, setShow] = useState(showModal);
  const [selectedRow, setSelectedRow] = useState(null);
  const [clickedIndex, setClickedIndex] = useState(null);
  const [selectedModalData, setSelectedModalData] = useState(null);
  const [dropdownsLoaded, setDropdownsLoaded] = useState(false);
  const [createdId, setCreatedId] = useState(null);

  const [mainDropdownChange, setMainDropdownChange] = useState("");

  const [createNewData, setCreateNewData] = useState(false);
  const [prefilteredMdmData, setPrefilteredMdmData] = useState(false);

  // setUpdateTable(updateTable ? updateTable : false)

  const [allTestTypeCodes, setAllTestTypeCodes] = useState(null);
  const selectText = "-- Select a value --";
  const miscellaneousTestTypes = [
    "DAHS",
    "LEAK",
    "OTHER",
    "PEMSACC",
    "DGFMCAL",
    "MFMCAL",
    "BCAL",
    "QGA",
    "TSCAL",
  ];
  //*****
  // pull these out and make components reuseable like monitoring plan
  const [dropdownArray, setDropdownArray] = useState([
    [
      "testTypeCode",
      "spanScaleCode",
      "testReasonCode",
      "testResultCode",
      selectedLocation.unitId ? "unitId" : "stackPipeId",
      "componentID",
      "monitoringSystemID",
      "prefilteredTestSummaries",
    ],
  ]);
  const dropdownArrayIsEmpty = dropdownArray[0].length === 0;

  const dataTableName = "Test Summary Data";

  useEffect(() => {
    setDropdownArray([
      [
        "testTypeCode",
        "spanScaleCode",
        "testReasonCode",
        "testResultCode",
        selectedLocation.unitId ? "unitId" : "stackPipeId",
        "componentID",
        "monitoringSystemID",
        "prefilteredTestSummaries",
      ],
    ]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedLocation.name]);

  useEffect(() => {
    loadDropdownsData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dropdownArray]);

  //**** */
  useEffect(() => {
    if (updateTable || qaTestSummary.length <= 0 || locationSelectValue) {
      const { testTypeCodes, testTypeGroupCode } = selectedTestCode;
      if (testTypeGroupCode && testTypeCodes?.length > 0) {
        setLoading(true);
        getQATestSummary(locationSelectValue, testTypeCodes)
          .then((res) => {
            if (res !== undefined && res.data.length > 0) {
              finishedLoadingData(res.data);
              setQATestSummary(res.data);
              setShow(false);
            } else {
              finishedLoadingData([]);
              setQATestSummary([]);
            }
            setLoading(false);
          })
          .catch((error) => {
            console.log("error fetching test summary", error);
          });
        setUpdateTable(false);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locationSelectValue, updateTable, selectedTestCode]);

  const getOptions = (obj, code, name) => {
    return {
      code: obj[code],
      name: obj[name],
    };
  };

  const loadDropdownsData = () => {
    //if(mdmData === null){
    setDropdownsLoading(true);
    let dropdowns = {};
    const allPromises = [];
    allPromises.push(dmApi.getAllTestTypeCodes());
    allPromises.push(dmApi.getAllSpanScaleCodes());
    allPromises.push(dmApi.getAllTestReasonCodes());
    allPromises.push(dmApi.getAllTestResultCodes());
    allPromises.push(dmApi.getPrefilteredTestSummaries());
    allPromises.push(mpApi.getMonitoringComponents(locationSelectValue));
    allPromises.push(mpApi.getMonitoringSystems(locationSelectValue));
    Promise.all(allPromises).then((response) => {
      dropdownArray[0].forEach((val, i) => {
        if (i === 0) {
          const options = response[0].data.map((d) =>
            getOptions(d, "testTypeCode", "testTypeDescription")
          );
          setAllTestTypeCodes(options);
          dropdowns[dropdownArray[0][i]] = options.filter((option) =>
            selectedTestCode.testTypeCodes.includes(option.code)
          );
        } else if (i === 1) {
          dropdowns[dropdownArray[0][i]] = response[1].data.map((d) =>
            getOptions(d, "spanScaleCode", "spanScaleDescription")
          );
        } else if (i === 2) {
          dropdowns[dropdownArray[0][i]] = response[2].data.map((d) =>
            getOptions(d, "testReasonCode", "testReasonDescription")
          );
        } else if (i === 3) {
          dropdowns[dropdownArray[0][i]] = response[3].data.map((d) =>
            getOptions(d, "testResultCode", "testResultDescription")
          );
        } else if (i === 5) {
          dropdowns[dropdownArray[0][i]] = response[5].data.map((d) =>
            getOptions(d, "componentId", "componentId")
          );
        } else if (i === 6) {
          dropdowns[dropdownArray[0][i]] = response[6].data.map((d) =>
            getOptions(d, "monitoringSystemId", "monitoringSystemId")
          );
        } else if (i === 7) {
          let noDupesTestCodes = response[4].data.map((code) => {
            return code["testTypeCode"];
          });
          noDupesTestCodes = [...new Set(noDupesTestCodes)];
          dropdowns[dropdownArray[0][i]] = organizePrefilterMDMData(
            noDupesTestCodes,
            "testTypeCode",
            response[4].data
          );
        } else if (i === 4) {
          dropdowns[dropdownArray[0][i]] = locations.map((l) => {
            if (l.type === "unit") {
              return {
                code: l.unitId,
                name: l.unitId,
              };
            } else {
              return {
                code: l.stackPipeId,
                name: l.stackPipeId,
              };
            }
          });
        }
        if (i !== 0) {
          dropdowns[dropdownArray[0][i]].unshift({
            code: "",
            name: "-- Select a value --",
          });
        }
      });
      setMdmData(dropdowns);
      setDropdownsLoaded(true);
      setDropdownsLoading(false);
    });
  };
  useEffect(() => {
    const { testTypeCodes, testTypeGroupCode } = selectedTestCode;
    if (mdmData === null) {
      if (testTypeGroupCode) {
        loadDropdownsData();
      }
    } else {
      const mdmDataClone = { ...mdmData };

      mdmDataClone["testTypeCode"] = allTestTypeCodes.filter((option) =>
        testTypeCodes.includes(option.code)
      );

      setMdmData(mdmDataClone);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedTestCode]);

  useEffect(() => {
    // Update all the "secondary dropdowns" (based on the "main" dropdown)
    const prefilteredDataName = dropdownArray[0][0];
    if (prefilteredMdmData) {
      let currentTestTypeCode;
      if (
        mainDropdownChange === "" ||
        (selectedTestCode.testTypeCodes[0] !== "DAHS" &&
          miscellaneousTestTypes.includes(mainDropdownChange))
      ) {
        currentTestTypeCode = selectedTestCode.testTypeCodes[0];
      } else {
        currentTestTypeCode = mainDropdownChange;
      }
      const result = prefilteredMdmData.filter(
        (prefiltered) =>
          prefiltered[prefilteredDataName] === currentTestTypeCode
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

  const columns = getQAColsByTestCode(selectedTestCode.testTypeGroupCode, user);
  const { controlInputs, extraControlInputs, controlDatePickerInputs } =
    getQAModalDetailsByTestCode(
      selectedTestCode.testTypeGroupCode,
      selectedLocation
    );

  // prefilters the test type code dropdown based on group selection
  useEffect(() => {
    if (dropdownsLoaded) {
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
        setPrefilteredMdmData(filteredOutSubDropdownOptions);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedTestCode, dropdownsLoaded]);

  const data = useMemo(() => {
    return getTestSummary(qaTestSummary, columns, orisCode);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [qaTestSummary]);

  const finishedLoadingData = (loadedData) => {
    setDataPulled(loadedData);
    // setDataLoaded(true);
  };
  // Executed when "View" action is clicked
  const openModal = (row, bool, create, index) => {
    let selectedData = {};
    setCreateNewData(create);
    if (dataPulled.length > 0 && !create) {
      selectedData = dataPulled.filter(
        (element) => element.id === row[`id`]
      )[0];
      setSelectedRow(selectedData);
    }

    if (create) {
      if (controlInputs?.unitId) {
        controlInputs.unitId = [
          "Unit or Stack Pipe ID",
          "input",
          selectedLocation.name,
          "fixed",
        ];
        selectedData.unitId = selectedLocation.name;
      } else {
        controlInputs.stackPipeId = [
          "Unit or Stack Pipe ID",
          "input",
          selectedLocation.name,
          "fixed",
        ];
        selectedData.stackPipeId = selectedLocation.name;
      }
      selectedData.locationName = selectedLocation.name;
      // default selection to single test type code if it exists
      const testTypeCodeKey = "testTypeCode";
      if (mdmData[testTypeCodeKey]?.length === 1) {
        const singleTestTypeCodeSelection = mdmData[testTypeCodeKey][0].code;
        selectedData = {
          ...selectedData,
          testTypeCode: singleTestTypeCodeSelection,
        };
      }
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
    const modalData = modalViewData(
      selectedData,
      controlInputs,
      controlDatePickerInputs,
      create,
      mdmData,
      prefilteredDataName
        ? mdmData[prefilteredDataName]
        : "defaultPrefilteredDataName",
      mainDropdownName,
      mainDropdownResult,
      hasMainDropdown,
      prefilteredTotalName,
      extraControlInputs
    );
    setSelectedModalData(modalData);
    setClickedIndex(index);

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
    if (createNewData) {
      returnsFocusToAddBtn(dataTableName.replaceAll(" ", "-"));
    }
  };

  const executeOnClose = (data) => {
    setShow(false);
    removeChangeEventListeners(".modalUserInput");

    const updatedData = getTestSummary(data ? data : [], columns, orisCode);
    const idx = updatedData.findIndex((d) => d.id === createdId);

    if (idx >= 0) {
      returnsFocusDatatableViewBTN(dataTableName.replaceAll(" ", "-"), idx);
      setCreatedId(null);
      setCreateNewData(false);
    } else {
      returnsFocusDatatableViewBTN(
        dataTableName.replaceAll(" ", "-"),
        clickedIndex
      );
    }
  };

  const onRemoveHandler = async (row) => {
    const { id, locationId } = row;
    const resp = await deleteQATestSummary(locationId, id);
    if (resp.status === 200) {
      returnsFocusToAddBtn(dataTableName.replaceAll(" ", "-"));
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
    componentID: "string",
    monitoringSystemID: "string",
    spanScaleCode: null,
    testNumber: "string",
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
    if (selectedLocation.unitId) {
      userInput.unitId = selectedLocation.unitId;
    } else {
      userInput.stackPipeId = selectedLocation.stackPipeId;
    }
    updateQALinearityTestSummary(locationSelectValue, userInput.id, userInput)
      .then((res) => {
        if (Object.prototype.toString.call(res) === "[object Array]") {
          alert(res[0]);
          uiControls.componentID = "string";
          uiControls.monitoringSystemID = "string";
          uiControls.testNumber = "string";
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
    let selectedLocationId = locationSelectValue;
    locations.forEach((loc) => {
      if (userInput.unitId) {
        if (loc.unitId === String(userInput.unitId)) {
          userInput.unitId = loc.unitId;
          userInput.stackPipeId = null;
          selectedLocationId = loc.id;
        } else if (loc.stackPipeId === String(userInput.unitId)) {
          userInput.stackPipeId = loc.stackPipeId;
          userInput.unitId = null;
          selectedLocationId = loc.id;
        }
      } else if (userInput.stackPipeId) {
        if (loc.unitId === String(userInput.stackPipeId)) {
          userInput.unitId = loc.unitId;
          userInput.stackPipeId = null;
          selectedLocationId = loc.id;
        } else if (loc.stackPipeId === String(userInput.stackPipeId)) {
          userInput.stackPipeId = loc.stackPipeId;
          userInput.unitId = null;
          selectedLocationId = loc.id;
        }
      }
    });
    createQATestData(selectedLocationId, userInput)
      .then((res) => {
        if (Object.prototype.toString.call(res) === "[object Array]") {
          alert(res[0]);
          uiControls.componentID = "string";
          uiControls.monitoringSystemID = "string";
          uiControls.testNumber = "string";
        } else {
          setCreatedId(res.data.id);
          setUpdateTable(true);
        }
      })
      .catch((error) => {
        console.error("error", error);
        returnsFocusToAddBtn(dataTableName.replaceAll(" ", "-"));
      });
  };

  // add here for future test type code selection dts
  const getExpandableComponent = (testTypeGroupCode, props) => {
    switch (testTypeGroupCode) {
      case "LINSUM":
        const obj = qaLinearitySummaryProps();
        return (
          <QAExpandableRowsRender
            payload={obj["payload"]}
            dropdownArray={obj["dropdownArray"]}
            columns={obj["columnNames"]}
            controlInputs={obj["controlInputs"]}
            controlDatePickerInputs={obj["controlDatePickerInputs"]}
            dataTableName={obj["dataTableName"]}
            sectionSelect={sectionSelect}
            extraControls={obj["extraControls"]}
            radioBtnPayload={obj["radioBtnPayload"]}
            expandable
            {...props}
            extraIDs={null}
            isCheckedOut={isCheckedOut}
          />
        );
      // return <QALinearitySummaryExpandableRows {...props} />;

      case "RELACC":
        const rataObj = qaRataDataProps();
        return (
          <QAExpandableRowsRender
            payload={rataObj["payload"]}
            dropdownArray={rataObj["dropdownArray"]}
            columns={rataObj["columnNames"]}
            controlInputs={rataObj["controlInputs"]}
            controlDatePickerInputs={rataObj["controlDatePickerInputs"]}
            dataTableName={rataObj["dataTableName"]}
            sectionSelect={sectionSelect}
            extraControls={rataObj["extraControls"]}
            radioBtnPayload={rataObj["radioBtnPayload"]}
            expandable
            {...props}
            extraIDs={null}
            isCheckedOut={isCheckedOut}
          />
        );
      case "APPESUM":
        const appESum = qaAppendixECorrelationSummaryTestProps();
        return (
          <QAExpandableRowsRender
            payload={appESum["payload"]}
            dropdownArray={appESum["dropdownArray"]}
            columns={appESum["columnNames"]}
            controlInputs={appESum["controlInputs"]}
            controlDatePickerInputs={appESum["controlDatePickerInputs"]}
            dataTableName={appESum["dataTableName"]}
            sectionSelect={sectionSelect}
            extraControls={appESum["extraControls"]}
            radioBtnPayload={appESum["radioBtnPayload"]}
            expandable
            {...props}
            extraIDs={null}
            isCheckedOut={isCheckedOut}
          />
        );

      case "FFL": // Fuel Flow to Load
        const fflProps = qaFuelFlowToLoadProps();
        return (
          <QAExpandableRowsRender
            payload={fflProps["payload"]}
            dropdownArray={fflProps["dropdownArray"]}
            mdmProps={fflProps["mdmProps"]}
            columns={fflProps["columnNames"]}
            controlInputs={fflProps["controlInputs"]}
            controlDatePickerInputs={fflProps["controlDatePickerInputs"]}
            dataTableName={fflProps["dataTableName"]}
            sectionSelect={sectionSelect}
            extraControls={fflProps["extraControls"]}
            radioBtnPayload={fflProps["radioBtnPayload"]}
            expandable
            {...props}
            extraIDs={null}
            isCheckedOut={isCheckedOut}
          />
        );
      case "FFLB":
        const fflbProps = qaFuelFlowToLoadBaselineProps();
        return (
          <QAExpandableRowsRender
            payload={fflbProps["payload"]}
            dropdownArray={fflbProps["dropdownArray"]}
            mdmProps={fflbProps["mdmProps"]}
            columns={fflbProps["columnNames"]}
            controlInputs={fflbProps["controlInputs"]}
            controlDatePickerInputs={fflbProps["controlDatePickerInputs"]}
            dataTableName={fflbProps["dataTableName"]}
            sectionSelect={sectionSelect}
            extraControls={fflbProps["extraControls"]}
            radioBtnPayload={fflbProps["radioBtnPayload"]}
            expandable
            {...props}
            extraIDs={null}
            isCheckedOut={isCheckedOut}
          />
        );
      case "FLC": // Flow to Load Check
        const flcProps = qaFlowToLoadCheckProps();
        return (
          <QAExpandableRowsRender
            payload={flcProps["payload"]}
            dropdownArray={flcProps["dropdownArray"]}
            mdmProps={flcProps["mdmProps"]}
            columns={flcProps["columnNames"]}
            controlInputs={flcProps["controlInputs"]}
            dataTableName={flcProps["dataTableName"]}
            sectionSelect={sectionSelect}
            expandable
            {...props}
            extraIDs={null}
            isCheckedOut={isCheckedOut}
          />
        );
      case "OLOLCAL": // Online Offline Calibration
        const onOffCalProps = qaOnOffCalibrationProps();
        return (
          <QAExpandableRowsRender
            payload={onOffCalProps["payload"]}
            dropdownArray={onOffCalProps["dropdownArray"]}
            mdmProps={onOffCalProps["mdmProps"]}
            columns={onOffCalProps["columnNames"]}
            controlInputs={onOffCalProps["controlInputs"]}
            controlDatePickerInputs={onOffCalProps["controlDatePickerInputs"]}
            dataTableName={onOffCalProps["dataTableName"]}
            sectionSelect={sectionSelect}
            expandable
            {...props}
            extraIDs={null}
            isCheckedOut={isCheckedOut}
          />
        );
      case "CALINJ":
        const cjProps = qaCalibrationInjectionProps();
        return (
          <QAExpandableRowsRender
            payload={cjProps["payload"]}
            dropdownArray={cjProps["dropdownArray"]}
            mdmProps={cjProps["mdmProps"]}
            columns={cjProps["columnNames"]}
            controlInputs={cjProps["controlInputs"]}
            controlDatePickerInputs={cjProps["controlDatePickerInputs"]}
            radioBtnPayload={cjProps["radioBtnPayload"]}
            dataTableName={cjProps["dataTableName"]}
            sectionSelect={sectionSelect}
            extraControls={cjProps["extraControls"]}
            extraIDs={null}
            user={user}
            isCheckedOut={isCheckedOut}
          />
        );
      case "FFACC": // Fuel Flowmeter Accuracy
        const fuelFlowmeterAccuracyDataProps =
          qaFuelFlowmeterAccuracyDataProps();
        return (
          <QAExpandableRowsRender
            payload={fuelFlowmeterAccuracyDataProps["payload"]}
            dropdownArray={fuelFlowmeterAccuracyDataProps["dropdownArray"]}
            mdmProps={fuelFlowmeterAccuracyDataProps["mdmProps"]}
            columns={fuelFlowmeterAccuracyDataProps["columnNames"]}
            controlInputs={fuelFlowmeterAccuracyDataProps["controlInputs"]}
            controlDatePickerInputs={
              fuelFlowmeterAccuracyDataProps["controlDatePickerInputs"]
            }
            radioBtnPayload={fuelFlowmeterAccuracyDataProps["radioBtnPayload"]}
            dataTableName={fuelFlowmeterAccuracyDataProps["dataTableName"]}
            sectionSelect={sectionSelect}
            extraControls={fuelFlowmeterAccuracyDataProps["extraControls"]}
            extraIDs={null}
            user={user}
            isCheckedOut={isCheckedOut}
          />
        );
      case "CYCSUM": // Cycle Time Summary Nested Below Test Data
        const cycleTimeSum = qaCycleTimeSummaryProps();
        return (
          <QAExpandableRowsRender
            payload={cycleTimeSum["payload"]}
            dropdownArray={cycleTimeSum["dropdownArray"]}
            mdmProps={cycleTimeSum["mdmProps"]}
            columns={cycleTimeSum["columnNames"]}
            controlInputs={cycleTimeSum["controlInputs"]}
            controlDatePickerInputs={cycleTimeSum["controlDatePickerInputs"]}
            radioBtnPayload={cycleTimeSum["radioBtnPayload"]}
            dataTableName={cycleTimeSum["dataTableName"]}
            sectionSelect={sectionSelect}
            extraControls={cycleTimeSum["extraControls"]}
            expandable
            {...props}
            extraIDs={null}
            user={user}
            isCheckedOut={isCheckedOut}
          />
        );
      case "TTACC":
        const transmitterTransducerAccuracyDataProps =
          qaTransmitterTransducerAccuracyDataProps();
        return (
          <QAExpandableRowsRender
            payload={transmitterTransducerAccuracyDataProps["payload"]}
            dropdownArray={
              transmitterTransducerAccuracyDataProps["dropdownArray"]
            }
            mdmProps={transmitterTransducerAccuracyDataProps["mdmProps"]}
            columns={transmitterTransducerAccuracyDataProps["columnNames"]}
            controlInputs={
              transmitterTransducerAccuracyDataProps["controlInputs"]
            }
            controlDatePickerInputs={
              transmitterTransducerAccuracyDataProps["controlDatePickerInputs"]
            }
            radioBtnPayload={
              transmitterTransducerAccuracyDataProps["radioBtnPayload"]
            }
            dataTableName={
              transmitterTransducerAccuracyDataProps["dataTableName"]
            }
            sectionSelect={sectionSelect}
            extraControls={
              transmitterTransducerAccuracyDataProps["extraControls"]
            }
            expandable
            {...props}
            extraIDs={null}
            user={user}
            isCheckedOut={isCheckedOut}
          />
        );
      case "FLR":
        const flowToLoadReferenceProps = qaFlowToLoadReferenceProps();
        return (
          <QAExpandableRowsRender
            payload={flowToLoadReferenceProps["payload"]}
            dropdownArray={flowToLoadReferenceProps["dropdownArray"]}
            mdmProps={flowToLoadReferenceProps["mdmProps"]}
            columns={flowToLoadReferenceProps["columnNames"]}
            controlInputs={flowToLoadReferenceProps["controlInputs"]}
            controlDatePickerInputs={
              flowToLoadReferenceProps["controlDatePickerInputs"]
            }
            radioBtnPayload={flowToLoadReferenceProps["radioBtnPayload"]}
            dataTableName={flowToLoadReferenceProps["dataTableName"]}
            sectionSelect={sectionSelect}
            extraControls={flowToLoadReferenceProps["extraControls"]}
            expandable
            {...props}
            extraIDs={null}
            user={user}
            isCheckedOut={isCheckedOut}
          />
        );
      case "LME": //unit default test
        const unitDefaultTestDataProps = qaUnitDefaultTestDataProps();
        return (
          <QAExpandableRowsRender
            payload={unitDefaultTestDataProps["payload"]}
            dropdownArray={unitDefaultTestDataProps["dropdownArray"]}
            mdmProps={unitDefaultTestDataProps["mdmProps"]}
            columns={unitDefaultTestDataProps["columnNames"]}
            controlInputs={unitDefaultTestDataProps["controlInputs"]}
            dataTableName={unitDefaultTestDataProps["dataTableName"]}
            sectionSelect={sectionSelect}
            expandable
            {...props}
            extraIDs={null}
            user={user}
            isCheckedOut={isCheckedOut}
          />
        );
      case "HGL3LS": //Hg Linearity and 3-Level Summary
        const hgSummaryDataProps = qaHgSummaryDataProps();
        return (
          <QAExpandableRowsRender
            payload={hgSummaryDataProps["payload"]}
            dropdownArray={hgSummaryDataProps["dropdownArray"]}
            mdmProps={hgSummaryDataProps["mdmProps"]}
            columns={hgSummaryDataProps["columnNames"]}
            controlInputs={hgSummaryDataProps["controlInputs"]}
            dataTableName={hgSummaryDataProps["dataTableName"]}
            sectionSelect={sectionSelect}
            expandable
            {...props}
            extraIDs={null}
            user={user}
            isCheckedOut={isCheckedOut}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div>
      <div className={`usa-overlay ${show ? "is-visible" : ""}`} />
      {!loading || !dropdownsLoading ? (
        <QADataTableRender
          columnNames={columns}
          columnWidth={10}
          data={data}
          openHandler={openModal}
          onRemoveHandler={onRemoveHandler}
          isCheckedOut={isCheckedOut}
          dataTableName="Test Summary Data"
          sectionSelect={sectionSelect}
          actionColumnName={
            user && isCheckedOut ? (
              <>
                <span className="padding-right-2">Test Data</span>
                <Button
                  id={`btnAdd${dataTableName.replaceAll(" ", "-")}`}
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
          expandableRowComp={getExpandableComponent(
            selectedTestCode.testTypeGroupCode,
            {
              user: user,
              nonEditable: nonEditable,
              locationSelectValue: locationSelectValue,
            }
          )}
          noDataComp={
            user && isCheckedOut ? (
              <QADataTableRender
                columnNames={columns}
                columnWidth={10}
                data={[]}
                isCheckedOut={isCheckedOut}
                sectionSelect={sectionSelect}
                actionColumnName={
                  <>
                    <span className="padding-right-2">Test Data</span>
                    <Button
                      id={`btnAdd${dataTableName.replaceAll(" ", "-")}`}
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
          showCancel={!user || (user && !isCheckedOut)}
          showSave={user && isCheckedOut}
          //nonEditable={nonEditable}
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
                  viewOnly={!user || (user && !isCheckedOut)}
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

export default QATestSummaryDataTable;
