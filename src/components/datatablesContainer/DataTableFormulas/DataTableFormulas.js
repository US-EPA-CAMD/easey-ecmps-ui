import React, { useEffect, useMemo, useState } from "react";
import { DataTableRender } from "../../DataTableRender/DataTableRender";
import Modal from "../../Modal/Modal";
import ModalDetails from "../../ModalDetails/ModalDetails";
import { modalViewData } from "../../../additional-functions/create-modal-input-controls";
import { useRetrieveDropdownApi } from "../../../additional-functions/retrieve-dropdown-api";
import { extractUserInput } from "../../../additional-functions/extract-user-input";
import * as fs from "../../../utils/selectors/monitoringPlanFormulas";
import * as mpApi from "../../../utils/api/monitoringPlansApi";

import {
  getActiveData,
  getInactiveData,
} from "../../../additional-functions/filter-data";

import {
  attachChangeEventListeners,
  removeChangeEventListeners,
  unsavedDataMessage,
} from "../../../additional-functions/prompt-to-save-unsaved-changes";

export const DataTableFormulas = ({
  locationSelectValue,
  user,
  checkout,
  inactive,
  settingInactiveCheckBox,
  revertedState,
  setRevertedState,
  showModal = false,
}) => {
  const [formulas, setFormulas] = useState([]);
  const [show, setShow] = useState(showModal);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [selectedFormula, setSelectedFormula] = useState(null);
  const [selectedModalData, setSelectedModalData] = useState(null);
  const [createNewFormula, setCreateNewFormula] = useState(false);

  //Columns to be displayed in the data table
  const columnNames = [
    "Formula ID",
    "Parameter",
    "Formula Code",
    "Formula",
    "Begin Date and Time",
    "End Date and Time",
  ];

  //Call for the initial data load, and to refresh the table after records are created/updated
  const [updateTable, setUpdateTable] = useState(false);
  useEffect(() => {
    if (
      updateTable ||
      formulas.length <= 0 ||
      locationSelectValue ||
      revertedState
    ) {
      mpApi.getMonitoringFormulas(locationSelectValue).then((res) => {
        setFormulas(res.data);
        setDataLoaded(true);
      });
      setUpdateTable(false);
      setRevertedState(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locationSelectValue, updateTable, revertedState]);

  //Load the data that will be displayed in the table
  const data = useMemo(() => {
    if (formulas.length > 0) {
      const activeOnly = getActiveData(formulas);
      const inactiveOnly = getInactiveData(formulas);

      // only active data >  disable checkbox and unchecks it
      if (activeOnly.length === formulas.length) {
        // uncheck it and disable checkbox
        //function parameters ( check flag, disable flag )
        settingInactiveCheckBox(false, true);
        return fs.getMonitoringPlansFormulasTableRecords(formulas);
      }

      // only inactive data > disables checkbox and checks it
      if (inactiveOnly.length === formulas.length) {
        //check it and disable checkbox
        settingInactiveCheckBox(true, true);
        return fs.getMonitoringPlansFormulasTableRecords(formulas);
      }
      // resets checkbox
      settingInactiveCheckBox(inactive[0], false);
      return fs.getMonitoringPlansFormulasTableRecords(
        !inactive[0] ? getActiveData(formulas) : formulas
      );
    }
    return [];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formulas, inactive]);

  //Selectable
  const totalOptions = useRetrieveDropdownApi(["parameterCode", "formulaCode"]);

  // Executed when "View" action is clicked
  const openFormulaModal = (row, bool, create) => {
    let formula = null;
    setCreateNewFormula(create);
    if (formulas.length > 0 && !create) {
      formula = formulas.filter(
        (element) => element.id === row[`col${Object.keys(row).length - 1}`]
      )[0];
      console.log("formula", formula);
      setSelectedFormula(formula);
    }
    setSelectedModalData(
      modalViewData(
        formula,
        {
          formulaId: ["Formula ID", "input", ""],
          parameterCode: ["Parameter", "dropdown", ""],
          formulaCode: ["Formula Code", "dropdown", ""],
          formulaText: ["Formula", "input", ""],
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

  const [viewBtn, setViewBtn] = useState(null);
  const [addBtn, setAddBtn] = useState(null);

  //Closed the Modal
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

  //Used for creating/updating formula data
  const payload = {
    formulaId: "string",
    parameterCode: "string",
    formulaCode: "string",
    formulaText: "string",
    beginDate: "2021-10-21T17:12:00.643Z",
    beginHour: 0,
    endDate: "2021-10-21T17:12:00.643Z",
    endHour: 0,
  };

  const saveFormula = () => {
    const userInput = extractUserInput(payload, ".modalUserInput");

    mpApi
      .saveMonitoringFormulas(userInput, selectedFormula.locationId)
      .then((result) => {
        console.log(result, " was saved");
        setShow(false);
      })
      .catch((error) => {
        console.log("error is", error);
        // openModal(false);
        setShow(false);
      });
    setUpdateTable(true);
  };

  const createFormula = () => {};

  return (
    <div className="formulaTable">
      <div className={`usa-overlay ${show ? "is-visible" : ""}`} />
      <DataTableRender
        openHandler={openFormulaModal}
        columnNames={columnNames}
        data={data}
        dataLoaded={dataLoaded}
        pagination={false}
        filter={false}
        actionsBtn={"View"}
        checkout={checkout}
        user={user}
        addBtn={openFormulaModal}
        addBtnName={"Create Formulas"}
        setViewBtn={setViewBtn}
        viewBtn={viewBtn}
        setAddBtn={setAddBtn}
      />
      {show ? (
        <Modal
          show={show}
          close={closeModalHandler}
          save={createNewFormula ? createFormula : saveFormula}
          showCancel={!(user && checkout)}
          showSave={user && checkout}
          title={createNewFormula ? "Create Formula" : "Formula"}
          exitBTN={createNewFormula ? "Create Formula" : `Save and Close`}
          children={
            <div>
              <ModalDetails
                modalData={selectedFormula}
                data={selectedModalData}
                cols={2}
                title={"Formula"}
                viewOnly={!(user && checkout)}
              />
            </div>
          }
        />
      ) : null}
    </div>
  );
};

export default DataTableFormulas;
