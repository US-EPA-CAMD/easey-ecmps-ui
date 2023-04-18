import { formatDateTime } from "../functions";

export const getMonitoringPlansSystemsTableRecords = (data) => {
  const records = [];
  data.forEach((el) => {
    records.push({
      col1: el.monitoringSystemId,
      col2: el.systemTypeCode,
      col3: el.systemDesignationCode,
      col4: el.fuelCode,
      col5: formatDateTime(el.beginDate, el.beginHour),
      col6: formatDateTime(el.endDate, el.endHour),
      col7: el.id,
    });
  });
  return records;
};

export const getMonitoringPlansSystemsComponentsTableRecords = (data) => {
  const records = [];
  data.forEach((el) => {
    let present;
    if (el.endDate === "" || el.endDate === undefined) {
      present = "Present";
    } else {
      present = formatDateTime(el.endDate, el.endHour);
    }
    records.push({
      col1: el.componentId,
      col2: el.componentTypeCode,
      col3: `${formatDateTime(el.beginDate, el.beginHour)} ➜ ${present}`.trim(),
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
    let present;
    if (el.endDate === "" || el.endDate === undefined) {
      present = "Present";
    } else {
      present = formatDateTime(el.endDate, el.endHour);
    }
    records.push({
      col1: el.fuelCode,
      col2: el.systemTypeCode,
      col3: `${formatDateTime(el.beginDate, el.beginHour)} ➜ ${present}`.trim(),
      col4: el.id,
    });
  });
  return records;
};

export const getMonitoringPlansSystemsAnalyzerRangesTableRecords = (data) => {
  const records = [];
  data.forEach((el) => {
    let present;
    if (el.endDate === "" || el.endDate === undefined) {
      present = "Present";
    } else {
      present = formatDateTime(el.endDate, el.endHour);
    }
    records.push({
      col1: el.analyzerRangeCode,
      col2: `${formatDateTime(el.beginDate, el.beginHour)} ➜ ${present}`.trim(),
      col3: el.id,
    });
  });

  return records;
};
