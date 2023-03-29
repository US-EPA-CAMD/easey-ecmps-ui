import { formatDateString } from "../functions";

export const getMonitoringPlansUnitControlRecords = (data) => {
  const records = [];

  data.forEach((el) => {
    const installDate = formatDateString(el.installDate)
    const optimizationDate = formatDateString(el.optimizationDate)
    const retireDate = formatDateString(el.retireDate)

    const seasonalControlsIndicator =
      el["seasonalControlsIndicator"] === "1" ? "Yes" : "No";
    const originalCode = el["originalCode"] === "1" ? "Yes" : "No";

    records.push({
      col1: el["parameterCode"],
      col2: el["controlCode"],
      col3: `${originalCode}`,
      col4: `${installDate}`,
      col5: `${optimizationDate}`,
      col6: `${seasonalControlsIndicator}`,
      col7: `${retireDate}`,
      col8: el.id,
    });
  });
  return records;
};
