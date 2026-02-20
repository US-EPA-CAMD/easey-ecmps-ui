import { formatDateTime } from "../functions";

export const getMonitoringPlansDefaultsTableRecords = (totalData) => {
  const data = totalData;
  const records = [];

  data.forEach((el) => {
    records.push({
      col1: el.parameterCode,
      col2: el.defaultValue,
      col3: el.defaultUnitsOfMeasureCode,
      col4: el.defaultPurposeCode,
      col5: el.fuelCode,
      col6: el.operatingConditionCode,
      col7: el.defaultSourceCode,
      col8: formatDateTime(el.beginDate, el.beginHour),
      col9: formatDateTime(el.endDate, el.endHour),
      col10: el.id,
    });
  });

  return records;
};
