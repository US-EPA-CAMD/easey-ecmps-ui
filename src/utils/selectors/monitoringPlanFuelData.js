export const getMonitoringPlansFuelDataRecords = (totalData) => {
  const data = totalData;
  const records = [];

  data.forEach((el) => {
    const beginDate = el.beginDate
      ? formatStringToDate(el.beginDate.toString())
      : "";
    const endDate = el.endDate ? formatStringToDate(el.endDate.toString()) : "";

    const ozoneSeasonIndicator = el.ozoneSeasonIndicator === 1 ? "Yes" : "No";

    records.push({
      col1: el.fuelCode,
      col2: el.indicatorCode,
      col3: `${ozoneSeasonIndicator}`,
      col4: el.demGCV,
      col5: el.demSO2,
      col6: `${beginDate}`,
      col7: `${endDate}`,
      col8: el.id,
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
