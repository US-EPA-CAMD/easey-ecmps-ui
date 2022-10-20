import React, { useEffect, useState, useMemo } from "react";
import {
  Button,
  Checkbox,
  Dropdown,
  FormGroup,
  Grid,
  GridContainer,
  Label,
} from "@trussworks/react-uswds";
import { CreateOutlined, LockOpenSharp } from "@material-ui/icons";
import config from "../../config";
import { triggerEvaluation } from "../../utils/api/quartzApi";

import * as mpApi from "../../utils/api/monitoringPlansApi";
import {
  EMISSIONS_STORE_NAME,
  MONITORING_PLAN_STORE_NAME,
} from "../../additional-functions/workspace-section-and-store-names";
import Modal from "../Modal/Modal";
import { DropdownSelection } from "../DropdownSelection/DropdownSelection";
import "./HeaderInfo.scss";
import ReportGenerator from "../ReportGenerator/ReportGenerator";
import { Preloader } from "@us-epa-camd/easey-design-system";
import ImportModal from "../ImportModal/ImportModal";
import UploadModal from "../UploadModal/UploadModal";
import {
  attachChangeEventListeners,
  removeChangeEventListeners,
  unsavedDataMessage,
} from "../../additional-functions/prompt-to-save-unsaved-changes";
import GenericTable from "../GenericTable/GenericTable";
import {
  assignFocusEventListeners,
  cleanupFocusEventListeners,
  returnFocusToCommentButton,
  returnFocusToLast,
} from "../../additional-functions/manage-focus";
import MultiSelectCombobox from "../MultiSelectCombobox/MultiSelectCombobox";
import { getViews } from "../../utils/api/emissionsApi";

// Helper function that generates an array of years from this year until the year specified in min param
const generateArrayOfYears = (min) => {
  let max = new Date().getFullYear();
  let years = [];

  for (let i = max; i >= min; i--) {
    years.push(i);
  }
  return years;
};

export const HeaderInfo = ({
  facility,
  selectedConfig,
  orisCode,
  user,
  setRevertedState,
  viewTemplateSelect,
  setViewTemplateSelect,
  selectedYears,
  setSelectedYears,
  selectedQuarters,
  setSelectedQuarters,
  //redux sets
  setCheckout,
  setInactive,
  setLocationSelect,
  setSectionSelect,
  // redux store
  sectionSelect,
  locationSelect,
  locations,
  checkout = false,
  inactive,
  ///
  checkoutAPI,
  configID,
  setUpdateRelatedTables,
  updateRelatedTables,
  workspaceSection,
}) => {
  //MP
  const sections = [
    { name: "Defaults" },
    { name: "Formulas" },
    { name: "Loads" },
    {
      name: "Location Attributes and Relationships",
    },
    { name: "Methods" },
    { name: "Qualifications" },
    { name: "Rectangular Duct WAFs" },
    { name: "Spans" },
    { name: "Systems" },
    { name: "Unit Information" },
  ];

  // minimum year for emissions data
  const MIN_YEAR = 2009;

  // *** parse apart facility name
  const facilityMainName = facility.split("(")[0];
  const facilityAdditionalName = facility.split("(")[1].replace(")", "");
  const [checkedOutConfigs, setCheckedOutConfigs] = useState([]);
  const [auditInformation, setAuditInformation] = useState("");
  const [dataLoaded, setDataLoaded] = useState(false);

  const [checkedOutByUser, setCheckedOutByUser] = useState(false);
  const [showEvalReport, setShowEvalReport] = useState(false);
  const [showRevertModal, setShowRevertModal] = useState(false);

  const closeRevertModal = () => setShowRevertModal(false);
  const closeEvalReportModal = () => setShowEvalReport(false);

  // const [checkoutState, setCheckoutState] = useState(checkout);
  const inWorkspace = user;

  // refreshing evaluation status
  const delayInSeconds = config.app.refreshEvalStatusRate;
  const [openIntervalId, setOpenIntervalId] = useState(null);
  const [evalStatus, setEvalStatus] = useState("");
  const [evalStatusLoaded, setEvalStatusLoaded] = useState(false);
  const [showCommentsModal, setShowCommentsModal] = useState(false);
  const [commentsData, setCommentsData] = useState([]);
  const [showImportModal, setShowImportModal] = useState(false);
  const [userHasCheckout, setUserHasCheckout] = useState(false);

  const [lockedFacility, setLockedFacility] = useState(false);

  // import modal states
  const [disablePortBtn, setDisablePortBtn] = useState(true);
  const [usePortBtn, setUsePortBtn] = useState(false);
  const [finishedLoading, setFinishedLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [fileName, setFileName] = useState("");
  const [hasFormatError, setHasFormatError] = useState(false);
  const [hasInvalidJsonError, setHasInvalidJsonError] = useState(false);
  const [importApiErrors, setImportApiErrors] = useState([]);

  const [returnedFocusToLast, setReturnedFocusToLast] = useState(false);
  const [isReverting, setIsReverting] = useState(false);
  const [viewTemplates, setViewTemplates] = useState([]);

  // The below object structure is needed for MultiSelectComboBox
  const yearsArray = useMemo(
    () =>
      generateArrayOfYears(MIN_YEAR).map((y) => ({
        id: y,
        label: y + "",
        selected: false,
        enabled: true,
      })),
    []
  );
  const quartersArray = useMemo(
    () =>
      [1, 2, 3, 4].map((y) => ({
        id: y,
        label: y + "",
        selected: false,
        enabled: true,
      })),
    []
  );

  // *** Assign initial event listeners after loading data/dropdowns
  useEffect(() => {
    if (showCommentsModal) {
      returnFocusToLast();
      assignFocusEventListeners();
    } else {
      returnFocusToCommentButton();
    }
  }, [showCommentsModal]);

  // *** Reassign handlers after pop-up modal is closed
  useEffect(() => {
    if (!returnedFocusToLast) {
      setReturnedFocusToLast(true);
    } else {
      returnFocusToLast();
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
    if (workspaceSection !== EMISSIONS_STORE_NAME) return;

    getViews().then(({ data }) => {
      setViewTemplates(data);
      if (data.length > 0) setViewTemplateSelect(data[0]);
    });
  }, [workspaceSection, setViewTemplateSelect]);

  const executeOnClose = () => {
    setShowCommentsModal(false);
    removeChangeEventListeners(".modalUserInput");
    setReturnedFocusToLast(false);
  };

  const resetImportFlags = () => {
    setShowImportModal(false);
    setDisablePortBtn(true);
    setUsePortBtn(false);
    setFinishedLoading(false);
    setIsLoading(false);
    setFileName("");
    setHasFormatError(false);
    setHasInvalidJsonError(false);
    setImportApiErrors([]);
  };

  const reportWindowParams = [
    // eslint-disable-next-line no-restricted-globals
    `height=${screen.height}`,
    // eslint-disable-next-line no-restricted-globals
    `width=${screen.width}`,
    //`fullscreen=yes`,
  ].join(",");

  const displayReport = (reportCode) => {
    let reportType;

    switch (reportCode) {
      case "MPP":
        reportType = "Printout";
        break;
      case "MP_EVAL":
        reportType = "Evaluation";
        break;
      case "MP_AUDIT":
        reportType = "Audit";
        break;
      default:
        reportType = "Evaluation";
        break;
    }

    window.open(
      `/workspace/reports?reportCode=${reportCode}&monitorPlanId=${selectedConfig.id}`,
      `ECMPS Monitoring Plan ${reportType} Report`,
      reportWindowParams
    );
  };

  const openImportModal = () => {
    setShowImportModal(true);

    setTimeout(() => {
      attachChangeEventListeners(".modalUserInput");
    });
  };

  const closeImportModalHandler = () => {
    const importBtn = document.querySelector("#importMonitoringPlanBtn");

    if (window.isDataChanged === true) {
      if (window.confirm(unsavedDataMessage) === true) {
        resetImportFlags();
        removeChangeEventListeners(".modalUserInput");
        importBtn.focus();
      }
    } else {
      resetImportFlags();
      removeChangeEventListeners(".modalUserInput");
      importBtn.focus();
    }
  };

  const exportHandler = () => mpApi.exportMonitoringPlanDownload(configID);

  const formatCommentsToTable = (data) => {
    const formmatedData = [];
    if (data.length >= 1) {
      data.forEach((element) => {
        formmatedData.push({
          "Date, Time": new Date(element.addDate).toLocaleString("en-US", {
            year: "numeric",
            month: "numeric",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          }),
          Comment: element.monitoringPlanComment,
        });
      });
      return formmatedData;
    }
    return [
      {
        // "Monitoring Plan": "",
        "Date, Time": " ",
        Comment: " ",
      },
    ];
  };
  const openViewComments = () => {
    mpApi.getMonitoringPlanComments(selectedConfig.id).then((data) => {
      setCommentsData(formatCommentsToTable(data.data));
      setShowCommentsModal(true);
    });

    setTimeout(() => {
      attachChangeEventListeners(".modalUserInput");
    });
  };

  useEffect(() => {
    // get evaluation status
    if (!evalStatusLoaded || updateRelatedTables) {
      mpApi.getRefreshInfo(configID).then((res) => {
        const status = res.data.evalStatusCode;
        setEvalStatus(status);
        setEvalStatusLoaded(true);
      });
    }

    // then load the rest of the data
    if (evalStatusLoaded && !dataLoaded) {
      mpApi.getCheckedOutLocations().then((res) => {
        // get info for current checked-out configs, checkout status, date
        const configs = res.data;
        setCheckedOutConfigs(configs);
        let currDate = new Date(Date.now());
        currDate.setDate(currDate.getDate() - 1);

        // get selected config information...
        let currentConfig = findCurrentlyCheckedOutByInfo(configs);

        // from checkouts table (if available)
        if (currentConfig) {
          // set current facility as locked & render new data onto page
          setLockedFacility(true);
          renderWithNewData(configs, currentConfig, true);
        }
        // if not, obtain it from the database
        else {
          mpApi.getRefreshInfo(configID).then((info) => {
            currentConfig = {
              checkedOutBy: "N/A",
              lastUpdatedBy: info.data.userId,
              updateDate: info.data.updateDate,
            };

            // update lock status of current facility & render new data onto page
            setLockedFacility(
              configs.some((plan) => plan.facId === parseInt(info.data.facId))
            );
            renderWithNewData(configs, currentConfig, false);
          });
        }
      });
    }

    // clear open intervals when a different page is loaded
    return () => {
      if (dataLoaded && evalStatusLoaded) {
        clearOpenRefreshInterval();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checkout, dataLoaded, evalStatusLoaded, updateRelatedTables]);

  const clearOpenRefreshInterval = () => {
    if (openIntervalId) {
      clearInterval(openIntervalId);
    }
  };

  const startRefreshTimer = () => {
    if (inWorkspace && evalStatus !== "EVAL") {
      // if we already have a refresh interval open (this shouldn't happen, but just in case)
      if (openIntervalId) {
        // get rid of it and clear the id state
        clearInterval(openIntervalId);
        setOpenIntervalId(null);
      }

      let currStatus = evalStatus;
      let totalTime = 0; // measured in milliseconds
      return setInterval(() => {
        totalTime += delayInSeconds;
        // if status is INQ or WIP:
        if (
          totalTime < config.app.refreshEvalStatusTimeout &&
          (currStatus === "INQ" || currStatus === "WIP")
        ) {
          // check database and update status
          mpApi.getRefreshInfo(configID).then((res) => {
            let databaseStatus = "";
            if (res) {
              databaseStatus = res.data.evalStatusCode;
            }

            // if database is different than current status, then update
            if (currStatus !== databaseStatus) {
              currStatus = databaseStatus;
              setEvalStatus(databaseStatus);
              setEvalStatusLoaded(true);
            }
          });
        }

        // if refresh timeout is reached,
        // then refresh the header (will automatically clear the open interval)
        if (totalTime >= config.app.refreshEvalStatusTimeout) {
          console.log(
            "Evaluation status refresh timeout reached.\nRefreshing header and stopping interval..."
          );
          setEvalStatusLoaded(false);
          setDataLoaded(false);
        }
      }, delayInSeconds);
    }
    return 0;
  };

  const renderWithNewData = (configs, currentConfig, currentCheckoutStatus) => {
    const intervalId = startRefreshTimer();

    // setCheckoutState(currentConfig.checkedOutBy !== "N/A");
    setOpenIntervalId(intervalId);
    setUserHasCheckout(
      configs.some((plan) => plan["checkedOutBy"] === user.userId)
    );
    setCheckedOutByUser(isCheckedOutByUser(configs));
    setAuditInformation(
      createAuditMessage(currentConfig.checkedOutBy !== "N/A", currentConfig)
    );
    setCheckout(currentCheckoutStatus);
    setDataLoaded(true);
  };

  const findCurrentlyCheckedOutByInfo = (configs) => {
    return configs[
      configs.map((con) => con["monPlanId"]).indexOf(selectedConfig.id)
    ];
  };

  const isCheckedOutByUser = (configs) => {
    return (
      configs
        .map((location) => location["monPlanId"])
        .indexOf(selectedConfig.id) > -1 &&
      configs[
        configs
          .map((location) => location["monPlanId"])
          .indexOf(selectedConfig.id)
      ]["checkedOutBy"] === user["userId"]
    );
  };

  const formatDate = (dateString, isUTC = false) => {
    const date = new Date(dateString);
    //HANDLE -1 days from DB dates which are UTC
    const day = isUTC ? date.getDate() + 1 : date.getDate();
    return (
      (date.getMonth() > 8
        ? date.getMonth() + 1
        : "0" + (date.getMonth() + 1)) +
      "/" +
      (day > 9 ? day : "0" + day) +
      "/" +
      date.getFullYear()
    );
  };

  // chooses correctly styling for evaluation status label
  const evalStatusStyle = (status) => {
    switch (status) {
      case "ERR":
      case "EVAL":
        return "usa-alert--warning";
      case "INFO":
      case "PASS":
        return "usa-alert--success";
      case "INQ":
      case "WIP":
        return "usa-alert--info";
      default:
        break;
    }
    return "";
  };

  // returns evaluation status (full text) from code
  const evalStatusText = (status) => {
    switch (status) {
      case "ERR":
        return "Critical Errors";
      case "INFO":
        return "Informational Message";
      case "PASS":
        return "Passed";
      case "INQ":
        return "In Queue";
      case "WIP":
        return "In Progress";
      default:
        break;
    }
    return "Needs Evaluation";
  };

  const evalStatusContent = () => {
    if (checkedOutByUser && evalStatusText(evalStatus) === "Needs Evaluation") {
      return (
        <Button type="button" outline={false} onClick={evaluate}>
          Evaluate
        </Button>
      );
    }

    const alertStyle = `padding-1 usa-alert usa-alert--no-icon text-center ${evalStatusStyle(
      evalStatus
    )} margin-y-0`;
    const evalStatusHyperlink = (
      <div className={alertStyle}>
        <button
          className={"hyperlink-btn cursor-pointer"}
          onClick={() => displayReport("MP_EVAL")}
        >
          {evalStatusText(evalStatus)}
        </button>
      </div>
    );

    if (showHyperLink(evalStatus)) {
      return evalStatusHyperlink;
    } else {
      return <p className={alertStyle}>{evalStatusText(evalStatus)}</p>;
    }
  };

  const showHyperLink = (status) => {
    return status === "PASS" || status === "INFO" || status === "ERR";
  };

  const showRevert = (status) => {
    return (
      checkedOutByUser &&
      (status === "PASS" ||
        status === "INFO" ||
        status === "ERR" ||
        status === "EVAL")
    );
  };

  // direction -> false = check back in
  // true = check out
  const checkoutStateHandler = (direction) => {
    // trigger checkout API
    //    - POST endpoint if direction is TRUE (adding new record to checkouts table)
    //    - DELETE endpoint if direction is FALSE (removing record from checkouts table)
    checkoutAPI(direction, configID, selectedConfig.id, setCheckout).then(
      () => {
        setCheckedOutByUser(direction);
        setLockedFacility(direction);
        // setCheckoutState(direction);
        setDataLoaded(false);
      }
    );
  };

  const revert = () => {
    mpApi.revertOfficialRecord(selectedConfig.id).then(() => {
      setRevertedState(true);
      setShowRevertModal(false);
      setIsReverting(false);
      setEvalStatusLoaded(false);
      setDataLoaded(false);
    });
    // this code executes first while we wait for api to finish returning
    setIsReverting(true);
    setShowRevertModal(false);
  };

  const [importedFile, setImportedFile] = useState([]);
  const [importedFileErrorMsgs, setImportedFileErrorMsgs] = useState();

  const importMPBtn = (payload) => {
    mpApi.importMP(payload).then((response) => {
      setUsePortBtn(true);
      setIsLoading(true);
      if (response) {
        setImportedFileErrorMsgs(response);
      }
    });
  };
  const evaluate = () => {
    triggerEvaluation({
      monitorPlanId: configID,
      userId: user.userId,
      userEmail: user.email,
    })
      .then(() => {
        // Change front-end to display "In Queue" status after starting eval
        setEvalStatus("INQ");
        setDataLoaded(false);
        setEvalStatusLoaded(true);
      })
      .catch((error) => {
        console.log("Error occurred: ", error);
      });
  };

  // Create audit message for header info
  const createAuditMessage = (checkedOut, currentConfig) => {
    // WORKSPACE view
    if (inWorkspace) {
      // when config is checked out by someone
      if (checkedOut) {
        return `Currently checked-out by: ${
          currentConfig["checkedOutBy"]
        } ${formatDate(currentConfig["checkedOutOn"])}`;
      }
      // when config is not checked out
      return `Last updated by: ${currentConfig.lastUpdatedBy} ${formatDate(
        currentConfig.updateDate,
        true
      )}`;
    }
    // GLOBAL view
    return `Last submitted by: ${selectedConfig.userId} ${formatDate(
      selectedConfig.updateDate
        ? selectedConfig.updateDate
        : selectedConfig.addDate,
      true
    )}`;
  };

  // Multiselect update function for year selection
  const onChangeUpdateSelectedYears = (id, updateType) => {
    if (updateType === "add") setSelectedYears([...selectedYears, id]);
    else if (updateType === "remove"){
      const selected = yearsArray.filter(y=>y.selected).map(y=>y.id)
      setSelectedYears(selected);
    }
  };

  // Multiselect update function for quarter selection
  const onChangeUpdateSelectedQuarters = (id, updateType) => {
    if (updateType === "add") setSelectedQuarters([...selectedQuarters, id]);
    else if (updateType === "remove"){
      const selected = quartersArray.filter(q=>q.selected).map(q=>q.id)
      setSelectedQuarters(selected);
    }
  };

  return (
    <div className="header">
      <div
        className={`usa-overlay ${
          showRevertModal || showEvalReport ? "is-visible" : ""
        } `}
      />

      {showRevertModal ? (
        <Modal
          show={showRevertModal}
          close={closeRevertModal}
          showSave={true}
          exitBTN={"Yes"}
          save={revert}
          children={
            <div>
              {
                "Reverting to Official Record will undo all saved and unsaved changes. This is not recoverable. Do you want to continue?"
              }
            </div>
          }
        />
      ) : null}
      {showEvalReport ? (
        <Modal
          title="Monitoring Plan Evaluation Report"
          width="80%"
          left="10%"
          show={showEvalReport}
          close={closeEvalReportModal}
          showSave={false}
          showCancel={true}
          children={<ReportGenerator user={user} />}
        />
      ) : null}

      {evalStatusLoaded && dataLoaded ? (
        <div>
          <div className="display-flex flex-row flex-justify flex-align-center height-2">
            <div className="grid-row">
              <h3 className="margin-y-auto font-body-lg margin-right-2">
                {facilityMainName}
              </h3>
              <p className="text-bold font-body-xl">{facilityAdditionalName}</p>
            </div>
            {user && checkedOutByUser && (
              <div>
                <Button
                  type="button"
                  className="margin-right-2 float-left margin-bottom-2"
                  outline={true}
                  onClick={exportHandler}
                >
                  Export Data
                </Button>
                <Button
                  type="button"
                  className="margin-right-2 float-right"
                  outline={false}
                  onClick={() => openImportModal()}
                  id="importMonitoringPlanBtn"
                >
                  Import Data
                </Button>
              </div>
            )}
          </div>

          {dataLoaded && (
            <p className="text-bold font-body-2xs">{auditInformation}</p>
          )}

          <div className="grid-col float-left">
            <div>
              <div className="grid-row">
                {user && (
                  <div>
                    {checkedOutByUser === true ? (
                      <Button
                        type="button"
                        autoFocus
                        outline={false}
                        tabIndex="0"
                        aria-label={`Check back in the configuration `}
                        onClick={() => checkoutStateHandler(false)}
                        id="checkInBTN"
                        epa-testid="checkInBTN"
                      >
                        <LockOpenSharp /> {"Check Back In"}
                      </Button>
                    ) : !lockedFacility &&
                      !userHasCheckout &&
                      selectedConfig.active &&
                      checkedOutConfigs
                        .map((location) => location["monPlanId"])
                        .indexOf(selectedConfig.id) === -1 ? (
                      <Button
                        type="button"
                        autoFocus
                        outline={true}
                        tabIndex="0"
                        aria-label={`Check out the configuration`}
                        onClick={() => checkoutStateHandler(true)}
                        id="checkOutBTN"
                        epa-testid="checkOutBTN"
                      >
                        <CreateOutlined color="primary" /> {"Check Out"}
                      </Button>
                    ) : null}
                  </div>
                )}

                {showRevert(evalStatus) && (
                  <Button
                    type="button"
                    id="showRevertModal"
                    onClick={() => setShowRevertModal(true)}
                    outline={true}
                  >
                    Revert to Official Record
                  </Button>
                )}
              </div>

              {user && (
                <div className="display-flex flex-align-center margin-top-2">
                  <p className="text-bold margin-right-1">Evaluation Status:</p>
                  {evalStatusContent()}
                  <p className="text-bold margin-x-1">Submission Status: </p>
                  <p
                    className={`padding-1 usa-alert usa-alert--no-icon text-center ${evalStatusStyle(
                      evalStatus
                    )} margin-0`}
                  >
                    Resubmission required
                  </p>
                </div>
              )}

              <div className="display-flex flex-row">
                <DropdownSelection
                  caption="Locations"
                  orisCode={orisCode}
                  options={locations}
                  viewKey="name"
                  selectKey="id"
                  initialSelection={locationSelect[0]}
                  selectionHandler={setLocationSelect}
                  workspaceSection={workspaceSection}
                />
                {workspaceSection === EMISSIONS_STORE_NAME ? (
                  <FormGroup className="margin-right-2 margin-bottom-1">
                    <Label test-id={"viewtemplate"} htmlFor={"viewtemplate"}>
                      {"View Template"}
                    </Label>
                    <Dropdown
                      id={"viewtemplate"}
                      name={"viewtemplate"}
                      epa-testid={"viewtemplate"}
                      data-testid={"viewtemplate"}
                      value={viewTemplateSelect}
                      onChange={(e) => setViewTemplateSelect(e.target.value)}
                    >
                      {viewTemplates.map((view) => (
                        <option
                          data-testid={view.name}
                          key={view.name}
                          value={view.name}
                        >
                          {view.name}
                        </option>
                      ))}
                    </Dropdown>
                  </FormGroup>
                ) : (
                  <DropdownSelection
                    caption="Sections"
                    selectionHandler={setSectionSelect}
                    options={sections}
                    viewKey="name"
                    selectKey="name"
                    initialSelection={sectionSelect[0]}
                    orisCode={orisCode}
                    workspaceSection={workspaceSection}
                  />
                )}

                <div className="margin-top-6">
                  {workspaceSection === MONITORING_PLAN_STORE_NAME ? (
                    <Checkbox
                      epa-testid="inactiveCheckBox"
                      id="inactiveCheckBox"
                      name="inactiveCheckBox"
                      label="Show Inactive"
                      checked={inactive[0]}
                      disabled={inactive[1]}
                      onChange={() =>
                        setInactive(
                          [!inactive[0], inactive[1]],
                          facility,
                          MONITORING_PLAN_STORE_NAME
                        )
                      }
                    />
                  ) : (
                    ""
                  )}
                </div>
              </div>
              {workspaceSection === MONITORING_PLAN_STORE_NAME && (
                <div>
                  <Button
                    outline
                    type="button"
                    title="Open Comments"
                    onClick={() => openViewComments()}
                  >
                    View Comments
                  </Button>
                  <Button
                    outline
                    type="button"
                    title="View Audit Report"
                    className={"hyperlink-btn cursor-pointer"}
                    onClick={() => displayReport("MP_AUDIT")}
                  >
                    View Audit Report
                  </Button>
                  <Button
                    outline
                    type="button"
                    title="View Printout Report"
                    className={"hyperlink-btn cursor-pointer"}
                    onClick={() => displayReport("MPP")}
                  >
                    View Printout Report
                  </Button>
                </div>
              )}
              {workspaceSection === EMISSIONS_STORE_NAME && (
                <GridContainer className="padding-left-0">
                  <Grid row={true}>
                    <Grid
                      col={3}
                      tablet={{ col: 3 }}
                      desktop={{ col: 3 }}
                      className="margin-right-2"
                    >
                      <MultiSelectCombobox
                        items={yearsArray}
                        label="Year(s)"
                        entity="year"
                        onChangeUpdate={onChangeUpdateSelectedYears}
                        searchBy="label"
                      />
                    </Grid>
                    <Grid col={3} tablet={{ col: 3 }} desktop={{ col: 3 }}>
                      <MultiSelectCombobox
                        items={quartersArray}
                        label="Quarter(s)"
                        entity="quarter"
                        onChangeUpdate={onChangeUpdateSelectedQuarters}
                        searchBy="label"
                      />
                    </Grid>
                    <Grid col={5} tablet={{ col: 5 }} desktop={{ col: 5 }}>
                      <Button
                        type="button"
                        title="Apply Filter(s)"
                        className="cursor-pointer text-no-wrap pin-right apply-filter-position"
                        onClick={() => null}
                      >
                        {"Apply Filter(s)"}
                      </Button>
                    </Grid>
                  </Grid>
                  <div className="display-flex flex-row">
                    <Button
                      outline
                      type="button"
                      title="Summary Report"
                      onClick={() => null}
                    >
                      Summary Report
                    </Button>
                    <Button
                      outline
                      type="button"
                      title="Data Report"
                      className={"hyperlink-btn cursor-pointer margin-left-2"}
                      onClick={() => null}
                    >
                      Data Report
                    </Button>
                  </div>
                </GridContainer>
              )}
            </div>
          </div>
        </div>
      ) : (
        <Preloader />
      )}
      <div
        className={`usa-overlay ${
          showImportModal || isReverting ? "is-visible" : ""
        }`}
      />

      {showImportModal && !finishedLoading && !isLoading ? (
        <div>
          <UploadModal
            show={showImportModal}
            close={closeImportModalHandler}
            showCancel={true}
            showSave={true}
            title={"Import a Monitoring Plan to continue"}
            exitBTN={"Import"}
            disablePortBtn={disablePortBtn}
            port={() => {
              importMPBtn(importedFile);
            }}
            hasFormatError={hasFormatError}
            hasInvalidJsonError={hasInvalidJsonError}
            children={
              <ImportModal
                setDisablePortBtn={setDisablePortBtn}
                disablePortBtn={disablePortBtn}
                setFileName={setFileName}
                setHasFormatError={setHasFormatError}
                setHasInvalidJsonError={setHasInvalidJsonError}
                setImportedFile={setImportedFile}
                workspaceSection={MONITORING_PLAN_STORE_NAME}
              />
            }
          />
        </div>
      ) : null}
      {isReverting && (
        <UploadModal
          width={"30%"}
          left={"35%"}
          children={<Preloader />}
          preloader
        />
      )}
      {/* while uploading, just shows preloader spinner  */}

      {isLoading && !finishedLoading && (
        <UploadModal
          width={"30%"}
          left={"35%"}
          setFinishedLoading={setFinishedLoading}
          setShowImportModal={setShowImportModal}
          setIsLoading={setIsLoading}
          timer={true}
          children={<Preloader />}
          preloader
          setImportApiErrors={setImportApiErrors}
          importedFileErrorMsgs={importedFileErrorMsgs}
          setImportedFileErrorMsgs={setImportedFileErrorMsgs}
          fileName={fileName}
        />
      )}

      {/* after it finishes uploading , shows either api errors or success messages */}
      {showImportModal && usePortBtn && finishedLoading && (
        <UploadModal
          show={showImportModal}
          close={closeImportModalHandler}
          showCancel={false}
          showSave={true}
          exitBtn={"Ok"}
          complete={true}
          importApiErrors={importApiErrors}
          importedFileErrorMsgs={importedFileErrorMsgs}
          setUpdateRelatedTables={setUpdateRelatedTables}
          successMsg={"Monitoring Plan has been Successfully Imported."}
          children={
            <ImportModal
              setDisablePortBtn={setDisablePortBtn}
              disablePortBtn={disablePortBtn}
              complete={true}
              fileName={fileName}
              importApiErrors={importApiErrors}
              importedFileErrorMsgs={importedFileErrorMsgs}
            />
          }
        />
      )}

      <div className={`usa-overlay ${showCommentsModal ? "is-visible" : ""}`} />
      {showCommentsModal && (
        <div>
          <UploadModal
            show={showCommentsModal}
            width={"50%"}
            left={"25%"}
            close={() => executeOnClose()}
            showCancel={false}
            showSave={false}
            complete={true}
            xBtn
            notUploadVersion
            children={
              <GenericTable
                data1={commentsData}
                title={"Monitoring Plan - Comments"}
                expandable={true}
                additionalTitle={facilityAdditionalName}
              />
            }
          />
        </div>
      )}
    </div>
  );
};

export default HeaderInfo;
