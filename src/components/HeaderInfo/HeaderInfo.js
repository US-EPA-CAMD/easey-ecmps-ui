import React, { useState, useEffect } from "react";
import { Button, Checkbox } from "@trussworks/react-uswds";
import { CreateOutlined, LockOpenSharp, LockSharp } from "@material-ui/icons";
import config from "../../config";
import { triggerEvaluation } from "../../utils/api/quartzApi";

import * as mpApi from "../../utils/api/monitoringPlansApi";
import Modal from "../Modal/Modal";
import { DropdownSelection } from "../DropdownSelection/DropdownSelection";
import "./HeaderInfo.scss";
import MonitoringPlanEvaluationReport from "../MonitoringPlanEvaluationReport/MonitoringPlanEvaluationReport";
import { Preloader } from "../Preloader/Preloader";

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
}) => {
  const sections = [
    { name: "Defaults" },
    { name: "Formulas" },
    { name: "Loads" },
    { name: "Location Attributes and Relationships" },
    { name: "Methods" },
    { name: "Qualifications" },
    { name: "Rectangular Duct WAFs" },
    { name: "Span" },
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
  const duringEvalStatuses = ["INQ", "WIP"];

  const [userHasCheckout, setUserHasCheckout] = useState(false);

  const [lockedFacility, setLockedFacility] = useState(false);

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
      let currentCheckoutStatus = checkout;

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
          currentCheckoutStatus = true;

          // set current facility as locked & render new data onto page
          setLockedFacility(true);
          renderWithNewData(configs, currentConfig, currentCheckoutStatus);
        }
        // if not, obtain it from the database
        else {
          mpApi.getRefreshInfo(configID).then((info) => {
            currentConfig = {
              userId: info.data.userId,
              updateDate: info.data.updateDate,
            };

            // update lock status of current facility & render new data onto page
            setLockedFacility(
              configs.some((plan) => plan.facId === parseInt(info.data.facId))
            );
            renderWithNewData(configs, currentConfig, currentCheckoutStatus);
          });
        }
      });
    }

    // clear open intervals when a different page is loaded
    return () => {
      if (dataLoaded && evalStatusLoaded) {
        console.log("leaving, refreshing, or checking-in/out)...");
        clearOpenRefreshInterval();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checkout, dataLoaded, evalStatusLoaded]);

  const clearOpenRefreshInterval = () => {
    if (openIntervalId) {
      clearInterval(openIntervalId);
      console.log("STOPPED refresh interval with ID: ", openIntervalId);
    }
  };

  const startRefreshTimer = () => {
    if (inWorkspace && evalStatus === "INQ") {
      // if we already have a refresh interval open (this shouldn't happen, but just in case)
      if (openIntervalId) {
        // get rid of it and clear the id state
        clearInterval(openIntervalId);
        setOpenIntervalId(null);
      }

      let currStatus = evalStatus;
      let totalTime = 0; // measured in milliseconds
      const intervalId = setInterval(() => {
        totalTime += delayInSeconds;
        // if status is INQ or WIP:
        if (
          totalTime < config.app.refreshEvalStatusTimeout &&
          duringEvalStatuses.includes(currStatus)
        ) {
          // check database and update status
          mpApi.getRefreshInfo(configID).then((res) => {
            const databaseStatus = res.data.evalStatusCode;

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

      return intervalId;
    }
    return 0;
  };

  const renderWithNewData = (configs, currentConfig, currentCheckoutStatus) => {
    const intervalId = startRefreshTimer();
    if (intervalId !== 0) {
      console.log("STARTED refresh interval with ID: ", intervalId);
    }
    setOpenIntervalId(intervalId);
    setUserHasCheckout(configs.some((plan) => plan.userId === user.id));
    setCheckedOutByUser(isCheckedOutByUser(configs));
    setAuditInformation(createAuditMessage(checkout, currentConfig));
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
    const formattedDate =
      (date.getMonth() > 8
        ? date.getMonth() + 1
        : "0" + (date.getMonth() + 1)) +
      "/" +
      (day > 9 ? day : "0" + day) +
      "/" +
      date.getFullYear();

    return formattedDate;
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
      status === "EVAL"
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
    mpApi.revertOfficialRecord(selectedConfig.id).then((res) => {
      setRevertedState(true);
      setShowRevertModal(false);
      setEvalStatusLoaded(false);
      setDataLoaded(false);
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
      return `Last updated by: ${currentConfig.userId} ${formatDate(
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
        <div className="grid-row clearfix position-relative">
          <div className="grid-col float-left">
            <div>
              <h3 className="display-inline-block">
                {" "}
                {user && (checkoutState || lockedFacility) ? (
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
                <div className="text-bold font-body-xl display-block height-auto">
                  {user && checkoutState && checkedOutByUser ? (
                    <CreateOutlined color="primary" fontSize="large" />
                  ) : (
                    ""
                  )}{" "}
                  {facilityAdditionalName}
                  {user ? (
                    <div className="text-bold font-body-2xs display-inline-block ">
                      {checkedOutByUser === true ? (
                        <Button
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
                        checkedOutConfigs
                          .map((location) => location["monPlanId"])
                          .indexOf(selectedConfig.id) === -1 ? (
                        <Button
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
                    className="margin-left-4"
                    outline={true}
                    title="Coming Soon"
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
                  />
                  <DropdownSelection
                    caption="Sections"
                    selectionHandler={setSectionSelect}
                    options={sections}
                    viewKey="name"
                    selectKey="name"
                    initialSelection={sectionSelect[0]}
                    orisCode={orisCode}
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
                        onChange={(e) =>
                          setInactive([!inactive[0], inactive[1]], facility)
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="grid-col clearfix position-absolute top-1 right-0">
            <div className="">
              {checkoutState && user ? (
                <div>
                  <div className="padding-2 margin-left-10">
                    {evalStatusText(evalStatus) === "Needs Evaluation" ? (
                      <Button
                        type="button"
                        className="margin-right-2 margin-left-4 float-right"
                        outline={false}
                        onClick={evaluate}
                      >
                        Evaluate
                      </Button>
                    ) : (
                      ""
                    )}
                    {showSubmit(evalStatus) ? (
                      <Button
                        type="button"
                        className="margin-right-2 float-right"
                        outline={false}
                        title="Coming Soon"
                      >
                        Submit
                      </Button>
                    ) : (
                      ""
                    )}
                  </div>
                  {showRevert(evalStatus) ? (
                    <div className="margin-right-3 margin-top-2 float-right">
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
              ) : (
                ""
              )}
            </div>
            {user ? (
              <div className="grid-row padding-1 float-right text-right margin-right-3 margin-top-1 mobile:display-none desktop:display-block">
                <table role="presentation">
                  <tbody>
                    <tr>
                      <th className="padding-1">Evaluation Status: </th>
                      <td
                        className={`padding-1 usa-alert usa-alert--no-icon text-center ${evalStatusStyle(
                          evalStatus
                        )}`}
                      >
                        <button
                          className={
                            showHyperLink(evalStatus)
                              ? "hyperlink-btn"
                              : "unstyled-btn"
                          }
                          onClick={() => {
                            showHyperLink(evalStatus)
                              ? setShowEvalReport(true)
                              : setShowEvalReport(false);
                          }}
                        >
                          {evalStatusText(evalStatus)}
                        </button>
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
        </div>
      ) : (
        <Preloader />
      )}
    </div>
  );
};

export default HeaderInfo;
