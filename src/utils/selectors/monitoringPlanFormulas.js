import { formatDateTime } from "../functions";

export const getMonitoringPlansFormulasTableRecords = (totalData) => {
  const data = totalData;
  const records = [];

  data.forEach((el) => {
    records.push({
      col1: el.formulaId,
      col2: el.parameterCode,
      col3: el.formulaCode,
      col4: el.formulaText,
      col5: formatDateTime(el.beginDate, el.beginHour),
      col6: formatDateTime(el.endDate, el.endHour),
      col7: el.id,
    });
  });
  return records;
};
