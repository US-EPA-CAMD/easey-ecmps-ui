export const getMonitoringPlansQualifications = (totalData) => {
  const data = totalData;
  const records = [];

  data.forEach((el) => {
    const beginDate = el.beginDate
      ? formatStringToDate(el.beginDate.toString())
      : "";
    const endDate = el.endDate ? formatStringToDate(el.endDate.toString()) : "";

    records.push({
      col1: el.qualificationTypeCode,
      col2: `${beginDate}`,
      col3: `${endDate}`,
      col4: el.id,
    });
  });

  return records;
};

// year - month - day to  month / day/ year
const formatStringToDate = (date) => {
  const parts = date.split("-");
  //Removes the time component from the Day part
  return `${parts[1]}/${parts[2].substring(0, 2)}/${parts[0]}`;
};
