export const qaProtocalGasProps = (selectedRow) => {
  return {
    dataTableName: "Protocol Gas",
    payload: {
      gasLevelCode: selectedRow.gasLevelCode,
      gasTypeCode: null,
      cylinderIdentifier: null,
      vendorIdentifier: null,
      expirationDate: null,
    },
    dropdownArray: ["gasLevelCode", "gasTypeCode"],
    columnNames: [
      "Gas Level Code",
      "Gas Type Code",
      "Cylinder Identification",
      "Vendor Identification",
      "Expiration Date",
    ],
    controlInputs: {
      gasLevelCode: ["Gas Level Code", "dropdown", "", ""],
      gasTypeCode: ["Gas Type Code", "dropdown", "", ""],
      cylinderIdentifier: ["Cylinder Identification", "input", "", ""],
      vendorIdentifier: ["Vendor Identification", "input", "", ""],
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
      probeId: ["Probe ID", "input", "", ""],
      probeTypeCode: ["Probe Type Code", "dropdown", "", ""],
      pressureMeasureCode: ["Pressure Measure Code", "dropdown", "", ""],
      methodTraversePointId: ["Method Traverse Point ID", "input", "", ""],
      velocityCalibrationCoefficient: ["Velocity Calibration Coefficient", "input", "", ""],
      lastProbeDate: ["Last Probe Date", "date", "", ""],
      avgVelDiffPressure: ["Avg Vel Diff Pressure", "input", "", ""],
      avgSquareVelDiffPressure: ["Avg Square Vel Diff Pressures", "input", "", ""],
      tStackTemperature: ["T Stack Temperature", "input", "", ""],
      pointUsedIndicator: ["Point Used Indicator", "dropdown", "", ""],
      numberWallEffectsPoints: ["Number of Wall Effects Points", "input", "", ""],
      yawAngle: ["Yaw Angle", "input", "", ""],
      pitchAngle: ["Pitch Angle", "input", "", ""],
      calculatedVelocity: ["Calculated Velocity", "input", "", ""],
      replacementVelocity: ["Replacement Velocity", "input", "", ""]
    },
  };
}

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
    dataTableName: "Flow",
    payload: {
      numberOfTraversePoints: null,
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
      dryMolecularWeight: ["Dry Molecular Weight", "input", "", ""],
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

export const qaTestQualificationProps = (selectedRow) => {
  return {
    dataTableName: "Test Qualification",
    payload: {
      testClaimCode: selectedRow.testClaimCode,
      beginDate: null,
      endDate: null,
      highLoadPercentage: null,
      midLoadPercentage: null,
      lowLoadPercentage: null
    },
    dropdownArray: ["testClaimCode"],
    mdmProps: [
      {
        codeTable: "test-claim-codes",
        responseProps: {
          code: "testClaimCode",
          description: "testClaimDescription"
        }
      }
    ],
    columnNames: [
      "Test Claim Code",
      "Begin Date",
      "End Date",
      "High Load Percentage",
      "Mid Load Percentage",
      "Low Load Percentage"
    ],
    controlInputs: {
      testClaimCode: ["Test Claim Code", "dropdown", "", ""],
      beginDate: ["Begin Date", "date", "", ""],
      endDate: ["End Date", "date", "", ""],
      highLoadPercentage: ["High Load Percentage", "input", "", ""],
      midLoadPercentage: ["Mid Load Percentage", "input", "", ""],
      lowLoadPercentage: ["Low Load Percentage", "input", "", ""],
    },
    controlDatePickerInputs: {},
    extraControls: {},
  };
};

export const qaAppendixECorrelationSummaryTestProps = (selectedRow) => {
  return {
    dataTableName: "Appendix E Correlation Summary",
    payload: {
      operatingLevelForRun: 0,
      meanReferenceValue: 0,
      averageHourlyHeatInputRate: 0,
      fFactor: 0,
    },
    dropdownArray: [],
    columnNames: [
      "Operating Level For Run",
      "Mean Reference Value",
      "Average Hourly Heat Input Rate",
      "F-Factor",
    ],
    controlInputs: {
      operatingLevelForRun: ["Operating Level For Run", "input", "", ""],
      meanReferenceValue: ["Mean Reference Value", "input", "", ""],
      averageHourlyHeatInputRate: ["Average Hourly Heat Input Rate", "input", "", ""],
      fFactor: ["F-Factor", "input", "", ""],
    },
    controlDatePickerInputs: {},
    extraControls: {},
  };
};

export const qaAppendixECorrelationSummaryHeatInputGasProps = (selectedRow) => {
  return {
    dataTableName: "Appendix E Correlation Heat Input from Gas",
    payload: {
      gasGCV: 0,
      gasVolume: 0,
      gasHeatInput: 0,
      monitoringSystemID: "string",
    },
    dropdownArray: [],
    columnNames: [
      "Gas GCV",
      "Gas Volume",
      "Gas Heat Input",
    ],
    controlInputs: {
      gasGCV: ["Gas GCV", "input", "", ""],
      gasVolume: ["Gas Volume", "input", "", ""],
      gasHeatInput: ["Gas Heat Input", "input", "", ""],
    },
    controlDatePickerInputs: {},
    extraControls: {},
  };
};

export const qaAppendixECorrelationSummaryHeatInputOilProps = (selectedRow) => {
  return {
    dataTableName: "Appendix E Correlation Heat Input from Oil",
    payload: {
      monitoringSystemID: null,
      oilMass: null,
      oilGCV: null,
      oilGCVUnitsOfMeasureCode: null,
      oilHeatInput: null,
      oilVolume: null,
      oilVolumeUnitsOfMeasureCode: null,
      oilDensity: null,
      oilDensityUnitsOfMeasureCode: null,
    },
    dropdownArray: [
      'monitoringSystemID',
      'oilGCVUnitsOfMeasureCode',
      'oilVolumeUnitsOfMeasureCode',
      'oilDensityUnitsOfMeasureCode',
    ],
    columnNames: [
      "Monitoring System ID",
      "Oil Mass",
      "Oil GCV",
      "Oil GCV Units of Measure Code",
      "Oil Heat Input",
      "Oil Volume",
      "Oil Volume Units of Measure Code",
      "Oil Density",
      "Oil Density Units of Measure Code",
    ],
    controlInputs: {
      monitoringSystemID: ["Monitoring System ID", "dropdown", "", ""],
      oilMass: ["Oil Mass", "input", "", ""],
      oilGCV: ["Oil GCV", "input", "", ""],
      oilGCVUnitsOfMeasureCode: ["Oil GCV Units of Measure Code", "dropdown", "", ""],
      oilHeatInput: ["Oil Heat Input", "input", "", ""],
      oilVolume: ["Oil Volume", "input", "", ""],
      oilVolumeUnitsOfMeasureCode: ["Oil Volume Units of Measure Code", "dropdown", "", ""],
      oilDensity: ["Oil Density", "input", "", ""],
      oilDensityUnitsOfMeasureCode: ["Oil Density Units of Measure Code", "dropdown", "", ""],
    },
    controlDatePickerInputs: {},
    extraControls: {},
  };
};

export const qaFuelFlowToLoadProps = () => {
  return {
    dataTableName: "Fuel Flow to Load",
    payload: {},
    dropdownArray: [
      'testBasisCode',
    ],
    mdmProps: [
      {
        codeTable: "test-basis-codes",
        responseProps: {
          code: "testBasisCode",
          description: "testBasisDescription"
        }
      }
    ],
    columnNames: [
      "Test Basis Code",
      "Average Difference",
      "Number of Hours Used",
      "Number of Hours Excluded Co-firing",
      "Number of Hours Excluded Ramping",
      "Number of Hours Excluded Low Range",
    ],
    controlInputs: {
      testBasisCode: ["Test Basis Code", "dropdown", "", ""],
      averageDifference: ["Average Difference", "input", "", ""],
      numberOfHoursUsed: ["Number of Hours Used", "input", "", ""],
      numberOfHoursExcludedCofiring: ["Number of Hours Excluded Co-firing", "input", "", ""],
      numberOfHoursExcludedRamping: ["Number of Hours Excluded Ramping", "input", "", ""],
      numberOfHoursExcludedLowRange: ["Number of Hours Excluded Low Range", "input", "", ""],
    },
  };
}

export const qaFuelFlowToLoadBaselineProps = () => {
  return {
    dataTableName: "Fuel Flow to Load Baseline",
    payload: {},
    dropdownArray: [
      'fuelFlowToLoadUOMCode',
    ],
    mdmProps: [
      {
        codeTable: "units-of-measure-codes",
        responseProps: {
          code: "unitOfMeasureCode",
          description: "unitOfMeasureDescription"
        }
      }
    ],
    columnNames: [
      "Accuracy Test Number",
      "PEI Test Number",
      "Average Fuel Flow Rate",
      "Average Load",
      "Baseline Fuel Flow-to-Load Ratio",
      "Fuel Flow-to-Load UOM Code",
      "Average Hourly Heat Input Rate",
      "Baseline GHR",
      "GHR UOM Code",
      "Number of Hours Excluded Co-firing",
      "Number of Hours Excluded Ramping",
      "Number of Hours Excluded Low Range"
    ],
    controlInputs: {
      accuracyTestNumber: ["Accuracy Test Number", "input", "", ""],
      peiTestNumber: ["PEI Test Number", "input", "", ""],
      averageFuelFlowRate: ["Average Fuel Flow Rate", "input", "", ""],
      averageLoad: ["Average Load", "input", "", ""],
      baselineFuelFlowToLoadRatio: ["Baseline Fuel Flow-to-Load Ratio", "input", "", ""],
      fuelFlowToLoadUOMCode: ["Fuel Flow-to-Load UOM Code", "dropdown", "", ""],
      averageHourlyHeatInputRate: ["Average Hourly Heat Input Rate", "input", "", ""],
      baselineGHR: ["Baseline GHR", "input", "", ""],
      ghrUnitsOfMeasureCode: ["GHR UOM Code", "input", "", ""],
      numberOfHoursExcludedCofiring: ["Number of Hours Excluded Co-firing", "input", "", ""],
      numberOfHoursExcludedRamping: ["Number of Hours Excluded Ramping", "input", "", ""],
      numberOfHoursExcludedLowRange: ["Number of Hours Excluded Low Range", "input", "", ""],
    },
  };
}

export const qaAppendixECorrTestRunProps = () => {
  return {
    dataTableName: "Appendix E Correlation Run",
    payload: {},
    dropdownArray: [],
    columnNames: [
      "Run Number",
      "Reference Value",
      "Hourly Heat Input Rate",
      "Total Heat Input",
      "Response Time",
      "Begin Date ",
      "Begin Hour",
      "Begin Minute",
      "End Date",
      "End Hour ",
      "End Minute",
    ],
    controlInputs: {
      runNumber: ["Run Number", "input", "", ""],
      referenceValue: ["RATA Reference Value", "input", "", ""],
      hourlyHeatInputRate: ["Hourly Heat Input Rate", "input", "", ""],
      totalHeatInput: ["Total Heat Input", "input", "", ""],
      responseTime: ["Response Time", "input", "", ""],
    },
    controlDatePickerInputs: {
      beginDate: ["Begin Date", "date", "", ""],
      beginHour: ["Begin Hour", "hourDropdown", "dropdown", ""],
      beginMinute: ["Begin Minute", "minuteDropdown", "dropdown", ""],
      endDate: ["End Date", "date", "", ""],
      endHour: ["End Hour", "hourDropdown", "dropdown", ""],
      endMinute: ["End Minute", "minuteDropdown", "dropdown", ""],
    },
    extraControls: {},
  };
};

export const qaFlowToLoadCheckProps = () => {
  return {
    dataTableName: "Flow To Load Check",
    payload: {},
    dropdownArray: [
      'testBasisCode', 'operatingLevelCode', 'biasAdjustedIndicator'
    ],
    mdmProps: [
      {
        codeTable: "test-basis-codes",
        responseProps: {
          code: "testBasisCode",
          description: "testBasisDescription"
        }
      },
      {
        codeTable: "operating-level-codes",
        responseProps: {
          code: "opLevelCode",
          description: "opLevelDescription"
        }
      }
    ],
    columnNames: [
      "Test Basis Code",
      "Bias Adjusted Indicator",
      "Average Absolute Percent Difference",
      "Number of Hours",
      "Number of Hours Excluded for Fuel",
      "Number of Hours Excluded for Ramping",
      "Number of Hours Excluded for Bypass",
      "Number of Hours Excluded Pre RATA",
      "Number of Hours Excluded Test",
      "Number of Hours Excluded for  Main and Bypass",
      "Operating Level Code",
    ],
    controlInputs: {
      testBasisCode: ["Test Basis Code", "dropdown", "", ""],
      biasAdjustedIndicator: ["Bias Adjusted Indicator", "dropdown", "", ""],
      averageAbsolutePercentDifference: ["Average Absolute Percent Difference", "input", "", ""],
      numberOfHours: ["Number of Hours", "input", "", ""],
      numberOfHoursExcludedForFuel: ["Number of Hours Excluded for Fuel", "input", "", ""],
      numberOfHoursExcludedForRamping: ["Number of Hours Excluded for Ramping", "input", "", ""],
      numberOfHoursExcludedForBypass: ["Number of Hours Excluded for Bypass", "input", "", ""],
      numberOfHoursExcludedPreRata: ["Number of Hours Excluded Pre RATA", "input", "", ""],
      numberOfHoursExcludedTest: ["Number of Hours Excluded Test", "input", "", ""],
      numberOfHoursExcludedForMainAndBypass: ["Number of Hours Excluded for Main and Bypass", "input", "", ""],
      operatingLevelCode: ["Operating Level Code", "dropdown", "", ""],
    },
  };
}

export const qaFuelFlowmeterAccuracyDataProps = () => {
  return {
    dataTableName: "Fuel Flowmeter Accuracy Data",
    payload: {},
    dropdownArray: ["accuracyTestMethodCode"],
    mdmProps: [
      {
        codeTable: "accuracy-test-method-codes",
        responseProps: {
          code: "accuracyTestMethodCode",
          description: "accuracyTestMethodDescription"
        }
      },
    ],
    columnNames: [
      "Accuracy Test Method Code",
      "Low Fuel Accuracy",
      "Mid Fuel Accuracy",
      "High Fuel Accuracy",
      "Reinstallation Date",
      "Reinstallation Hour",
    ],
    controlInputs: {
      accuracyTestMethodCode: ["Accuracy Test Method Code", "dropdown", "", ""],
      lowFuelAccuracy: ["Low Fuel Accuracy", "input", "", ""],
      midFuelAccuracy: ["Mid Fuel Accuracy", "input", "", ""],
      highFuelAccuracy: ["High Fuel Accuracy", "input", "", ""],
    },
    controlDatePickerInputs: {
      reinstallationDate: ["Reinstallation Date", "date", "", ""],
      reinstallationHour: ["Reinstallation Hour", "hourDropdown", "", ""],
    }
  }
}

export const qaTransmitterTransducerAccuracyDataProps = () => {
  return {
    dataTableName: "Transmitter Transducer Accuracy Data",
    payload: {},
    dropdownArray: ["lowLevelAccuracySpecCode", "midLevelAccuracySpecCode", "highLevelAccuracySpecCode"],
    mdmProps: [
      {
        codeTable: "accuracy-spec-codes",
        responseProps: {
          code: "accuracySpecCode",
          description: "accuracySpecDescription"
        }
      },
    ],
    columnNames: [
      "Low Level Accuracy",
      "Low Level Accuracy Spec Code",
      "Mid Level Accuracy",
      "Mid Level Accuracy Spec Code",
      "High Level Accuracy",
      "High Level Accuracy Spec Code",
    ],
    controlInputs: {
      lowLevelAccuracy: ["Low Level Accuracy", "input", "", ""],
      lowLevelAccuracySpecCode: ["Low Level Accuracy Spec Code", "dropdown", "", ""],
      midLevelAccuracy: ["Mid Level Accuracy", "input", "", ""],
      midLevelAccuracySpecCode: ["Mid Level Accuracy Spec Code", "dropdown", "", ""],
      highLevelAccuracy: ["High Level Accuracy", "input", "", ""],
      highLevelAccuracySpecCode: ["High Level Accuracy Spec Code", "dropdown", "", ""],
    },
    controlDatePickerInputs: {},
  }
}

export const qaOnOffCalibrationProps = () => {
  return {
    dataTableName: "Online Offline Calibration",
    payload: {},
    dropdownArray: ["upscaleGasLevelCode"],
    mdmProps: [
      {
        codeTable: "gas-level-codes",
        responseProps: {
          code: "gasLevelCode",
          description: "gasLevelDescription"
        }
      },
    ],
    columnNames: [
      "Online Zero Reference Value",
      "Online Upscale Reference Value",
      "Offline Zero Reference Value",
      "Offline Upscale Reference Value",
      "Online Zero Measured Value",
      "Online Upscale Measured Value",
      "Offline Zero Measured Value",
      "Offline Upscale Measured Value",
      "Online Zero Calibration Error",
      "Online Upscale Calibration Error",
      "Offline Zero Calibration Error",
      "Offline Upscale Calibration Error",
      "Upscale Gas Level Code",
      "Online Zero APS Indicator",
      "Online Upscale APS Indicator",
      "Offline Zero APS Indicator",
      "Offline Upscale APS Indicator",
      "Online Zero Injection Date",
      "Online Upscale Injection Date",
      "Offline Zero Injection Date",
      "Offline Upscale Injection Date",
      "Online Zero Injection Hour",
      "Online Upscale Injection Hour",
      "Offline Zero Injection Hour",
      "Offline Upscale Injection Hour",
    ],
    controlInputs: {
      // --- Input ---
      onlineZeroReferenceValue: ["Online Zero Reference Value", "input", "", ""],
      onlineUpscaleReferenceValue: ["Online Upscale Reference Value", "input", "", ""],
      offlineZeroReferenceValue: ["Offline Zero Reference Value", "input", "", ""],
      offlineUpscaleReferenceValue: ["Offline Upscale Reference Value", "input", "", ""],
      onlineZeroMeasuredValue: ["Online Zero Measured Value", "input", "", ""],
      onlineUpscaleMeasuredValue: ["Online Upscale Measured Value", "input", "", ""],
      offlineZeroMeasuredValue: ["Offline Zero Measured Value", "input", "", ""],
      offlineUpscaleMeasuredValue: ["Offline Upscale Measured Value", "input", "", ""],
      onlineZeroCalibrationError: ["Online Zero Calibration Error", "input", "", ""],
      onlineUpscaleCalibrationError: ["Online Upscale Calibration Error", "input", "", ""],
      offlineZeroCalibrationError: ["Offline Zero Calibration Error", "input", "", ""],
      offlineUpscaleCalibrationError: ["Offline Upscale Calibration Error", "input", "", ""],

      // --- Dropdowns ---
      upscaleGasLevelCode: ["Upscale Gas Level Code", "dropdown", "", ""],
      onlineZeroAPSIndicator: ["Online Zero APS Indicator", "radio", "", "", { defaultValue: 1 }],
      onlineUpscaleAPSIndicator: ["Online Upscale APS Indicator", "radio", "", "", { defaultValue: 1 }],
      offlineZeroAPSIndicator: ["Offline Zero APS Indicator", "radio", "", "", { defaultValue: 1 }],
      offlineUpscaleAPSIndicator: ["Offline Upscale APS Indicator", "radio", "", "", { defaultValue: 1 }],
    },
    controlDatePickerInputs: {
      onlineZeroInjectionDate: ["Online Zero Injection Date", "date", "", ""],
      onlineUpscaleInjectionDate: ["Online Upscale Injection Date", "date", "", ""],
      offlineZeroInjectionDate: ["Offline Zero Injection Date", "date", "", ""],
      offlineUpscaleInjectionDate: ["Offline Upscale Injection Date", "date", "", ""],
      onlineZeroInjectionHour: ["Online Zero Injection Hour", "hourDropdown", "dropdown", ""],
      onlineUpscaleInjectionHour: ["Online Upscale Injection Hour", "hourDropdown", "dropdown", ""],
      offlineZeroInjectionHour: ["Offline Zero Injection Hour", "hourDropdown", "dropdown", ""],
      offlineUpscaleInjectionHour: ["Offline Upscale Injection Hour", "hourDropdown", "dropdown", ""],
    },
  };
}

export const qaCalibrationInjectionProps = () => {
  return {
    dataTableName: "Calibration Injection",
    payload: {},
    dropdownArray: [
      'upscaleGasLevelCode'
    ],
    mdmProps: [
      {
        codeTable: "gas-level-codes",
        responseProps: {
          code: "gasLevelCode",
          description: "gasLevelDescription"
        }
      }
    ],
    columnNames: [
      "Online Offline Indicator",
      "Upscale Gas Level Code",
      "Zero Injection Date",
      "Zero Injection Hour",
      "Zero Injection Minute",
      "Upscale Injection Date",
      "Upscale Injection Hour",
      "Upscale Injection Minute",
      "Zero Measured Value",
      "Upscale Measured Value",
      "Zero APS Indicator",
      "Upscale APS Indicator",
      "Zero Calibration Error",
      "Upscale Calibration Error",
      "Zero Reference Value",
      "Upscale Reference Value"
    ],
    controlInputs: {
      onLineOffLineIndicator: ["Online Offline Indicator", "radio", "", ""],
      upscaleGasLevelCode: ["Upscale Gas Level Code", "dropdown", "", ""],
      zeroMeasuredValue: ["Zero Measured Value", "input", "", ""],
      upscaleMeasuredValue: ["Upscale Measured Value", "input", "", ""],
      zeroAPSIndicator: ["Zero APS Indicator", "radio", "", ""],
      upscaleAPSIndicator: ["Upscale APS Indicator", "radio", "", ""],
      zeroCalibrationError: ["Zero Calibration Error", "input", "", ""],
      upscaleCalibrationError: ["Upscale Calibration Error", "input", "", ""],
      zeroReferenceValue: ["Zero Reference Value", "input", "", ""],
      upscaleReferenceValue: ["Upscale Reference Value", "input", "", ""],
    },
    controlDatePickerInputs: {
      zeroInjectionDate: ["Zero Injection Date", "date", "", ""],
      zeroInjectionHour: ["Zero Injection Hour", "hourDropdown", "dropdown", ""],
      zeroInjectionMinute: ["Zero Injection Minute", "minuteDropdown", "dropdown", ""],
      upscaleInjectionDate: ["Upscale Injection Date", "date", "", ""],
      upscaleInjectionHour: ["Upscale Injection Hour", "hourDropdown", "dropdown", ""],
      upscaleInjectionMinute: ["Upscale Injection Minute", "minuteDropdown", "dropdown", ""],
    },
    radioBtnPayload: ["onLineOffLineIndicator", "zeroAPSIndicator", "upscaleAPSIndicator"],
    extraControls: {},
  };
}

export const qaCycleTimeSummaryProps = () => {
  return {
    dataTableName: "Cycle Time Summary",
    payload: {},
    dropdownArray: [],
    columnNames: [
      "Total Time"
    ],
    controlInputs: {
      totalTime: ["Total Time", "input", "", ""],
    },
    extraControls: {},
  }
}

export const qaCycleTimeInjectionProps = () => {
  return {
    dataTableName: "Cycle Time Injection",
    payload: {},
    dropdownArray: ["gasLevelCode", "gasTypeCode"],
    mdmProps: [
      {
        codeTable: "gas-level-codes",
        responseProps: {
          code: "gasLevelCode",
          description: "gasLevelDescription"
        }
      },
    ],
    columnNames: [
      "Gas Level Code",
      "Calibration Gas Value",
      "Begin Date",
      "Begin Hour",
      "Begin Minute",
      "End Date",
      "End Hour",
      "End Minute",
      "Injection Cycle Time",
      "Begin Monitor Value",
      "End Monitor Value"
    ],
    controlInputs: {
      gasLevelCode: ["Gas Level Code", "dropdown", "", ""],
      calibrationGasValue: ["Calibration Gas Value", "input", "", ""],
      injectionCycleTime: ["Injection Cycle Time", "input", "", ""],
      beginMonitorValue: ["Begin Monitor Value", "input", "", ""],
      endMonitorValue: ["End Monitor Value", "input", "", ""],
    },

    controlDatePickerInputs: {
      beginDate:["Begin Date", "date", "", ""],
      beginHour:["Begin Hour", "hourDropdown", "dropdown", ""],
      beginMinute:["Begin Minute", "minuteDropdown", "", ""],
      endDate:["End Date", "date", "", ""],
      endHour:["End Hour", "hourDropdown", "dropdown", ""],
      endMinute:["End Minute", "minuteDropdown", "dropdown", ""],
    },

    extraControls: {},
  }
}

export const qaFlowToLoadReferenceProps = () => {
  return {
    dataTableName: "Flow To Load Reference",
    payload: {},
    dropdownArray: [
      'rataTestNumber',
      'operatingLevelCode',
      'calculatedSeparateReferenceIndicator',
    ],
    // mdmProps: [
    //   {
    //     codeTable: "operating-level-codes",
    //     responseProps: {
    //       code: "opLevelCode",
    //       description: "opLevelDescription"
    //     }
    //   }
    // ],
    columnNames: [
      "RATA Test Number",
      "Operating Level Code",
      "Average Gross Unit Load",
      "Average Reference Method Flow",
      "Reference Flow Load Ratio",
      "Average Hourly Heat Input Rate",
      "Reference Gross Heat Rate",
      "Calculated Separate Reference Indicator",
    ],
    controlInputs: {
      rataTestNumber: ["RATA Test Number", "dropdown", "", ""],
      operatingLevelCode: ["Operating Level Code", "dropdown", "", ""],
      averageGrossUnitLoad: ["Average Gross Unit Load", "input", "", ""],
      averageReferenceMethodFlow: ["Average Reference Method Flow", "input", "", ""],
      referenceFlowToLoadRatio: ["Reference Flow Load Ratio", "input", "", ""],
      averageHourlyHeatInputRate: ["Average Hourly Heat Input Rate", "input", "", ""],
      referenceGrossHeatRate: ["Reference Gross Heat Rate", "input", "", ""],
      calculatedSeparateReferenceIndicator: ["Calculated Separate Reference Indicator", "dropdown", "", ""],
    },
  };
}

export const qaUnitDefaultTestDataProps = () => {
  return {
    dataTableName: "Unit Default Test",
    payload: {},
    dropdownArray: ["fuelCode", "operatingConditionCode"],
    mdmProps: [
      {
        codeTable: "fuel-codes",
        responseProps: {
          code: "fuelCode",
          description: "fuelDescription"
        }
      },
      {
        codeTable: "operating-condition-codes",
        responseProps: {
          code: "operatingConditionCode",
          description: "operatingConditionDescription"
        }
      }
    ],
    columnNames: [
      "Fuel Code",
      "NOX Default Rate",
      "Operating Condition Code",
      "Group ID",
      "Number of Units in Group",
      "Number of Tests for Group",
    ],
    controlInputs: {
      fuelCode: ["Fuel Code", "dropdown", "", ""],
      NOxDefaultRate: ["NOX Default Rate", "input", "", ""],
      operatingConditionCode: ["Operating Condition Code", "dropdown", "", ""],
      groupID: ["Group ID", "input", "", ""],
      numberOfUnitsInGroup: ["Number of Units in Group", "input", "", ""],
      numberOfTestsForGroup: ["Number of Tests for Group", "input", "", ""],
    },
    controlDatePickerInputs: {},
  }
}

export const qaUnitDefaultTestRunDataProps = () => {
  return {
    dataTableName: "Unit Default Test Run",
    payload: {},
    dropdownArray: ["runUsedIndicator"],
    mdmProps: [],
    columnNames: [
      "Operating Level for Run",
      "Run Number",
      "Begin Date",
      "Begin Hour",
      "Begin Minute",
      "End Date",
      "End Hour",
      "End Minute",
      "Response Time",
      "Reference Value",
      "Run Used Indicator"
    ],
    controlInputs: {
      operatingLevel: ["Operating Level for Run", "input", "", ""],
      runNumber: ["Run Number", "input", "", ""],
      responseTime: ["Response Time", "input", "", ""],
      referenceValue: ["Reference Value", "input", "", ""],
      runUsedIndicator: ["Run Used Indicator", "dropdown", "", ""],
    },
    controlDatePickerInputs: {
      beginDate:["Begin Date", "date", "", ""],
      beginHour:["Begin Hour", "hourDropdown", "dropdown", ""],
      beginMinute:["Begin Minute", "minuteDropdown", "", ""],
      endDate:["End Date", "date", "", ""],
      endHour:["End Hour", "hourDropdown", "dropdown", ""],
      endMinute:["End Minute", "minuteDropdown", "dropdown", ""],
    },
  }
}

export const qaHgSummaryDataProps = () => {
  return {
    dataTableName: "Hg Summary",
    payload: {},
    dropdownArray: ["gasLevelCode"],
    mdmProps: [
      {
        codeTable: "gas-level-codes",
        responseProps: {
          code: "gasLevelCode",
          description: "gasLevelDescription"
        }
      },
    ],
    columnNames: [
      "Gas Level Code",
      "Mean Measured Value",
      "Mean Reference Value",
      "Percent Error",
      "APS Indicator",
    ],
    controlInputs: {
      gasLevelCode: ["Gas Level Code", "dropdown", "", ""],
      meanMeasuredValue: ["Mean Measured Value", "input", "", ""],
      meanReferenceValue: ["Mean Reference Value", "input", "", ""],
      percentError: ["Percent Error", "input", "", ""],
      apsIndicator: ["APS Indicator", "radio", "", ""],
    },
    controlDatePickerInputs: {},
  }
}

export const qaHgInjectionDataProps = () => {
  return {
    dataTableName: "Hg Injection",
    payload: {},
    dropdownArray: [],
    mdmProps: [],
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
