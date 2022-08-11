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
      console.log(`getQAColsByTestCode default case w/ testCode: ${testCode}`);
  }
  return cols
}

export const getQAModalDetailsByTestCode = (testCode) => {
  let modalDetails = {
    controlInputs: {
      unitId: ["Unit or Stack Pipe ID", "input", "", ""],
      testTypeCode: ["Test Type Code", "dropdown", "", ""],
      monitoringSystemID: ["Monitoring System ID", "input", "", ""],
      componentID: ["Component ID", "input", "", ""],
      spanScaleCode: ["Span Scale Code", "dropdown", "", ""],
      testNumber: ["Test Number", "input", "", ""],
      testReasonCode: ["Test Reason Code", "dropdown", "", ""],
      testResultCode: ["Test Result Code", "dropdown", "", ""],
      gracePeriodIndicator: ["Grace Period Indicator ", "radio", "", ""],
    },
    extraControlInputs: {
      testComment: ["Test Comment", "input", "", ""],
    },
    controlDatePickerInputs: {
      beginDate: ["Begin Date", "date", "", ""],
      beginHour: ["Begin Hour", "hourDropdown", "dropdown", ""],
      beginMinute: ["Begin Minute", "minuteDropdown", "dropdown", ""],
      endDate: ["End Date", "date", "", ""],
      endHour: ["End Hour", "hourDropdown", "dropdown", ""],

      endMinute: ["End Minute", "minuteDropdown", "dropdown", ""],
    }
  }

  switch (testCode) {
    case 'RATA':
      modalDetails = {
        controlInputs: {
          testTypeCode: ["Test Type Code", "dropdown", "", ""],
          unitId: ["Unit or Stack Pipe ID", "input", "", ""],
          monitoringSystemID: ["Monitoring System ID", "input", "", ""],
          testNumber: ["Test Number", "input", "", ""],
          testReasonCode: ["Test Reason Code", "dropdown", "", ""],
          testResultCode: ["Test Result Code", "dropdown", "", ""],
        },
        extraControlInputs: {
          gracePeriodIndicator: ["Grace Period Indicator ", "radio", "", ""],
          skip: ["Span Scale Code", "skip", "", ""],
          skip2: ["Span Scale Code", "skip", "", ""],
          testComment: ["Test Comment", "input", "", ""],
        },
        controlDatePickerInputs: {
          beginDate: ["Begin Date", "date", "", ""],
          beginHour: ["Begin Hour", "hourDropdown", "dropdown", ""],
          beginMinute: ["Begin Minute", "minuteDropdown", "dropdown", ""],
          endDate: ["End Date", "date", "", ""],
          endHour: ["End Hour", "hourDropdown", "dropdown", ""],
          endMinute: ["End Minute", "minuteDropdown", "dropdown", ""],
        }
      }
      break
    default:
      console.log(`getQAModalDetailsByTestCode default case w/ testCode: ${testCode}`);
  }

  return modalDetails
}