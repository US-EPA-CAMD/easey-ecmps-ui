import { formatDateTime, validateDate } from "../functions";

export const getMonitoringPlansRectangularDuctsTableRecords = (totalData) => {
  const data = totalData;
  const records = [];

  data.forEach((el) => {
    const wafDeterminationDate = validateDate(el.wafDeterminationDate)
    const wafMethodCode = el.wafMethodCode === "select" ? null : el.wafMethodCode;

    records.push({
      col1: wafDeterminationDate,
      col2: wafMethodCode,
      col3: formatDateTime(el.wafBeginDate, el.wafBeginHour),
      col4: formatDateTime(el.wafEndDate, el.wafEndHour),
      col5: el.id,
    });
  });

  return records;
};
