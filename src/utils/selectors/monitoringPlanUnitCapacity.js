export const getMonitoringPlansUnitCapacityRecords = (data) => {
  const records = [];
  data.forEach((el) => {
    records.push({
      col1: el.commercialOperationDate ? el.commercialOperationDate : "",
      col2: el.operationDate ? el.operationDate : "",
      col3: el.boilerTurbineType,
      col4: el.boilerTurbineBeginDate ? el.boilerTurbineBeginDate : "",
      col5: el.boilerTurbineEndDate ? el.boilerTurbineEndDate : "",
      col6: el.maximumHourlyHeatInputCapacity,
      col7: el.beginDate ? el.beginDate : "",
      col8: el.endDate ? el.endDate : "",
      col9: el.id,
    });
  });

  return records;
};
