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

import { extractUserInput } from "../../../additional-functions/extract-user-input";
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
import { getQATestSummary } from "../../../utils/api/qaCertificationsAPI";
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
}) => {
  const { locationId, id } = data;
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
          executeOnClose(res.data);
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

  const dropdownArrayIsEmpty = dropdownArray.length === 0;
  const nextExpandableRow = (name) => {
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
            isCheckedOut={isCheckedOut}
          />
        );
      case "Air Emissions":
        const airEmissionsIds = [locationId, id];
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
            extraIDs={airEmissionsIds}
            user={user}
            isCheckedOut={isCheckedOut}
          />
        );
      case "Test Qualification":
        const objTestQa = qaTestQualificationProps(data);
        return (
          <QAExpandableRowsRender
            payload={objTestQa["payload"]}
            dropdownArray={objTestQa["dropdownArray"]}
            mdmProps={objTestQa["mdmProps"]}
            columns={objTestQa["columnNames"]}
            controlInputs={objTestQa["controlInputs"]}
            controlDatePickerInputs={objTestQa["controlDatePickerInputs"]}
            dataTableName={objTestQa["dataTableName"]}
            extraControls={objTestQa["extraControls"]}
            data={data}
            user={user}
            isCheckedOut={isCheckedOut}
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
            isCheckedOut={isCheckedOut}
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
            isCheckedOut={isCheckedOut}
          />
        );

      case "RATA Summary": // 3rd level
        const rataRunIdArray = [...extraIDs, id];
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
            isCheckedOut={isCheckedOut}
          />
        );

      case "RATA Run Data":
        const flowIdArray = [...extraIDs, id];
        const flowObj = qaFlowRataRunProps();
        return (
          <QAExpandableRowsRender
            payload={flowObj["payload"]}
            dropdownArray={flowObj["dropdownArray"]}
            columns={flowObj["columnNames"]}
            controlInputs={flowObj["controlInputs"]}
            controlDatePickerInputs={flowObj["controlDatePickerInputs"]}
            dataTableName={flowObj["dataTableName"]}
            extraControls={flowObj["extraControls"]}
            extraIDs={flowIdArray}
            expandable
            user={user}
            isCheckedOut={isCheckedOut}
          />
        );
      case "Flow":
        const traverseIdArray = [...extraIDs, id];
        const traverseObj = qaRataTraverseProps();
        return (
          <QAExpandableRowsRender
            payload={traverseObj["payload"]}
            dropdownArray={traverseObj["dropdownArray"]}
            columns={traverseObj["columnNames"]}
            controlInputs={traverseObj["controlInputs"]}
            controlDatePickerInputs={traverseObj["controlDatePickerInputs"]}
            dataTableName={traverseObj["dataTableName"]}
            extraControls={traverseObj["extraControls"]}
            extraIDs={traverseIdArray}
            user={user}
            isCheckedOut={isCheckedOut}
          />
        );
      // appendix E correlation test summary  > run
      case "Appendix E Correlation Summary":
        const parentIds = [locationId, id];
        const propsObj = qaAppendixECorrTestRunProps();
        return (
          <QAExpandableRowsRender
            payload={propsObj["payload"]}
            dropdownArray={propsObj["dropdownArray"]}
            columns={propsObj["columnNames"]}
            controlInputs={propsObj["controlInputs"]}
            controlDatePickerInputs={propsObj["controlDatePickerInputs"]}
            dataTableName={propsObj["dataTableName"]}
            extraControls={propsObj["extraControls"]}
            extraIDs={parentIds}
            expandable
            user={user}
            isCheckedOut={isCheckedOut}
          />
        );
      // run >>> heat input from gas
      case "Appendix E Correlation Run":
        const heatInputIdArray = [...extraIDs, id];
        const heatInputGasObj =
          qaAppendixECorrelationSummaryHeatInputGasProps();
        return (
          <QAExpandableRowsRender
            payload={heatInputGasObj["payload"]}
            dropdownArray={heatInputGasObj["dropdownArray"]}
            columns={heatInputGasObj["columnNames"]}
            controlInputs={heatInputGasObj["controlInputs"]}
            controlDatePickerInputs={heatInputGasObj["controlDatePickerInputs"]}
            dataTableName={heatInputGasObj["dataTableName"]}
            extraControls={heatInputGasObj["extraControls"]}
            extraIDs={heatInputIdArray}
            user={user}
            isCheckedOut={isCheckedOut}
          />
        );
      case "Appendix E Correlation Heat Input from Oil":
        const heatInputOilIdArray = [...extraIDs, id];
        const heatInputOilObj =
          qaAppendixECorrelationSummaryHeatInputOilProps(data);
        return (
          <QAExpandableRowsRender
            payload={heatInputOilObj["payload"]}
            dropdownArray={heatInputOilObj["dropdownArray"]}
            mdmProps={heatInputOilObj["mdmProps"]}
            columns={heatInputOilObj["columnNames"]}
            controlInputs={heatInputOilObj["controlInputs"]}
            controlDatePickerInputs={heatInputOilObj["controlDatePickerInputs"]}
            dataTableName={heatInputOilObj["dataTableName"]}
            extraControls={heatInputOilObj["extraControls"]}
            extraIDs={heatInputOilIdArray}
            data={data}
            user={user}
            isCheckedOut={isCheckedOut}
          />
        );
      // Test Data --> Cycle Time Summary --> Cycle Time Injection
      case "Cycle Time Summary":
        const cycleTimeInjectionIdArray = [locationId, id];
        const cycleTimeInjec = qaCycleTimeInjectionProps();
        return (
          <QAExpandableRowsRender
            payload={cycleTimeInjec["payload"]}
            dropdownArray={cycleTimeInjec["dropdownArray"]}
            mdmProps={cycleTimeInjec["mdmProps"]}
            columns={cycleTimeInjec["columnNames"]}
            controlInputs={cycleTimeInjec["controlInputs"]}
            controlDatePickerInputs={cycleTimeInjec["controlDatePickerInputs"]}
            radioBtnPayload={cycleTimeInjec["radioBtnPayload"]}
            dataTableName={cycleTimeInjec["dataTableName"]}
            extraControls={cycleTimeInjec["extraControls"]}
            extraIDs={cycleTimeInjectionIdArray}
            user={user}
            isCheckedOut={isCheckedOut}
          />
        );
      case "Unit Default Test": //Unit Default Test Data => Unit Default Test Run
        const extraIds = [locationId, id];
        const unitDefaultTestRunProps = qaUnitDefaultTestRunDataProps();
        return (
          <QAExpandableRowsRender
            payload={unitDefaultTestRunProps["payload"]}
            dropdownArray={unitDefaultTestRunProps["dropdownArray"]}
            mdmProps={unitDefaultTestRunProps["mdmProps"]}
            columns={unitDefaultTestRunProps["columnNames"]}
            controlInputs={unitDefaultTestRunProps["controlInputs"]}
            controlDatePickerInputs={
              unitDefaultTestRunProps["controlDatePickerInputs"]
            }
            dataTableName={unitDefaultTestRunProps["dataTableName"]}
            extraIDs={extraIds}
            user={user}
            isCheckedOut={isCheckedOut}
          />
        );
      case "Hg Summary": // Hg Test Data => Hg Summary => Hg Injection
        const hgInjectionIdArr = [locationId, id];
        const hgInjectionProps = qaHgInjectionDataProps();
        return (
          <QAExpandableRowsRender
            payload={hgInjectionProps["payload"]}
            dropdownArray={hgInjectionProps["dropdownArray"]}
            mdmProps={hgInjectionProps["mdmProps"]}
            columns={hgInjectionProps["columnNames"]}
            controlInputs={hgInjectionProps["controlInputs"]}
            controlDatePickerInputs={
              hgInjectionProps["controlDatePickerInputs"]
            }
            radioBtnPayload={hgInjectionProps["radioBtnPayload"]}
            dataTableName={hgInjectionProps["dataTableName"]}
            extraControls={hgInjectionProps["extraControls"]}
            extraIDs={hgInjectionIdArr}
            user={user}
            isCheckedOut={isCheckedOut}
          />
        );
      default:
        break;
    }
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
                  codeLabel = "calculatedSeparateReferenceIndicatorCode";
                  descriptionLabel =
                    "calculatedSeparateReferenceIndicatorDescription";
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
    // setReturnedFocusToLast(false);
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
        expandables.push(nextExpandableRow("Protocol Gas"));
        break;
      case "RATA Data":
        expandables.push(nextExpandableRow("Test Qualification"));
        expandables.push(nextExpandableRow("Protocol Gas"));
        expandables.push(nextExpandableRow("Air Emissions"));
        break;
      case "Appendix E Correlation Heat Input from Gas":
        expandables.push(
          nextExpandableRow("Appendix E Correlation Heat Input from Oil")
        );
        break;
      case "Unit Default Test":
        expandables.push(nextExpandableRow("Protocol Gas"));
        expandables.push(nextExpandableRow("Air Emissions"));
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
          actionColumnName={
            user && isCheckedOut ? (
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
            user && isCheckedOut ? (
              <div>
                <QADataTableRender
                  columnNames={columns}
                  columnWidth={10}
                  data={[]}
                  isCheckedOut={isCheckedOut}
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
