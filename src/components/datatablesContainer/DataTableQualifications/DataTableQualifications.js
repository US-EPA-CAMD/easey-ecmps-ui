import React, { useEffect, useMemo, useState } from "react";
import { modalViewData } from "../../../additional-functions/create-modal-input-controls";
import { extractUserInput } from "../../../additional-functions/extract-user-input";
import * as fs from "../../../utils/selectors/monitoringPlanQualifications";
import { DataTableRender } from "../../DataTableRender/DataTableRender";
import DataTablePCTQualifications from "../DataTablePCTQualifications/DataTablePCTQualifications";

import Modal from "../../Modal/Modal";
import ModalDetails from "../../ModalDetails/ModalDetails";
import { useRetrieveDropdownApi } from "../../../additional-functions/retrieve-dropdown-api";
import * as mpApi from "../../../utils/api/monitoringPlansApi";

import {
  Breadcrumb,
  BreadcrumbBar,
  BreadcrumbLink,
} from "@trussworks/react-uswds";

import {
  getActiveData,
  getInactiveData,
} from "../../../additional-functions/filter-data";

import {
  attachChangeEventListeners,
  removeChangeEventListeners,
  resetIsDataChanged,
  unsavedDataMessage,
} from "../../../additional-functions/prompt-to-save-unsaved-changes";

export const DataTableQualifications = ({
  locationSelectValue,
  user,
  checkout,
  inactive,
  settingInactiveCheckBox,
  revertedState,
  setRevertedState,
  selectedLocation,
}) => {
  const [dataLoaded, setDataLoaded] = useState(false);
  const [qualificationData, setQualificationsData] = useState([]);
  const totalOptions = useRetrieveDropdownApi(["qualificationTypeCode"], true);
  const [show, setShow] = useState(false);
  const [updateTable, setUpdateTable] = useState(false);
  const [openPCT, setOpenPCT] = useState(false);
  const [creating, setCreating] = useState(false);
  const [updatePCT, setUpdatePCT] = useState(false);
  useEffect(() => {
    if (
      updateTable ||
      qualificationData.length <= 0 ||
      locationSelectValue ||
      revertedState
    ) {
      mpApi.getQualifications(locationSelectValue).then((res) => {
        setQualificationsData(res.data);
        setDataLoaded(true);
        setUpdateTable(false);
        setRevertedState(false);
        setUpdatePCT(false);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locationSelectValue, updateTable, revertedState]);
  const [selectedQualificationData, setSelectedQualificationData] = useState(
    null
  );
  // *** column names for dataset (will be passed to normalizeRowObjectFormat later to generate the row object
  // *** in the format expected by the modal / tabs plugins)
  const columnNames = ["Qualification Type Code", "Start Date", "End Date"];

  const payload = {
    locationId: locationSelectValue,
    id: null,
    qualificationTypeCode: null,
    beginDate: null,
    endDate: null,
  };
  const data = useMemo(() => {
    if (qualificationData.length > 0) {
      const activeOnly = getActiveData(qualificationData);
      const inactiveOnly = getInactiveData(qualificationData);

      // only active data >  disable checkbox and unchecks it
      if (activeOnly.length === qualificationData.length) {
        // uncheck it and disable checkbox
        //function parameters ( check flag, disable flag )
        settingInactiveCheckBox(false, true);
        return fs.getMonitoringPlansQualifications(qualificationData);
      }

      // only inactive data > disables checkbox and checks it
      if (inactiveOnly.length === qualificationData.length) {
        //check it and disable checkbox
        settingInactiveCheckBox(true, true);
        return fs.getMonitoringPlansQualifications(qualificationData);
      }
      // resets checkbox
      settingInactiveCheckBox(inactive[0], false);
      return fs.getMonitoringPlansQualifications(
        !inactive[0] ? getActiveData(qualificationData) : qualificationData
      );
    }
    return [];

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [qualificationData, inactive]);
  const testingSave = () => {
    let userInput = extractUserInput(payload, ".modalUserInput");
    openQualificationDataModal(false, false, true);
    handleRequest("qual", mpApi.saveQualificationData, userInput);
  };

  const testingCreate = () => {
    let userInput = extractUserInput(payload, ".modalUserInput");
    openQualificationDataModal(false, false, true);
    handleRequest("qual", mpApi.createQualificationData, userInput);
  };

  // function to handle what type of api call to make (edit/create -> qual/pct/lme/lee)
  // params:
  //    - dataType: type of qualification record
  //    - apiFunc: API function from imported utility
  //    - userInput: user-entered values (payload)
  const handleRequest = (dataType, apiFunc, userInput) => {
    apiFunc(userInput)
      .then(() => {
        if (dataType === "qual") {
          // update qual table, then close qual modal
          setDataLoaded(false);
          setUpdateTable(true);
          setShow(false);
        } else if (dataType === "pct") {
          // update pct modal, then return to parent qual page
          setUpdatePCT(true);
          setOpenPCT(false);
        }
      })
      .catch((error) => {
        console.log(error);
        setShow(false);
      });
  };

  // Manages SAVE button (either Parent, PCT, LME, or LEE)
  const manageSaveBtn = () => {
    let userInput = extractUserInput(payload, ".modalUserInput");
    userInput["qualId"] = selectedQualificationData["id"];

    // PCT qual
    if (openPCT) {
      return handleRequest(
        "pct",
        creating ? "" : mpApi.savePCTQualificationData,
        userInput
      );
    }
    // else if(openLME){ LME qual logic here }
    // else if(openLEE){ LEE qual logic here }

    // Parent qual
    return handleRequest(
      "qual",
      creating ? mpApi.createQualificationData : mpApi.saveQualificationData,
      userInput
    );
  };

  const buildBreadBar = () => {
    if (openPCT) {
      const breadBar = (
        <BreadcrumbBar className="padding-0">
          <Breadcrumb
            onClick={() => {
              setOpenPCT(false);
            }}
          >
            <BreadcrumbLink>
              <span>Qualification</span>
            </BreadcrumbLink>
          </Breadcrumb>

          <Breadcrumb current>
            <span>Qualification Percent</span>
          </Breadcrumb>
        </BreadcrumbBar>
      );
      return breadBar;
    }
    return "";
  };

  const [createNewQualificationData, setCreateNewQualificationData] = useState(
    false
  );
  const [selectedModalData, setSelectedModalData] = useState(null);

  const openQualificationDataModal = (row, bool, create) => {
    let qualData = null;
    setCreating(create);
    setCreateNewQualificationData(create);
    if (qualificationData.length > 0 && !create) {
      qualData = qualificationData.filter(
        (element) => element.id === row[`col${Object.keys(row).length - 1}`]
      )[0];
      setSelectedQualificationData(qualData);
    }
    setSelectedModalData(
      modalViewData(
        qualData,
        {
          qualificationTypeCode: ["Qualification Type Code", "dropdown", ""],
          skip: ["", "skip", "", ""],
        },
        {
          beginDate: ["Start Date", "date", ""],
          endDate: ["End Date", "date", ""],
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

  const closeModalHandler = () => {
    // when cancel is clicked in unsaved changed modal
    if (
      window.isDataChanged === true &&
      window.confirm(unsavedDataMessage) === false
    ) {
      // do nothing
    }
    // otherwise return back to parent qual and reset change tracker
    else {
      setShow(false);
      if (openPCT) {
        resetIsDataChanged();
      }
      setOpenPCT(false);
      removeChangeEventListeners(".modalUserInput");
    }
    if (addBtn) {
      addBtn.focus();
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
        onClick={() => testingSave()}
      />
      <input
        tabIndex={-1}
        aria-hidden={true}
        role="button"
        type="hidden"
        id="testingBtn2"
        onClick={() => testingCreate()}
      />

      <DataTableRender
        columnNames={columnNames}
        data={data}
        dataLoaded={dataLoaded}
        checkout={checkout}
        user={user}
        openHandler={openQualificationDataModal}
        actionsBtn={"View"}
        addBtn={openQualificationDataModal}
        addBtnName={"Create Qualification"}
        setViewBtn={setViewBtn}
        viewBtn={viewBtn}
        setAddBtn={setAddBtn}
      />

      {show ? (
        <Modal
          show={show}
          close={closeModalHandler}
          save={manageSaveBtn}
          showCancel={!(user && checkout)}
          showSave={user && checkout}
          breadCrumbBar={buildBreadBar()}
          title={
            createNewQualificationData
              ? "Create Qualification"
              : "Qualification"
          }
          exitBTN={
            createNewQualificationData
              ? "Create Qualification"
              : `Save and Close`
          }
          children={
            <div>
              {openPCT ? (
                ""
              ) : (
                <ModalDetails
                  modalData={selectedQualificationData}
                  data={selectedModalData}
                  cols={2}
                  title={"Qualification"}
                  viewOnly={!(user && checkout)}
                />
              )}
              {creating ? (
                ""
              ) : (
                <DataTablePCTQualifications
                  locationSelectValue={locationSelectValue}
                  user={user}
                  checkout={checkout}
                  inactive={inactive}
                  settingInactiveCheckBox={settingInactiveCheckBox}
                  revertedState={revertedState}
                  setRevertedState={setRevertedState}
                  selectedLocation={selectedLocation}
                  qualSelectValue={selectedQualificationData["id"]}
                  setOpenPCT={setOpenPCT}
                  openPCT={openPCT}
                  setUpdatePCT={setUpdatePCT}
                  updatePCT={updatePCT}
                />
              )}
            </div>
          }
        />
      ) : null}
    </div>
  );
};

export default DataTableQualifications;
