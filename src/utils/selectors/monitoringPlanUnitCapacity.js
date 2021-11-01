export const getMonitoringPlansUnitCapacityRecords = (data) => {
  const records = [];
  data.forEach((el) => {
    const beginDate = el.beginDate
      ? formatStringToDate(el.beginDate.toString())
      : "";
    const beginHour = el.beginHour ? el.beginHour.toString() : "";
    const endDate = el.endDate ? formatStringToDate(el.endDate.toString()) : "";
    const endHour = el.endHour ? el.endHour.toString() : "";
    records.push({
      col1: el.maximumHourlyHeatInputCapacity,

      col2: `${beginDate} ${beginHour}`,
      col3: `${endDate} ${endHour}`,
      col4: el.id,
    });
  });

  return records;
};
// year - month - day to  month / day/ year
const formatStringToDate = (date) => {
  const parts = date.split("-");

  return `${parts[1]}/${parts[2]}/${parts[0]}`;
};
