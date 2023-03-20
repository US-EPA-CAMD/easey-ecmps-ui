import { formatDateString, formatHourString } from "../functions";

export const getMonitoringPlansMethodsTableRecords = (totalData) => {
  const data = totalData;
  const records = [];

  data.forEach((el) => {
    const beginDate = formatDateString(el.beginDate);
    const beginHour = formatHourString(el.beginHour);
    const endDate = formatDateString(el.endDate);
    const endHour = formatHourString(el.endHour);
    records.push({
      col1: el.parameterCode,
      col2: el.monitoringMethodCode,
      col3: el.substituteDataCode,
      col4: el.bypassApproachCode,
      col5: `${beginDate} ${beginHour}`.trim(),
      col6: `${endDate} ${endHour}`.trim(),
      col7: el.id,
    });
  });

  return records;
};

export const getMonitoringPlansMatsMethodsTableRecords = (data) => {
  const records = [];

  data.forEach((el) => {
    const beginDate = formatDateString(el.beginDate);
    const beginHour = formatHourString(el.beginHour);
    const endDate = formatDateString(el.endDate);
    const endHour = formatHourString(el.endHour);
    records.push({
      col1: el.supplementalMATSParameterCode,
      col2: el.supplementalMATSMonitoringMethodCode,
      col3: `${beginDate} ${beginHour}`.trim(),
      col4: `${endDate} ${endHour}`.trim(),
      col5: el.id,
    });
  });

  return records;
};
