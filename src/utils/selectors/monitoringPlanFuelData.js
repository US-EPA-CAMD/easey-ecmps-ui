import { formatDateString } from "../functions";

export const getMonitoringPlansFuelDataRecords = (totalData) => {
  const data = totalData;
  const records = [];

  data.forEach((el) => {
    const beginDate = formatDateString(el.beginDate);
    const endDate = formatDateString(el.endDate);

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
