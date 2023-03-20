import { formatDateString } from "../functions";

export const getMonitoringPlansSystemsTableRecords = (data) => {
  const records = [];
  data.forEach((el) => {
    const beginDate = formatDateString(el.beginDate);
    const beginHour = el.beginHour !== null ? el.beginHour.toString() : "";
    const endDate = formatDateString(el.endDate);
    const endHour = el.endHour !== null ? el.endHour.toString() : "";
    records.push({
      col1: el.monitoringSystemId,
      col2: el.systemTypeCode,
      col3: el.systemDesignationCode,
      col4: el.fuelCode,
      col5: `${beginDate} ${beginHour}`.trim(),
      col6: `${endDate} ${endHour}`.trim(),
      col7: el.id,
    });
  });
  return records;
};

export const getMonitoringPlansSystemsComponentsTableRecords = (data) => {
  const records = [];
  data.forEach((el) => {
    const beginDate = formatDateString(el.beginDate);
    const beginHour = el.beginHour !== null ? el.beginHour.toString() : "";
    const endDate = formatDateString(el.endDate);
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
      col3: `${beginDate}: ${beginHour} ➜ ${present}`.trim(),
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
    const beginDate = formatDateString(el.beginDate);
    const beginHour = el.beginHour !== null ? el.beginHour.toString() : "";
    const endDate = formatDateString(el.endDate);
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
      col3: `${beginDate}: ${beginHour} ➜ ${present}`.trim(),
      col4: el.id,
    });
  });
  return records;
};

export const getMonitoringPlansSystemsAnalyzerRangesTableRecords = (data) => {
  const records = [];
  data.forEach((el) => {
    const beginDate = formatDateString(el.beginDate);
    const beginHour = el.beginHour !== null ? el.beginHour.toString() : "";
    const endDate = formatDateString(el.endDate);
    const endHour = el.endHour !== null ? el.endHour.toString() : "";
    let present;
    if (endDate === "" || endDate === undefined) {
      present = "Present";
    } else {
      present = `${endDate}: ${endHour}`;
    }
    records.push({
      col1: el.analyzerRangeCode,
      col2: `${beginDate}: ${beginHour} ➜ ${present}`.trim(),
      col3: el.id,
    });
  });

  return records;
};
