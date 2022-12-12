import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
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
import * as emApi from "../../utils/api/emissionsApi";
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
import {
  getViews,
  exportEmissionsDataDownload,
} from "../../utils/api/emissionsApi";
import { getUser } from "../../utils/functions";
import { EmissionsImportTypeModalContent } from "./EmissionsImportTypeModalContent";
import { ImportHistoricalDataModal } from "./ImportHistoricalDataModal";
import {
  setIsViewDataLoaded,
  setReportingPeriods,
  setViewData,
  setViewDataColumns,
  setViewTemplateSelection,
  setViewTemplateSelectionAction,
} from "../../store/actions/dynamicFacilityTab";
import { handleError } from "../../utils/api/apiUtils";
import {
  displayAppError,
  hideAppError,
} from "../../additional-functions/app-error";

// Helper function that generates an array of years from this year until the year specified in min param
export const generateArrayOfYears = (min) => {
  let max = new Date().getFullYear();
  let years = [];

  for (let i = max; i >= min; i--) {
    years.push(i);
  }
  return years;
};

const getReportingPeriods = (minYear = 2009) => {
  const quarters = [4, 3, 2, 1];
  const maxYear = new Date().getFullYear();
  const reportingPeriods = [];

  for (let year = maxYear; year >= minYear; year--) {
    for (const quarter of quarters) {
      reportingPeriods.push(`${year} Q${quarter}`);
    }
  }

  return reportingPeriods;
};

export const HeaderInfo = ({
  facility,
  selectedConfig,
  orisCode,
  user,
  setRevertedState,
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

  // *** parse apart facility name
  const facilityMainName = facility.split("(")[0];
  const facilityAdditionalName = facility.split("(")[1].replace(")", "");
  const selectedUnitId = selectedConfig?.locations
    ?.filter((l) => l.id === locationSelect[1])
    .map((l) => l.unitId);
  const selectedStackPipeId = selectedConfig?.locations
    ?.filter((l) => l.id === locationSelect[1])
    .map((l) => l.stackPipeId);

  const dispatch = useDispatch();
  const currentTab = useSelector((state) =>
    state.openedFacilityTabs[EMISSIONS_STORE_NAME].find(
      (t) => t.selectedConfig.id === configID
    )
  );

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
  // Upload has finished when finishedLoading=true (this is my educated guess, someone correct if wrong)
  const [finishedLoading, setFinishedLoading] = useState(false);
  // Upload has started but is not finished when isLoading=true (this is my educated guess, someone correct if wrong)
  const [isLoading, setIsLoading] = useState(false);
  const [fileName, setFileName] = useState("");
  const [hasFormatError, setHasFormatError] = useState(false);
  const [hasInvalidJsonError, setHasInvalidJsonError] = useState(false);
  const [importApiErrors, setImportApiErrors] = useState([]);

  const [returnedFocusToLast, setReturnedFocusToLast] = useState(false);
  const [isReverting, setIsReverting] = useState(false);
  const [viewTemplates, setViewTemplates] = useState([]);

  const [importedFile, setImportedFile] = useState([]);
  const [importedFileErrorMsgs, setImportedFileErrorMsgs] = useState([]);

  const [showEmissionsImportTypeModal, setShowEmissionsImportTypeModal] =
    useState(false);
  const [showHistoricalDataImportModal, setShowHistoricalDataImportModal] =
    useState(false);

  const [selectedReportingPeriods, setSelectedReportingPeriods] = useState(
    currentTab?.reportingPeriods ?? []
  );

  const [viewTemplateSelect, setViewTemplateSelect] = useState(null);

  const MAX_REPORTING_PERIODS = 4;
  const MAX_REPORTING_PERIODS_ERROR_MSG =
    "You can only select a maximum of four reporting periods";

  let reportingPeriods = useMemo(
    () =>
      getReportingPeriods().map((reportingPeriod) => {
        return {
          id: reportingPeriod,
          label: reportingPeriod,
          selected: false,
          enabled: true,
        };
      }),
    []
  );

  // Sets the value in redux
  const dispatchViewTemplateSelect = (selectedViewTemplate) => {
    dispatch(
      setViewTemplateSelectionAction(
        selectedViewTemplate,
        currentTab.name,
        EMISSIONS_STORE_NAME
      )
    );
  };

  useEffect(() => {
    if (currentTab?.viewTemplateSelect)
      setViewTemplateSelect(currentTab.viewTemplateSelect);
  }, [currentTab]);

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
      if (!currentTab?.viewTemplateSelect && data?.length > 0) {
        setViewTemplateSelect(data[0]);
      }
    });
  }, [workspaceSection, setViewTemplateSelect]);

  const executeOnClose = () => {
    setShowCommentsModal(false);
    removeChangeEventListeners(".modalUserInput");
    setReturnedFocusToLast(false);
  };

  const resetImportFlags = () => {
    setShowImportModal(false);
    setShowEmissionsImportTypeModal(false);
    setShowHistoricalDataImportModal(false);
    setDisablePortBtn(true);
    setFinishedLoading(false);
    setIsLoading(false);
    setFileName("");
    setHasFormatError(false);
    setHasInvalidJsonError(false);
    setImportApiErrors([]);
    setImportedFileErrorMsgs([]);
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

  const openModal = () => {
    if (workspaceSection === MONITORING_PLAN_STORE_NAME) {
      openImportModal();
    } else {
      setShowEmissionsImportTypeModal(true);
    }
  };

  const handleEmissionsExport = async () => {
    const promises = [];
    for (const selectedReportingPeriod of selectedReportingPeriods) {
      // reportingPeriod: '2022 Q1' -> year: 2022, quarter: 1
      promises.push(
        exportEmissionsDataDownload(
          facility,
          configID,
          selectedReportingPeriod.slice(0, 4),
          selectedReportingPeriod.charAt(selectedReportingPeriod.length - 1),
          getUser() !== null
        )
      );
    }

    await Promise.allSettled(promises);
  };

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
        <Button
          type="button"
          outline={false}
          onClick={evaluate}
          className="height-6"
        >
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

  const importMPFile = (payload) => {
    mpApi
      .importMP(payload)
      .then((response) => {
        setIsLoading(true);
        if (response) {
          setImportedFileErrorMsgs(response);
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
        setFinishedLoading(true);
      });
  };

  const importEmissionsFile = (payload) => {
    setIsLoading(true);
    setFinishedLoading(false);
    emApi
      .importEmissionsData(payload)
      .then(({ data, status }) => {
        if (status === 201) {
          setImportedFileErrorMsgs([]);
        } else if (status === 400)
          setImportedFileErrorMsgs(
            data?.message?.split(",") || ["HTTP 400 Error"]
          );
        else {
          setImportedFileErrorMsgs(`HTTP ${status} Error`);
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
        setFinishedLoading(true);
      });
  };

  const closeImportModalHandler = () => {
    const importBtn = document.querySelector("#importBtn");
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

  const importFile = (payload) => {
    if (workspaceSection === MONITORING_PLAN_STORE_NAME) importMPFile(payload);
    else if (workspaceSection === EMISSIONS_STORE_NAME)
      importEmissionsFile(payload);
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

  const handleSelectReportingPeriod = (id, updateType) => {
    const uniqueReportingPeriods = [
      ...new Set([...selectedReportingPeriods, id]),
    ];

    hideAppError();
    if (uniqueReportingPeriods.length > MAX_REPORTING_PERIODS) {
      displayAppError(MAX_REPORTING_PERIODS_ERROR_MSG);
      const addedRp = reportingPeriods.find((rp) => rp.id === id);
      addedRp.selected = false;
      reportingPeriods = [...reportingPeriods];
      return;
    }

    if (updateType === "add") {
      setSelectedReportingPeriods(uniqueReportingPeriods);
      dispatch(
        setReportingPeriods(
          uniqueReportingPeriods,
          currentTab.name,
          workspaceSection
        )
      );
    } else if (updateType === "remove") {
      const selected = reportingPeriods
        .filter((reportingPeriod) => {
          return reportingPeriod.selected;
        })
        .map((reportingPeriod) => {
          return reportingPeriod.id;
        });

      setSelectedReportingPeriods(selected);
      dispatch(
        setReportingPeriods(selected, currentTab.name, workspaceSection)
      );
    }
  };

  const handleExport = () => {
    if (workspaceSection === EMISSIONS_STORE_NAME) handleEmissionsExport();
  };

  const onChangeOfEmissionsImportType = (e) => {
    const { value } = e.target;
    if (value === "file") {
      setShowImportModal(true);
    }

    if (value === "historical") {
      setShowHistoricalDataImportModal(true);
    }

    setShowEmissionsImportTypeModal(false);
  };

  const applyFilters = async (monitorPlanId, unitIds, stackPipeIds) => {
    dispatch(setIsViewDataLoaded(false, currentTab.name, workspaceSection));
    const response = await emApi.getEmissionViewData(
      viewTemplateSelect?.code,
      monitorPlanId,
      selectedReportingPeriods,
      unitIds,
      stackPipeIds
    );

    if (
      response &&
      response.status === 200 &&
      response.headers["x-field-mappings"] &&
      response.data
    ) {
      const columns = JSON.parse(response.headers["x-field-mappings"]);
      const results = response.data;

      const names = columns.map((column) => column.label);

      const formattedResults = [];
      for (const result of results) {
        let id = 1;
        const formattedObject = {};
        for (const resultKey in result) {
          formattedObject[`col${id}`] = result[resultKey];
          id += 1;
        }
        formattedResults.push(formattedObject);
      }

      dispatch(
        setViewTemplateSelectionAction(
          viewTemplateSelect,
          currentTab.name,
          EMISSIONS_STORE_NAME
        )
      );
      dispatch(setViewDataColumns(names, currentTab.name, workspaceSection));
      dispatch(
        setViewData(formattedResults, currentTab.name, workspaceSection)
      );
      dispatch(setIsViewDataLoaded(true, currentTab.name, workspaceSection));
    } else {
      dispatch(
        setViewTemplateSelectionAction(
          viewTemplateSelect,
          currentTab.name,
          EMISSIONS_STORE_NAME
        )
      );
      dispatch(setViewDataColumns([], currentTab.name, workspaceSection));
      dispatch(setViewData([], currentTab.name, workspaceSection));
      dispatch(setIsViewDataLoaded(true, currentTab.name, workspaceSection));
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
            </div>
            <div>
              <Button
                type="button"
                className="margin-right-2 float-left margin-bottom-2"
                outline={true}
                onClick={handleExport}
              >
                Export Data
              </Button>
              {user && checkedOutByUser && (
                <Button
                  type="button"
                  className="margin-right-2 float-right"
                  outline={false}
                  onClick={() => openModal()}
                  id="importBtn"
                >
                  Import Data
                </Button>
              )}
            </div>
          </div>

          {dataLoaded && (
            <p className="text-bold font-body-2xs">{auditInformation}</p>
          )}

          <GridContainer
            className="padding-left-0 margin-left-0 padding-right-0"
            containerSize="widescreen"
          >
            <Grid row>
              {user && (
                <Grid
                  col={5}
                  widescreen={{ col: 5 }}
                  desktopLg={{ col: 5 }}
                  desktop={{ col: 5 }}
                >
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
                      className="text-no-wrap height-6"
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
                  {showRevert(evalStatus) && (
                    <Button
                      type="button"
                      id="showRevertModal"
                      tabIndex="0"
                      onClick={() => setShowRevertModal(true)}
                      outline={true}
                      className="text-no-wrap height-6 position-relative bottom-1"
                    >
                      Revert to Official Record
                    </Button>
                  )}
                </Grid>
              )}

              {user && (
                <Grid
                  col={7}
                  widescreen={{ col: 7 }}
                  desktopLg={{ col: 7 }}
                  desktop={{ col: 8 }}
                >
                  <div className="display-flex desktop:margin-top-1 desktop-lg:margin-top-0">
                    <label className="text-bold width-card desktop:width-10 desktop-lg:width-10 widescreen:width-card widescreen:margin-right-neg-4 widescreen:margin-top-2">
                      Evaluation Status:
                    </label>
                    {evalStatusContent()}
                    <label className="text-bold margin-right-1 desktop:width-10 desktop:margin-left-5 desktop-lg:width-10 widescreen:width-card widescreen:margin-right-neg-3 widescreen:margin-top-2">
                      Submission Status:{" "}
                    </label>
                    <p
                      className={`padding-1 usa-alert usa-alert--no-icon text-center ${evalStatusStyle(
                        evalStatus
                      )} margin-0`}
                    >
                      Resubmission required
                    </p>
                  </div>
                </Grid>
              )}
            </Grid>
          </GridContainer>
          {workspaceSection === MONITORING_PLAN_STORE_NAME && (
            <GridContainer className="padding-left-0 margin-left-0">
              <Grid row>
                <Grid col={2}>
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
                </Grid>
                <Grid col={2}>
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
                </Grid>
                <Grid col={2}>
                  <div className="margin-top-8">
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
                  </div>
                </Grid>
              </Grid>
              <Grid>
                <Button
                  outline
                  type="button"
                  title="Open Comments"
                  onClick={() => openViewComments()}
                >
                  View Comments
                </Button>
                {/* Hide this button until click behavior is implemented
                <Button
                  outline
                  type="button"
                  title="View Audit Report"
                  className={"hyperlink-btn cursor-pointer"}
                  onClick={() => displayReport("MP_AUDIT")}
                >
                  View Audit Report
                </Button>
                */}
                <Button
                  outline
                  type="button"
                  title="View Printout Report"
                  className={"hyperlink-btn cursor-pointer"}
                  onClick={() => displayReport("MPP")}
                >
                  View Printout Report
                </Button>
              </Grid>
            </GridContainer>
          )}

          {workspaceSection === EMISSIONS_STORE_NAME && (
            <GridContainer className="padding-left-0 margin-left-0">
              <Grid row={true}>
                <Grid col={2} widescreen={{ col: 2 }}>
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
                </Grid>
                <Grid
                  col={2}
                  widescreen={{ col: 2 }}
                  desktopLg={{ col: 10 }}
                  desktop={{ col: 10 }}
                >
                  <FormGroup className="margin-right-2 margin-bottom-1">
                    <Label test-id={"viewtemplate"} htmlFor={"viewtemplate"}>
                      {"View Template"}
                    </Label>
                    <Dropdown
                      id={"viewtemplate"}
                      name={"viewtemplate"}
                      epa-testid={"viewtemplate"}
                      data-testid={"viewtemplate"}
                      value={viewTemplateSelect?.name}
                      onChange={(e) => {
                        setViewTemplateSelect(
                          viewTemplates.find((v) => v.name === e.target.value)
                        );
                      }}
                      className="maxw-mobile"
                    >
                      {viewTemplates?.map((view) => (
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
                </Grid>
              </Grid>
              <Grid row style={{ gap: "16px" }}>
                <Grid col={2} widescreen={{ col: 2 }}>
                  <MultiSelectCombobox
                    items={reportingPeriods}
                    label="Reporting Period(s)"
                    entity="reportingPeriod"
                    searchBy="label"
                    onChangeUpdate={handleSelectReportingPeriod}
                  />
                </Grid>
                <Grid col={2} widescreen={{ col: 3 }}>
                  <Button
                    type="button"
                    title="Apply Filter(s)"
                    className="cursor-pointer text-no-wrap apply-filter-position"
                    onClick={() =>
                      applyFilters(
                        configID,
                        selectedUnitId,
                        selectedStackPipeId
                      ).catch(handleError)
                    }
                  >
                    {"Apply Filter(s)"}
                  </Button>
                </Grid>
              </Grid>
              <Grid row>
                <Grid col={3} widescreen={{ col: 2 }}>
                  <Button
                    outline
                    type="button"
                    title="Summary Report"
                    onClick={() => null}
                    className={"hyperlink-btn cursor-pointer text-no-wrap"}
                  >
                    Summary Report
                  </Button>
                </Grid>
                <Grid col={3} widescreen={{ col: 2 }}>
                  <Button
                    outline
                    type="button"
                    title="Data Report"
                    className={"hyperlink-btn cursor-pointer margin-left-2"}
                    onClick={() => null}
                  >
                    Data Report
                  </Button>
                </Grid>
              </Grid>
            </GridContainer>
          )}
        </div>
      ) : (
        <Preloader />
      )}

      {showImportModal && !finishedLoading && !isLoading ? (
        <div>
          <UploadModal
            show={showImportModal}
            close={closeImportModalHandler}
            showCancel={true}
            showSave={true}
            title={
              workspaceSection === MONITORING_PLAN_STORE_NAME
                ? "Import a Monitoring Plan to continue"
                : "Import Data"
            }
            exitBTN={"Import"}
            disablePortBtn={disablePortBtn}
            port={() => {
              importFile(importedFile);
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
                workspaceSection={workspaceSection}
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

      {/* For file imports, after it finishes uploading , shows either api errors or success messages */}
      {/* For importing historical data, this is ONLY used to display errors */}
      {(showImportModal || showHistoricalDataImportModal) &&
        finishedLoading && (
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
            successMsg={
              workspaceSection === MONITORING_PLAN_STORE_NAME
                ? "Monitoring Plan has been Successfully Imported."
                : "Test Data from File has been successfully imported."
            }
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

      {showEmissionsImportTypeModal && (
        <UploadModal
          title="Import Data"
          show={showEmissionsImportTypeModal}
          close={() => setShowEmissionsImportTypeModal(false)}
          showCancel={true}
          showImport={false}
          children={
            <EmissionsImportTypeModalContent
              onChange={onChangeOfEmissionsImportType}
            />
          }
        />
      )}

      {showHistoricalDataImportModal && !finishedLoading && !isLoading && (
        <ImportHistoricalDataModal
          closeModalHandler={closeImportModalHandler}
          setIsLoading={setIsLoading}
          setFinishedLoading={setFinishedLoading}
          finishedLoading={finishedLoading}
          importedFileErrorMsgs={importedFileErrorMsgs}
          setImportedFileErrorMsgs={setImportedFileErrorMsgs}
        />
      )}

      {showCommentsModal && (
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
      )}
    </div>
  );
};

export default HeaderInfo;
