import { formatDateTime } from "../functions";

export const getMonitoringPlansLoadsTableRecords = (totalData) => {
  const data = totalData;
  const records = [];

  data.forEach((el) => {
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

    const loadAnalysisDate = el.loadAnalysisDate;

    records.push({
      col1: el.maximumLoadValue,
      col2: maximumLoadUnitsOfMeasureCode,
      col3: el.lowerOperationBoundary,
      col4: el.upperOperationBoundary,
      col5: normalLevelCode,
      col6: secondLevelCode,
      col7: secondNormalIndicator,
      col8: loadAnalysisDate,
      col9: formatDateTime(el.beginDate, el.beginHour),
      col10: formatDateTime(el.endDate, el.endHour),
      col11: el.id,
    });
  });

  return records;
};
