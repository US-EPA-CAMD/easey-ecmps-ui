import React, { useState, useEffect } from "react";

import { Button } from "@trussworks/react-uswds";
import {
  attachChangeEventListeners,
  removeChangeEventListeners,
  unsavedDataMessage,
} from "../../../additional-functions/prompt-to-save-unsaved-changes";
import {
  addAriaLabelToDatatable,
  returnsFocusDatatableViewBTN,
  returnsFocusToAddBtn,
} from "../../../additional-functions/ensure-508";
/*********** COMPONENTS ***********/

import QADataTableRender from "../../QADataTableRender/QADataTableRender.js";
import { Preloader } from "@us-epa-camd/easey-design-system";

import { extractUserInput, validateUserInput } from "../../../additional-functions/extract-user-input";
import { modalViewData } from "../../../additional-functions/create-modal-input-controls";
import Modal from "../../Modal/Modal";
import ModalDetails from "../../ModalDetails/ModalDetails";
import * as dmApi from "../../../utils/api/dataManagementApi";
import * as assertSelector from "../../../utils/selectors/QACert/assert";
import { getListOfRadioControls } from "../../../utils/selectors/QACert/TestSummary";
import {
  qaAirEmissionsProps,
  qaProtocalGasProps,
  qaLinearityInjectionProps,
  qaRataSummaryProps,
  qaRataRunDataProps,
  qaFlowRataRunProps,
  qaRataTraverseProps,
  qaTestQualificationProps,
  qaAppendixECorrTestRunProps,
  qaAppendixECorrelationSummaryHeatInputGasProps,
  qaAppendixECorrelationSummaryHeatInputOilProps,
  qaCycleTimeInjectionProps,
  qaHgInjectionDataProps,
  qaUnitDefaultTestRunDataProps,
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
  extraIDs = [], // [locid, testsumid, linsumid,   ]
  data,
  isCheckedOut,
  mdmProps,
  sectionSelect = null,
}) => {
  const { locationId, id } = data ? data : 1;
  const [mdmData, setMdmData] = useState(null);
  const [dropdownsLoading, setDropdownsLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [updateTable, setUpdateTable] = useState(false);
  const [dataPulled, setDataPulled] = useState([]);
  const [clickedIndex, setClickedIndex] = useState(null);
  const [createdDataId, setCreatedDataId] = useState(null);

  const [displayedRecords, setDisplayedRecords] = useState([]);
  const [errorMsgs, setErrorMsgs] = useState([]);
  useEffect(() => {
    if (updateTable || (dataPulled && dataPulled.length === 0)) {
      setLoading(true);
      assertSelector
        .getDataTableApis(dataTableName, locationId, id, extraIDs)
        .then((res) => {
          finishedLoadingData(res.data);
        })
        .catch((error) => console.log(error));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataTableName, updateTable]);

  useEffect(() => {
    setLoading(true);
    setDisplayedRecords(
      assertSelector.getDataTableRecords(dataPulled, dataTableName)
    );

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

  const dropdownArrayIsEmpty = dropdownArray
    ? dropdownArray.length === 0
    : false;
  const nextExpandableRow = (name) => {
    let objProps = {};
    let extraIDsProps = null;
    let expand = expandable ? expandable : false;
    switch (name) {
      case "Protocol Gas":
        extraIDsProps = [locationId, id];
        objProps = qaProtocalGasProps(data);
        break;
      case "Air Emissions":
        extraIDsProps = [locationId, id];
        objProps = qaAirEmissionsProps(data);
        break;
      case "Test Qualification":
        extraIDsProps = [locationId, id];
        objProps = qaTestQualificationProps(data);
        break;
      // test  > injections
      case "Linearity Test":
        extraIDsProps = [locationId, id];
        objProps = qaLinearityInjectionProps();
        expand = false;
        break;
      // rata data > rata summary > rata run
      case "RATA Data":
        extraIDsProps = [locationId, id];
        expand = true;
        objProps = qaRataSummaryProps();
        break;

      case "RATA Summary": // 3rd level
        extraIDsProps = [...extraIDs, id];
        expand = true;
        objProps = qaRataRunDataProps();
        break;

      case "RATA Run Data":
        extraIDsProps = [...extraIDs, id];
        expand = false;
        objProps = qaFlowRataRunProps();
        break;
      case "Flow":
        extraIDsProps = [...extraIDs, id];
        objProps = qaRataTraverseProps();
        break;
      // appendix E correlation test summary  > run
      case "Appendix E Correlation Summary":
        extraIDsProps = [locationId, id];
        objProps = qaAppendixECorrTestRunProps();
        break;
      // run >>> heat input from gas
      case "Appendix E Correlation Run":
        extraIDsProps = [...extraIDs, id];
        objProps = qaAppendixECorrelationSummaryHeatInputGasProps();
        break;
      case "Appendix E Correlation Heat Input from Oil":
        extraIDsProps = [...extraIDs, id];
        expand = true;
        objProps = qaAppendixECorrelationSummaryHeatInputOilProps(data);
        break;
      // Test Data --> Cycle Time Summary --> Cycle Time Injection
      case "Cycle Time Summary":
        extraIDsProps = [locationId, id];
        objProps = qaCycleTimeInjectionProps();
        expand = false;
        break;
      case "Unit Default Test": //Unit Default Test Data => Unit Default Test Run
        extraIDsProps = [locationId, id];
        objProps = qaUnitDefaultTestRunDataProps();
        expand = false;
        break;
      case "Hg Summary": // Hg Test Data => Hg Summary => Hg Injection
        extraIDsProps = [locationId, id];
        objProps = qaHgInjectionDataProps();
        expand = false;
        break;
      default:
        break;
    }

    return {
      payload: objProps["payload"],
      dropdownArray: objProps["dropdownArray"],
      mdmProps: objProps["mdmProps"],
      columns: objProps["columnNames"],
      controlInputs: objProps["controlInputs"],
      controlDatePickerInputs: objProps["controlDatePickerInputs"],
      dataTableName: objProps["dataTableName"],
      sectionSelect: sectionSelect,
      extraControls: objProps["extraControls"],
      radioBtnPayload: objProps["radioBtnPayload"],
      extraIDs: extraIDsProps,
      expandable: expand,
      user: user,
      isCheckedOut: isCheckedOut,
    };
  };


  const populateStaticDropdowns = (tableName, dropdowns) => {
    if (tableName === "Flow To Load Check") {
      dropdowns["biasAdjustedIndicator"] = [
        { code: 0, name: 0 },
        { code: 1, name: 1 },
      ];
    } else if (tableName === "Unit Default Test Run") {
      dropdowns["runUsedIndicator"] = [
        { code: "", name: "-- Select a value --" },
        { code: 0, name: 0 },
        { code: 1, name: 1 },
      ];
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
        Promise.all(allPromises)
          .then((values) => {
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
          })
          .catch((error) => console.log(error));
        break;
      case "RATA Data":
        allPromises.push(dmApi.getAllRataFreqCodes());
        Promise.all(allPromises)
          .then((values) => {
            values.forEach((val, i) => {
              if (i === 0) {
                dropdowns[dropdownArray[i]] = val.data.map((d) => {
                  return {
                    code: d["rataFrequencyCode"],
                    name: d["rataFrequencyDescription"],
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
            setMdmData(dropdowns);
          })
          .catch((error) => console.log(error));
        break;

      case "RATA Run Data":
        allPromises.push(dmApi.getAllRunStatusCodes());
        Promise.all(allPromises)
          .then((response) => {
            dropdownArray.forEach((val, i) => {
              if (i === 0) {
                dropdowns[dropdownArray[i]] = response[0].data.map((d) => {
                  return {
                    code: d["runStatusCode"],
                    name: d["runStatusDescription"],
                  };
                });
                dropdowns[dropdownArray[i]].unshift({
                  code: "",
                  name: "-- Select a value --",
                });
              }
            });
            setMdmData(dropdowns);
          })
          .catch((error) => console.log(error));
        break;

      case "RATA Summary":
        allPromises.push(dmApi.getAllOperatingLevelCodes());
        allPromises.push(dmApi.getAllReferenceMethodCodes());
        allPromises.push(dmApi.getAllApsCodes());
        Promise.all(allPromises)
          .then((response) => {
            dropdownArray.forEach((val, i) => {
              if (i === 0) {
                dropdowns[dropdownArray[i]] = response[0].data.map((d) => {
                  return {
                    code: d["opLevelCode"],
                    name: d["opLevelDescription"],
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
                    name: d["referenceMethodDescription"],
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
                    name: d["apsDescription"],
                  };
                });
                dropdowns[dropdownArray[i]].unshift({
                  code: "",
                  name: "-- Select a value --",
                });
              }
            });
            setMdmData(dropdowns);
          })
          .catch((error) => console.log(error));
        break;
      case "RATA Traverse Data":
        allPromises.push(dmApi.getAllProbeTypeCodes());
        allPromises.push(dmApi.getAllPressureMeasureCodes());
        allPromises.push(dmApi.getAllPointUsedIndicatorCodes());
        Promise.all(allPromises)
          .then((responses) => {
            responses.forEach((curResp, i) => {
              let codeLabel;
              let descriptionLabel;
              switch (i) {
                case 0:
                  codeLabel = "probeTypeCode";
                  descriptionLabel = "probeTypeDescription";
                  break;
                case 1:
                  codeLabel = "pressureMeasureCode";
                  descriptionLabel = "pressureMeasureDescription";
                  break;
                case 2:
                  codeLabel = "pointUsedIndicatorCode";
                  descriptionLabel = "pointUsedIndicatorDescription";
                  break;
                default:
                  break;
              }
              dropdowns[dropdownArray[i]] = curResp.data.map((d) => {
                return { code: d[codeLabel], name: d[descriptionLabel] };
              });
            });
            for (const options of Object.values(dropdowns)) {
              options.unshift({ code: "", name: "-- Select a value --" });
            }
            setMdmData(dropdowns);
          })
          .catch((error) => console.log(error));
        break;
      case "Appendix E Correlation Heat Input from Gas":
        allPromises.push(dmApi.getAllMonitoringSystemIDCodes(extraIDs[0]));
        Promise.all(allPromises)
          .then((responses) => {
            responses.forEach((curResp, i) => {
              let codeLabel;
              let descriptionLabel;
              switch (i) {
                case 0:
                  codeLabel = "monitoringSystemIDCode";
                  descriptionLabel = "monitoringSystemIDDescription";
                  break;
                default:
                  break;
              }
              dropdowns[dropdownArray[i]] = curResp.data.map((d) => {
                return { code: d[codeLabel], name: d[descriptionLabel] };
              });
            });
            for (const options of Object.values(dropdowns)) {
              options.unshift({ code: "", name: "-- Select a value --" });
            }
            setMdmData(dropdowns);
          })
          .catch((error) => console.log(error));
        break;
      case "Appendix E Correlation Heat Input from Oil":
        allPromises.push(dmApi.getAllMonitoringSystemIDCodes(extraIDs[0]));
        allPromises.push(dmApi.getAllUnitsOfMeasureCodes());
        Promise.all(allPromises)
          .then((responses) => {
            responses.forEach((curResp, i) => {
              let codeLabel;
              let descriptionLabel;
              switch (i) {
                case 0:
                  codeLabel = "monitoringSystemIDCode";
                  descriptionLabel = "monitoringSystemIDDescription";
                  break;
                case 1:
                  codeLabel = "unitOfMeasureCode";
                  descriptionLabel = "unitOfMeasureDescription";
                  break;
                default:
                  break;
              }
              dropdowns[dropdownArray[i]] = curResp.data.map((d) => {
                return { code: d[codeLabel], name: d[descriptionLabel] };
              });
              if (i === 1) {
                dropdowns["oilVolumeUnitsOfMeasureCode"] = curResp.data.map(
                  (d) => {
                    return { code: d[codeLabel], name: d[descriptionLabel] };
                  }
                );
                dropdowns["oilDensityUnitsOfMeasureCode"] = curResp.data.map(
                  (d) => {
                    return { code: d[codeLabel], name: d[descriptionLabel] };
                  }
                );
              }
            });
            for (const options of Object.values(dropdowns)) {
              options.unshift({ code: "", name: "-- Select a value --" });
            }
            setMdmData(dropdowns);
          })
          .catch((error) => console.log(error));
        break;
      case "Transmitter Transducer Accuracy Data":
        allPromises.push(dmApi.getAllAccuracySpecCodes());
        Promise.all(allPromises)
          .then((responses) => {
            responses.forEach((curResp, i) => {
              let codeLabel;
              let descriptionLabel;
              switch (i) {
                case 0:
                  codeLabel = "accuracySpecCode";
                  descriptionLabel = "accuracySpecDescription";
                  break;
                default:
                  break;
              }
              dropdowns[dropdownArray[i]] = curResp.data.map((d) => {
                return { code: d[codeLabel], name: d[descriptionLabel] };
              });
              if (i === 0) {
                dropdowns["midLevelAccuracySpecCode"] = curResp.data.map(
                  (d) => {
                    return { code: d[codeLabel], name: d[descriptionLabel] };
                  }
                );
                dropdowns["highLevelAccuracySpecCode"] = curResp.data.map(
                  (d) => {
                    return { code: d[codeLabel], name: d[descriptionLabel] };
                  }
                );
              }
            });
            for (const options of Object.values(dropdowns)) {
              options.unshift({ code: "", name: "-- Select a value --" });
            }
            setMdmData(dropdowns);
          })
          .catch((error) => console.log(error));
        break;
      case "Flow To Load Reference":
        allPromises.push(dmApi.getRataTestNumber(locationId));
        allPromises.push(dmApi.getAllOperatingLevelCodes());
        allPromises.push(
          dmApi.getAllCalculatedSeparateReferenceIndicatorCodes()
        );
        Promise.all(allPromises)
          .then((responses) => {
            responses.forEach((curResp, i) => {
              let codeLabel;
              let descriptionLabel;
              switch (i) {
                case 0:
                  codeLabel = "rataTestNumberCode";
                  descriptionLabel = "rataTestNumberDescription";
                  break;
                case 1:
                  codeLabel = "opLevelCode";
                  descriptionLabel = "opLevelDescription";
                  break;
                case 2:
                  codeLabel = "calcSeparateReferenceIndicatorCode";
                  descriptionLabel =
                    "calcSeparateReferenceIndicatorDescription";
                  break;
                default:
                  break;
              }
              dropdowns[dropdownArray[i]] = curResp.data.map((d) => {
                return { code: d[codeLabel], name: d[descriptionLabel] };
              });
            });
            for (const options of Object.values(dropdowns)) {
              options.unshift({ code: "", name: "-- Select a value --" });
            }
            setMdmData(dropdowns);
          })
          .catch((error) => console.log(error));
        break;
      case "Unit Default Test Run":
        populateStaticDropdowns(name, dropdowns);
        setMdmData(dropdowns);
        break;
      default:
        mdmProps.forEach((prop) => {
          allPromises.push(dmApi.getMdmDataByCodeTable(prop["codeTable"]));
        });
        Promise.all(allPromises)
          .then((res) => {
            res.forEach((val, i) => {
              dropdowns[dropdownArray[i]] = val.data.map((d) => {
                return {
                  code: d[mdmProps[i].responseProps["code"]],
                  name: d[mdmProps[i].responseProps["description"]],
                };
              });
              switch (name) {
                case "Cycle Time Injection":
                  dropdowns[dropdownArray[i]] = dropdowns[
                    dropdownArray[i]
                  ].filter((item) => item.code !== "LOW");

                  dropdowns[dropdownArray[i]] = dropdowns[
                    dropdownArray[i]
                  ].filter((item) => item.code !== "MID");

                  break;
                default:
                  break;
              }
            });
            populateStaticDropdowns(name, dropdowns);
            for (const options of Object.values(dropdowns)) {
              options.unshift({ code: "", name: "-- Select a value --" });
            }
            setMdmData(dropdowns);
          })
          .catch((err) => console.error(err));

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
    if (createNewData) {
      returnsFocusToAddBtn(dataTableName.replaceAll(" ", "-"));
    }
  };
  const executeOnClose = (data) => {
    setShow(false);
    setErrorMsgs([]);
    removeChangeEventListeners(".modalUserInput");

    const updatedData = assertSelector.getDataTableRecords(
      data ? data : [],
      dataTableName
    );
    const idx = updatedData.findIndex((d) => d.id === createdDataId);

    if (idx >= 0) {
      returnsFocusDatatableViewBTN(dataTableName.replaceAll(" ", "-"), idx);
      setCreatedDataId(null);
      setCreateNewData(false);
    } else {
      returnsFocusDatatableViewBTN(
        dataTableName.replaceAll(" ", "-"),
        clickedIndex
      );
    }
  };

  const finishedLoadingData = (loadedData) => {
    setDataPulled(loadedData);
    addAriaLabelToDatatable();
  };

  // Executed when "View" action is clicked
  const openModal = (row, bool, create, index) => {
    let selectedData = null;
    setCreateNewData(create);
    if (create) {
      if (dataTableName === "Linearity Test") {
        controlInputs.gasLevelCode = ["Gas Level Code", "dropdown", "", ""];
      }
      if (dataTableName === "Rata Data") {
        controlInputs.numberOfLoadLevels = [
          "Number of Load Levels",
          "dropdown",
          "",
          "",
        ];
      }
      if (dataTableName === "Appendix E Correlation Heat Input from Oil") {
        controlInputs.monitoringSystemID = [
          "Monitoring System ID",
          "dropdown",
          "",
          "",
        ];
      }
    } else {
      if (dataTableName === "Linearity Test") {
        controlInputs.gasLevelCode = [
          "Gas Level Code",
          "dropdown",
          "",
          "locked",
        ];
      }
      if (dataTableName === "Rata Data") {
        controlInputs.numberOfLoadLevels = [
          "Number of Load Levels",
          "dropdown",
          "",
          "locked",
        ];
      }
      if (dataTableName === "Appendix E Correlation Heat Input from Oil") {
        controlInputs.monitoringSystemID = [
          "Monitoring System ID",
          "dropdown",
          "",
          "locked",
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

    if (dataTableName === "Fuel Flowmeter Accuracy Data") {
      if (selectedData) {
        if (selectedData.reinstallationDate) {
          selectedData.reinstallationDate = new Date(
            selectedData.reinstallationDate
          )
            .toISOString()
            .slice(0, 10);
        }
      }
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

    setClickedIndex(index);

    setShow(true);
    setTimeout(() => {
      attachChangeEventListeners(".modalUserInput");
    });
  };

  const saveData = async () => {
    const userInput = extractUserInput(
      payload,
      ".modalUserInput",
      getListOfRadioControls(controlInputs)
    );

    const validationErrors = validateUserInput(userInput, dataTableName);
    if (validationErrors.length > 0) {
      console.log('valid errors', validationErrors);
      setErrorMsgs(validationErrors);
      return;
    }

    try {
      const resp = await assertSelector.saveDataSwitch(
        userInput,
        dataTableName,
        locationId,
        id,
        extraIDs
      );
      if (resp.status === 200) {
        setUpdateTable(true);
        executeOnClose();
      } else {
        const errorResp = Array.isArray(resp) ? resp : [resp];
        setErrorMsgs(errorResp);
      }
    } catch (error) {
      console.log("error saving data", error);
    }
  };

  const createData = async () => {
    const userInput = extractUserInput(
      payload,
      ".modalUserInput",
      getListOfRadioControls(controlInputs)
    );

    const validationErrors = validateUserInput(userInput, dataTableName);
    if (validationErrors.length > 0) {
      setErrorMsgs(validationErrors);
      return;
    }

    try {
      const resp = await assertSelector.createDataSwitch(
        userInput,
        dataTableName,
        locationId,
        id,
        extraIDs
      );
      if (resp.status === 201) {
        setCreatedDataId(resp.data.id);
        setUpdateTable(true);
        executeOnClose();
      } else {
        const errorResp = Array.isArray(resp) ? resp : [resp];
        setErrorMsgs(errorResp);
      }
    } catch (error) {
      console.log("error creating data", error);
    }
  };

  const onRemoveHandler = async (row) => {
    try {
      const resp = await assertSelector.removeDataSwitch(
        row,
        dataTableName,
        locationId,
        id,
        extraIDs
      );
      if (resp.status === 200) {
        setUpdateTable(true);
        returnsFocusToAddBtn(dataTableName.replaceAll(" ", "-"));
      }
    } catch (error) {
      console.log(
        `error deleting data of table: ${dataTableName}, row: ${row}`,
        error
      );
    }
  };

  const getFirstLevelExpandables = () => {
    const expandables = [];
    switch (dataTableName) {
      case "Linearity Test":
        expandables.push(
          <QAExpandableRowsRender {...nextExpandableRow("Protocol Gas")} />
        );
        break;
      case "RATA Data":
        expandables.push(
          <QAExpandableRowsRender
            {...nextExpandableRow("Test Qualification")}
          />
        );
        expandables.push(
          <QAExpandableRowsRender {...nextExpandableRow("Protocol Gas")} />
        );
        expandables.push(
          <QAExpandableRowsRender {...nextExpandableRow("Air Emissions")} />
        );
        break;
      case "Appendix E Correlation Heat Input from Gas":
        expandables.push(
          <QAExpandableRowsRender
            {...nextExpandableRow("Appendix E Correlation Heat Input from Oil")}
          />
        );

        break;
      case "Unit Default Test":
      case "Appendix E Correlation Summary":
        expandables.push(
          <QAExpandableRowsRender {...nextExpandableRow("Protocol Gas")} />
        );
        expandables.push(
          <QAExpandableRowsRender {...nextExpandableRow("Air Emissions")} />
        );
        break;
      default:
        break;
    }
    return expandables;
  };

  return (
    <div className="padding-y-3">
      <div className={`usa-overlay ${show ? "is-visible" : ""}`} />
      {!loading ? (
        <QADataTableRender
          columnNames={columns}
          columnWidth={10}
          data={displayedRecords}
          openHandler={openModal}
          onRemoveHandler={onRemoveHandler}
          user={user}
          actionsBtn={"View"}
          isCheckedOut={isCheckedOut}
          dataTableName={dataTableName}
          sectionSelect={sectionSelect}
          actionColumnName={
            user && isCheckedOut ? (
              <div className="display-table-row">
                <span className="padding-right-2 text-wrap display-table-cell">
                  {dataTableName}
                </span>
                <Button
                  id={`btnAdd${dataTableName.replaceAll(" ", "-")}`}
                  epa-testid="btnOpen"
                  className="text-white display-table-cell"
                  onClick={() => openModal(false, false, true)}
                >
                  Add
                </Button>
              </div>
            ) : (
              dataTableName
            )
          }
          expandableRowComp={
            expandable ? QAExpandableRowsRender : false
          }
          expandableRowProps={nextExpandableRow(dataTableName)}
          // shows empty table with add if user is logged in
          noDataComp={
            user && isCheckedOut ? (
              <div>
                <QADataTableRender
                  columnNames={columns}
                  columnWidth={10}
                  data={[]}
                  isCheckedOut={isCheckedOut}
                  sectionSelect={sectionSelect}
                  actionColumnName={
                    <>
                      <span className="padding-right-2">{dataTableName}</span>
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
              </div>
            ) : (
              `There're no ${dataTableName} records available.`
            )
          }
        />
      ) : (
        <Preloader />
      )}
      {[...getFirstLevelExpandables()]}
      {show ? (
        <Modal
          show={show}
          close={closeModalHandler}
          save={createNewData ? createData : saveData}
          showCancel={!user || (user && !isCheckedOut)}
          showSave={user && isCheckedOut}
          title={
            createNewData
              ? `Add  ${dataTableName}`
              : user && isCheckedOut
                ? ` Edit ${dataTableName}`
                : ` ${dataTableName}`
          }
          exitBTN={`Save and Close`}
          errorMsgs={errorMsgs}
          children={
            dropdownsLoaded ? (
              <div>
                <ModalDetails
                  modalData={selectedRow}
                  data={selectedModalData}
                  cols={2}
                  title={`${dataTableName}`}
                  viewOnly={!user || (user && !isCheckedOut)}
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
