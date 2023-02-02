export const getMonitoringPlansLocationAttributeRecords = (totalData) => {
  const data = totalData;
  const records = [];

  data.forEach((el) => {
    var ductIndicator;
    if (el.ductIndicator && el.ductIndicator === 1) {
      ductIndicator = 'Yes';
    } else {
      ductIndicator = 'No';
    }

    var bypassIndicator;
    if (el.bypassIndicator && el.bypassIndicator === 1) {
      bypassIndicator = 'Yes';
    } else {
      bypassIndicator = 'No';
    }

    const beginDate = el.beginDate
      ? formatStringToDate(el.beginDate.toString())
      : '';
    const endDate = el.endDate ? formatStringToDate(el.endDate.toString()) : '';
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
      : '';
    const endDate = el.endDate ? formatStringToDate(el.endDate.toString()) : '';

    records.push({
      col1: el.stackPipeId,
      col2: el.unitId,
      col3: `${beginDate}`,
      col4: `${endDate}`,
      col5: el.id,
    });
  });
  console.log(data);
  return records;
};

// year - month - day to  month / day/ year
const formatStringToDate = (date) => {
  const splitDate = date.split('T');
  const parts = splitDate[0].split('-');
  //Removes the time component from the Day part
  return `${parts[1]}/${parts[2].substring(0, 2)}/${parts[0]}`;
};
