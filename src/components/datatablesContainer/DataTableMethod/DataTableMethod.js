import React, { useEffect, useMemo, useState } from "react";
import * as fs from "../../../utils/selectors/monitoringPlanMethods";
import Modal from "../../Modal/Modal";
import ModalDetails from "../../ModalDetails/ModalDetails";
import { DataTableRender } from "../../DataTableRender/DataTableRender";
import { Preloader } from "../../Preloader/Preloader";
import { connect } from "react-redux";
import { loadDropdowns } from "../../../store/actions/dropdowns";
import {
  convertSectionToStoreName,
  METHODS_SECTION_NAME,
  METHODS_STORE_NAME,
} from "../../../additional-functions/data-table-section-and-store-names";

import { extractUserInput } from "../../../additional-functions/extract-user-input";
import { modalViewData } from "../../../additional-functions/create-modal-input-controls";
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

export const DataTableMethod = ({
  mdmData,
  loadDropdownsData,
  locationSelectValue,
  matsTableHandler,
  user,
  checkout,
  inactive,
  settingInactiveCheckBox,
  revertedState,
  setRevertedState,
  showModal = false,
}) => {
  const [methods, setMethods] = useState([]);
  const [matsMethods, setMatsMethods] = useState([]);
  const [show, setShow] = useState(showModal);
  const [selectedMonitoringMethod, setSelectedMonitoringMethod] =
    useState(null);
  const [selectedModalData, setSelectedModalData] = useState(null);
  const [dataLoaded, setDataLoaded] = useState(false);

  const [updateTable, setUpdateTable] = useState(false);
  const [dropdownsLoaded, setDropdownsLoaded] = useState(false);
  const dropdownArray = [
    [
      "parameterCode",
      "monitoringMethodCode",
      "substituteDataCode",
      "bypassApproachCode",
    ],
  ];

  useEffect(() => {
    if (
      updateTable ||
      methods.length <= 0 ||
      locationSelectValue ||
      revertedState
    ) {
      mpApi.getMonitoringMethods(locationSelectValue).then((methodRes) => {
        setMethods(methodRes.data);
        setDataLoaded(true);
        mpApi.getMonitoringMatsMethods(locationSelectValue).then((matRes) => {
          setMatsMethods(matRes.data);
          setUpdateTable(false);
          setRevertedState(false);
        });
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locationSelectValue, updateTable, revertedState]);

  // load dropdowns data (called when mdmData changes)
  useEffect(() => {
    if (mdmData.length === 0) {
      loadDropdownsData(METHODS_SECTION_NAME, dropdownArray);
    } else {
      setDropdownsLoaded(true);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mdmData]);

  // *** column names for dataset (will be passed to normalizeRowObjectFormat later to generate the row object
  // *** in the format expected by the modal / tabs plugins)
  const columnNames = [
    "Parameter",
    "Methodology",
    "Substitute Data Approach",
    "Bypass Approach",
    "Begin Date and Time",
    "End Date and Time",
  ];
  const payload = {
    locationId: locationSelectValue,
    id: null,
    parameterCode: null,
    substituteDataCode: null,
    bypassApproachCode: null,
    monitoringMethodCode: null,
    beginDate: null,
    beginHour: 0,
    endDate: null,
    endHour: 0,
  };
  // cant unit test properly
  const [createNewMethod, setCreateNewMethod] = useState(false);

  const testing = () => {
    openMethodModal(false, false, true);
    saveMethods();
  };

  const testing2 = () => {
    openMethodModal(
      { col7: "CAMD-BAC9D84563F24FE08057AF5643C8602C" },
      false,
      false
    );
  };

  const testing3 = () => {
    openMethodModal(false, false, true);
    createMethods();
  };

  const openMethodModal = (row, bool, create) => {
    let monMethod = null;
    setCreateNewMethod(create);
    if (methods.length > 0 && !create) {
      monMethod = methods.filter((element) => element.id === row.col7)[0];
      setSelectedMonitoringMethod(monMethod);
    }

    setSelectedModalData(
      modalViewData(
        monMethod,
        {
          parameterCode: ["Parameter", "dropdown", ""],
          monitoringMethodCode: ["Methodology", "dropdown", ""],
          substituteDataCode: ["Substitute Data Approach", "dropdown", ""],
          bypassApproachCode: ["Bypass Approach", "dropdown", ""],
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
    const matsAndMethods = matsMethods.concat(methods);
    if (matsAndMethods.length > 0) {
      console.log(matsAndMethods);
      const activeOnly = getActiveData(matsAndMethods);
      const inactiveOnly = getInactiveData(matsAndMethods);

      // only active data >  disable checkbox and unchecks it
      if (activeOnly.length === matsAndMethods.length) {
        // uncheck it and disable checkbox
        //function parameters ( check flag, disable flag )
        settingInactiveCheckBox(false, true);
        return fs.getMonitoringPlansMethodsTableRecords(methods);
      }

      // only inactive data > disables checkbox and checks it
      else if (inactiveOnly.length === matsAndMethods.length) {
        //check it and disable checkbox
        settingInactiveCheckBox(true, true);
        return fs.getMonitoringPlansMethodsTableRecords(methods);
      }
      // resets checkbox
      else {
        settingInactiveCheckBox(inactive[0], false);
        return fs.getMonitoringPlansMethodsTableRecords(
          !inactive[0] ? getActiveData(methods) : methods
        );
      }
    }
    return [];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [methods, matsMethods, inactive, updateTable]);

  useEffect(() => {
    if (matsTableHandler) {
      if (matsMethods.length < 1) {
        matsTableHandler(false);
      } else {
        matsTableHandler(true);
      }
    }
  }, [matsMethods.length, matsTableHandler]);

  const saveMethods = () => {
    const userInput = extractUserInput(payload, ".modalUserInput");

    mpApi
      .saveMonitoringMethods(userInput)
      .then((result) => {
        console.log(result, " was saved");
        // openModal(false);
        setShow(false);
        setUpdateTable(true);
      })
      .catch((error) => {
        console.log("error is", error);
        // openModal(false);
        setShow(false);
      });
  };

  const createMethods = () => {
    const userInput = extractUserInput(payload, ".modalUserInput");

    mpApi
      .createMethods(userInput)
      .then((result) => {
        console.log(result, " was created");
        // openModal(false);
        setShow(false);
        setUpdateTable(true);
      })
      .catch((error) => {
        console.log("error is", error);
        // openModal(false);
        setShow(false);
      });
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
        openHandler={openMethodModal}
        columnNames={columnNames}
        data={data}
        dataLoaded={dataLoaded && dropdownsLoaded}
        actionsBtn={"View"}
        checkout={checkout}
        user={user}
        addBtn={openMethodModal}
        addBtnName={"Create Method"}
        setViewBtn={setViewBtn}
        viewBtn={viewBtn}
        setAddBtn={setAddBtn}
        show={show}
      />
      {show ? (
        <Modal
          show={show}
          close={closeModalHandler}
          save={createNewMethod ? createMethods : saveMethods}
          showCancel={!(user && checkout)}
          showSave={user && checkout}
          title={createNewMethod ? "Create Method" : "Method"}
          exitBTN={createNewMethod ? "Create Method" : `Save and Close`}
          children={
            dropdownsLoaded ? (
              <div>
                <ModalDetails
                  modalData={selectedMonitoringMethod}
                  data={selectedModalData}
                  cols={2}
                  title={"Method"}
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
    mdmData: state.dropdowns[METHODS_STORE_NAME],
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
export default connect(mapStateToProps, mapDispatchToProps)(DataTableMethod);
export { mapDispatchToProps };
export { mapStateToProps };
