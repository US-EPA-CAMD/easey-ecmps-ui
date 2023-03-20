import { formatDateString, formatHourString } from "../functions";

export const getMonitoringPlansDefaultsTableRecords = (totalData) => {
  const data = totalData;
  const records = [];

  data.forEach((el) => {
    const beginDate = formatDateString(el.beginDate);
    const beginHour = formatHourString(el.beginHour);
    const endDate = formatDateString(el.endDate);
    const endHour = formatHourString(el.endHour);
    records.push({
      col1: el.parameterCode,
      col2: el.defaultUnitsOfMeasureCode,
      col3: el.defaultPurposeCode,
      col4: el.fuelCode,
      col5: el.operatingConditionCode,
      col6: el.defaultSourceCode,
      col7: `${beginDate} ${beginHour}`.trim(),
      col8: `${endDate} ${endHour}`.trim(),
      col9: el.id,
    });
  });

  return records;
};
