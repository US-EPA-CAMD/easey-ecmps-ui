export const getLinearitySummary = (totalData) => {
  //   const data = totalData;
  const records = [];
  let data = [1, 2];
  data.forEach((el) => {
    // const beginDate = el.beginDate
    //   ? formatStringToDate(el.beginDate.toString())
    //   : "";
    // const beginHour = el.beginHour ? el.beginHour.toString() : "";
    // const endDate = el.endDate ? formatStringToDate(el.endDate.toString()) : "";
    // const endHour = el.endHour ? el.endHour.toString() : "";
    records.push({
      col1: "Result",
      col2: "Result",
      col3: "Result",
      col4: "Result",
      col5: "Result",
      col6: "Result",
      col7: "Result",
    });
  });
  return records;
};

// year - month - day to  month / day/ year
const formatStringToDate = (date) => {
  const parts = date.split("-");

  return `${parts[1]}/${parts[2]}/${parts[0]}`;
};

export const getQAColsByTestCode = (testCode) => {
  let cols = [
    'Test Type Code',
    'Unit or Stack Pipe ID',
    'Component ID',
    'Test Number',
    'Test Reason Code',
    'Test Result Code',
    'End Date',
    'End Hour',
    'End Minute',
  ]
  switch (testCode) {
    case 'APPESUM': // Appendix E Correlation Test Summary
      cols = [
        'Test Type Code',
        'Unit or Stack Pipe ID',
        'Monitoring System ID',
        'Test Number',
        'Test Reason Code',
        'End Date',
        'End Hour',
        'End Minute',
      ]
      break
    case 'CALINJ': // Calibration Injection
    case 'CYCSUM': // Cycle Time Summary
    case 'FFACC': // Fuel Flowmeter Accuracy
    case 'HGL3LS': // Hg Linearity and 3-Level Summary
    case 'LINSUM': // Linearity Summary
    case 'PEI': // Primary Element Inspection
    case 'TTACC': // Transmitter Transducer Accuracy
      cols = [
        'Test Type Code',
        'Unit or Stack Pipe ID',
        'Component ID',
        'Test Number',
        'Test Reason Code',
        'Test Result Code',
        'End Date',
        'End Hour',
        'End Minute',
      ]
      break
    case 'FLC': // Flow to Load Check
    case 'FFL': // Fuel Flow to Load
      cols = [
        'Test Type Code',
        'Unit or Stack Pipe ID',
        'Monitoring System ID',
        'Test Number',
        'Test Reason Code',
        'Test Result Code',
        'Year',
        'Quarter',
      ]
      break
    case 'FLR': // Flow to Load Reference
      cols = [
        'Test Type Code',
        'Unit or Stack Pipe ID',
        'Monitoring System ID',
        'Test Number',
        'End Date',
        'End Hour',
        'End Minute',
      ]
      break
    case 'FFLB': // Fuel Flow to Load Baseline
      cols = [
        'Test Type Code',
        'Unit or Stack Pipe ID',
        'Monitoring System ID',
        'Test Number',
        'End Date',
        'End Hour',
      ]
      break
    case 'OLOLCAL': // Online Offline Calibration
      cols = [
        'Test Type Code',
        'Unit or Stack Pipe ID',
        'Component ID',
        'Test Number',
        'Test Reason Code',
        'Test Result Code',
        'End Date',
        'End Hour',
      ]
      break
    case 'RELACC': // Relative Accuracy
      cols = [
        'Test Type Code',
        'Unit or Stack Pipe ID',
        'Monitoring System ID',
        'Test Number',
        'Test Reason Code',
        'Test Result Code',
        'End Date',
        'End Hour',
        'End Minute',
      ]
      break
    case 'LME': // Unit Default
      cols = [
        'Test Type Code',
        'Unit or Stack Pipe ID',
        'Test Number',
        'Test Reason Code',
        'End Date',
        'End Hour',
        'End Minute',
      ]
      break
    case 'MISC': // Miscellaneous
      cols = [
        'Test Type Code',
        'Unit or Stack Pipe ID',
        'Monitoring System ID',
        'Component ID',
        'Test Number',
        'Test Reason Code',
        'Test Result Code',
        'End Date',
        'End Hour',
        'End Minute',
      ]
      break
    default:
    // console.log(`getQAColsByTestCode default case w/ testCode: ${testCode}`);
  }
  return cols
}

export const getQAModalDetailsByTestCode = (testCode) => {
  const unitId = ["Unit or Stack Pipe ID", "input", "", ""]
  const testTypeCode = ["Test Type Code", "mainDropdown", "mainDropdown", ""]
  const monitoringSystemID = ["Monitoring System ID", "input", "", ""]
  const componentID = ["Component ID", "input", "", ""]
  const spanScaleCode = ["Span Scale Code", "nonFilteredDropdown", "", ""]
  const testNumber = ["Test Number", "input", "", ""]
  const testReasonCode = ["Test Reason Code", "dropdown", "", ""]
  const testResultCode = ["Test Result Code", "dropdown", "", ""]
  const gasLevelCode = ["Gas Level Code Code", "nonFilteredDropdown", "", ""]
  const testDescription = ["Test Description", "input", "", ""]
  const gracePeriodIndicator = ["Grace Period Indicator", "radio", "", ""]
  const injectionProtocolCode = ["Injection Protocol Code", "nonFilteredDropdown", "", ""]

  // extra control inputs
  const testComment = ["Test Comment", "input", "", ""]

  // control date picker inputs
  const beginDate = ["Begin Date", "date", "", ""]
  const beginHour = ["Begin Hour", "hourDropdown", "dropdown", ""]
  const beginMinute = ["Begin Minute", "minuteDropdown", "dropdown", ""]
  const endDate = ["End Date", "date", "", ""]
  const endHour = ["End Hour", "hourDropdown", "dropdown", ""]
  const endMinute = ["End Minute", "minuteDropdown", "dropdown", ""]

  const year = ["Year", "input", "", ""]
  const quarter = ["Quarter", "input", "", ""]

  let modalDetails = {
    controlInputs: {
      unitId,
      testTypeCode,
      monitoringSystemID,
      componentID,
      spanScaleCode,
      testNumber,
      testReasonCode,
      testResultCode,
    },
    extraControlInputs: {
      gracePeriodIndicator,
      testComment
    },
    controlDatePickerInputs: {
      beginDate,
      beginHour,
      beginMinute,
      endDate,
      endHour,
      endMinute
    }
  }

  switch (testCode) {
    case 'APPESUM': // Appendix E Correlation Test Summary
      modalDetails = {
        controlInputs: {
          testTypeCode,
          unitId,
          monitoringSystemID,
          testNumber,
          testReasonCode,
        },
        extraControlInputs: {
          testComment
        },
        controlDatePickerInputs: {
          beginDate,
          beginHour,
          beginMinute,
          endDate,
          endHour,
          endMinute
        }
      }
      break
    case 'CALINJ': // Calibration Injection
    case 'CYCSUM': // Cycle Time Summary
      modalDetails = {
        controlInputs: {
          testTypeCode,
          unitId,
          componentID,
          spanScaleCode,
          testNumber,
          testReasonCode,
          testResultCode
        },
        extraControlInputs: {
          injectionProtocolCode,
          testComment
        },
        controlDatePickerInputs: {
          beginDate,
          beginHour,
          beginMinute,
          endDate,
          endHour,
          endMinute
        }
      }
      break
    case 'FFACC': // Fuel Flowmeter Accuracy
      modalDetails = {
        controlInputs: {
          testTypeCode,
          unitId,
          componentID,
          testNumber,
          testReasonCode,
          testResultCode
        },
        extraControlInputs: {
          testComment
        },
        controlDatePickerInputs: {
          endDate,
          endHour,
          endMinute
        }
      }
      break
    case 'HGL3LS': // Hg Linearity and 3-Level Summary
    case 'LINSUM': // Linearity Summary
      modalDetails = {
        controlInputs: {
          testTypeCode,
          unitId,
          componentID,
          spanScaleCode,
          testNumber,
          testReasonCode,
          testResultCode
        },
        extraControlInputs: {
          gracePeriodIndicator,
          testComment
        },
        controlDatePickerInputs: {
          beginDate,
          beginHour,
          beginMinute,
          endDate,
          endHour,
          endMinute
        }
      }
      break
    case 'PEI': // Primary Element Inspection
      modalDetails = {
        controlInputs: {
          testTypeCode,
          unitId,
          componentID,
          testNumber,
          testReasonCode,
          testResultCode,
          testDescription,
        },
        extraControlInputs: {
          gracePeriodIndicator,
          testComment
        },
        controlDatePickerInputs: {
          endDate,
          endHour,
          endMinute
        }
      }
      break
    case 'TTACC': // Transmitter Transducer Accuracy
      modalDetails = {
        controlInputs: {
          testTypeCode,
          unitId,
          componentID,
          testNumber,
          testReasonCode,
          testResultCode,
        },
        extraControlInputs: {
          testComment
        },
        controlDatePickerInputs: {
          endDate,
          endHour,
          endMinute
        }
      }
      break
    case 'FLC': // Flow to Load Check
    case 'FFL': // Fuel Flow to Load
      modalDetails = {
        controlInputs: {
          testTypeCode,
          unitId,
          monitoringSystemID,
          testNumber,
          testReasonCode,
          testResultCode,
          year,
          quarter
        },
        extraControlInputs: {
          testComment
        },
      }
      break
    case 'FLR': // Flow to Load Reference
      modalDetails = {
        controlInputs: {
          testTypeCode,
          unitId,
          monitoringSystemID,
          testNumber,
        },
        extraControlInputs: {
          testComment
        },
        controlDatePickerInputs: {
          endDate,
          endHour,
          endMinute
        }
      }
      break
    case 'FFLB': // Fuel Flow to Load Baseline
      modalDetails = {
        controlInputs: {
          testTypeCode,
          unitId,
          monitoringSystemID,
          testNumber,
        },
        extraControlInputs: {
          testComment
        },
        controlDatePickerInputs: {
          beginDate,
          beginHour,
          endDate,
          endHour,
        }
      }
      break
    case 'OLOLCAL': // Online Offline Calibration
      modalDetails = {
        controlInputs: {
          testTypeCode,
          unitId,
          componentID,
          spanScaleCode,
          testNumber,
          testReasonCode,
          testResultCode,
        },
        extraControlInputs: {
          testComment
        },
        controlDatePickerInputs: {
          beginDate,
          beginHour,
          endDate,
          endHour,
        }
      }
      break
    case 'RELACC': // Relative Accuracy
      modalDetails = {
        controlInputs: {
          testTypeCode,
          unitId,
          monitoringSystemID,
          testNumber,
          testReasonCode,
          testResultCode,
        },
        extraControlInputs: {
          gracePeriodIndicator,
          testComment
        },
        controlDatePickerInputs: {
          beginDate,
          beginHour,
          beginMinute,
          endDate,
          endHour,
          endMinute
        }
      }
      break
    case 'LME': // Unit Default
      modalDetails = {
        controlInputs: {
          testTypeCode,
          unitId,
          testNumber,
          testReasonCode,
        },
        extraControlInputs: {
          testComment
        },
        controlDatePickerInputs: {
          beginDate,
          beginHour,
          beginMinute,
          endDate,
          endHour,
          endMinute
        }
      }
      break
    case 'MISC': // Miscellaneous
      modalDetails = {
        controlInputs: {
          testTypeCode,
          unitId,
          monitoringSystemID,
          componentID,
          testNumber,
          testReasonCode,
          testResultCode,
          testDescription,
        },
        extraControlInputs: {
          gracePeriodIndicator,
          testComment
        },
        controlDatePickerInputs: {
          endDate,
          endHour,
          endMinute
        }
      }
      break
    default:
    // console.log(`getQAModalDetailsByTestCode default case w/ testCode: ${testCode}`);
  }

  return modalDetails
}