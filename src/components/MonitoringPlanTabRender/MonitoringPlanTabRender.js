import React, { useState, useEffect } from "react";
import HeaderInfo from "../HeaderInfo/HeaderInfo";
import "../MonitoringPlanTab/MonitoringPlanTab.scss";
import DataTableMethod from "../datatablesContainer/DataTableMethod/DataTableMethod";
import DataTableMats from "../datatablesContainer/DataTableMats/DataTableMats";
import DataTableSystems from "../datatablesContainer/DataTableSystems/DataTableSystems";
import CustomAccordion from "../CustomAccordion/CustomAccordion";
import { checkoutAPI } from "../../additional-functions/checkout";
import DataTableQualifications from "../datatablesContainer/DataTableQualifications/DataTableQualifications";

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
  locationAttributesDataTableProps,
  relationshipDataTableProps,
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
            radioNames={["secondNormalIndicator"]}
            dataTableName={"Load"}
            revertedState={revertedState}
            setRevertedState={setRevertedState}
          />,
          "Loads",
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
              locationAttributesDataTableProps(parseInt(locationSelect[1]))[
                "payload"
              ]
            }
            dropdownArray={
              locationAttributesDataTableProps(parseInt(locationSelect[1]))[
                "dropdownArray"
              ]
            }
            columnNames={
              locationAttributesDataTableProps(parseInt(locationSelect[1]))[
                "columnNames"
              ]
            }
            controlInputs={
              locationAttributesDataTableProps(parseInt(locationSelect[1]))[
                "controlInputs"
              ]
            }
            controlDatePickerInputs={
              locationAttributesDataTableProps(parseInt(locationSelect[1]))[
                "controlDatePickerInputs"
              ]
            }
            radioNames={["ductIndicator", "bypassIndicator"]}
            dataTableName={"Location Attribute"}
            revertedState={revertedState}
            setRevertedState={setRevertedState}
          />,
          "Location Attributes",
        ],
        [
          <DataTableAssert
            locationSelectValue={parseInt(locationSelect[1])}
            inactive={inactive}
            settingInactiveCheckBox={settingInactiveCheckBox}
            checkout={checkout}
            user={user}
            payload={
              relationshipDataTableProps(parseInt(locationSelect[1]))["payload"]
            }
            dropdownArray={
              relationshipDataTableProps(parseInt(locationSelect[1]))[
                "dropdownArray"
              ]
            }
            columnNames={
              relationshipDataTableProps(parseInt(locationSelect[1]))[
                "columnNames"
              ]
            }
            controlInputs={
              relationshipDataTableProps(parseInt(locationSelect[1]))[
                "controlInputs"
              ]
            }
            controlDatePickerInputs={
              relationshipDataTableProps(parseInt(locationSelect[1]))[
                "controlDatePickerInputs"
              ]
            }
            radioNames={[]}
            dataTableName={"Relationship Data"}
            revertedState={revertedState}
            nonEditable={true}
            setRevertedState={setRevertedState}
          />,
          "Relationships Data",
        ],
      ], // location attributes
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
      [
        [
          <DataTableQualifications
            locationSelectValue={parseInt(locationSelect[1])}
            inactive={inactive}
            settingInactiveCheckBox={settingInactiveCheckBox}
            checkout={checkout}
            user={user}
            revertedState={revertedState}
            setRevertedState={setRevertedState}
          />,
          "Qualifications",
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
            payload={spanDataTableProps(parseInt(locationSelect[1]))["payload"]}
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
              unitFuelDataTableProps(
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
            radioNames={["ozoneSeasonIndicator"]}
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
              unitControlDataTableProps(
                parseInt(locationSelect[1]),
                locations.find((element) => element.id === locationSelect[1])
              )["payload"]
            }
            dropdownArray={
              unitControlDataTableProps(
                parseInt(locationSelect[1]),
                locations.find((element) => element.id === locationSelect[1])
              )["dropdownArray"]
            }
            columnNames={
              unitControlDataTableProps(
                parseInt(locationSelect[1]),
                locations.find((element) => element.id === locationSelect[1])
              )["columnNames"]
            }
            controlInputs={
              unitControlDataTableProps(
                parseInt(locationSelect[1]),
                locations.find((element) => element.id === locationSelect[1])
              )["controlInputs"]
            }
            controlDatePickerInputs={
              unitControlDataTableProps(
                parseInt(locationSelect[1]),
                locations.find((element) => element.id === locationSelect[1])
              )["controlDatePickerInputs"]
            }
            urlParameters={
              unitControlDataTableProps(
                parseInt(locationSelect[1]),
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
                parseInt(locationSelect[1]),
                locations.find((element) => element.id === locationSelect[1])
              )["payload"]
            }
            dropdownArray={
              unitCapacityDataTableProps(
                parseInt(locationSelect[1]),
                locations.find((element) => element.id === locationSelect[1])
              )["dropdownArray"]
            }
            columnNames={
              unitCapacityDataTableProps(
                parseInt(locationSelect[1]),
                locations.find((element) => element.id === locationSelect[1])
              )["columnNames"]
            }
            controlInputs={
              unitCapacityDataTableProps(
                parseInt(locationSelect[1]),
                locations.find((element) => element.id === locationSelect[1])
              )["controlInputs"]
            }
            controlDatePickerInputs={
              unitCapacityDataTableProps(
                parseInt(locationSelect[1]),
                locations.find((element) => element.id === locationSelect[1])
              )["controlDatePickerInputs"]
            }
            urlParameters={
              unitCapacityDataTableProps(
                parseInt(locationSelect[1]),
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
          "Unit Capacities",
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
  // const resetInactivityTimerApiCall = () => {
  //   console.log(mpApi.putLockTimerUpdateConfiguration(configID), "api called");
  // };

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
          // checkedOutLocations={checkedOutLocations}
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
