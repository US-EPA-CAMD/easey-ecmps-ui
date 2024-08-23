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

import * as mpApi from "../../utils/api/monitoringPlansApi";
import * as emApi from "../../utils/api/emissionsApi";
import {
  EMISSIONS_STORE_NAME,
  MONITORING_PLAN_STORE_NAME,
  QA_CERT_EVENT_STORE_NAME,
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
  getUser,
  displayReport,
  getPreviouslyFullSubmitedQuarter,
  getQuarter,
  formatErrorResponse,
} from "../../utils/functions";
import { EmissionsImportTypeModalContent } from "./EmissionsImportTypeModalContent";
import { ImportHistoricalDataModal } from "./ImportHistoricalDataModal";
import {
  setReportingPeriods,
  setViewData,
  setViewDataColumns,
  setViewTemplateSelectionAction,
} from "../../store/actions/dynamicFacilityTab";
import { handleError, successResponses } from "../../utils/api/apiUtils";
import {
  displayAppError,
  displayAppWarning,
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

export const getReportingPeriods = (minYear = 2009) => {
  const quarters = [4, 3, 2, 1];
  const maxYear = new Date().getFullYear();
  const reportingPeriods = [];

  const currentYearQuarter = parseInt(`${maxYear}${getQuarter()}`);

  for (let year = maxYear; year >= minYear; year--) {
    for (const quarter of quarters) {
      if (parseInt(`${year}${quarter}`) <= currentYearQuarter)
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

  const testData = [
    { name: "-- Select --" },
    { name: "QA Certification Event" },
    { name: "Test Extension Exemption" },
  ];

  const defaultTemplateValue = {
    code: "SELECT",
    name: "--- select a view ---",
  };

  // *** parse apart facility name
  const facilityMainName = facility.split("(")[0];
  const facilityAdditionalName = facility.split("(")[1].replace(")", "");

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

  const closeRevertModal = () => {
    setShowRevertModal(false);
    const revertBtn = document.querySelector("#showRevertModal");
    revertBtn.focus();
  };
  const closeEvalReportModal = () => setShowEvalReport(false);

  // const [checkoutState, setCheckoutState] = useState(checkout);
  const inWorkspace = !!user;

  // refreshing evaluation status
  const delayInSeconds = config.app.refreshEvalStatusRate;
  const [openIntervalId, setOpenIntervalId] = useState(null);
  const [evalStatus, setEvalStatus] = useState("");
  const [evalStatusDescription, setEvalStatusDescription] = useState("");
  const [evalStatusLoaded, setEvalStatusLoaded] = useState(false);

  const [submissionStatus, setSubmissionStatus] = useState("");
  const [submissionStatusDescription, setSubmissionStatusDescription] =
    useState("");

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
  const [viewTemplates, setViewTemplates] = useState([defaultTemplateValue]);
  const [testDataOptions, setTestDataOptions] = useState([]);

  const [importedFile, setImportedFile] = useState([]);
  const [importedFileErrorMsgs, setImportedFileErrorMsgs] = useState([]);

  const [showEmissionsImportTypeModal, setShowEmissionsImportTypeModal] =
    useState(false);
  const [showHistoricalDataImportModal, setShowHistoricalDataImportModal] =
    useState(false);

  const [selectedReportingPeriods, setSelectedReportingPeriods] = useState(
    currentTab?.reportingPeriods ?? []
  );
  /* defaultReportingPeriodChanged is a flag for whether a user has selected a reporing date or not;
    it's changed when user manually changes location or viewTemplate or imports data
  */
  const [defaultReportingPeriodChanged, setDefaultReportingPeriodChanged] = useState(false);

  let selectedUnitId = selectedConfig?.monitoringLocationData
    ?.filter((l) => l.id === locationSelect[1])
    .map((l) => l.unitId);
  let selectedStackPipeId = selectedConfig?.monitoringLocationData
    ?.filter((l) => l.id === locationSelect[1])
    .map((l) => l.stackPipeId);
  const [viewTemplateSelect, setViewTemplateSelect] = useState(null);
  const [testDataOptionSelect, setTestDataOptionSelect] = useState(null);

  const evalModuleLoadedStatus = evalStatusLoaded || !inWorkspace;
  const workspaceSectionName =
    workspaceSection === MONITORING_PLAN_STORE_NAME
      ? "Monitoring Plan"
      : workspaceSection === EMISSIONS_STORE_NAME
        ? "Emissions"
        : "Test";

  const MAX_REPORTING_PERIODS = 4;
  const MAX_REPORTING_PERIODS_ERROR_MSG =
    "You can only select a maximum of four reporting periods";

  let reportingPeriods = useMemo(
    () =>
      getReportingPeriods().map((reportingPeriod, index) => {
        const noPrevSelection = currentTab?.reportingPeriods === undefined;
        return {
          id: reportingPeriod,
          label: reportingPeriod,
          // select most recent quarter,year if logged in and no previous selection exists
          selected: noPrevSelection && inWorkspace && index === 0,
          enabled: true,
        };
      }),
    [currentTab.reportingPeriods, inWorkspace]
  );

  // This useeffect controls which reporting periods are selectected by default
  useEffect(() => {
    // this would mean reporting peruiods were already selected and users are probably just switching back to the tab, so their selctions should remain.
    if (currentTab === undefined || currentTab?.reportingPeriods) {
      return;
    }

    let selectedRptPeriods;
    if (inWorkspace) {
      selectedRptPeriods = reportingPeriods
        .filter((rp) => rp.selected)
        .map((rp) => rp.id);
    } else {
      const rptPeriod = getPreviouslyFullSubmitedQuarter(
        new Date().toDateString()
      );
      const foundRptPeriod = reportingPeriods.find(
        (rp) => rp.label === rptPeriod
      );
      if (!foundRptPeriod) return;
      foundRptPeriod.selected = true;
      selectedRptPeriods = [foundRptPeriod.id];
    }

    setSelectedReportingPeriods(selectedRptPeriods);

    dispatch(
      setReportingPeriods(selectedRptPeriods, currentTab.name, workspaceSection)
    );

    // Adding dispatch to below dep array causes an inifinte rerender problem
    // hence why the linter warning is being suppressed.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reportingPeriods, currentTab, workspaceSection]);

  useEffect(() => {
    if (currentTab?.viewTemplateSelect)
      setViewTemplateSelect(currentTab.viewTemplateSelect);
    if (currentTab?.reportingPeriods) {
      const reduxReportingPeriods = currentTab.reportingPeriods;
      for (const reportingPeriod of reportingPeriods) {
        if (currentTab.reportingPeriods.includes(reportingPeriod.id)) {
          reportingPeriod.selected = true;
        }
      }

      setSelectedReportingPeriods(reduxReportingPeriods)
    }
    if (currentTab?.locationSelect) {
      setLocationSelect(currentTab.locationSelect);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentTab]);

  useEffect(() => {
    if (currentTab?.testDataOptionSelect)
      setTestDataOptionSelect(currentTab.testDataOptionSelect);
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
    if (workspaceSection !== QA_CERT_EVENT_STORE_NAME) return;
    setTestDataOptions(testData);
    if (!currentTab?.TestDataOptionSelect && testData?.length > 0) {
      setTestDataOptionSelect(testData[0]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [workspaceSection, setTestDataOptionSelect]);

  // Initially loads the view dropdown
  useEffect(() => {
    if (workspaceSection === EMISSIONS_STORE_NAME) {
      getEmissionsViewDropdownData().catch((e) => {
        console.log(e);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedReportingPeriods]);

  // See zenhub ticket#5756 for info on business logic of View Templates dropdown in workspace
  const filterViewDataForWorkspace = (countData, allViews) => {
    const codesWithData = countData
      .filter((c) => c.count > 0)
      .map((c) => c.dataSetCode);

    // This will filter the dropdown values for the views by the ones that have a count > 0
    return allViews
      .filter(view => view.code !== "COUNTS")
      .filter(
        (view) => codesWithData.find((d) => d === view.code) !== undefined
      );
  }

  // See zenhub ticket#5756 for info on business logic of View Templates dropdown in global
  const filterViewDataForGlobal = (countData, allViews) => {
    return allViews
      .filter(view => view.code !== "COUNTS")
      .filter(view => {

        const matches = countData.filter(cd => cd.dataSetCode === view.code && cd.count === 0)
        // The counts data comes back with multiple records for the same view code but in order for a
        // view template to be filtered out of the View Templates dropdown, the number of 0 count records
        // has to be the same as the number of reporting periods that are selected
        return matches.length !== selectedReportingPeriods.length
      })
  }

  // gets the data required to build the emissions dropdown
  const getEmissionsViewDropdownData = async (location) => {

    const isSelectedReportingPeriodsEmpty = selectedReportingPeriods.length === 0;

    if (isSelectedReportingPeriodsEmpty) {

      setViewTemplates([defaultTemplateValue]);
      setViewTemplateSelect(defaultTemplateValue)
      return;
    }

    // First get view counts
    try {
      setIsLoading(true);
      if (location) {
        selectedUnitId = selectedConfig?.monitoringLocationData
          ?.filter((l) => l.id === location[1])
          .map((l) => l.unitId);

        selectedStackPipeId = selectedConfig?.monitoringLocationData
          ?.filter((l) => l.id === location[1])
          .map((l) => l.stackPipeId);
      }
      const { data: countData } = await emApi.getEmissionViewData(
        "COUNTS",
        configID,
        selectedReportingPeriods,
        selectedUnitId,
        selectedStackPipeId,
        inWorkspace
      );

      let { data: allViews } = await emApi.getViews();

      let filteredViewData;
      if (inWorkspace)
        filteredViewData = filterViewDataForWorkspace(countData, allViews);
      else
        filteredViewData = filterViewDataForGlobal(countData, allViews);

      filteredViewData.unshift(defaultTemplateValue);

      if (
        !viewTemplateSelect ||
        viewTemplateSelect?.code === defaultTemplateValue.code
      )
        setViewTemplateSelect(filteredViewData[1]);

      setViewTemplates(filteredViewData);
      if (!currentTab?.viewTemplateSelect && filteredViewData?.length > 0) {
        setViewTemplateSelect(filteredViewData[0]);
      }

      setIsLoading(false);
    } catch (e) {
      console.error(e);
      setIsLoading(false);
    }
  };

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
    for (const selectedReportingPeriod of selectedReportingPeriods) {
      // reportingPeriod: '2022 Q1' -> year: 2022, quarter: 1
      await emApi.exportEmissionsDataDownload(
        facility,
        configID,
        selectedReportingPeriod.slice(0, 4),
        selectedReportingPeriod.charAt(selectedReportingPeriod.length - 1),
        getUser() !== null
      );
    }
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
    mpApi
      .getMonitoringPlanComments(selectedConfig.id)

      .then((data) => {
        setCommentsData(formatCommentsToTable(data.data));
        setShowCommentsModal(true);
      })
      .catch((error) => {
        console.error("Error during getting comments", error);
      });

    setTimeout(() => {
      attachChangeEventListeners(".modalUserInput");
    });
  };

  useEffect(() => {
    // get evaluation status
    if (!evalStatusLoaded || updateRelatedTables) {
      mpApi
        .getRefreshInfo(configID)
        .then((res) => {
          if (res.data.evalStatusCode) {
            const status = res.data.evalStatusCode;
            setEvalStatus(status);
            setEvalStatusDescription(res.data.evalStatusCodeDescription);

            setSubmissionStatus(res.data.submissionAvailabilityCode);
            setSubmissionStatusDescription(
              res.data.submissionAvailabilityCodeDescription
            );

            setEvalStatusLoaded(true);
          }
        })
        .catch((error) => {
          console.error("Error during evaluation", error);
        });
    }

    // then load the rest of the data
    if (evalModuleLoadedStatus && !dataLoaded) {
      mpApi
        .getCheckedOutLocations()
        .then((res) => {
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
            mpApi
              .getRefreshInfo(configID)
              .then((info) => {
                currentConfig = {
                  checkedOutBy: "N/A",
                  lastUpdatedBy: info.data.userId,
                  updateDate: info.data.updateDate,
                };

                // update lock status of current facility & render new data onto page
                setLockedFacility(
                  configs.some(
                    (plan) => plan.facId === parseInt(info.data.facId)
                  )
                );
                renderWithNewData(configs, currentConfig, false);
              })
              .catch((error) => {
                console.error("Error during refreshing", error);
              });
          }
        })
        .catch((error) => {
          console.error("Error during getting checked out locations", error);
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
          mpApi
            .getRefreshInfo(configID)
            .then((res) => {
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
            })
            .catch((error) => {
              console.error("Error during getting refresh info", error);
            });
        }

        // if refresh timeout is reached,
        // then refresh the header (will automatically clear the open interval)
        if (totalTime >= config.app.refreshEvalStatusTimeout) {
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
      configs.map((con) => con["monPlanId"]).indexOf(selectedConfig?.id)
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

  const formatDate = (dateString) => {
    const date = new Date(
      new Date(dateString).toLocaleString("en-us", {
        timeZone: "America/New_York",
      })
    );

    return (
      (date.getMonth() > 8
        ? date.getMonth() + 1
        : "0" + (date.getMonth() + 1)) +
      "/" +
      (date.getDate() > 9 ? date.getDate() : "0" + date.getDate()) +
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

  const submissionStatusStyle = (status) => {
    switch (status) {
      case "GRANTED":
        return "usa-alert--info";
      case "PENDING":
      case "WIP":
      case "INQ":
      case "REQUIRE":
        return "usa-alert--warning";
      case "UPDATED":
        return "usa-alert--success";
      default:
        break;
    }
    return "";
  };

  const evalStatusContent = () => {
    const alertStyle = `padding-1 usa-alert usa-alert--no-icon text-center ${evalStatusStyle(
      evalStatus
    )} margin-y-0`;
    const params = {
      reportCode: "MP_EVAL",
      facilityId: orisCode,
      monitorPlanId: selectedConfig.id,
    };
    const evalStatusHyperlink = (
      <div className={alertStyle}>
        <button
          className={"hyperlink-btn cursor-pointer"}
          onClick={() => displayReport(params)}
        >
          {evalStatusDescription}
        </button>
      </div>
    );

    if (showHyperLink(evalStatus)) {
      return evalStatusHyperlink;
    } else {
      return <p className={alertStyle}>{evalStatusDescription}</p>;
    }
  };

  const submissionStatusContent = () => {
    const alertStyle = `padding-1 usa-alert usa-alert--no-icon text-center ${submissionStatusStyle(
      submissionStatus
    )} margin-y-0`;

    return <p className={alertStyle}>{submissionStatusDescription}</p>;
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
    checkoutAPI(direction, configID, selectedConfig.id, setCheckout)
      .then(() => {
        handleSelectReportingPeriod();
        setCheckedOutByUser(direction);
        setLockedFacility(direction);
        // setCheckoutState(direction);
        setDataLoaded(false);
      })
      .catch((error) => {
        console.error("Error during checking out api ", error);
      });
  };

  const revert = () => {
    mpApi
      .revertOfficialRecord(selectedConfig.id)
      .then(() => {
        setRevertedState(true);
        setShowRevertModal(false);
        setIsReverting(false);
        setEvalStatusLoaded(false);
        setDataLoaded(false);
      })
      .catch((error) => {
        console.error("Error during reverting to official record", error);
      });
    // this code executes first while we wait for api to finish returning
    setIsReverting(true);
    setShowRevertModal(false);
    resetEmissionsWorkspace();
  };

  const resetEmissionsWorkspace = () => {

    // set Default Reporting period
    setSelectedReportingPeriods([reportingPeriods[0]?.id]);
    dispatch(
      setReportingPeriods([reportingPeriods[0]?.id], currentTab.name, EMISSIONS_STORE_NAME)
    );

    dispatch(setViewDataColumns([], currentTab.name, EMISSIONS_STORE_NAME));
    dispatch(setViewData([], currentTab.name, EMISSIONS_STORE_NAME));
    dispatch(setViewTemplateSelectionAction(null, currentTab.name, EMISSIONS_STORE_NAME));
    setDefaultReportingPeriodChanged(true);
  }

  const importMPFile = (payload) => {
    setIsLoading(true);
    setFinishedLoading(false);
    mpApi
      .importMP(payload)
      .then((response) => {
        if (!successResponses.includes(response.status)) {
          const errorMsgs = formatErrorResponse(response);
          setImportedFileErrorMsgs(errorMsgs);
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
        if (!successResponses.includes(status)) {
          setImportedFileErrorMsgs(data?.message || ["HTTP 400 Error"]);
        }

        // set relevant reporting periods state to rerender which will call
        // getEmissionsViewDropdownData w/ new reporting periods state
        const { year, quarter } = payload;
        let importedReportingPeriod = [`${year} Q${quarter}`];
        if (defaultReportingPeriodChanged) {
          importedReportingPeriod = [...new Set(selectedReportingPeriods.concat([`${year} Q${quarter}`]))];
        }

        // Select the reporting period that user has selected
        reportingPeriods.forEach((rp) => {
          rp.selected = importedReportingPeriod.includes(rp.label);
        });

        setSelectedReportingPeriods(importedReportingPeriod);
        dispatch(setReportingPeriods(importedReportingPeriod, currentTab.name, workspaceSection));
        setDefaultReportingPeriodChanged(true);
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

  const historicalImportCallback = (historicYear, historicQuarter) => {
    // set relevant reporting periods state to rerender which will call
    // getEmissionsViewDropdownData w/ new reporting periods state
    let importedReportingPeriod = [`${historicYear} Q${historicQuarter}`];
    if (defaultReportingPeriodChanged) {
      importedReportingPeriod = [...new Set(selectedReportingPeriods.concat([`${historicYear} Q${historicQuarter}`]))];
    }

    // Select the reporting period that user has selected
    reportingPeriods.forEach((rp) => {
      rp.selected = importedReportingPeriod.includes(rp.label);
    });

    setSelectedReportingPeriods(importedReportingPeriod);
    dispatch(setReportingPeriods(importedReportingPeriod, currentTab.name, workspaceSection));
    setDefaultReportingPeriodChanged(true)
  };

  // Create audit message for header info
  const createAuditMessage = (checkedOut, currentConfig) => {
    // WORKSPACE view
    if (inWorkspace) {
      // when config is checked out by someone
      if (checkedOut) {
        return `Currently checked-out by: ${currentConfig["checkedOutBy"]
          } ${formatDate(currentConfig["checkedOutOn"])}`;
      }
      // when config is not checked out
      return `Last updated by: ${currentConfig.lastUpdatedBy} ${formatDate(
        currentConfig.updateDate
      )}`;
    }

    // GLOBAL view
    if (workspaceSection === MONITORING_PLAN_STORE_NAME) {
      return `Last submitted by: ${selectedConfig.userId} ${formatDate(
        selectedConfig.updateDate
          ? selectedConfig.updateDate
          : selectedConfig.addDate
      )}`;
    }
  };

  const resetEmissionsViewTable = () => {
    dispatch(setViewDataColumns([], currentTab.name, workspaceSection));
    dispatch(setViewData([], currentTab.name, workspaceSection));
    dispatch(setViewTemplateSelectionAction(null, currentTab.name, EMISSIONS_STORE_NAME));
    setDefaultReportingPeriodChanged(true);
  }

  const handleSelectReportingPeriod = () => {

    if (!selectedReportingPeriods.length) return;
    const uniqueReportingPeriods = [
      ...new Set([...selectedReportingPeriods]),
    ];
    setSelectedReportingPeriods(uniqueReportingPeriods);
    dispatch(setReportingPeriods(uniqueReportingPeriods, currentTab.name, workspaceSection));
  };

  const reportingPeriodOnChangeUpdate = (id) => {
    const uniqueReportingPeriods = [
      ...new Set([...selectedReportingPeriods, id]),
    ];

    if (uniqueReportingPeriods.length > MAX_REPORTING_PERIODS) {
      displayAppError(MAX_REPORTING_PERIODS_ERROR_MSG);
      const addedRp = reportingPeriods.find((rp) => rp.id === id);
      addedRp.selected = false;
      reportingPeriods = [...reportingPeriods];
      return;
    }
    hideAppError();
    const filteredReportingPeriods = reportingPeriods
      .filter((el) => el.selected)
      .map((rp) => rp.id);
    setSelectedReportingPeriods(filteredReportingPeriods);

    dispatch(setReportingPeriods(filteredReportingPeriods, currentTab.name, workspaceSection));

    resetEmissionsViewTable();
  };

  const emissionsLocationOnchange = (location) => {
    setLocationSelect(location);
    setViewTemplateSelect(defaultTemplateValue)
    resetEmissionsViewTable();
    getEmissionsViewDropdownData(location);
  }

  const handleExport = async () => {
    try {
      setIsLoading(true);
      setDataLoaded(false);
      if (workspaceSection === EMISSIONS_STORE_NAME)
        await handleEmissionsExport().catch((error) => {
          console.error("Error during exporting:", error);
        });
      if (workspaceSection === MONITORING_PLAN_STORE_NAME)
        await mpApi.exportMonitoringPlanDownload(configID).catch((error) => {
          console.error("Error during exporting ", error);
        });
      setDataLoaded(true);
      setIsLoading(false);
    } catch (error) {
      setDataLoaded(true);
      setIsLoading(false);
      console.error(error);
    }
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
    setIsLoading(true)
    const response = await emApi.getEmissionViewData(
      viewTemplateSelect?.code,
      monitorPlanId,
      selectedReportingPeriods,
      unitIds,
      stackPipeIds,
      inWorkspace
    );

    if (
      response &&
      response.status === 200 &&
      response.headers["x-field-mappings"] &&
      response.data
    ) {
      const columns = JSON.parse(response.headers["x-field-mappings"]);
      const results = response.data;

      if (results.length === 0) {
        displayAppWarning(`The ${viewTemplateSelect.name} view does not contain data for ${selectedReportingPeriods.join(", ")} location ${locations[locationSelect[0]]?.name}`);
        getEmissionsViewDropdownData();
      }

      results.forEach((o, idx) => o.id = idx)
      dispatch(
        setViewTemplateSelectionAction(
          results.length === 0 ? null : viewTemplateSelect,
          currentTab.name,
          EMISSIONS_STORE_NAME
        )
      );
      dispatch(setViewDataColumns(columns, currentTab.name, workspaceSection));
      dispatch(setViewData(results, currentTab.name, workspaceSection));
    }
    else {
      dispatch(
        setViewTemplateSelectionAction(
          null,
          currentTab.name,
          EMISSIONS_STORE_NAME
        )
      );
      dispatch(setViewDataColumns([], currentTab.name, workspaceSection));
      dispatch(setViewData([], currentTab.name, workspaceSection));
    }
    setIsLoading(false)

    // dispatch(setIsViewDataLoaded(true, currentTab.name, workspaceSection));
  };

  return (
    <div className="header">
      <div
        className={`usa-overlay ${showRevertModal || showEvalReport ? "is-visible" : ""
          } `}
      />

      {showRevertModal && (
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
      )}
      {showEvalReport && (
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
      )}

      {evalModuleLoadedStatus && dataLoaded ? (
        <div>
          <div className="grid-row">
            <div className="grid-col-9">
              <h3 className="font-body-lg margin-y-0">{facilityMainName}</h3>
              <h3 className="facility-header-text-cutoff margin-y-0" title={facilityAdditionalName}>
                {facilityAdditionalName}
              </h3>
              {dataLoaded && (
                <p className="text-bold font-body-2xs margin-top-0">{auditInformation}</p>
              )}
            </div>
            <div className="display-flex grid-col-3 flex-align-start flex-justify-end">
              <div className="display-flex grid-row">
                <Button
                  type="button"
                  className="margin-y-1"
                  outline={true}
                  onClick={() => handleExport().catch(handleError)}
                >
                  Export Data
                </Button>
                {user && checkedOutByUser && (
                  <Button
                    type="button"
                    className="margin-y-1"
                    outline={false}
                    onClick={() => openModal()}
                    id="importBtn"
                  >
                    Import Data
                  </Button>
                )}
              </div>
            </div>
          </div>



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
                  {workspaceSection === MONITORING_PLAN_STORE_NAME &&
                    showRevert(evalStatus) && (
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

              {user && workspaceSection === MONITORING_PLAN_STORE_NAME && (
                <Grid
                  col={7}
                  widescreen={{ col: 7 }}
                  desktopLg={{ col: 7 }}
                  desktop={{ col: 8 }}
                >
                  <div
                    className="display-flex desktop:margin-top-1 desktop-lg:margin-top-0"
                    aria-live="polite"
                  >
                    <label className="text-bold width-card desktop:width-10 desktop-lg:width-10 widescreen:width-card widescreen:margin-right-neg-4 widescreen:margin-top-2">
                      Evaluation Status:
                    </label>
                    {evalStatusContent()}
                    <label className="text-bold margin-right-1 desktop:width-10 desktop:margin-left-5 desktop-lg:width-10 widescreen:width-card widescreen:margin-right-neg-3 widescreen:margin-top-2">
                      Submission Status:{" "}
                    </label>
                    {submissionStatusContent()}
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
                <Grid col={4}>
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
                  onClick={() => displayReport("MP_AUDIT", orisCode, selectedConfig.id)}
                >
                  View Audit Report
                </Button>
                */}
              </Grid>
            </GridContainer>
          )}

          {workspaceSection === QA_CERT_EVENT_STORE_NAME && (
            <GridContainer className="padding-left-0 margin-left-0 maxw-desktop">
              <Grid row={true}>
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
                <Grid col={8} desktopLg={{ col: 5 }} widescreen={{ col: 5 }}>
                  <FormGroup className="margin-right-2 margin-bottom-1">
                    <Label test-id={"testData"} htmlFor={"testData"}>
                      {"Test Data"}
                    </Label>
                    <Dropdown
                      id={"testData"}
                      name={"testData"}
                      epa-testid={"testData"}
                      data-testid={"testData"}
                      value={testDataOptionSelect?.name}
                      onChange={(e) => {
                        setTestDataOptionSelect(
                          testDataOptions.find((v) => v.name === e.target.value)
                        );
                      }}
                    // className="mobile-lg:view-template-dropdown-maxw"
                    >
                      {testDataOptions?.map((data) => (
                        <option
                          data-testid={data.name}
                          key={data.name}
                          value={data.name}
                        >
                          {data.name}
                        </option>
                      ))}
                    </Dropdown>
                  </FormGroup>
                </Grid>
              </Grid>
            </GridContainer>
          )}

          {workspaceSection === EMISSIONS_STORE_NAME && (
            <GridContainer className="padding-left-0 margin-left-0 maxw-desktop">
              <Grid row={true}>
                <Grid col={2} className="margin-top-3 margin-right-2">
                  <MultiSelectCombobox
                    items={reportingPeriods}
                    label="Reporting Period(s)"
                    entity="reportingPeriod"
                    searchBy="contains"
                    onChangeUpdate={reportingPeriodOnChangeUpdate}
                  />
                </Grid>
                <Grid col={2}>
                  <DropdownSelection
                    caption="Locations"
                    orisCode={orisCode}
                    options={locations}
                    viewKey="name"
                    selectKey="id"
                    initialSelection={locationSelect[0]}
                    selectionHandler={emissionsLocationOnchange}
                    workspaceSection={workspaceSection}
                  />
                </Grid>
                <Grid col={8} desktopLg={{ col: 5 }} widescreen={{ col: 5 }}>
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
                        resetEmissionsViewTable()
                      }}
                    // className="mobile-lg:view-template-dropdown-maxw"
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
                <Grid col={2} className="margin-top-3">
                  <Button
                    type="button"
                    title="Apply Filter(s)"
                    className="cursor-pointer text-no-wrap apply-filter-position"
                    disabled={
                      locationSelect &&
                        selectedReportingPeriods.length !==
                        0 &&
                        viewTemplateSelect?.code !== defaultTemplateValue.code &&
                        viewTemplateSelect !== null
                        ? false
                        : true
                    }
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
              {/* ------------------------------------------------------------------------------- */}
            </GridContainer>
          )}
        </div>
      ) : (
        <Preloader />
      )}

      {showImportModal && !finishedLoading && !isLoading && (
        <div>
          <UploadModal
            show={showImportModal}
            close={closeImportModalHandler}
            showCancel={true}
            showSave={true}
            title={`Import ${workspaceSectionName} Data`}
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
      )}
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
            successMsg={`${workspaceSectionName} has been Successfully Imported.`}
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
          title={`Import ${workspaceSectionName} Data`}
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
          workspaceSectionName={workspaceSectionName}
          portCallback={historicalImportCallback}
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
