export function getMonitoringPlansMethodsTableRecords(totalData) {
  const data = totalData;
  const records = [];
  data.forEach((el) => {
    const beginDate = el.beginDate
      ? formateStringToDate(el.beginDate.toString())
      : "";
    const beginHour = el.beginHour ? el.beginHour.toString() : "";
    const endDate = el.endDate
      ? formateStringToDate(el.endDate.toString())
      : "";
    const endHour = el.endHour ? el.endHour.toString() : "";
    records.push({
      col1: el.parameterCode,
      col2: el.methodCode,
      col3: el.subDataCode,
      col4: el.bypassApproachCode,
      col5: `${beginDate} ${beginHour}`,
      col6: `${endDate} ${endHour}`,
      col7: el.id,
    });
  });
  return records;
}
// year - month - day to  month / day/ year
function formateStringToDate(date) {
  var parts = date.split("-");
  return `${parts[1]}/${parts[2]}/${parts[0]}}`;
}

export function getMonitoringPlansMatsMethodsTableRecords(data) {
  const records = [];
  data.forEach((el) => {
    const beginDate = el.beginDate
      ? formateStringToDate(el.beginDate.toString())
      : "";
    const beginHour = el.beginHour ? el.beginHour.toString() : "";
    const endDate = el.endDate
      ? formateStringToDate(el.endDate.toString())
      : "";
    const endHour = el.endHour ? el.endHour.toString() : "";
    records.push({
      col1: el.matsMethodParameterCode,
      col2: el.matsMethodCode,
      col3: `${beginDate} ${beginHour}`,
      col4: `${endDate} ${endHour}`,
      col5: el.id,
    });
  });
  return records;
}
