export const getMonitoringPlansLocationAttributeRecords = (totalData) => {
  const data = totalData;
  const records = [];

  data.forEach((el) => {
    var ductIndicator;
    if (el.ductIndicator) {
      if (el.ductIndicator === "1") {
        ductIndicator = "Yes";
      } else {
        ductIndicator = "No";
      }
    } else {
      ductIndicator = "";
    }

    var bypassIndicator;
    if (el.bypassIndicator) {
      if (el.bypassIndicator === "1") {
        bypassIndicator = "Yes";
      } else {
        bypassIndicator = "No";
      }
    } else {
      bypassIndicator = "";
    }

    const beginDate = el.beginDate
      ? formatStringToDate(el.beginDate.toString())
      : "";
    const endDate = el.endDate ? formatStringToDate(el.endDate.toString()) : "";

    records.push({
      col1: ductIndicator,
      col2: bypassIndicator,
      col3: el.groundElevation,
      col4: el.stackHeight,
      col5: el.materialCode,
      col6: el.shapeCode,
      col7: el.crossAreaFlow,
      col8: el.crossAreaStackExit,
      col9: `${beginDate}`,
      col10: `${endDate}`,
      col11: el.id,
    });
  });

  return records;
};

export const getMonitoringPlansRelationshipsDataRecords = (totalData) => {
  const data = totalData;
  const records = [];

  data.forEach((el) => {
    const beginDate = el.beginDate
      ? formatStringToDate(el.beginDate.toString())
      : "";
    const endDate = el.endDate ? formatStringToDate(el.endDate.toString()) : "";

    records.push({
      col1: `${beginDate}`,
      col2: `${endDate}`,
      col3: el.id,
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
