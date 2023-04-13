import { formatDateTime } from "../functions";

export const getMonitoringPlansDefaultsTableRecords = (totalData) => {
  const data = totalData;
  const records = [];

  data.forEach((el) => {
    records.push({
      col1: el.parameterCode,
      col2: el.defaultUnitsOfMeasureCode,
      col3: el.defaultPurposeCode,
      col4: el.fuelCode,
      col5: el.operatingConditionCode,
      col6: el.defaultSourceCode,
      col7: formatDateTime(el.beginDate, el.beginHour),
      col8: formatDateTime(el.beginDate, el.beginHour),
      col9: el.id,
    });
  });

  return records;
};
