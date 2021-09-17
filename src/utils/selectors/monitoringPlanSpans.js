export const getMonitoringPlansSpansTableRecords = (totalData) => {
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
        col1: el.componentTypeCode,
        col2: el.spanScaleCode,
        col3: el.spanMethodCode,
        // col4: el.mecValue,
        // col5: el.mpcValue,
        // col6: el.mpfValue,
        // col7: el.spanValue,
        // col8: el.fullScaleRange,
        col4: el.spanUnitsOfMeasureCode,
        // col10: el.scaleTransitionPoint,
        // col11: el.defaultHighRange,
        // col12: el.flowSpanValue,
        // col13: el.flowFullScaleRange,
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