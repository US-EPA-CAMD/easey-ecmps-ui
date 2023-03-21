import { formatDateString, formatHourString } from "../functions";

export const getMonitoringPlansLoadsTableRecords = (totalData) => {
  const data = totalData;
  const records = [];

  data.forEach((el) => {
    const beginDate = formatDateString(el.beginDate);
    const beginHour = formatHourString(el.beginHour);
    const endDate = formatDateString(el.endDate);
    const endHour = formatHourString(el.endHour);

    let secondNormalIndicator;
    if (el.secondNormalIndicator || el.secondNormalIndicator === 0) {
      if (el.secondNormalIndicator === 1) {
        secondNormalIndicator = "Yes";
      } else {
        secondNormalIndicator = "No";
      }
    } else {
      secondNormalIndicator = "";
    }

    let maximumLoadUnitsOfMeasureCode;
    switch (el.maximumLoadUnitsOfMeasureCode) {
      case "select":
        maximumLoadUnitsOfMeasureCode = null;
        break;
      default:
        maximumLoadUnitsOfMeasureCode = el.maximumLoadUnitsOfMeasureCode;
    }

    let normalLevelCode;
    switch (el.normalLevelCode) {
      case "select":
        normalLevelCode = null;
        break;
      default:
        normalLevelCode = el.normalLevelCode;
    }

    let secondLevelCode;
    switch (el.secondLevelCode) {
      case "select":
        secondLevelCode = null;
        break;
      default:
        secondLevelCode = el.secondLevelCode;
    }

    const loadAnalysisDate = formatDateString(el.loadAnalysisDate);

    records.push({
      col1: el.maximumLoadValue,
      col2: maximumLoadUnitsOfMeasureCode,
      col3: el.lowerOperationBoundary,
      col4: el.upperOperationBoundary,
      col5: normalLevelCode,
      col6: secondLevelCode,
      col7: secondNormalIndicator,
      col8: loadAnalysisDate,
      col9: `${beginDate} ${beginHour}`.trim(),
      col10: `${endDate} ${endHour}`.trim(),
      col11: el.id,
    });
  });

  return records;
};
