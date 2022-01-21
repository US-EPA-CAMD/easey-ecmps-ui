import React, { useEffect, useMemo, useState } from "react";
import { modalViewData } from "../../../additional-functions/create-modal-input-controls";
import { extractUserInput } from "../../../additional-functions/extract-user-input";
import * as fs from "../../../utils/selectors/monitoringPlanMethods";
import { DataTableRender } from "../../DataTableRender/DataTableRender";

import {
  getActiveData,
  getInactiveData,
} from "../../../additional-functions/filter-data";

import Modal from "../../Modal/Modal";
import ModalDetails from "../../ModalDetails/ModalDetails";
import * as mpApi from "../../../utils/api/monitoringPlansApi";

import { Preloader } from "../../Preloader/Preloader";
import { connect } from "react-redux";
import { loadDropdowns } from "../../../store/actions/dropdowns";
import {
  convertSectionToStoreName,
  MATS_METHODS_SECTION_NAME,
  MATS_METHODS_STORE_NAME,
} from "../../../additional-functions/data-table-section-and-store-names";

import {
  attachChangeEventListeners,
  removeChangeEventListeners,
  unsavedDataMessage,
} from "../../../additional-functions/prompt-to-save-unsaved-changes";

export const DataTableMats = ({
  mdmData,
  loadDropdownsData,
  locationSelectValue,
  user,
  checkout,
  revertedState,
  setRevertedState,
  inactive,
  settingInactiveCheckBox,
  setUpdateRelatedTables,
  updateRelatedTables,
}) => {
  const [dataLoaded, setDataLoaded] = useState(false);
  const [matsMethods, setMatsMethods] = useState([]);
  const [methods, setMethods] = useState([]);
  const [show, setShow] = useState(false);
  const [updateTable, setUpdateTable] = useState(false);

  const dropdownArray = [["parameterCode", "monitoringMethodCode"], true];
  const [dropdownsLoaded, setDropdownsLoaded] = useState(false);

  useEffect(() => {
    if (
      updateTable ||
      matsMethods.length <= 0 ||
      locationSelectValue ||
      revertedState ||
      updateRelatedTables
    ) {
      mpApi.getMonitoringMatsMethods(locationSelectValue).then((res) => {
        setMatsMethods(res.data);
        mpApi.getMonitoringMethods(locationSelectValue).then((mets) => {
          setMethods(mets.data);
          setUpdateTable(false);
          setDataLoaded(true);
          setUpdateRelatedTables(false);
        });
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locationSelectValue, updateTable, revertedState, updateRelatedTables]);

  // load dropdowns data (called once)
  useEffect(() => {
    if (mdmData.length === 0) {
      loadDropdownsData(MATS_METHODS_SECTION_NAME, dropdownArray);
    } else {
      setDropdownsLoaded(true);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mdmData]);

  const [selectedMatsMethods, setSelectedMatsMethods] = useState(null);
  // *** column names for dataset (will be passed to normalizeRowObjectFormat later to generate the row object
  // *** in the format expected by the modal / tabs plugins)
  const columnNames = [
    "Parameter",
    "Methodology",
    "Begin Date and Time",
    "End Date and Time",
  ];

  const payload = {
    locationId: locationSelectValue,
    id: null,
    supplementalMATSMonitoringMethodCode: null,
    supplementalMATSParameterCode: null,
    beginDate: null,
    beginHour: 0,
    endDate: null,
    endHour: 0,
  };
  const data = useMemo(() => {
    const matsAndMethods = matsMethods.concat(methods);
    if (matsAndMethods.length > 0) {
      const activeOnly = getActiveData(matsAndMethods);
      const inactiveOnly = getInactiveData(matsAndMethods);
      // Note: settingInactiveCheckbox -> function parameters ( check flag, disable flag )

      // if ONLY ACTIVE records return,
      if (activeOnly.length === matsAndMethods.length) {
        // then disable the inactive checkbox and set it as un-checked
        settingInactiveCheckBox(false, true);
        return fs.getMonitoringPlansMatsMethodsTableRecords(matsMethods);
      }

      // if ONLY INACTIVE records return
      else if (inactiveOnly.length === matsAndMethods.length) {
        // then disable the inactive checkbox and set it as checked
        settingInactiveCheckBox(true, true);
        return fs.getMonitoringPlansMatsMethodsTableRecords(matsMethods);
      }

      // if BOTH ACTIVE & INACTIVE records return
      else {
        // then enable the inactive checkbox (user can mark it as checked/un-checked manually)
        settingInactiveCheckBox(inactive[0], false);
        return fs.getMonitoringPlansMatsMethodsTableRecords(
          !inactive[0] ? getActiveData(matsMethods) : matsMethods
        );
      }
    }

    // if NO RECORDS are returned
    else {
      // disable the inactive checkbox and set it as un-checked
      settingInactiveCheckBox(false, true);
      return [];
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [matsMethods, methods, inactive, updateTable]);
  const testing = () => {
    openMatsModal(false, false, true);
    saveMats();
  };

  const testing2 = () => {
    openMatsModal(
      { col5: "MELISSARHO-CDF765BC7BF849EE9C23608B95540200" },
      false,
      false
    );
  };
  const testing3 = () => {
    openMatsModal(false, false, true);
    createMats();
  };

  const saveMats = () => {
    const userInput = extractUserInput(payload, ".modalUserInput");
    mpApi
      .saveMonitoringMats(userInput)
      .then((result) => {
        console.log(result);
        setShow(false);
        setUpdateTable(true);
        setUpdateRelatedTables(true);
      })
      .catch((error) => {
        console.log(error);
        setShow(false);
      });
  };
  const createMats = () => {
    const userInput = extractUserInput(payload, ".modalUserInput");
    mpApi
      .createMats(userInput)
      .then((result) => {
        setShow(false);
        setUpdateTable(true);
        setUpdateRelatedTables(true);
      })
      .catch((error) => {
        console.log(error);
        setShow(false);
      });
  };

  const [createNewMats, setCreateNewMats] = useState(false);
  const [selectedModalData, setSelectedModalData] = useState(null);

  const openMatsModal = (row, bool, create) => {
    let mats = null;
    setCreateNewMats(create);
    if (matsMethods.length > 0 && !create) {
      mats = matsMethods.filter((element) => element.id === row.col5)[0];
      setSelectedMatsMethods(mats);
    }
    setSelectedModalData(
      modalViewData(
        mats,
        {
          supplementalMATSParameterCode: ["Parameter", "dropdown", ""],
          supplementalMATSMonitoringMethodCode: ["Methodology", "dropdown", ""],
        },
        {
          beginDate: ["Start Date", "date", ""],
          beginHour: ["Start Time", "time", ""],
          endDate: ["End Date", "date", ""],
          endHour: ["End Time", "time", ""],
        },
        create,
        mdmData
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
        columnNames={columnNames}
        data={data}
        dataLoaded={dataLoaded && dropdownsLoaded}
        // actionsBtn={"View"}
        checkout={checkout}
        user={user}
        openHandler={openMatsModal}
        actionsBtn={"View"}
        addBtn={openMatsModal}
        addBtnName={"Create MATS"}
      />

      {show ? (
        <Modal
          show={show}
          close={closeModalHandler}
          save={createNewMats ? createMats : saveMats}
          showCancel={!(user && checkout)}
          showSave={user && checkout}
          ariaLabel={"MATS Methods"}
          title={
            createNewMats ? "Create MATS" : "Component: Monitoring MATS Methods"
          }
          exitBTN={createNewMats ? "Create MATS" : `Save and Close`}
          children={
            dropdownsLoaded ? (
              <div>
                <ModalDetails
                  modalData={selectedMatsMethods}
                  data={selectedModalData}
                  cols={2}
                  title={"Component: Monitoring MATS Methods"}
                  viewOnly={!(user && checkout)}
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

const mapStateToProps = (state) => {
  return {
    mdmData: state.dropdowns[MATS_METHODS_STORE_NAME],
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadDropdownsData: async (section, dropdownArray) => {
      dispatch(
        loadDropdowns(convertSectionToStoreName(section), dropdownArray)
      );
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(DataTableMats);
export { mapDispatchToProps };
export { mapStateToProps };
