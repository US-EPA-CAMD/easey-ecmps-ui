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
      gasLevelCode: ["Summary Type/Gas Level Code", "dropdown", "", ""],
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
    payload: {
      operatingLevelCode: "string",
      averageGrossUnitLoad: 0,
      referenceMethodCode: "string",
      meanCEMValue: 0,
      meanRATAReferenceValue: 0,
      meanDifference: 0,
      standardDeviationDifference: 0,
      confidenceCoefficient: 0,
      tValue: 0,
      apsIndicator: 0,
      apsCode: "string",
      relativeAccuracy: 0,
      biasAdjustmentFactor: 0,
      co2OrO2ReferenceMethodCode: "string",
      stackDiameter: 0,
      stackArea: 0,
      numberOfTraversePoints: 0,
      calculatedWAF: 0,
      defaultWAF: 0,
    },
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

export const qaAirEmissionsProps = () => {
  return {
    dataTableName: "Air Emissions",
    payload: {
      qiLastName: null,
      qiFirstName: null,
      qiMiddleInitial: null,
      aetbName: null,
      aetbPhoneNumber: null,
      aetbEmail: null,
      examDate: null,
      providerName: null,
      providerEmail: null,
    },
    dropdownArray: [],
    columnNames: [
      "QI Last Name",
      "QI First Name",
      "QI Middle Initial",
      "AETB Name",
      "AETB Phone Number",
      "AETB Email",
      "Exam Date",
      "Provider Name",
      "Provider Email",
    ],
    controlInputs: {
      qiLastName: ["QI Last Name", "input", "", ""],
      qiFirstName: ["QI First Name", "input", "", ""],
      qiMiddleInitial: ["QI Middle Initial", "input", "", ""],
      aetbName: ["AETB Name", "input", "", ""],
      aetbPhoneNumber: ["AETB Phone Number", "input", "", ""],
      aetbEmail: ["AETB Email", "input", "", ""],
      examDate: ["Exam Date", "date", "", ""],
      providerName: ["Provider Name", "input", "", ""],
      providerEmail: ["Provider Email", "input", "", ""],
    },
    controlDatePickerInputs: {},
    extraControls: {},
  };
};

export const qaFlowRataRunProps = () => {
  return {
    dataTableName: "Flow Rata Run Data",
    payload: {
      numberOfTraversePoints: 0,
      barometricPressure: 0,
      staticStackPressure: 0,
      percentCO2: 0,
      percentO2: 0,
      percentMoisture: 0,
      dryMolecularWeight: 0,
      wetMolecularWeight: 0,
      averageVelocityWithoutWallEffects: 0,
      averageVelocityWithWallEffects: 0,
      calculatedWAF: 0,
      averageStackFlowRate: 0,
    },
    dropdownArray: [],
    columnNames: [
      "Number of Traverse Points",
      "Barometric Pressure",
      "Stack Static Pressure",
      "Percent CO2",
      "Percent O2",
      "Percent Moisture",
      "Dry Molecular Weight",
      "Wet Molecular Weight",
      "Average Velocity without Wall Effects",
      "Average Velocity with Wall Effects",
      "Calculated WAF",
      "Average Stack Flow Rate",
    ],
    controlInputs: {
      numberOfTraversePoints: ["Number of Traverse Points", "input", "", ""],
      barometricPressure: ["Barometric Pressure", "input", "", ""],
      staticStackPressure: ["Stack Static Pressure", "input", "", ""],
      percentCO2: ["Percent CO2", "input", "", ""],
      percentO2: ["Percent O2", "input", "", ""],
      percentMoisture: ["Percent Moisture", "input", "", ""],
      dryMolecularWeight: ["Dry Molecular Weight", "date", "", ""],
      wetMolecularWeight: ["Wet Molecular Weight", "input", "", ""],
      averageVelocityWithoutWallEffects: ["Average Velocity without Wall Effects", "input", "", ""],
      averageVelocityWithWallEffects: ["Average Velocity with Wall Effects", "input", "", ""],
      calculatedWAF: ["Calculated WAF", "input", "", ""],
      averageStackFlowRate: ["Average Stack Flow Rate", "input", "", ""],
    },
    controlDatePickerInputs: {},
    extraControls: {},
  };
};

export const qaTraverseRataRunProps = () => {
  return {
    dataTableName: "RATA Traverse Data",
    payload: {
      numberOfTraversePoints: 0,
      barometricPressure: null,
      staticStackPressure: null,
      percentCO2: null,
      percentO2: null,
      percentMoisture: null,
      dryMolecularWeight: null,
      wetMolecularWeight: null,
      averageVelocityWithoutWallEffects: null,
      averageVelocityWithWallEffects: null,
      calculatedWAF: null,
      averageStackFlowRate: null,
    },
    dropdownArray: [],
    columnNames: [
      "Probe ID",
      "Probe Type Code",
      "Pressure Measure Code",
      "Method Traverse Point ID",
      "Velocity Calibration Coefficiant",
      "Last Probe Date",
      "Average Vel Diff Pressure",
      "Average Square Vel Diff Pressure",
      "T Stack Temperature",
      "Point Used Indicator",
      "Number of Wall Effects Points",
      "Yaw Angle",
      "Pitch Angle",
      "Calculated Velocity",
      "Calculated Calc Velocity",
      "Replacement Velocity",
      
    ],
    controlInputs: {
      probeID: ["Probe ID", "input", "", ""],
      probeTypeCode: ["Probe Type Code", "dropdown", "", ""],
      pressureMeasureCode: ["Pressure Measure Code", "dropdown", "", ""],
      methodTraversePointId: ["Method Traverse Point ID", "input", "", ""],
      velocityCalibrationCoefficiant: ["Velocity Calibration Coefficiant", "input", "", ""],
      lastProbeDate: ["Last Probe Date", "date", "", ""],
      averageVelocityDifferencePressure: ["Average Vel Diff Pressure", "input", "", ""],
      averageSquareVelocityDifferencePressure: ["Average Square Vel Diff Pressure", "input", "", ""],
      tStackTemperature: ["T Stack Temperature", "input", "", ""],
      pointsUsedIndicator: ["Points Used Indicator", "dropdown", "", ""],
      yawAngle: ["Yaw Angle", "input", "", ""],
      pitchAngle: ["Pitch Angle", "input", "", ""],
      calculatedVelocity: ["Calculated Velocity", "input", "", ""],
      calculatedCalcVelocity: ["Calculated Calc Velocity", "input", "", ""],
      replacementVelocity: ["Replacement Velocity", "input", "", ""],
    },
    controlDatePickerInputs: {},
    extraControls: {},
  };
};

