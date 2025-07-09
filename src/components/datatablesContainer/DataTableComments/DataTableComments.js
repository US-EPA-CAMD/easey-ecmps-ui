import React, { useEffect, useState } from "react";
import log from "loglevel";
import { modalViewData } from "../../../additional-functions/create-modal-input-controls";
import {
  extractUserInput,
} from "../../../additional-functions/extract-user-input";
import * as fs from "../../../utils/selectors/monitorPlanComments";
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

import { connect } from "react-redux";
import {
  attachChangeEventListeners,
  removeChangeEventListeners,
  unsavedDataMessage,
} from "../../../additional-functions/prompt-to-save-unsaved-changes";
import { ensure508 } from "../../../additional-functions/ensure-508";
import { returnsFocusMpDatatableCreateBTN } from "../../../additional-functions/ensure-508";

export const DataTableComments = ({
  locationSelectValue,
  user,
  checkout,
  revertedState,
  setUpdateRelatedTables,
  updateRelatedTables,
  currentTabIndex,
  tabs,
  reportDataStatus,
  selectedConfigId
}) => {
  const [dataLoaded, setDataLoaded] = useState(false);
  const [show, setShow] = useState(false);
  const [updateTable, setUpdateTable] = useState(false);
  const [errorMsgs, setErrorMsgs] = useState([]);
  const [returnedFocusToLast, setReturnedFocusToLast] = useState(false);
  const [commentData, setCommentsData] =  useState([]);
  const [data, setData] = useState([]);

  const dataTableName = "Comments";

  // *** Assign initial event listeners after loading data/dropdowns
  useEffect(() => {
    if (dataLoaded) {
      assignFocusEventListeners();
      ensure508();
    }
  }, [dataLoaded]);

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



    useEffect(() => {
      let hasActive = false;
      let hasInactive = false;
      if (commentData.length > 0) {
        const activeOnly = getActiveData(commentData);
        const inactiveOnly = getInactiveData(commentData);
        // Note: settingInactiveCheckbox -> function parameters ( check flag, disable flag )
        hasActive = activeOnly.length > 0;
        hasInactive = inactiveOnly.length > 0;
        // if ONLY ACTIVE records return,
        if (activeOnly.length === commentData.length) {
          // then disable the inactive checkbox and set it as un-checked
          setData(fs.getMonitoringPlansCommentsTableRecords(commentData));
        }
  
        // if ONLY INACTIVE records return
        else if (inactiveOnly.length === commentData.length) {
          // then disable the inactive checkbox and set it as checked
          setData(fs.getMonitoringPlansCommentsTableRecords(commentData));
        }
  
        // if BOTH ACTIVE & INACTIVE records return
        else {
          // then enable the inactive checkbox (user can mark it as checked/un-checked manually)
          setData(
            fs.getMonitoringPlansCommentsTableRecords(
              tabs[currentTabIndex].inactive[0] === false
                ? getActiveData(commentData)
                : commentData,
            ),
          );
        }
      }
  
      // if NO RECORDS are returned
      else {
        setData([]);
      }
      reportDataStatus(dataTableName, { hasActive, hasInactive });
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [commentData, tabs[currentTabIndex].inactive[0], updateTable]);
  
  const [selectedComments, setSelectedComments] = useState(null);
  // *** column names for dataset (will be passed to normalizeRowObjectFormat later to generate the row object
  // *** in the format expected by the modal / tabs plugins)
  const columnNames = [
    "Monitor Plan Comment",
    "Begin Date",
    "End Date",
  ];

  const payload = {
    monitoringPlanComment: "string",
    id: "string",
    beginDate: "string",
    endDate: "string",
    planId: selectedConfigId
  };



  const saveComments = async () => {
    const userInput = extractUserInput(payload, ".modalUserInput");
    try {
      const resp = await mpApi
        .saveMonitorPlanComments(userInput)
        .catch((error) => log.log("saveMonitoring failed", error));
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
  const createMonitorPlan = async () => {
    const userInput = extractUserInput(payload, ".modalUserInput");
    try {
      const resp = await mpApi
        .createMonitorPlanComments(userInput)
        .catch((error) => log.log("createMonitorPlanComments failed", error));
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

  const [createNewComments, setCreateNewComments] = useState(false);
  const [selectedModalData, setSelectedModalData] = useState(null);


  const openCommentModal = (row, bool, create) => {
    let comments = null;
    setCreateNewComments(create);

    if (commentData.length > 0 && !create) {
      comments = commentData.filter((element) =>
        {
         return element.id === row[`col${Object.keys(row).length - 1}`]
        }
         
      )[0];
      setSelectedComments(comments);
    }
    setSelectedModalData(
      modalViewData(
        comments,
        {
          monitoringPlanComment: ["Monitor Plan Comment", "textArea", ""],
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
    if (createNewComments) {
      returnsFocusMpDatatableCreateBTN("Create MATS");
    }
  };

  return (
    <div className="methodTable">
      <div className={`usa-overlay ${show ? "is-visible" : ""}`} />

      <DataTableRender
        columnNames={columnNames}
        data={data}
        dataLoaded={dataLoaded}
        // actionsBtn={"View"}
        checkout={checkout}
        user={user}
        openHandler={openCommentModal}
        actionsBtn={"View"}
        addBtn={openCommentModal}
        addBtnName={"Create Comment"}
      />

      {show ? (
        <Modal
          show={show}
          close={closeModalHandler}
          save={createNewComments ? createMonitorPlan : saveComments}
          showCancel={!(user && checkout)}
          showSave={user && checkout}
          ariaLabel={"Monitor Plan Comments"}
          title={
            createNewComments ? "Create Monitor Plan Comments" : "Monitor Plan Comments"
          }
          exitBtn={createNewComments ? "Create Comment" : `Save and Close`}
          errorMsgs={errorMsgs}
         >
              <div>
                <ModalDetails allowFutureDates={true}
                  modalData={selectedComments}
                  data={selectedModalData}
                  cols={2}
                  title={"Monitor Plan Comments"}
                  viewOnly={!(user && checkout)}
                  create={createNewComments}
                />
              </div>
        </Modal>
      ) : null}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    tabs: state.openedFacilityTabs["monitoringPlans"],
  };
};


export default connect(mapStateToProps)(DataTableComments);
export { mapStateToProps };
