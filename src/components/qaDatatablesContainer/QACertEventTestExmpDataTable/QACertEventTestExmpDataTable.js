import React, { useState, useMemo, useEffect } from "react";

import {
  mapQaCertEventsDataToRows,
  mapQaExtensionsExemptionsDataToRows,
} from "../../../utils/selectors/QACert/TestSummary.js";
import Modal from "../../Modal/Modal";
import ModalDetails from "../../ModalDetails/ModalDetails";
import { extractUserInput } from "../../../additional-functions/extract-user-input";
import { modalViewData } from "../../../additional-functions/create-modal-input-controls";
import {
  generateArrayOfYears
} from "../../HeaderInfo/HeaderInfo";
import {
  qaCertEventsProps,
  qaTestExemptionProps,
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
import * as dmApi from "../../../utils/api/dataManagementApi";
import * as mpApi from "../../../utils/api/monitoringPlansApi.js";
import * as assertSelector from "../../../utils/selectors/QACert/assert";

import {
  returnsFocusDatatableViewBTN,
  returnsFocusToAddBtn,
} from "../../../additional-functions/ensure-508.js";

// contains test summary data table

const QACertEventTestExmpDataTable = ({
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
}) => {
  const [loading, setLoading] = useState(false);
  const [mdmData, setMdmData] = useState(null);
  const [dropdownsLoading, setDropdownsLoading] = useState(false);
  const [qaTestSummary, setQATestSummary] = useState([]);
  const [show, setShow] = useState(showModal);
  const [selectedRow, setSelectedRow] = useState(null);
  const [clickedIndex, setClickedIndex] = useState(null);
  const [selectedModalData, setSelectedModalData] = useState(null);
  const [dropdownsLoaded, setDropdownsLoaded] = useState(false);
  const [createdId, setCreatedId] = useState(null);
  const [mainDropdownChange, setMainDropdownChange] = useState("");
  const [createNewData, setCreateNewData] = useState(false);
  const [updateTable, setUpdateTable] = useState(false);


  const years = generateArrayOfYears(2009).map((year, index) => {
    return {
      code: year,
      name: year,
    };
  });
  let props = {};
  switch (sectionSelect[1]) {
    case "QA Certification Event":
      props = qaCertEventsProps(selectedLocation);
      break;

    case "Test Extension Exemption":
      props = qaTestExemptionProps(selectedLocation);
      break;
    default:
      props = qaCertEventsProps(selectedLocation);
      break;
  }

  const {
    dataTableName,
    payload,
    dropdownArray,
    columns,
    controlInputs,
    controlDatePickerInputs,
    extraControlInputs,
  } = props;
  if (user) {
    columns.push("Eval Status");
  }
  useEffect(() => {
    setQATestSummary([]);
    setUpdateTable(true);
    setDropdownsLoaded(false);
    setMdmData(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sectionSelect, locationSelectValue]);

  useEffect(() => {
    if (mdmData === null && !dropdownsLoaded) {
      loadDropdownsData(dataTableName);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dropdownsLoaded, mdmData]);

  //**** */
  useEffect(() => {
    if (updateTable) {
      setLoading(true);
      assertSelector
        .getDataTableApis(dataTableName, locationSelectValue)
        .then((res) => {
          if (res !== undefined && res.data.length > 0) {
            setQATestSummary(res.data);
          } else {
            setQATestSummary([]);
          }
          setLoading(false);
        })
        .catch((error) => {
          console.log(
            `error fetching table records for ${dataTableName} `,
            error
          );
        });
      setUpdateTable(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updateTable]);

  const getOptions = (obj, code, name) => {
    return {
      code: obj[code],
      name: obj[name],
    };
  };

  const loadDropdownsData = (name) => {
    setDropdownsLoading(true);
    let dropdowns = {};
    const allPromises = [];

    switch (name) {
      case "QA Certification Event":
        allPromises.push(
          mpApi.getMonitoringComponents(locationSelectValue).catch((error) => {
            console.log(
              `error fetching dropdown items for ${dataTableName} `,
              error
            );
          })
        );
        allPromises.push(
          mpApi.getMonitoringSystems(locationSelectValue).catch((error) => {
            console.log(
              `error fetching dropdown items for ${dataTableName} `,
              error
            );
          })
        );
        allPromises.push(
          dmApi.getMdmDataByCodeTable("qa-cert-event-codes").catch((error) => {
            console.log(
              `error fetching dropdown items for ${dataTableName} `,
              error
            );
          })
        );
        allPromises.push(
          dmApi.getMdmDataByCodeTable("required-test-codes").catch((error) => {
            console.log(
              `error fetching dropdown items for ${dataTableName} `,
              error
            );
          })
        );
        Promise.all(allPromises)
          .then((response) => {
            dropdownArray[0].forEach((val, i) => {
              if (i === 0) {
                dropdowns[dropdownArray[0][i]] = response[i].data.map((d) =>
                  getOptions(d, "componentId", "componentId")
                );
              } else if (i === 1) {
                dropdowns[dropdownArray[0][i]] = response[i].data.map((d) =>
                  getOptions(d, "monitoringSystemId", "monitoringSystemId")
                );
              } else if (i === 2) {
                dropdowns[dropdownArray[0][i]] = response[i].data.map((d) =>
                  getOptions(d, "qaCertEventCode", "qaCertEventDescription")
                );
              } else if (i === 3) {
                dropdowns[dropdownArray[0][i]] = response[i].data.map((d) =>
                  getOptions(d, "requiredTestCode", "requiredTestDescription")
                );
              }
              dropdowns[dropdownArray[0][i]].unshift({
                code: "",
                name: "-- Select a value --",
              });
            });
            setMdmData(dropdowns);
            setDropdownsLoaded(true);
            setDropdownsLoading(false);
          })
          .catch((error) => {
            console.log(
              `error fetching dropdown items for ${dataTableName} `,
              error
            );
          });
        break;
      case "Test Extension Exemption":
        const quarters = [
          { code: "2", name: "1" },
          { code: "3", name: "2" },
          { code: "4", name: "3" },
          { code: "5", name: "4" },
        ];
        allPromises.push([]);
        allPromises.push([]);
        allPromises.push(
          mpApi.getMonitoringComponents(locationSelectValue).catch((error) => {
            console.log(
              `error fetching dropdown items for ${dataTableName} `,
              error
            );
          })
        );
        allPromises.push(
          mpApi.getMonitoringSystems(locationSelectValue).catch((error) => {
            console.log(
              `error fetching dropdown items for ${dataTableName} `,
              error
            );
          })
        );
        allPromises.push(
          dmApi.getAllSpanScaleCodes().catch((error) => {
            console.log(
              `error fetching dropdown items for ${dataTableName} `,
              error
            );
          })
        );
        allPromises.push(
          dmApi.getAllFuelCodes().catch((error) => {
            console.log(
              `error fetching dropdown items for ${dataTableName} `,
              error
            );
          })
        );
        allPromises.push(
          dmApi
            .getMdmDataByCodeTable("extension-exemption-codes")
            .catch((error) => {
              console.log(
                `error fetching dropdown items for ${dataTableName} `,
                error
              );
            })
        );
        Promise.all(allPromises)
          .then((response) => {
            dropdownArray[0].forEach((val, i) => {
              if (i === 0) {
                dropdowns[dropdownArray[0][i]] = years;
              } else if (i === 1) {
                dropdowns[dropdownArray[0][i]] = quarters;
              } else if (i === 2) {
                dropdowns[dropdownArray[0][i]] = response[i].data.map((d) =>
                  getOptions(d, "componentId", "componentId")
                );
              } else if (i === 3) {
                dropdowns[dropdownArray[0][i]] = response[i].data.map((d) =>
                  getOptions(d, "monitoringSystemId", "monitoringSystemId")
                );
              } else if (i === 4) {
                dropdowns[dropdownArray[0][i]] = response[i].data.map((d) =>
                  getOptions(d, "spanScaleCode", "spanScaleDescription")
                );
              } else if (i === 5) {
                dropdowns[dropdownArray[0][i]] = response[i].data.map((d) =>
                  getOptions(d, "fuelCode", "fuelDescription")
                );
              } else if (i === 6) {
                dropdowns[dropdownArray[0][i]] = response[i].data.map((d) =>
                  getOptions(
                    d,
                    "extensionExemptionCode",
                    "extensionExemptionDescription"
                  )
                );
              }
              dropdowns[dropdownArray[0][i]].unshift({
                code: "",
                name: "-- Select a value --",
              });
            });
            setMdmData(dropdowns);
            setDropdownsLoaded(true);
            setDropdownsLoading(false);
          })
          .catch((error) => {
            console.log(
              `error fetching dropdown items for ${dataTableName} `,
              error
            );
          });
        break;
      default:
        setMdmData(null);
        setDropdownsLoaded(true);
        setDropdownsLoading(false);
        break;
    }
  };

  const data = useMemo(() => {
    switch (sectionSelect[1]) {
      case "QA Certification Event":
        return mapQaCertEventsDataToRows(qaTestSummary, orisCode);
      case "Test Extension Exemption":
        return mapQaExtensionsExemptionsDataToRows(qaTestSummary, orisCode);
      default:
        return [];
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [qaTestSummary]);

  const openModal = (row, bool, create, index) => {
    let selectedData = {};
    setCreateNewData(create);
    if (qaTestSummary.length > 0 && !create) {
      selectedData = qaTestSummary.filter(
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
    }
    const prefilteredTotalName = dropdownArray[0][dropdownArray[0].length - 1];

    const modalData = modalViewData(
      selectedData,
      controlInputs,
      controlDatePickerInputs,
      create,
      mdmData,
      null,
      null,
      null,
      false,
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

    let updatedData = [];

    switch (sectionSelect[1]) {
      case "QA Certification Event":
        updatedData = mapQaCertEventsDataToRows(data ? data : [], orisCode);
        break;
      case "Test Exemptions and Exeptions":
        updatedData = mapQaExtensionsExemptionsDataToRows(data ? data : [], orisCode);
        break;
      default:
        break;
    }

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
    try {
      const resp = await assertSelector.removeDataSwitch(
        row,
        dataTableName,
        locationSelectValue
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

  const saveData = async (row) => {
    const userInput = extractUserInput(payload, ".modalUserInput");

    assertSelector
      .saveDataSwitch(
        userInput,
        dataTableName,
        locationSelectValue,
        selectedRow.id
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
    const userInput = extractUserInput(payload, ".modalUserInput");
    if (userInput.unitId) {
      userInput.unitId = String(userInput.unitId);
      userInput.stackPipeId = null;
    } else if (userInput.stackPipeId) {
      userInput.stackPipeId = String(userInput.stackPipeId);
      userInput.unitId = null;
    }
    
    assertSelector
      .createDataSwitch(userInput, dataTableName, locationSelectValue)
      .then((res) => {
        if (Object.prototype.toString.call(res) === "[object Array]") {
          alert(res[0]);
        } else {
          setCreatedId(res.data.id);
          setUpdateTable(true);
          executeOnClose();
        }
      })
      .catch((error) => {
        console.error("error", error);
        returnsFocusToAddBtn(dataTableName.replaceAll(" ", "-"));
      });
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
          actionsBtn={"View"}
          user={user}
          noDataComp={
            user && isCheckedOut ? (
              <QADataTableRender
                columnNames={columns}
                columnWidth={10}
                data={[]}
                isCheckedOut={isCheckedOut}
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
              `There're no ${dataTableName} records available.`
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

export default QACertEventTestExmpDataTable;
