
export const getMonitoringPlanUnitReportingFreqData = (totalData) => {
  const data = totalData;
  const records = [];

  data.forEach((el) => {

    records.push({
      col1: el.reportFrequencyCode,
      col2: el.monitoringPlanLocations,
      col3: el.beginQuarter,
      col4: el.endQuarter,
      col5: el.id,
    });
  });

  return records;
};
