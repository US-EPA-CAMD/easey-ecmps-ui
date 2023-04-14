export const getMonitoringPlansUnitControlRecords = (data) => {
  const records = [];

  data.forEach((el) => {
    const seasonalControlsIndicator =
      el["seasonalControlsIndicator"] === "1" ? "Yes" : "No";
    const originalCode = el["originalCode"] === "1" ? "Yes" : "No";

    records.push({
      col1: el["parameterCode"],
      col2: el["controlCode"],
      col3: `${originalCode}`,
      col4: el.installDate ? el.installDate : "",
      col5: el.optimizationDate ? el.optimizationDate : "",
      col6: `${seasonalControlsIndicator}`,
      col7: el.retireDate ? el.retireDate : "",
      col8: el.id,
    });
  });
  return records;
};
