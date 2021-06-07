export function getMonitoringPlansSystemsTableRecords(data) {
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
      col1: el.systemIdentifier,
      col2: el.systemType,
      col3: el.systemDesignationCode,
      col4: el.fuelCode,
      col5: `${beginDate} ${beginHour}`,
      col6: `${endDate} ${endHour}`,
    });
  });
  return records;
}
// year - month - day to  month / day/ year
function formateStringToDate(date) {
  const parts = date.split("-");
  return parts[1] + "/" + parts[2] + "/" + parts[0];
}

export function getMonitoringPlansSystemsComponentsTableRecords(data) {
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
    let present;
    if (endDate === "" || endDate === undefined) {
      present = "Present";
    } else {
      present = endDate + ": " + endHour;
    }
    records.push({
      col1: el.componentIdentifier,
      col2: el.componentTypeCode,
      col3: `${beginDate}: ${beginHour} ➜ ${present}`,
    });
  });
  return records;
}

export function getMonitoringPlansSystemsFuelFlowsComponentsTableRecords(data) {
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
    let present;
    if (endDate === "" || endDate === undefined) {
      present = "Present";
    } else {
      present = endDate + ": " + endHour;
    }
    records.push({
      col1: el.sysFuelUomCode,
      col2: el.maxRateSourceCode,
      col3: `${beginDate}: ${beginHour} ➜ ${present}`,
    });
  });
  return records;
}
