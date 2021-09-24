export const getMonitoringPlansLoadsTableRecords = (totalData) => {
  const data = totalData;
  const records = [];

  data.forEach((el) => {
    const beginDate = el.beginDate
      ? formatStringToDate(el.beginDate.toString())
      : "";
    const beginHour = el.beginHour ? el.beginHour.toString() : "";
    const endDate = el.endDate ? formatStringToDate(el.endDate.toString()) : "";
    const endHour = el.endHour ? el.endHour.toString() : "";

    const secondNormalIndicator = el.secondNormalIndicator
      ? el.secondNormalIndicator === "1"
        ? "Yes"
        : "No"
      : "";

    const loadAnalysisDate = el.loadAnalysisDate
      ? formatStringToDate(el.loadAnalysisDate.toString())
      : "";

    console.log(loadAnalysisDate);
    records.push({
      col1: el.maximumLoadValue,
      col2: el.maximumLoadUnitsOfMeasureCode,
      col3: el.lowerOperationBoundary,
      col4: el.upperOperationBoundary,
      col5: el.normalLevelCode,
      col6: el.secondLevelCode,
      col7: secondNormalIndicator,
      col8: loadAnalysisDate,
      col9: `${beginDate} ${beginHour}`,
      col10: `${endDate} ${endHour}`,
      col11: el.id,
    });
  });

  return records;
};
// year - month - day to  month / day/ year
const formatStringToDate = (date) => {
  const parts = date.split("-");

  return `${parts[1]}/${parts[2]}/${parts[0]}`;
};
