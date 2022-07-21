export const getTestSummary = (data) => {
  const records = [];
  //   let data = [1, 2];
  data.forEach((el) => {
    const endDate = el.endDate ? formatStringToDate(el.endDate.toString()) : "";
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
  return records;
};

// year - month - day to  month / day/ year
const formatStringToDate = (date) => {
  const parts = date.split("-");

  return `${parts[1]}/${parts[2]}/${parts[0]}`;
};

export const getLinearitySummaryRecords = (data) =>{
  const records = [];
  data.forEach((el) => {
    records.push({
      id: el.id,
      testSumId: el.testSumId,
      col1: el.gasLevelCode,
      col2: el.meanMeasuredValue,
      col3: el.meanReferenceValue,
      col4: el.percentError,
      col5: el.apsIndicator,
    });
  });
  return records;
}
