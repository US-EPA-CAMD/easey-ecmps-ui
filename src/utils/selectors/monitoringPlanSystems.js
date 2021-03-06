export const getMonitoringPlansSystemsTableRecords = (data) => {
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
      col1: el.monitoringSystemId,
      col2: el.systemTypeCode,
      col3: el.systemDesignationCode,
      col4: el.fuelCode,
      col5: `${beginDate} ${beginHour}`,
      col6: `${endDate} ${endHour}`,
      col7: el.id,
    });
  });
  return records;
};
// year - month - day to  month / day/ year
export const formatStringToDate = (date) => {
  const parts = date.split("-");
  return `${parts[1]}/${parts[2]}/${parts[0]}`;
};

export const getMonitoringPlansSystemsComponentsTableRecords = (data) => {
  const records = [];
  data.forEach((el) => {
    const beginDate = el.beginDate
      ? formatStringToDate(el.beginDate.toString())
      : "";
    const beginHour = el.beginHour !== null ? el.beginHour.toString() : "";
    const endDate = el.endDate ? formatStringToDate(el.endDate.toString()) : "";
    const endHour = el.endHour !== null ? el.endHour.toString() : "";
    let present;
    if (endDate === "" || endDate === undefined) {
      present = "Present";
    } else {
      present = `${endDate}: ${endHour}`;
    }
    records.push({
      col1: el.componentId,
      col2: el.componentTypeCode,
      col3: `${beginDate}: ${beginHour} ➜ ${present}`,
      col4: el.id,
    });
  });
  return records;
};

export const getMonitoringPlansSystemsFuelFlowsComponentsTableRecords = (
  data
) => {
  const records = [];
  data.forEach((el) => {
    const beginDate = el.beginDate
      ? formatStringToDate(el.beginDate.toString())
      : "";
    const beginHour = el.beginHour !== null ? el.beginHour.toString() : "";
    const endDate = el.endDate ? formatStringToDate(el.endDate.toString()) : "";
    const endHour = el.endHour !== null ? el.endHour.toString() : "";
    let present;
    if (endDate === "" || endDate === undefined) {
      present = "Present";
    } else {
      present = `${endDate}: ${endHour}`;
    }
    records.push({
      col1: el.fuelCode,
      col2: el.systemTypeCode,
      col3: `${beginDate}: ${beginHour} ➜ ${present}`,
      col4: el.id,
    });
  });
  return records;
};

export const getMonitoringPlansSystemsAnalyzerRangesTableRecords = (data) => {
  const records = [];
  data.forEach((el) => {
    const beginDate = el.beginDate
      ? formatStringToDate(el.beginDate.toString())
      : "";
    const beginHour = el.beginHour !== null ? el.beginHour.toString() : "";
    const endDate = el.endDate ? formatStringToDate(el.endDate.toString()) : "";
    const endHour = el.endHour !== null ? el.endHour.toString() : "";
    let present;
    if (endDate === "" || endDate === undefined) {
      present = "Present";
    } else {
      present = `${endDate}: ${endHour}`;
    }
    records.push({
      col1: el.analyzerRangeCode,
      col2: `${beginDate}: ${beginHour} ➜ ${present}`,
      col3: el.id,
    });
  });

  return records;
};
