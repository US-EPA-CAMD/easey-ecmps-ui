import { formatDateString } from "../functions";

export const getMonitoringPlansQualifications = (totalData) => {
  const data = totalData;
  const records = [];

  data.forEach((el) => {
    const beginDate = formatDateString(el.beginDate);
    const endDate = formatDateString(el.endDate);

    records.push({
      col1: el.qualificationTypeCode,
      col2: `${beginDate}`,
      col3: `${endDate}`,
      col4: el.id,
    });
  });

  return records;
};
