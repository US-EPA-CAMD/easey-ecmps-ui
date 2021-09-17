import React, { useEffect, useMemo, useState } from "react";
import * as fs from "../../../utils/selectors/monitoringPlanSpans";
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

export const DataTableSpans = ({
  locationSelectValue,
  user,
  checkout,
  inactive,
  settingInactiveCheckBox,
  revertedState,
  setRevertedState,
  showModal = false,
}) => {
  const [spans, setSpans] = useState([]);
  const [show, setShow] = useState(showModal);
  const [selectedSpan, setSelectedSpan] = useState(null);
  const [selectedModalData, setSelectedModalData] = useState(null);
  const [dataLoaded, setDataLoaded] = useState(false);

  const totalOptions = useRetrieveDropdownApi([
    "componentTypeCode",
    "spanScaleCode",
    "spanMethodCode",
    "spanUnitsOfMeasureCode",
  ]);
  const [updateTable, setUpdateTable] = useState(false);
  useEffect(() => {
    if (
      updateTable ||
      spans.length <= 0 ||
      locationSelectValue ||
      revertedState
    ) {
      mpApi.getMonitoringSpans(locationSelectValue).then((res) => {
        setSpans(res.data);
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
    "Component Type",
    "Span Scale",
    "Span Method",
    // "MEC Value",
    // "MPC Value",
    // "MPF Value",
    // "Span Value",
    // "Full Scale Range",
    "Span Units of Measure",
    // "Scale Transition Point",
    // "Default High Range",
    // "Flow Span Value",
    // "Flow Full Scale Range",
    "Begin Date and Time",
    "End Date and Time",
  ];
  const payload = {
    locationId: locationSelectValue,
    id: null,
    componentTypeCode: "string",
    spanScaleCode: "string",
    spanMethodCode: "string",
    mecValue: 0,
    mpcValue: 0,
    mpfValue: 0,
    spanValue: 0,
    fullScaleRange: 0,
    spanUnitsOfMeasureCode: "string",
    scaleTransitionPoint: "string",
    defaultHighRange: 0,
    flowSpanValue: 0,
    flowFullScaleRange: 0,
    beginDate: "2021-09-16T20:55:48.806Z",
    beginHour: 0,
    endDate: "2021-09-16T20:55:48.806Z",
    endHour: 0,
  };
  // cant unit test properly
  const [createNewSpan, setCreateNewSpan] = useState(false);

  const testing = () => {
    openSpanModal(false, false, true);
    // saveMethods();
    // createMethods();
  };

  const testing2 = () => {
    openSpanModal(
      { col7: "CAMD-BAC9D84563F24FE08057AF5643C8602C" },
      false,
      false
    );
  };

  const openSpanModal = (row, bool, create) => {
    let span = null;
    setCreateNewSpan(create);
    if (spans.length > 0 && !create) {
      console.log('row',row)
      span = spans.filter((element) => element.id === row[`col${Object.keys(row).length-1}`])[0];
      setSelectedSpan(span);
    }

    setSelectedModalData(
      modalViewData(
        span,
        {
          componentTypeCode: ["Component Type", "dropdown", ""],
          spanScaleCode: ["Span Scale", "dropdown", ""],
          spanMethodCode: ["Span Method", "dropdown", ""],
          mecValue: ["MEC Value", "input", ""],
          mpcValue: ["MPC Value", "input", ""],
          mpfValue: ["MPF Value", "input", ""],
          spanValue: ["Span Value", "input", ""],
          fullScaleRange: ["Full Scale Range", "input", ""],
          spanUnitsOfMeasureCode: [
            "Span Units of Measure",
            "dropdown",
            "",
          ],
          scaleTransitionPoint: ["Scale Transition Point", "input", ""],
          defaultHighRange: ["Default High Range", "input", ""],
          flowSpanValue: ["Flow Span Value", "input", ""],
          flowFullScaleRange: ["Flow Full Scale Range", "input", ""],
          skip: ["", "skip", ""],
        },
        {
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
    if (spans.length > 0) {
      const activeOnly = getActiveData(spans);
      const inactiveOnly = getInactiveData(spans);

      // only active data >  disable checkbox and unchecks it
      if (activeOnly.length === spans.length) {
        // uncheck it and disable checkbox
        //function parameters ( check flag, disable flag )
        settingInactiveCheckBox(false, true);
        return fs.getMonitoringPlansSpansTableRecords(spans);
      }

      // only inactive data > disables checkbox and checks it
      if (inactiveOnly.length === spans.length) {
        //check it and disable checkbox
        settingInactiveCheckBox(true, true);
        return fs.getMonitoringPlansSpansTableRecords(spans);
      }
      // resets checkbox
      settingInactiveCheckBox(inactive[0], false);
      return fs.getMonitoringPlansSpansTableRecords(
        !inactive[0] ? getActiveData(spans) : spans
      );
    }
    return [];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [spans, inactive]);

  // const saveMethods = () => {
  //   const userInput = extractUserInput(payload, ".modalUserInput");

  //   mpApi
  //     .saveMonitoringMethods(userInput)
  //     .then((result) => {
  //       console.log(result, " was saved");
  //       // openModal(false);
  //       setShow(false);
  //     })
  //     .catch((error) => {
  //       console.log("error is", error);
  //       // openModal(false);
  //       setShow(false);
  //     });
  //   setUpdateTable(true);
  // };

  // const createMethods = () => {
  //   const userInput = extractUserInput(payload, ".modalUserInput");

  //   mpApi
  //     .createMethods(userInput)
  //     .then((result) => {
  //       console.log(result, " was created");
  //       // openModal(false);
  //       setShow(false);
  //     })
  //     .catch((error) => {
  //       console.log("error is", error);
  //       // openModal(false);
  //       setShow(false);
  //     });
  //   setUpdateTable(true);
  // };
  return (
    <div className="methodTable">
      <div className={`usa-overlay ${show ? "is-visible" : ""}`} />
      {/* <input
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
      /> */}
      <DataTableRender
        openHandler={openSpanModal}
        columnNames={columnNames}
        data={data}
        dataLoaded={dataLoaded}
        actionsBtn={"View"}
        checkout={checkout}
        user={user}
        addBtn={openSpanModal}
        addBtnName={"Create Span"}
      />
      {show ? (
        <Modal
          show={show}
          close={closeModalHandler}
          // save={createNewSpan ? createNewSpans : saveSpans}
          showCancel={!(user && checkout)}
          showSave={user && checkout}
          title={createNewSpan ? "Create Span" : "Span"}
          exitBTN={createNewSpan ? "Create Span" : `Save and Close`}
          children={
            <div>
              <ModalDetails
                modalData={selectedSpan}
                data={selectedModalData}
                cols={2}
                title={"Span"}
                viewOnly={!(user && checkout)}
              />
            </div>
          }
        />
      ) : null}
    </div>
  );
};

export default DataTableSpans;
