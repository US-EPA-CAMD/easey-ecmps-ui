import { formatDateTime } from "../functions";

export const getMonitoringPlansSpansTableRecords = (totalData) => {
  const data = totalData;
  const records = [];
  data.forEach((el) => {
    records.push({
      col1: el.componentTypeCode,
      col2: el.spanScaleCode,
      col3: el.spanMethodCode,
      col4: el.spanUnitsOfMeasureCode,
      col5: formatDateTime(el.beginDate, el.beginHour),
      col6: formatDateTime(el.endDate, el.endHour),
      col7: el.id,
    });
  });
  return records;
};
