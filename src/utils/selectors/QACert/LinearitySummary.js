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
    "Test Type Code",
    "Unit or Stack Pipe ID",
    "Component ID",
    "Test Number",
    "Test Reason Code",
    "Test Result Code",
    "End Date",
    "End Hour",
    "End Minute",
  ]
  switch (testCode) {
    case 'RATA':
      cols = [
        "Test Type Code",
        "Unit or Stack Pipe ID",
        "Component ID",
        "Test Number",
        "Test Reason Code",
        "Test Result Code",
        "End Date",
        "End Hour",
        "End Minute",
      ]
      break
    default:
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
    defaultControlDatePickerInputs: {
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
        defaultControlDatePickerInputs: {
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
  }

  return modalDetails
}