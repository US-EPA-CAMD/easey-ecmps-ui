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
      col3: el.cylinderID,
      col4: el.vendorID,
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
      col12: el.averageStackFlowRate
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
}

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

export const mapFuelFlowToLoadToRows = (data) => {
  const records = []
  for (const el of data) {
    const row = {
      id: el.id,
      col1: el.testBasisCode,
      col2: el.averageDifference,
      col3: el.numberOfHoursUsed,
      col4: el.numberOfHoursExcludedCofiring,
      col5: el.numberOfHoursExcludedRamping,
      col6: el.numberOfHoursExcludedLowRange,

    }
    records.push(row)
  }
  return records
}
