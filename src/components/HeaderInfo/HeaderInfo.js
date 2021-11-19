import React, { useState, useEffect, useRef } from "react";
import { Button, Checkbox } from "@trussworks/react-uswds";
import { CreateOutlined, LockOpenSharp, LockSharp } from "@material-ui/icons";

import * as mpApi from "../../utils/api/monitoringPlansApi";
import Modal from "../Modal/Modal";
import { DropdownSelection } from "../DropdownSelection/DropdownSelection";
import "./HeaderInfo.scss";

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
  // checkedOutConfigs,
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
  const [checkoutState, setCheckoutState] = useState(checkout);
  const [checkedOutConfigs, setCheckedOutConfigs] = useState([]);
  const [auditInformation, setAuditInformation] = useState("");
  const [dataLoaded, setDataLoaded] = useState(false);

  const [checkedOutByUser, setCheckedOutByUser] = useState(false);

  useEffect(() => {
    setCheckoutState(checkout);
    // checkoutStateHandler(checkout);

    if (!dataLoaded) {
      // console.log("loading checked out locations...");
      mpApi.getCheckedOutLocations().then((res) => {
        const configs = res.data;
        // console.log("configs: ", configs);
        setCheckedOutConfigs(configs);
        const currentConfig = findCurrentlyCheckedOutByInfo(configs);
        setCheckedOutByUser(isCheckedOutByUser(configs));
        setAuditInformation(createAuditMessage(checkout, currentConfig));
        setDataLoaded(true);
        // console.log("end of getCheckedOutLocations");
      });
    }
  }, [checkout, dataLoaded]);

  const findCurrentlyCheckedOutByInfo = (configs) => {
    return configs[
      configs.map((config) => config["monPlanId"]).indexOf(selectedConfig.id)
    ];
  };

  const isCheckedOutByUser = (test) => {
    return (
      test.map((location) => location["monPlanId"]).indexOf(selectedConfig.id) >
        -1 &&
      test[
        test.map((location) => location["monPlanId"]).indexOf(selectedConfig.id)
      ]["checkedOutBy"] === user["userId"]
    );
  };

  const isCheckedOut = () => {
    return (
      checkedOutConfigs
        .map((location) => location["monPlanId"])
        .indexOf(selectedConfig.id) > -1
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

  const checkoutStateHandler = (direction) => {
    // console.log(
    //   "checkoutStateHandler is passing this to its functions: ",
    //   direction
    // );

    checkoutAPI(direction, configID, selectedConfig.id, setCheckout).then(
      () => {
        setCheckedOutByUser(direction);
        setDisplayLock(direction);
        setCheckoutState(direction);
        setDataLoaded(false);
      }
    );

    // console.log("end of checkoutStateHandler");
  };

  const closeModalHandler = () => setShow(false);

  const [show, setShow] = useState(false);
  const revert = () => {
    mpApi.revertOfficialRecord(selectedConfig.id).then((res) => {
      setRevertedState(true);
      setShow(false);
    });
  };

  // Create audit message for header info
  const createAuditMessage = (checkedOut, currentConfig) => {
    const inWorkspace = user;

    // WORKSPACE view
    if (inWorkspace) {
      // when config is checked out by someone
      if (checkedOut) {
        return `Currently checked-out by: ${
          currentConfig["checkedOutBy"]
        } ${formatDate(currentConfig["checkedOutOn"])}`;
      }
      // when config is not checked out
      return `Last updated by: ${selectedConfig.userId} ${formatDate(
        selectedConfig.updateDate
          ? selectedConfig.updateDate
          : selectedConfig.addDate,
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
      <div className={`usa-overlay ${show ? "is-visible" : ""} `} />
      {show ? (
        <Modal
          show={show}
          close={closeModalHandler}
          // showCancel={true}
          showSave={true}
          exitBTN={"Yes"}
          save={revert}
          // title={
          //   "test title"
          // }
          // createNew={createNewMethod ? "Create Method" : `Save and Close`}
          children={
            <div>
              {
                "Reverting to Official Record will undo all saved and unsaved changes. This is not recoverable. Do you want to continue?"
              }
            </div>
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
                <Button type="button" className="margin-left-4" outline={true}>
                  View Comments
                </Button>
                <Button type="button" className="margin-left-2" outline={true}>
                  Reports
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
          <div className="grid-row">
            {checkout && user ? (
              <div>
                <div className="grid-row padding-2 margin-left-10">
                  <Button
                    type="button"
                    className="margin-right-1 margin-left-4"
                    outline={false}
                  >
                    Evaluate
                  </Button>
                  <Button
                    type="button"
                    className="margin-left-1"
                    outline={false}
                  >
                    Submit
                  </Button>
                </div>
                <div className="grid-row margin-left-10">
                  <Button
                    type="button"
                    id="showRevertModal"
                    className="margin-left-4"
                    onClick={() => setShow(true)}
                    outline={true}
                  >
                    {"Revert to Official Record"}
                  </Button>
                </div>
              </div>
            ) : (
              ""
            )}
          </div>
          {user ? (
            <div className="grid-row padding-1 float-right text-right margin-right-3">
              <table role="presentation">
                <tbody>
                  <tr>
                    <th className="padding-1">Evaluation Status: </th>
                    <td className="padding-1">Passed with no errors</td>
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
