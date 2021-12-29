import React, { useEffect, useMemo, useState } from "react";
import { modalViewData } from "../../../additional-functions/create-modal-input-controls";
import { extractUserInput } from "../../../additional-functions/extract-user-input";
import * as fs from "../../../utils/selectors/monitoringPlanQualifications";
import { DataTableRender } from "../../DataTableRender/DataTableRender";
import DataTablePCTQualifications from "../DataTablePCTQualifications/DataTablePCTQualifications";
import DataTableLEEQualifications from "../DataTableLEEQualifications/DataTableLEEQualifications";

import DataTableLMEQualifications from "../DataTableLMEQualifications/DataTableLMEQualifications";
import Modal from "../../Modal/Modal";
import ModalDetails from "../../ModalDetails/ModalDetails";
import * as mpApi from "../../../utils/api/monitoringPlansApi";

import { Preloader } from "../../Preloader/Preloader";
import { connect } from "react-redux";
import { loadDropdowns } from "../../../store/actions/dropdowns";
import {
  convertSectionToStoreName,
  QUALIFICATIONS_SECTION_NAME,
  QUALIFICATIONS_STORE_NAME,
} from "../../../additional-functions/data-table-section-and-store-names";

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
  mdmData,
  loadDropdownsData,
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

  const [show, setShow] = useState(false);
  const [updateTable, setUpdateTable] = useState(false);

  const [openPCT, setOpenPCT] = useState(false);
  const [creating, setCreating] = useState(false);
  const [creatingChild, setCreatingChild] = useState(false);
  const [updatePCT, setUpdatePCT] = useState(false);

  const [openLEE, setOpenLEE] = useState(false);
  const [updateLEE, setUpdateLEE] = useState(false);

  const [openLME, setOpenLME] = useState(false);
  const [updateLME, setUpdateLME] = useState(false);

  const [dropdownsLoaded, setDropdownsLoaded] = useState(false);
  const dropdownArray = [["qualificationTypeCode"]];

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
        setUpdateLEE(false);
        setUpdateLME(false);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locationSelectValue, updateTable, revertedState]);

  // load dropdowns data (called once)
  useEffect(() => {
    if (mdmData.length === 0) {
      loadDropdownsData(QUALIFICATIONS_SECTION_NAME, dropdownArray);
      setDropdownsLoaded(true);
    } else {
      setDropdownsLoaded(true);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [selectedQualificationData, setSelectedQualificationData] =
    useState(null);
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
        } else if (dataType === "lee") {
          // update lee modal, then return to parent qual page
          setUpdateLEE(true);
          setOpenLEE(false);
        } else if (dataType === "lme") {
          // update lme modal, then return to parent qual page
          setUpdateLME(true);
          setOpenLME(false);
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
        creatingChild
          ? mpApi.createPCTQualificationData
          : mpApi.savePCTQualificationData,
        userInput
      );
    }

    // LME qual
    else if (openLME) {
      return handleRequest(
        "lme",
        creatingChild
          ? mpApi.createLMEQualificationData
          : mpApi.saveLMEQualificationData,
        userInput
      );
    }

    // LEE qual
    else if (openLEE) {
      return handleRequest(
        "lee",
        creatingChild
          ? mpApi.createLEEQualificationData
          : mpApi.saveLEEQualificationData,
        userInput
      );
    }

    // Parent qual
    return handleRequest(
      "qual",
      creating ? mpApi.createQualificationData : mpApi.saveQualificationData,
      userInput
    );
  };

  const buildBreadBar = () => {
    if (openPCT || openLEE || openLME) {
      const breadBar = (
        <BreadcrumbBar className="padding-0">
          <Breadcrumb onClick={closeModalHandler}>
            <BreadcrumbLink>
              <span>Qualification</span>
            </BreadcrumbLink>
          </Breadcrumb>

          <Breadcrumb current>
            <span>
              {openPCT
                ? "Qualification Percent"
                : openLEE
                ? "Qualification LEE"
                : "Qualification LME"}
            </span>
          </Breadcrumb>
        </BreadcrumbBar>
      );
      return breadBar;
    }
    return "";
  };

  const [createNewQualificationData, setCreateNewQualificationData] =
    useState(false);
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
    // when cancel is clicked in unsaved changed modal
    if (
      window.isDataChanged === true &&
      window.confirm(unsavedDataMessage) === false
    ) {
      // do nothing
    }
    // otherwise return back to parent qual and reset change tracker
    else {
      if (openPCT || openLEE || openLME) {
        resetIsDataChanged();
      } else {
        setShow(false);
      }
      setOpenPCT(false);
      setOpenLEE(false);
      setOpenLME(false);
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
              : user && checkout && openPCT && creatingChild
              ? "Create Qualification Percent"
              : user && checkout && openLEE && creatingChild
              ? "Create Qualification LEE"
              : user && checkout && openLME && creatingChild
              ? "Create Qualification LME"
              : "Save and Close"
          }
          children={
            <div>
              {openPCT || openLEE || openLME ? (
                ""
              ) : dropdownsLoaded ? (
                <ModalDetails
                  modalData={selectedQualificationData}
                  data={selectedModalData}
                  cols={2}
                  title={"Qualification"}
                  viewOnly={!(user && checkout)}
                />
              ) : (
                <Preloader />
              )}
              {creating ? (
                ""
              ) : (
                <div>
                  {openLEE || openLME ? (
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
                      setCreatingChild={setCreatingChild}
                    />
                  )}
                  {openPCT || openLME ? (
                    ""
                  ) : (
                    <DataTableLEEQualifications
                      locationSelectValue={locationSelectValue}
                      user={user}
                      checkout={checkout}
                      inactive={inactive}
                      settingInactiveCheckBox={settingInactiveCheckBox}
                      revertedState={revertedState}
                      setRevertedState={setRevertedState}
                      selectedLocation={selectedLocation}
                      qualSelectValue={selectedQualificationData["id"]}
                      setOpenLEE={setOpenLEE}
                      openLEE={openLEE}
                      setUpdateLEE={setUpdateLEE}
                      updateLEE={updateLEE}
                      setCreatingChild={setCreatingChild}
                    />
                  )}

                  {openLEE || openPCT ? (
                    ""
                  ) : (
                    <DataTableLMEQualifications
                      locationSelectValue={locationSelectValue}
                      user={user}
                      checkout={checkout}
                      inactive={inactive}
                      settingInactiveCheckBox={settingInactiveCheckBox}
                      revertedState={revertedState}
                      setRevertedState={setRevertedState}
                      selectedLocation={selectedLocation}
                      qualSelectValue={selectedQualificationData["id"]}
                      setOpenLME={setOpenLME}
                      openLME={openLME}
                      setUpdateLME={setUpdateLME}
                      updateLME={updateLME}
                      setCreatingChild={setCreatingChild}
                    />
                  )}
                </div>
              )}
            </div>
          }
        />
      ) : null}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    mdmData: state.dropdowns[QUALIFICATIONS_STORE_NAME],
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadDropdownsData: (section, dropdownArray) => {
      dispatch(
        loadDropdowns(convertSectionToStoreName(section), dropdownArray)
      );
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DataTableQualifications);
export { mapDispatchToProps };
export { mapStateToProps };
