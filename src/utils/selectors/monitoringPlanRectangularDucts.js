import { formatDateString } from "../functions";

export const getMonitoringPlansRectangularDuctsTableRecords = (totalData) => {
  const data = totalData;
  const records = [];

  data.forEach((el) => {
    const beginDate = formatDateString(el.wafBeginDate)
    const beginHour =
      el.wafBeginHour !== null ? el.wafBeginHour.toString() : "";
    const endDate = formatDateString(el.wafEndDate)
    const endHour = el.wafEndHour !== null ? el.wafEndHour.toString() : "";
    const wafDeterminationDate = formatDateString(el.wafDeterminationDate)
    const wafMethodCode = el.wafMethodCode === "select" ? null : el.wafMethodCode;

    records.push({
      col1: wafDeterminationDate,
      col2: wafMethodCode,
      col3: `${beginDate} ${beginHour}`.trim(),
      col4: `${endDate} ${endHour}`.trim(),
      col5: el.id,
    });
  });

  return records;
};
