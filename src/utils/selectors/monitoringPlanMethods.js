import { formatDateTime } from "../functions";

export const getMonitoringPlansMethodsTableRecords = (totalData) => {
  const data = totalData;
  const records = [];

  data.forEach((el) => {
    records.push({
      col1: el.parameterCode,
      col2: el.monitoringMethodCode,
      col3: el.substituteDataCode,
      col4: el.bypassApproachCode,
      col5: formatDateTime(el.beginDate, el.beginHour),
      col6: formatDateTime(el.endDate, el.endHour),
      col7: el.id,
    });
  });

  return records;
};

export const getMonitoringPlansMatsMethodsTableRecords = (data) => {
  const records = [];

  data.forEach((el) => {
    records.push({
      col1: el.supplementalMATSParameterCode,
      col2: el.supplementalMATSMonitoringMethodCode,
      col3: formatDateTime(el.beginDate, el.beginHour),
      col4: formatDateTime(el.endDate, el.endHour),
      col5: el.id,
    });
  });

  return records;
};
