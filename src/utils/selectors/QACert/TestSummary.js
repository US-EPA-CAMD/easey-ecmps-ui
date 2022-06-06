export const getTestSummary = (totalData) => {
  //   const data = totalData;
  const records = [];
//   let data = [1, 2];
  totalData.forEach((el) => {
    const beginDate = el.beginDate
      ? formatStringToDate(el.beginDate.toString())
      : "";
    const beginHour = el.beginHour ? el.beginHour.toString() : "";
    const beginMinute = el.beginMinute ? el.beginMinute.toString() : "";
    const endDate = el.endDate ? formatStringToDate(el.endDate.toString()) : "";
    const endHour = el.endHour ? el.endHour.toString() : "";

    const endMinute = el.endMinute ? el.endMinute.toString() : "";
    records.push({
      col1: el.stackPipeId,
      //   col2: el.unitId,
      col2: el.testTypeCode,
      col3: el.monitoringSystemId,
      col4: el.componentId,
      col5: el.spanScaleCode,
      col6: el.testNumber,
      col7: el.testReasonCode,
      col8: el.testDescription,
      col9: el.testResultCode,
      col10: beginDate,
      col11: beginHour,
      col12: beginMinute,
      col13: endDate,
      col14: endHour,
      col15: endMinute,
      col16: el.gracePeriodIndicator,
      col17: el.year,
      col18: el.quarter,
      col19: el.testComment,
      col20: el.injectionProtocolCode,
      col21: el.id,
      //   col23: el.calculatedGracePeriodIndicator,
      //   col24: el.calculatedTestResultCode,
      //   col25: el.reportPeriodId,
      //   col26: el.calculatedSpanValue,
      //   col27: el.userId,
      //   col28: el.id,
      //   col29: el.calculatedGracePeriodIndicator,
      //   col30: el.calculatedTestResultCode,
    });
  });
  return records;
};

// year - month - day to  month / day/ year
const formatStringToDate = (date) => {
  const parts = date.split("-");

  return `${parts[1]}/${parts[2]}/${parts[0]}`;
};
