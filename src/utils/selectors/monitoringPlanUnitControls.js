export const getMonitoringPlansUnitControlRecords = (data) => {
  const records = [];

  data.forEach((el) => {
    const installDate = el["installDate"]
      ? formatStringToDate(el.installDate.toString())
      : "";
    const optimizationDate = el["optimizationDate"]
      ? formatStringToDate(el.optimizationDate.toString())
      : "";
    const retireDate = el["retireDate"]
      ? formatStringToDate(el.retireDate.toString())
      : "";

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

// year - month - day to  month / day/ year
const formatStringToDate = (date) => {
  const parts = date.split("-");

  return `${parts[1]}/${parts[2]}/${parts[0]}`;
};
