import { formatDateString } from "../functions";

export const getMonitoringPlansDefaultsTableRecords = (totalData) => {
  const data = totalData;
  const records = [];

  data.forEach((el) => {
    const beginDate = formatDateString(el.beginDate.toString());
    const beginHour = el.beginHour !== null ? el.beginHour.toString() : "";
    const endDate = formatDateString(el.endDate.toString());
    const endHour = el.endHour !== null ? el.endHour.toString() : "";
    records.push({
      col1: el.parameterCode,
      col2: el.defaultUnitsOfMeasureCode,
      col3: el.defaultPurposeCode,
      col4: el.fuelCode,
      col5: el.operatingConditionCode,
      col6: el.defaultSourceCode,
      col7: `${beginDate} ${beginHour}`,
      col8: `${endDate} ${endHour}`,
      col9: el.id,
    });
  });

  return records;
};
