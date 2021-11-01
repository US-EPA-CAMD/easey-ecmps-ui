import React, { useState, useEffect } from "react";
import HeaderInfo from "../HeaderInfo/HeaderInfo";
import "../MonitoringPlanTab/MonitoringPlanTab.scss";
import DataTableMethod from "../datatablesContainer/DataTableMethod/DataTableMethod";
import DataTableMats from "../datatablesContainer/DataTableMats/DataTableMats";
import DataTableSystems from "../datatablesContainer/DataTableSystems/DataTableSystems";
import * as mpApi from "../../utils/api/monitoringPlansApi";
import CustomAccordion from "../CustomAccordion/CustomAccordion";
import { checkoutAPI } from "../../additional-functions/checkout";

import DataTableDefaults from "../datatablesContainer/DataTableDefaults/DataTableDefaults";
import DataTableFuelData from "../datatablesContainer/DataTableFuelData/DataTableFuelData";
import DataTableUnitControl from "../datatablesContainer/DataTableUnitControl/DataTableUnitControl";
import DataTableAssert from "../datatablesContainer/DataTableAssert/DataTableAssert";
import {
  spanDataTableProps,
  formulasDataTableProps,
  defaultsDataTableProps,
  loadsDataTableProps,
  rectWAFsDataTableProps,
  unitControlDataTableProps,
  unitFuelDataTableProps,
  unitCapacityDataTableProps,
} from "../../additional-functions/dataTable-props";

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

  // updates all tables whenever a location is changed
  useEffect(() => {
    let tableArr = [
      [
        [
          <DataTableAssert
            locationSelectValue={parseInt(locationSelect[1])}
            inactive={inactive}
            settingInactiveCheckBox={settingInactiveCheckBox}
            checkout={checkout}
            user={user}
            payload={
              defaultsDataTableProps(parseInt(locationSelect[1]))["payload"]
            }
            dropdownArray={
              defaultsDataTableProps(parseInt(locationSelect[1]))[
                "dropdownArray"
              ]
            }
            columnNames={
              defaultsDataTableProps(parseInt(locationSelect[1]))["columnNames"]
            }
            controlInputs={
              defaultsDataTableProps(parseInt(locationSelect[1]))[
                "controlInputs"
              ]
            }
            controlDatePickerInputs={
              defaultsDataTableProps(parseInt(locationSelect[1]))[
                "controlDatePickerInputs"
              ]
            }
            dataTableName={"Default"}
            revertedState={revertedState}
            setRevertedState={setRevertedState}
          />,
          "Defaults",
        ],
      ],
      [
        [
          <DataTableAssert
            locationSelectValue={parseInt(locationSelect[1])}
            inactive={inactive}
            settingInactiveCheckBox={settingInactiveCheckBox}
            checkout={checkout}
            user={user}
            payload={
              formulasDataTableProps(parseInt(locationSelect[1]))["payload"]
            }
            dropdownArray={
              formulasDataTableProps(parseInt(locationSelect[1]))[
                "dropdownArray"
              ]
            }
            columnNames={
              formulasDataTableProps(parseInt(locationSelect[1]))["columnNames"]
            }
            controlInputs={
              formulasDataTableProps(parseInt(locationSelect[1]))[
                "controlInputs"
              ]
            }
            controlDatePickerInputs={
              formulasDataTableProps(parseInt(locationSelect[1]))[
                "controlDatePickerInputs"
              ]
            }
            dataTableName={"Formula"}
            revertedState={revertedState}
            setRevertedState={setRevertedState}
          />,
          "Formulas",
        ],
      ],
      [
        [
          <DataTableAssert
            locationSelectValue={parseInt(locationSelect[1])}
            inactive={inactive}
            settingInactiveCheckBox={settingInactiveCheckBox}
            checkout={checkout}
            user={user}
            payload={
              loadsDataTableProps(parseInt(locationSelect[1]))["payload"]
            }
            dropdownArray={
              loadsDataTableProps(parseInt(locationSelect[1]))["dropdownArray"]
            }
            columnNames={
              loadsDataTableProps(parseInt(locationSelect[1]))["columnNames"]
            }
            controlInputs={
              loadsDataTableProps(parseInt(locationSelect[1]))["controlInputs"]
            }
            controlDatePickerInputs={
              loadsDataTableProps(parseInt(locationSelect[1]))[
                "controlDatePickerInputs"
              ]
            }
            radioName="secondNormalIndicator"
            dataTableName={"Load"}
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
          <DataTableAssert
            locationSelectValue={parseInt(locationSelect[1])}
            inactive={inactive}
            settingInactiveCheckBox={settingInactiveCheckBox}
            checkout={checkout}
            user={user}
            payload={
              rectWAFsDataTableProps(parseInt(locationSelect[1]))["payload"]
            }
            dropdownArray={
              rectWAFsDataTableProps(parseInt(locationSelect[1]))[
                "dropdownArray"
              ]
            }
            columnNames={
              rectWAFsDataTableProps(parseInt(locationSelect[1]))["columnNames"]
            }
            controlInputs={
              rectWAFsDataTableProps(parseInt(locationSelect[1]))[
                "controlInputs"
              ]
            }
            controlDatePickerInputs={
              rectWAFsDataTableProps(parseInt(locationSelect[1]))[
                "controlDatePickerInputs"
              ]
            }
            dataTableName={"Rectangular Duct WAF"}
            revertedState={revertedState}
            setRevertedState={setRevertedState}
          />,

          "WAFs Rectangular Duct",
        ],
      ], // rectangular duct

      [
        [
          <DataTableAssert
            locationSelectValue={parseInt(locationSelect[1])}
            inactive={inactive}
            settingInactiveCheckBox={settingInactiveCheckBox}
            checkout={checkout}
            user={user}
            payload={
              rectWAFsDataTableProps(parseInt(locationSelect[1]))["payload"]
            }
            dropdownArray={
              spanDataTableProps(parseInt(locationSelect[1]))["dropdownArray"]
            }
            columnNames={
              spanDataTableProps(parseInt(locationSelect[1]))["columnNames"]
            }
            controlInputs={
              spanDataTableProps(parseInt(locationSelect[1]))["controlInputs"]
            }
            controlDatePickerInputs={
              spanDataTableProps(parseInt(locationSelect[1]))[
                "controlDatePickerInputs"
              ]
            }
            dataTableName={"Span"}
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
          <DataTableAssert
            locationSelectValue={parseInt(locationSelect[1])}
            selectedLocation={locations.find(
              (element) => element.id === locationSelect[1]
            )}
            payload={
              rectWAFsDataTableProps(
                locations.find((element) => element.id === locationSelect[1])
              )["payload"]
            }
            dropdownArray={
              unitFuelDataTableProps(
                locations.find((element) => element.id === locationSelect[1])
              )["dropdownArray"]
            }
            columnNames={
              unitFuelDataTableProps(
                locations.find((element) => element.id === locationSelect[1])
              )["columnNames"]
            }
            controlInputs={
              unitFuelDataTableProps(
                locations.find((element) => element.id === locationSelect[1])
              )["controlInputs"]
            }
            controlDatePickerInputs={
              unitFuelDataTableProps(
                locations.find((element) => element.id === locationSelect[1])
              )["controlDatePickerInputs"]
            }
            urlParameters={
              unitFuelDataTableProps(
                locations.find((element) => element.id === locationSelect[1])
              )["urlParameters"]
            }
            dataTableName={"Unit Fuel"}
            radioName={["ozoneSeasonIndicator"]}
            checkout={checkout}
            user={user}
            inactive={inactive}
            settingInactiveCheckBox={settingInactiveCheckBox}
            revertedState={revertedState}
            setRevertedState={setRevertedState}
          />,
          "Unit Fuels",
        ],
        [
          <DataTableAssert
            locationSelectValue={parseInt(locationSelect[1])}
            selectedLocation={locations.find(
              (element) => element.id === locationSelect[1]
            )}
            payload={
              rectWAFsDataTableProps(parseInt(locationSelect[1]),
                locations.find((element) => element.id === locationSelect[1])
              )["payload"]
            }
            dropdownArray={
              unitControlDataTableProps(parseInt(locationSelect[1]),
                locations.find((element) => element.id === locationSelect[1])
              )["dropdownArray"]
            }
            columnNames={
              unitControlDataTableProps(parseInt(locationSelect[1]),
                locations.find((element) => element.id === locationSelect[1])
              )["columnNames"]
            }
            controlInputs={
              unitControlDataTableProps(parseInt(locationSelect[1]),
                locations.find((element) => element.id === locationSelect[1])
              )["controlInputs"]
            }
            controlDatePickerInputs={
              unitControlDataTableProps(parseInt(locationSelect[1]),
                locations.find((element) => element.id === locationSelect[1])
              )["controlDatePickerInputs"]
            }
            urlParameters={
              unitControlDataTableProps(parseInt(locationSelect[1]),
                locations.find((element) => element.id === locationSelect[1])
              )["urlParameters"]
            }
            radios={["originalCode", "seasonalControlsIndicator"]}
            dataTableName={"Unit Control"}
            checkout={checkout}
            user={user}
            inactive={inactive}
            settingInactiveCheckBox={settingInactiveCheckBox}
            revertedState={revertedState}
            setRevertedState={setRevertedState}
          />,
          "Unit Controls",
        ],
        [
          <DataTableAssert
            locationSelectValue={parseInt(locationSelect[1])}
            selectedLocation={locations.find(
              (element) => element.id === locationSelect[1]
            )}
            payload={
              unitCapacityDataTableProps(
                locations.find((element) => element.id === locationSelect[1])
              )["payload"]
            }
            dropdownArray={
              unitCapacityDataTableProps(
                locations.find((element) => element.id === locationSelect[1])
              )["dropdownArray"]
            }
            columnNames={
              unitCapacityDataTableProps(
                locations.find((element) => element.id === locationSelect[1])
              )["columnNames"]
            }
            controlInputs={
              unitCapacityDataTableProps(
                locations.find((element) => element.id === locationSelect[1])
              )["controlInputs"]
            }
            controlDatePickerInputs={
              unitCapacityDataTableProps(
                locations.find((element) => element.id === locationSelect[1])
              )["controlDatePickerInputs"]
            }
            urlParameters={
              unitCapacityDataTableProps(
                locations.find((element) => element.id === locationSelect[1])
              )["urlParameters"]
            }
            dataTableName={"Unit Capacity"}
            checkout={checkout}
            user={user}
            inactive={inactive}
            settingInactiveCheckBox={settingInactiveCheckBox}
            revertedState={revertedState}
            setRevertedState={setRevertedState}
          />,
          "Unit Fuels",
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
  }, [locationSelect[1], inactive[0], checkout, matsTableFlag, revertedState]);

  // sets initial state
  // only need to initial methods since it is the default, everything else will update with above usestate
  const [tableState, setTableState] = useState([
    [],
    [],
    [],
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

    [],

    [],
    [], // unit info
  ]);

  // not tested ***
  const resetInactivityTimerApiCall = () => {
    console.log(mpApi.putLockTimerUpdateConfiguration(configID), "api called");
  };

  return (
    <div className=" padding-top-0">
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
