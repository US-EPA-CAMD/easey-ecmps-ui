export const getMonitoringPlansUnitCapacityRecords = (data) => {
  const records = [];
  data.forEach((el) => {
    const beginDate = el.beginDate
      ? formatStringToDate(el.beginDate.toString())
      : "";
    const beginHour = el.beginHour ? el.beginHour.toString() : "";
    const endDate = el.endDate ? formatStringToDate(el.endDate.toString()) : "";
    const endHour = el.endHour ? el.endHour.toString() : "";


    const commercialOperationDateString = el.commercialOperationDate ? formatStringToDate(el.commercialOperationDate.toString()) : "";
    const operationDateString = el.operationDate ? formatStringToDate(el.operationDate.toString()) : "";
    const boilerTurbineBeginDateString = el.boilerTurbineBeginDate ? formatStringToDate(el.boilerTurbineBeginDate.toString()) : "";
    const boilerTurbineEndDateString = el.boilerTurbineEnd ? formatStringToDate(el.boilerTurbineEnd.toString()) : "";

    records.push({
      col1: commercialOperationDateString,

      col2: operationDateString,
      col3: el.boilerTurbineType,
      col4: boilerTurbineBeginDateString,

      col5: boilerTurbineEndDateString,
      col6: el.maximumHourlyHeatInputCapacity,

      col7: `${beginDate} ${beginHour}`,
      col8: `${endDate} ${endHour}`,
      col9: el.id,
    });
  });

  return records;
};
// year - month - day to  month / day/ year
const formatStringToDate = (date) => {
  const parts = date.split("-");

  return `${parts[1]}/${parts[2]}/${parts[0]}`;
};
