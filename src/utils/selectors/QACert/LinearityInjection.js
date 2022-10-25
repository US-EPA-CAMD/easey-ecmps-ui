export const getLinearityInjection = (totalData) => {
  console.log('ine injection,', totalData)
  const records = [];
  totalData.forEach((el) => {
    records.push({
      col1: formatStringToDate(el.injectionDate),
      col2: el.injectionHour ? el.injectionHour : 0,
      col3: el.injectionMinute ? el.injectionMinute : 0,
      col4: el.measuredValue,
      col5: el.referenceValue,
      id:el.id,
    });
  });
  console.log('records',records)
  return records;
};

// year - month - day to  month / day/ year
const formatStringToDate = (date) => {
  const parts = date.split("-");

  return `${parts[1]}/${parts[2]}/${parts[0]}`;
};
