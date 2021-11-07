export const getMonitoringPlansPCTQualifications = (totalData) => {
  const data = totalData;
  const records = [];

  data.forEach((el) => {
    records.push({
      col1: el.qualificationYear,
      col2: el.averagePercentValue,
      col3: el.yr1QualificationDataYear,
      col4: el.yr2QualificationDataYear,
      col5: el.yr3QualificationDataYear,
      col6: el.id,
    });
  });

  return records;
};
