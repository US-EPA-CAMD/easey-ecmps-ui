import React, { useState, useEffect } from "react";
import HeaderInfo from "../HeaderInfo/HeaderInfo";
import "../MonitoringPlanTab/MonitoringPlanTab.scss";
import DataTableMethod from "../datatablesContainer/DataTableMethod/DataTableMethod";
import DataTableMats from "../datatablesContainer/DataTableMats/DataTableMats";
import DataTableSystems from "../datatablesContainer/DataTableSystems/DataTableSystems";
import * as mpApi from "../../utils/api/monitoringPlansApi";
import CustomAccordion from "../CustomAccordion/CustomAccordion";
import { checkoutAPI } from "../../additional-functions/checkout";
import DataTableSpans from "../datatablesContainer/DataTableSpans/DataTableSpans";
import DataTableLoads from "../datatablesContainer/DataTableLoads/DataTableLoads";
import DataTableDefaults from "../datatablesContainer/DataTableDefaults/DataTableDefaults";
import DataTableFormulas from "../datatablesContainer/DataTableFormulas/DataTableFormulas";
import DataTableRectangularDucts from "../datatablesContainer/DataTableRectangularDucts/DataTableRectangularDucts";

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

  /*
  useEffect(() => {
    if (resetTimerFlag) {
      console.log("Extending");
      resetInactivityTimerApiCall();
      resetTimer(false);
    }
    if (callApiFlag) {
      console.log("EXPIRED");
      countdownExpired();
      setExpired(false);
    }
  }, [resetTimerFlag, callApiFlag]);
  */

  // updates all tables whenever a location is changed
  useEffect(() => {
    let tableArr = [
      [
        [
          <DataTableDefaults
            locationSelectValue={parseInt(locationSelect[1])}
            inactive={inactive}
            settingInactiveCheckBox={settingInactiveCheckBox}
            checkout={checkout}
            user={user}
            revertedState={revertedState}
            setRevertedState={setRevertedState}
          />,
          "Defaults",
        ],
      ],
      [
        [
          <DataTableFormulas
            locationSelectValue={parseInt(locationSelect[1])}
            inactive={inactive}
            settingInactiveCheckBox={settingInactiveCheckBox}
            checkout={checkout}
            user={user}
            revertedState={revertedState}
            setRevertedState={setRevertedState}
          />,
          "Formulas",
        ],
      ],
      [
        [
          <DataTableLoads
            locationSelectValue={parseInt(locationSelect[1])}
            inactive={inactive}
            settingInactiveCheckBox={settingInactiveCheckBox}
            checkout={checkout}
            user={user}
            revertedState={revertedState}
            setRevertedState={setRevertedState}
          />,
          "Loads",
        ],
      ],
      [], // location attributes
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
      [], // qualifications
      [
        [
          <DataTableRectangularDucts
            locationSelectValue={parseInt(locationSelect[1])}
            inactive={inactive}
            settingInactiveCheckBox={settingInactiveCheckBox}
            checkout={checkout}
            user={user}
            revertedState={revertedState}
            setRevertedState={setRevertedState}
          />,
          "WAFs Rectangular Duct",
        ],
      ], // rectangular duct

      [
        [
          <DataTableSpans
            locationSelectValue={parseInt(locationSelect[1])}
            inactive={inactive}
            settingInactiveCheckBox={settingInactiveCheckBox}
            checkout={checkout}
            user={user}
            revertedState={revertedState}
            setRevertedState={setRevertedState}
          />,
          "Spans",
        ],
      ],

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
          "Unit Fuel Data",
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
          "Unit Control Data",
        ],
      ], // unit info
    ];

    if (matsTableFlag) {
      tableArr = tableState.map((element, index) =>
        index === 4
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
    [
      [
        <DataTableDefaults
          locationSelectValue={parseInt(locationSelect[1])}
          inactive={inactive}
          settingInactiveCheckBox={settingInactiveCheckBox}
          checkout={checkout}
          user={user}
          revertedState={revertedState}
          setRevertedState={setRevertedState}
        />,
        "Defaults",
      ],
    ],
    [
      [
        <DataTableFormulas
          locationSelectValue={parseInt(locationSelect[1])}
          inactive={inactive}
          settingInactiveCheckBox={settingInactiveCheckBox}
          checkout={checkout}
          user={user}
          revertedState={revertedState}
          setRevertedState={setRevertedState}
        />,
        "Formulas",
      ],
    ],
    [
      [
        <DataTableLoads
          locationSelectValue={parseInt(locationSelect[1])}
          inactive={inactive}
          settingInactiveCheckBox={settingInactiveCheckBox}
          checkout={checkout}
          user={user}
          revertedState={revertedState}
          setRevertedState={setRevertedState}
        />,
        "Loads",
      ],
    ],
    [], // location attributes
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
    [], // qualifications
    [], // rectangular duct

    [
      [
        <DataTableSpans
          locationSelectValue={parseInt(locationSelect[1])}
          inactive={inactive}
          settingInactiveCheckBox={settingInactiveCheckBox}
          checkout={checkout}
          user={user}
          revertedState={revertedState}
          setRevertedState={setRevertedState}
        />,
        "Spans",
      ],
    ],

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
        "Unit Fuel Data",
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
        "Unit Control Data",
      ],
    ], // unit info
  ]);

  // not tested ***
  const resetInactivityTimerApiCall = () => {
    console.log(mpApi.putLockTimerUpdateConfiguration(configID), "api called");
  };

  // ***

  //false => check back in
  // true => check out

  return (
    <div className=" padding-top-0">
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
          configID={configID}
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
