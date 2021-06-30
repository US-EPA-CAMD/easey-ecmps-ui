import React, { useState, useEffect } from "react";
import HeaderInfo from "../HeaderInfo/HeaderInfo";
import "../MonitoringPlanTab/MonitoringPlanTab.scss";
import DataTableMethod from "../datatablesContainer/DataTableMethod/DataTableMethod";
import DataTableMats from "../datatablesContainer/DataTableMats/DataTableMats";
import DataTableSystems from "../datatablesContainer/DataTableSystems/DataTableSystems";
import InactivityTracker from "../InactivityTracker/InactivityTracker";
import * as mpApi from "../../utils/api/monitoringPlansApi";
import "./MonitoringPlanTabRender.scss";
import CustomAccordion from "../CustomAccordion/CustomAccordion";

export const MonitoringPlanTabRender = ({
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
}) => {
  const [matsTableFlag, setMatsTableFlag] = useState(false);
  // // MONITORING METHODS
  const matsTableHandler = (flag) => {
    setMatsTableFlag(flag);
  };
  const settingInactiveCheckBox = (check, disable) => {
    setInactive([check, disable], title);
  };
  // checks mats table
  useEffect(() => {
    if (matsTableFlag) {
      setTableState(
        tableState.map((element, index) =>
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
                  />,
                  "Methods",
                ],
                [
                  <DataTableMats
                    locationSelect={locationSelect[1]}
                    inactive={inactive}
                    settingInactiveCheckBox={settingInactiveCheckBox}
                  />,
                  "Supplemental Methods",
                ],
              ]
            : element
        )
      );
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [matsTableFlag, inactive[0]]);

  // updates all tables whenever a location is changed
  useEffect(() => {
    setTableState([
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
            locationSelect={parseInt(locationSelect[1])}
            inactive={inactive}
            settingInactiveCheckBox={settingInactiveCheckBox}
          />,
          "Systems",
        ],
      ],
      [],
    ]);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locationSelect, inactive[0]]);

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
          locationSelect={locationSelect[1]}
          inactive={inactive}
          settingInactiveCheckBox={settingInactiveCheckBox}
        />,
        "Systems",
      ],
    ],
    [],
  ]);

  const resetInactivityTimerApiCall = () => {
    console.log(mpApi.putLockTimerUpdateConfiguration(configID), "api called");
  };

  const checkoutAPI = (/*direction*/) => {};
  return (
    <div className=" padding-top-0">
      {user && checkout ? (
        <InactivityTracker apiCall={resetInactivityTimerApiCall} />
      ) : (
        ""
      )}
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
