export const qaProtocalGasProps = (selectedRow) => {
  return {
    dataTableName: "Protocol Gas",
    payload: {
      gasLevelCode: selectedRow.gasLevelCode,
      gasTypeCode: null,
      cylinderID: null,
      vendorID: null,
      expirationDate: null,
    },
    dropdownArray: ["gasLevelCode", "gasTypeCode"],
    columnNames: [
      "Gas Level Code",
      "Gas Type Code",
      "Cylinder ID",
      "Vendor ID",
      "Expiration Date",
    ],
    controlInputs: {
      gasLevelCode: ["Summary Type/Gas Level Code", "input", "", "locked"],
      gasTypeCode: ["Gas Type Code", "dropdown", "", ""],
      cylinderID: ["Cylinder ID", "input", "", ""],
      vendorID: ["Vendor ID", "input", "", ""],
      expirationDate: ["Expiration Date", "date", "", ""],
      skip: ["", "skip", "", ""],
    },
    controlDatePickerInputs: {},
    extraControls: {},
  };
};

export const qaLinearitySummaryProps = (selectedRow) => {
  return {
    dataTableName: "Linearity Test",
    payload: {
      // gasLevelCode: selectedRow.gasLevelCode,
      meanMeasuredValue: 0,
      meanReferenceValue: 0,
      percentError: 0,
      apsIndicator: 0,
    },
    dropdownArray: ["gasLevelCode", "gasTypeCode"],
    columnNames: [
      "Gas Level Code",
      "Mean Measured Value",
      "Mean Reference Value",
      "Percent Error",
      "APS Indicator",
    ],
    controlInputs: {
      gasLevelCode: ["Gas Level Code", "dropdown", "", "locked"],
      meanMeasuredValue: ["Mean Measured Value", "input", "", ""],
      meanReferenceValue: ["Mean Reference Value", "input", "", ""],
      percentError: ["Percent Error", "input", "", ""],
      apsIndicator: ["APS Indicator", "radio", "", ""],
      skip: ["", "skip", "", ""],
    },
    controlDatePickerInputs: {},
    extraControls: {},
    radioBtnPayload: ["apsIndicator"],
  };
};

export const qaLinearityInjectionProps = () => {
  return {
    dataTableName: "Linearity Injection",
    payload: {
      injectionDate: "",
      injectionHour: 0,
      injectionMinute: 0,
      measuredValue: 0,
      referenceValue: 0,
    },
    dropdownArray: ["gasLevelCode", "gasTypeCode"],
    columnNames: [
      "Injection Date",
      "Injection Hour",
      "Injection Minute",
      "Measured Value",
      "Reference Value",
    ],
    controlInputs: {},
    controlDatePickerInputs: {
      injectionDate: ["Injection Date", "date", "", ""],
      injectionHour: ["Injection Hour", "hourDropdown", "dropdown", ""],
      injectionMinute: ["Injection Minute", "minuteDropdown", "dropdown", ""],
    },
    extraControls: {
      measuredValue: ["Measured Value", "input", "", ""],
      referenceValue: ["Reference Value", "input", "", ""],
      skip: ["", "skip", "", ""],
    },
  };
};

export const qaRataDataProps = () => {
  return {
    dataTableName: "RATA Data",
    payload: {},
    dropdownArray: ["rataFrequencyCode"],
    columnNames: [
      "Number of Load Levels",
      "Relative Accuracy",
      "RATA Frequency Code",
      "Overall Bias Adjustment Factor",
    ],
    controlInputs: {
      numberOfLoadLevels: ["Number of Load Levels", "dropdown", "", ""],
      relativeAccuracy: ["Relative Accuracy", "input", "", ""],
      rataFrequencyCode: ["RATA Frequency Code", "dropdown", "", ""],
      overallBiasAdjustmentFactor: [
        "Overall Bias Adjustment Factor",
        "input",
        "",
        "",
      ],
    },
    controlDatePickerInputs: {},
    extraControls: false,
  };
};

export const qaRataRunDataProps = () => {
  return {
    dataTableName: "RATA Run Data",
    payload: {},
    dropdownArray: ["runStatusCode"],
    columnNames: [
      "Run Number",
      "Begin Date ",
      "Begin Hour",
      "Begin Minute",
      "End Date",
      "End Hour ",
      "End Minute",
      "CEM Value",
      "RATA Reference Value",
      "Gross Unit Load ",
      "Run Status Code ",
    ],
    controlInputs: {
      runNumber: ["Run Number", "input", "", ""],
      skip: ["", "skip", "", ""],

    },
    controlDatePickerInputs: {
      beginDate: ["Begin Date", "date", "", ""],
      beginHour: ["Begin Hour", "hourDropdown", "dropdown", ""],
      beginMinute: ["Begin Minute", "minuteDropdown", "dropdown", ""],
      endDate: ["End Date", "date", "", ""],
      endHour: ["End Hour", "hourDropdown", "dropdown", ""],
      endMinute: ["End Minute", "minuteDropdown", "dropdown", ""],
    },
    extraControls: {
      cemValue: ["CEM Value", "input", "", ""],
      rataReferenceValue: ["RATA Reference Value", "input", "", ""],
      grossUnitLoad: ["Gross Unit Load ", "input", "", ""],
      runStatusCode: ["Run Status Code", "dropdown", "", ""],
    },
  };
};

export const qaRataSummaryProps = () => {
  return {
    dataTableName: "RATA Summary",
    payload: {},
    dropdownArray: [
      "operatingLevelCode",
      "referenceMethodCode",
      "apsCode",
      "co2OrO2ReferenceMethodCode",
    ],
    columnNames: [
      "Operating Level Code",
      "Reference Method Code",
      "APS Indicator",
      "APS Code",
      "Relative Accuracy",
      "CO2 or O2 Reference Method Code",
    ],
    controlInputs: {
      operatingLevelCode: ["Operating Level Code", "dropdown", "", ""],
      averageGrossUnitLoad: ["Average Gross Unit Load", "input", "", ""],
      referenceMethodCode: ["Reference Method Code", "dropdown", "", ""],
      meanCEMValue: ["Mean CEM Value", "input", "", ""],
      meanRATAReferenceValue: ["Mean RATA Reference Value", "input", "", ""],
      meanDifference: ["Mean Difference", "input", "", ""],
      standardDeviationDifference: [
        "Standard Deviation Difference",
        "input",
        "",
        "",
      ],
      confidenceCoefficient: ["Confidence Coefficient", "input", "", ""],
      tValue: ["T-Value", "input", "", ""],
      apsIndicator: ["APS Indicator", "radio", "", ""],
      apsCode: ["APS Code", "dropdown", "", ""],
      relativeAccuracy: ["Relative Accuracy", "input", "", ""],
      biasAdjustmentFactor: ["Bias Adjustment Factor", "input", "", ""],
      co2OrO2ReferenceMethodCode: [
        "CO2 or O2 Reference Method Code",
        "dropdown",
        "",
        "",
      ],
      stackDiameter: ["Stack Diameter", "input", "", ""],
      stackArea: ["Stack Area", "input", "", ""],
      numberOfTraversePoints: ["Number of Traverse Points", "input", "", ""],
      calculatedWAF: ["Calculated WAF", "input", "", ""],
    },
    controlDatePickerInputs: {},
    extraControls: {},
    radioBtnPayload: ["apsIndicator"],
  };
};

export const qaRataTraverseProps = () => {
  return {
    dataTableName: "RATA Traverse Data",
    payload: {},
    dropdownArray: [
      'probeTypeCode',
      'pressureMeasureCode',
      'pointUsedIndicator'
    ],
    columnNames: [
      "Probe ID",
      "Probe Type Code",
      "Pressure Measure Code",
      "Method Traverse Point ID",
      "Velocity Calibration Coefficient",
      "Last Probe Date",
      "Avg Vel Diff Pressure",
      "Avg Square Vel Diff Pressures",
      "T Stack Temperature",
      "Point Used Indicator",
      "Number of Wall Effects Points",
      "Yaw Angle",
      "Pitch Angle",
      "Calculated Velocity",
      "Replacement Velocity",
    ],
    controlInputs: {
      probeID: ["Probe ID", "input", "", ""],
      probeTypeCode: ["Probe Type Code", "dropdown", "", ""],
      pressureMeasureCode: ["Pressure Measure Code", "dropdown", "", ""],
      methodTraversePointID: ["Method Traverse Point ID", "input", "", ""],
      velocityCalibrationCoefficient: ["Velocity Calibration Coefficient", "input", "", ""],
      // lastProbeDate is text + date picker
      // lastProbeDate: ["Last Probe Date", "date", "", ""],
      avgVelDiffPressure: ["Avg Vel Diff Pressure", "input", "", ""],
      avgSquareVelDiffPressures: ["Avg Square Vel Diff Pressures", "input", "", ""],
      tStackTemperature: ["T Stack Temperature", "input", "", ""],
      pointUsedIndicator: ["Point Used Indicator", "dropdown", "", ""],
      numberOfWallEffectsPoints: ["Number of Wall Effects Points", "input", "", ""],
      yawAngle: ["Yaw Angle", "input", "", ""],
      pitchAngle: ["Pitch Angle", "input", "", ""],
      calculatedVelocity: ["Calculated Velocity", "input", "", ""],
      replacementVelocity: ["Replacement Velocity", "input", "", ""]
    },
  };
}
