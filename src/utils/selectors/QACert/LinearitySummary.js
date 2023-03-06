
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
    'Eval Status'
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
        
    'Eval Status'
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
        
    'Eval Status'
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
        
    'Eval Status'
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
        
    'Eval Status'
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
        
    'Eval Status'
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
        
    'Eval Status'
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
        
    'Eval Status'
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
        
    'Eval Status'
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
        
    'Eval Status'
      ]
      break
    default:
    // console.log(`getQAColsByTestCode default case w/ testCode: ${testCode}`);
  }
  return cols
}

export const getQAModalDetailsByTestCode = (testCode, selectedLocation) => {
  // const unitId = ["Unit or Stack Pipe ID", "nonFilteredDropdown", "", ""]
  const unitId = ["Unit or Stack Pipe ID", "input", "", ""]
  const stackPipeId = ["Unit or Stack Pipe ID", "input", "", ""]
  const testTypeCode = ["Test Type Code", "mainDropdown", "mainDropdown", ""]
  const monitoringSystemID = ["Monitoring System ID", "nonFilteredDropdown", "", ""]
  const componentID = ["Component ID", "nonFilteredDropdown", "", ""]
  const spanScaleCode = ["Span Scale Code", "nonFilteredDropdown", "", ""]
  const testNumber = ["Test Number", "input", "", ""]
  const testReasonCode = ["Test Reason Code", "dropdown", "", ""]
  const testResultCode = ["Test Result Code", "dropdown", "", ""]
  // const gasLevelCode = ["Gas Level Code Code", "nonFilteredDropdown", "", ""]
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
          unitId,
          stackPipeId,
          testTypeCode,
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
          unitId,
          stackPipeId,
          testTypeCode,
          componentID,
          spanScaleCode,
          testNumber,
          testReasonCode,
          testResultCode
        },
        extraControlInputs: {
          //injectionProtocolCode,
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
          unitId,
          stackPipeId,
          testTypeCode,
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
          unitId,
          stackPipeId,
          testTypeCode,
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
          unitId,
          stackPipeId,
          testTypeCode,
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
          unitId,
          stackPipeId,
          testTypeCode,
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
          unitId,
          stackPipeId,
          testTypeCode,
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
          unitId,
          stackPipeId,
          testTypeCode,
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
          unitId,
          stackPipeId,
          testTypeCode,
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
          unitId,
          stackPipeId,
          testTypeCode,
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
          unitId,
          stackPipeId,
          testTypeCode,
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
          unitId,
          stackPipeId,
          testTypeCode,
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
          unitId,
          stackPipeId,
          testTypeCode,
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

  if(selectedLocation.unitId) {
    delete modalDetails["controlInputs"]['stackPipeId'];
  } else {
    delete modalDetails["controlInputs"]['unitId'];
  }

  return modalDetails
}