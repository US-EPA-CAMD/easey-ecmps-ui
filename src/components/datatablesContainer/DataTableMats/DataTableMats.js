import React, { useEffect, useMemo, useState } from "react";
import { modalViewData } from "../../../additional-functions/create-modal-input-controls";
import {
  extractUserInput,
  validateUserInput,
} from "../../../additional-functions/extract-user-input";
import * as fs from "../../../utils/selectors/monitoringPlanMethods";
import { DataTableRender } from "../../DataTableRender/DataTableRender";
import {
  assignFocusEventListeners,
  cleanupFocusEventListeners,
} from "../../../additional-functions/manage-focus";
import {
  getActiveData,
  getInactiveData,
} from "../../../additional-functions/filter-data";

import Modal from "../../Modal/Modal";
import ModalDetails from "../../ModalDetails/ModalDetails";
import * as mpApi from "../../../utils/api/monitoringPlansApi";

import { Preloader } from "@us-epa-camd/easey-design-system";
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
import { ensure508 } from "../../../additional-functions/ensure-508";
import { returnsFocusMpDatatableCreateBTN } from '../../../additional-functions/ensure-508'

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
  currentTabIndex,
  tabs,
}) => {
  const [dataLoaded, setDataLoaded] = useState(false);
  const [matsMethods, setMatsMethods] = useState([]);
  const [methods, setMethods] = useState([]);
  const [show, setShow] = useState(false);
  const [updateTable, setUpdateTable] = useState(false);

  const dropdownArray = [
    ["parameterCode", "monitoringMethodCode", "prefilteredMatsMethods"],
    true,
  ];
  const [dropdownsLoaded, setDropdownsLoaded] = useState(false);

  const selectText = "-- Select a value --";
  const [errorMsgs, setErrorMsgs] = useState([]);

  const [returnedFocusToLast, setReturnedFocusToLast] = useState(false);

  const dataTableName = "Supplemental Methods";

  // *** Assign initial event listeners after loading data/dropdowns
  useEffect(() => {
    if (dataLoaded && dropdownsLoaded) {
      assignFocusEventListeners();
      ensure508();
    }
  }, [dataLoaded, dropdownsLoaded]);

  // *** Reassign handlers after pop-up modal is closed
  useEffect(() => {
    if (!returnedFocusToLast) {
      setReturnedFocusToLast(true);
      ensure508();
    } else {
      assignFocusEventListeners();
    }
  }, [returnedFocusToLast]);

  // *** Clean up focus event listeners
  useEffect(() => {
    return () => {
      cleanupFocusEventListeners();
    };
  }, []);

  useEffect(() => {
    if (
      updateTable ||
      matsMethods.length <= 0 ||
      locationSelectValue ||
      revertedState ||
      updateRelatedTables
    ) {
      mpApi.getMonitoringMatsMethods(locationSelectValue).then((res) => {
        if(res?.data){
          setMatsMethods(res.data);
          mpApi.getMonitoringMethods(locationSelectValue).then((mets) => {
            setMethods(mets.data);
            setUpdateTable(false);
            setDataLoaded(true);
            setUpdateRelatedTables(false);
          });
        }
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
    "Begin Date/Time",
    "End Date/Time",
  ];

  const payload = {
    locationId: locationSelectValue,
    id: "string",
    supplementalMATSMonitoringMethodCode: "string",
    supplementalMATSParameterCode: "string",
    beginDate: "string",
    beginHour: 0,
    endDate: "string",
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
        settingInactiveCheckBox(tabs[currentTabIndex].inactive[0], false);
        return fs.getMonitoringPlansMatsMethodsTableRecords(
          tabs[currentTabIndex].inactive[0] === false
            ? getActiveData(matsMethods)
            : matsMethods
        );
      }
    }

    // if NO RECORDS are returned
    else {
      // disable the inactive checkbox and set it as un-checked
      // settingInactiveCheckBox(false, true);
      return [];
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [matsMethods, methods, tabs[currentTabIndex].inactive[0], updateTable]);

  const saveMats = async () => {
    const userInput = extractUserInput(payload, ".modalUserInput");
    const validationErrors = validateUserInput(userInput, dataTableName);
    if (validationErrors.length > 0) {
      setErrorMsgs(validationErrors);
      return;
    }
    try {
      const resp = await mpApi.saveMonitoringMats(userInput)
        .catch(error => console.log('saveMonitoringMats failed', error));
      if (resp.status === 200) {
        setShow(false);
        setUpdateTable(true);
        setUpdateRelatedTables(true);
      } else {
        const errorResp = Array.isArray(resp) ? resp : [resp];
        setErrorMsgs(errorResp);
      }
    } catch (error) {
      setErrorMsgs([JSON.stringify(error)]);
    }
  };
  const createMats = async () => {
    const userInput = extractUserInput(payload, ".modalUserInput");
    const validationErrors = validateUserInput(userInput, dataTableName);
    if (validationErrors.length > 0) {
      setErrorMsgs(validationErrors);
      return;
    }
    try {
      const resp = await mpApi.createMats(userInput)
        .catch(error => console.log('createMats failed', error));
      if (resp.status === 201) {
        setShow(false);
        setUpdateTable(true);
        setUpdateRelatedTables(true);
      } else {
        const errorResp = Array.isArray(resp) ? resp : [resp];
        setErrorMsgs(errorResp);
      }
    } catch (error) {
      setErrorMsgs([JSON.stringify(error)]);
    }
  };

  const [createNewMats, setCreateNewMats] = useState(false);
  const [selectedModalData, setSelectedModalData] = useState(null);

  // state for handling dynamic dropdowns
  const [mainDropdownChange, setMainDropdownChange] = useState("");
  const [prefilteredMdmData, setPrefilteredMdmData] = useState(false);

  useEffect(() => {
    // Update all the "secondary dropdowns" (based on the "main" dropdown)
    const prefilteredDataName = "supplementalMATSParameterCode";
    if (prefilteredMdmData) {
      const result = prefilteredMdmData.filter(
        (prefiltered) => prefiltered[prefilteredDataName] === mainDropdownChange
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

          // Modal focus resets to close button on setState
          if (modalDetailData[4] === "mainDropdown") {
            // Overrides the firstComponentFocusableElement.focus() in focus-trap
            setTimeout(() => {
              document.getElementById(modalDetailData[1]).focus();
            });
            // Overrides the document.querySelector("#closeModalBtn").focus() in Modal
            setTimeout(() => {
              document.getElementById(modalDetailData[1]).focus();
            }, 1000);
          }
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mainDropdownChange, selectedModalData]);

  const openMatsModal = (row, bool, create) => {
    let mats = null;
    setCreateNewMats(create);
    if (matsMethods.length > 0 && !create) {
      mats = matsMethods.filter((element) => element.id === row.col5)[0];
      setSelectedMatsMethods(mats);
    }

    const mainDropdownName = "supplementalMATSParameterCode";

    // Get the name of the property of the correct array in mdmData (full data set)
    const prefilteredDataName = dropdownArray[0][dropdownArray[0].length - 1];

    // Get the descriptions from the original dropdowns set
    const mainDropdownResult = mdmData[mainDropdownName].filter((o) =>
      mdmData[prefilteredDataName].some(
        (element, index, arr) => o.code === element[mainDropdownName]
      )
    );

    // Add the select text if necessary
    if (!mainDropdownResult.includes({ code: "", name: selectText })) {
      mainDropdownResult.unshift({ code: "", name: selectText });
    }

    setPrefilteredMdmData(mdmData[prefilteredDataName]);

    setSelectedModalData(
      modalViewData(
        mats,
        {
          supplementalMATSParameterCode: ["Parameter", "mainDropdown", ""],
          supplementalMATSMonitoringMethodCode: ["Methodology", "dropdown", ""],
        },
        {
          beginDate: ["Start Date", "date", ""],
          beginHour: ["Start Time", "hourDropdown", ""],
          endDate: ["End Date", "date", ""],
          endHour: ["End Time", "hourDropdown", ""],
        },
        create,
        mdmData,
        mdmData[prefilteredDataName],
        mainDropdownName,
        mainDropdownResult
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
        executeOnClose();
      }
    } else {
      executeOnClose();
    }
  };

  const executeOnClose = () => {
    setErrorMsgs([]);
    setShow(false);
    removeChangeEventListeners(".modalUserInput");
    setReturnedFocusToLast(false);
    if (createNewMats) {
      returnsFocusMpDatatableCreateBTN("Create MATS")
    }
  };

  return (
    <div className="methodTable">
      <div className={`usa-overlay ${show ? "is-visible" : ""}`} />

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
          errorMsgs={errorMsgs}
          children={
            dropdownsLoaded ? (
              <div>
                <ModalDetails
                  modalData={selectedMatsMethods}
                  data={selectedModalData}
                  prefilteredMdmData={prefilteredMdmData}
                  cols={2}
                  title={"Component: Monitoring MATS Methods"}
                  viewOnly={!(user && checkout)}
                  create={createNewMats}
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

const mapStateToProps = (state) => {
  return {
    mdmData: state.dropdowns[MATS_METHODS_STORE_NAME],
    tabs: state.openedFacilityTabs["monitoringPlans"],
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
