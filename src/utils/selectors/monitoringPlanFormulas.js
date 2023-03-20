import { formatDateString, formatHourString } from "../functions";

export const getMonitoringPlansFormulasTableRecords = (totalData) => {
  const data = totalData;
  const records = [];

  data.forEach((el) => {
    const beginDate = formatDateString(el.beginDate);
    const beginHour = formatHourString(el.beginHour);
    const endDate = formatDateString(el.endDate);
    const endHour = formatHourString(el.endHour);
    records.push({
      col1: el.formulaId,
      col2: el.parameterCode,
      col3: el.formulaCode,
      col4: el.formulaText,
      col5: `${beginDate} ${beginHour}`.trim(),
      col6: `${endDate} ${endHour}`.trim(),
      col7: el.id,
    });
  });
  return records;
};
