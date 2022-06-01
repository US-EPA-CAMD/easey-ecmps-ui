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
import { MONITORING_PLAN_STORE_NAME } from "../../additional-functions/workspace-section-and-store-names";
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
  const settingInactiveCheckBox = (check, disable) => {
    setInactive([check, disable], title, MONITORING_PLAN_STORE_NAME);
  };

  const [updateRelatedTables, setUpdateRelatedTables] = useState(false);

  const [revertedState, setRevertedState] = useState(false);

  // updates all tables whenever a location is changed
  useEffect(
    () => {
      const tableArr = [
        [
          [
            <DataTableAssert
              locationSelectValue={locationSelect[1]}
              inactive={inactive}
              settingInactiveCheckBox={settingInactiveCheckBox}
              checkout={checkout}
              user={user}
              payload={defaultsDataTableProps(locationSelect[1])["payload"]}
              dropdownArray={
                defaultsDataTableProps(locationSelect[1])["dropdownArray"]
              }
              columnNames={
                defaultsDataTableProps(locationSelect[1])["columnNames"]
              }
              controlInputs={
                defaultsDataTableProps(locationSelect[1])["controlInputs"]
              }
              controlDatePickerInputs={
                defaultsDataTableProps(locationSelect[1])[
                  "controlDatePickerInputs"
                ]
              }
              dataTableName={"Default"}
              revertedState={revertedState}
              setRevertedState={setRevertedState}
              setUpdateRelatedTables={setUpdateRelatedTables}
              updateRelatedTables={updateRelatedTables}
            />,
            "Defaults",
          ],
        ],
        [
          [
            <DataTableAssert
              locationSelectValue={locationSelect[1]}
              inactive={inactive}
              settingInactiveCheckBox={settingInactiveCheckBox}
              checkout={checkout}
              user={user}
              payload={formulasDataTableProps(locationSelect[1])["payload"]}
              dropdownArray={
                formulasDataTableProps(locationSelect[1])["dropdownArray"]
              }
              columnNames={
                formulasDataTableProps(locationSelect[1])["columnNames"]
              }
              controlInputs={
                formulasDataTableProps(locationSelect[1])["controlInputs"]
              }
              controlDatePickerInputs={
                formulasDataTableProps(locationSelect[1])[
                  "controlDatePickerInputs"
                ]
              }
              dataTableName={"Formula"}
              revertedState={revertedState}
              setRevertedState={setRevertedState}
              setUpdateRelatedTables={setUpdateRelatedTables}
              updateRelatedTables={updateRelatedTables}
            />,
            "Formulas",
          ],
        ],
        [
          [
            <DataTableAssert
              locationSelectValue={locationSelect[1]}
              inactive={inactive}
              settingInactiveCheckBox={settingInactiveCheckBox}
              checkout={checkout}
              user={user}
              payload={loadsDataTableProps(locationSelect[1])["payload"]}
              dropdownArray={
                loadsDataTableProps(locationSelect[1])["dropdownArray"]
              }
              columnNames={
                loadsDataTableProps(locationSelect[1])["columnNames"]
              }
              controlInputs={
                loadsDataTableProps(locationSelect[1])["controlInputs"]
              }
              controlDatePickerInputs={
                loadsDataTableProps(locationSelect[1])[
                  "controlDatePickerInputs"
                ]
              }
              radioNames={["secondNormalIndicator"]}
              dataTableName={"Load"}
              revertedState={revertedState}
              setRevertedState={setRevertedState}
              setUpdateRelatedTables={setUpdateRelatedTables}
              updateRelatedTables={updateRelatedTables}
            />,
            "Loads",
          ],
        ],
        [
          [
            <DataTableAssert
              locationSelectValue={locationSelect[1]}
              inactive={inactive}
              settingInactiveCheckBox={settingInactiveCheckBox}
              checkout={checkout}
              user={user}
              payload={
                locationAttributesDataTableProps(locationSelect[1])["payload"]
              }
              dropdownArray={
                locationAttributesDataTableProps(locationSelect[1])[
                  "dropdownArray"
                ]
              }
              columnNames={
                locationAttributesDataTableProps(locationSelect[1])[
                  "columnNames"
                ]
              }
              controlInputs={
                locationAttributesDataTableProps(locationSelect[1])[
                  "controlInputs"
                ]
              }
              controlDatePickerInputs={
                locationAttributesDataTableProps(locationSelect[1])[
                  "controlDatePickerInputs"
                ]
              }
              radioNames={["ductIndicator", "bypassIndicator"]}
              dataTableName={"Location Attribute"}
              revertedState={revertedState}
              setRevertedState={setRevertedState}
              setUpdateRelatedTables={setUpdateRelatedTables}
              updateRelatedTables={updateRelatedTables}
            />,
            "Location Attributes",
          ],
          [
            <DataTableAssert
              locationSelectValue={locationSelect[1]}
              inactive={inactive}
              settingInactiveCheckBox={settingInactiveCheckBox}
              checkout={checkout}
              user={user}
              payload={relationshipDataTableProps(locationSelect[1])["payload"]}
              dropdownArray={
                relationshipDataTableProps(locationSelect[1])["dropdownArray"]
              }
              columnNames={
                relationshipDataTableProps(locationSelect[1])["columnNames"]
              }
              controlInputs={
                relationshipDataTableProps(locationSelect[1])["controlInputs"]
              }
              controlDatePickerInputs={
                relationshipDataTableProps(locationSelect[1])[
                  "controlDatePickerInputs"
                ]
              }
              radioNames={[]}
              dataTableName={"Relationship Data"}
              revertedState={revertedState}
              nonEditable={true}
              setRevertedState={setRevertedState}
              setUpdateRelatedTables={setUpdateRelatedTables}
              updateRelatedTables={updateRelatedTables}
            />,
            "Relationships Data",
          ],
        ], // location attributes
        [
          [
            <DataTableMethod
              locationSelectValue={locationSelect[1]}
              checkout={checkout}
              user={user}
              inactive={inactive}
              settingInactiveCheckBox={settingInactiveCheckBox}
              revertedState={revertedState}
              setRevertedState={setRevertedState}
              setUpdateRelatedTables={setUpdateRelatedTables}
              updateRelatedTables={updateRelatedTables}
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
              setUpdateRelatedTables={setUpdateRelatedTables}
              updateRelatedTables={updateRelatedTables}
            />,
            "Supplemental Methods",
          ],
        ],
        [
          [
            <DataTableQualifications
              locationSelectValue={locationSelect[1]}
              inactive={inactive}
              settingInactiveCheckBox={settingInactiveCheckBox}
              checkout={checkout}
              user={user}
              revertedState={revertedState}
              setRevertedState={setRevertedState}
              setUpdateRelatedTables={setUpdateRelatedTables}
              updateRelatedTables={updateRelatedTables}
            />,
            "Qualifications",
          ],
        ],
        [
          [
            <DataTableAssert
              locationSelectValue={locationSelect[1]}
              inactive={inactive}
              settingInactiveCheckBox={settingInactiveCheckBox}
              checkout={checkout}
              user={user}
              payload={rectWAFsDataTableProps(locationSelect[1])["payload"]}
              dropdownArray={
                rectWAFsDataTableProps(locationSelect[1])["dropdownArray"]
              }
              columnNames={
                rectWAFsDataTableProps(locationSelect[1])["columnNames"]
              }
              controlInputs={
                rectWAFsDataTableProps(locationSelect[1])["controlInputs"]
              }
              controlDatePickerInputs={
                rectWAFsDataTableProps(locationSelect[1])[
                  "controlDatePickerInputs"
                ]
              }
              dataTableName={"Rectangular Duct WAF"}
              revertedState={revertedState}
              setRevertedState={setRevertedState}
              setUpdateRelatedTables={setUpdateRelatedTables}
              updateRelatedTables={updateRelatedTables}
            />,

            "WAFs Rectangular Duct",
          ],
        ], // rectangular duct

        [
          [
            <DataTableAssert
              locationSelectValue={locationSelect[1]}
              inactive={inactive}
              settingInactiveCheckBox={settingInactiveCheckBox}
              checkout={checkout}
              user={user}
              payload={spanDataTableProps(locationSelect[1])["payload"]}
              dropdownArray={
                spanDataTableProps(locationSelect[1])["dropdownArray"]
              }
              columnNames={spanDataTableProps(locationSelect[1])["columnNames"]}
              controlInputs={
                spanDataTableProps(locationSelect[1])["controlInputs"]
              }
              controlDatePickerInputs={
                spanDataTableProps(locationSelect[1])["controlDatePickerInputs"]
              }
              dataTableName={"Span"}
              revertedState={revertedState}
              setRevertedState={setRevertedState}
              setUpdateRelatedTables={setUpdateRelatedTables}
              updateRelatedTables={updateRelatedTables}
            />,
            "Spans",
          ],
        ],

        [
          [
            <DataTableSystems
              locationSelectValue={locationSelect[1]}
              inactive={inactive}
              settingInactiveCheckBox={settingInactiveCheckBox}
              checkout={checkout}
              user={user}
              revertedState={revertedState}
              setRevertedState={setRevertedState}
              setUpdateRelatedTables={setUpdateRelatedTables}
              updateRelatedTables={updateRelatedTables}
            />,
            "Systems",
          ],
        ],
        [
          [
            <DataTableAssert
              locationSelectValue={locationSelect[1]}
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
              setUpdateRelatedTables={setUpdateRelatedTables}
              updateRelatedTables={updateRelatedTables}
            />,
            "Unit Fuels",
          ],
          [
            <DataTableAssert
              locationSelectValue={locationSelect[1]}
              selectedLocation={locations.find(
                (element) => element.id === locationSelect[1]
              )}
              payload={
                unitControlDataTableProps(
                  locationSelect[1],
                  locations.find((element) => element.id === locationSelect[1])
                )["payload"]
              }
              dropdownArray={
                unitControlDataTableProps(
                  locationSelect[1],
                  locations.find((element) => element.id === locationSelect[1])
                )["dropdownArray"]
              }
              columnNames={
                unitControlDataTableProps(
                  locationSelect[1],
                  locations.find((element) => element.id === locationSelect[1])
                )["columnNames"]
              }
              controlInputs={
                unitControlDataTableProps(
                  locationSelect[1],
                  locations.find((element) => element.id === locationSelect[1])
                )["controlInputs"]
              }
              controlDatePickerInputs={
                unitControlDataTableProps(
                  locationSelect[1],
                  locations.find((element) => element.id === locationSelect[1])
                )["controlDatePickerInputs"]
              }
              urlParameters={
                unitControlDataTableProps(
                  locationSelect[1],
                  locations.find((element) => element.id === locationSelect[1])
                )["urlParameters"]
              }
              radioNames={["originalCode", "seasonalControlsIndicator"]}
              dataTableName={"Unit Control"}
              checkout={checkout}
              user={user}
              inactive={inactive}
              settingInactiveCheckBox={settingInactiveCheckBox}
              revertedState={revertedState}
              setRevertedState={setRevertedState}
              setUpdateRelatedTables={setUpdateRelatedTables}
              updateRelatedTables={updateRelatedTables}
            />,
            "Unit Controls",
          ],
          [
            <DataTableAssert
              locationSelectValue={locationSelect[1]}
              selectedLocation={locations.find(
                (element) => element.id === locationSelect[1]
              )}
              payload={
                unitCapacityDataTableProps(
                  locationSelect[1],
                  locations.find((element) => element.id === locationSelect[1])
                )["payload"]
              }
              dropdownArray={
                unitCapacityDataTableProps(
                  locationSelect[1],
                  locations.find((element) => element.id === locationSelect[1])
                )["dropdownArray"]
              }
              columnNames={
                unitCapacityDataTableProps(
                  locationSelect[1],
                  locations.find((element) => element.id === locationSelect[1])
                )["columnNames"]
              }
              controlInputs={
                unitCapacityDataTableProps(
                  locationSelect[1],
                  locations.find((element) => element.id === locationSelect[1])
                )["controlInputs"]
              }
              controlDatePickerInputs={
                unitCapacityDataTableProps(
                  locationSelect[1],
                  locations.find((element) => element.id === locationSelect[1])
                )["controlDatePickerInputs"]
              }
              urlParameters={
                unitCapacityDataTableProps(
                  locationSelect[1],
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
              setUpdateRelatedTables={setUpdateRelatedTables}
              updateRelatedTables={updateRelatedTables}
            />,
            "Unit Capacities",
          ],
        ], // unit info
      ];
      setTableState(tableArr);
    },

    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      // eslint-disable-next-line react-hooks/exhaustive-deps
      locationSelect[1],
      // eslint-disable-next-line react-hooks/exhaustive-deps
      inactive[0],
      checkout,
      revertedState,
      updateRelatedTables,
    ]
  );

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
          locationSelectValue={locationSelect[1]}
          checkout={checkout}
          user={user}
          inactive={inactive}
          settingInactiveCheckBox={settingInactiveCheckBox}
          revertedState={revertedState}
          setRevertedState={setRevertedState}
          setUpdateRelatedTables={setUpdateRelatedTables}
          updateRelatedTables={updateRelatedTables}
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
          setUpdateRelatedTables={setUpdateRelatedTables}
          updateRelatedTables={updateRelatedTables}
        />,
        "Supplemental Methods",
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
