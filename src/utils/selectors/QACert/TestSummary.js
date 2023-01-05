export const getTestSummary = (data, colTitles) => {
  const records = [];
  if (!colTitles) {
    data.forEach((el) => {
      const endDate = el.endDate
        ? formatStringToDate(el.endDate.toString())
        : "";
      const endHour = el.endHour ? el.endHour.toString() : "";

      const endMinute = el.endMinute ? el.endMinute.toString() : "";
      records.push({
        id: el.id,
        locationId: el.locationId,
        col1: el.testTypeCode,
        col2:
          el.stackPipeId !== null
            ? el.stackPipeId
            : el.unitId !== null
              ? el.unitId
              : "",
        col3: el.componentId,
        col4: el.testNumber,
        col5: el.testReasonCode,
        col6: el.testResultCode,
        col7: endDate,
        col8: endHour,
        col9: endMinute,
      });
    });
  }

  if (colTitles) {
    for (const curData of data) {
      const { id, locationId } = curData;
      const columnDef = { id, locationId };
      // loop through column titles and assign data to column index based on column title
      for (const [index, colTitle] of colTitles.entries()) {
        const colIndex = index + 1;
        const colKey = `col${colIndex}`;
        // get corresponding dto key based on column title
        const dtoKey = mapTestSummaryColTitleToDTOKey(colTitle);
        let colValue = curData[dtoKey];
        // special cases
        switch (colTitle) {
          case "End Date":
            colValue = curData.endDate
              ? formatStringToDate(curData.endDate.toString())
              : "";
            break;
          case "End Hour":
            colValue = curData?.endHour?.toString() ?? "";
            break;
          case "End Minute":
            colValue = curData?.endMinute?.toString() ?? "";
            break;
          case "Unit or Stack Pipe ID":
            colValue = curData.unitId ?? curData.stackPipeId;
            break;
          default:
        }
        columnDef[colKey] = colValue;
      }
      records.push(columnDef);
    }
  }
  return records;
};

// year - month - day to  month / day/ year
const formatStringToDate = (date) => {
  let parts;

  parts = date.split("-");

  return `${parts[1]}/${parts[2]}/${parts[0]}`;
};

const colTitleToDtoKeyMap = {
  "Test Type Code": "testTypeCode",
  "Monitoring System ID": "monitoringSystemID",
  "Component ID": "componentID",
  "Span Scale Code": "spanScaleCode",
  "Test Number": "testNumber",
  "Test Reason Code": "testReasonCode",
  "Test Description": "testDescription",
  "Test Result Code": "testResultCode",
  "Begin Date": "beginDate",
  "Begin Hour": "beginHour",
  "Begin Minute": "beginMinute",
  "End Date": "endDate",
  "End Hour": "endHour",
  "End Minute": "endMinute",
  "Grace Period Indicator": "gracePeriodIndicator",
  Year: "year",
  Quarter: "quarter",
  "Injection Protocol Code": "injectionProtocolCode",
  "Test Comment": "testComment",
};

const mapTestSummaryColTitleToDTOKey = (columnTitle) => {
  return colTitleToDtoKeyMap[columnTitle];
};

export const getLinearitySummaryRecords = (data) => {
  const records = [];
  data.forEach((el) => {
    records.push({
      id: el.id,
      testSumId: el.testSumId,
      col1: el.gasLevelCode,
      col2: el.meanMeasuredValue,
      col3: el.meanReferenceValue,
      col4: el.percentError,
      col5: el.apsIndicator === 1 ? "Yes" : "No",
    });
  });
  return records;
};

export const getEmptyRows = (columns) => {
  let obj = {};
  columns.forEach((c, i) => {
    obj[`col${i + 1}`] = "";
  });
  return [obj];
};

export const getProtocolGasRecords = (data) => {
  const records = [];
  data.forEach((el) => {
    records.push({
      id: el.id,
      testSumId: el.testSumId,
      col1: el.gasLevelCode,
      col2: el.gasTypeCode,
      col3: el.cylinderIdentifier,
      col4: el.vendorIdentifier,
      col5: el.expirationDate ? formatStringToDate(el.expirationDate) : "",
    });
  });
  return records;
};

//2nd level
export const getRataDataRecords = (data) => {
  const records = [];
  data.forEach((el) => {
    records.push({
      id: el.id,
      testSumId: el.testSumId,
      col1: el.numberOfLoadLevels,
      col2: el.relativeAccuracy,
      col3: el.rataFrequencyCode,
      col4: el.overallBiasAdjustmentFactor,
    });
  });
  return records;
};
// 3rd level
export const mapRataSummaryToRows = (data) => {
  const records = [];
  for (const el of data) {
    const row = {
      id: el.id,
      rataId: el.rataId,
      col1: el.operatingLevelCode,
      col2: el.referenceMethodCode,
      col3: el.apsIndicator === 1 ? "Yes" : "No",
      col4: el.apsCode,
      col5: el.relativeAccuracy,
      col6: el.co2OrO2ReferenceMethodCode,
    };
    records.push(row);
  }

  return records;
};
//4th level
export const getRataRunDataRecords = (data) => {
  const records = [];
  data.forEach((el) => {
    const endDate = el.endDate ? formatStringToDate(el.endDate.toString()) : "";
    const endHour = el.endHour ? el.endHour.toString() : "";

    const endMinute = el.endMinute ? el.endMinute.toString() : "";

    const beginDate = el.endDate
      ? formatStringToDate(el.endDate.toString())
      : "";
    const beginHour = el.endHour ? el.endHour.toString() : "";

    const beginMinute = el.endMinute ? el.endMinute.toString() : "";
    records.push({
      id: el.id,
      rataSumId: el.rataSumId,
      col1: el.runNumber,
      col2: beginDate,
      col3: beginHour,
      col4: beginMinute,
      col5: endDate,
      col6: endHour,
      col7: endMinute,
      col8: el.cemValue,
      col9: el.rataReferenceValue,
      col10: el.grossUnitLoad,
      col11: el.runStatusCode,
    });
  });
  return records;
};

export const getAirEmissionsRecords = (data) => {
  const records = [];
  data.forEach((el) => {
    records.push({
      id: el.id,
      testSumId: el.testSumId,
      col1: el.qiLastName,
      col2: el.qiFirstName,
      col3: el.qiMiddleInitial,
      col4: el.aetbName,
      col5: el.aetbPhoneNumber,
      col6: el.aetbEmail,
      col7: el.examDate,
      col8: el.providerName,
      col9: el.providerEmail,
    });
  });
  return records;
};

export const getFlowRunRecords = (data) => {
  const records = [];
  data.forEach((el) => {
    records.push({
      id: el.id,
      rataRunId: el.rataRunId,
      col1: el.numberOfTraversePoints,
      col2: el.barometricPressure,
      col3: el.staticStackPressure,
      col4: el.percentCO2,
      col5: el.percentO2,
      col6: el.percentMoisture,
      col7: el.dryMolecularWeight,
      col8: el.wetMolecularWeight,
      col9: el.averageVelocityWithoutWallEffects,
      col10: el.averageVelocityWithWallEffects,
      col11: el.calculatedWAF,
      col12: el.averageStackFlowRate,
    });
  });
  return records;
};

export const mapRataTraverseToRows = (data) => {
  const records = [];
  for (const el of data) {
    const row = {
      id: el.id,
      col1: el.probeId,
      col2: el.probeTypeCode,
      col3: el.pressureMeasureCode,
      col4: el.methodTraversePointId,
      col5: el.velocityCalibrationCoefficient,
      col6: el.lastProbeDate,
      col7: el.avgVelDiffPressure,
      col8: el.avgSquareVelDiffPressure,
      col9: el.tStackTemperature,
      col10: el.pointUsedIndicator,
      col11: el.numberWallEffectsPoints,
      col12: el.yawAngle,
      col13: el.pitchAngle,
      col14: el.calculatedVelocity,
      col15: el.replacementVelocity,
    };
    records.push(row);
  }
  return records;
};

export const mapTestQualificationToRows = (data) => {
  const records = [];
  data.forEach((el) => {
    records.push({
      id: el.id,
      testSumId: el.testSumId,
      col1: el.testClaimCode,
      col2: el.beginDate ? formatStringToDate(el.beginDate) : "",
      col3: el.endDate ? formatStringToDate(el.endDate) : "",
      col4: el.highLoadPercentage,
      col5: el.midLoadPercentage,
      col6: el.lowLoadPercentage,
    });
  });
  return records;
};

export const getAppendixECorrelationSummaryRecords = (data) => {
  const records = [];
  data.forEach((el) => {
    records.push({
      id: el.id,
      testSumId: el.testSumId,
      col1: el.operatingLevelForRun,
      col2: el.meanReferenceValue,
      col3: el.averageHourlyHeatInputRate,
      col4: el.fFactor,
    });
  });
  return records;
};

export const mapFuelFlowToLoadToRows = (data) => {
  const records = [];
  for (const el of data) {
    const row = {
      id: el.id,
      col1: el.testBasisCode,
      col2: el.averageDifference,
      col3: el.numberOfHoursUsed,
      col4: el.numberOfHoursExcludedCofiring,
      col5: el.numberOfHoursExcludedRamping,
      col6: el.numberOfHoursExcludedLowRange,
    };
    records.push(row);
  }
  return records;
};

export const mapFuelFlowToLoadBaselineToRows = (data) => {
  const records = [];
  for (const el of data) {
    const row = {
      id: el.id,
      col1: el.accuracyTestNumber,
      col2: el.peiTestNumber,
      col3: el.averageFuelFlowRate,
      col4: el.averageLoad,
      col5: el.baselineFuelFlowToLoadRatio,
      col6: el.fuelFlowToLoadUOMCode,
      col7: el.averageHourlyHeatInputRate,
      col8: el.baselineGHR,
      col9: el.ghrUnitsOfMeasureCode,
      col10: el.numberOfHoursExcludedCofiring,
      col11: el.numberOfHoursExcludedRamping,
      col12: el.numberOfHoursExcludedLowRange,
    };
    records.push(row);
  }
  return records;
}

export const mapAppendixECorrTestRunsToRows = (data) => {
  const records = [];
  for (const el of data) {
    const row = {
      id: el.id,
      col1: el.runNumber,
      col2: el.referenceValue,
      col3: el.hourlyHeatInputRate,
      col4: el.totalHeatInput,
      col5: el.responseTime,
      col6: el.beginDate ? formatStringToDate(el.beginDate) : "",
      col7: el.beginHour,
      col8: el.beginMinute,
      col9: el.endDate ? formatStringToDate(el.endDate) : "",
      col10: el.endHour,
      col11: el.endMinute,
    };
    records.push(row);
  }
  return records;
};

export const mapAppendixECorrHeatInputGasToRows = (data) => {
  const records = [];
  for (const el of data) {
    const row = {
      id: el.id,
      col1: el.gasGCV === 0 ? "0" : el.gasGCV,
      col2: el.gasVolume === 0 ? "0" : el.gasVolume,
      col3: el.gasHeatInput === 0 ? "0" : el.gasHeatInput,
    };
    records.push(row);
  }
  return records
}

export const mapAppendixECorrHeatInputOilToRows = (data) => {
  const records = []
  for (const el of data) {
    const row = {
      id: el.id,
      col1: el.monitoringSystemID,
      col2: el.oilMass,
      col3: el.oilGCV,
      col4: el.oilGCVUnitsOfMeasureCode,
      col5: el.oilHeatInput,
      col6: el.oilVolume,
      col7: el.oilVolumeUnitsOfMeasureCode,
      col8: el.oilDensity,
      col9: el.oilDensityUnitsOfMeasureCode,
    }
    records.push(row)
  }
  return records
}

export const mapFlowToLoadCheckToRows = (data) => {
  const records = [];
  for (const el of data) {
    const row = {
      id: el.id,
      col1: el.testBasisCode,
      col2: el.biasAdjustedIndicator,
      col3: el.averageAbsolutePercentDifference,
      col4: el.numberOfHours,
      col5: el.numberOfHoursExcludedForFuel,
      col6: el.numberOfHoursExcludedForRamping,
      col7: el.numberOfHoursExcludedForBypass,
      col8: el.numberOfHoursExcludedPreRata,
      col9: el.numberOfHoursExcludedTest,
      col10: el.numberOfHoursExcludedForMainAndBypass,
      col11: el.operatingLevelCode,
    };
    records.push(row);
  }
  return records;
};

export const mapCalibrationInjectionsToRows = (data) => {
  const records = [];
  for (const el of data) {
    const row = {
      id: el.id,
      col1: el.onLineOffLineIndicator === 1 ? "Yes" : "No",
      col2: el.upscaleGasLevelCode,
      col3: el.zeroInjectionDate,
      col4: el.zeroInjectionHour,
      col5: el.zeroInjectionMinute,
      col6: el.upscaleInjectionDate,
      col7: el.upscaleInjectionHour,
      col8: el.upscaleInjectionMinute,
      col9: el.zeroMeasuredValue,
      col10: el.upscaleMeasuredValue,
      col11: el.zeroAPSIndicator === 1 ? "Yes" : "No",
      col12: el.upscaleAPSIndicator === 1 ? "Yes" : "No",
      col13: el.zeroCalibrationError,
      col14: el.upscaleCalibrationError,
      col15: el.zeroReferenceValue,
      col16: el.upscaleReferenceValue,
    };
    records.push(row);
  }
  return records;
};

export const mapFuelFlowmeterAccuracyDataToRows = (data) => {
  const records = [];
  for (const el of data) {
    const row = {
      id: el.id,
      col1: el.accuracyTestMethodCode,
      col2: el.lowFuelAccuracy,
      col3: el.midFuelAccuracy,
      col4: el.highFuelAccuracy,
      col5: el.reinstallationDate ? new Date(el.reinstallationDate).toLocaleDateString('en-US', { timeZone: 'UTC' }) : el.reinstallationDate,
      col6: el.reinstallationHour,
    };
    records.push(row);
  }
  return records;
};

export const mapTransmitterTransducerAccuracyDataToRows = (data) => {
  const records = [];
  for (const el of data) {
    const row = {
      id: el.id,
      col1: el.lowLevelAccuracy,
      col2: el.lowLevelAccuracySpecCode,
      col3: el.midLevelAccuracy,
      col4: el.midLevelAccuracySpecCode,
      col5: el.highLevelAccuracy,
      col6: el.highLevelAccuracySpecCode,
    };
    records.push(row);
  }
  return records;
};

export const mapOnOffCalToRows = (data) => {
  const records = [];
  for (const el of data) {
    const row = {
      id: el.id,
      col1: el.onlineZeroReferenceValue,
      col2: el.onlineUpscaleReferenceValue,
      col3: el.offlineZeroReferenceValue,
      col4: el.offlineUpscaleReferenceValue,
      col5: el.onlineZeroMeasuredValue,
      col6: el.onlineUpscaleMeasuredValue,
      col7: el.offlineZeroMeasuredValue,
      col8: el.offlineUpscaleMeasuredValue,
      col9: el.onlineZeroCalibrationError,
      col10: el.onlineUpscaleCalibrationError,
      col11: el.offlineZeroCalibrationError,
      col12: el.offlineUpscaleCalibrationError,
      col13: el.upscaleGasLevelCode,
      col14: el.onlineZeroAPSIndicator === 1 ? 'Yes' : 'No',
      col15: el.onlineUpscaleAPSIndicator === 1 ? 'Yes' : 'No',
      col16: el.offlineZeroAPSIndicator === 1 ? 'Yes' : 'No',
      col17: el.offlineUpscaleAPSIndicator === 1 ? 'Yes' : 'No',
      col18: el.onlineZeroInjectionDate,
      col19: el.onlineUpscaleInjectionDate,
      col20: el.offlineZeroInjectionDate,
      col21: el.offlineUpscaleInjectionDate,
      col22: el.onlineZeroInjectionHour,
      col23: el.onlineUpscaleInjectionHour,
      col24: el.offlineZeroInjectionHour,
      col25: el.offlineUpscaleInjectionHour,
    };
    records.push(row);
  }
  return records;
};

export const mapCycleTimeSummariesToRows = (data) => {
  const records = [];
  for (const el of data) {
    const row = {
      id: el.id,
      testSumId: el.testSumId,
      col1: el.totalTime,
    };
    records.push(row)
  }
  return records;
};

export const mapFlowToLoadReferenceToRows = (data) => {
  const records = [];
  for (const el of data) {
    const row = {
      id: el.id,
      col1: el.rataTestNumber,
      col2: el.operatingLevelCode,
      col3: el.averageGrossUnitLoad,
      col4: el.averageReferenceMethodFlow,
      col5: el.referenceFlowToLoadRatio,
      col6: el.averageHourlyHeatInputRate,
      col7: el.referenceGrossHeatRate,
      col8: el.calculatedSeparateReferenceIndicator,
    };
    records.push(row)
  }
  return records;
}

export const mapUnitDefaultTestDataToRows = (data) => {
  const records = [];
  for (const el of data) {
    const row = {
      id: el.id,
      col1: el.fuelCode,
      col2: el.NOxDefaultRate,
      col3: el.operatingConditionCode,
      col4: el.groupID,
      col5: el.numberOfUnitsInGroup,
      col6: el.numberOfTestsForGroup,
    };
    records.push(row)
  }
  return records;
}

export const mapHgSummaryDataToRows = (data) => {
  const records = [];
  for (const el of data) {
    const row = {
      id: el.id,
      col1: el.gasLevelCode,
      col2: el.meanMeasuredValue,
      col3: el.meanReferenceValue,
      col4: el.percentError,
      col5: el.apsIndicator === 1 ? "Yes" : "No",
    };
    records.push(row)
  }
  return records;
}


export const getListOfRadioControls = (controlInputs) => {
  const result = [];
  const keys = Object.keys(controlInputs);
  keys.forEach(key => {
    if (controlInputs[key][1] === "radio") {
      result.push(key)
    }
  });
  return result;
};

// Show aria-label for any action (View, Edit, Remove) in any table provided a unique Id based on table type
export const getTableRowActionAriaLabel = (dataTableName, row, action) => {
  let result;
  switch (dataTableName) {
    case 'Test Summary Data'://unique ID is test number, i.e. col4
      result = `${action} for ${row.col4}`;
      break;
    default:
      result = `not implemented yet`;
      break;
  }
  return result;
}