import React, { useState, useEffect, useRef } from "react";
import { Button, Checkbox } from "@trussworks/react-uswds";
import { CreateOutlined, LockOpenSharp, LockSharp } from "@material-ui/icons";

import * as mpApi from "../../utils/api/monitoringPlansApi";
import Modal from "../Modal/Modal";
import { DropdownSelection } from "../DropdownSelection/DropdownSelection";
import "./HeaderInfo.scss";
import config from "../../config";
import MonitoringPlanEvaluationReport from "../MonitoringPlanEvaluationReport/MonitoringPlanEvaluationReport";

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

  const isCheckedOut = () => {
    return (
      checkedOutConfigs
        .map((location) => location["monPlanId"])
        .indexOf(selectedConfig.id) > -1
    );
  };

  const [checkoutState, setCheckoutState] = useState(checkout);

  useEffect(() => {
    setCheckoutState(checkout);

    if (!dataLoaded) {
      // obtain checked-out configurations
      mpApi.getCheckedOutLocations().then((res) => {
        // extract checked-out configs from response
        const configs = res.data;
        setCheckedOutConfigs(configs);

        // get current date information
        let currDate = new Date(Date.now());
        currDate.setDate(currDate.getDate() - 1);

        // syncing checkout state with database
        if (findCurrentlyCheckedOutByInfo(configs)) {
          checkout = true;
          setCheckout(true);
        }

        // obtain current config info from last save or checkouts table
        let currentConfig = findCurrentlyCheckedOutByInfo(configs);

        // if config info is blank, then retrieve the info from the database
        if (!currentConfig) {
          // GET selected config info API call
          mpApi.getConfigInfo(selectedConfig.id).then((info) => {
            currentConfig = {
              userId: info.data.userId,
              updateDate: info.data.updateDate,
            };
            // afterwards, set checkedOutByUser and auditInformation states, then update table
            setCheckedOutByUser(isCheckedOutByUser(configs));
            setAuditInformation(createAuditMessage(checkout, currentConfig));
            setDataLoaded(true);
          });
        } else {
          // if we already have config info, set these states and update table right away
          setCheckedOutByUser(isCheckedOutByUser(configs));
          setAuditInformation(createAuditMessage(checkout, currentConfig));
          setDataLoaded(true);
        }
      });
    }
  }, [checkout, dataLoaded]);

  const test = () => {
    setShowEvalReport(true);
  };

  const findCurrentlyCheckedOutByInfo = (configs) => {
    return configs[
      configs.map((config) => config["monPlanId"]).indexOf(selectedConfig.id)
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

  const [displayLock, setDisplayLock] = useState(isCheckedOut());

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
  const evalStatusStyle = () => {
    switch (selectedConfig.evalStatusCode) {
      case "ERR":
      case "EVAL":
        return "usa-alert--warning";
      case "INFO":
      case "PASS":
        return "usa-alert--success";
      case "INQ":
      case "WIP":
        return "usa-alert--info";
    }
    return "";
  };

  // returns evaluation status (full text) from code
  const evalStatusText = () => {
    switch (selectedConfig.evalStatusCode) {
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

  // 508
  //   const activeFocusRef = useRef(null);
  //   useEffect(() => {
  //     if (activeFocusRef.current) {
  //       activeFocusRef.current.focus();
  // }}, [checkout]);

  // direction -> false = check back in
  // true = check out
  const checkoutStateHandler = (direction) => {
    // trigger checkout API
    //    - POST endpoint if direction is TRUE (adding new record to checkouts table)
    //    - DELETE endpoint if direction is FALSE (removing record from checkouts table)
    checkoutAPI(direction, configID, selectedConfig.id, setCheckout).then(
      () => {
        setCheckedOutByUser(direction);
        setDisplayLock(direction);
        setCheckoutState(direction);
        setDataLoaded(false);
      }
    );
  };

  const revert = () => {
    mpApi.revertOfficialRecord(selectedConfig.id).then((res) => {
      setRevertedState(true);
      setShowRevertModal(false);
    });
  };

  // Create audit message for header info
  const createAuditMessage = (checkedOut, currentConfig) => {
    const inWorkspace = user;

    // WORKSPACE view
    if (inWorkspace) {
      // when config is checked out by someone
      if (checkedOut) {
        return `Currently checked-out by: ${currentConfig["checkedOutBy"]
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
        className={`usa-overlay ${showRevertModal || showEvalReport ? "is-visible" : ""
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
          children={
            <MonitoringPlanEvaluationReport />
          }
        />
      ) : null}
      <div className="grid-row clearfix position-relative">
        <div className="grid-col float-left">
          <div>
            <h3 className="display-inline-block">
              {" "}
              {user && (checkoutState || displayLock) ? (
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
                    ) : checkedOutConfigs
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
                      //508
                      // ref={checkout ? activeFocusRef : null}
                      >
                        <CreateOutlined color="primary" /> {"Check Out"}
                      </Button>
                    ) : null}
                  </div>
                ) : (
                  ""
                )}
                <Button type="button" className="margin-left-4" outline={true} title="Coming Soon">
                  View Comments
                </Button>
                {/* <Button type="button" className="margin-left-2" outline={true}>
                  Reports
                </Button> */}
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
            {checkout && user ? (
              <div>
                <div className="padding-2 margin-left-10">
                  {evalStatusText() === "Needs Evaluation" ? (
                    <Button
                      type="button"
                      className="margin-right-2 margin-left-4 float-right"
                      outline={false}
                    >
                      Evaluate
                    </Button>
                  ) : (
                    ""
                  )}
                  {showSubmit(selectedConfig.evalStatusCode) ? (
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
                {showRevert(selectedConfig.evalStatusCode) ? (
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
                      className={`padding-1 usa-alert usa-alert--no-icon text-center ${evalStatusStyle()}`}
                    >
                      <a
                        style={
                          showHyperLink(selectedConfig.evalStatusCode)
                            ? {
                              color: "#005EA2",
                              textDecoration: "underline",
                            }
                            : {
                              color: "black",
                              textDecoration: "none",
                              outline: "none",
                              cursor: "default",
                            }
                        }
                        href={"javascript:void(0);"}
                        onClick={() =>
                          showHyperLink(selectedConfig.evalStatusCode)
                            ? setShowEvalReport(true)
                            : ""
                        }
                      >
                        {evalStatusText()}
                      </a>
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
    </div>
  );
};

export default HeaderInfo;
