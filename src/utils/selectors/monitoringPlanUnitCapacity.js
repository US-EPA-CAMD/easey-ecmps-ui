import { formatDateString } from "../functions";

export const getMonitoringPlansUnitCapacityRecords = (data) => {
  const records = [];
  data.forEach((el) => {
    const beginDate = formatDateString(el.beginDate);
    const endDate = formatDateString(el.endDate);

    const commercialOperationDateString = formatDateString(el.commercialOperationDate.toString())
    const operationDateString = formatDateString(el.operationDate.toString())
    const boilerTurbineBeginDateString = formatDateString(el.boilerTurbineBeginDate.toString())
    const boilerTurbineEndDateString = formatDateString(el.boilerTurbineEndDate.toString())

    records.push({
      col1: commercialOperationDateString,
      col2: operationDateString,
      col3: el.boilerTurbineType,
      col4: boilerTurbineBeginDateString,
      col5: boilerTurbineEndDateString,
      col6: el.maximumHourlyHeatInputCapacity,
      col7: `${beginDate}`,
      col8: `${endDate}`,
      col9: el.id,
    });
  });

  return records;
};
