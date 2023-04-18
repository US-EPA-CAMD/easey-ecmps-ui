import { validateDate } from "../functions";

export const getMonitoringPlansQualifications = (totalData) => {
  const data = totalData;
  const records = [];

  data.forEach((el) => {
    records.push({
      col1: el.qualificationTypeCode,
      col2: validateDate(el.beginDate),
      col3: validateDate(el.endDate),
      col4: el.id,
    });
  });

  return records;
};
