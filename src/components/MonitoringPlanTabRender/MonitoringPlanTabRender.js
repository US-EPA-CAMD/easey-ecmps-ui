import React, { useState, useEffect } from "react";
import HeaderInfo from "../HeaderInfo/HeaderInfo";
import "../MonitoringPlanTab/MonitoringPlanTab.scss";
import DataTableMethod from "../datatablesContainer/DataTableMethod/DataTableMethod";
import DataTableMats from "../datatablesContainer/DataTableMats/DataTableMats";
import DataTableSystems from "../datatablesContainer/DataTableSystems/DataTableSystems";
import * as mpApi from "../../utils/api/monitoringPlansApi";
import CustomAccordion from "../CustomAccordion/CustomAccordion";

export const MonitoringPlanTabRender = ({
  resetTimer,
  setExpired,
  resetTimerFlag,
  callApiFlag,

  title,
  user,
  locations,
  selectedConfig,
  setSectionSelect,
  setLocationSelect,
  sectionSelect,
  locationSelect,
  orisCode,
  configID,
  checkout,
  setCheckout,
  setInactive,
  inactive,
  checkedOutLocations,
}) => {
  const [matsTableFlag, setMatsTableFlag] = useState(false);
  // // MONITORING METHODS
  const matsTableHandler = (flag) => {
    setMatsTableFlag(flag);
  };
  const settingInactiveCheckBox = (check, disable) => {
    setInactive([check, disable], title);
  };

  const [revertedState, setRevertedState] = useState(false);
  // checks mats table
  // useEffect(() => {
  //   if (matsTableFlag) {
  //     setTableState(
  //       tableState.map((element, index) =>
  //         index === 3
  //           ? [
  //               [
  //                 <DataTableMethod
  //                   matsTableHandler={matsTableHandler}
  //                   locationSelectValue={parseInt(locationSelect[1])}
  //                   checkout={checkout}
  //                   user={user}
  //                   inactive={inactive}
  //                   settingInactiveCheckBox={settingInactiveCheckBox}
  //                   revertedState={revertedState}
  //                   setRevertedState={setRevertedState}
  //                 />,
  //                 "Methods",
  //               ],
  //               [
  //                 <DataTableMats
  //                   locationSelectValue={locationSelect[1]}
  //                   checkout={checkout}
  //                   user={user}
  //                   inactive={inactive}
  //                   settingInactiveCheckBox={settingInactiveCheckBox}
  //                   revertedState={revertedState}
  //                   setRevertedState={setRevertedState}
  //                 />,
  //                 "Supplemental Methods",
  //               ],
  //             ]
  //           : element
  //       )
  //     );
  //   }

  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [matsTableFlag, inactive[0], checkout, revertedState]);

  useEffect(() => {
    console.log("I Ran!");
    if (resetTimerFlag) {
      resetInactivityTimerApiCall();
      resetTimer(false);
    }
    if (callApiFlag) {
      countdownExpired();
      setExpired(false);
    }
  }, [resetTimerFlag, callApiFlag]);

  // updates all tables whenever a location is changed
  useEffect(() => {
    let tableArr = [
      [],
      [],
      [],
      [
        [
          <DataTableMethod
            matsTableHandler={matsTableHandler}
            locationSelectValue={parseInt(locationSelect[1])}
            checkout={checkout}
            user={user}
            inactive={inactive}
            settingInactiveCheckBox={settingInactiveCheckBox}
            revertedState={revertedState}
            setRevertedState={setRevertedState}
          />,
          "Methods",
        ],
      ],
      [],
      [],
      [],
      [],
      [],
      [
        [
          <DataTableSystems
            locationSelectValue={parseInt(locationSelect[1])}
            inactive={inactive}
            settingInactiveCheckBox={settingInactiveCheckBox}
            checkout={checkout}
            user={user}
            revertedState={revertedState}
            setRevertedState={setRevertedState}
          />,
          "Systems",
        ],
      ],
      [],
    ];

    if (matsTableFlag) {
      tableArr = tableState.map((element, index) =>
        index === 3
          ? [
              [
                <DataTableMethod
                  matsTableHandler={matsTableHandler}
                  locationSelectValue={parseInt(locationSelect[1])}
                  checkout={checkout}
                  user={user}
                  inactive={inactive}
                  settingInactiveCheckBox={settingInactiveCheckBox}
                  revertedState={revertedState}
                  setRevertedState={setRevertedState}
                />,
                "Methods",
              ],
              [
                <DataTableMats
                  locationSelectValue={locationSelect[1]}
                  checkout={checkout}
                  user={user}
                  inactive={inactive}
                  settingInactiveCheckBox={settingInactiveCheckBox}
                  revertedState={revertedState}
                  setRevertedState={setRevertedState}
                />,
                "Supplemental Methods",
              ],
            ]
          : element
      );
    }
    setTableState(tableArr);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locationSelect, inactive[0], checkout, matsTableFlag, revertedState]);

  // sets initial state
  const [tableState, setTableState] = useState([
    [],
    [],
    [],
    [
      [
        <DataTableMethod
          matsTableHandler={matsTableHandler}
          locationSelectValue={parseInt(locationSelect[1])}
          checkout={checkout}
          user={user}
          inactive={inactive}
          settingInactiveCheckBox={settingInactiveCheckBox}
          revertedState={revertedState}
          setRevertedState={setRevertedState}
        />,
        "Methods",
      ],
    ],
    [],
    [],
    [],
    [],
    [],
    [
      [
        <DataTableSystems
          locationSelectValue={locationSelect[1]}
          inactive={inactive}
          settingInactiveCheckBox={settingInactiveCheckBox}
          revertedState={revertedState}
          // setRevertedState={setRevertedState}
          checkout={checkout}
          user={user}
        />,
        "Systems",
      ],
    ],
    [],
  ]);

  // not tested ***
  const resetInactivityTimerApiCall = () => {
    console.log(mpApi.putLockTimerUpdateConfiguration(configID), "api called");
  };
  const countdownExpired = () => {
    console.log("times up");
    // calls check in api
    checkoutAPI(false);
    // sets the state of checked in config  in redux
    setCheckout(false, configID);
  };
  // ***
  //false => check back in
  // true => check out
  const checkoutAPI = (direction) => {
    if (!direction) {
      mpApi
        .deleteCheckInMonitoringPlanConfiguration(selectedConfig.id)
        .then((res) => {
          console.log(res, "checked back in ");
          setCheckout(false, configID);
          if (res === undefined) {
            console.log("error");
          }
        });
    } else {
      mpApi
        .postCheckoutMonitoringPlanConfiguration(
          selectedConfig.id,
          user.firstName
        )
        .then((res) => {
          setCheckout(true, configID);
          if (res === undefined) {
            console.log("this configuration is already checked out ");
          }
        });
    }
  };

  return (
    <div className=" padding-top-0">
      <input
        tabIndex={-1}
        aria-hidden={true}
        role="button"
        type="hidden"
        id="testingBtn"
        onClick={() => {
          countdownExpired();
          resetInactivityTimerApiCall();
          checkoutAPI(true);
        }}
      />

      {/*user && checkout ? (
        <InactivityTracker
          apiCall={resetInactivityTimerApiCall}
          countdownExpired={countdownExpired}
        />
      ) : null*/}

      {/* on change of select box, it should modify the accordion items */}
      {/* pass back the values to send to the datatable, current is sending back index  */}
      <div className="grid-row">
        <HeaderInfo
          facility={title}
          selectedConfig={selectedConfig}
          orisCode={orisCode}
          sectionSelect={sectionSelect}
          setSectionSelect={setSectionSelect}
          setLocationSelect={setLocationSelect}
          locationSelect={locationSelect}
          locations={locations}
          checkout={checkout}
          user={user}
          checkoutAPI={checkoutAPI}
          setCheckout={setCheckout}
          setInactive={setInactive}
          inactive={inactive}
          checkedOutLocations={checkedOutLocations}
          setRevertedState={setRevertedState}
        />
      </div>
      <hr />
      <div className="grid-row">
        <CustomAccordion
          title={sectionSelect[1]}
          table={tableState[sectionSelect[0]]}
        />
      </div>
    </div>
  );
};

export default MonitoringPlanTabRender;
