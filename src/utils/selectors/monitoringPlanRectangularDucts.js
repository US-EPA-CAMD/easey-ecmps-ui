export const getMonitoringPlansRectangularDuctsTableRecords = (totalData) => {
  const data = totalData;
  const records = [];

  data.forEach((el) => {
    const beginDate = el.wafBeginDate
      ? formatStringToDate(el.wafBeginDate.toString())
      : "";
    const beginHour =
      el.wafBeginHour !== null ? el.wafBeginHour.toString() : "";
    const endDate = el.wafEndDate
      ? formatStringToDate(el.wafEndDate.toString())
      : "";
    const endHour = el.wafEndHour !== null ? el.wafEndHour.toString() : "";
    const wafDeterminationDate = el.wafDeterminationDate
      ? formatStringToDate(el.wafDeterminationDate.toString())
      : "";

    var wafMethodCode;
    switch (el.wafMethodCode) {
      case "select":
        wafMethodCode = null;
        break;
      default:
        wafMethodCode = el.wafMethodCode;
    }

    records.push({
      col1: wafDeterminationDate,
      col2: wafMethodCode,

      col3: `${beginDate} ${beginHour}`,
      col4: `${endDate} ${endHour}`,
      col5: el.id,
    });
  });

  return records;
};
// year - month - day to  month / day/ year
const formatStringToDate = (date) => {
  const parts = date.split("-");

  return `${parts[1]}/${parts[2]}/${parts[0]}`;
};
