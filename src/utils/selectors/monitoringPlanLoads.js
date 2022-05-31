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

    var secondNormalIndicator;
    console.log('secondNormalIndicator',el.secondNormalIndicator)
    if (el.secondNormalIndicator || el.secondNormalIndicator === 0) {
      if (el.secondNormalIndicator === 1) {
        secondNormalIndicator = "Yes";
      } else {
        secondNormalIndicator = "No";
      }
    } else {
      secondNormalIndicator = "";
    }

    var maximumLoadUnitsOfMeasureCode;
    switch (el.maximumLoadUnitsOfMeasureCode) {
      case "select":
        maximumLoadUnitsOfMeasureCode = null;
        break;
      default:
        maximumLoadUnitsOfMeasureCode = el.maximumLoadUnitsOfMeasureCode;
    }

    var normalLevelCode;
    switch (el.normalLevelCode) {
      case "select":
        normalLevelCode = null;
        break;
      default:
        normalLevelCode = el.normalLevelCode;
    }

    var secondLevelCode;
    switch (el.secondLevelCode) {
      case "select":
        secondLevelCode = null;
        break;
      default:
        secondLevelCode = el.secondLevelCode;
    }

    const loadAnalysisDate = el.loadAnalysisDate
      ? formatStringToDate(el.loadAnalysisDate.toString())
      : "";

    records.push({
      col1: el.maximumLoadValue,
      col2: maximumLoadUnitsOfMeasureCode,
      col3: el.lowerOperationBoundary,
      col4: el.upperOperationBoundary,
      col5: normalLevelCode,
      col6: secondLevelCode,
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
