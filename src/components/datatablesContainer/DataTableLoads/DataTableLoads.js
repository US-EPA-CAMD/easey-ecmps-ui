import React, { useEffect, useMemo, useState } from "react";
import * as fs from "../../../utils/selectors/monitoringPlanLoads";
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
export const DataTableLoads = ({
  locationSelectValue,
  user,
  checkout,
  inactive,
  settingInactiveCheckBox,
  revertedState,
  setRevertedState,
  showModal = false,
}) => {
  const [loads, setLoads] = useState([]);
  const [show, setShow] = useState(showModal);
  const [selectedLoad, setSelectedLoad] = useState(null);
  const [selectedModalData, setSelectedModalData] = useState(null);
  const [dataLoaded, setDataLoaded] = useState(false);

  const totalOptions = useRetrieveDropdownApi([
    "maximumLoadUnitsOfMeasureCode",
    "normalLevelCode",
    "secondLevelCode",
  ]);
  const [updateTable, setUpdateTable] = useState(false);
  useEffect(() => {
    if (
      updateTable ||
      loads.length <= 0 ||
      locationSelectValue ||
      revertedState
    ) {
      mpApi.getMonitoringLoads(locationSelectValue).then((res) => {
        setLoads(res.data);
        setDataLoaded(true);
      });
      setUpdateTable(false);
      setRevertedState(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locationSelectValue, updateTable, revertedState]);

  // *** column names for dataset (will be passed to normalizeRowObjectFormat later to generate the row object
  // *** in the format expected by the modal / tabs plugins)
  const columnNames = [
    "Maximum Load Value",
    "Maximum Load Units of Measure",
    "Lower Operation Boundary",
    "Upper Operation Boundary",
    "Normal Level",
    "Second Level",
    "Second Normal Indicator",
    "Load Analysis Date",
    "Begin Date and Time",
    "End Date and Time",
  ];

  const payload = {
    locationId: locationSelectValue,
    id: null,
    maximumLoadValue: 0,
    maximumLoadUnitsOfMeasureCode: "string",
    lowerOperationBoundary: 0,
    upperOperationBoundary: 0,
    normalLevelCode: "string",
    secondLevelCode: "string",
    secondNormalIndicator: 0,
    loadAnalysisDate: "2021-09-16T20:55:48.806Z",
    beginDate: "2021-09-16T20:55:48.806Z",
    beginHour: 0,
    endDate: "2021-09-16T20:55:48.806Z",
    endHour: 0,
  };

  // cant unit test properly
  const [createNewLoad, setCreateNewLoad] = useState(false);

  // Executed when "View" action is clicked
  const openLoadModal = (row, bool, create) => {
    let load = null;
    setCreateNewLoad(create);
    if (loads.length > 0 && !create) {
      // console.log("row", row);
      load = loads.filter(
        (element) => element.id === row[`col${Object.keys(row).length - 1}`]
      )[0];
      // console.log(load, "selected load");
      setSelectedLoad(load);
    }

    setSelectedModalData(
      modalViewData(
        load,
        {
          maximumLoadValue: ["Maximum Load Value", "input", ""],
          maximumLoadUnitsOfMeasureCode: [
            "Maximum Load Units of Measure",
            "dropdown",
            "",
          ],
          lowerOperationBoundary: ["Lower Operation Boundary", "input", ""],
          upperOperationBoundary: ["Upper Operation Boundary", "input", ""],
          normalLevelCode: ["Normal Level", "dropdown", ""],
          secondLevelCode: ["Second Level", "dropdown", ""],
          secondNormalIndicator: ["Second Normal Indicator", "radio", ""],
        },
        {
          loadAnalysisDate: ["Load Analysis Date", "date", ""],
          beginDate: ["Start Date", "date", ""],
          beginHour: ["Start Time", "time", ""],
          endDate: ["End Date", "date", ""],
          endHour: ["End Time", "time", ""],
        },
        create,
        totalOptions
      )
    );
    setShow(true);

    setTimeout(() => {
      attachChangeEventListeners(".modalUserInput");
    });
  };

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
  };

  const data = useMemo(() => {
    if (loads.length > 0) {
      const activeOnly = getActiveData(loads);
      const inactiveOnly = getInactiveData(loads);

      // only active data >  disable checkbox and unchecks it
      if (activeOnly.length === loads.length) {
        // uncheck it and disable checkbox
        //function parameters ( check flag, disable flag )
        settingInactiveCheckBox(false, true);
        return fs.getMonitoringPlansLoadsTableRecords(loads);
      }

      // only inactive data > disables checkbox and checks it
      if (inactiveOnly.length === loads.length) {
        //check it and disable checkbox
        settingInactiveCheckBox(true, true);
        return fs.getMonitoringPlansLoadsTableRecords(loads);
      }
      // resets checkbox
      settingInactiveCheckBox(inactive[0], false);
      return fs.getMonitoringPlansLoadsTableRecords(
        !inactive[0] ? getActiveData(loads) : loads
      );
    }
    return [];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loads, inactive]);

  const testing = () => {
    openLoadModal(false, false, true);
    saveLoad();
  };

  const testing2 = () => {
    openLoadModal(
      { col5: "MELISSARHO-CDF765BC7BF849EE9C23608B95540200" },
      false,
      false
    );
  };
  const testing3 = () => {
    openLoadModal(false, false, true);
    createLoad();
  };

  const saveLoad = () => {
    var radioName = "secondNormalIndicator";

    const userInput = extractUserInput(payload, ".modalUserInput", radioName);

    mpApi
      .saveMonitoringLoads(userInput)
      .then((result) => {
        console.log(result, " was saved");
        // openModal(false);
        setShow(false);
      })
      .catch((error) => {
        console.log("error is", error);
        // openModal(false);
        setShow(false);
      });
    setUpdateTable(true);
  };

  const createLoad = () => {
    var radioName = "secondNormalIndicator";

    const userInput = extractUserInput(payload, ".modalUserInput", radioName);

    mpApi
      .createMonitoringLoads(userInput)
      .then((result) => {
        console.log(result, " was created");
        // openModal(false);
        setShow(false);
      })
      .catch((error) => {
        console.log("error is", error);
        // openModal(false);
        setShow(false);
      });
    setUpdateTable(true);
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
        openHandler={openLoadModal}
        columnNames={columnNames}
        data={data}
        dataLoaded={dataLoaded}
        pagination={false}
        filter={false}
        actionsBtn={"View"}
        checkout={checkout}
        user={user}
        addBtn={openLoadModal}
        addBtnName={"Create Load"}
      />
      {show ? (
        <Modal
          show={show}
          close={closeModalHandler}
          save={createNewLoad ? createLoad : saveLoad}
          showCancel={!(user && checkout)}
          showSave={user && checkout}
          title={createNewLoad ? "Create Load" : "Load"}
          exitBTN={createNewLoad ? "Create Load" : `Save and Close`}
          children={
            <div>
              <ModalDetails
                modalData={selectedLoad}
                data={selectedModalData}
                cols={2}
                title={"Load"}
                viewOnly={!(user && checkout)}
              />
            </div>
          }
        />
      ) : null}
    </div>
  );
};

export default DataTableLoads;
