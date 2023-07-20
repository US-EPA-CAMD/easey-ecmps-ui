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
import {
  assignFocusEventListeners,
  cleanupFocusEventListeners,
} from "../../../additional-functions/manage-focus";

import { Preloader } from "@us-epa-camd/easey-design-system";
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
import { returnsFocusMpDatatableCreateBTN } from "../../../additional-functions/ensure-508";

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
  currentTabIndex,
  //

  tabs,
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

  const [openCPMS, setOpenCPMS] = useState(false);
  const [updateCPMS, setUpdateCPMS] = useState(false);


  const [dropdownsLoaded, setDropdownsLoaded] = useState(false);
  const dropdownArray = [["qualificationTypeCode"]];

  const [returnedFocusToLast, setReturnedFocusToLast] = useState(false);
  const [errorMsgs, setErrorMsgs] = useState([]);

  // *** Assign initial event listeners after loading data/dropdowns
  useEffect(() => {
    if (dataLoaded && dropdownsLoaded) {
      assignFocusEventListeners();
    }
  }, [dataLoaded, dropdownsLoaded]);

  // *** Reassign handlers after pop-up modal is closed
  useEffect(() => {
    if (!returnedFocusToLast) {
      setReturnedFocusToLast(true);
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
      qualificationData.length <= 0 ||
      locationSelectValue ||
      revertedState
    ) {
      mpApi
        .getQualifications(locationSelectValue)
        .then((res) => {
          setQualificationsData(res.data);
          setDataLoaded(true);
          setUpdateTable(false);
          setRevertedState(false);
          setUpdatePCT(false);
          setUpdateLEE(false);
          setUpdateLME(false);
        })
        .catch((error) => console.log("getQualifications failed", error));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locationSelectValue, updateTable, revertedState]);

  // load dropdowns data (called once)
  useEffect(() => {
    if (mdmData.length === 0) {
      loadDropdownsData(QUALIFICATIONS_SECTION_NAME, dropdownArray);
    } else {
      setDropdownsLoaded(true);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mdmData]);

  const [selectedQualificationData, setSelectedQualificationData] =
    useState(null);
  // *** column names for dataset (will be passed to normalizeRowObjectFormat later to generate the row object
  // *** in the format expected by the modal / tabs plugins)
  const columnNames = ["Qualification Type Code", "Begin Date", "End Date"];

  const qualificationPercentPayload = {
    locationId: locationSelectValue,
    id: "string",
    qualificationYear: 0,
    averagePercentValue: 0,
    yr1QualificationDataYear: 0,
    yr1QualificationDataTypeCode: "string",
    yr1PercentageValue: 0,
    yr2QualificationDataYear: 0,
    yr2QualificationDataTypeCode: "string",
    yr2PercentageValue: 0,
    yr3QualificationDataYear: 0,
    yr3QualificationDataTypeCode: "string",
    yr3PercentageValue: 0,
  };

  const qualificationLeePayload = {
    locationId: locationSelectValue,
    id: "string",
    qualificationTestDate: "string",
    parameterCode: "string",
    qualificationTestType: "string",
    potentialAnnualMassEmissions: 0,
    applicableEmissionStandard: 0,
    unitsOfStandard: "string",
    percentageOfEmissionStandard: 0,
  };

  const qualificationLmePayload = {
    locationId: locationSelectValue,
    id: "string",
    qualificationDataYear: 0,
    operatingHours: 0,
    so2Tons: 0,
    noxTons: 0,
  };

  const qualificationCpmsPayload = {
    qualificationDataYear: 0,
    stackTestNumber: "string",
    operatingLimit: 0,
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
      else if (inactiveOnly.length === qualificationData.length) {
        //check it and disable checkbox
        settingInactiveCheckBox(true, true);
        return fs.getMonitoringPlansQualifications(qualificationData);
      }
      // resets checkbox
      else {
        settingInactiveCheckBox(tabs[currentTabIndex].inactive[0], false);
        return fs.getMonitoringPlansQualifications(
          tabs[currentTabIndex].inactive[0] === false
            ? getActiveData(qualificationData)
            : qualificationData
        );
      }
    } else {
      return [];
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [qualificationData, tabs[currentTabIndex].inactive[0]]);

  const executeOnClose = () => {
    setErrorMsgs([]);
    removeChangeEventListeners(".modalUserInput");
    setReturnedFocusToLast(false);
    const qual =
      user && checkout && openPCT && creatingChild
        ? "Create Qualification Percent"
        : user && checkout && openLEE && creatingChild
        ? "Create Qualification LEE"
        : user && checkout && openLME && creatingChild
        ? "Create Qualification LME"
        : "";

    returnsFocusMpDatatableCreateBTN(qual);
  };

  // function to handle what type of api call to make (edit/create -> qual/pct/lme/lee)
  // params:
  //    - dataType: type of qualification record
  //    - apiFunc: API function from imported utility
  //    - userInput: user-entered values (payload)
  const handleRequest = async (dataType, apiFunc, userInput) => {
    userInput.locationId = locationSelectValue;
    try {
      const resp = await apiFunc(userInput);
      if (resp.status >= 200 && resp.status < 300) {
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
      } else {
        const errorResp = Array.isArray(resp) ? resp : [resp];
        setErrorMsgs(errorResp);
      }
    } catch (error) {
      setErrorMsgs([JSON.stringify(error)]);
    }
  };

  // Manages SAVE button (either Parent, PCT, LME, or LEE)
  const manageSaveBtn = () => {
    let payload = {};
    if (openPCT) {
      payload = { ...qualificationPercentPayload };
    }
    if (openLME) {
      payload = { ...qualificationLmePayload };
    }
    if (openLEE) {
      payload = { ...qualificationLeePayload };
    }
    let userInput = extractUserInput(payload, ".modalUserInput");

    if (!creating) {
      userInput["qualId"] = selectedQualificationData["id"];
    }

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
          beginDate: ["Begin Date", "date", ""],
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
      executeOnClose();
      setOpenPCT(false);
      setOpenLEE(false);
      setOpenLME(false);
      removeChangeEventListeners(".modalUserInput");
    }
  };

  return (
    <div className="methodTable">
      <div className={`usa-overlay ${show ? "is-visible" : ""}`} />

      <DataTableRender
        columnNames={columnNames}
        data={data}
        dataLoaded={dataLoaded && dropdownsLoaded}
        checkout={checkout}
        user={user}
        openHandler={openQualificationDataModal}
        actionsBtn={"View"}
        addBtn={openQualificationDataModal}
        addBtnName={"Create Qualification"}
        ariaLabel="Qualifications"
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
          errorMsgs={errorMsgs}
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DataTableQualifications);
export { mapDispatchToProps };
export { mapStateToProps };
