import React, { useState, useEffect } from "react";
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
  // reduxx store
  sectionSelect,
  locationSelect,
  locations,
  checkout = false,
  inactive,
  ///
  checkoutAPI,
  checkedOutLocations,
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

  useEffect(() => {
    setCheckoutState(checkout);
  }, [checkout]);

  const isCheckedOutByUser = () => {
    return (
      checkedOutLocations
        .map((location) => location["monPlanId"])
        .indexOf(selectedConfig.id) > -1 &&
      checkedOutLocations[
      checkedOutLocations
        .map((location) => location["monPlanId"])
        .indexOf(selectedConfig.id)
      ]["checkedOutBy"] === user["firstName"]
    );
  };

  const isCheckedOut = () => {
    return (
      checkedOutLocations
        .map((location) => location["monPlanId"])
        .indexOf(selectedConfig.id) > -1
    );
  };

  const findCurrentlyCheckedOutByInfo = () => {
    return checkedOutLocations[
      checkedOutLocations
        .map((location) => location["monPlanId"])
        .indexOf(selectedConfig.id)
    ];
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const formattedDate =
      (date.getMonth() > 8
        ? date.getMonth() + 1
        : "0" + (date.getMonth() + 1)) +
      "/" +
      (date.getDate() > 9 ? date.getDate() : "0" + date.getDate()) +
      "/" +
      date.getFullYear();

    return formattedDate;
  };

  const [checkedOutByUser, setCheckedOutByUser] = useState(
    isCheckedOutByUser()
  );
  const [displayLock, setDisplayLock] = useState(isCheckedOut());

  useEffect(() => {
    setCheckoutState(checkout);
  }, [checkout]);

  // direction -> false = check back in
  // true = check out
  const checkoutStateHandler = (direction) => {
    setCheckoutState(direction);
    setCheckedOutByUser(direction);
    setDisplayLock(direction);
    checkoutAPI(direction, configID, selectedConfig.id, setCheckout);
  };
  // const [revertState, setRevertState] = useState(false);
  const closeModalHandler = () => setShow(false);

  const [show, setShow] = useState(false);
  const revert = () => {
    mpApi.revertOfficialRecord(selectedConfig.id).then((res) => {
      setRevertedState(true);
      setShow(false);
    });
  };
  return (
    <div className="header">
      <div className={`usa-overlay ${show ? "is-visible" : ""}`} />
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
              {checkoutState
                ? `Currently checked out by: ${user.firstName
                } ${formatDate(new Date())}`
                : displayLock
                  ? `Last checked out by: ${findCurrentlyCheckedOutByInfo()["checkedOutBy"]
                  } ${formatDate(
                    findCurrentlyCheckedOutByInfo()["checkedOutOn"]
                  )}`
                  : null}
            </div>
          </div>
          <div className="">
            <div className="display-inline-block ">
              <div className="text-bold font-body-xl display-block height-auto">
                {user && (checkoutState || checkedOutByUser) ? (
                  <CreateOutlined color="primary" fontSize="large" />
                ) : (
                  ""
                )}{" "}
                {facilityAdditionalName}
                {user ? (
                  <div className="text-bold font-body-2xs display-inline-block ">
                    {checkoutState || checkedOutByUser === true ? (
                      <Button
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
                    ) : checkedOutLocations
                      .map((location) => location["monPlanId"])
                      .indexOf(selectedConfig.id) === -1 ? (
                      <Button
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
            {checkout ? (
              <div>
                <div className="grid-row padding-2 margin-left-10">
                  <Button type="button" className="margin-right-1 margin-left-4" outline={false}>
                    Evaluate
                  </Button>
                  <Button type="button" className="margin-left-1" outline={false}>
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
          {user? 
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
          </div>:""}
        </div>
      </div>
    </div>
  );
};

export default HeaderInfo;
