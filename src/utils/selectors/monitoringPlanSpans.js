export const getMonitoringPlansSpansTableRecords = (totalData) => {
  const data = totalData;
  const records = [];
  data.forEach((el) => {
    const beginDate = el.beginDate
      ? formatStringToDate(el.beginDate.toString())
      : "";
    const beginHour = el.beginHour !== null ? el.beginHour.toString() : "";
    const endDate =
      el.endDate !== null ? formatStringToDate(el.endDate.toString()) : "";
    const endHour = el.endHour !== null ? el.endHour.toString() : "";
    records.push({
      col1: el.componentTypeCode,
      col2: el.spanScaleCode,
      col3: el.spanMethodCode,
      col4: el.spanUnitsOfMeasureCode,
      col5: `${beginDate} ${beginHour}`,
      col6: `${endDate} ${endHour}`,
      col7: el.id,
    });
  });
  return records;
};
// year - month - day to  month / day/ year
const formatStringToDate = (date) => {
  const parts = date.split("-");

  return `${parts[1]}/${parts[2]}/${parts[0]}`;
};
