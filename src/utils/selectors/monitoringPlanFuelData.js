import { validateDate } from "../functions";

export const getMonitoringPlansFuelDataRecords = (totalData) => {
  const data = totalData;
  const records = [];

  data.forEach((el) => {
    const ozoneSeasonIndicator = el.ozoneSeasonIndicator === 1 ? "Yes" : "No";

    records.push({
      col1: el.fuelCode,
      col2: el.indicatorCode,
      col3: `${ozoneSeasonIndicator}`,
      col4: el.demGCV,
      col5: el.demSO2,
      col6: validateDate(el.beginDate),
      col7: validateDate(el.endDate),
      col8: el.id,
    });
  });

  return records;
};
