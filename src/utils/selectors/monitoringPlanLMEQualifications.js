export const getMonitoringPlansLMEQualifications = (totalData) => {
  const data = totalData;
  const records = [];

  data.forEach((el) => {
    records.push({
      col1: el.qualificationDataYear,
      col2: el.operatingHours,
      col3: el.so2Tons,
      col4: el.noxTons,
      col5: el.id,
    });
  });
  return records;
};
