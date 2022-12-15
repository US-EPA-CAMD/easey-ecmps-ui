export const mapCycleTimeInjectionsToRows = (data) => {
    const records = [];
    for (const el of data) {
      const row = {
        id: el.id,
        col1: el.gasLevelCode,
        col2: el.calibrationGasValue,
        col3: formatStringToDate(el.beginDate),
        col4: el.beginHour,
        col5: el.beginMinute,
        col6: formatStringToDate(el.endDate),
        col7: el.endHour,
        col8: el.endMinute,
        col9: el.injectionCycleTime,
        col10: el.beginMonitorValue,
        col12: el.endMonitorValue,
      };
      records.push(row);
    }
    return records;
  };

// year - month - day to  month / day/ year
const formatStringToDate = (date) => {
    const parts = date.split("-");
  
    return `${parts[1]}/${parts[2]}/${parts[0]}`;
  };