import { formatDateString, formatHourString } from "../functions";

export const getMonitoringPlansSpansTableRecords = (totalData) => {
  const data = totalData;
  const records = [];
  data.forEach((el) => {
    const beginDate = formatDateString(el.beginDate);
    const beginHour = formatHourString(el.beginHour);
    const endDate = formatDateString(el.endDate);
    const endHour = formatHourString(el.endHour);
    records.push({
      col1: el.componentTypeCode,
      col2: el.spanScaleCode,
      col3: el.spanMethodCode,
      col4: el.spanUnitsOfMeasureCode,
      col5: `${beginDate} ${beginHour}`.trim(),
      col6: `${endDate} ${endHour}`.trim(),
      col7: el.id,
    });
  });
  return records;
};
