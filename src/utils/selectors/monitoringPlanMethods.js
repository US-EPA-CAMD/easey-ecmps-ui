export const getMonitoringPlansMethodsTableRecords = (totalData) => {
  console.log("methods", totalData);
  const data = totalData;
  const records = [];

  data.forEach((el) => {
    const beginDate = el.beginDate
      ? formatStringToDate(el.beginDate.toString())
      : "";
    const beginHour = el.beginHour ? el.beginHour.toString() : "";
    const endDate = el.endDate ? formatStringToDate(el.endDate.toString()) : "";
    const endHour = el.endHour ? el.endHour.toString() : "";
    records.push({
      col1: el.parameterCode,
      col2: el.monitoringMethodCode,
      col3: el.substituteDataCode,
      col4: el.bypassApproachCode,
      col5: `${beginDate} ${beginHour}`,
      col6: `${endDate} ${endHour}`,
      col7: el.id,
    });
  });

  return records;
};
// year - month - day to  month / day/ year
const formatStringToDate = (date) => {
  const parts = date.split("-");

  return `${parts[1]}/${parts[2]}/${parts[0]}`;
};

const formatAndNormalizeDate = (date) => {
  const parts = date.split("-");

  return `${parts[1]}/${parts[2].substring(0, 2)}/${parts[0]}`;
};

export const getMonitoringPlansMatsMethodsTableRecords = (data) => {
  const records = [];

  data.forEach((el) => {
    const beginDate = el.beginDate
      ? formatStringToDate(el.beginDate.toString())
      : "";
    const beginHour = el.beginHour ? el.beginHour.toString() : "";
    const endDate = el.endDate ? formatStringToDate(el.endDate.toString()) : "";
    const endHour = el.endHour ? el.endHour.toString() : "";
    records.push({
      col1: el.supplementalMATSParameterCode,
      col2: el.supplementalMATSMonitoringMethodCode,
      col3: `${beginDate} ${beginHour}`,
      col4: `${endDate} ${endHour}`,
      col5: el.id,
    });
  });

  return records;
};

export const getMonitoringPlansFuelDataRecords = (data) => {
  const records = [];

  data.forEach((el) => {
    const beginDate = el.beginDate
      ? formatAndNormalizeDate(el.beginDate.toString())
      : "";

    const endDate = el.endDate
      ? formatAndNormalizeDate(el.endDate.toString())
      : "";

    records.push({
      col1: el["fuelCode"],
      col2: el["indicatorCode"],
      col3:
        el["ozoneSeasonIndicator"] === null
          ? null
          : el["ozoneSeasonIndicator"] === 0
          ? "Yes"
          : "No",
      col4: el["demGCV"],
      col5: el["demSO2"],
      col6: `${beginDate}`,
      col7: `${endDate}`,
      col8: el.id,
    });
  });

  return records;
};

export const getMonitoringPlansUnitControlRecords = (data) => {
  const records = [];

  data.forEach((el) => {
    const optimizationDate = el["optimizationDate"]
      ? formatAndNormalizeDate(el["optimizationDate"].toString())
      : "";

    const installDate = el["installDate"]
      ? formatAndNormalizeDate(el["installDate"].toString())
      : "";
    const retireDate = el["retireDate"]
      ? formatAndNormalizeDate(el["retireDate"].toString())
      : "";

    records.push({
      col1: el["parameterCode"],
      col2: el["controlCode"],
      col3:
        el["originalCode"] === null
          ? null
          : el["originalCode"] === 0
          ? "Yes"
          : "No",
      col4: `${optimizationDate}`,
      col5: `${installDate}`,
      col6:
        el["seasonalControlsIndicator"] === null
          ? null
          : el["seasonalControlsIndicator"] === 0
          ? "Yes"
          : "No",
      col7: `${retireDate}`,
      col8: el.id,
    });
  });

  return records;
};
