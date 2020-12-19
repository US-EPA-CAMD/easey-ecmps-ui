export function getMonitoringPlansMethodsTableRecords(totalData) {
  const data = totalData;
  const records = [];
  data.forEach((el) => {
    const beginDate = el.beginDate? el.beginDate.toString(): '';
    const beginHour = el.beginHour? el.beginHour.toString(): '';
    const endDate = el.endDate? el.endDate.toString(): '';
    const endHour = el.endHour? el.endHour.toString(): '';
    records.push({
      col1: el.parameterCode,
      col2: el.methodCode,
      col3: el.subDataCode,
      col4: el.bypassApproachCode,
      col5: `${beginDate} ${beginHour}`,
      col6: `${endDate} ${endHour}`,
    });
  });
  return records;
}
