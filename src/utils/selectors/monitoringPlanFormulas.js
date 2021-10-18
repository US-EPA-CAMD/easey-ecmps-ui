export const getMonitoringPlansFormulasTableRecords = (totalData) => {
  const data = totalData;
  const records = [];

  data.forEach((el) => {
    const beginDate = el.beginDate
      ? formatStringToDate(el.beginDate.toString())
      : "";
    const beginHour = el.beginHour ? el.beginHour.toString() : "";
    const endDate = el.endDate ? formatStringToDate(el.endDate.toString()) : "";
    const endHour = el.endHour ? el.endHour.toString() : "";
    records.push({
      col1: el.parameterCode,
      col2: el.formulaCode,
      col3: el.formulaId,
      col4: `${beginDate} ${beginHour}`,
      col5: `${endDate} ${endHour}`,
      col6: el.id,
    });
  });

  return records;
};

// year - month - day to  month / day/ year
const formatStringToDate = (date) => {
  const parts = date.split("-");

  return `${parts[1]}/${parts[2]}/${parts[0]}`;
};
