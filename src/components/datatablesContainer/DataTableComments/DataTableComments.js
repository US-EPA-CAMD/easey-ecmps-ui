import React, { useEffect, useState } from "react";
import log from "loglevel";
import { modalViewData } from "../../../additional-functions/create-modal-input-controls";
import {
  extractUserInput,
  validateUserInput,
} from "../../../additional-functions/extract-user-input";
import * as fs from "../../../utils/selectors/monitoringPlanMethods";
import DataTableRender from "../../DataTableRender/DataTableRender";
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
import { returnsFocusMpDatatableCreateBTN } from "../../../additional-functions/ensure-508";

export const DataTableComments = ({
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
  reportDataStatus,
  selectedConfigId
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

  const [commentData, setCommentsData] =  useState([]);
  const [filterCommentData, setFilterCommentData] =  useState([]);

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
      commentData.length <= 0 ||
      locationSelectValue ||
      revertedState ||
      updateRelatedTables
    ) {
      setDataLoaded(false);
      mpApi.getMonitoringPlanComments(selectedConfigId)
      
            .then((data) => {
              setCommentsData(data.data?.items);
              const filteredData = data.data?.items.map(({ id, monitoringPlanComment, beginDate, endDate }) => ({
              monitoringPlanComment,
              beginDate,
              endDate,
              id
              }))
              const records = [];
                filteredData.forEach((el) => {
                records.push({
                  col1: el?.monitoringPlanComment,
                  col2: el?.beginDate,
                  col3: el?.endDate,
                  col4: el?.id
                });
              });
              setFilterCommentData(records)
              setUpdateTable(false);
              setDataLoaded(true);
              setUpdateRelatedTables(false);
            })
            .catch((error) => {
            log.error("Error during getting comments", error);
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
    "Monitoring Plan Comment",
    "Begin Date",
    "End Date",
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



  const saveMats = async () => {
    const userInput = extractUserInput(payload, ".modalUserInput");
    const validationErrors = validateUserInput(userInput, dataTableName);
    if (validationErrors.length > 0) {
      setErrorMsgs(validationErrors);
      return;
    }
    try {
      const resp = await mpApi
        .saveMonitoringMats(userInput)
        .catch((error) => log.log("saveMonitoringMats failed", error));
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
      const resp = await mpApi
        .createMats(userInput)
        .catch((error) => log.log("createMats failed", error));
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

  const openMatsModal = (row, bool, create) => {
    console.log("openMatsModal")
    console.log(row)
    let mats = null;
    setCreateNewMats(create);

    if (commentData.length > 0 && !create) {
      mats = commentData.filter((element) =>
        {
          console.log(element)
          console.log(`col${Object.keys(row).length - 1}`)
          console.log(row[`col${Object.keys(row).length - 1}`])
         return element.id === row[`col${Object.keys(row).length - 1}`]

        }
         
      )[0];
      setSelectedMatsMethods(mats);
    }
    console.log(mats)
    setSelectedModalData(
      modalViewData(
        mats,
        {
          monitoringPlanComment: ["Monitoring Plan Comment", "textArea", ""],
        },
        {
          beginDate: ["Begin Date", "date", ""],
          endDate: ["End Date", "date", ""],

        },
        create,
      ),
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
      returnsFocusMpDatatableCreateBTN("Create MATS");
    }
  };

  return (
    <div className="methodTable">
      <div className={`usa-overlay ${show ? "is-visible" : ""}`} />

      <DataTableRender
        columnNames={columnNames}
        data={filterCommentData}
        dataLoaded={dataLoaded}
        // actionsBtn={"View"}
        checkout={checkout}
        user={user}
        openHandler={openMatsModal}
        actionsBtn={"View"}
        addBtn={openMatsModal}
        addBtnName={"Create Comment"}
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
          exitBtn={createNewMats ? "Create MATS" : `Save and Close`}
          errorMsgs={errorMsgs}
         >
          {dropdownsLoaded ? (
              <div>
                <ModalDetails allowFutureDates={true}
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
        </Modal>
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
        loadDropdowns(convertSectionToStoreName(section), dropdownArray),
      );
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(DataTableComments);
export { mapDispatchToProps };
export { mapStateToProps };
