import React, { useState, useEffect, useRef } from "react";
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
import DataTableComments from "../datatablesContainer/DataTableComments/DataTableComments";

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
}) => {
  const locations = useSelector(
    (state) =>
      state.monitoringPlans[orisCode]?.find((mp) => mp.id === selectedConfigId)
        ?.monitoringLocationData ?? []
  );
  const selectedLocation = locations.find((l) => l.id === locationSelect[1]);

  const checkboxToggledRef = useRef(false);

  const handleCheckboxChange = (check, disable) => {
    checkboxToggledRef.current = true; // Set flag to true when checkbox is changed
    settingInactiveCheckBox(check, disable); // Update inactive state only for checkbox trigger
  };

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

  //useEffect to set checkbox for all records across tables 
  //useEffec runs when title and tableDataStatuses changes
  useEffect(() => {
    if (checkboxToggledRef.current) {
      checkboxToggledRef.current = false; // Reset the flag
      return;
    }
    const statuses = Object.values(tableDataStatuses);

    // Determine if there are active and/or inactive records across all tables
    const hasAnyActive = statuses.some((status) => status.hasActive);
    const hasAnyInactive = statuses.some((status) => status.hasInactive);

    let disableCheckbox = false;
    let checked = false;
    if (hasAnyActive && hasAnyInactive) 
    {
      // Both active and inactive data exist
      checked = false;
      disableCheckbox = false;
    } 
    else if(!hasAnyActive && hasAnyInactive)
    {
      // Only inactive
      checked = true;
      disableCheckbox = true;
    }
    else if (hasAnyActive && !hasAnyInactive) 
    {
      // Only active
      checked = false;
      disableCheckbox = true;
    }
    else
    {
        // Doesn't have any records
        checked = false;
        disableCheckbox = true;
    }


    // Update the global inactive state
    if (inactive[0] !== checked || inactive[1] !== disableCheckbox) {
      setInactive(
        [checked, disableCheckbox],
        title,
        MONITORING_PLAN_STORE_NAME
      );
    }
  }, [tableDataStatuses,title]);

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
                reportDataStatus={handleReportDataStatus}
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
                reportDataStatus={handleReportDataStatus}
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
                reportDataStatus={handleReportDataStatus}
                dataTableName={"Qualifications"}
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
                reportDataStatus={handleReportDataStatus}
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
                selectedLocation={selectedLocation}
                payload={
                  unitDataTableProps(
                    locationSelect[1],
                    selectedLocation,
                  )["payload"]
                }
                dropdownArray={
                  unitDataTableProps(
                    locationSelect[1],
                    selectedLocation,
                  )["dropdownArray"]
                }
                columnNames={
                  unitDataTableProps(
                    locationSelect[1],
                    selectedLocation,
                  )["columnNames"]
                }
                controlInputs={
                  unitDataTableProps(
                    locationSelect[1],
                    selectedLocation,
                  )["controlInputs"]
                }
                controlDatePickerInputs={
                  unitDataTableProps(
                    locationSelect[1],
                    selectedLocation,
                  )["controlDatePickerInputs"]
                }
                urlParameters={
                  unitDataTableProps(
                    locationSelect[1],
                    selectedLocation,
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
                selectedLocation={selectedLocation}
                payload={
                  unitFuelDataTableProps(
                    selectedLocation,
                  )["payload"]
                }
                dropdownArray={
                  unitFuelDataTableProps(
                    selectedLocation,
                  )["dropdownArray"]
                }
                columnNames={
                  unitFuelDataTableProps(
                    selectedLocation,
                  )["columnNames"]
                }
                controlInputs={
                  unitFuelDataTableProps(
                    selectedLocation,
                  )["controlInputs"]
                }
                controlDatePickerInputs={
                  unitFuelDataTableProps(
                    selectedLocation,
                  )["controlDatePickerInputs"]
                }
                urlParameters={
                  unitFuelDataTableProps(
                    selectedLocation,
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
                selectedLocation={selectedLocation}
                payload={
                  unitControlDataTableProps(
                    locationSelect[1],
                    selectedLocation,
                  )["payload"]
                }
                dropdownArray={
                  unitControlDataTableProps(
                    locationSelect[1],
                    selectedLocation,
                  )["dropdownArray"]
                }
                columnNames={
                  unitControlDataTableProps(
                    locationSelect[1],
                    selectedLocation,
                  )["columnNames"]
                }
                controlInputs={
                  unitControlDataTableProps(
                    locationSelect[1],
                    selectedLocation,
                  )["controlInputs"]
                }
                controlDatePickerInputs={
                  unitControlDataTableProps(
                    locationSelect[1],
                    selectedLocation,
                  )["controlDatePickerInputs"]
                }
                urlParameters={
                  unitControlDataTableProps(
                    locationSelect[1],
                    selectedLocation,
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
                selectedLocation={selectedLocation}
                payload={
                  unitCapacityDataTableProps(
                    locationSelect[1],
                    selectedLocation,
                  )["payload"]
                }
                dropdownArray={
                  unitCapacityDataTableProps(
                    locationSelect[1],
                    selectedLocation,
                  )["dropdownArray"]
                }
                columnNames={
                  unitCapacityDataTableProps(
                    locationSelect[1],
                    selectedLocation,
                  )["columnNames"]
                }
                controlInputs={
                  unitCapacityDataTableProps(
                    locationSelect[1],
                    selectedLocation,
                  )["controlInputs"]
                }
                controlDatePickerInputs={
                  unitCapacityDataTableProps(
                    locationSelect[1],
                    selectedLocation,
                  )["controlDatePickerInputs"]
                }
                urlParameters={
                  unitCapacityDataTableProps(
                    locationSelect[1],
                    selectedLocation,
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
                selectedLocation={selectedLocation}
                payload={
                  unitProgramDataTableProps(
                    locationSelect[1],
                    selectedLocation,
                  )["payload"]
                }
                dropdownArray={
                  unitProgramDataTableProps(
                    locationSelect[1],
                    selectedLocation,
                  )["dropdownArray"]
                }
                columnNames={
                  unitProgramDataTableProps(
                    locationSelect[1],
                    selectedLocation,
                  )["columnNames"]
                }
                controlInputs={
                  unitProgramDataTableProps(
                    locationSelect[1],
                    selectedLocation,
                  )["controlInputs"]
                }
                controlDatePickerInputs={
                  unitProgramDataTableProps(
                    locationSelect[1],
                    selectedLocation,
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
                selectedLocation={selectedLocation}
                payload={
                  reportingFrequencyDataTableProps(
                    locationSelect[1],
                    selectedLocation,
                  )["payload"]
                }
                dropdownArray={
                  reportingFrequencyDataTableProps(
                    locationSelect[1],
                    selectedLocation,
                  )["dropdownArray"]
                }
                columnNames={
                  reportingFrequencyDataTableProps(
                    locationSelect[1],
                    selectedLocation,
                  )["columnNames"]
                }
                controlInputs={
                  reportingFrequencyDataTableProps(
                    locationSelect[1],
                    selectedLocation,
                  )["controlInputs"]
                }
                controlDatePickerInputs={
                  reportingFrequencyDataTableProps(
                    locationSelect[1],
                    selectedLocation,
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
            [ {
        content: (
          <DataTableComments
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
            reportDataStatus={handleReportDataStatus}
            selectedConfigId={selectedConfigId}
          />
        ),
        title: "Comments",
      },
    ]
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
            reportDataStatus={handleReportDataStatus}
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
            reportDataStatus={handleReportDataStatus}
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
          workspaceSection={MONITORING_PLAN_STORE_NAME}
          handleCheckboxChange={handleCheckboxChange}
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
