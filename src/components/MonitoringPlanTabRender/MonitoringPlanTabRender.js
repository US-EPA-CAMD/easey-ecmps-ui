import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import HeaderInfo from "../HeaderInfo/HeaderInfo";
import "../MonitoringPlanTab/MonitoringPlanTab.scss";
import DataTableMethod from "../datatablesContainer/DataTableMethod/DataTableMethod";
import DataTableMats from "../datatablesContainer/DataTableMats/DataTableMats";
import DataTableSystems from "../datatablesContainer/DataTableSystems/DataTableSystems";
import CustomAccordion from "../CustomAccordion/CustomAccordion";
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
  unitDataTableProps,
  unitProgramDataTableProps,
  reportingFrequencyDataTableProps,
} from "../../additional-functions/dataTable-props";
import { MONITORING_PLAN_STORE_NAME } from "../../additional-functions/workspace-section-and-store-names";

export const MonitoringPlanTabRender = ({
  title,
  user,
  selectedConfigId,
  setSectionSelect,
  setLocationSelect,
  sectionSelect,
  locationSelect,
  orisCode,
  checkout,
  removeTab,
  setCheckout,
  setInactive,
  inactive,
  currentTabIndex,

  workspaceSection,
}) => {
  const locations = useSelector(
    (state) =>
      state.monitoringPlans[orisCode]?.find((mp) => mp.id === selectedConfigId)
        ?.monitoringLocationData ?? []
  );

  const settingInactiveCheckBox = (check, disable) => {
    setInactive([check, disable], title, MONITORING_PLAN_STORE_NAME);
  };

  const [updateRelatedTables, setUpdateRelatedTables] = useState(false);

  const [revertedState, setRevertedState] = useState(false);

  // Initialize state to collect data statuses
  const [tableDataStatuses, setTableDataStatuses] = useState({});

  const handleReportDataStatus = (tableName, dataStatus) => {
    setTableDataStatuses((prevStatuses) => ({
      ...prevStatuses,
      [tableName]: dataStatus,
    }));
  };

  const [prevSectionSelect, setPrevSectionSelect] = useState(sectionSelect);
  if (prevSectionSelect !== sectionSelect) {
    setPrevSectionSelect(sectionSelect);
    setTableDataStatuses({});
  }

  useEffect(() => {
    const statuses = Object.values(tableDataStatuses);

    // Determine if there are active and/or inactive records across all tables
    const hasAnyActive = statuses.some((status) => status.hasActive);
    const hasAnyInactive = statuses.some((status) => status.hasInactive);

    let disableCheckbox = false;

    if (hasAnyActive && hasAnyInactive) {
      // Both active and inactive data exist
      disableCheckbox = false;
    } else {
      // Only active or only inactive data across all tables
      disableCheckbox = true;
    }

    const inactiveDisabled = inactive[1];

    // Update the global inactive state
    if (inactiveDisabled !== disableCheckbox) {
      setInactive(
        [inactive[0], disableCheckbox],
        title,
        MONITORING_PLAN_STORE_NAME
      );
    }
  }, [tableDataStatuses, inactive, setInactive, title]);

  // updates all tables whenever a location is changed
  useEffect(
    () => {
      const tableArr = [
        [
          {
            content: (
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
                reportDataStatus={handleReportDataStatus}
                revertedState={revertedState}
                setRevertedState={setRevertedState}
                setUpdateRelatedTables={setUpdateRelatedTables}
                updateRelatedTables={updateRelatedTables}
                currentTabIndex={currentTabIndex}
              />
            ),
            title: "Defaults",
          },
        ],
        [
          {
            content: (
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
                reportDataStatus={handleReportDataStatus}
                revertedState={revertedState}
                setRevertedState={setRevertedState}
                setUpdateRelatedTables={setUpdateRelatedTables}
                updateRelatedTables={updateRelatedTables}
                currentTabIndex={currentTabIndex}
              />
            ),
            title: "Formulas",
          },
        ],
        [
          {
            content: (
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
                dataTableName={"Load"}
                reportDataStatus={handleReportDataStatus}
                revertedState={revertedState}
                setRevertedState={setRevertedState}
                setUpdateRelatedTables={setUpdateRelatedTables}
                updateRelatedTables={updateRelatedTables}
                currentTabIndex={currentTabIndex}
              />
            ),
            title: "Loads",
          },
        ],
        [
          {
            content: (
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
                reportDataStatus={handleReportDataStatus}
                revertedState={revertedState}
                setRevertedState={setRevertedState}
                setUpdateRelatedTables={setUpdateRelatedTables}
                updateRelatedTables={updateRelatedTables}
                currentTabIndex={currentTabIndex}
              />
            ),
            title: "Location Attributes",
          },
          {
            content: (
              <DataTableAssert
                locationSelectValue={locationSelect[1]}
                inactive={inactive}
                settingInactiveCheckBox={settingInactiveCheckBox}
                checkout={checkout}
                user={user}
                payload={
                  relationshipDataTableProps(locationSelect[1])["payload"]
                }
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
                reportDataStatus={handleReportDataStatus}
                revertedState={revertedState}
                nonEditable={true}
                setRevertedState={setRevertedState}
                setUpdateRelatedTables={setUpdateRelatedTables}
                updateRelatedTables={updateRelatedTables}
                currentTabIndex={currentTabIndex}
              />
            ),
            title: "Relationships Data",
          },
        ], // location attributes
        [
          {
            content: (
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
                currentTabIndex={currentTabIndex}
              />
            ),
            title: "Methods",
          },
          {
            content: (
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
                currentTabIndex={currentTabIndex}
              />
            ),
            title: "Supplemental Methods",
          },
        ],
        [
          {
            content: (
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
                currentTabIndex={currentTabIndex}
              />
            ),
            title: "Qualifications",
          },
        ],
        [
          {
            content: (
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
                reportDataStatus={handleReportDataStatus}
                revertedState={revertedState}
                setRevertedState={setRevertedState}
                setUpdateRelatedTables={setUpdateRelatedTables}
                updateRelatedTables={updateRelatedTables}
                currentTabIndex={currentTabIndex}
              />
            ),

            title: "WAFs Rectangular Duct",
          },
        ], // rectangular duct

        [
          {
            content: (
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
                columnNames={
                  spanDataTableProps(locationSelect[1])["columnNames"]
                }
                controlInputs={
                  spanDataTableProps(locationSelect[1])["controlInputs"]
                }
                controlDatePickerInputs={
                  spanDataTableProps(locationSelect[1])[
                    "controlDatePickerInputs"
                  ]
                }
                dataTableName={"Span"}
                reportDataStatus={handleReportDataStatus}
                revertedState={revertedState}
                setRevertedState={setRevertedState}
                setUpdateRelatedTables={setUpdateRelatedTables}
                updateRelatedTables={updateRelatedTables}
                currentTabIndex={currentTabIndex}
              />
            ),
            title: "Spans",
          },
        ],

        [
          {
            content: (
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
                currentTabIndex={currentTabIndex}
              />
            ),
            title: "Systems",
          },
        ],
        [
          {
            content: (
              <DataTableAssert
                locationSelectValue={locationSelect[1]}
                selectedLocation={locations.find(
                  (element) => element.id === locationSelect[1]
                )}
                payload={
                  unitDataTableProps(
                    locationSelect[1],
                    locations.find(
                      (element) => element.id === locationSelect[1]
                    )
                  )["payload"]
                }
                dropdownArray={
                  unitDataTableProps(
                    locationSelect[1],
                    locations.find(
                      (element) => element.id === locationSelect[1]
                    )
                  )["dropdownArray"]
                }
                columnNames={
                  unitDataTableProps(
                    locationSelect[1],
                    locations.find(
                      (element) => element.id === locationSelect[1]
                    )
                  )["columnNames"]
                }
                controlInputs={
                  unitDataTableProps(
                    locationSelect[1],
                    locations.find(
                      (element) => element.id === locationSelect[1]
                    )
                  )["controlInputs"]
                }
                controlDatePickerInputs={
                  unitDataTableProps(
                    locationSelect[1],
                    locations.find(
                      (element) => element.id === locationSelect[1]
                    )
                  )["controlDatePickerInputs"]
                }
                urlParameters={
                  unitDataTableProps(
                    locationSelect[1],
                    locations.find(
                      (element) => element.id === locationSelect[1]
                    )
                  )["urlParameters"]
                }
                dataTableName={"Unit"}
                reportDataStatus={handleReportDataStatus}
                radioNames={["nonLoadBasedIndicator"]}
                checkout={checkout}
                user={user}
                inactive={inactive}
                settingInactiveCheckBox={settingInactiveCheckBox}
                revertedState={revertedState}
                allowToCreateNewData={false}
                setRevertedState={setRevertedState}
                setUpdateRelatedTables={setUpdateRelatedTables}
                updateRelatedTables={updateRelatedTables}
                currentTabIndex={currentTabIndex}
              />
            ),
            title: "Unit",
          },
          {
            content: (
              <DataTableAssert
                locationSelectValue={locationSelect[1]}
                selectedLocation={locations.find(
                  (element) => element.id === locationSelect[1]
                )}
                payload={
                  unitFuelDataTableProps(
                    locations.find(
                      (element) => element.id === locationSelect[1]
                    )
                  )["payload"]
                }
                dropdownArray={
                  unitFuelDataTableProps(
                    locations.find(
                      (element) => element.id === locationSelect[1]
                    )
                  )["dropdownArray"]
                }
                columnNames={
                  unitFuelDataTableProps(
                    locations.find(
                      (element) => element.id === locationSelect[1]
                    )
                  )["columnNames"]
                }
                controlInputs={
                  unitFuelDataTableProps(
                    locations.find(
                      (element) => element.id === locationSelect[1]
                    )
                  )["controlInputs"]
                }
                controlDatePickerInputs={
                  unitFuelDataTableProps(
                    locations.find(
                      (element) => element.id === locationSelect[1]
                    )
                  )["controlDatePickerInputs"]
                }
                urlParameters={
                  unitFuelDataTableProps(
                    locations.find(
                      (element) => element.id === locationSelect[1]
                    )
                  )["urlParameters"]
                }
                dataTableName={"Unit Fuel"}
                reportDataStatus={handleReportDataStatus}
                radioNames={["ozoneSeasonIndicator"]}
                checkout={checkout}
                user={user}
                inactive={inactive}
                settingInactiveCheckBox={settingInactiveCheckBox}
                revertedState={revertedState}
                setRevertedState={setRevertedState}
                setUpdateRelatedTables={setUpdateRelatedTables}
                updateRelatedTables={updateRelatedTables}
                currentTabIndex={currentTabIndex}
              />
            ),
            title: "Unit Fuels",
          },
          {
            content: (
              <DataTableAssert
                locationSelectValue={locationSelect[1]}
                selectedLocation={locations.find(
                  (element) => element.id === locationSelect[1]
                )}
                payload={
                  unitControlDataTableProps(
                    locationSelect[1],
                    locations.find(
                      (element) => element.id === locationSelect[1]
                    )
                  )["payload"]
                }
                dropdownArray={
                  unitControlDataTableProps(
                    locationSelect[1],
                    locations.find(
                      (element) => element.id === locationSelect[1]
                    )
                  )["dropdownArray"]
                }
                columnNames={
                  unitControlDataTableProps(
                    locationSelect[1],
                    locations.find(
                      (element) => element.id === locationSelect[1]
                    )
                  )["columnNames"]
                }
                controlInputs={
                  unitControlDataTableProps(
                    locationSelect[1],
                    locations.find(
                      (element) => element.id === locationSelect[1]
                    )
                  )["controlInputs"]
                }
                controlDatePickerInputs={
                  unitControlDataTableProps(
                    locationSelect[1],
                    locations.find(
                      (element) => element.id === locationSelect[1]
                    )
                  )["controlDatePickerInputs"]
                }
                urlParameters={
                  unitControlDataTableProps(
                    locationSelect[1],
                    locations.find(
                      (element) => element.id === locationSelect[1]
                    )
                  )["urlParameters"]
                }
                radioNames={["originalCode", "seasonalControlsIndicator"]}
                dataTableName={"Unit Control"}
                reportDataStatus={handleReportDataStatus}
                checkout={checkout}
                user={user}
                inactive={inactive}
                settingInactiveCheckBox={settingInactiveCheckBox}
                revertedState={revertedState}
                setRevertedState={setRevertedState}
                setUpdateRelatedTables={setUpdateRelatedTables}
                updateRelatedTables={updateRelatedTables}
                currentTabIndex={currentTabIndex}
              />
            ),
            title: "Unit Controls",
          },
          {
            content: (
              <DataTableAssert
                locationSelectValue={locationSelect[1]}
                selectedLocation={locations.find(
                  (element) => element.id === locationSelect[1]
                )}
                payload={
                  unitCapacityDataTableProps(
                    locationSelect[1],
                    locations.find(
                      (element) => element.id === locationSelect[1]
                    )
                  )["payload"]
                }
                dropdownArray={
                  unitCapacityDataTableProps(
                    locationSelect[1],
                    locations.find(
                      (element) => element.id === locationSelect[1]
                    )
                  )["dropdownArray"]
                }
                columnNames={
                  unitCapacityDataTableProps(
                    locationSelect[1],
                    locations.find(
                      (element) => element.id === locationSelect[1]
                    )
                  )["columnNames"]
                }
                controlInputs={
                  unitCapacityDataTableProps(
                    locationSelect[1],
                    locations.find(
                      (element) => element.id === locationSelect[1]
                    )
                  )["controlInputs"]
                }
                controlDatePickerInputs={
                  unitCapacityDataTableProps(
                    locationSelect[1],
                    locations.find(
                      (element) => element.id === locationSelect[1]
                    )
                  )["controlDatePickerInputs"]
                }
                urlParameters={
                  unitCapacityDataTableProps(
                    locationSelect[1],
                    locations.find(
                      (element) => element.id === locationSelect[1]
                    )
                  )["urlParameters"]
                }
                dataTableName={"Unit Capacity"}
                reportDataStatus={handleReportDataStatus}
                checkout={checkout}
                user={user}
                inactive={inactive}
                settingInactiveCheckBox={settingInactiveCheckBox}
                revertedState={revertedState}
                setRevertedState={setRevertedState}
                setUpdateRelatedTables={setUpdateRelatedTables}
                updateRelatedTables={updateRelatedTables}
                currentTabIndex={currentTabIndex}
              />
            ),
            title: "Unit Capacities",
          },
          {
            content: (
              <DataTableAssert
                locationSelectValue={locationSelect[1]}
                selectedLocation={locations.find(
                  (element) => element.id === locationSelect[1]
                )}
                payload={
                  unitProgramDataTableProps(
                    locationSelect[1],
                    locations.find(
                      (element) => element.id === locationSelect[1]
                    )
                  )["payload"]
                }
                dropdownArray={
                  unitProgramDataTableProps(
                    locationSelect[1],
                    locations.find(
                      (element) => element.id === locationSelect[1]
                    )
                  )["dropdownArray"]
                }
                columnNames={
                  unitProgramDataTableProps(
                    locationSelect[1],
                    locations.find(
                      (element) => element.id === locationSelect[1]
                    )
                  )["columnNames"]
                }
                controlInputs={
                  unitProgramDataTableProps(
                    locationSelect[1],
                    locations.find(
                      (element) => element.id === locationSelect[1]
                    )
                  )["controlInputs"]
                }
                controlDatePickerInputs={
                  unitProgramDataTableProps(
                    locationSelect[1],
                    locations.find(
                      (element) => element.id === locationSelect[1]
                    )
                  )["controlDatePickerInputs"]
                }
                dataTableName={"Unit Program"}
                reportDataStatus={handleReportDataStatus}
                checkout={checkout}
                user={user}
                inactive={inactive}
                settingInactiveCheckBox={settingInactiveCheckBox}
                revertedState={revertedState}
                nonEditable={true}
                setRevertedState={setRevertedState}
                setUpdateRelatedTables={setUpdateRelatedTables}
                updateRelatedTables={updateRelatedTables}
                currentTabIndex={currentTabIndex}
              />
            ),
            title: "Unit Programs",
          },
          {
            content: (
              <DataTableAssert
                locationSelectValue={locationSelect[1]}
                selectedLocation={locations.find(
                  (element) => element.id === locationSelect[1]
                )}
                payload={
                  reportingFrequencyDataTableProps(
                    locationSelect[1],
                    locations.find(
                      (element) => element.id === locationSelect[1]
                    )
                  )["payload"]
                }
                dropdownArray={
                  reportingFrequencyDataTableProps(
                    locationSelect[1],
                    locations.find(
                      (element) => element.id === locationSelect[1]
                    )
                  )["dropdownArray"]
                }
                columnNames={
                  reportingFrequencyDataTableProps(
                    locationSelect[1],
                    locations.find(
                      (element) => element.id === locationSelect[1]
                    )
                  )["columnNames"]
                }
                controlInputs={
                  reportingFrequencyDataTableProps(
                    locationSelect[1],
                    locations.find(
                      (element) => element.id === locationSelect[1]
                    )
                  )["controlInputs"]
                }
                controlDatePickerInputs={
                  reportingFrequencyDataTableProps(
                    locationSelect[1],
                    locations.find(
                      (element) => element.id === locationSelect[1]
                    )
                  )["controlDatePickerInputs"]
                }
                dataTableName={"Reporting Frequency"}
                reportDataStatus={handleReportDataStatus}
                checkout={checkout}
                user={user}
                inactive={inactive}
                settingInactiveCheckBox={settingInactiveCheckBox}
                revertedState={revertedState}
                nonEditable={true}
                setRevertedState={setRevertedState}
                setUpdateRelatedTables={setUpdateRelatedTables}
                updateRelatedTables={updateRelatedTables}
                currentTabIndex={currentTabIndex}
              />
            ),
            title: "Reporting Frequencies",
          },
        ], // unit info
      ];
      setTableState(tableArr);
    },

    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      // eslint-disable-next-line react-hooks/exhaustive-deps
      locationSelect[1],
      // eslint-disable-next-line react-hooks/exhaustive-deps
      // inactive[0],
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
      {
        content: (
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
            currentTabIndex={currentTabIndex}
          />
        ),
        title: "Methods",
      },
      {
        content: (
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
            currentTabIndex={currentTabIndex}
          />
        ),
        title: "Supplemental Methods",
      },
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
          selectedConfigId={selectedConfigId}
          orisCode={orisCode}
          removeTab={removeTab}
          sectionSelect={sectionSelect}
          setSectionSelect={setSectionSelect}
          setLocationSelect={setLocationSelect}
          locationSelect={locationSelect}
          checkout={checkout}
          user={user}
          setCheckout={setCheckout}
          setInactive={setInactive}
          inactive={inactive}
          // checkedOutLocations={checkedOutLocations}
          setRevertedState={setRevertedState}
          setUpdateRelatedTables={setUpdateRelatedTables}
          updateRelatedTables={updateRelatedTables}
          workspaceSection={workspaceSection}
        />
      </div>
      <hr />
      <div className="grid-row overflow-x-auto">
        <CustomAccordion
          title={sectionSelect[1]}
          tables={tableState[sectionSelect[0]]}
        />
      </div>
    </div>
  );
};

export default MonitoringPlanTabRender;
