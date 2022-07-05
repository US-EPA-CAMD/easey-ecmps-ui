import React, { useEffect, useState } from "react";
import { Button, Checkbox } from "@trussworks/react-uswds";
import { CreateOutlined, LockOpenSharp, LockSharp } from "@material-ui/icons";
import config from "../../config";
import { triggerEvaluation } from "../../utils/api/quartzApi";

import * as mpApi from "../../utils/api/monitoringPlansApi";
import * as facApi from "../../utils/api/facilityApi";
import { MONITORING_PLAN_STORE_NAME } from "../../additional-functions/workspace-section-and-store-names";
import Modal from "../Modal/Modal";
import { DropdownSelection } from "../DropdownSelection/DropdownSelection";
import "./HeaderInfo.scss";
import MonitoringPlanEvaluationReport from "../MonitoringPlanEvaluationReport/MonitoringPlanEvaluationReport";
import { Preloader } from "@us-epa-camd/easey-design-system";
import ImportModal from "../ImportModal/ImportModal";
import UploadModal from "../UploadModal/UploadModal";
import {
  attachChangeEventListeners,
  removeChangeEventListeners,
  unsavedDataMessage,
} from "../../additional-functions/prompt-to-save-unsaved-changes";
import download from "downloadjs";
import GenericTable from "../GenericTable/GenericTable";
import {
  assignFocusEventListeners,
  cleanupFocusEventListeners,
  returnFocusToCommentButton,
  returnFocusToLast,
} from "../../additional-functions/manage-focus";
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
}) => {
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
  const [checkedOutConfigs, setCheckedOutConfigs] = useState([]);
  const [auditInformation, setAuditInformation] = useState("");
  const [dataLoaded, setDataLoaded] = useState(false);

  const [checkedOutByUser, setCheckedOutByUser] = useState(false);
  const [showEvalReport, setShowEvalReport] = useState(false);
  const [showRevertModal, setShowRevertModal] = useState(false);

  const closeRevertModal = () => setShowRevertModal(false);
  const closeEvalReportModal = () => setShowEvalReport(false);

  const [checkoutState, setCheckoutState] = useState(checkout);
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
    `fullscreen=yes`,
  ].join(",");

  const displayReport = () => {
    window.open(
      `/ecmps/workspace/monitoring-plans/${selectedConfig.id}/evaluation-report`,
      "ECMPS Monitoring Plan Report",
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

  const exportHandler = () => {
    mpApi
      .getMonitoringPlanById(configID)
      .then((mpRes) => {
        const facId = mpRes.data["facId"];
        const mpName = mpRes.data["name"];
        const date = new Date();
        const year = date.getUTCFullYear();
        const month = date.getUTCMonth() + 1;
        const day = date.getUTCDate();
        const fullDateString = `${month}-${day}-${year}`;
        facApi
          .getFacilityById(facId)
          .then((facRes) => {
            const facName = facRes.data["facilityName"];
            const exportFileName = `MP Export - ${facName}, ${mpName} (${fullDateString}).json`;
            download(JSON.stringify(mpRes.data, null, "\t"), exportFileName);
          })
          .catch((facErr) => {
            console.log(facErr);
          });
      })
      .catch((mpErr) => {
        console.log(mpErr);
      });
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
    if (!evalStatusLoaded) {
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
  }, [checkout, dataLoaded, evalStatusLoaded]);

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
          currStatus !== "EVAL"
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

    setCheckoutState(currentConfig.checkedOutBy !== "N/A");
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

  const showHyperLink = (status) => {
    return status === "PASS" || status === "INFO" || status === "ERR";
  };

  const showSubmit = (status) => {
    return status === "PASS" || status === "INFO";
  };

  const showRevert = (status) => {
    return (
      status === "PASS" ||
      status === "INFO" ||
      status === "ERR" ||
      status === "EVAL" ||
      status === "Y"
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
        setCheckoutState(direction);
        setDataLoaded(false);
      }
    );
  };

  const revert = () => {
    mpApi.revertOfficialRecord(selectedConfig.id).then(() => {
      setRevertedState(true);
      setShowRevertModal(false);
      setEvalStatusLoaded(false);
      setDataLoaded(false);
    });
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
          children={
            <MonitoringPlanEvaluationReport
              monitorPlanId={selectedConfig.id}
              facility={facility}
            />
          }
        />
      ) : null}

      {evalStatusLoaded && dataLoaded ? (
        // adding display-block here allows buttons to be clickable ( has somesort of hidden overlay without it)
        <div className="grid-row clearfix position-relative display-block">
          <div className="grid-col clearfix position-absolute top-1 right-0 ">
            <div className="">
              {user && checkedOutByUser ? (
                <div>
                  <div className=" margin-left-10 display-block">
                    <Button
                      type="button"
                      className="margin-right-2 float-left margin-bottom-2"
                      outline={true}
                      onClick={exportHandler}
                    >
                      Export Monitoring Plan
                    </Button>
                    <Button
                      type="button"
                      className="margin-right-2 float-right"
                      outline={false}
                      onClick={() => openImportModal()}
                      id="importMonitoringPlanBtn"
                    >
                      Import Monitoring Plan
                    </Button>
                  </div>

                  <div className="grid-row float-right text-right desktop:display-block">
                    <div className="padding-1">
                      {showSubmit(evalStatus) ? (
                        <Button
                          type="button"
                          className="margin-right-2 float-right margin-bottom-2"
                          outline={false}
                          title="Coming Soon"
                        >
                          Submit
                        </Button>
                      ) : (
                        ""
                      )}

                      {evalStatusText(evalStatus) === "Needs Evaluation" ? (
                        <Button
                          type="button"
                          className=" margin-left-4 float-right margin-bottom-2"
                          outline={false}
                          onClick={evaluate}
                        >
                          Evaluate
                        </Button>
                      ) : (
                        ""
                      )}
                      <div className="desktop:display-block">
                        {showRevert(evalStatus) ? (
                          <div className=" float-right position-relative margin-bottom-2">
                            <Button
                              type="button"
                              id="showRevertModal"
                              className="float-right"
                              onClick={() => setShowRevertModal(true)}
                              outline={true}
                            >
                              {"Revert to Official Record"}
                            </Button>
                          </div>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                ""
              )}
            </div>
            {user ? (
              <div className="grid-row float-right text-right margin-right-2 mobile:display-none desktop:display-block">
                <table role="presentation">
                  <tbody>
                    <tr>
                      <th className="padding-1">Evaluation Status: </th>
                      <td
                        className={`padding-1 usa-alert usa-alert--no-icon text-center ${evalStatusStyle(
                          evalStatus
                        )}`}
                      >
                        {/* needed to separate the text and button otherwise it tabs to a text causing 508 errors */}
                        {showHyperLink(evalStatus) ? (
                          <button
                            className={"hyperlink-btn cursor-pointer"}
                            onClick={() => displayReport()}
                          >
                            {evalStatusText(evalStatus)}
                          </button>
                        ) : (
                          // prevents tabbing to this message when there is no valid link to click
                          <div className="unstyled-btn">
                            {evalStatusText(evalStatus)}
                          </div>
                        )}
                      </td>
                    </tr>
                    <tr>
                      <th className="padding-1">Submission Status: </th>
                      <td className="padding-1">Resubmission required</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            ) : (
              ""
            )}
          </div>
          <div className="grid-col float-left">
            <div>
              <h3 className="display-inline-block">
                {" "}
                {user && (checkedOutByUser || lockedFacility) ? (
                  <LockSharp className="lock-icon margin-right-1" />
                ) : (
                  ""
                )}
                <span className="font-body-lg">{facilityMainName}</span>
              </h3>
              <div className="text-bold font-body-2xs">
                {dataLoaded ? auditInformation : ""}
              </div>
            </div>
            <div className="">
              <div className="display-inline-block ">
                <div className="text-bold font-body-xl display-block height-9 padding-top-4 padding-bottom-2">
                  {user && checkoutState && checkedOutByUser ? (
                    <CreateOutlined
                      color="primary"
                      fontSize="large"
                      className="position-relative top-2px"
                    />
                  ) : (
                    ""
                  )}{" "}
                  {facilityAdditionalName}
                  {user ? (
                    <div className="text-bold font-body-2xs display-inline-block ">
                      {checkedOutByUser === true ? (
                        <Button
                          type="button"
                          autoFocus
                          outline={false}
                          tabIndex="0"
                          aria-label={`Check back in the configuration `}
                          className=" padding-1 padding-right-3 padding-left-3 margin-2"
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
                          className="float-top padding-1 padding-right-3 padding-left-3 margin-2"
                          onClick={() => checkoutStateHandler(true)}
                          id="checkOutBTN"
                          epa-testid="checkOutBTN"
                        >
                          <CreateOutlined color="primary" /> {"Check Out"}
                        </Button>
                      ) : null}
                    </div>
                  ) : (
                    ""
                  )}
                  <Button
                    type="button"
                    className="margin-left-4 position-relative top-neg-1"
                    outline={true}
                    title="Open Comments"
                    onClick={() => openViewComments()}
                  >
                    View Comments
                  </Button>
                </div>

                <div className="grid-row">
                  <DropdownSelection
                    caption="Locations"
                    orisCode={orisCode}
                    options={locations}
                    viewKey="name"
                    selectKey="id"
                    initialSelection={locationSelect[0]}
                    selectionHandler={setLocationSelect}
                    workspaceSection={MONITORING_PLAN_STORE_NAME}
                  />
                  <DropdownSelection
                    caption="Sections"
                    selectionHandler={setSectionSelect}
                    options={sections}
                    viewKey="name"
                    selectKey="name"
                    initialSelection={sectionSelect[0]}
                    orisCode={orisCode}
                    workspaceSection={MONITORING_PLAN_STORE_NAME}
                  />
                  <div className="">
                    <div className="bottom-0 position-absolute padding-bottom-05">
                      <Checkbox
                        epa-testid="inactiveCheckBox"
                        id="checkbox"
                        name="checkbox"
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
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Preloader />
      )}
      <div className={`usa-overlay ${showImportModal ? "is-visible" : ""}`} />

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

      {/* while uploading, just shows preloader spinner  */}

      {isLoading && !finishedLoading ? (
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
      ) : (
        ""
      )}

      {/* after it finishes uploading , shows either api errors or success messages */}
      {showImportModal && usePortBtn && finishedLoading ? (
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
      ) : (
        ""
      )}

      <div className={`usa-overlay ${showCommentsModal ? "is-visible" : ""}`} />
      {showCommentsModal ? (
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
      ) : (
        ""
      )}
    </div>
  );
};

export default HeaderInfo;
