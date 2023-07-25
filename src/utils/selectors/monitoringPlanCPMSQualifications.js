export const getMonitoringPlansCPMSQualifications = (totalData) => {
  const data = totalData;
  const records = [];

  data.forEach((el) => {
    records.push({
      col1: el.qualificationDataYear,
      col2: el.stackTestNumber ? el.stackTestNumber : "",
      col3: el.operatingLimit ? el.operatingLimit : "",

      col4: el.id,
    });
  });
  return records;
};
