export const defaultsDataTableProps = (location) => {
  return {
    payload: {
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
    },
    dropdownArray: [
      [
        "parameterCode",
        "defaultUnitsOfMeasureCode",
        "fuelCode",
        "operatingConditionCode",
        "defaultSourceCode",
        "defaultPurposeCode",
        "prefilteredDefaults",
      ],
    ],
    columnNames: [
      "Parameter Code",
      "Units of Measure",
      "Purpose",
      "Fuel Code",
      "Operating Condition",
      "Source of Value",
      "Begin Date and Time",
      "End Date and Time",
    ],
    controlInputs: {
      parameterCode: ["Parameter", "mainDropdown", "", ""],
      defaultValue: ["Default Value", "input", "", ""],
      defaultUnitsOfMeasureCode: ["Units of Measure", "dropdown", "", ""],
      defaultPurposeCode: ["Purpose", "dropdown", "", ""],
      fuelCode: ["Fuel Code", "dropdown", "", ""],
      operatingConditionCode: ["Operating Condition", "dropdown", "", ""],
      defaultSourceCode: ["Source of Value", "dropdown", "", ""],
      groupId: ["Group ID", "input", "", ""],
      // skip: ["", "skip", "" , ""],
    },
    controlDatePickerInputs: {
      beginDate: ["Start Date", "date", "", ""],
      beginHour: ["Start Time", "time", "", ""],
      endDate: ["End Date", "date", "", ""],
      endHour: ["End Time", "time", "", ""],
    },
  };
};

export const formulasDataTableProps = (location) => {
  return {
    payload: {
      formulaId: "string",
      parameterCode: "string",
      formulaCode: "string",
      formulaText: "string",
      beginDate: "2021-10-21T17:12:00.643Z",
      beginHour: 0,
      endDate: "2021-10-21T17:12:00.643Z",
      endHour: 0,
    },
    dropdownArray: [["parameterCode", "formulaCode", "prefilteredFormulas"]],
    columnNames: [
      "Formula ID",
      "Parameter",
      "Formula Code",
      "Formula",
      "Begin Date and Time",
      "End Date and Time",
    ],
    controlInputs: {
      formulaId: ["Formula ID", "input", "", ""],
      parameterCode: ["Parameter", "mainDropdown", "", ""],
      formulaCode: ["Formula Code", "dropdown", "", ""],
      formulaText: ["Formula", "input", "", ""],
    },
    controlDatePickerInputs: {
      beginDate: ["Start Date", "date", "", ""],
      beginHour: ["Start Time", "time", "", ""],
      endDate: ["End Date", "date", "", ""],
      endHour: ["End Time", "time", "", ""],
    },
  };
};

export const loadsDataTableProps = (location) => {
  return {
    payload: {
      locationId: location[1],
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
    },
    dropdownArray: [
      [
        "maximumLoadUnitsOfMeasureCode",
        "normalLevelCode",
        "secondLevelCode",
        "prefilteredLoads",
      ],
    ],
    columnNames: [
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
    ],
    controlInputs: {
      maximumLoadValue: ["Maximum Load Value", "input", "", ""],
      maximumLoadUnitsOfMeasureCode: [
        "Maximum Load Units of Measure",
        "independentDropdown",
        "",
        "",
      ],
      lowerOperationBoundary: ["Lower Operation Boundary", "input", "", ""],
      upperOperationBoundary: ["Upper Operation Boundary", "input", "", ""],
      normalLevelCode: ["Normal Level", "independentDropdown", "", ""],
      secondLevelCode: ["Second Level", "independentDropdown", "", ""],
      secondNormalIndicator: ["Second Normal Indicator", "radio", "", ""],
    },
    controlDatePickerInputs: {
      loadAnalysisDate: ["Load Analysis Date", "date", "", ""],
      beginDate: ["Start Date", "date", "", ""],
      beginHour: ["Start Time", "time", "", ""],
      endDate: ["End Date", "date", "", ""],
      endHour: ["End Time", "time", "", ""],
    },
  };
};

export const rectWAFsDataTableProps = (location) => {
  return {
    payload: {
      locationId: location,
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
    },
    dropdownArray: [["wafMethodCode"]],
    columnNames: [
      "WAF Determination Date",
      "WAF Method",
      "Begin Date and Time",
      "End Date and Time",
    ],
    controlInputs: {
      wafMethodCode: ["WAF Method", "dropdown", "", ""],
      wafValue: ["WAF Value", "input", "", ""],
      numberOfTestRuns: ["Number of Test Runs", "input", "", ""],
      numberOfTraversePointsWaf: [
        "Number of Traverse Points WAF",
        "input",
        "",
        "",
      ],
      numberOfTestPorts: ["Number of Test Ports", "input", "", ""],
      numberOfTraversePointsRef: [
        "Number of Traverse Points Reference",
        "input",
        "",
      ],
      ductWidth: ["Duct Width", "input", "", ""],
      ductDepth: ["Duct Depth", "input", "", ""],
    },
    controlDatePickerInputs: {
      wafDeterminationDate: ["WAF Determination Date", "date", "", ""],
      skip: ["", "skip", "", ""],
      wafBeginDate: ["Start Date", "date", "", ""],
      wafBeginHour: ["Start Time", "time", "", ""],
      wafEndDate: ["End Date", "date", "", ""],
      wafEndHour: ["End Time", "time", "", ""],
    },
  };
};

//   export const DataTableProps = (location) => {
//     return {
//       payload: {

//       },
//       dropdownArray: [

//       ],
//       columnNames: [

//       ],
//       controlInputs: {

//       },
//       controlDatePickerInputs: {

//       },
//     };
//   };
export const spanDataTableProps = (location) => {
  return {
    payload: {
      locationId: location,
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
    },
    dropdownArray: [
      [
        "componentTypeCode",
        "spanScaleCode",
        "spanMethodCode",
        "spanUnitsOfMeasureCode",
        "prefilteredSpans",
      ],
    ],
    columnNames: [
      "Component Type",
      "Span Scale",
      "Span Method",
      "Span Units of Measure",
      "Begin Date and Time",
      "End Date and Time",
    ],
    controlInputs: {
      componentTypeCode: ["Component Type", "mainDropdown", "", ""],
      spanScaleCode: ["Span Scale", "dropdown", "", ""],
      spanMethodCode: ["Span Method", "dropdown", "", ""],
      mecValue: ["MEC Value", "input", "", ""],
      mpcValue: ["MPC Value", "input", "", ""],
      mpfValue: ["MPF Value", "input", "", ""],
      spanValue: ["Span Value", "input", "", ""],
      fullScaleRange: ["Full Scale Range", "input", "", ""],
      spanUnitsOfMeasureCode: ["Span Units of Measure", "dropdown", "", ""],
      scaleTransitionPoint: ["Scale Transition Point", "input", "", ""],
      defaultHighRange: ["Default High Range", "input", "", ""],
      flowSpanValue: ["Flow Span Value", "input", "", ""],
      flowFullScaleRange: ["Flow Full Scale Range", "input", "", ""],
      skip: ["", "skip", "", ""],
    },
    controlDatePickerInputs: {
      beginDate: ["Start Date", "date", "", ""],
      beginHour: ["Start Time", "time", "", ""],
      endDate: ["End Date", "date", "", ""],
      endHour: ["End Time", "time", "", ""],
    },
  };
};

export const unitControlDataTableProps = (location, selectedLocation) => {
  return {
    payload: {
      locationId: location,
      id: null,
      parameterCode: null,
      controlCode: null,
      originalCode: 0,
      seasonalControlsIndicator: 0,
      installDate: null,
      optimizationDate: null,
      retireDate: null,
    },
    dropdownArray: [
      ["controlEquipParamCode", "controlCode", "prefilteredUnitControls"],
    ],
    columnNames: [
      "Equipment Parameter Code",
      "Control Code",
      "Original Code",
      "Install Date",
      "Optimization Date",
      "Seasonal Controls Indicator",
      "Retire Date",
    ],
    controlInputs: {
      controlEquipParamCode: [
        "Equipment Parameter Code",
        "mainDropdown",
        "",
        "",
      ],
      controlCode: ["Control Code", "dropdown", "", ""],
      originalCode: ["Original Code", "radio", "", ""],
      seasonalControlsIndicator: [
        "Seasonal Controls Indicator",
        "radio",
        "",
        "",
      ],
    },
    controlDatePickerInputs: {
      installDate: ["Install Date", "date", "", ""],
      optimizationDate: ["Optimization Date", "date", "", ""],
      retireDate: ["Retire Date", "date", "", ""],
    },
    urlParameters: {
      locId: selectedLocation.id,
      unitRecordId: selectedLocation.unitRecordId,
      unitControlId: location,
    },
  };
};

export const unitFuelDataTableProps = (selectedLocation) => {
  return {
    payload: {
      locationId: selectedLocation["id"],
      unitRecordId: selectedLocation["unitRecordId"],
      id: null,
      fuelCode: null,
      indicatorCode: null,
      ozoneSeasonIndicator: 0,
      demGCV: null,
      demSO2: null,
      beginDate: null,
      endDate: null,
    },
    dropdownArray: [
      ["fuelType", "indicatorCode", "demGCV", "demSO2", "prefilteredUnitFuels"],
      true,
    ],
    columnNames: [
      "Fuel Type",
      "Indicator Code",
      "Ozone Season Indicator",
      "Dem GCV",
      "Dem SO2",
      "Start Date",
      "End Date",
    ],
    controlInputs: {
      fuelCode: ["Fuel Type", "dropdown", "", ""],
      indicatorCode: ["Indicator Code", "independentDropdown", "", ""],
      ozoneSeasonIndicator: ["Ozone Season Indicator", "radio", "", ""],
      demGCV: ["Dem GCV", "independentDropdown", "", ""],
      demSO2: ["Dem SO2", "independentDropdown", "", ""],
    },
    controlDatePickerInputs: {
      beginDate: ["Start Date", "date", "", ""],
      endDate: ["End Date", "date", "", ""],
    },
  };
};

export const unitCapacityDataTableProps = (location, selectedLocation) => {
  return {
    payload: {
      maximumHourlyHeatInputCapacity: 0,
      beginDate: "2021-11-03T05:45:28.844Z",
      endDate: "2021-11-03T05:45:28.844Z",
    },
    dropdownArray: [[]],
    columnNames: [
      "Commercial Operation Date",
      "Operation Date",
      "Boiler/Turbine Type",
      "Boiler/Turbine Begin Date",
      "Boiler/Turbine End Date",
      "Maximum Hourly Heat Input Capacity",
      "Start Date",
      "End Date",
    ],
    controlInputs: {
      commercialOperationDate: [
        "Commercial Operation Date",
        "date",
        "",
        "locked",
      ],
      operationDate: ["Operation Date", "date", "", "locked"],
      boilerTurbineType: ["Boiler/Turbine Type", "input", "", "locked"],

      skip: ["", "skip", "", ""],
      boilerTurbineBeginDate: [
        "Boiler/Turbine Begin Date",
        "date",
        "",
        "locked",
      ],
      boilerTurbineEndDate: ["Boiler/Turbine End Date", "date", "", "locked"],
      maximumHourlyHeatInputCapacity: [
        "Maximum Hourly Heat Input Capacity",
        "input",
        "",
      ],
    },
    controlDatePickerInputs: {
      skip: ["", "skip", "", ""],
      beginDate: ["Start Date", "date", "", ""],
      endDate: ["End Date", "date", "", ""],
    },
    urlParameters: {
      locId: selectedLocation.id,
      unitRecordId: selectedLocation.unitRecordId,
      unitCapacityId: location,
    },
  };
};

export const locationAttributesDataTableProps = (location) => {
  return {
    payload: {
      ductIndicator: 0,
      bypassIndicator: 0,
      groundElevation: 0,
      stackHeight: 0,
      materialCode: "string",
      shapeCode: "string",
      crossAreaFlow: 0,
      crossAreaStackExit: 0,
      beginDate: "2021-11-29T14:35:56.711Z",
      endDate: "2021-11-29T14:35:56.711Z",
    },
    dropdownArray: [["materialCode", "shapeCode"]],
    columnNames: [
      "Duct Indicator",
      "Bypass Indicator",
      "Ground Elevation",
      "Stack Height",
      "Material Code",
      "Shape Code",
      "Cross Area Flow",
      "Cross Area Stack Exit",
      "Start Date",
      "End Date",
    ],
    controlInputs: {
      ductIndicator: ["Duct Indicator", "radio", "", ""],
      bypassIndicator: ["Bypass Indicator", "radio", "", ""],
      groundElevation: ["Ground Elevation", "input", ""],
      stackHeight: ["Stack Height", "input", "", ""],
      materialCode: ["Material Code", "dropdown", "", ""],
      shapeCode: ["Shape Code", "dropdown", "", ""],
      crossAreaFlow: ["Cross Area Flow", "input", "", ""],
      crossAreaStackExit: ["Cross Area Stack Exit", "input", "", ""],
    },
    controlDatePickerInputs: {
      beginDate: ["Start Date", "date", "", ""],
      endDate: ["End Date", "date", "", ""],
    },
  };
};

export const relationshipDataTableProps = (location) => {
  return {
    payload: {
      unitId: "1",
      stackPipeId: "MDC-CCB8D6D0D4E34D24A99C01DCD14078DF",
      beginDate: "1995-01-01T00:00:00.000Z",
      endDate: null,
    },
    dropdownArray: [[]],
    columnNames: ["Stack Pipe Name", "Unit ID", "Start Date", "End Date"],
    controlInputs: {
      stackPipeId: ["Stack Pipe Name", "input", ""],
      unitId: ["Unit ID", "input", "", ""],
    },
    controlDatePickerInputs: {
      beginDate: ["Start Date", "dateTime", "", ""],
      endDate: ["End Date", "dateTime", "", ""],
    },
  };
};
