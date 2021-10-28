import React, { useEffect, useMemo, useState } from "react";

// selectors that normalize api data to fit the columns in UI datatable
import * as loadSelector from "../../../utils/selectors/monitoringPlanLoads";
import * as wafSelector from "../../../utils/selectors/monitoringPlanRectangularDucts";
import * as spanSelector from "../../../utils/selectors/monitoringPlanSpans";
import * as formulaSelector from "../../../utils/selectors/monitoringPlanFormulas";
import * as defaultSelector from "../../../utils/selectors/monitoringPlanDefaults";
import * as unitFuelSelector from "../../../utils/selectors/monitoringPlanFuelData";
import * as unitControlSelector from "../../../utils/selectors/monitoringPlanUnitControls";

import Modal from "../../Modal/Modal";
import ModalDetails from "../../ModalDetails/ModalDetails";
import { DataTableRender } from "../../DataTableRender/DataTableRender";
import { extractUserInput } from "../../../additional-functions/extract-user-input";
import { modalViewData } from "../../../additional-functions/create-modal-input-controls";
import * as mpApi from "../../../utils/api/monitoringPlansApi";
import { useRetrieveDropdownApi } from "../../../additional-functions/retrieve-dropdown-api";

import {
  getActiveData,
  getInactiveData,
} from "../../../additional-functions/filter-data";

import {
  attachChangeEventListeners,
  removeChangeEventListeners,
  unsavedDataMessage,
} from "../../../additional-functions/prompt-to-save-unsaved-changes";

//
export const DataTableAssert = ({
  locationSelectValue,
  user,
  checkout,
  inactive,
  settingInactiveCheckBox,
  revertedState,
  setRevertedState,

  pagination,
  filter,
  controlInputs,
  controlDatePickerInputs,
  radioName,
  payload,
  urlParameters,
  columnNames,
  dropdownArray,
  dataTableName,
  selectedLocation,
  showModal = false,
}) => {
  const [dataPulled, setDataPulled] = useState([]);
  const [show, setShow] = useState(showModal);
  const [selectedRow, setSelectedRow] = useState(null);
  const [selectedModalData, setSelectedModalData] = useState(null);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [dataApi, setDataApi] = useState({});
  const totalOptions = useRetrieveDropdownApi(
    dropdownArray[0],
    dropdownArray.length > 1 ? dropdownArray[1] : null
  );
  const [updateTable, setUpdateTable] = useState(false);
  useEffect(() => {
    if (
      updateTable ||
      dataPulled.length <= 0 ||
      locationSelectValue ||
      revertedState
    ) {
      setDataLoaded(false);
      getDataTableApi(dataTableName, locationSelectValue);

      setUpdateTable(false);
      setRevertedState(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locationSelectValue, updateTable, revertedState, dataTableName]);

  // get API for data
  // in  a timer because WAFS get takes a lil bit exxtra time to process, fixes update of datatable after editing data
  const getDataTableApi = (name, location) => {
    let timerFunc = setTimeout(() => {
      switch (name) {
        case "Load":
          mpApi.getMonitoringLoads(location).then((res) => {
            setDataPulled(res.data);
            setDataLoaded(true);
          });
          break;
        case "Rectangular Duct WAF":
          mpApi.getMonitoringRectangularDucts(location).then((res) => {
            setDataPulled(res.data);
            setDataLoaded(true);
          });
          break;
        case "Span":
          mpApi.getMonitoringSpans(location).then((res) => {
            setDataPulled(res.data);
            setDataLoaded(true);
          });
          break;
        case "Formula":
          mpApi.getMonitoringFormulas(location).then((res) => {
            setDataPulled(res.data);
            setDataLoaded(true);
          });
          break;

        case "Default":
          mpApi.getMonitoringDefaults(location).then((res) => {
            setDataPulled(res.data);
            setDataLoaded(true);
          });
          break;

        case "Unit Fuel":
          mpApi
            .getMonitoringPlansFuelDataRecords(
              selectedLocation ? selectedLocation : location
            )
            .then((res) => {
              setDataPulled(res.data);
              setDataLoaded(true);
            });
          break;

        case "Unit Control":
          mpApi
            .getMonitoringPlansUnitControlRecords(
              selectedLocation ? selectedLocation : location
            )
            .then((res) => {
              setDataPulled(res.data);
              setDataLoaded(true);
            });
          break;
        default:
          break;
      }
    }, [500]);
    setUpdateTable(true);
    return () => clearTimeout(timerFunc);
  };

  const getDataTableRecords = (dataIn, name) => {
    switch (name) {
      case "Load":
        return loadSelector.getMonitoringPlansLoadsTableRecords(dataIn);
      case "Rectangular Duct WAF":
        return wafSelector.getMonitoringPlansRectangularDuctsTableRecords(
          dataIn
        );
      case "Span":
        return spanSelector.getMonitoringPlansSpansTableRecords(dataIn);
      case "Formula":
        return formulaSelector.getMonitoringPlansFormulasTableRecords(dataIn);
      case "Default":
        return defaultSelector.getMonitoringPlansDefaultsTableRecords(dataIn);
      case "Unit Fuel":
        return unitFuelSelector.getMonitoringPlansFuelDataRecords(dataIn);

      case "Unit Control":
        return unitControlSelector.getMonitoringPlansUnitControlRecords(dataIn);
      default:
        break;
    }
  };

  const saveData = () => {
    const userInput = extractUserInput(
      payload,
      ".modalUserInput",
      radioName ? radioName : null
    );

    switch (dataTableName) {
      case "Load":
        mpApi
          .saveMonitoringLoads(userInput)
          .then((result) => {
            console.log(result, " was saved");
          })
          .catch((error) => {
            console.log("error is", error);
          });
        break;
      case "Rectangular Duct WAF":
        mpApi
          .saveMonitoringDuct(userInput)

          .catch((error) => {
            console.log("error is", error);
          });
        break;
      case "Span":
        mpApi
          .saveMonitoringSpans(userInput)
          .then((result) => {
            console.log(result, " was saved");
          })
          .catch((error) => {
            console.log("error is", error);
          });
        break;
      case "Formula":
        mpApi
          .saveMonitoringFormulas(userInput, locationSelectValue)
          .then((result) => {
            console.log(result, " was saved");
          })
          .catch((error) => {
            console.log("error is", error);
          });
        break;
      case "Default":
        mpApi
          .saveMonitoringDefaults(userInput, locationSelectValue)
          .then((result) => {
            console.log(result, " was saved");
          })
          .catch((error) => {
            console.log("error is", error);
          });
        break;
      case "Unit Fuel":
        mpApi
          .saveMonitoringPlansFuelData(userInput)
          .then((result) => {
            console.log(result, " was saved");
          })
          .catch((error) => {
            console.log("error is", error);
          });
        break;
      case "Unit Control":
        mpApi
          .saveUnitControl(userInput, urlParameters ? urlParameters : null)
          .then((result) => {
            console.log(result, " was saved");
          })
          .catch((error) => {
            console.log("error is", error);
          });
        break;
      default:
        break;
    }
    setShow(false);
    setUpdateTable(true);
  };

  const createData = () => {
    const userInput = extractUserInput(
      payload,
      ".modalUserInput",
      radioName ? radioName : null
    );

    switch (dataTableName) {
      case "Load":
        mpApi
          .createMonitoringLoads(userInput)
          .then((result) => {
            console.log(result, " was created");
          })
          .catch((error) => {
            console.log("error is", error);
          });
        break;
      case "Rectangular Duct WAF":
        mpApi.createMonitoringDuct(userInput).catch((error) => {
          console.log("error is", error);
        });
        break;

      case "Span":
        mpApi
          .createMonitoringSpans(userInput)
          .then((result) => {
            console.log(result, " was created");
          })
          .catch((error) => {
            console.log("error is", error);
          });
        break;
      case "Formula":
        mpApi
          .createMonitoringFormulas(userInput, locationSelectValue)
          .then((result) => {
            console.log(result, " was created");
          })
          .catch((error) => {
            console.log("error is", error);
          });
        break;

      case "Default":
        mpApi
          .createMonitoringDefaults(userInput, locationSelectValue)
          .then((result) => {
            console.log(result, " was created");
          })
          .catch((error) => {
            console.log("error is", error);
          });
        break;

      case "Unit Fuel":
        mpApi
          .createFuelData(userInput, locationSelectValue)
          .then((result) => {
            console.log(result, " was created");
          })
          .catch((error) => {
            console.log("error is", error);
          });
        break;

      case "Unit Control":
        mpApi
          .createUnitControl(userInput, urlParameters ? urlParameters : null)
          .then((result) => {
            console.log(result, " was created");
          })
          .catch((error) => {
            console.log("error is", error);
          });
        break;
      default:
        break;
    }
    setShow(false);
    setUpdateTable(true);
  };

  // *** column names for dataset (will be passed to normalizeRowObjectFormat later to generate the row object
  // *** in the format expected by the modal / tabs plugins)

  // cant unit test properly
  const [createNewData, setCreateNewData] = useState(false);

  // Executed when "View" action is clicked
  const openModal = (row, bool, create) => {
    let selectedData = null;
    setCreateNewData(create);
    if (dataPulled.length > 0 && !create) {
      selectedData = dataPulled.filter(
        (element) => element.id === row[`col${Object.keys(row).length - 1}`]
      )[0];
      setSelectedRow(selectedData);
    }

    setSelectedModalData(
      modalViewData(
        selectedData,
        controlInputs,
        controlDatePickerInputs,
        create,
        totalOptions
      )
    );
    setShow(true);

    setTimeout(() => {
      attachChangeEventListeners(".modalUserInput");
    });
  };

  const [viewBtn, setViewBtn] = useState(null);
  const [addBtn, setAddBtn] = useState(null);

  const closeModalHandler = () => {
    if (window.isDataChanged === true) {
      if (window.confirm(unsavedDataMessage) === true) {
        setShow(false);
        removeChangeEventListeners(".modalUserInput");
      }
    } else {
      setShow(false);
      removeChangeEventListeners(".modalUserInput");
    }
    if (addBtn) {
      addBtn.focus();
    }
  };

  const data = useMemo(() => {
    console.log("locationSelectValue", locationSelectValue, dataPulled);
    if (dataPulled.length > 0) {
      const activeOnly = getActiveData(dataPulled);
      const inactiveOnly = getInactiveData(dataPulled);

      // only active data >  disable checkbox and unchecks it
      if (activeOnly.length === dataPulled.length) {
        // uncheck it and disable checkbox
        //function parameters ( check flag, disable flag )
        settingInactiveCheckBox(false, true);
        return getDataTableRecords(dataPulled, dataTableName);
      }

      // only inactive data > disables checkbox and checks it
      if (inactiveOnly.length === dataPulled.length) {
        //check it and disable checkbox
        settingInactiveCheckBox(true, true);
        return getDataTableRecords(dataPulled, dataTableName);
      }
      // resets checkbox
      settingInactiveCheckBox(inactive[0], false);
      return getDataTableRecords(
        !inactive[0] ? getActiveData(dataPulled) : dataPulled,
        dataTableName
      );
    }
    return [];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataPulled, inactive, locationSelectValue, dataTableName]);

  const testing = () => {
    openModal(false, false, true);
    saveData();
  };

  const testing2 = () => {
    openModal(
      { col5: "MELISSARHO-CDF765BC7BF849EE9C23608B95540200" },
      false,
      false
    );
  };
  const testing3 = () => {
    openModal(false, false, true);
    createData();
  };

  return (
    <div className="methodTable">
      <div className={`usa-overlay ${show ? "is-visible" : ""}`} />
      <input
        tabIndex={-1}
        aria-hidden={true}
        role="button"
        type="hidden"
        id="testingBtn"
        onClick={() => testing()}
      />
      <input
        tabIndex={-1}
        aria-hidden={true}
        role="button"
        type="hidden"
        id="testingBtn2"
        onClick={() => testing2()}
      />
      <input
        tabIndex={-1}
        aria-hidden={true}
        role="button"
        type="hidden"
        id="testingBtn3"
        onClick={() => testing3()}
      />

      <DataTableRender
        openHandler={openModal}
        columnNames={columnNames}
        data={data}
        dataLoaded={dataLoaded}
        pagination={pagination}
        filter={filter}
        actionsBtn={"View"}
        checkout={checkout}
        user={user}
        addBtn={openModal}
        addBtnName={"Create Load"}
        setViewBtn={setViewBtn}
        viewBtn={viewBtn}
        setAddBtn={setAddBtn}
      />
      {show ? (
        <Modal
          show={show}
          close={closeModalHandler}
          save={createNewData ? createData : saveData}
          showCancel={!(user && checkout)}
          showSave={user && checkout}
          title={createNewData ? `Create ${dataTableName}` : `${dataTableName}`}
          exitBTN={createNewData ? `Create ${dataTableName}` : `Save and Close`}
          children={
            <div>
              <ModalDetails
                modalData={selectedRow}
                data={selectedModalData}
                cols={2}
                title={`${dataTableName}`}
                viewOnly={!(user && checkout)}
              />
            </div>
          }
        />
      ) : null}
    </div>
  );
};

export default DataTableAssert;
