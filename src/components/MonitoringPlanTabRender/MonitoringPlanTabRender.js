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
            payload={{
              id: null,
             
              parameterCode: "string",
              defaultValue: "0",
              defaultUnitsOfMeasureCode: "string",
              defaultPurposeCode: "string",
              fuelCode: null,
              operatingConditionCode: "string",
              defaultSourceCode: null,
              groupId: null,
              beginDate: null,
              beginHour: null,
              endDate: null,
              endHour: null,
            }}
            dropdownArray={[
              "parameterCode",
              "defaultUnitsOfMeasureCode",
              "fuelCode",
              "operatingConditionCode",
              "defaultSourceCode",
              "defaultPurposeCode",
            ]}
            columnNames={[
              "Parameter Code",
              "Units of Measure",
              "Purpose",
              "Fuel Code",
              "Operating Condition",
              "Source of Value",
              "Begin Date and Time",
              "End Date and Time",
            ]}
            controlInputs={{
              parameterCode: ["Parameter", "dropdown", ""],
              defaultValue: ["Default Value", "input", ""],
              defaultUnitsOfMeasureCode: ["Units of Measure", "dropdown", ""],
              defaultPurposeCode: ["Purpose", "dropdown", ""],
              fuelCode: ["Fuel Code", "dropdown", ""],
              operatingConditionCode: ["Operating Condition", "dropdown", ""],
              defaultSourceCode: ["Source of Value", "dropdown", ""],
              groupId: ["Group ID", "input", ""],
              // skip: ["", "skip", ""],
            }}
            controlDatePickerInputs={{
              beginDate: ["Start Date", "date", ""],
              beginHour: ["Start Time", "time", ""],
              endDate: ["End Date", "date", ""],
              endHour: ["End Time", "time", ""],
            }}
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
            payload={{
              formulaId: "string",
              parameterCode: "string",
              formulaCode: "string",
              formulaText: "string",
              beginDate: "2021-10-21T17:12:00.643Z",
              beginHour: 0,
              endDate: "2021-10-21T17:12:00.643Z",
              endHour: 0,
            }}
            dropdownArray={["parameterCode", "formulaCode"]}
            columnNames={[
              "Formula ID",
              "Parameter",
              "Formula Code",
              "Formula",
              "Begin Date and Time",
              "End Date and Time",
            ]}
            controlInputs={{
              formulaId: ["Formula ID", "input", ""],
              parameterCode: ["Parameter", "dropdown", ""],
              formulaCode: ["Formula Code", "dropdown", ""],
              formulaText: ["Formula", "input", ""],
            }}
            controlDatePickerInputs={{
              beginDate: ["Start Date", "date", ""],
              beginHour: ["Start Time", "time", ""],
              endDate: ["End Date", "date", ""],
              endHour: ["End Time", "time", ""],
            }}
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
            payload={{
              locationId: locationSelect[1],
              id: null,
              maximumLoadValue: 0,
              maximumLoadUnitsOfMeasureCode: "string",
              lowerOperationBoundary: 0,
              upperOperationBoundary: 0,
              normalLevelCode: "string",
              secondLevelCode: "string",
              secondNormalIndicator: 0,
              loadAnalysisDate: "2021-09-16T20:55:48.806Z",
              beginDate: "2021-09-16T20:55:48.806Z",
              beginHour: 0,
              endDate: "2021-09-16T20:55:48.806Z",
              endHour: 0,
            }}
            dropdownArray={[
              "maximumLoadUnitsOfMeasureCode",
              "normalLevelCode",
              "secondLevelCode",
            ]}
            columnNames={[
              "Maximum Load Value",
              "Maximum Load Units of Measure",
              "Lower Operation Boundary",
              "Upper Operation Boundary",
              "Normal Level",
              "Second Level",
              "Second Normal Indicator",
              "Load Analysis Date",
              "Begin Date and Time",
              "End Date and Time",
            ]}
            controlInputs={{
              maximumLoadValue: ["Maximum Load Value", "input", ""],
              maximumLoadUnitsOfMeasureCode: [
                "Maximum Load Units of Measure",
                "dropdown",
                "",
              ],
              lowerOperationBoundary: ["Lower Operation Boundary", "input", ""],
              upperOperationBoundary: ["Upper Operation Boundary", "input", ""],
              normalLevelCode: ["Normal Level", "dropdown", ""],
              secondLevelCode: ["Second Level", "dropdown", ""],
              secondNormalIndicator: ["Second Normal Indicator", "radio", ""],
            }}
            controlDatePickerInputs={{
              loadAnalysisDate: ["Load Analysis Date", "date", ""],
              beginDate: ["Start Date", "date", ""],
              beginHour: ["Start Time", "time", ""],
              endDate: ["End Date", "date", ""],
              endHour: ["End Time", "time", ""],
            }}
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
            payload={{
              locationId: parseInt(locationSelect[1]),
              id: "string",
              userId: "string",
              addDate: "2021-10-18T07:05:11.018Z",
              updateDate: "2021-10-18T07:05:11.018Z",
              wafDeterminationDate: "2021-10-18T07:05:11.018Z",
              wafBeginDate: "2021-10-18T07:05:11.018Z",
              wafBeginHour: 0,
              wafMethodCode: "string",
              wafValue: 0,
              numberOfTestRuns: 0,
              numberOfTraversePointsWaf: 0,
              numberOfTestPorts: 0,
              numberOfTraversePointsRef: 0,
              ductWidth: 0,
              ductDepth: 0,
              wafEndDate: "2021-10-18T07:05:11.018Z",
              wafEndHour: 0,
            }}
            dropdownArray={["wafMethodCode"]}
            columnNames={[
              "WAF Determination Date",
              "WAF Method",
              "Begin Date and Time",
              "End Date and Time",
            ]}
            controlInputs={{
              wafMethodCode: ["WAF Method", "dropdown", ""],
              wafValue: ["WAF Value", "input", ""],
              numberOfTestRuns: ["Number of Test Runs", "input", ""],
              numberOfTraversePointsWaf: [
                "Number of Traverse Points WAF",
                "input",
                "",
              ],
              numberOfTestPorts: ["Number of Test Ports", "input", ""],
              numberOfTraversePointsRef: [
                "Number of Traverse Points Reference",
                "input",
                "",
              ],
              ductWidth: ["Duct Width", "input", ""],
              ductDepth: ["Duct Depth", "input", ""],
            }}
            controlDatePickerInputs={{
              wafDeterminationDate: ["WAF Determination Date", "date", ""],
              skip: ["", "skip", ""],
              wafBeginDate: ["Start Date", "date", ""],
              wafBeginHour: ["Start Time", "time", ""],
              wafEndDate: ["End Date", "date", ""],
              wafEndHour: ["End Time", "time", ""],
            }}
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
            payload={{
              locationId: parseInt(locationSelect[1]),
              id: null,
              componentTypeCode: "string",
              spanScaleCode: "string",
              spanMethodCode: "string",
              mecValue: 0,
              mpcValue: 0,
              mpfValue: 0,
              spanValue: 0,
              fullScaleRange: 0,
              spanUnitsOfMeasureCode: "string",
              scaleTransitionPoint: "string",
              defaultHighRange: 0,
              flowSpanValue: 0,
              flowFullScaleRange: 0,
              beginDate: "2021-09-16T20:55:48.806Z",
              beginHour: 0,
              endDate: "2021-09-16T20:55:48.806Z",
              endHour: 0,
            }}
            dropdownArray={[
              "componentTypeCode",
              "spanScaleCode",
              "spanMethodCode",
              "spanUnitsOfMeasureCode",
            ]}
            columnNames={[
              "Component Type",
              "Span Scale",
              "Span Method",
              "Span Units of Measure",
              "Begin Date and Time",
              "End Date and Time",
            ]}
            controlInputs={{
              componentTypeCode: ["Component Type", "dropdown", ""],
              spanScaleCode: ["Span Scale", "dropdown", ""],
              spanMethodCode: ["Span Method", "dropdown", ""],
              mecValue: ["MEC Value", "input", ""],
              mpcValue: ["MPC Value", "input", ""],
              mpfValue: ["MPF Value", "input", ""],
              spanValue: ["Span Value", "input", ""],
              fullScaleRange: ["Full Scale Range", "input", ""],
              spanUnitsOfMeasureCode: ["Span Units of Measure", "dropdown", ""],
              scaleTransitionPoint: ["Scale Transition Point", "input", ""],
              defaultHighRange: ["Default High Range", "input", ""],
              flowSpanValue: ["Flow Span Value", "input", ""],
              flowFullScaleRange: ["Flow Full Scale Range", "input", ""],
              skip: ["", "skip", ""],
            }}
            controlDatePickerInputs={{
              beginDate: ["Start Date", "date", ""],
              beginHour: ["Start Time", "time", ""],
              endDate: ["End Date", "date", ""],
              endHour: ["End Time", "time", ""],
            }}
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
          <DataTableFuelData
            matsTableHandler={matsTableHandler}
            locationSelectValue={parseInt(locationSelect[1])}
            selectedLocation={locations.find(
              (element) => element.id === locationSelect[1]
            )}
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
          <DataTableUnitControl
            matsTableHandler={matsTableHandler}
            locationSelectValue={parseInt(locationSelect[1])}
            selectedLocation={locations.find(
              (element) => element.id === locationSelect[1]
            )}
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
